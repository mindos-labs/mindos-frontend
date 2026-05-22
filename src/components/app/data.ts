import {
	BookOpen,
	Brain,
	Code2,
	FileText,
	GraduationCap,
	Languages,
	Lightbulb,
	type LucideIcon,
} from "lucide-react";

export type User = {
	name: string;
	email: string;
	streak: number;
	avatarInitials: string;
};

export type Workspace = {
	id: string;
	title: string;
	description: string;
	icon: LucideIcon;
	progress: number;
	memoryScore: number;
	resourcesCount: number;
	flashcardsDue: number;
	lastStudied: string;
	nextAction: string;
	color: string;
};

export type ResourceType = "pdf" | "youtube" | "web" | "notes" | "flashcards";
export type ProcessingStatus = "ready" | "processing" | "queued" | "failed";

export type Resource = {
	id: string;
	workspaceId: string;
	title: string;
	type: ResourceType;
	status: ProcessingStatus;
	conceptsFound: number;
	flashcardsGenerated: number;
	weakConcepts: number;
	lastOpened: string;
	summary: string;
	keyConcepts: string[];
	sections: string[];
};

export type ConceptStatus = "mastered" | "learning" | "weak";

export type Concept = {
	id: string;
	workspaceId: string;
	title: string;
	status: ConceptStatus;
	mastery: number;
	recommendedAction: string;
};

export type Flashcard = {
	id: string;
	workspaceId: string;
	question: string;
	answer: string;
	strength: number;
	dueLabel: string;
};

export type RecallAttempt = {
	id: string;
	cardId: string;
	rating: "again" | "hard" | "good" | "easy";
	createdAt: string;
};

export type LearningPlanDay = {
	day: string;
	focus: string;
	items: string[];
	minutes: number;
	readinessGain: number;
};

export type LearningPlan = {
	goal: string;
	deadline: string;
	availableTime: string;
	currentReadiness: number;
	days: LearningPlanDay[];
};

export type TutorMessage = {
	id: string;
	role: "user" | "ai";
	content: string;
	citations?: string[];
};

export type ProgressSnapshot = {
	date: string;
	readiness: number;
	recallAccuracy: number;
	memoryStrength: number;
	sessions: number;
};

export type StudySession = {
	id: string;
	workspaceId: string;
	title: string;
	minutes: number;
	type: "learn" | "recall" | "quiz" | "repair";
	completedAt: string;
};

export type MissionItem = {
	id: string;
	label: string;
	title: string;
	duration: string;
	kind: "learn" | "recall" | "practice" | "repair";
};

export const mockUser: User = {
	name: "Shaswat",
	email: "sh20raj@gmail.com",
	streak: 6,
	avatarInitials: "SR",
};

export const mockWorkspaces: Workspace[] = [
	{
		id: "coa",
		title: "Computer Organization & Architecture",
		description: "Memory hierarchy, instruction cycle, pipelining, and exam repair.",
		icon: GraduationCap,
		progress: 64,
		memoryScore: 78,
		resourcesCount: 7,
		flashcardsDue: 18,
		lastStudied: "Today",
		nextAction: "Continue Cache Mapping",
		color: "indigo",
	},
	{
		id: "full-stack",
		title: "Full Stack Development",
		description: "React, APIs, authentication, databases, and production patterns.",
		icon: Code2,
		progress: 46,
		memoryScore: 71,
		resourcesCount: 9,
		flashcardsDue: 12,
		lastStudied: "Yesterday",
		nextAction: "Practice server actions",
		color: "cyan",
	},
	{
		id: "ml-basics",
		title: "Machine Learning Basics",
		description: "Regression, classification, evaluation, and neural network intuition.",
		icon: Brain,
		progress: 38,
		memoryScore: 66,
		resourcesCount: 5,
		flashcardsDue: 8,
		lastStudied: "2 days ago",
		nextAction: "Repair gradient descent",
		color: "emerald",
	},
	{
		id: "english-vocabulary",
		title: "English Vocabulary",
		description: "Spaced word recall with contextual examples and usage drills.",
		icon: Languages,
		progress: 72,
		memoryScore: 82,
		resourcesCount: 4,
		flashcardsDue: 4,
		lastStudied: "Today",
		nextAction: "Review 4 weak words",
		color: "violet",
	},
];

export const mockMission: MissionItem[] = [
	{ id: "m1", label: "Learn", title: "Cache Mapping", duration: "25 min", kind: "learn" },
	{ id: "m2", label: "Recall", title: "18 cards due", duration: "15 min", kind: "recall" },
	{ id: "m3", label: "Practice", title: "5 PYQs", duration: "20 min", kind: "practice" },
	{ id: "m4", label: "Repair", title: "Pipeline Hazards", duration: "10 min", kind: "repair" },
];

