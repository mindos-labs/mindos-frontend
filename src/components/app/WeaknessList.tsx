"use client";

import { AlertTriangle, ArrowRight } from "lucide-react";
import { mockConcepts } from "@/components/app/data";
import { useToast } from "@/components/app/toast";

export function WeaknessList({ limit = 4 }: { limit?: number }) {
	const toast = useToast();
	const weakConcepts = mockConcepts.filter((concept) => concept.status === "weak").slice(0, limit);

	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
			<div className="flex items-center gap-3">
				<div className="grid size-10 place-items-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200">
					<AlertTriangle className="size-5" aria-hidden />
				</div>
				<div>
					<h2 className="text-lg font-bold text-slate-950 dark:text-white">Weakness repair</h2>
					<p className="text-sm text-slate-500 dark:text-slate-400">Concepts with the best readiness lift.</p>
				</div>
			</div>
			<div className="mt-5 space-y-3">
				{weakConcepts.map((concept) => (
					<div key={concept.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
						<div className="flex items-start justify-between gap-3">
							<div>
								<p className="font-bold text-slate-950 dark:text-white">{concept.title}</p>
								<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{concept.recommendedAction}</p>
							</div>
							<span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-400/10 dark:text-rose-200">
								{concept.mastery}%
							</span>
						</div>
						<button
							type="button"
							onClick={() =>
								toast({
									title: `Repair queued: ${concept.title}`,
									description: "NeuroPilot would open a focused explanation, recall checkpoint, and short quiz.",
								})
							}
							className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300"
						>
							Repair now
							<ArrowRight className="size-4" aria-hidden />
						</button>
					</div>
				))}
			</div>
		</section>
	);
}
