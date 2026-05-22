export const publicUser = {
	name: "Shaswat",
	email: "sh20raj@gmail.com",
};

export const heroMissionItems = [
	{ label: "Learn", title: "Cache Mapping", time: "25 min", tone: "indigo" },
	{ label: "Recall", title: "18 cards due", time: "15 min", tone: "cyan" },
	{ label: "Practice", title: "5 PYQs", time: "20 min", tone: "slate" },
	{ label: "Repair", title: "Pipeline Hazards", time: "10 min", tone: "rose" },
];

export const featureCards = [
	{
		key: "path",
		title: "AI Learning Path",
		description: "Turns scattered material into a paced path with the exact next lesson, recall block, and practice target.",
	},
	{
		key: "tutor",
		title: "Source-grounded AI Tutor",
		description: "Ask questions against your uploaded sources with clean citations and study-focused explanations.",
	},
	{
		key: "recall",
		title: "Active Recall",
		description: "Checkpoint prompts after every section help you retrieve ideas before you move on.",
	},
	{
		key: "spacing",
		title: "Spaced Repetition",
		description: "Reviews are scheduled by memory strength, not by guilt or random calendar reminders.",
	},
	{
		key: "repair",
		title: "Weakness Repair",
		description: "NeuroPilot finds fragile concepts and routes you into short explanations, examples, and quizzes.",
	},
	{
		key: "progress",
		title: "Progress Map",
		description: "See readiness, coverage, recall accuracy, and concept mastery in one calm command center.",
	},
];

export const scienceNotes = [
	{
		title: "Active recall",
		description: "The app asks you to retrieve an answer before showing it. That retrieval effort is where memory gets stronger.",
	},
	{
		title: "Spacing",
		description: "Reviews return right before ideas fade, so you spend less time rereading and more time retaining.",
	},
	{
		title: "Feedback",
		description: "Every quiz answer becomes signal. Weak points are repaired instead of hidden inside an average score.",
	},
	{
		title: "Consolidation",
		description: "Plans favor short daily missions and end-of-day review, giving your brain cleaner material to consolidate.",
	},
];

export const useCases = [
	{ title: "Exam prep", description: "Convert modules, PYQs, and notes into a deadline-aware revision plan." },
	{ title: "Coding", description: "Learn concepts, syntax, and project patterns with recall checkpoints." },
	{ title: "Research papers", description: "Extract claims, methods, and citations into a teachable path." },
	{ title: "Languages", description: "Build vocabulary, grammar drills, and spaced reviews from your own materials." },
	{ title: "Professional skills", description: "Turn courses, docs, and PDFs into durable skills for work." },
];

export const pricingPlans = [
	{
		name: "Free",
		price: "$0",
		period: "forever",
		description: "A focused starter plan for trying the learning loop.",
		features: ["1 workspace", "3 resources", "50 flashcards", "Basic AI summary"],
		cta: "Start free",
		highlighted: false,
	},
	{
		name: "Pro",
		price: "$12",
		period: "per month",
		description: "For learners who want the full AI tutor, recall, and planning system.",
		features: [
			"Unlimited workspaces",
			"Unlimited flashcards",
			"AI tutor",
			"Advanced recall",
			"Exam planner",
			"Progress analytics",
		],
		cta: "Upgrade to Pro",
		highlighted: true,
	},
	{
		name: "Student India",
		price: "₹299",
		period: "per month",
		description: "Affordable local pricing placeholder with the same core Pro features.",
		features: ["Core Pro features", "Exam planner", "Advanced recall", "Priority student templates"],
		cta: "Join student plan",
		highlighted: false,
	},
];

export const faqs = [
	{
		question: "Is NeuroPilot just a chatbot?",
		answer: "No. The tutor is one part of a guided loop: goal, resources, plan, daily mission, recall, quiz, repair, and progress.",
	},
	{
		question: "Can I start without uploading anything?",
		answer: "Yes. The onboarding flow includes a no-resource path, and you can add PDFs, notes, videos, or links later.",
	},
	{
		question: "Are the AI answers grounded in my sources?",
		answer: "The product UI is designed around source-grounded answers with citation chips. This slice uses mock data only.",
	},
	{
		question: "Does this include real payments or authentication?",
		answer: "No. Pricing, login, and signup are frontend-only mock flows with safe placeholder interactions.",
	},
];

export const onboardingGoals = [
	"Exam prep",
	"Programming",
	"Language",
	"Research paper",
	"College subject",
	"Career skill",
	"Custom",
];

export const onboardingDeadlines = ["3 days", "1 week", "1 month", "No deadline"];

export const onboardingLevels = ["Beginner", "Some basics", "Intermediate", "Advanced"];

export const onboardingMaterials = [
	"Upload PDF",
	"Paste YouTube link",
	"Paste website",
	"Import notes",
	"Start without resources",
];

export const diagnosticQuestions = [
	{
		question: "What is the main purpose of cache memory?",
		options: ["Long-term storage", "Reduce CPU memory access time", "Store operating system files", "Compile programs"],
	},
	{
		question: "Which mapping method gives a block only one possible cache line?",
		options: ["Direct mapping", "Associative mapping", "Set associative mapping", "Virtual mapping"],
	},
	{
		question: "What usually causes a pipeline hazard?",
		options: ["Too much storage", "Instruction dependency", "High screen refresh", "Low file size"],
	},
	{
		question: "What does active recall ask you to do?",
		options: ["Reread notes", "Retrieve from memory", "Highlight faster", "Watch at 2x speed"],
	},
	{
		question: "Why does spaced repetition work?",
		options: ["It removes practice", "It times reviews before forgetting", "It skips weak ideas", "It only works at night"],
	},
];

export const generatedPlan = [
	{
		day: "Day 1",
		focus: "Foundations and diagnostic repair",
		tasks: ["Map source material", "Number Systems", "Instruction Cycle", "10 recall cards"],
		readiness: 18,
	},
	{
		day: "Day 2",
		focus: "Memory hierarchy",
		tasks: ["Memory Hierarchy", "Cache Mapping overview", "Explain from memory", "12 recall cards"],
		readiness: 29,
	},
	{
		day: "Day 3",
		focus: "Mapping strategies",
		tasks: ["Direct Mapping", "Associative Mapping", "Set Associative Mapping", "Mini quiz"],
		readiness: 41,
	},
	{
		day: "Day 4",
		focus: "CPU execution flow",
		tasks: ["Addressing Modes", "Pipelining", "Worked examples", "15 recall cards"],
		readiness: 53,
	},
	{
		day: "Day 5",
		focus: "Weakness repair",
		tasks: ["Pipeline Hazards", "Cache misses", "Tutor Socratic drill", "5 PYQs"],
		readiness: 64,
	},
	{
		day: "Day 6",
		focus: "Exam simulation",
		tasks: ["Timed mock", "Formula recall", "Repair wrong answers", "Review weak flashcards"],
		readiness: 74,
	},
	{
		day: "Day 7",
		focus: "Final consolidation",
		tasks: ["Full revision", "High-yield recall", "Confidence check", "Light review"],
		readiness: 82,
	},
];
