"use client";

import { Moon, Sparkles } from "lucide-react";
import { scienceNotes } from "./data";
import { FadeIn, ProgressBar, SectionHeader, SectionShell } from "./ui";

export function ScienceSection() {
	return (
		<SectionShell id="science">
			<div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
				<FadeIn>
					<SectionHeader
						eyebrow="Learning science"
						title="Built around how remembering actually works."
						description="NeuroPilot does not just summarize. It nudges the behaviors that make learning stick: retrieval, spacing, feedback, and rest."
					/>
					<div className="mt-8 rounded-[1.5rem] border border-indigo-100 bg-indigo-950 p-6 text-white shadow-xl shadow-indigo-950/15">
						<div className="flex items-center gap-3">
							<div className="grid size-11 place-items-center rounded-2xl bg-white/10 text-cyan-200">
								<Moon className="size-5" aria-hidden />
							</div>
							<div>
								<p className="text-sm font-semibold">Tonight&apos;s consolidation target</p>
								<p className="mt-1 text-sm text-indigo-100">Keep final review light and focused on weak cards.</p>
							</div>
						</div>
						<ProgressBar value={78} className="mt-5 bg-white/10" />
						<p className="mt-3 text-xs font-semibold text-cyan-100">Memory health 78%</p>
					</div>
				</FadeIn>
				<div className="grid gap-4 sm:grid-cols-2">
					{scienceNotes.map((note, index) => (
						<FadeIn key={note.title} delay={index * 0.05}>
							<div className="h-full rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
								<div className="mb-5 grid size-10 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
									<Sparkles className="size-4" aria-hidden />
								</div>
								<h3 className="text-lg font-semibold text-slate-950">{note.title}</h3>
								<p className="mt-3 text-sm leading-7 text-slate-600">{note.description}</p>
							</div>
						</FadeIn>
					))}
				</div>
			</div>
		</SectionShell>
	);
}
