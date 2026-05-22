"use client";

import { ArrowRight, BrainCircuit, CheckCircle2, Files, GraduationCap, Repeat2 } from "lucide-react";
import { FadeIn, SectionHeader, SectionShell } from "./ui";

const flow = [
	{ title: "Upload", description: "PDFs, videos, notes, web pages, and study links.", icon: Files },
	{ title: "Plan", description: "A deadline-aware path with the highest-impact next step.", icon: BrainCircuit },
	{ title: "Learn", description: "Source-grounded explanations with recall checkpoints.", icon: GraduationCap },
	{ title: "Recall", description: "Cards and questions return when memory starts fading.", icon: Repeat2 },
	{ title: "Remember", description: "Weak points become repair missions until readiness rises.", icon: CheckCircle2 },
];

export function SolutionFlow() {
	return (
		<SectionShell id="flow">
			<div className="flex flex-col gap-10">
				<FadeIn>
					<SectionHeader
						eyebrow="The loop"
						title="A learning OS that keeps choosing the next useful action."
						description="NeuroPilot turns the messy middle of studying into a simple loop: upload material, generate a plan, learn with checkpoints, recall on schedule, and repair weak spots."
					/>
				</FadeIn>
				<div className="grid gap-3 lg:grid-cols-5">
					{flow.map((step, index) => {
						const Icon = step.icon;
						return (
							<FadeIn key={step.title} delay={index * 0.04}>
								<div className="relative h-full rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
									<div className="flex items-center justify-between">
										<div className="grid size-11 place-items-center rounded-2xl bg-indigo-50 text-indigo-700">
											<Icon className="size-5" aria-hidden />
										</div>
										{index < flow.length - 1 ? (
											<ArrowRight className="hidden size-5 text-slate-300 lg:block" aria-hidden />
										) : null}
									</div>
									<p className="mt-5 text-lg font-semibold text-slate-950">{step.title}</p>
									<p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
								</div>
							</FadeIn>
						);
					})}
				</div>
			</div>
		</SectionShell>
	);
}
