"use client";

import { useMemo, useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { mockTutorMessages, quickActions, tutorModes, type TutorMessage } from "@/components/app/data";
import { ChatMessage } from "@/components/app/ChatMessage";
import { cn } from "@/components/app/app-utils";
import { useToast } from "@/components/app/toast";

type TutorPanelProps = {
	compact?: boolean;
	showModes?: boolean;
};

export function TutorPanel({ compact = false, showModes = true }: TutorPanelProps) {
	const [mode, setMode] = useState("Explain simply");
	const [messages, setMessages] = useState<TutorMessage[]>(mockTutorMessages);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();

	const selectedMode = useMemo(() => tutorModes.find((item) => item.title === mode), [mode]);

	function sendMessage(content = input) {
		const trimmed = content.trim();
		if (!trimmed) return;
		const userMessage: TutorMessage = { id: `user-${Date.now()}`, role: "user", content: trimmed };
		setMessages((current) => [...current, userMessage]);
		setInput("");
		setLoading(true);
		window.setTimeout(() => {
			setMessages((current) => [
				...current,
				{
					id: `ai-${Date.now()}`,
					role: "ai",
					content: `In ${mode.toLowerCase()} mode: start with the rule, test it on one small example, then recall it without notes. For cache mapping, ask which fields identify the line, tag, and offset.`,
					citations: ["COA Module 1, page 4", "Cache Mapping Lecture, 12:40"],
				},
			]);
			setLoading(false);
		}, 850);
	}

	return (
		<section className={cn("rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-950/35", compact ? "h-full" : "")}>
			<div className="flex items-center justify-between gap-3">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">AI Tutor</p>
					<h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950 dark:text-white">{selectedMode?.title ?? mode}</h2>
				</div>
				<div className="grid size-10 place-items-center rounded-2xl bg-indigo-600 text-white">
					<Sparkles className="size-5" aria-hidden />
				</div>
			</div>

			{showModes ? (
				<div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
					{tutorModes.map((item) => {
						const Icon = item.icon;
						const active = item.title === mode;
						return (
							<button
								key={item.title}
								type="button"
								onClick={() => {
									setMode(item.title);
									toast({ title: `${item.title} mode selected`, description: "The next answer will adapt to this learning mode." });
								}}
								className={cn(
									"flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-sm font-bold transition",
									active
										? "border-indigo-200 bg-white text-indigo-700 shadow-sm dark:border-indigo-300/30 dark:bg-indigo-400/10 dark:text-indigo-200"
										: "border-transparent bg-white/70 text-slate-600 hover:border-slate-200 hover:text-slate-950 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/10 dark:hover:text-white",
								)}
							>
								<Icon className="size-4 shrink-0" aria-hidden />
								<span className="truncate">{item.title}</span>
							</button>
						);
					})}
				</div>
			) : (
				<div className="mt-4 flex flex-wrap gap-2">
					{quickActions.map((action) => (
						<button
							key={action}
							type="button"
							onClick={() => sendMessage(action)}
							className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200 transition hover:text-indigo-700 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10"
						>
							{action}
						</button>
					))}
				</div>
			)}

			<div className={cn("mt-5 space-y-4 overflow-y-auto pr-1", compact ? "max-h-[28rem]" : "max-h-[34rem]")}>
				{messages.map((message) => (
					<ChatMessage key={message.id} message={message} />
				))}
				{loading ? (
					<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
						<Loader2 className="size-4 animate-spin text-indigo-600 dark:text-indigo-300" aria-hidden />
						Tutor is grounding the response in your sources...
					</motion.div>
				) : null}
			</div>

			<form
				className="mt-4 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-white/5"
				onSubmit={(event) => {
					event.preventDefault();
					sendMessage();
				}}
			>
				<label htmlFor={compact ? "workspace-tutor-input" : "tutor-input"} className="sr-only">
					Ask the AI tutor
				</label>
				<input
					id={compact ? "workspace-tutor-input" : "tutor-input"}
					value={input}
					onChange={(event) => setInput(event.target.value)}
					placeholder="Ask about your learning material..."
					className="min-w-0 flex-1 bg-transparent px-2 text-sm text-slate-950 placeholder:text-slate-400 focus:outline-none dark:text-white"
				/>
				<button
					type="submit"
					className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-60"
					disabled={loading}
					aria-label="Send message"
				>
					<Send className="size-4" aria-hidden />
				</button>
			</form>
		</section>
	);
}
