"use client";

import { Briefcase, Code2, GraduationCap, Languages, Microscope, Sparkles } from "lucide-react";
import { useCases } from "./data";
import { FadeIn, SectionHeader, SectionShell } from "./ui";

const icons = [GraduationCap, Code2, Microscope, Languages, Briefcase];

export function UseCases() {
	return (
		<SectionShell>
			<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-10">
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<FadeIn>
						<SectionHeader
							eyebrow="Use cases"
							title="One workflow for every serious learning goal."
							description="The shape stays the same even when the subject changes: build context, learn, recall, repair, and track readiness."
						/>
					</FadeIn>
					<FadeIn delay={0.08}>
						<div className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
							Designed for deep work, not browsing
						</div>
					</FadeIn>
				</div>
				<div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
					{useCases.map((item, index) => {
						const Icon = icons[index] ?? Sparkles;
						return (
							<FadeIn key={item.title} delay={index * 0.04}>
								<div className="h-full rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
									<div className="grid size-11 place-items-center rounded-2xl bg-white text-indigo-700 shadow-sm">
										<Icon className="size-5" aria-hidden />
									</div>
									<h3 className="mt-5 text-lg font-semibold text-slate-950">{item.title}</h3>
									<p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
								</div>
							</FadeIn>
						);
					})}
				</div>
			</div>
		</SectionShell>
	);
}
