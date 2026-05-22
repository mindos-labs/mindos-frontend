"use client";

import { motion } from "framer-motion";
import { BookOpen, Brain, CheckCircle2, Play, RefreshCcw, Target } from "lucide-react";
import { mockMission } from "@/components/app/data";
import { useToast } from "@/components/app/toast";

const missionIcons = {
	learn: BookOpen,
	recall: Brain,
	practice: Target,
	repair: RefreshCcw,
};

export function MissionCard() {
	const toast = useToast();

	return (
		<motion.section
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_80px_-50px_rgba(15,23,42,0.65)] dark:border-white/10 dark:bg-white/5"
		>
			<div className="border-b border-slate-100 p-5 md:p-6 dark:border-white/10">
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">Today&apos;s Mission</p>
						<h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Know what to study next</h2>
						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
							NeuroPilot has sequenced today by readiness impact: learn the next concept, recall what is fading, then repair weak spots.
						</p>
					</div>
					<button
						type="button"
						onClick={() =>
							toast({
								title: "Focus session started",
								description: "Timer, lesson, and recall queue are mocked locally for this slice.",
								tone: "success",
							})
						}
						className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
					>
						<Play className="size-4" aria-hidden />
						Start Focus Session
					</button>
				</div>
			</div>

			<div className="grid gap-3 p-5 sm:grid-cols-2 md:p-6 xl:grid-cols-4">
				{mockMission.map((item, index) => {
					const Icon = missionIcons[item.kind];
					return (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/40"
						>
							<div className="flex items-center justify-between">
								<div className="grid size-9 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-white/10 dark:text-indigo-200">
									<Icon className="size-4" aria-hidden />
								</div>
								<CheckCircle2 className="size-4 text-slate-300 dark:text-slate-600" aria-hidden />
							</div>
							<p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{item.label}</p>
							<p className="mt-1 text-base font-bold text-slate-950 dark:text-white">{item.title}</p>
							<p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{item.duration}</p>
						</motion.div>
					);
				})}
			</div>
		</motion.section>
	);
}
