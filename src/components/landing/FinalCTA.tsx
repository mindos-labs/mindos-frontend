"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink, FadeIn, SectionShell } from "./ui";

export function FinalCTA() {
	return (
		<SectionShell className="pb-20">
			<FadeIn>
				<div className="overflow-hidden rounded-[2rem] border border-indigo-200 bg-indigo-950 p-8 text-white shadow-2xl shadow-indigo-950/20 sm:p-12">
					<div className="max-w-3xl">
						<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-semibold text-cyan-100">
							<Sparkles className="size-4" aria-hidden />
							Your next study block, already chosen.
						</div>
						<h2 className="mt-6 text-4xl font-semibold tracking-normal sm:text-5xl">Turn scattered study material into a daily mission.</h2>
						<p className="mt-5 text-lg leading-8 text-indigo-100">
							Start with one goal and one resource. NeuroPilot will mock the rest of the flow in this frontend slice.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<ButtonLink href="/signup" className="h-12 bg-white px-6 text-indigo-950 shadow-none hover:bg-indigo-50">
								Start learning free
								<ArrowRight className="ml-2 size-4" aria-hidden />
							</ButtonLink>
							<ButtonLink href="/onboarding" variant="secondary" className="h-12 border-white/15 bg-white/10 px-6 text-white hover:bg-white/15">
								Try onboarding
							</ButtonLink>
						</div>
					</div>
				</div>
			</FadeIn>
		</SectionShell>
	);
}