export const mockResources: Resource[] = [
	{
		id: "coa-module-1",
		workspaceId: "coa",
		title: "COA Module 1.pdf",
		type: "pdf",
		status: "ready",
		conceptsFound: 11,
		flashcardsGenerated: 64,
		weakConcepts: 3,
		lastOpened: "18 min ago",
		summary:
			"Introduces number systems, instruction cycles, memory hierarchy, and cache organization with exam-focused examples.",
		keyConcepts: ["Number Systems", "Instruction Cycle", "Cache Mapping", "Pipelining"],
		sections: ["Digital computer basics", "CPU organization", "Memory hierarchy", "Cache mapping methods"],
	},
	{
		id: "cache-youtube",
		workspaceId: "coa",
		title: "Cache Mapping YouTube Lecture",
		type: "youtube",
		status: "ready",
		conceptsFound: 7,
		flashcardsGenerated: 28,
		weakConcepts: 2,
		lastOpened: "Today",
		summary:
			"Video walkthrough of direct, associative, and set associative mapping using small address traces.",
		keyConcepts: ["Direct Mapping", "Associative Mapping", "Set Associative Mapping"],
		sections: ["Cache blocks", "Tag comparison", "Conflict misses", "Replacement examples"],
	},
	{
		id: "os-notes",
		workspaceId: "full-stack",
		title: "Operating System Notes",
		type: "notes",
		status: "ready",
		conceptsFound: 14,
		flashcardsGenerated: 45,
		weakConcepts: 1,
		lastOpened: "Yesterday",
		summary: "Concise notes on processes, threads, scheduling, deadlocks, and virtual memory.",
		keyConcepts: ["Processes", "Scheduling", "Deadlocks", "Virtual Memory"],
		sections: ["Process states", "CPU scheduling", "Deadlock prevention", "Paging"],
	},
	{
		id: "ai-paper",
		workspaceId: "ml-basics",
		title: "AI Research Paper.pdf",
		type: "pdf",
		status: "processing",
		conceptsFound: 18,
		flashcardsGenerated: 0,
		weakConcepts: 0,
		lastOpened: "Queued",
		summary: "NeuroPilot is extracting claims, figures, assumptions, and glossary terms from this paper.",
		keyConcepts: ["Transformers", "Attention", "Evaluation"],
		sections: ["Abstract", "Method", "Experiments", "Limitations"],
	},
	{
		id: "js-closures",
		workspaceId: "full-stack",
		title: "JavaScript Closures Article",
		type: "web",
		status: "ready",
		conceptsFound: 6,
		flashcardsGenerated: 18,
		weakConcepts: 1,
		lastOpened: "3 days ago",
		summary: "Practical explanation of closures, lexical scope, and examples from UI event handlers.",
		keyConcepts: ["Closures", "Lexical Scope", "Callbacks"],
		sections: ["Definition", "Examples", "Common mistakes"],
	},
];

export const mockConcepts: Concept[] = [
	{ id: "number-systems", workspaceId: "coa", title: "Number Systems", status: "mastered", mastery: 91, recommendedAction: "Quick mixed recall" },
	{ id: "instruction-cycle", workspaceId: "coa", title: "Instruction Cycle", status: "learning", mastery: 69, recommendedAction: "Explain fetch-decode-execute" },
	{ id: "addressing-modes", workspaceId: "coa", title: "Addressing Modes", status: "weak", mastery: 44, recommendedAction: "Repair with 6 examples" },
	{ id: "memory-hierarchy", workspaceId: "coa", title: "Memory Hierarchy", status: "learning", mastery: 74, recommendedAction: "Compare latency tiers" },
	{ id: "cache-mapping", workspaceId: "coa", title: "Cache Mapping", status: "weak", mastery: 52, recommendedAction: "Do a trace quiz" },
	{ id: "direct-mapping", workspaceId: "coa", title: "Direct Mapping", status: "learning", mastery: 66, recommendedAction: "Recall address fields" },
	{ id: "associative-mapping", workspaceId: "coa", title: "Associative Mapping", status: "weak", mastery: 39, recommendedAction: "5-minute explanation" },
	{ id: "set-associative-mapping", workspaceId: "coa", title: "Set Associative Mapping", status: "learning", mastery: 58, recommendedAction: "Compare with direct mapping" },
	{ id: "pipelining", workspaceId: "coa", title: "Pipelining", status: "learning", mastery: 61, recommendedAction: "Draw pipeline stages" },
	{ id: "pipeline-hazards", workspaceId: "coa", title: "Pipeline Hazards", status: "weak", mastery: 35, recommendedAction: "Repair now" },
	{ id: "virtual-memory", workspaceId: "coa", title: "Virtual Memory", status: "weak", mastery: 48, recommendedAction: "Review paging and TLB" },
];

export const mockFlashcards: Flashcard[] = [
	{
		id: "fc-1",
		workspaceId: "coa",
		question: "What is direct cache mapping?",
		answer:
			"Direct mapping places each memory block into exactly one cache line using a modulo relationship between the block number and cache size.",
		strength: 58,
		dueLabel: "Due now",
	},
	{
		id: "fc-2",
		workspaceId: "coa",
		question: "Why can direct mapping create conflict misses?",
		answer:
			"Different memory blocks may map to the same cache line, so they replace each other even when other cache lines are empty.",
		strength: 46,
		dueLabel: "Due today",
	},
	{
		id: "fc-3",
		workspaceId: "coa",
		question: "Name the three main types of pipeline hazards.",
		answer: "Structural hazards, data hazards, and control hazards.",
		strength: 39,
		dueLabel: "Overdue",
	},
	{
		id: "fc-4",
		workspaceId: "full-stack",
		question: "What does a JavaScript closure capture?",
		answer: "A closure captures references to variables from its lexical environment.",
		strength: 74,
		dueLabel: "Due tomorrow",
	},
];

