import type { AnchorHTMLAttributes } from "react";

type Intent = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const intents: Record<Intent, string> = {
	primary:
		"bg-brand text-brand-ink shadow-control hover:bg-brand-hover hover:text-brand-ink",
	secondary:
		"border border-line-strong bg-surface text-ink shadow-control hover:bg-surface-sunken hover:text-ink",
	ghost: "text-ink hover:bg-surface-sunken hover:text-ink",
};
const sizes: Record<Size, string> = {
	md: "h-10 px-4 text-[15px]",
	lg: "h-12 px-6 text-[16px]",
};

// Every call to action on the site is a link: to the app, to another page, or to an email address.
export function ButtonLink({
	intent = "primary",
	size = "md",
	className = "",
	...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { intent?: Intent; size?: Size }) {
	return (
		<a
			{...props}
			className={`inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap no-underline transition-colors ${intents[intent]} ${sizes[size]} ${className}`}
		/>
	);
}
