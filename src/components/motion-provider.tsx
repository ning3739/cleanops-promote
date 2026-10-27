import { LazyMotion, MotionConfig } from "motion/react";

// Motion for the two interactive pieces only: the feature explorer and the pricing switch. The animation features are
// fetched in their own chunk once the page is up; a change made before they arrive is applied when they do. Visitors
// who ask for reduced motion get the same changes, at once.
const features = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
	return (
		<MotionConfig reducedMotion="user">
			<LazyMotion features={features} strict>
				{children}
			</LazyMotion>
		</MotionConfig>
	);
}
