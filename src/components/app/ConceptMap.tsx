"use client";

import { motion } from "framer-motion";
import { mockConcepts, type ConceptStatus } from "@/components/app/data";
import { cn } from "@/components/app/app-utils";

const nodeClasses: Record<ConceptStatus, string> = {
	mastered: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-200",
	learning: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200",
	weak: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200",
};

export function ConceptMap() {
	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="text-lg font-bold text-slate-950 dark:text-white">Concept map</h2>
					<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Mastered, learning, and weak concepts in COA.</p>
				</div>
				<div className="flex flex-wrap gap-2 text-xs font-bold">
					<span className="text-emerald-600">Green: mastered</span>
					<span className="text-amber-600">Yellow: learning</span>
					<span className="text-rose-600">Red: weak</span>
				</div>
			</div>
			<div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
				{mockConcepts.map((concept, index) => (
					<motion.div
						key={concept.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.025 }}
						className={cn("rounded-2xl border p-4", nodeClasses[concept.status])}
					>
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="font-bold">{concept.title}</p>
								<p className="mt-1 text-xs opacity-80">{concept.recommendedAction}</p>
							</div>
							<span className="rounded-full bg-white/70 px-2 py-1 text-xs font-black dark:bg-white/10">{concept.mastery}%</span>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
