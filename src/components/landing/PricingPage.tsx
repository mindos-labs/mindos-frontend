"use client";

import { AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { PricingCards } from "./PricingCards";
import { PublicNav } from "./PublicNav";
import { ActionButton, FadeIn, SectionHeader, SectionShell, Toast, cn } from "./ui";

const comparison = [
	["Workspace planning", "Basic", "Unlimited", "Unlimited"],
	["AI tutor", "Summary only", "Source grounded", "Source grounded"],
	["Recall system", "50 cards", "Unlimited", "Unlimited"],
	["Exam planner", "Limited", "Included", "Included"],
	["Analytics", "Basic", "Advanced", "Advanced"],
];

export function PricingPage() {
	const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		if (!toast) {
			return;
		}
		const timer = window.setTimeout(() => setToast(null), 3000);
		return () => window.clearTimeout(timer);
	}, [toast]);

	return (
		<main className="min-h-screen bg-[#f8fafc] font-sans text-slate-950">
			<PublicNav onDemo={() => setToast("Demo playback is mocked for the public frontend slice.")} />
			<SectionShell className="pb-10 pt-14 lg:pb-12 lg:pt-20">
				<div className="mx-auto max-w-4xl text-center">
					<FadeIn>
						<div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
							<Sparkles className="size-4" aria-hidden />
							Pricing that grows with your learning loop
						</div>
						<h1 className="mt-7 text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl">Start free. Upgrade when recall becomes essential.</h1>
						<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
							NeuroPilot pricing is designed for the path from first upload to exam-ready progress tracking.
						</p>
						<div className="mx-auto mt-8 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm" role="tablist" aria-label="Billing cadence">
							{(["monthly", "annual"] as const).map((option) => (
								<button
									key={option}
									type="button"
									onClick={() => setBilling(option)}
									className={cn(
										"h-10 rounded-full px-5 text-sm font-semibold capitalize transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
										billing === option ? "bg-indigo-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50",
									)}
									aria-pressed={billing === option}
								>
									{option}
								</button>
							))}
						</div>
					</FadeIn>
				</div>
			</SectionShell>
			<PricingCards billing={billing} onPlanAction={(plan) => setToast(`${plan} checkout is a safe placeholder. No payment was started.`)} />
			<SectionShell className="pt-0">
				<div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
					<FadeIn>
						<div className="rounded-[1.5rem] border border-indigo-100 bg-indigo-950 p-6 text-white shadow-xl shadow-indigo-950/20">
							<ShieldCheck className="size-8 text-cyan-200" aria-hidden />
							<h2 className="mt-5 text-2xl font-semibold">Frontend-only billing</h2>
							<p className="mt-3 text-sm leading-7 text-indigo-100">
								These controls are intentionally mocked. A real checkout, receipts, taxes, and plan enforcement can connect through a future billing adapter.
							</p>
							<ActionButton
								type="button"
								variant="secondary"
								className="mt-6 border-white/15 bg-white/10 text-white hover:bg-white/15"
								onClick={() => setToast("Billing documentation handoff placeholder opened.")}
							>
								View billing notes
							</ActionButton>
						</div>
					</FadeIn>
					<FadeIn delay={0.08}>
						<div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm shadow-slate-950/5">
							<div className="grid grid-cols-4 gap-3 border-b border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-600">
								<span>Feature</span>
								<span>Free</span>
								<span>Pro</span>
								<span>Student India</span>
							</div>
							<div className="divide-y divide-slate-100">
								{comparison.map((row) => (
									<div key={row[0]} className="grid grid-cols-4 gap-3 p-4 text-sm">
										<span className="font-semibold text-slate-950">{row[0]}</span>
										{row.slice(1).map((cell) => (
											<span key={cell} className="flex items-center gap-2 text-slate-600">
												<CheckCircle2 className="hidden size-4 text-emerald-500 sm:block" aria-hidden />
												{cell}
											</span>
										))}
									</div>
								))}
							</div>
						</div>
					</FadeIn>
				</div>
			</SectionShell>
			<FAQ />
			<FinalCTA />
			<AnimatePresence>
				<Toast message={toast} onClose={() => setToast(null)} />
			</AnimatePresence>
		</main>
	);
}
