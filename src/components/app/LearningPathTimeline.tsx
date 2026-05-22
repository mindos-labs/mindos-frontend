"use client";

import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockLearningPlan } from "@/components/app/data";

export function LearningPathTimeline() {
	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h2 className="text-lg font-bold text-slate-950 dark:text-white">Learning path timeline</h2>
					<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The path adapts around weak concepts and upcoming recall.</p>
				</div>
				<Sparkles className="size-5 text-cyan-500" aria-hidden />
			</div>
			<div className="mt-5 space-y-4">
				{mockLearningPlan.days.map((day, index) => (
					<motion.div
						key={day.day}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.05 }}
						className="grid grid-cols-[auto,1fr] gap-4"
					>
						<div className="flex flex-col items-center">
							{index === 0 ? <CheckCircle2 className="size-5 text-emerald-500" aria-hidden /> : <Circle className="size-5 text-slate-300" aria-hidden />}
							{index < mockLearningPlan.days.length - 1 ? <span className="mt-2 h-full w-px bg-slate-200 dark:bg-white/10" /> : null}
						</div>
						<div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
							<div className="flex flex-wrap items-center justify-between gap-2">
								<p className="font-bold text-slate-950 dark:text-white">{day.day}: {day.focus}</p>
								<span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-white/10 dark:text-indigo-200">+{day.readinessGain}% readiness</span>
							</div>
							<div className="mt-3 flex flex-wrap gap-2">
								{day.items.map((item) => (
									<span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
										{item}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
