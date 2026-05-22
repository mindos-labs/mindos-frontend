"use client";

import Link from "next/link";
import { BarChart3, Brain, CalendarClock, Library, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { LearningPathTimeline } from "@/components/app/LearningPathTimeline";
import { MissionCard } from "@/components/app/MissionCard";
import { ResourceCard } from "@/components/app/ResourceCard";
import { StatCard } from "@/components/app/StatCard";
import { StudyTimer } from "@/components/app/StudyTimer";
import { WeaknessList } from "@/components/app/WeaknessList";
import { mockResources, mockUser, mockWorkspaces } from "@/components/app/data";
import { useToast } from "@/components/app/toast";

export default function TodayPage() {
	const toast = useToast();

	return (
		<div className="mx-auto max-w-7xl space-y-6">
			<motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Today</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl dark:text-white">Good morning, {mockUser.name}.</h1>
					<p className="mt-3 text-lg text-slate-600 dark:text-slate-300">You have 52 minutes of high-impact study today.</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Link href="/app/planner" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
						View plan
					</Link>
					<button
						type="button"
						onClick={() => toast({ title: "Daily mission tuned", description: "Mock optimizer prioritized recall before new content.", tone: "success" })}
						className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950"
					>
						Optimize today
					</button>
				</div>
			</motion.div>

			<div className="grid gap-6 xl:grid-cols-[1fr,20rem]">
				<div className="space-y-6">
					<MissionCard />

					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<StatCard label="Memory Health" value="78%" icon={Brain} delta="+6" tone="emerald" />
						<StatCard label="Exam Readiness" value="61%" icon={Target} delta="+9" tone="indigo" />
						<StatCard label="Recall Accuracy" value="84%" icon={TrendingUp} delta="+3" tone="cyan" />
						<StatCard label="Weak Concepts" value="4" icon={BarChart3} tone="amber" />
					</div>

					<div className="grid gap-6 xl:grid-cols-2">
						<LearningPathTimeline />
						<WeaknessList />
					</div>

					<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
						<div className="flex items-center justify-between gap-3">
							<div>
								<h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent resources</h2>
								<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The sources currently driving your mission.</p>
							</div>
							<Link href="/app/library" className="text-sm font-bold text-indigo-700 dark:text-indigo-300">View all</Link>
						</div>
						<div className="mt-5 grid gap-4 lg:grid-cols-2">
							{mockResources.slice(0, 2).map((resource) => (
								<ResourceCard key={resource.id} resource={resource} />
							))}
						</div>
					</section>
				</div>

				<div className="space-y-6">
					<StudyTimer />
					<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
						<div className="flex items-center gap-3">
							<div className="grid size-10 place-items-center rounded-2xl bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">
								<CalendarClock className="size-5" aria-hidden />
							</div>
							<div>
								<h2 className="font-bold text-slate-950 dark:text-white">Upcoming reviews</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">Due in the next 24 hours</p>
							</div>
						</div>
						<div className="mt-5 space-y-3">
							{mockWorkspaces.map((workspace) => (
								<div key={workspace.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
									<div className="min-w-0">
										<p className="truncate text-sm font-bold text-slate-950 dark:text-white">{workspace.title}</p>
										<p className="text-xs text-slate-500 dark:text-slate-400">{workspace.nextAction}</p>
									</div>
									<span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-indigo-700 dark:bg-white/10 dark:text-indigo-200">{workspace.flashcardsDue}</span>
								</div>
							))}
						</div>
					</section>
					<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
						<div className="flex items-center gap-3">
							<div className="grid size-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
								<Library className="size-5" aria-hidden />
							</div>
							<div>
								<h2 className="font-bold text-slate-950 dark:text-white">Path signal</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">What changed overnight</p>
							</div>
						</div>
						<p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
							Associative mapping dropped after yesterday&apos;s quiz, so NeuroPilot moved a repair block before new virtual memory content.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
}
