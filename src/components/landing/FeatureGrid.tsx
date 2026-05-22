"use client";

import { BarChart3, Brain, Map, MessageSquareText, Repeat2, RotateCcw, ShieldCheck } from "lucide-react";
import { featureCards } from "./data";
import { FadeIn, SectionHeader, SectionShell } from "./ui";

const iconMap = {
	path: Map,
	tutor: MessageSquareText,
	recall: Brain,
	spacing: Repeat2,
	repair: RotateCcw,
	progress: BarChart3,
};

export function FeatureGrid() {
	return (
		<SectionShell id="features" className="bg-white">
			<div className="flex flex-col gap-10">
				<FadeIn>
					<div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
						<SectionHeader
							eyebrow="Product"
							title="Everything is organized around readiness, not content hoarding."
							description="The interface is built for the study loop: know what matters, do the next block, test yourself, and repair what did not stick."
						/>
						<div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
							<ShieldCheck className="size-4" aria-hidden />
							Source-first learning
						</div>
					</div>
				</FadeIn>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{featureCards.map((feature, index) => {
						const Icon = iconMap[feature.key as keyof typeof iconMap];
						return (
							<FadeIn key={feature.title} delay={index * 0.04}>
								<div className="group h-full rounded-[1.5rem] border border-slate-200 bg-[#fbfcfe] p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-950/10">
									<div className="grid size-12 place-items-center rounded-2xl border border-indigo-100 bg-white text-indigo-700 shadow-sm">
										<Icon className="size-5" aria-hidden />
									</div>
									<h3 className="mt-6 text-xl font-semibold text-slate-950">{feature.title}</h3>
									<p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
								</div>
							</FadeIn>
						);
					})}
				</div>
			</div>
		</SectionShell>
	);
}
