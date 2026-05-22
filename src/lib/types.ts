export type ID = string;

export type ThemePreference = "light" | "dark" | "system";

export type PlanTier = "free" | "pro" | "student-india";

export type LearningGoal =
	| "exam-prep"
	| "programming"
	| "language"
	| "research-paper"
	| "college-subject"
	| "career-skill"
	| "custom";

export type KnowledgeLevel = "beginner" | "some-basics" | "intermediate" | "advanced";

export type WorkspaceStatus = "active" | "paused" | "archived";

export type ResourceType = "pdf" | "youtube" | "web" | "notes" | "flashcards";

export type ProcessingStatus = "queued" | "processing" | "ready" | "failed";

export type ConceptStatus = "mastered" | "learning" | "weak" | "unseen";

export type FlashcardType = "basic" | "cloze" | "application";

export type RecallRating = "again" | "hard" | "good" | "easy";

export type PlanTaskKind = "learn" | "recall" | "practice" | "repair" | "quiz" | "review";

export type PlanTaskStatus = "not-started" | "in-progress" | "done" | "skipped";

export type PlannerView = "path" | "calendar" | "weakness-first";

export type TutorRole = "user" | "assistant" | "system";

export type TutorMode =
	| "explain"
	| "quiz"
	| "socratic"
	| "solve"
	| "examples"
	| "mnemonics"
	| "weak-spots"
	| "exam-simulator";

export type StudySessionMode = "focus" | "lesson" | "recall" | "quiz" | "repair" | "planning";

export type ToastTone = "default" | "success" | "warning" | "error" | "info";

export type UploadStatus = "idle" | "uploading" | "processing" | "ready" | "failed";

export type AIProvider = "openai" | "anthropic" | "google" | "openrouter" | "groq" | "local";

export interface User {
	id: ID;
	name: string;
	email: string;
	avatarInitials: string;
	timezone: string;
	plan: PlanTier;
	streakDays: number;
	dailyTargetMinutes: number;
	preferredSessionMinutes: number;
	learningGoal: LearningGoal;
	knowledgeLevel: KnowledgeLevel;
	onboardingCompleted: boolean;
}

export interface Workspace {
	id: ID;
	slug: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	status: WorkspaceStatus;
	goal: string;
	deadline: string | null;
	progress: number;
	memoryScore: number;
	examReadiness: number;
	resourcesCount: number;
	flashcardsDue: number;
	weakConcepts: ID[];
	concepts: ID[];
	lastStudiedAt: string;
	weeklyTargetMinutes: number;
	createdAt: string;
}

export interface SourceCitation {
	id: ID;
	resourceId: ID;
	label: string;
	location: string;
	url?: string;
}

export interface ResourceSection {
	id: ID;
	title: string;
	summary: string;
	sourceRef: string;
	conceptIds: ID[];
}

export interface Resource {
	id: ID;
	workspaceId: ID;
	title: string;
	type: ResourceType;
	status: ProcessingStatus;
	url?: string;
	fileName?: string;
	sourceLabel: string;
	summary: string;
	conceptsFound: number;
	flashcardsGenerated: number;
	weakConcepts: number;
	lastOpenedAt: string | null;
	addedAt: string;
	readingTimeMinutes: number;
	progress: number;
	pages?: number;
	durationMinutes?: number;
	tags: string[];
	sections: ResourceSection[];
}

export interface Concept {
	id: ID;
	workspaceId: ID;
	title: string;
	status: ConceptStatus;
	mastery: number;
	memoryStrength: number;
	confidence: number;
	description: string;
	prerequisiteIds: ID[];
	relatedConceptIds: ID[];
	sourceResourceIds: ID[];
	lastPracticedAt: string | null;
	nextReviewAt: string | null;
	recommendedAction: string;
}

export interface Flashcard {
	id: ID;
	workspaceId: ID;
	conceptId: ID;
	resourceId?: ID;
	type: FlashcardType;
	front: string;
	back: string;
	difficulty: number;
	intervalDays: number;
	easeFactor: number;
	repetitions: number;
	lapses: number;
	strength: number;
	dueAt: string;
	lastReviewedAt: string | null;
	sourceCitation?: SourceCitation;
	tags: string[];
}

