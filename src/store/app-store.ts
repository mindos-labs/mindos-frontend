"use client";

import { create } from "zustand";

import { fakeApi } from "@/lib/fake-api";
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
	BillingUsage,
	Concept,
	DailyMission,
	Flashcard,
	LearningPlan,
	PlannerView,
	RecallAttempt,
	RecallRating,
	Resource,
	SearchResult,
	ThemePreference,
	Toast,
	ToastTone,
	TutorMessage,
	TutorMode,
	UploadDraft,
	UploadResourceInput,
	User,
	Workspace,
} from "@/lib/types";
import { applyThemePreference, clamp, cloneData, createId, inferResourceType } from "@/lib/utils";

const THEME_STORAGE_KEY = "neuropilot-theme";
const DUE_CUTOFF = new Date("2026-05-22T23:59:59.000+05:30").getTime();

type ToastInput = {
	title: string;
	description?: string;
	tone?: ToastTone;
	durationMs?: number;
};

type SearchState = {
	open: boolean;
	query: string;
	results: SearchResult[];
	isSearching: boolean;
};

type RecallSessionState = {
	active: boolean;
	queue: string[];
	currentIndex: number;
	currentCardId: string | null;
	revealed: boolean;
	reviewedCount: number;
	lastRating: RecallRating | null;
	completed: boolean;
};

type PlannerState = {
	activeWorkspaceId: string;
	activePlanId: string;
	view: PlannerView;
	isRegenerating: boolean;
	lastRegeneratedAt: string | null;
};

type TutorState = {
	mode: TutorMode;
	workspaceId: string;
	resourceId: string | null;
	input: string;
	isSending: boolean;
};

type AppDataState = {
	user: User;
	workspaces: Workspace[];
	resources: Resource[];
	concepts: Concept[];
	flashcards: Flashcard[];
	recallAttempts: RecallAttempt[];
	learningPlans: LearningPlan[];
	tutorMessages: TutorMessage[];
	progressSnapshots: typeof mockProgressSnapshots;
	studySessions: typeof mockStudySessions;
	dailyMission: DailyMission;
	billingUsage: BillingUsage;
};

type AppStore = AppDataState & {
	theme: ThemePreference;
	toasts: Toast[];
	search: SearchState;
	uploads: UploadDraft[];
	recall: RecallSessionState;
	planner: PlannerState;
	tutor: TutorState;
	aiSettings: AISettings;
	hydrateTheme: () => void;
	setTheme: (theme: ThemePreference) => void;
	toggleTheme: () => void;
	toast: (input: ToastInput) => string;
	dismissToast: (toastId: string) => void;
	clearToasts: () => void;
	setSearchOpen: (open: boolean) => void;
	setSearchQuery: (query: string) => void;
	runSearch: (query?: string) => Promise<void>;
	clearSearch: () => void;
	uploadResource: (input: UploadResourceInput) => Promise<Resource | null>;
	removeUpload: (uploadId: string) => void;
	clearCompletedUploads: () => void;
	startRecallSession: (workspaceId?: string) => void;
	revealRecallAnswer: () => void;
	rateRecallCard: (rating: RecallRating) => Promise<void>;
	endRecallSession: () => void;
	setPlannerView: (view: PlannerView) => void;
	regeneratePlan: (workspaceId?: string) => Promise<LearningPlan | null>;
	setTutorMode: (mode: TutorMode) => void;
	setTutorContext: (context: { workspaceId?: string; resourceId?: string | null }) => void;
	setTutorInput: (input: string) => void;
	sendTutorMessage: (content?: string) => Promise<TutorMessage | null>;
	updateAISettings: (settings: Partial<AISettings>) => void;
	saveAISettings: () => Promise<void>;
	resetMockState: () => void;
};

function readStoredTheme(): ThemePreference {
	if (typeof window === "undefined") {
		return "system";
	}

	const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

	if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
		return storedTheme;
	}

	return "system";
}

