"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";

type Toast = {
	id: number;
	title: string;
	description?: string;
	tone?: "default" | "success";
};

type ToastContextValue = {
	toast: (toast: Omit<Toast, "id"> | string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const value = useMemo<ToastContextValue>(
		() => ({
			toast: (input) => {
				const nextToast =
					typeof input === "string"
						? { id: Date.now(), title: input }
						: { id: Date.now(), ...input };
				setToasts((current) => [...current, nextToast]);
				window.setTimeout(() => {
					setToasts((current) => current.filter((toast) => toast.id !== nextToast.id));
				}, 3200);
			},
		}),
		[],
	);

	return (
		<ToastContext.Provider value={value}>
			{children}
			<div className="fixed bottom-24 right-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3 md:bottom-5">
				<AnimatePresence initial={false}>
					{toasts.map((toast) => {
						const Icon = toast.tone === "success" ? CheckCircle2 : Info;
						return (
							<motion.div
								key={toast.id}
								initial={{ opacity: 0, y: 12, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 8, scale: 0.98 }}
								className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.55)] backdrop-blur dark:border-white/10 dark:bg-slate-950/95"
								role="status"
							>
								<div className="flex gap-3">
									<Icon className="mt-0.5 size-5 text-indigo-600 dark:text-indigo-300" aria-hidden />
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-slate-950 dark:text-white">{toast.title}</p>
										{toast.description ? (
											<p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-300">{toast.description}</p>
										) : null}
									</div>
									<button
										type="button"
										aria-label="Dismiss notification"
										onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
										className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
									>
										<X className="size-4" aria-hidden />
									</button>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
}

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used inside ToastProvider");
	}
	return context.toast;
}
