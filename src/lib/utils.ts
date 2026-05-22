import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ConceptStatus, ResourceType, ThemePreference } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function clamp(value: number, min = 0, max = 100) {
	return Math.min(Math.max(value, min), max);
}

export function createId(prefix = "id") {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function sleep(ms = 400) {
	return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
}

export function cloneData<T>(value: T): T {
	if (typeof structuredClone === "function") {
		return structuredClone(value);
	}

	return JSON.parse(JSON.stringify(value)) as T;
}

export function formatPercent(value: number) {
	return `${Math.round(clamp(value))}%`;
}

export function formatMinutes(minutes: number) {
	if (minutes < 60) {
		return `${minutes} min`;
	}

	const hours = Math.floor(minutes / 60);
	const remaining = minutes % 60;

	return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

export function formatRelativeTime(isoDate: string | null) {
	if (!isoDate) {
		return "Never";
	}

	const date = new Date(isoDate);
	const diffMs = Date.now() - date.getTime();
	const diffMinutes = Math.round(diffMs / 60000);

	if (diffMinutes < 1) {
		return "Just now";
	}

	if (diffMinutes < 60) {
		return `${diffMinutes} min ago`;
	}

	const diffHours = Math.round(diffMinutes / 60);

	if (diffHours < 24) {
		return `${diffHours}h ago`;
	}

	const diffDays = Math.round(diffHours / 24);

	if (diffDays < 7) {
		return `${diffDays}d ago`;
	}

	return date.toLocaleDateString("en", {
		month: "short",
		day: "numeric",
	});
}

export function getInitials(name: string) {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();
}

export function resourceTypeLabel(type: ResourceType) {
	const labels: Record<ResourceType, string> = {
		pdf: "PDF",
		youtube: "YouTube",
		web: "Web",
		notes: "Notes",
		flashcards: "Flashcards",
	};

	return labels[type];
}

export function inferResourceType(input: string): ResourceType {
	const normalized = input.toLowerCase();

	if (normalized.includes("youtube.com") || normalized.includes("youtu.be")) {
		return "youtube";
	}

	if (normalized.endsWith(".pdf")) {
		return "pdf";
	}

	if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
		return "web";
	}

	if (normalized.includes("flashcard")) {
		return "flashcards";
	}

	return "notes";
}

export function conceptStatusTone(status: ConceptStatus) {
	const tones: Record<ConceptStatus, "success" | "warning" | "danger" | "muted"> = {
		mastered: "success",
		learning: "warning",
		weak: "danger",
		unseen: "muted",
	};

	return tones[status];
}

export function memoryStrengthLabel(strength: number) {
	if (strength >= 85) {
		return "Strong";
	}

	if (strength >= 65) {
		return "Stable";
	}

	if (strength >= 40) {
		return "Fading";
	}

	return "Needs repair";
}

export function getWorkspaceHref(workspaceId: string) {
	return `/app/learn/${workspaceId}`;
}

export function getResourceHref(resourceId: string) {
	return `/app/library/${resourceId}`;
}

export function resolveThemePreference(theme: ThemePreference) {
	if (theme !== "system") {
		return theme;
	}

	if (typeof window === "undefined") {
		return "light";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyThemePreference(theme: ThemePreference) {
	if (typeof document === "undefined") {
		return;
	}

	const resolved = resolveThemePreference(theme);
	document.documentElement.classList.toggle("dark", resolved === "dark");
	document.documentElement.dataset.theme = theme;
}

export function shouldUseReducedMotion() {
	if (typeof window === "undefined") {
		return false;
	}

	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
