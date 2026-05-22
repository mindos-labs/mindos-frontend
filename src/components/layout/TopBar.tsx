"use client";

import { useState } from "react";
import { Bell, Moon, Plus, Search, Sun } from "lucide-react";
import { CommandBar } from "@/components/app/CommandBar";
import { mockUser } from "@/components/app/data";
import { useToast } from "@/components/app/toast";

export function TopBar() {
	const [commandOpen, setCommandOpen] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const toast = useToast();

	function toggleTheme() {
		const next = !darkMode;
		setDarkMode(next);
		document.documentElement.classList.toggle("dark", next);
		toast(next ? "Dark mode enabled" : "Light mode enabled");
	}

	return (
		<header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f7f8fb]/86 px-4 py-3 backdrop-blur-xl md:px-6 dark:border-white/10 dark:bg-slate-950/80">
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => setCommandOpen(true)}
					className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-700 md:max-w-2xl dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-white"
				>
					<Search className="size-4 shrink-0" aria-hidden />
					<span className="truncate">Search concepts, notes, resources...</span>
					<span className="ml-auto hidden rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-400 md:inline-flex dark:border-white/10">⌘K</span>
				</button>

				<button
					type="button"
					onClick={() =>
						toast({
							title: "Add resource",
							description: "Mock upload is ready on Library. Backend ingestion will plug in later.",
						})
					}
					className="hidden h-11 items-center gap-2 rounded-2xl bg-indigo-600 px-4 text-sm font-semibold text-white shadow-[0_14px_35px_-22px_rgba(67,56,202,0.8)] transition hover:bg-indigo-700 md:flex"
				>
					<Plus className="size-4" aria-hidden />
					Add resource
				</button>

				<button
					type="button"
					onClick={toggleTheme}
					className="grid size-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
					aria-label="Toggle appearance"
				>
					{darkMode ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
				</button>

				<button
					type="button"
					onClick={() => toast("Notifications are mocked for this frontend slice")}
					className="hidden size-11 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:text-slate-950 sm:grid dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
					aria-label="Open notifications"
				>
					<Bell className="size-4" aria-hidden />
				</button>

				<div className="hidden h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
					<span aria-hidden>🔥</span>
					{mockUser.streak}
				</div>

				<div className="grid size-11 place-items-center rounded-2xl bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950" aria-label={mockUser.name}>
					{mockUser.avatarInitials}
				</div>
			</div>
			<CommandBar open={commandOpen} onOpenChange={setCommandOpen} />
		</header>
	);
}
