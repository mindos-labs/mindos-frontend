import type { LucideIcon } from "lucide-react";

export function EmptyState({
	icon: Icon,
	title,
	description,
	action,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
	action?: React.ReactNode;
}) {
	return (
		<div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
			<div className="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300">
				<Icon className="size-6" aria-hidden />
			</div>
			<h3 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
			<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
			{action ? <div className="mt-5">{action}</div> : null}
		</div>
	);
}
