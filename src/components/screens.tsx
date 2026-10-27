// Real screens from the product, captured from the demo company (Sparkle Cleaning) and served from public/screens.

type ShotProps = {
	src: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	priority?: boolean;
};

// A desktop capture of the office app. On a phone a full-width
// desktop capture is too small to read, so it is drawn at 1.6× and cropped on the right: the left half of every office
// screen (titles, names, numbers) stays legible.
export function DesktopShot({
	src,
	alt,
	width,
	height,
	className = "",
	priority = false,
	children,
}: ShotProps & { children?: React.ReactNode }) {
	return (
		<figure
			className={`desktop-shot relative min-w-0 overflow-hidden rounded-md border border-line bg-surface ${className}`}
		>
			<img
				src={src}
				alt={alt}
				width={width}
				height={height}
				loading={priority ? "eager" : "lazy"}
				fetchPriority={priority ? "high" : undefined}
				decoding="async"
				className="block h-auto w-full max-w-full max-sm:w-[160%] max-sm:max-w-none"
			/>
			{children}
		</figure>
	);
}

// A simulator capture of the field app or the portal in Safari, in an iPhone 17 Pro-shaped body (styles.css,
// .iphone). The capture already carries the status bar and Dynamic Island, so the frame draws only the hardware.
export function PhoneShot({
	src,
	alt,
	width,
	height,
	className = "",
	priority = false,
}: ShotProps) {
	return (
		<figure className={`iphone-host min-w-0 shrink-0 ${className}`}>
			<div className="iphone">
				<span className="iphone-button iphone-action" aria-hidden="true" />
				<span className="iphone-button iphone-volume-up" aria-hidden="true" />
				<span className="iphone-button iphone-volume-down" aria-hidden="true" />
				<span className="iphone-button iphone-side" aria-hidden="true" />
				<div className="iphone-glass">
					<img
						src={src}
						alt={alt}
						width={width}
						height={height}
						loading={priority ? "eager" : "lazy"}
						decoding="async"
						className="iphone-screen"
					/>
				</div>
			</div>
		</figure>
	);
}
