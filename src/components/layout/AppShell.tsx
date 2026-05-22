"use client";

import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/layout/MobileNav";
import { RightCoachPanel } from "@/components/layout/RightCoachPanel";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ToastProvider } from "@/components/app/toast";

const coachRoutes = ["/app/today", "/app/learn", "/app/planner", "/app/progress"];

export function AppShell({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const showCoach = coachRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

	return (
		<ToastProvider>
			<div className="min-h-dvh bg-[#f7f8fb] text-slate-950 dark:bg-slate-950 dark:text-white">
				<div className="flex min-h-dvh">
					<Sidebar />
					<div className="min-w-0 flex-1">
						<TopBar />
						<div className="flex">
							<main className="min-w-0 flex-1 px-4 pb-28 pt-5 md:px-6 lg:px-8 lg:pb-10">{children}</main>
							{showCoach ? <RightCoachPanel /> : null}
						</div>
					</div>
				</div>
				<MobileNav />
			</div>
		</ToastProvider>
	);
}
