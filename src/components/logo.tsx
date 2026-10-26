// The CleanOps mark (cleanops/docs/assets/cleanops-mark.svg): a ring with one square corner.
export function LogoMark({ className = "size-7" }: { className?: string }) {
	return (
		<svg viewBox="0 0 26 26" className={className} aria-hidden="true">
			<path
				fill="currentColor"
				fillRule="evenodd"
				d="M13 0h11.4Q26 0 26 1.6V13A13 13 0 1 1 13 0Zm0 5.4a7.6 7.6 0 1 0 0 15.2 7.6 7.6 0 1 0 0-15.2Z"
			/>
		</svg>
	);
}

export function Logo() {
	return (
		<span className="inline-flex items-center gap-2.5 text-ink">
			<LogoMark className="size-7 text-brand" />
			<span className="text-[19px] font-semibold tracking-tight">CleanOps</span>
		</span>
	);
}
