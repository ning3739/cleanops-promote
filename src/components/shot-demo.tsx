import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DesktopShot } from "./screens";

// A two-to-three-second demonstration drawn over a real screenshot: rings, ticks and a pill that play once when the
// screenshot comes into view (styles.css, .shot-demo). Positions are percentages of the screenshot itself, measured on
// the 1440×900 captures. Without JavaScript, or with reduced motion, nothing is drawn and the screenshot stands alone.

type Shot = { src: string; alt: string; width: number; height: number };
type Box = { left: number; top: number; width: number; height: number };

// Coordinates are in the capture's 1440×900 space; `area` is the part of that space the image shows (crops).
function box(area: Box, x: number, y: number, w: number, h: number) {
	return {
		left: `${((x - area.left) / area.width) * 100}%`,
		top: `${((y - area.top) / area.height) * 100}%`,
		width: `${(w / area.width) * 100}%`,
		height: `${(h / area.height) * 100}%`,
	};
}

// A pill sizes itself to its label, so it takes a position only.
function at(area: Box, x: number, y: number) {
	const { left, top } = box(area, x, y, 0, 0);
	return { left, top };
}

const FULL: Box = { left: 0, top: 0, width: 1440, height: 900 };
const REVIEW: Box = { left: 840, top: 0, width: 600, height: 900 }; // crop-review.webp
const INVOICE: Box = { left: 260, top: 90, width: 1155, height: 560 }; // crop-invoice.webp

const demos = {
	// The week: two jobs nobody is going to, then a confirmed one.
	schedule: (
		<>
			<span
				className="demo-ring demo-ring-bad"
				style={{ ...box(FULL, 766, 275, 200, 66), animationDelay: "0.3s" }}
			/>
			<span
				className="demo-ring demo-ring-bad"
				style={{ ...box(FULL, 971, 275, 202, 66), animationDelay: "0.5s" }}
			/>
			<span
				className="demo-ring demo-ring-ok"
				style={{ ...box(FULL, 766, 417, 200, 65), animationDelay: "1.3s" }}
			/>
			<span
				className="demo-pill"
				style={{ ...at(FULL, 766, 487), animationDelay: "1.6s" }}
			>
				<Check aria-hidden="true" /> Confirmed
			</span>
		</>
	),
	// Review: the checklist ticks through, then Approve.
	review: (
		<>
			{[527, 573, 619, 665, 711, 757, 803].map((y, i) => (
				<span
					key={y}
					className="demo-tick"
					style={{
						...box(REVIEW, 858, y - 11, 22, 22),
						animationDelay: `${0.2 + i * 0.18}s`,
					}}
				/>
			))}
			<span
				className="demo-ring"
				style={{ ...box(REVIEW, 1177, 836, 87, 36), animationDelay: "1.7s" }}
			/>
			<span
				className="demo-pill demo-pill-ok"
				style={{ ...at(REVIEW, 1080, 330), animationDelay: "2s" }}
			>
				<Check aria-hidden="true" /> Approved
			</span>
		</>
	),
	// Invoice: GST worked out, and it is paid.
	invoice: (
		<>
			<span
				className="demo-ring"
				style={{ ...box(INVOICE, 282, 522, 756, 26), animationDelay: "0.4s" }}
			/>
			<span
				className="demo-ring"
				style={{ ...box(INVOICE, 282, 547, 756, 26), animationDelay: "0.9s" }}
			/>
			<span
				className="demo-ring demo-ring-ok"
				style={{ ...box(INVOICE, 459, 120, 49, 23), animationDelay: "1.5s" }}
			/>
		</>
	),
} as const;

export function ShotDemo({
	shot,
	demo,
	className,
}: {
	shot: Shot;
	demo: keyof typeof demos;
	className?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const [state, setState] = useState<"off" | "ready" | "in">("off");

	useEffect(() => {
		const node = ref.current;
		if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return;
		setState("ready");
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setState("in");
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<DesktopShot {...shot} className={className}>
			<span
				ref={ref}
				className="shot-demo"
				data-state={state}
				aria-hidden="true"
			>
				{state !== "off" && demos[demo]}
			</span>
		</DesktopShot>
	);
}
