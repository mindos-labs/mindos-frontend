"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Plus } from "lucide-react";
import { appNavItems } from "@/components/layout/nav-items";
import { cn } from "@/components/app/app-utils";
import { useToast } from "@/components/app/toast";

export function Sidebar() {
	const pathname = usePathname();
	const toast = useToast();

	return (
		<aside className="hidden h-dvh w-72 shrink-0 border-r border-slate-200/80 bg-white/85 px-4 py-5 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:flex-col dark:border-white/10 dark:bg-slate-950/70">
			<Link href="/app/today" className="flex items-center gap-3 px-2" aria-label="NeuroPilot Today">
				<span className="grid size-10 place-items-center rounded-2xl bg-indigo-600 text-white shadow-[0_16px_45px_-24px_rgba(67,56,202,0.7)]">
					<BrainCircuit className="size-5" aria-hidden />
				</span>
				<span>
					<span className="block text-sm font-bold tracking-tight text-slate-950 dark:text-white">NeuroPilot</span>
					<span className="block text-xs text-slate-500 dark:text-slate-400">Learning OS</span>
				</span>
			</Link>

			<button
				type="button"
				onClick={() =>
					toast({
						title: "Resource intake opened",
						description: "In the real app this would launch upload, YouTube, web, and notes import.",
					})
				}
				className="mt-7 flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-white dark:text-slate-950"
			>
				<Plus className="size-4" aria-hidden />
				Add resource
			</button>

			<nav className="mt-6 flex flex-1 flex-col gap-1" aria-label="App navigation">
				{appNavItems.map((item) => {
					const Icon = item.icon;
					const active = pathname === item.href || pathname.startsWith(`${item.match}/`);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
								active
									? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-400/10 dark:text-indigo-200"
									: "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white",
							)}
							aria-current={active ? "page" : undefined}
						>
							<Icon className="size-4" aria-hidden />
							{item.label}
						</Link>
					);
				})}
			</nav>

			<div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Next best action</p>
				<p className="mt-2 text-sm font-semibold text-slate-950 dark:text-white">Cache trace quiz</p>
				<p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
					5 questions will lift exam readiness faster than rereading right now.
				</p>
			</div>
		</aside>
	);
}
