import {
	mockAISettings,
	mockBillingUsage,
	mockConcepts,
	mockDailyMission,
	mockFlashcards,
	mockLearningPlans,
	mockProgressSnapshots,
	mockRecallAttempts,
	mockResources,
	mockStudySessions,
	mockTutorMessages,
	mockUser,
	mockWorkspaces,
} from "@/lib/mock-data";
import type {
	AISettings,
	Concept,
	Flashcard,
	LearningPlan,
	PlannerView,
	RecallAttempt,
	RecallRating,
	Resource,
	ResourceType,
	SearchResult,
	TutorMessage,
	TutorMode,
	UploadResourceInput,
	Workspace,
} from "@/lib/types";
import { clamp, cloneData, createId, getResourceHref, getWorkspaceHref, inferResourceType, sleep } from "@/lib/utils";

type ProgressCallback = (progress: number, status: "uploading" | "processing") => void;

const DEFAULT_LATENCY = 420;

async function respond<T>(payload: T, latency = DEFAULT_LATENCY): Promise<T> {
	await sleep(latency);
	return cloneData(payload);
}

function nowIso() {
	return new Date().toISOString();
}

function makeCitation(resourceId: string) {
	const resource = mockResources.find((item) => item.id === resourceId) ?? mockResources[0];
	const section = resource.sections[0];

	return {
		id: createId("cite"),
		resourceId: resource.id,
		label: resource.title,
		location: section?.sourceRef ?? "Source",
		url: resource.url,
	};
}

function createUploadedResource(input: UploadResourceInput): Resource {
	const type = input.type ?? inferResourceType(input.url ?? input.name);
	const title = input.name.trim() || (type === "web" ? "Untitled web resource" : "Untitled notes");

	return {
		id: createId("res"),
		workspaceId: input.workspaceId,
		title,
		type,
		status: "ready",
		url: input.url,
		fileName: type === "pdf" ? title : undefined,
		sourceLabel: type === "youtube" ? "YouTube link" : type === "web" ? "Web page" : type === "pdf" ? "PDF upload" : "Imported notes",
		summary:
			"NeuroPilot extracted the main ideas, grouped related concepts, and created a starter set of recall prompts. This is mock processing data.",
		conceptsFound: type === "pdf" ? 8 : type === "youtube" ? 6 : 4,
		flashcardsGenerated: type === "pdf" ? 18 : type === "youtube" ? 14 : 9,
		weakConcepts: 1,
		lastOpenedAt: null,
		addedAt: nowIso(),
		readingTimeMinutes: type === "youtube" ? 16 : 22,
		progress: 0,
		pages: type === "pdf" ? 28 : undefined,
		durationMinutes: type === "youtube" ? 31 : undefined,
		tags: ["new", "mock-import"],
		sections: [
			{
				id: createId("sec"),
				title: "AI-generated outline",
				summary: "The resource is ready for planning, flashcard generation, and source-grounded questions.",
				sourceRef: type === "youtube" ? "00:00" : "Section 1",
				conceptIds: [],
			},
		],
	};
}

function getDueFlashcards(workspaceId?: string) {
	const now = new Date("2026-05-22T23:59:59.000+05:30").getTime();

	return mockFlashcards.filter((card) => {
		const isDue = new Date(card.dueAt).getTime() <= now;
		return isDue && (!workspaceId || card.workspaceId === workspaceId);
	});
}

