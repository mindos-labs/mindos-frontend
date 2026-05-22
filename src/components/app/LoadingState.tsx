import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading NeuroPilot..." }: { label?: string }) {
	return (
		<div className="flex min-h-48 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 dark:border-white/10 dark:bg-white/5">
			<div className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
				<Loader2 className="size-5 animate-spin text-indigo-600 dark:text-indigo-300" aria-hidden />
				{label}
			</div>
		</div>
	);
}
