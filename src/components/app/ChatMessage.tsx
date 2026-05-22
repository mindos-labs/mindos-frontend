"use client";

import { Bot, UserRound } from "lucide-react";
import type { TutorMessage } from "@/components/app/data";
import { SourceCitation } from "@/components/app/SourceCitation";
import { cn } from "@/components/app/app-utils";
import { useToast } from "@/components/app/toast";

export function ChatMessage({ message }: { message: TutorMessage }) {
	const toast = useToast();
	const isAI = message.role === "ai";

	return (
		<div className={cn("flex gap-3", isAI ? "justify-start" : "justify-end")}>
			{isAI ? (
				<div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200">
					<Bot className="size-4" aria-hidden />
				</div>
			) : null}
			<div className={cn("max-w-[84%] rounded-2xl px-4 py-3", isAI ? "bg-white text-slate-700 ring-1 ring-slate-200 dark:bg-white/5 dark:text-slate-200 dark:ring-white/10" : "bg-indigo-600 text-white")}>
				<p className="text-sm leading-6">{message.content}</p>
				{message.citations?.length ? (
					<div className="mt-3 flex flex-wrap gap-2">
						{message.citations.map((citation) => (
							<SourceCitation key={citation} label={citation} />
						))}
					</div>
				) : null}
				{isAI ? (
					<div className="mt-3 flex flex-wrap gap-2">
						{["Turn into flashcards", "Quiz me on this", "Add to notes", "Explain simpler"].map((action) => (
							<button
								key={action}
								type="button"
								onClick={() => toast({ title: action, description: "Mock tutor action saved locally." })}
								className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-200"
							>
								{action}
							</button>
						))}
					</div>
				) : null}
			</div>
			{!isAI ? (
				<div className="grid size-9 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
					<UserRound className="size-4" aria-hidden />
				</div>
			) : null}
		</div>
	);
}
