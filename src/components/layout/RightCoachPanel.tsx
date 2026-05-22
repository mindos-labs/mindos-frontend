"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BrainCircuit, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/app/toast";

const coachCopy: Record<string, { title: string; message: string; focus: string }> = {
	"/app/today": {
		title: "AI Coach",
		message: "Your weakest concept today is associative mapping. Want a 5-minute explanation or a quiz?",
		focus: "Best next action: 1 trace problem",
	},
	"/app/learn": {
		title: "Study Coach",
		message: "Pause after each section and explain it from memory. I will catch missing steps.",
		focus: "Current checkpoint: Cache fields",
	},
	"/app/planner": {
		title: "Plan Coach",
		message: "The fastest readiness gain is weakness-first: hazards, cache mapping, then addressing modes.",
		focus: "Plan confidence: 86%",
	},
	"/app/progress": {
		title: "Progress Coach",
		message: "Your recall accuracy is stable. The bottleneck is coverage across virtual memory and hazards.",
		focus: "Repair queue: 4 concepts",
	},
};

export function RightCoachPanel() {
	const pathname = usePathname();
	const toast = useToast();
	const content = useMemo(() => {
		const key = Object.keys(coachCopy).find((path) => pathname === path || pathname.startsWith(`${path}/`));
		return coachCopy[key ?? "/app/today"];
	}, [pathname]);

	return (
		<aside className="hidden w-80 shrink-0 border-l border-slate-200/80 bg-white/60 p-5 xl:block dark:border-white/10 dark:bg-slate-950/35">
			<motion.div
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_70px_-42px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-white/5"
			>
				<div className="flex items-center gap-3">
					<div className="grid size-10 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
						<BrainCircuit className="size-5" aria-hidden />
					</div>
					<div>
						<p className="text-sm font-bold text-slate-950 dark:text-white">{content.title}</p>
						<p className="text-xs text-slate-500 dark:text-slate-400">Source-grounded guidance</p>
					</div>
				</div>

				<p className="mt-5 text-sm leading-6 text-slate-700 dark:text-slate-200">{content.message}</p>

				<div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
					<div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
						<Sparkles className="size-4 text-cyan-500" aria-hidden />
						{content.focus}
					</div>
					<p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
						NeuroPilot prioritizes what moves readiness, not what simply fills time.
					</p>
				</div>

				<div className="mt-5 grid gap-2">
					{["Explain", "Quiz me", "Add to plan"].map((action) => (
						<button
							key={action}
							type="button"
							onClick={() =>
								toast({
									title: `${action} queued`,
									description: "This is a frontend placeholder wired for the future AI adapter.",
									tone: "success",
								})
							}
							className="flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-200"
						>
							{action}
							<CheckCircle2 className="size-4 text-slate-300" aria-hidden />
						</button>
					))}
				</div>
			</motion.div>
		</aside>
	);
}
