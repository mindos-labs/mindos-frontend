"use client";

import { motion } from "framer-motion";

type ProgressRingProps = {
	value: number;
	size?: number;
	stroke?: number;
	label?: string;
};

export function ProgressRing({ value, size = 86, stroke = 8, label }: ProgressRingProps) {
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (value / 100) * circumference;

	return (
		<div className="relative grid place-items-center" style={{ width: size, height: size }}>
			<svg width={size} height={size} className="-rotate-90" aria-hidden>
				<circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-slate-100 dark:text-white/10" />
				<motion.circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					strokeWidth={stroke}
					strokeLinecap="round"
					className="text-indigo-600 dark:text-indigo-300"
					strokeDasharray={circumference}
					initial={{ strokeDashoffset: circumference }}
					animate={{ strokeDashoffset: offset }}
					transition={{ duration: 0.9, ease: "easeOut" }}
				/>
			</svg>
			<span className="absolute text-sm font-bold text-slate-950 dark:text-white">{label ?? `${Math.round(value)}%`}</span>
		</div>
	);
}
