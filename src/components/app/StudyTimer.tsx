"use client";

import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useToast } from "@/components/app/toast";

export function StudyTimer({ initialMinutes = 25 }: { initialMinutes?: number }) {
	const initialSeconds = initialMinutes * 60;
	const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
	const [running, setRunning] = useState(false);
	const toast = useToast();

	useEffect(() => {
		if (!running) return;
		const interval = window.setInterval(() => {
			setSecondsLeft((current) => Math.max(0, current - 1));
		}, 1000);
		return () => window.clearInterval(interval);
	}, [running]);

	useEffect(() => {
		if (secondsLeft === 0 && running) {
			setRunning(false);
			toast({ title: "Focus block complete", description: "Nice. Time for a recall checkpoint.", tone: "success" });
		}
	}, [running, secondsLeft, toast]);

	const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
	const seconds = (secondsLeft % 60).toString().padStart(2, "0");

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Focus timer</p>
			<div className="mt-2 flex items-center justify-between gap-3">
				<p className="text-3xl font-bold tabular-nums tracking-tight text-slate-950 dark:text-white">{minutes}:{seconds}</p>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={() => setRunning((current) => !current)}
						className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700"
						aria-label={running ? "Pause timer" : "Start timer"}
					>
						{running ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
					</button>
					<button
						type="button"
						onClick={() => {
							setRunning(false);
							setSecondsLeft(initialSeconds);
						}}
						className="grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
						aria-label="Reset timer"
					>
						<RotateCcw className="size-4" aria-hidden />
					</button>
				</div>
			</div>
		</div>
	);
}
