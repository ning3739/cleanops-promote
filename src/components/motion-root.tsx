import { useEffect } from "react";

// What fades in as it scrolls into view (styles.css, "Motion"). The top level of a section only — never item by item,
// and never the hero, which must paint at once.
export const REVEAL_SELECTOR = [
	".section-intro",
	".feature-explorer",
	".people-copy",
	".field-screens",
	".customer-layout > *",
	".overview-layout > *",
	".home-pricing-inner",
].join(",");

// Content is visible by default. Only when this runs, and the visitor has not asked for reduced motion, does <html> get
// `motion-ready`, which hides the reveal targets until they are on screen. No script, no hidden content.
export function MotionRoot() {
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const targets = [
			...document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
		].filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
		if (targets.length === 0) return;
		for (const el of targets) el.classList.add("reveal");
		document.documentElement.classList.add("motion-ready");
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.classList.add("is-in");
					observer.unobserve(entry.target);
				}
			},
			{ rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
		);
		for (const el of targets) observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return null;
}
