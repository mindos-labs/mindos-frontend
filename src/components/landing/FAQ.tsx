"use client";

import { ChevronDown } from "lucide-react";
import { faqs } from "./data";
import { FadeIn, SectionHeader, SectionShell } from "./ui";

export function FAQ() {
	return (
		<SectionShell>
			<div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
				<FadeIn>
					<SectionHeader
						eyebrow="FAQ"
						title="Frontend-safe answers for this MVP slice."
						description="The public routes are wired with mock interactions only. Backend, real AI calls, auth, and billing can attach later."
					/>
				</FadeIn>
				<div className="space-y-3">
					{faqs.map((faq, index) => (
						<FadeIn key={faq.question} delay={index * 0.04}>
							<details className="group rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500">
									{faq.question}
									<ChevronDown className="size-5 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden />
								</summary>
								<p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
							</details>
						</FadeIn>
					))}
				</div>
			</div>
		</SectionShell>
	);
}