function buildSearchResults(query: string): SearchResult[] {
	const normalized = query.trim().toLowerCase();

	if (!normalized) {
		return [];
	}

	const workspaceResults = mockWorkspaces
		.filter((workspace) => [workspace.title, workspace.description, workspace.goal].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((workspace) => ({
			id: workspace.id,
			type: "workspace",
			title: workspace.title,
			subtitle: workspace.goal,
			href: getWorkspaceHref(workspace.id),
			meta: `${workspace.progress}% complete`,
		}));

	const resourceResults = mockResources
		.filter((resource) => [resource.title, resource.summary, resource.tags.join(" ")].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((resource) => ({
			id: resource.id,
			type: "resource",
			title: resource.title,
			subtitle: resource.summary,
			href: getResourceHref(resource.id),
			meta: resource.status,
		}));

	const conceptResults = mockConcepts
		.filter((concept) => [concept.title, concept.description, concept.recommendedAction].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((concept) => ({
			id: concept.id,
			type: "concept",
			title: concept.title,
			subtitle: concept.description,
			href: getWorkspaceHref(concept.workspaceId),
			meta: concept.status,
		}));

	const flashcardResults = mockFlashcards
		.filter((card) => [card.front, card.back, card.tags.join(" ")].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((card) => ({
			id: card.id,
			type: "flashcard",
			title: card.front,
			subtitle: card.back,
			href: "/app/recall",
			meta: `${card.strength}% strength`,
		}));

	return [...workspaceResults, ...resourceResults, ...conceptResults, ...flashcardResults].slice(0, 12);
}

function updateCardAfterRating(card: Flashcard, rating: RecallRating): Flashcard {
	const strengthDelta: Record<RecallRating, number> = {
		again: -16,
		hard: 4,
		good: 12,
		easy: 20,
	};
	const intervalByRating: Record<RecallRating, number> = {
		again: 0,
		hard: Math.max(1, card.intervalDays),
		good: Math.max(1, card.intervalDays + 2),
		easy: Math.max(3, card.intervalDays + 5),
	};
	const nextDue = new Date();
	nextDue.setDate(nextDue.getDate() + intervalByRating[rating]);

	return {
		...card,
		strength: clamp(card.strength + strengthDelta[rating]),
		easeFactor: clamp(card.easeFactor + (rating === "easy" ? 0.18 : rating === "again" ? -0.22 : rating === "hard" ? -0.08 : 0.06), 1.3, 3),
		intervalDays: intervalByRating[rating],
		repetitions: rating === "again" ? 0 : card.repetitions + 1,
		lapses: rating === "again" ? card.lapses + 1 : card.lapses,
		lastReviewedAt: nowIso(),
		dueAt: nextDue.toISOString(),
	};
}

function generatePlanVariant(workspaceId: string, view: PlannerView = "path"): LearningPlan {
	const existingPlan = mockLearningPlans.find((plan) => plan.workspaceId === workspaceId) ?? mockLearningPlans[0];
	const plan = cloneData(existingPlan);

	return {
		...plan,
		id: createId("plan"),
		generatedAt: nowIso(),
		view,
		currentReadiness: clamp(plan.currentReadiness + 6),
		days: plan.days.map((day, dayIndex) => ({
			...day,
			id: createId(`plan-day-${dayIndex + 1}`),
			tasks: day.tasks.map((task, taskIndex) => ({
				...task,
				id: createId(`task-${dayIndex + 1}-${taskIndex + 1}`),
				status: "not-started",
			})),
		})),
	};
}

function generateTutorReply(input: {
	content: string;
	workspaceId: string;
	resourceId?: string;
	mode: TutorMode;
}): TutorMessage {
	const lower = input.content.toLowerCase();
	const resourceId = input.resourceId ?? "res-coa-module-1";
	let content =
		"Here is the shortest useful path: first name the concept, then explain why it exists, then solve one tiny example from your source material. I will keep the answer grounded in your uploaded resources.";

	if (input.mode === "quiz" || lower.includes("quiz")) {
		content =
			"Quick quiz: if a memory block can go into any cache line, which mapping style is that? After you answer, I will ask why this improves conflict misses but costs more hardware.";
	}

	if (input.mode === "socratic") {
		content =
			"Let us reason it out. If direct mapping gives every block one fixed slot, what kind of miss happens when two frequently used blocks keep competing for that same slot?";
	}

	if (lower.includes("cache")) {
		content =
			"Cache mapping is a placement rule. Direct mapping is fastest to decide but has more conflicts. Fully associative mapping is flexible but expensive. Set associative mapping is the practical middle: choose a set first, then choose a line inside it.";
	}

	return {
		id: createId("msg-ai"),
		role: "assistant",
		content,
		workspaceId: input.workspaceId,
		resourceId,
		mode: input.mode,
		createdAt: nowIso(),
		citations: [makeCitation(resourceId)],
		quickActions: [
			{ id: createId("qa"), label: "Turn into flashcards", action: "flashcards" },
			{ id: createId("qa"), label: "Quiz me on this", action: "quiz" },
			{ id: createId("qa"), label: "Add to notes", action: "notes" },
			{ id: createId("qa"), label: "Explain simpler", action: "simpler" },
		],
	};
}

export const fakeApi = {
	getCurrentUser: () => respond(mockUser),
	getDashboardData: () =>
		respond({
			user: mockUser,
			dailyMission: mockDailyMission,
			workspaces: mockWorkspaces,
			resources: mockResources,
			concepts: mockConcepts,
			flashcards: mockFlashcards,
			progressSnapshots: mockProgressSnapshots,
			studySessions: mockStudySessions,
		}),
	listWorkspaces: () => respond(mockWorkspaces),
	getWorkspace: async (workspaceId: string): Promise<Workspace | null> => {
		const workspace = mockWorkspaces.find((item) => item.id === workspaceId || item.slug === workspaceId) ?? null;
		return respond(workspace);
	},
	listResources: (workspaceId?: string, type?: ResourceType) => {
		const resources = mockResources.filter((resource) => {
			return (!workspaceId || resource.workspaceId === workspaceId) && (!type || resource.type === type);
		});

		return respond(resources);
	},
	getResource: async (resourceId: string): Promise<Resource | null> => {
		const resource = mockResources.find((item) => item.id === resourceId) ?? null;
		return respond(resource);
	},
	listConcepts: (workspaceId?: string): Promise<Concept[]> => {
		const concepts = workspaceId ? mockConcepts.filter((concept) => concept.workspaceId === workspaceId) : mockConcepts;
		return respond(concepts);
	},
	listDueFlashcards: (workspaceId?: string) => respond(getDueFlashcards(workspaceId)),
	search: (query: string) => respond(buildSearchResults(query), 180),
	uploadResource: async (input: UploadResourceInput, onProgress?: ProgressCallback): Promise<Resource> => {
		const steps = [12, 28, 46, 68, 84, 100];

		for (const progress of steps) {
			onProgress?.(progress, progress < 84 ? "uploading" : "processing");
			await sleep(180);
		}

		return createUploadedResource(input);
	},
	rateFlashcard: async (flashcard: Flashcard, rating: RecallRating) => {
		const updatedCard = updateCardAfterRating(flashcard, rating);
		const attempt: RecallAttempt = {
			id: createId("attempt"),
			flashcardId: flashcard.id,
			workspaceId: flashcard.workspaceId,
			rating,
			answeredAt: nowIso(),
			responseTimeSeconds: Math.round(8 + Math.random() * 36),
			previousStrength: flashcard.strength,
			nextStrength: updatedCard.strength,
		};

		return respond({ flashcard: updatedCard, attempt }, 220);
	},
	regeneratePlan: async (workspaceId: string, view: PlannerView = "path") => {
		await sleep(900);
		return generatePlanVariant(workspaceId, view);
	},
	sendTutorMessage: async (input: { content: string; workspaceId: string; resourceId?: string; mode: TutorMode }) => {
		await sleep(680);
		return generateTutorReply(input);
	},
	saveAISettings: (settings: AISettings) => respond(settings, 240),
	getBillingUsage: () => respond(mockBillingUsage),
};

export const apiAdapters = {
	resources: {
		list: fakeApi.listResources,
		upload: fakeApi.uploadResource,
	},
	recall: {
		due: fakeApi.listDueFlashcards,
		rate: fakeApi.rateFlashcard,
	},
	planner: {
		regenerate: fakeApi.regeneratePlan,
	},
	tutor: {
		send: fakeApi.sendTutorMessage,
	},
};
