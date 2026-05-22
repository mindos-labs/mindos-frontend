import { Brain, Clock, Layers3 } from "lucide-react";
import type { Workspace } from "@/components/app/data";

export function RecallCard({ workspace }: { workspace: Workspace }) {
	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="font-bold text-slate-950 dark:text-white">{workspace.title}</p>
					<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{workspace.nextAction}</p>
				</div>
				<span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
					{workspace.flashcardsDue} due
				</span>
			</div>
			<div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
				<div className="flex items-center gap-1">
					<Brain className="size-4" aria-hidden />
					{workspace.memoryScore}%
				</div>
				<div className="flex items-center gap-1">
					<Layers3 className="size-4" aria-hidden />
					{workspace.resourcesCount} sources
				</div>
				<div className="flex items-center gap-1">
					<Clock className="size-4" aria-hidden />
					{workspace.lastStudied}
				</div>
			</div>
		</div>
	);
}