function persistTheme(theme: ThemePreference) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function initialData(): AppDataState {
	return {
		user: cloneData(mockUser),
		workspaces: cloneData(mockWorkspaces),
		resources: cloneData(mockResources),
		concepts: cloneData(mockConcepts),
		flashcards: cloneData(mockFlashcards),
		recallAttempts: cloneData(mockRecallAttempts),
		learningPlans: cloneData(mockLearningPlans),
		tutorMessages: cloneData(mockTutorMessages),
		progressSnapshots: cloneData(mockProgressSnapshots),
		studySessions: cloneData(mockStudySessions),
		dailyMission: cloneData(mockDailyMission),
		billingUsage: cloneData(mockBillingUsage),
	};
}

function buildLocalSearchResults(query: string, state: Pick<AppStore, "workspaces" | "resources" | "concepts" | "flashcards">) {
	const normalized = query.trim().toLowerCase();

	if (!normalized) {
		return [];
	}

	const workspaces = state.workspaces
		.filter((workspace) => [workspace.title, workspace.description, workspace.goal].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((workspace) => ({
			id: workspace.id,
			type: "workspace",
			title: workspace.title,
			subtitle: workspace.goal,
			href: `/app/learn/${workspace.id}`,
			meta: `${workspace.progress}% complete`,
		}));

	const resources = state.resources
		.filter((resource) => [resource.title, resource.summary, resource.tags.join(" ")].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((resource) => ({
			id: resource.id,
			type: "resource",
			title: resource.title,
			subtitle: resource.summary,
			href: `/app/library/${resource.id}`,
			meta: resource.status,
		}));

	const concepts = state.concepts
		.filter((concept) => [concept.title, concept.description, concept.recommendedAction].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((concept) => ({
			id: concept.id,
			type: "concept",
			title: concept.title,
			subtitle: concept.description,
			href: `/app/learn/${concept.workspaceId}`,
			meta: concept.status,
		}));

	const cards = state.flashcards
		.filter((card) => [card.front, card.back, card.tags.join(" ")].join(" ").toLowerCase().includes(normalized))
		.map<SearchResult>((card) => ({
			id: card.id,
			type: "flashcard",
			title: card.front,
			subtitle: card.back,
			href: "/app/recall",
			meta: `${card.strength}% strength`,
		}));

	return [...workspaces, ...resources, ...concepts, ...cards].slice(0, 12);
}

function getDueQueue(flashcards: Flashcard[], workspaceId?: string) {
	return flashcards
		.filter((card) => new Date(card.dueAt).getTime() <= DUE_CUTOFF && (!workspaceId || card.workspaceId === workspaceId))
		.sort((a, b) => a.strength - b.strength)
		.map((card) => card.id);
}

function getInitialUiState() {
	return {
		theme: "system" as ThemePreference,
		toasts: [],
		search: {
			open: false,
			query: "",
			results: [],
			isSearching: false,
		},
		uploads: [],
		recall: {
			active: false,
			queue: [],
			currentIndex: 0,
			currentCardId: null,
			revealed: false,
			reviewedCount: 0,
			lastRating: null,
			completed: false,
		},
		planner: {
			activeWorkspaceId: "ws-coa",
			activePlanId: "plan-coa-end-sem",
			view: "path" as PlannerView,
			isRegenerating: false,
			lastRegeneratedAt: null,
		},
		tutor: {
			mode: "explain" as TutorMode,
			workspaceId: "ws-coa",
			resourceId: "res-coa-module-1",
			input: "",
			isSending: false,
		},
		aiSettings: cloneData(mockAISettings),
	};
}

export const useAppStore = create<AppStore>()((set, get) => ({
	...initialData(),
	...getInitialUiState(),
	hydrateTheme: () => {
		const theme = readStoredTheme();
		applyThemePreference(theme);
		set({ theme });
	},
	setTheme: (theme) => {
		applyThemePreference(theme);
		persistTheme(theme);
		set({ theme });
	},
	toggleTheme: () => {
		const nextTheme = get().theme === "dark" ? "light" : "dark";
		get().setTheme(nextTheme);
	},
	toast: ({ title, description, tone = "default", durationMs = 4200 }) => {
		const id = createId("toast");
		const toast: Toast = {
			id,
			title,
			description,
			tone,
			durationMs,
			createdAt: new Date().toISOString(),
		};

		set((state) => ({ toasts: [toast, ...state.toasts].slice(0, 5) }));

		if (durationMs > 0) {
			globalThis.setTimeout(() => get().dismissToast(id), durationMs);
		}

		return id;
	},
	dismissToast: (toastId) => {
		set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== toastId) }));
	},
	clearToasts: () => set({ toasts: [] }),
	setSearchOpen: (open) => {
		set((state) => ({
			search: {
				...state.search,
				open,
			},
		}));
	},
	setSearchQuery: (query) => {
		set((state) => ({
			search: {
				...state.search,
				query,
				results: buildLocalSearchResults(query, state),
			},
		}));
	},
	runSearch: async (query) => {
		const nextQuery = query ?? get().search.query;

		set((state) => ({
			search: {
				...state.search,
				query: nextQuery,
				isSearching: true,
			},
		}));

		const results = await fakeApi.search(nextQuery);

		set((state) => ({
			search: {
				...state.search,
				results,
				isSearching: false,
			},
		}));
	},
	clearSearch: () => {
		set((state) => ({
			search: {
				...state.search,
				query: "",
				results: [],
				isSearching: false,
			},
		}));
	},
	uploadResource: async (input) => {
		const type = input.type ?? inferResourceType(input.url ?? input.name);
		const uploadId = createId("upload");
		const draft: UploadDraft = {
			id: uploadId,
			name: input.name,
			type,
			sizeBytes: input.sizeBytes,
			status: "uploading",
			progress: 0,
			workspaceId: input.workspaceId,
			createdAt: new Date().toISOString(),
		};

		set((state) => ({ uploads: [draft, ...state.uploads] }));
		get().toast({
			title: "Import started",
			description: `${input.name} is being prepared for learning.`,
			tone: "info",
		});

		try {
			const resource = await fakeApi.uploadResource({ ...input, type }, (progress, status) => {
				set((state) => ({
					uploads: state.uploads.map((upload) =>
						upload.id === uploadId
							? {
									...upload,
									progress,
									status,
								}
							: upload,
					),
				}));
			});

			set((state) => ({
				resources: [resource, ...state.resources],
				uploads: state.uploads.map((upload) =>
					upload.id === uploadId
						? {
								...upload,
								status: "ready",
								progress: 100,
							}
						: upload,
				),
				workspaces: state.workspaces.map((workspace) =>
					workspace.id === input.workspaceId
						? {
								...workspace,
								resourcesCount: workspace.resourcesCount + 1,
							}
						: workspace,
				),
			}));
			get().toast({
				title: "Resource ready",
				description: `${resource.title} has concepts, notes, and starter flashcards.`,
				tone: "success",
			});

			return resource;
		} catch (error) {
			set((state) => ({
				uploads: state.uploads.map((upload) =>
					upload.id === uploadId
						? {
								...upload,
								status: "failed",
								error: error instanceof Error ? error.message : "Upload failed",
							}
						: upload,
				),
			}));
			get().toast({
				title: "Upload failed",
				description: "This is a mock failure state. Try again from the library page.",
				tone: "error",
			});

			return null;
		}
	},
	removeUpload: (uploadId) => {
		set((state) => ({ uploads: state.uploads.filter((upload) => upload.id !== uploadId) }));
	},
	clearCompletedUploads: () => {
		set((state) => ({ uploads: state.uploads.filter((upload) => upload.status !== "ready") }));
	},
	startRecallSession: (workspaceId) => {
		const queue = getDueQueue(get().flashcards, workspaceId);

		if (queue.length === 0) {
			get().toast({
				title: "No cards due",
				description: "You are clear for now. Add new cards or review weak concepts.",
				tone: "success",
			});
			set({
				recall: {
					active: false,
					queue: [],
					currentIndex: 0,
					currentCardId: null,
					revealed: false,
					reviewedCount: 0,
					lastRating: null,
					completed: true,
				},
			});
			return;
		}

		set({
			recall: {
				active: true,
				queue,
				currentIndex: 0,
				currentCardId: queue[0],
				revealed: false,
				reviewedCount: 0,
				lastRating: null,
				completed: false,
			},
		});
	},
	revealRecallAnswer: () => {
		set((state) => ({
			recall: {
				...state.recall,
				revealed: true,
			},
		}));
	},
	rateRecallCard: async (rating) => {
		const { currentCardId, queue, currentIndex } = get().recall;
		const currentCard = get().flashcards.find((card) => card.id === currentCardId);

		if (!currentCard) {
			return;
		}

		const { flashcard, attempt } = await fakeApi.rateFlashcard(currentCard, rating);
		const nextIndex = currentIndex + 1;
		const completed = nextIndex >= queue.length;
		const nextCardId = completed ? null : queue[nextIndex];

		set((state) => ({
			flashcards: state.flashcards.map((card) => (card.id === flashcard.id ? flashcard : card)),
			recallAttempts: [attempt, ...state.recallAttempts],
			recall: {
				...state.recall,
				currentIndex: nextIndex,
				currentCardId: nextCardId,
				revealed: false,
				reviewedCount: state.recall.reviewedCount + 1,
				lastRating: rating,
				completed,
				active: !completed,
			},
		}));

		if (completed) {
			get().toast({
				title: "Recall session complete",
				description: `Reviewed ${queue.length} cards. Weak cards were rescheduled sooner.`,
				tone: "success",
			});
		}
	},
	endRecallSession: () => {
		set((state) => ({
			recall: {
				...state.recall,
				active: false,
				currentCardId: null,
				revealed: false,
			},
		}));
	},
	setPlannerView: (view) => {
		set((state) => ({
			planner: {
				...state.planner,
				view,
			},
			learningPlans: state.learningPlans.map((plan) =>
				plan.id === state.planner.activePlanId
					? {
							...plan,
							view,
						}
					: plan,
			),
		}));
	},
	regeneratePlan: async (workspaceId) => {
		const activeWorkspaceId = workspaceId ?? get().planner.activeWorkspaceId;
		const view = get().planner.view;

		set((state) => ({
			planner: {
				...state.planner,
				activeWorkspaceId,
				isRegenerating: true,
			},
		}));

		get().toast({
			title: "Regenerating plan",
			description: "NeuroPilot is prioritizing weak concepts first.",
			tone: "info",
			durationMs: 2200,
		});

		try {
			const plan = await fakeApi.regeneratePlan(activeWorkspaceId, view);

			set((state) => ({
				learningPlans: [plan, ...state.learningPlans.filter((item) => item.workspaceId !== activeWorkspaceId)],
				planner: {
					...state.planner,
					activeWorkspaceId,
					activePlanId: plan.id,
					isRegenerating: false,
					lastRegeneratedAt: plan.generatedAt,
				},
			}));
			get().toast({
				title: "Plan updated",
				description: "Your next study path now reflects weak points and due recall.",
				tone: "success",
			});

			return plan;
		} catch {
			set((state) => ({
				planner: {
					...state.planner,
					isRegenerating: false,
				},
			}));
			get().toast({
				title: "Plan regeneration failed",
				description: "This mock adapter is showing the error path.",
				tone: "error",
			});

			return null;
		}
	},
	setTutorMode: (mode) => {
		set((state) => ({
			tutor: {
				...state.tutor,
				mode,
			},
		}));
	},
	setTutorContext: ({ workspaceId, resourceId }) => {
		set((state) => ({
			tutor: {
				...state.tutor,
				workspaceId: workspaceId ?? state.tutor.workspaceId,
				resourceId: resourceId === undefined ? state.tutor.resourceId : resourceId,
			},
		}));
	},
	setTutorInput: (input) => {
		set((state) => ({
			tutor: {
				...state.tutor,
				input,
			},
		}));
	},
	sendTutorMessage: async (content) => {
		const { tutor } = get();
		const messageContent = (content ?? tutor.input).trim();

		if (!messageContent) {
			return null;
		}

		const userMessage: TutorMessage = {
			id: createId("msg-user"),
			role: "user",
			content: messageContent,
			workspaceId: tutor.workspaceId,
			resourceId: tutor.resourceId ?? undefined,
			mode: tutor.mode,
			createdAt: new Date().toISOString(),
		};

		set((state) => ({
			tutorMessages: [...state.tutorMessages, userMessage],
			tutor: {
				...state.tutor,
				input: "",
				isSending: true,
			},
		}));

		try {
			const assistantMessage = await fakeApi.sendTutorMessage({
				content: messageContent,
				workspaceId: tutor.workspaceId,
				resourceId: tutor.resourceId ?? undefined,
				mode: tutor.mode,
			});

			set((state) => ({
				tutorMessages: [...state.tutorMessages, assistantMessage],
				tutor: {
					...state.tutor,
					isSending: false,
				},
			}));

			return assistantMessage;
		} catch {
			set((state) => ({
				tutor: {
					...state.tutor,
					isSending: false,
				},
			}));
			get().toast({
				title: "Tutor unavailable",
				description: "The mock tutor adapter returned an error state.",
				tone: "error",
			});

			return null;
		}
	},
	updateAISettings: (settings) => {
		set((state) => ({
			aiSettings: {
				...state.aiSettings,
				...settings,
			},
		}));
	},
	saveAISettings: async () => {
		const saved = await fakeApi.saveAISettings(get().aiSettings);
		set({ aiSettings: saved });
		get().toast({
			title: "AI settings saved",
			description: saved.useOwnApiKey ? "Your BYOK settings were saved locally." : "Default mock AI settings are active.",
			tone: "success",
		});
	},
	resetMockState: () => {
		set({
			...initialData(),
			...getInitialUiState(),
			theme: get().theme,
		});
		get().toast({
			title: "Mock state reset",
			description: "Learning data has been restored to the seeded demo state.",
			tone: "info",
		});
	},
}));

