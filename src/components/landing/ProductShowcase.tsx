"use client";

import { BarChart3, BookOpenCheck, Brain, FileText, MessageCircle, Repeat2 } from "lucide-react";
import { FadeIn, ProgressBar, SectionHeader, SectionShell } from "./ui";

const screenshots = [
	{
		title: "Today",
		description: "Daily mission with next study blocks and AI Coach context.",
		icon: BookOpenCheck,
	},
	{
		title: "Recall",
		description: "A memory gym with due cards, ratings, and weak-card repair.",
		icon: Repeat2,
	},
	{
		title: "Tutor",
		description: "Source-grounded explanations with citations and quick actions.",
		icon: MessageCircle,
	},
];

export function ProductShowcase() {
	return (
		<SectionShell>
			<div className="flex flex-col gap-10">
				<FadeIn>
					<SectionHeader
						eyebrow="Product preview"
						title="A calm cockpit for learning under pressure."
						description="Every screen is designed to answer the same question: what should I study next, and how do I know it stuck?"
					/>
				</FadeIn>
				<div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
					<FadeIn>
						<div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/10">
							<div className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
								<div className="flex flex-col gap-5 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
									<div>
										<p className="text-sm font-semibold text-slate-500">Workspace</p>
										<h3 className="mt-1 text-2xl font-semibold text-slate-950">Computer Organization & Architecture</h3>
									</div>
									<div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
										Memory 78%
									</div>
								</div>
								<div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
									<div className="rounded-2xl border border-slate-200 bg-white p-4">
										<p className="text-sm font-semibold text-slate-950">Sources</p>
										<div className="mt-4 space-y-3">
											{["COA Module 1.pdf", "Cache Mapping Lecture", "PYQ Set 2024"].map((source) => (
												<div key={source} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
													<FileText className="size-4 text-slate-500" aria-hidden />
													<p className="truncate text-sm font-medium text-slate-700">{source}</p>
												</div>
											))}
										</div>
									</div>
									<div className="rounded-2xl border border-slate-200 bg-white p-5">
										<div className="flex items-center justify-between gap-4">
											<div>
												<p className="text-sm font-semibold text-slate-500">Current lesson</p>
												<h4 className="mt-1 text-xl font-semibold text-slate-950">Cache Mapping</h4>
											</div>
											<Brain className="size-6 text-indigo-700" aria-hidden />
										</div>
										<p className="mt-4 text-sm leading-7 text-slate-600">
											Cache mapping decides where a main-memory block can sit in cache. Direct mapping is fastest to locate,
											while associative mapping is more flexible.
										</p>
										<div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
											<p className="text-sm font-semibold text-indigo-950">Recall checkpoint</p>
											<p className="mt-2 text-sm leading-6 text-indigo-900/75">Can you explain this without looking?</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</FadeIn>
					<div className="grid gap-4">
						{screenshots.map((item, index) => {
							const Icon = item.icon;
							return (
								<FadeIn key={item.title} delay={index * 0.06}>
									<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
										<div className="flex items-start gap-4">
											<div className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">
												<Icon className="size-5" aria-hidden />
											</div>
											<div>
												<h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
												<p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
											</div>
										</div>
									</div>
								</FadeIn>
							);
						})}
						<FadeIn delay={0.18}>
							<div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
								<div className="flex items-center gap-2">
									<BarChart3 className="size-4 text-emerald-600" aria-hidden />
									<p className="text-sm font-semibold text-slate-950">Readiness trend</p>
								</div>
								<div className="mt-5 space-y-4">
									{[
										["Coverage", 64],
										["Recall accuracy", 84],
										["Weakness repair", 58],
									].map(([label, value]) => (
										<div key={label}>
											<div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
												<span>{label}</span>
												<span>{value}%</span>
											</div>
											<ProgressBar value={Number(value)} />
										</div>
									))}
								</div>
							</div>
						</FadeIn>
					</div>
				</div>
			</div>
		</SectionShell>
	);
}
