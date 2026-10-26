export function Section({
	id,
	children,
	className = "",
	tone = "plain",
}: {
	id?: string;
	children: React.ReactNode;
	className?: string;
	tone?: "plain" | "surface" | "brand";
}) {
	const tones = {
		plain: "",
		surface: "bg-surface border-y border-line",
		brand: "bg-brand-surface",
	};
	return (
		<section
			id={id}
			className={`scroll-mt-20 py-20 sm:py-24 ${tones[tone]} ${className}`}
		>
			<div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
		</section>
	);
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-[13px] font-semibold tracking-[0.08em] text-brand uppercase">
			{children}
		</p>
	);
}

export function SectionTitle({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h2
			className={`mt-3 text-[32px] leading-[1.15] font-semibold tracking-tight text-ink sm:text-[40px] ${className}`}
		>
			{children}
		</h2>
	);
}

export function Lead({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<p
			className={`mt-5 text-[18px] leading-relaxed text-ink-muted ${className}`}
		>
			{children}
		</p>
	);
}

export function Checklist({ items }: { items: React.ReactNode[] }) {
	return (
		<ul className="mt-7 space-y-3">
			{items.map((item, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: static copy, never reordered
				<li key={index} className="flex gap-3 text-[16px] text-ink">
					<svg
						viewBox="0 0 20 20"
						className="mt-1 size-4 shrink-0 text-brand"
						aria-hidden="true"
					>
						<path
							fill="none"
							stroke="currentColor"
							strokeWidth="2.2"
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m4 10.5 4 4 8-9"
						/>
					</svg>
					<span>{item}</span>
				</li>
			))}
		</ul>
	);
}

export function Faq({
	items,
}: {
	items: { question: string; answer: string }[];
}) {
	return (
		<div className="divide-y divide-line border-y border-line">
			{items.map((item) => (
				<details key={item.question} className="group">
					<summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] font-medium text-ink">
						{item.question}
						<span
							className="text-[22px] leading-none text-ink-muted transition-transform group-open:rotate-45"
							aria-hidden="true"
						>
							+
						</span>
					</summary>
					<p className="max-w-3xl pb-5 text-[16px] text-ink-muted">
						{item.answer}
					</p>
				</details>
			))}
		</div>
	);
}
