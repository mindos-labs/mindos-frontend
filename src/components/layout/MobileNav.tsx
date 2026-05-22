"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNavItems } from "@/components/layout/nav-items";
import { cn } from "@/components/app/app-utils";

const primaryMobileItems = appNavItems.slice(0, 5);

export function MobileNav() {
	const pathname = usePathname();

	return (
		<nav
			className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-slate-200 bg-white/95 p-1.5 shadow-[0_20px_60px_-34px_rgba(15,23,42,0.7)] backdrop-blur lg:hidden dark:border-white/10 dark:bg-slate-950/95"
			aria-label="Mobile navigation"
		>
			<div className="grid grid-cols-5 gap-1">
				{primaryMobileItems.map((item) => {
					const Icon = item.icon;
					const active = pathname === item.href || pathname.startsWith(`${item.match}/`);
					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition",
								active
									? "bg-indigo-600 text-white"
									: "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white",
							)}
							aria-current={active ? "page" : undefined}
						>
							<Icon className="size-4" aria-hidden />
							<span>{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
