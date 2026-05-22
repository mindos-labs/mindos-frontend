"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye, RotateCcw } from "lucide-react";
import { mockFlashcards } from "@/components/app/data";
import { cn } from "@/components/app/app-utils";
import { useToast } from "@/components/app/toast";

const ratings = [
	{ label: "Again", value: -10, className: "hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-400/10 dark:hover:text-rose-200" },
	{ label: "Hard", value: -3, className: "hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-400/10 dark:hover:text-amber-200" },
	{ label: "Good", value: 8, className: "hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-200" },
	{ label: "Easy", value: 14, className: "hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200" },
];

export function FlashcardReview() {
	const [index, setIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [localStrength, setLocalStrength] = useState<Record<string, number>>({});
	const [reviewed, setReviewed] = useState(0);
	const toast = useToast();

	const card = mockFlashcards[index % mockFlashcards.length];
	const strength = localStrength[card.id] ?? card.strength;
	const progress = useMemo(() => Math.min(100, (reviewed / mockFlashcards.length) * 100), [reviewed]);

	function rate(delta: number, label: string) {
		setLocalStrength((current) => ({
			...current,
			[card.id]: Math.min(100, Math.max(5, strength + delta)),
		}));
		setReviewed((current) => Math.min(mockFlashcards.length, current + 1));
		setShowAnswer(false);
		setIndex((current) => (current + 1) % mockFlashcards.length);
		toast({ title: `Marked ${label}`, description: "Review interval updated locally.", tone: "success" });
	}

	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
			<div className="flex items-center justify-between gap-3">
				<div>
					<h2 className="text-lg font-bold text-slate-950 dark:text-white">Recall session</h2>
					<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Answer first, reveal second, rate honestly.</p>
				</div>
				<span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-200">{strength}% strength</span>
			</div>
			<div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
				<motion.div className="h-full rounded-full bg-indigo-600" initial={false} animate={{ width: `${progress}%` }} />
			</div>

			<AnimatePresence mode="wait" initial={false}>
				<motion.div
					key={`${card.id}-${showAnswer ? "answer" : "question"}`}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					className="mt-5 min-h-56 rounded-2xl bg-slate-50 p-6 dark:bg-slate-950/40"
				>
					<p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{showAnswer ? "Answer" : "Question"}</p>
					<p className="mt-4 text-xl font-bold leading-8 text-slate-950 dark:text-white">{showAnswer ? card.answer : card.question}</p>
					<p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{card.dueLabel}</p>
				</motion.div>
			</AnimatePresence>

			{showAnswer ? (
				<div className="mt-5">
					<p className="text-sm font-bold text-slate-950 dark:text-white">How did you do?</p>
					<div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
						{ratings.map((rating) => (
							<button
								key={rating.label}
								type="button"
								onClick={() => rate(rating.value, rating.label)}
								className={cn("rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition dark:border-white/10 dark:text-slate-200", rating.className)}
							>
								{rating.label}
							</button>
						))}
					</div>
				</div>
			) : (
				<div className="mt-5 flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() => setShowAnswer(true)}
						className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
					>
						<Eye className="size-4" aria-hidden />
						Show answer
					</button>
					<button
						type="button"
						onClick={() => setIndex((current) => (current + 1) % mockFlashcards.length)}
						className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
					>
						<ArrowRight className="size-4" aria-hidden />
						Skip
					</button>
					<button
						type="button"
						onClick={() => {
							setIndex(0);
							setReviewed(0);
							setShowAnswer(false);
							setLocalStrength({});
						}}
						className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/10"
					>
						<RotateCcw className="size-4" aria-hidden />
						Reset
					</button>
				</div>
			)}
		</section>
	);
}
