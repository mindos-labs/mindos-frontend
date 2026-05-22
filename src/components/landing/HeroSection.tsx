"use client";

import { ArrowRight, Brain, CirclePlay, Clock3, MessageCircle, Repeat2, Sparkles, Target } from "lucide-react";
import { heroMissionItems } from "./data";
import { ActionButton, ButtonLink, FadeIn, ProgressBar, SectionShell, cn } from "./ui";

const toneClasses: Record<string, string> = {
	indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
	cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
	slate: "bg-slate-100 text-slate-700 border-slate-200",
	rose: "bg-rose-50 text-rose-700 border-rose-100",
};

export function HeroSection({ onDemo, onMockAction }: { onDemo: () => void; onMockAction: (message: string) => void }) {
	return (
		<SectionShell className="overflow-hidden pb-10 pt-12 sm:pt-16 lg:pb-20 lg:pt-24">
			<div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
				<FadeIn>
					<div>
						<div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
							<Sparkles className="size-4" aria-hidden />
							I always know what to study next.
						</div>
						<h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
							Learn anything faster. Remember it longer.
						</h1>
						<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
							Upload PDFs, videos, notes, and links. NeuroPilot turns them into a personalized learning path with AI tutoring,
							active recall, spaced repetition, and progress tracking.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<ButtonLink href="/signup" className="group h-12 px-6">
								Start learning free
								<ArrowRight className="ml-2 size-4 transition group-hover:translate-x-0.5" aria-hidden />
							</ButtonLink>
							<ActionButton type="button" variant="secondary" className="h-12 px-6" onClick={onDemo}>
								<CirclePlay className="mr-2 size-4" aria-hidden />
								Watch demo
							</ActionButton>
						</div>
						<div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
							{[
								["52m", "planned today"],
								["84%", "recall accuracy"],
								["4", "weak concepts"],
							].map(([value, label]) => (
								<div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
									<p className="text-2xl font-semibold text-slate-950">{value}</p>
									<p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
								</div>
							))}
						</div>
					</div>
				</FadeIn>
				<FadeIn delay={0.1}>
					<ProductPreview onMockAction={onMockAction} />
				</FadeIn>
			</div>
		</SectionShell>
	);
}

function ProductPreview({ onMockAction }: { onMockAction: (message: string) => void }) {
	return (
		<div className="relative">
			<div className="absolute -inset-6 rounded-[2rem] bg-indigo-100/50 blur-3xl" aria-hidden />
			<div className="relative rounded-[2rem] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10">
				<div className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-4 sm:p-5">
					<div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
						<div>
							<p className="text-sm font-semibold text-slate-950">Today&apos;s Mission</p>
							<p className="mt-1 text-xs font-medium text-slate-500">COA End Sem, 2 days left</p>
						</div>
						<div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
							6 day streak
						</div>
					</div>
					<div className="grid gap-3 py-4">
						{heroMissionItems.map((item, index) => (
							<button
								key={item.title}
								type="button"
								onClick={() => onMockAction(`${item.label}: ${item.title} added to your mock focus queue.`)}
								className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
							>
								<div
									className={cn(
										"grid size-10 place-items-center rounded-2xl border text-sm font-semibold",
										toneClasses[item.tone],
									)}
								>
									{index + 1}
								</div>
								<div className="min-w-0 flex-1">
									<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
									<p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
								</div>
								<div className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
									<Clock3 className="size-3.5" aria-hidden />
									{item.time}
								</div>
							</button>
						))}
					</div>
					<div className="grid gap-3 md:grid-cols-[1fr_0.9fr]">
						<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
							<div className="flex items-center gap-2">
								<Target className="size-4 text-indigo-700" aria-hidden />
								<p className="text-sm font-semibold text-slate-950">Exam Readiness</p>
							</div>
							<p className="mt-3 text-3xl font-semibold text-slate-950">61%</p>
							<ProgressBar value={61} className="mt-3" />
							<p className="mt-3 text-xs leading-5 text-slate-500">Weakness: Pipeline Hazards and associative mapping.</p>
						</div>
						<div className="rounded-2xl border border-indigo-100 bg-indigo-950 p-4 text-white shadow-sm">
							<div className="flex items-center gap-2">
								<Brain className="size-4 text-cyan-200" aria-hidden />
								<p className="text-sm font-semibold">AI Coach</p>
							</div>
							<p className="mt-3 text-sm leading-6 text-indigo-50">
								Your weakest concept today is associative mapping. Want a 5-minute explanation or a quiz?
							</p>
							<div className="mt-4 flex gap-2">
								<button
									type="button"
									onClick={() => onMockAction("Mock coach opened a 5-minute explanation.")}
									className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-indigo-950 transition hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									Explain
								</button>
								<button
									type="button"
									onClick={() => onMockAction("Mock quiz generated for associative mapping.")}
									className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
								>
									Quiz me
								</button>
							</div>
						</div>
					</div>
					<div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
						<div className="flex items-start gap-3">
							<div className="grid size-10 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
								<MessageCircle className="size-5" aria-hidden />
							</div>
							<div>
								<p className="text-sm font-semibold text-slate-950">Source-grounded reply</p>
								<p className="mt-1 text-sm leading-6 text-slate-600">
									Direct mapping is fast because each memory block has one target cache line.
								</p>
								<div className="mt-2 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
									COA Module 1, page 4
								</div>
							</div>
						</div>
					</div>
					<div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
						<Repeat2 className="size-4 text-emerald-500" aria-hidden />
						Recall: 18 cards due after today&apos;s lesson
					</div>
				</div>
			</div>
		</div>
	);
}
