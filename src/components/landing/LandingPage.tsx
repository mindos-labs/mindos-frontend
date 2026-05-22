"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FAQ } from "./FAQ";
import { FeatureGrid } from "./FeatureGrid";
import { FinalCTA } from "./FinalCTA";
import { HeroSection } from "./HeroSection";
import { PricingCards } from "./PricingCards";
import { ProblemSection } from "./ProblemSection";
import { ProductShowcase } from "./ProductShowcase";
import { PublicNav } from "./PublicNav";
import { ScienceSection } from "./ScienceSection";
import { SolutionFlow } from "./SolutionFlow";
import { UseCases } from "./UseCases";
import { FadeIn, SectionHeader, SectionShell, Toast } from "./ui";

export function LandingPage() {
	const [toast, setToast] = useState<string | null>(null);

	useEffect(() => {
		if (!toast) {
			return;
		}
		const timer = window.setTimeout(() => setToast(null), 3000);
		return () => window.clearTimeout(timer);
	}, [toast]);

	const showDemo = () => setToast("Demo preview is mocked in this slice. The product tour would open here.");

	return (
		<main className="min-h-screen bg-[#f8fafc] font-sans text-slate-950">
			<PublicNav onDemo={showDemo} />
			<HeroSection onDemo={showDemo} onMockAction={setToast} />
			<ProblemSection />
			<SolutionFlow />
			<FeatureGrid />
			<ScienceSection />
			<UseCases />
			<ProductShowcase />
			<SectionShell id="pricing" className="bg-white">
				<div className="flex flex-col gap-10">
					<FadeIn>
						<SectionHeader
							eyebrow="Pricing preview"
							title="A plan for trying, a plan for serious study, and a student option."
							description="The payment flow is intentionally mocked, but the pricing page is ready for a future billing adapter."
						/>
					</FadeIn>
					<PricingCards compact onPlanAction={(plan) => setToast(`${plan} checkout is a mocked placeholder for now.`)} />
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
