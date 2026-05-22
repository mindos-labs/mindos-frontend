"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { publicUser } from "./data";
import { ActionButton, BrandMark, ButtonLink, FieldLabel, TextInput, Toast } from "./ui";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
	const isSignup = mode === "signup";
	const [toast, setToast] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: publicUser.name,
		email: publicUser.email,
		password: "",
	});

	const title = isSignup ? "Create your learning cockpit." : "Welcome back to NeuroPilot.";
	const subtitle = isSignup
		? "Start with a goal, add your material, and let the onboarding flow build a first plan."
		: "Pick up where your daily mission left off. This login screen is UI-only.";

	const cta = useMemo(() => (isSignup ? "Create mock account" : "Continue to mock session"), [isSignup]);

	useEffect(() => {
		if (!toast) {
			return;
		}
		const timer = window.setTimeout(() => setToast(null), 3000);
		return () => window.clearTimeout(timer);
	}, [toast]);

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		window.setTimeout(() => {
			setLoading(false);
			setToast(isSignup ? "Mock account created. Onboarding is ready when you are." : "Mock login complete. No backend call was made.");
		}, 650);
	}

	return (
		<main className="min-h-screen bg-[#f8fafc] font-sans text-slate-950">
			<div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
				<header className="flex items-center justify-between">
					<BrandMark />
					<div className="flex items-center gap-2">
						<ButtonLink href="/" variant="ghost" className="hidden h-10 px-4 sm:inline-flex">
							Home
						</ButtonLink>
						<ButtonLink href={isSignup ? "/login" : "/signup"} variant="secondary" className="h-10 px-4">
							{isSignup ? "Log in" : "Sign up"}
						</ButtonLink>
					</div>
				</header>
				<div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.95fr_1.05fr]">
					<section className="hidden lg:block">
						<div className="max-w-xl">
							<div className="inline-flex rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
								Frontend-only auth
							</div>
							<h1 className="mt-6 text-5xl font-semibold tracking-normal text-slate-950">{title}</h1>
							<p className="mt-5 text-lg leading-8 text-slate-600">{subtitle}</p>
							<div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/10">
								<div className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
									<p className="text-sm font-semibold text-slate-500">Next mission preview</p>
									<h2 className="mt-2 text-2xl font-semibold text-slate-950">Cache Mapping sprint</h2>
									<div className="mt-5 grid gap-3">
										{["Learn direct mapping", "Recall 18 due cards", "Repair pipeline hazards"].map((item, index) => (
											<div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
												<div className="grid size-9 place-items-center rounded-2xl bg-indigo-50 text-sm font-semibold text-indigo-700">{index + 1}</div>
												<p className="text-sm font-semibold text-slate-700">{item}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="mx-auto w-full max-w-md">
						<div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/10 sm:p-8">
							<div className="lg:hidden">
								<div className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-700">
									Frontend-only auth
								</div>
								<h1 className="mt-5 text-3xl font-semibold tracking-normal text-slate-950">{title}</h1>
								<p className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</p>
							</div>
							<form className="mt-6 space-y-5 lg:mt-0" onSubmit={submit}>
								{isSignup ? (
									<div className="space-y-2">
										<FieldLabel>Name</FieldLabel>
										<div className="relative">
											<UserRound className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
											<TextInput
												value={form.name}
												onChange={(event) => setForm((value) => ({ ...value, name: event.target.value }))}
												className="pl-11"
												placeholder="Your name"
												autoComplete="name"
												required
											/>
										</div>
									</div>
								) : null}
								<div className="space-y-2">
									<FieldLabel>Email</FieldLabel>
									<div className="relative">
										<Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
										<TextInput
											type="email"
											value={form.email}
											onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))}
											className="pl-11"
											placeholder="you@example.com"
											autoComplete="email"
											required
										/>
									</div>
								</div>
								<div className="space-y-2">
									<FieldLabel>Password</FieldLabel>
									<div className="relative">
										<Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden />
										<TextInput
											type={showPassword ? "text" : "password"}
											value={form.password}
											onChange={(event) => setForm((value) => ({ ...value, password: event.target.value }))}
											className="pl-11 pr-11"
											placeholder="Use any mock password"
											autoComplete={isSignup ? "new-password" : "current-password"}
											required
										/>
										<button
											type="button"
											onClick={() => setShowPassword((value) => !value)}
											className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
											aria-label={showPassword ? "Hide password" : "Show password"}
										>
											{showPassword ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
										</button>
									</div>
								</div>
								{isSignup ? (
									<label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
										<input
											type="checkbox"
											className="mt-1 size-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500"
											required
											defaultChecked
										/>
										<span>I understand this is a frontend-only prototype with mock auth.</span>
									</label>
								) : (
									<div className="flex items-center justify-between text-sm font-medium">
										<label className="flex items-center gap-2 text-slate-600">
											<input type="checkbox" className="size-4 rounded border-slate-300 text-indigo-700 focus:ring-indigo-500" defaultChecked />
											Remember me
										</label>
										<button type="button" className="text-indigo-700 hover:text-indigo-900" onClick={() => setToast("Password reset email is mocked.")}>
											Forgot password?
										</button>
									</div>
								)}
								<ActionButton type="submit" className="w-full" loading={loading}>
									{cta}
									{!loading ? <ArrowRight className="ml-2 size-4" aria-hidden /> : null}
								</ActionButton>
							</form>
							<div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
								<div className="h-px flex-1 bg-slate-200" />
								or
								<div className="h-px flex-1 bg-slate-200" />
							</div>
							<div className="grid gap-3">
								{["Continue with Google", "Continue with GitHub"].map((label) => (
									<ActionButton key={label} type="button" variant="secondary" className="w-full" onClick={() => setToast(`${label} is a mocked provider action.`)}>
										{label}
									</ActionButton>
								))}
							</div>
							<p className="mt-6 text-center text-sm text-slate-600">
								{isSignup ? "Already have a workspace?" : "New to NeuroPilot?"}{" "}
								<Link href={isSignup ? "/login" : "/signup"} className="font-semibold text-indigo-700 hover:text-indigo-900">
									{isSignup ? "Log in" : "Create an account"}
								</Link>
							</p>
							{isSignup ? (
								<ButtonLink href="/onboarding" variant="ghost" className="mt-3 w-full">
									Skip form and try onboarding
								</ButtonLink>
							) : null}
						</div>
					</section>
				</div>
			</div>
			<AnimatePresence>
				<Toast message={toast} onClose={() => setToast(null)} />
			</AnimatePresence>
		</main>
	);
}
