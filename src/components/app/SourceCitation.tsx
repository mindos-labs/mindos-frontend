import { FileText } from "lucide-react";

export function SourceCitation({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
			<FileText className="size-3" aria-hidden />
			{label}
		</span>
	);
}
