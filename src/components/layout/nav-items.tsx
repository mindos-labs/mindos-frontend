import {
	BarChart3,
	BookOpen,
	Brain,
	CalendarDays,
	Home,
	Library,
	MessageCircle,
	Settings,
	type LucideIcon,
} from "lucide-react";

export type NavItem = {
	label: string;
	href: string;
	icon: LucideIcon;
	match: string;
};

export const appNavItems: NavItem[] = [
	{ label: "Today", href: "/app/today", icon: Home, match: "/app/today" },
	{ label: "Learn", href: "/app/learn", icon: BookOpen, match: "/app/learn" },
	{ label: "Library", href: "/app/library", icon: Library, match: "/app/library" },
	{ label: "Recall", href: "/app/recall", icon: Brain, match: "/app/recall" },
	{ label: "Tutor", href: "/app/tutor", icon: MessageCircle, match: "/app/tutor" },
	{ label: "Planner", href: "/app/planner", icon: CalendarDays, match: "/app/planner" },
	{ label: "Progress", href: "/app/progress", icon: BarChart3, match: "/app/progress" },
	{ label: "Settings", href: "/app/settings", icon: Settings, match: "/app/settings" },
];
