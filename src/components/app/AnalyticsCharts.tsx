"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { mockConcepts, mockProgressSnapshots } from "@/components/app/data";

type TooltipPayload = {
	color?: string;
	name?: string;
	value?: number | string;
};

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
	if (!active || !payload?.length) return null;

	return (
		<div className="rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-lg dark:border-white/10 dark:bg-slate-950">
			<p className="font-bold text-slate-950 dark:text-white">{label}</p>
			<div className="mt-2 space-y-1">
				{payload.map((entry) => (
					<p key={`${entry.name}-${entry.value}`} className="font-semibold" style={{ color: entry.color }}>
						{entry.name}: {entry.value}
					</p>
				))}
			</div>
		</div>
	);
}

const chartGrid = "stroke-slate-200 dark:stroke-white/10";

export function ReadinessChart() {
	return (
		<div className="h-72 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<h3 className="text-sm font-bold text-slate-950 dark:text-white">Readiness and memory over time</h3>
			<div className="mt-4 h-56">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={mockProgressSnapshots} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" className={chartGrid} />
						<XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
						<YAxis tickLine={false} axisLine={false} fontSize={12} domain={[0, 100]} />
						<Tooltip content={<ChartTooltip />} />
						<Line type="monotone" dataKey="readiness" name="Readiness" stroke="#4338ca" strokeWidth={3} dot={false} />
						<Line type="monotone" dataKey="memoryStrength" name="Memory" stroke="#06b6d4" strokeWidth={3} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export function RecallAccuracyChart() {
	return (
		<div className="h-72 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<h3 className="text-sm font-bold text-slate-950 dark:text-white">Recall accuracy</h3>
			<div className="mt-4 h-56">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={mockProgressSnapshots} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" className={chartGrid} />
						<XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
						<YAxis tickLine={false} axisLine={false} fontSize={12} domain={[60, 100]} />
						<Tooltip content={<ChartTooltip />} />
						<Line type="monotone" dataKey="recallAccuracy" name="Accuracy" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export function SessionsChart() {
	return (
		<div className="h-72 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<h3 className="text-sm font-bold text-slate-950 dark:text-white">Study sessions per week</h3>
			<div className="mt-4 h-56">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={mockProgressSnapshots} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
						<CartesianGrid strokeDasharray="3 3" className={chartGrid} />
						<XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
						<YAxis tickLine={false} axisLine={false} fontSize={12} />
						<Tooltip content={<ChartTooltip />} />
						<Bar dataKey="sessions" name="Sessions" fill="#4338ca" radius={[10, 10, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export function MasteryDistributionChart() {
	const data = [
		{ name: "Mastered", value: mockConcepts.filter((concept) => concept.status === "mastered").length, color: "#10b981" },
		{ name: "Learning", value: mockConcepts.filter((concept) => concept.status === "learning").length, color: "#f59e0b" },
		{ name: "Weak", value: mockConcepts.filter((concept) => concept.status === "weak").length, color: "#ef4444" },
	];

	return (
		<div className="h-72 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
			<h3 className="text-sm font-bold text-slate-950 dark:text-white">Concept mastery distribution</h3>
			<div className="mt-4 h-56">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={4}>
							{data.map((entry) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
						<Tooltip content={<ChartTooltip />} />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
