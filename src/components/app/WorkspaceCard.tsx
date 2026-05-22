"use client";

import Link from "next/link";
import { ArrowRight, Clock, Layers3 } from "lucide-react";
import { motion } from "framer-motion";
import type { Workspace } from "@/components/app/data";
import { MemoryStrengthBadge } from "@/components/app/MemoryStrengthBadge";
import { ProgressRing } from "@/components/app/ProgressRing";

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
	const Icon = workspace.icon;

	return (
		<motion.article
			initial={{ opacity: 0, y: 14 }}
			animate={{ opacity: 1, y: 0 }}
			className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_24px_75px_-48px_rgba(67,56,202,0.55)] dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-300/30"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<div className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
						<Icon className="size-5" aria-hidden />
					</div>
					<h3 className="mt-4 text-lg font-bold tracking-tight text-slate-950 dark:text-white">{workspace.title}</h3>
					<p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{workspace.description}</p>
				</div>
				<ProgressRing value={workspace.progress} size={72} stroke={7} />
			</div>

			<div className="mt-5 flex flex-wrap gap-2">
				<MemoryStrengthBadge value={workspace.memoryScore} />
				<span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
					{workspace.flashcardsDue} due
				</span>
			</div>

			<div className="mt-5 grid grid-cols-2 gap-3 text-sm">
				<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
					<div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
						<Layers3 className="size-4" aria-hidden />
						Resources
					</div>
					<p className="mt-1 font-bold text-slate-950 dark:text-white">{workspace.resourcesCount}</p>
				</div>
				<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
					<div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
						<Clock className="size-4" aria-hidden />
						Last studied
					</div>
					<p className="mt-1 font-bold text-slate-950 dark:text-white">{workspace.lastStudied}</p>
				</div>
			</div>

			<Link
				href={`/app/learn/${workspace.id}`}
				className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-indigo-600 dark:bg-white dark:text-slate-950"
			>
				Continue
				<ArrowRight className="size-4" aria-hidden />
			</Link>
		</motion.article>
	);
}
