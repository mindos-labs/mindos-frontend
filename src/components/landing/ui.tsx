"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(" ");
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
	return (
		<Link href="/" className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500">
			<div className="relative grid size-10 place-items-center rounded-2xl border border-indigo-200 bg-white shadow-sm shadow-indigo-950/5">
				<div className="absolute inset-1 rounded-xl bg-indigo-50" />
				<div className="relative size-4 rounded-full border-2 border-indigo-700">
					<div className="absolute -right-1 -top-1 size-2 rounded-full bg-emerald-400" />
				</div>
			</div>
			{!compact ? (
				<div className="leading-none">
					<p className="text-sm font-semibold text-slate-950">NeuroPilot</p>
					<p className="mt-1 text-[11px] font-medium text-slate-500">Learning OS</p>
				</div>
			) : null}
		</Link>
	);
}

export function ButtonLink({
	children,
	className,
	variant = "primary",
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
	href: string;
	variant?: "primary" | "secondary" | "ghost";
}) {
	return (
		<Link
			className={cn(
				"inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
				variant === "primary" && "bg-indigo-700 text-white shadow-lg shadow-indigo-700/20 hover:bg-indigo-800",
				variant === "secondary" && "border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50",
				variant === "ghost" && "text-slate-700 hover:bg-slate-100",
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	);
}

export function ActionButton({
	children,
	className,
	variant = "primary",
	loading,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "ghost";
	loading?: boolean;
}) {
	return (
		<button
			className={cn(
				"inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-60",
				variant === "primary" && "bg-indigo-700 text-white shadow-lg shadow-indigo-700/20 hover:bg-indigo-800",
				variant === "secondary" && "border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50",
				variant === "ghost" && "text-slate-700 hover:bg-slate-100",
				className,
			)}
			disabled={loading || props.disabled}
			{...props}
		>
			{loading ? <Loader2 className="mr-2 size-4 animate-spin" aria-hidden /> : null}
			{children}
		</button>
	);
}

export function SectionShell({
	children,
	className,
	id,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section id={id} className={cn("px-4 py-16 sm:px-6 lg:px-8 lg:py-24", className)}>
			<div className="mx-auto w-full max-w-7xl">{children}</div>
		</section>
	);
}

export function SectionHeader({
	eyebrow,
	title,
	description,
	className,
}: {
	eyebrow?: string;
	title: string;
	description?: string;
	className?: string;
}) {
	return (
		<div className={cn("max-w-3xl", className)}>
			{eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-700">{eyebrow}</p> : null}
			<h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">{title}</h2>
			{description ? <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{description}</p> : null}
		</div>
	);
}

export function FadeIn({
	children,
	className,
	delay = 0,
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 18 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
	return (
		<div className={cn("h-2 overflow-hidden rounded-full bg-slate-100", className)} aria-hidden>
			<motion.div
				className="h-full rounded-full bg-gradient-to-r from-indigo-700 to-emerald-400"
				initial={{ width: 0 }}
				whileInView={{ width: `${Math.max(0, Math.min(100, value))}%` }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, ease: "easeOut" }}
			/>
		</div>
	);
}

export function Toast({
	message,
	onClose,
}: {
	message: string | null;
	onClose: () => void;
}) {
	if (!message) {
		return null;
	}

	return (
		<motion.div
			role="status"
			aria-live="polite"
			initial={{ opacity: 0, y: 20, scale: 0.98 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 20, scale: 0.98 }}
			className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-800 shadow-2xl shadow-slate-950/15"
		>
			<CheckCircle2 className="size-5 text-emerald-500" aria-hidden />
			<span className="flex-1">{message}</span>
			<button
				type="button"
				onClick={onClose}
				className="grid size-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				aria-label="Dismiss notification"
			>
				<X className="size-4" aria-hidden />
			</button>
		</motion.div>
	);
}

export function FieldLabel({ children }: { children: ReactNode }) {
	return <label className="text-sm font-semibold text-slate-800">{children}</label>;
}

export function TextInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className={cn(
				"h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100",
				className,
			)}
			{...props}
		/>
	);
}
