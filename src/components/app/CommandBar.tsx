"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { mockConcepts, mockResources, mockWorkspaces } from "@/components/app/data";
import { cn } from "@/components/app/app-utils";

type CommandBarProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function CommandBar({ open, onOpenChange }: CommandBarProps) {
	const [query, setQuery] = useState("");

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				onOpenChange(true);
			}
			if (event.key === "Escape") {
				onOpenChange(false);
			}
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onOpenChange]);

	const results = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		const items = [
			...mockWorkspaces.map((workspace) => ({
				title: workspace.title,
				body: workspace.nextAction,
				href: `/app/learn/${workspace.id}`,
				type: "Workspace",
			})),
			...mockResources.map((resource) => ({
				title: resource.title,
				body: `${resource.conceptsFound} concepts found`,
				href: `/app/library/${resource.id}`,
				type: "Resource",
			})),
			...mockConcepts.map((concept) => ({
				title: concept.title,
				body: concept.recommendedAction,
				href: "/app/progress",
				type: "Concept",
			})),
		];

		if (!normalized) {
			return items.slice(0, 7);
		}

		return items
			.filter((item) => `${item.title} ${item.body} ${item.type}`.toLowerCase().includes(normalized))
			.slice(0, 8);
	}, [query]);

	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/20 px-4 pt-20 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					role="dialog"
					aria-modal="true"
					aria-label="Command search"
					onMouseDown={() => onOpenChange(false)}
				>
					<motion.div
						initial={{ opacity: 0, y: 16, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.98 }}
						className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_28px_90px_-35px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 dark:border-white/10">
							<Search className="size-5 text-slate-400" aria-hidden />
							<input
								autoFocus
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Search concepts, notes, resources..."
								className="min-w-0 flex-1 bg-transparent text-base text-slate-950 placeholder:text-slate-400 focus:outline-none dark:text-white"
							/>
							<div className="hidden items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-500 md:flex dark:border-white/10 dark:text-slate-400">
								<Command className="size-3" aria-hidden /> K
							</div>
							<button
								type="button"
								aria-label="Close command search"
								onClick={() => onOpenChange(false)}
								className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
							>
								<X className="size-4" aria-hidden />
							</button>
						</div>
						<div className="max-h-[26rem] overflow-y-auto p-2">
							{results.length ? (
								results.map((item) => (
									<Link
										key={`${item.type}-${item.title}`}
										href={item.href}
										onClick={() => onOpenChange(false)}
										className={cn(
											"group flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition",
											"hover:bg-slate-50 dark:hover:bg-white/5",
										)}
									>
										<span className="min-w-0">
											<span className="block text-sm font-semibold text-slate-950 dark:text-white">{item.title}</span>
											<span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
												{item.type} - {item.body}
											</span>
										</span>
										<ArrowRight className="size-4 shrink-0 text-slate-300 transition group-hover:text-indigo-500" aria-hidden />
									</Link>
								))
							) : (
								<div className="px-4 py-10 text-center">
									<p className="text-sm font-medium text-slate-800 dark:text-slate-100">No matches yet</p>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try a concept like cache, recall, or pipeline.</p>
								</div>
							)}
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
