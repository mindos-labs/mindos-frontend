"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	ArrowRight,
	BrainCircuit,
	CalendarDays,
	Check,
	ClipboardList,
	GraduationCap,
	Loader2,
	Sparkles,
	Target,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { UploadDropzone, type UploadItem } from "@/components/app/UploadDropzone";
import {
	diagnosticQuestions,
	generatedPlan,
	onboardingDeadlines,
	onboardingGoals,
	onboardingLevels,
	onboardingMaterials,
	publicUser,
} from "./data";
import { ActionButton, BrandMark, ButtonLink, ProgressBar, Toast, cn } from "./ui";

type Selections = {
	goal: string;
	deadline: string;
	level: string;
	material: string;
};

const steps = [
	{ title: "Goal", icon: Target },
	{ title: "Deadline", icon: CalendarDays },
	{ title: "Level", icon: GraduationCap },
	{ title: "Material", icon: ClipboardList },
	{ title: "Diagnostic", icon: BrainCircuit },
	{ title: "Plan", icon: Sparkles },
];

export function OnboardingFlow() {
	const [step, setStep] = useState(0);
	const [toast, setToast] = useState<string | null>(null);
	const [generating, setGenerating] = useState(false);
	const [uploads, setUploads] = useState<UploadItem[]>([]);
	const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
	const [selections, setSelections] = useState<Selections>({
		goal: "Exam prep",
		deadline: "1 week",
		level: "Some basics",
		material: "Upload PDF",
	});

	useEffect(() => {
		if (!toast) {
			return;
		}
		const timer = window.setTimeout(() => setToast(null), 3000);
		return () => window.clearTimeout(timer);
	}, [toast]);

	const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

	function updateSelection(key: keyof Selections, value: string) {
		setSelections((current) => ({ ...current, [key]: value }));
	}

	function goNext() {
		if (step === 4) {
			setGenerating(true);
			window.setTimeout(() => {
				setGenerating(false);
				setStep(5);
				setToast("Generated a 7-day plan from your mock onboarding answers.");
			}, 900);
			return;
		}
		setStep((current) => Math.min(current + 1, steps.length - 1));
	}

	function goBack() {
		setStep((current) => Math.max(current - 1, 0));
	}

	return (
		<main className="min-h-screen bg-[#f8fafc] font-sans text-slate-950">
			<div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
				<header className="flex items-center justify-between">
					<BrandMark />
					<div className="flex items-center gap-2">
						<ButtonLink href="/" variant="ghost" className="hidden h-10 px-4 sm:inline-flex">
							Home
						</ButtonLink>
						<ButtonLink href="/signup" variant="secondary" className="h-10 px-4">
							Sign up
						</ButtonLink>
					</div>
				</header>
				<div className="grid flex-1 gap-8 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-12">
					<aside className="lg:sticky lg:top-8 lg:h-fit">
						<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
							<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">Onboarding</p>
							<h1 className="mt-4 text-4xl font-semibold tracking-normal text-slate-950">Build your first learning path.</h1>
							<p className="mt-4 text-sm leading-7 text-slate-600">
								Answer a few setup questions, add optional material, preview a diagnostic quiz, and generate a study plan for {publicUser.name}.
							</p>
							<div className="mt-6">
								<div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
									<span>Step {step + 1} of {steps.length}</span>
									<span>{Math.round(progress)}%</span>
								</div>
								<ProgressBar value={progress} />
							</div>
							<div className="mt-6 space-y-3">
								{steps.map((item, index) => {
									const Icon = item.icon;
									return (
										<button
											key={item.title}
											type="button"
											onClick={() => {
												if (index <= step) {
													setStep(index);
												}
											}}
											className={cn(
												"flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
												index === step
													? "border-indigo-200 bg-indigo-50 text-indigo-950"
													: index < step
														? "border-emerald-200 bg-emerald-50 text-emerald-900"
														: "border-slate-200 bg-slate-50 text-slate-500",
											)}
											aria-current={index === step ? "step" : undefined}
										>
											<div className="grid size-9 place-items-center rounded-2xl bg-white shadow-sm">
												{index < step ? <Check className="size-4 text-emerald-600" aria-hidden /> : <Icon className="size-4" aria-hidden />}
											</div>
											<div>
												<p className="text-sm font-semibold">{item.title}</p>
												<p className="mt-1 text-xs font-medium opacity-70">{index < step ? "Complete" : index === step ? "In progress" : "Locked"}</p>
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</aside>
					<section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10 sm:p-8">
						<AnimatePresence mode="wait">
							<motion.div
								key={step}
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -12 }}
								transition={{ duration: 0.25, ease: "easeOut" }}
							>
								{step === 0 ? <ChoiceStep title="What do you want to master?" options={onboardingGoals} value={selections.goal} onChange={(value) => updateSelection("goal", value)} /> : null}
								{step === 1 ? <ChoiceStep title="When do you need to learn this by?" options={onboardingDeadlines} value={selections.deadline} onChange={(value) => updateSelection("deadline", value)} /> : null}
								{step === 2 ? <ChoiceStep title="How much do you already know?" options={onboardingLevels} value={selections.level} onChange={(value) => updateSelection("level", value)} /> : null}
								{step === 3 ? (
									<MaterialStep
										value={selections.material}
										uploads={uploads}
										onChange={(value) => updateSelection("material", value)}
										onUploadsChange={setUploads}
										onToast={setToast}
									/>
								) : null}
								{step === 4 ? (
									<DiagnosticStep answers={quizAnswers} onAnswer={(index, answer) => setQuizAnswers((current) => ({ ...current, [index]: answer }))} />
								) : null}
								{step === 5 ? <PlanStep selections={selections} uploads={uploads} onToast={setToast} /> : null}
							</motion.div>
						</AnimatePresence>
						<div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
							<ActionButton type="button" variant="secondary" onClick={goBack} disabled={step === 0 || generating}>
								<ArrowLeft className="mr-2 size-4" aria-hidden />
								Back
							</ActionButton>
							<div className="flex flex-col gap-3 sm:flex-row">
								{step === 4 ? (
									<ActionButton type="button" variant="ghost" onClick={() => setToast("Diagnostic skipped. The plan will start with a broader baseline.")}>
										Skip diagnostic
									</ActionButton>
								) : null}
								{step < 5 ? (
									<ActionButton type="button" onClick={goNext} loading={generating}>
										{generating ? "Generating plan" : "Continue"}
										{!generating ? <ArrowRight className="ml-2 size-4" aria-hidden /> : null}
									</ActionButton>
								) : (
									<ActionButton type="button" onClick={() => setToast("Day 1 would open the Today page in the full app shell.")}>
										Start Day 1
										<ArrowRight className="ml-2 size-4" aria-hidden />
									</ActionButton>
								)}
							</div>
						</div>
					</section>
				</div>
			</div>
			<AnimatePresence>
				<Toast message={toast} onClose={() => setToast(null)} />
			</AnimatePresence>
		</main>
	);
}

function ChoiceStep({
	title,
	options,
	value,
	onChange,
}: {
	title: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div>
			<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">Setup</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">{title}</h2>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Pick the closest option. You can change this later inside settings and planner.</p>
			<div className="mt-8 grid gap-3 sm:grid-cols-2">
				{options.map((option) => (
					<button
						key={option}
						type="button"
						onClick={() => onChange(option)}
						className={cn(
							"flex min-h-20 items-center justify-between gap-4 rounded-[1.25rem] border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
							value === option ? "border-indigo-300 bg-indigo-50 shadow-sm" : "border-slate-200 bg-white shadow-sm",
						)}
						aria-pressed={value === option}
					>
						<span className="text-base font-semibold text-slate-950">{option}</span>
						<span className={cn("grid size-6 place-items-center rounded-full border", value === option ? "border-indigo-700 bg-indigo-700 text-white" : "border-slate-300 text-transparent")}>
							<Check className="size-3.5" aria-hidden />
						</span>
					</button>
				))}
			</div>
		</div>
	);
}

function MaterialStep({
	value,
	uploads,
	onChange,
	onUploadsChange,
	onToast,
}: {
	value: string;
	uploads: UploadItem[];
	onChange: (value: string) => void;
	onUploadsChange: (items: UploadItem[]) => void;
	onToast: (message: string) => void;
}) {
	return (
		<div>
			<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">Material</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Add your learning material</h2>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
				Choose how you want to start. The upload area uses fake local processing, so no files leave your machine.
			</p>
			<div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{onboardingMaterials.map((option) => (
					<button
						key={option}
						type="button"
						onClick={() => onChange(option)}
						className={cn(
							"rounded-[1.25rem] border p-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
							value === option ? "border-indigo-300 bg-indigo-50 text-indigo-950" : "border-slate-200 bg-white text-slate-700",
						)}
						aria-pressed={value === option}
					>
						{option}
					</button>
				))}
			</div>
			<div className="mt-6">
				{value === "Start without resources" ? (
					<div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
						<h3 className="text-lg font-semibold text-slate-950">Start clean</h3>
						<p className="mt-2 text-sm leading-7 text-slate-600">
							NeuroPilot will generate a starter path and remind you to add sources when you enter the learning workspace.
						</p>
					</div>
				) : (
					<UploadDropzone onFilesChange={onUploadsChange} onToast={onToast} />
				)}
				{uploads.length > 0 ? <p className="mt-3 text-sm font-semibold text-emerald-700">{uploads.length} mock material item{uploads.length > 1 ? "s" : ""} connected.</p> : null}
			</div>
		</div>
	);
}

function DiagnosticStep({
	answers,
	onAnswer,
}: {
	answers: Record<number, string>;
	onAnswer: (index: number, answer: string) => void;
}) {
	return (
		<div>
			<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">Diagnostic preview</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Answer a few AI-generated baseline questions.</h2>
			<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
				This mock quiz shows how NeuroPilot estimates what to teach first. Answers only update local UI state.
			</p>
			<div className="mt-8 space-y-4">
				{diagnosticQuestions.map((question, index) => (
					<div key={question.question} className="rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
						<div className="flex items-start gap-3">
							<div className="grid size-8 shrink-0 place-items-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">{index + 1}</div>
							<div className="flex-1">
								<p className="font-semibold text-slate-950">{question.question}</p>
								<div className="mt-4 grid gap-2 sm:grid-cols-2">
									{question.options.map((option) => (
										<button
											key={option}
											type="button"
											onClick={() => onAnswer(index, option)}
											className={cn(
												"rounded-2xl border px-3 py-2 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
												answers[index] === option ? "border-indigo-300 bg-indigo-50 text-indigo-950" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white",
											)}
											aria-pressed={answers[index] === option}
										>
											{option}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function PlanStep({
	selections,
	uploads,
	onToast,
}: {
	selections: Selections;
	uploads: UploadItem[];
	onToast: (message: string) => void;
}) {
	return (
		<div>
			<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">Generated plan</p>
			<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">Your first 7-day learning path is ready.</h2>
			<div className="mt-5 grid gap-3 sm:grid-cols-3">
				{[
					["Goal", selections.goal],
					["Deadline", selections.deadline],
					["Starting level", selections.level],
				].map(([label, value]) => (
					<div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
						<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
						<p className="mt-2 text-sm font-semibold text-slate-950">{value}</p>
					</div>
				))}
			</div>
			<div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
				{uploads.length > 0 ? `${uploads.length} material item${uploads.length > 1 ? "s" : ""} will seed the workspace.` : "No resources yet. The plan starts with a starter curriculum."}
			</div>
			<div className="mt-8 space-y-4">
				{generatedPlan.map((day, index) => (
					<div key={day.day} className="relative rounded-[1.25rem] border border-slate-200 bg-white p-4 shadow-sm">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
							<div className="flex gap-4">
								<div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-sm font-semibold text-indigo-700">{index + 1}</div>
								<div>
									<p className="text-sm font-semibold text-slate-500">{day.day}</p>
									<h3 className="mt-1 text-lg font-semibold text-slate-950">{day.focus}</h3>
									<div className="mt-3 flex flex-wrap gap-2">
										{day.tasks.map((task) => (
											<span key={task} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
												{task}
											</span>
										))}
									</div>
								</div>
							</div>
							<div className="min-w-32 rounded-2xl border border-slate-200 bg-slate-50 p-3">
								<div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
									<span>Readiness</span>
									<span>{day.readiness}%</span>
								</div>
								<ProgressBar value={day.readiness} />
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="mt-6 flex flex-col gap-3 sm:flex-row">
				<ActionButton type="button" variant="secondary" onClick={() => onToast("Plan regeneration is mocked. A fresh path would appear after source analysis.")}>
					<Loader2 className="mr-2 size-4" aria-hidden />
					Regenerate plan
				</ActionButton>
				<ActionButton type="button" variant="ghost" onClick={() => onToast("Calendar export is a placeholder for a future integration.")}>
					Export to calendar
				</ActionButton>
			</div>
		</div>
	);
}