export interface RecallAttempt {
	id: ID;
	flashcardId: ID;
	workspaceId: ID;
	rating: RecallRating;
	answeredAt: string;
	responseTimeSeconds: number;
	previousStrength: number;
	nextStrength: number;
}

export interface PlanTask {
	id: ID;
	kind: PlanTaskKind;
	title: string;
	description: string;
	minutes: number;
	status: PlanTaskStatus;
	priority: "low" | "medium" | "high";
	conceptIds: ID[];
	resourceIds: ID[];
}

export interface PlanDay {
	id: ID;
	dayNumber: number;
	date: string;
	theme: string;
	totalMinutes: number;
	tasks: PlanTask[];
}

export interface LearningPlan {
	id: ID;
	workspaceId: ID;
	title: string;
	goal: string;
	deadline: string | null;
	availableMinutesPerDay: number;
	currentReadiness: number;
	status: "draft" | "active" | "complete";
	generatedAt: string;
	view: PlannerView;
	days: PlanDay[];
}

export interface TutorQuickAction {
	id: ID;
	label: string;
	action: "flashcards" | "quiz" | "notes" | "simpler" | "plan";
}

export interface TutorMessage {
	id: ID;
	role: TutorRole;
	content: string;
	workspaceId?: ID;
	resourceId?: ID;
	mode?: TutorMode;
	createdAt: string;
	citations?: SourceCitation[];
	quickActions?: TutorQuickAction[];
}

export interface ProgressSnapshot {
	id: ID;
	date: string;
	workspaceId: ID;
	examReadiness: number;
	memoryStrength: number;
	conceptCoverage: number;
	recallAccuracy: number;
	minutesStudied: number;
	cardsReviewed: number;
}

export interface StudySession {
	id: ID;
	workspaceId: ID;
	mode: StudySessionMode;
	startedAt: string;
	endedAt: string | null;
	durationMinutes: number;
	focusScore: number;
	completedTaskIds: ID[];
	notes: string;
}

export interface UploadDraft {
	id: ID;
	name: string;
	type: ResourceType;
	sizeBytes?: number;
	status: UploadStatus;
	progress: number;
	workspaceId: ID;
	createdAt: string;
	error?: string;
}

export interface SearchResult {
	id: ID;
	type: "workspace" | "resource" | "concept" | "flashcard" | "plan";
	title: string;
	subtitle: string;
	href: string;
	meta?: string;
}

export interface Toast {
	id: ID;
	title: string;
	description?: string;
	tone: ToastTone;
	durationMs: number;
	createdAt: string;
}

export interface AISettings {
	provider: AIProvider;
	apiKey: string;
	model: string;
	embeddingModel: string;
	useOwnApiKey: boolean;
	saveChatHistory: boolean;
	sourceOnlyAnswers: boolean;
	socraticByDefault: boolean;
	autoGenerateFlashcards: boolean;
	autoGenerateQuizzes: boolean;
}

export interface BillingUsage {
	workspacesUsed: number;
	resourcesUploaded: number;
	aiMessages: number;
	flashcardsGenerated: number;
	workspaceLimit: number | "unlimited";
	resourceLimit: number | "unlimited";
	aiMessageLimit: number | "unlimited";
	flashcardLimit: number | "unlimited";
}

export interface DailyMissionItem {
	id: ID;
	kind: PlanTaskKind;
	title: string;
	minutes: number;
	status: PlanTaskStatus;
	conceptId?: ID;
	workspaceId: ID;
}

export interface DailyMission {
	id: ID;
	date: string;
	totalMinutes: number;
	items: DailyMissionItem[];
	coachPrompt: string;
}

export interface UploadResourceInput {
	workspaceId: ID;
	name: string;
	type?: ResourceType;
	sizeBytes?: number;
	url?: string;
}
