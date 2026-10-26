import type { Camera } from "lucide-react";

// A floating label beside a phone: an icon and two or three words.
export function Chip({
	icon: Icon,
	className = "",
	children,
}: {
	icon: typeof Camera;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<span
			className={`absolute z-20 inline-flex items-center gap-2 rounded-pill border border-line bg-surface px-3.5 py-2 text-[14px] font-medium whitespace-nowrap text-ink shadow-overlay ${className}`}
		>
			<Icon className="size-4 text-brand" aria-hidden="true" />
			{children}
		</span>
	);
}

const tones = {
	ok: "bg-ok-surface text-ok",
	warn: "bg-warn-surface text-warn",
	bad: "bg-bad-surface text-bad",
	brand: "bg-brand-surface text-brand",
	neutral: "bg-surface-sunken text-ink-muted",
} as const;

// The product's status badge shape: square-ish, tinted, text in the matching semantic colour.
export function Tag({
	tone,
	children,
}: {
	tone: keyof typeof tones;
	children: React.ReactNode;
}) {
	return (
		<span
			className={`inline-flex items-center rounded-sm px-2 py-0.5 text-[12px] font-semibold ${tones[tone]}`}
		>
			{children}
		</span>
	);
}
