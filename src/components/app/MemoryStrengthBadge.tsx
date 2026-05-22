import { cn } from "@/components/app/app-utils";

export function MemoryStrengthBadge({ value }: { value: number }) {
	const tone =
		value >= 80
			? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:ring-emerald-400/20"
			: value >= 60
				? "bg-cyan-50 text-cyan-700 ring-cyan-200 dark:bg-cyan-400/10 dark:text-cyan-200 dark:ring-cyan-400/20"
				: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/20";

	return <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold ring-1", tone)}>{value}% memory</span>;
}