export const mockRecallAttempts: RecallAttempt[] = [
	{ id: "ra-1", cardId: "fc-1", rating: "good", createdAt: "2026-05-21" },
	{ id: "ra-2", cardId: "fc-2", rating: "hard", createdAt: "2026-05-21" },
	{ id: "ra-3", cardId: "fc-3", rating: "again", createdAt: "2026-05-20" },
];

export const mockLearningPlan: LearningPlan = {
	goal: "COA End Sem",
	deadline: "2 days",
	availableTime: "6 hours/day",
	currentReadiness: 41,
	days: [
		{
			day: "Day 1",
			focus: "Build the map",
			items: ["Module 1 foundations", "Cache mapping", "20 recall cards", "5 PYQs"],
			minutes: 245,
			readinessGain: 16,
		},
		{
			day: "Day 2",
			focus: "Repair and simulate",
			items: ["Weakness repair", "Full mock", "Formula recall", "Final revision"],
			minutes: 260,
			readinessGain: 21,
		},
		{
			day: "Buffer",
			focus: "Only if energy is high",
			items: ["Virtual memory summary", "Pipeline hazard quiz", "Sleep consolidation review"],
			minutes: 70,
			readinessGain: 6,
		},
	],
};

export const mockTutorMessages: TutorMessage[] = [
	{
		id: "tm-1",
		role: "user",
		content: "Explain cache mapping simply.",
	},
	{
		id: "tm-2",
		role: "ai",
		content:
			"Think of cache as a small fast notebook beside the CPU. Cache mapping is the rule that decides which page of the big textbook is allowed to sit on which notebook page.",
		citations: ["COA Module 1, page 4", "Cache Mapping Lecture, 12:40"],
	},
];

export const mockProgressSnapshots: ProgressSnapshot[] = [
	{ date: "Mon", readiness: 42, recallAccuracy: 76, memoryStrength: 61, sessions: 2 },
	{ date: "Tue", readiness: 48, recallAccuracy: 79, memoryStrength: 65, sessions: 3 },
	{ date: "Wed", readiness: 55, recallAccuracy: 81, memoryStrength: 69, sessions: 2 },
	{ date: "Thu", readiness: 61, recallAccuracy: 84, memoryStrength: 74, sessions: 4 },
	{ date: "Fri", readiness: 72, recallAccuracy: 84, memoryStrength: 78, sessions: 3 },
];

export const mockStudySessions: StudySession[] = [
	{ id: "ss-1", workspaceId: "coa", title: "Cache mapping lesson", minutes: 28, type: "learn", completedAt: "Today" },
	{ id: "ss-2", workspaceId: "coa", title: "Recall sprint", minutes: 16, type: "recall", completedAt: "Today" },
	{ id: "ss-3", workspaceId: "coa", title: "Pipeline hazards repair", minutes: 12, type: "repair", completedAt: "Yesterday" },
	{ id: "ss-4", workspaceId: "full-stack", title: "Closures quiz", minutes: 18, type: "quiz", completedAt: "Yesterday" },
];

export const sciencePrinciples = [
	{ title: "Active recall", body: "You retrieve ideas before reviewing, which makes memory harder to lose." },
	{ title: "Spacing", body: "Reviews are scheduled right before forgetting, so fewer sessions do more work." },
	{ title: "Feedback", body: "Weak answers are repaired immediately with explanations, examples, and new cards." },
	{ title: "Consolidation", body: "Plans leave room for sleep and light review, because memory improves after rest." },
];

export const quickActions = [
	"Explain simply",
	"Quiz me",
	"Make mnemonic",
	"Create flashcards",
	"Find weak spots",
];

export const tutorModes = [
	{ title: "Explain simply", icon: Lightbulb },
	{ title: "Quiz me", icon: Brain },
	{ title: "Socratic mode", icon: BookOpen },
	{ title: "Solve with me", icon: GraduationCap },
	{ title: "Create examples", icon: FileText },
	{ title: "Make mnemonics", icon: Languages },
	{ title: "Find weak spots", icon: Brain },
	{ title: "Exam simulator", icon: GraduationCap },
];

export function getWorkspace(workspaceId: string) {
	return mockWorkspaces.find((workspace) => workspace.id === workspaceId) ?? mockWorkspaces[0];
}

export function getResource(resourceId: string) {
	return mockResources.find((resource) => resource.id === resourceId) ?? mockResources[0];
}

export function workspaceResources(workspaceId: string) {
	return mockResources.filter((resource) => resource.workspaceId === workspaceId);
}

export function workspaceConcepts(workspaceId: string) {
	return mockConcepts.filter((concept) => concept.workspaceId === workspaceId);
}
