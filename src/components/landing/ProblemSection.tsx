"use client";

import { AlertCircle, BookOpen, FileText, Link2, Youtube } from "lucide-react";
import { FadeIn, SectionHeader, SectionShell } from "./ui";

const scatteredItems = [
	{ title: "COA Module 1.pdf", icon: FileText },
	{ title: "Cache lecture", icon: Youtube },
	{ title: "Class notes", icon: BookOpen },
	{ title: "Reference article", icon: Link2 },
];

export function ProblemSection() {
	return (
		<SectionShell className="py-14 lg:py-20">
			<div className="grid items-center gap-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 md:p-10 lg:grid-cols-[0.9fr_1.1fr]">
				<FadeIn>
					<SectionHeader
						eyebrow="The problem"
						title="Students collect resources but don't know what to study next."
						description="Notes, PDFs, links, videos, and old questions pile up. The hard part is not access to information. It is sequencing the next useful action before energy runs out."
					/>
				</FadeIn>
				<FadeIn delay={0.1}>
					<div className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-4">
						<div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
							<AlertCircle className="size-4" aria-hidden />
							Resource overload detected
						</div>
						<div className="mt-4 grid gap-3 sm:grid-cols-2">
							{scatteredItems.map((item, index) => {
								const Icon = item.icon;
								return (
									<div
										key={item.title}
										className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
										style={{ transform: `rotate(${index % 2 === 0 ? "-1deg" : "1deg"})` }}
									>
										<div className="grid size-10 place-items-center rounded-2xl bg-slate-100 text-slate-600">
											<Icon className="size-5" aria-hidden />
										</div>
										<div>
											<p className="text-sm font-semibold text-slate-950">{item.title}</p>
											<p className="mt-1 text-xs font-medium text-slate-500">Unread, unplanned, untested</p>
										</div>
									</div>
								);
							})}
						</div>
						<div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
							<p className="text-sm font-semibold text-slate-950">Typical next action</p>
							<p className="mt-2 text-sm leading-6 text-slate-600">
								Open everything. Reread the easiest thing. Avoid the weak concept. Feel busy, but not ready.
							</p>
						</div>
					</div>
				</FadeIn>
			</div>
		</SectionShell>
	);
}
