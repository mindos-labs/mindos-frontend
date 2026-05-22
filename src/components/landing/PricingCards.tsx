"use client";

import { ArrowRight, Check, IndianRupee, Sparkles } from "lucide-react";
import { pricingPlans } from "./data";
import { ActionButton, ButtonLink, FadeIn, SectionHeader, SectionShell, cn } from "./ui";

export function PricingCards({
	compact = false,
	onPlanAction,
	billing = "monthly",
}: {
	compact?: boolean;
	onPlanAction?: (plan: string) => void;
	billing?: "monthly" | "annual";
}) {
	const plans = pricingPlans.map((plan) => {
		if (plan.name === "Pro" && billing === "annual") {
			return { ...plan, price: "$108", period: "per year" };
		}
		return plan;
	});

	const content = (
		<div className="grid gap-4 lg:grid-cols-3">
			{plans.map((plan, index) => (
				<FadeIn key={plan.name} delay={index * 0.05}>
					<div
						className={cn(
							"relative flex h-full flex-col rounded-[1.5rem] border bg-white p-6 shadow-sm shadow-slate-950/5",
							plan.highlighted ? "border-indigo-200 shadow-xl shadow-indigo-950/10" : "border-slate-200",
						)}
					>
						{plan.highlighted ? (
							<div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white">
								<Sparkles className="size-3.5" aria-hidden />
								Most useful
							</div>
						) : null}
						<div className="min-h-28">
							<div className="flex items-center gap-2">
								{plan.name === "Student India" ? <IndianRupee className="size-4 text-emerald-600" aria-hidden /> : null}
								<h3 className="text-xl font-semibold text-slate-950">{plan.name}</h3>
							</div>
							<p className="mt-3 text-sm leading-6 text-slate-600">{plan.description}</p>
						</div>
						<div className="mt-6 flex items-end gap-2">
							<p className="text-4xl font-semibold text-slate-950">{plan.price}</p>
							<p className="pb-1 text-sm font-medium text-slate-500">{plan.period}</p>
						</div>
						<div className="mt-6 space-y-3">
							{plan.features.map((feature) => (
								<div key={feature} className="flex items-start gap-3 text-sm font-medium text-slate-700">
									<div className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
										<Check className="size-3.5" aria-hidden />
									</div>
									<span>{feature}</span>
								</div>
							))}
						</div>
						<div className="mt-8 flex-1" />
						{plan.name === "Free" ? (
							<ButtonLink href="/signup" className="w-full">
								{plan.cta}
								<ArrowRight className="ml-2 size-4" aria-hidden />
							</ButtonLink>
						) : (
							<ActionButton type="button" className="w-full" variant={plan.highlighted ? "primary" : "secondary"} onClick={() => onPlanAction?.(plan.name)}>
								{plan.cta}
							</ActionButton>
						)}
					</div>
				</FadeIn>
			))}
		</div>
	);

	if (compact) {
		return content;
	}

	return (
		<SectionShell>
			<div className="flex flex-col gap-10">
				<FadeIn>
					<SectionHeader
						eyebrow="Pricing"
						title="Start free. Upgrade when the learning loop becomes your default."
						description="No real payment flow is wired in this frontend slice. These cards show how packaging will feel inside the product."
					/>
				</FadeIn>
				{content}
			</div>
		</SectionShell>
	);
}
