"use client";

import Link from "next/link";
import { FileText, Globe2, HelpCircle, NotebookText, PlaySquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Resource, ResourceType } from "@/components/app/data";
import { cn } from "@/components/app/app-utils";
import { useToast } from "@/components/app/toast";

const resourceIcons: Record<ResourceType, typeof FileText> = {
	pdf: FileText,
	youtube: PlaySquare,
	web: Globe2,
	notes: NotebookText,
	flashcards: HelpCircle,
};

const statusClasses = {
	ready: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200",
	processing: "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200",
	queued: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
	failed: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-200",
};

export function ResourceCard({ resource }: { resource: Resource }) {
	const toast = useToast();
	const Icon = resourceIcons[resource.type];

	return (
		<motion.article
			layout
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-white/5"
		>
			<div className="flex items-start justify-between gap-4">
				<div className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
					<Icon className="size-5" aria-hidden />
				</div>
				<span className={cn("rounded-full px-2.5 py-1 text-xs font-bold capitalize", statusClasses[resource.status])}>{resource.status}</span>
			</div>
			<h3 className="mt-4 text-base font-bold text-slate-950 dark:text-white">{resource.title}</h3>
			<p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{resource.summary}</p>
			<div className="mt-5 grid grid-cols-3 gap-2 text-center">
				<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
					<p className="text-base font-bold text-slate-950 dark:text-white">{resource.conceptsFound}</p>
					<p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Concepts</p>
				</div>
				<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
					<p className="text-base font-bold text-slate-950 dark:text-white">{resource.flashcardsGenerated}</p>
					<p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Cards</p>
				</div>
				<div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/40">
					<p className="text-base font-bold text-slate-950 dark:text-white">{resource.weakConcepts}</p>
					<p className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">Weak</p>
				</div>
			</div>
			<div className="mt-5 flex flex-wrap gap-2">
				<Link href={`/app/library/${resource.id}`} className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950">
					Open
				</Link>
				<button
					type="button"
					onClick={() => toast({ title: "Quiz generated", description: `A mock quiz from ${resource.title} is ready.`, tone: "success" })}
					className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-indigo-400/10"
				>
					Generate quiz
				</button>
				<button
					type="button"
					onClick={() => toast({ title: "Added to plan", description: "This resource is now part of the mock Day 1 plan." })}
					className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:text-slate-200 dark:hover:bg-indigo-400/10"
				>
					<Sparkles className="size-4" aria-hidden />
					Add to plan
				</button>
			</div>
		</motion.article>
	);
}
