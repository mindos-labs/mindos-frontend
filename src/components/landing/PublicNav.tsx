"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ActionButton, BrandMark, ButtonLink, cn } from "./ui";

const navItems = [
	{ href: "/#flow", label: "Flow" },
	{ href: "/#features", label: "Features" },
	{ href: "/#science", label: "Science" },
	{ href: "/pricing", label: "Pricing" },
];

export function PublicNav({ onDemo }: { onDemo?: () => void }) {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 border-b border-slate-200/70 bg-[#f8fafc]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
			<nav className="mx-auto flex h-16 max-w-7xl items-center justify-between" aria-label="Public navigation">
				<BrandMark />
				<div className="hidden items-center gap-1 lg:flex">
					{navItems.map((item) => (
						<ButtonLink key={item.href} href={item.href} variant="ghost" className="h-10 px-4">
							{item.label}
						</ButtonLink>
					))}
				</div>
				<div className="hidden items-center gap-3 lg:flex">
					<ActionButton type="button" variant="ghost" className="h-10 px-4" onClick={onDemo}>
						Watch demo
					</ActionButton>
					<ButtonLink href="/login" variant="secondary" className="h-10 px-4">
						Log in
					</ButtonLink>
					<ButtonLink href="/signup" className="h-10 px-4">
						Start free
					</ButtonLink>
				</div>
				<button
					type="button"
					onClick={() => setOpen((value) => !value)}
					className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 lg:hidden"
					aria-label={open ? "Close navigation" : "Open navigation"}
					aria-expanded={open}
				>
					{open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
				</button>
			</nav>
			<div
				className={cn(
					"mx-auto grid max-w-7xl overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden",
					open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
				)}
			>
				<div className="min-h-0">
					<div className="flex flex-col gap-2 pb-4 pt-2">
						{navItems.map((item) => (
							<ButtonLink
								key={item.href}
								href={item.href}
								variant="ghost"
								className="h-11 justify-start rounded-2xl"
								onClick={() => setOpen(false)}
							>
								{item.label}
							</ButtonLink>
						))}
						<div className="grid grid-cols-2 gap-2 pt-2">
							<ButtonLink href="/login" variant="secondary" onClick={() => setOpen(false)}>
								Log in
							</ButtonLink>
							<ButtonLink href="/signup" onClick={() => setOpen(false)}>
								Start free
							</ButtonLink>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