export const selectCurrentFlashcard = (state: AppStore) =>
	state.flashcards.find((card) => card.id === state.recall.currentCardId) ?? null;

export const selectActivePlan = (state: AppStore) =>
	state.learningPlans.find((plan) => plan.id === state.planner.activePlanId) ??
	state.learningPlans.find((plan) => plan.workspaceId === state.planner.activeWorkspaceId) ??
	null;

export const selectWeakConcepts = (workspaceId: string) => (state: AppStore) =>
	state.concepts.filter((concept) => concept.workspaceId === workspaceId && concept.status === "weak");

export const selectDueFlashcards = (workspaceId?: string) => (state: AppStore) =>
	state.flashcards.filter((card) => {
		const isDue = new Date(card.dueAt).getTime() <= DUE_CUTOFF;
		return isDue && (!workspaceId || card.workspaceId === workspaceId);
	});

export const selectWorkspaceById = (workspaceId: string) => (state: AppStore) =>
	state.workspaces.find((workspace) => workspace.id === workspaceId || workspace.slug === workspaceId) ?? null;

export const selectResourceById = (resourceId: string) => (state: AppStore) =>
	state.resources.find((resource) => resource.id === resourceId) ?? null;

export const selectConceptsForWorkspace = (workspaceId: string) => (state: AppStore) =>
	state.concepts.filter((concept) => concept.workspaceId === workspaceId);

export const selectProgressForWorkspace = (workspaceId: string) => (state: AppStore) =>
	state.progressSnapshots.filter((snapshot) => snapshot.workspaceId === workspaceId);

export const getRecallRatingLabel = (rating: RecallRating) => {
	const labels: Record<RecallRating, string> = {
		again: "Again",
		hard: "Hard",
		good: "Good",
		easy: "Easy",
	};

	return labels[rating];
};

export function applyRecallRatingPreview(strength: number, rating: RecallRating) {
	const deltas: Record<RecallRating, number> = {
		again: -16,
		hard: 4,
		good: 12,
		easy: 20,
	};

	return clamp(strength + deltas[rating]);
}
