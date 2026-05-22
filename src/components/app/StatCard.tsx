"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

type StatCardProps = {
	label: string;
	value: string;
	icon: LucideIcon;
	delta?: string;
	tone?: "indigo" | "emerald" | "cyan" | "amber" | "rose";
};

const toneClasses = {
	indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200",
	emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
	cyan: "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200",
	amber: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-200",
	rose: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
};

export function StatCard({ label, value, icon: Icon, delta, tone = "indigo" }: StatCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-white/5"
		>
			<div className="flex items-center justify-between gap-3">
				<div className={`grid size-10 place-items-center rounded-2xl ${toneClasses[tone]}`}>
					<Icon className="size-5" aria-hidden />
				</div>
				{delta ? (
					<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
						<ArrowUpRight className="size-3" aria-hidden />
						{delta}
					</span>
				) : null}
			</div>
			<p className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
			<p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
		</motion.div>
	);
}
