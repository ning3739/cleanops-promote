import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { type FeatureKey, plans } from "#/content/plans";
import { MotionProvider } from "./motion-provider";
import { XeroLogo } from "./xero-logo";

type Feature = {
	id: string;
	step: string;
	title: string;
	lead: string;
	points?: { text: string; plan?: FeatureKey; icon?: React.ElementType }[];
	visual: React.ReactNode;
	href?: string;
	link?: string;
};

export function FeatureExplorer({
	items,
	hashNavigation = false,
}: {
	items: Feature[];
	hashNavigation?: boolean;
}) {
	const [selected, setSelected] = useState(0);
	const [expanded, setExpanded] = useState<number | null>(0);
	// The entry that is closing keeps its inline screenshot until it has folded away, so the height eases out smoothly.
	const [closing, setClosing] = useState<number | null>(null);

	useEffect(() => {
		if (!hashNavigation) return;
		const openFromHash = () => {
			const index = items.findIndex((item) => `#${item.id}` === location.hash);
			if (index >= 0) {
				setSelected(index);
				setExpanded(index);
			}
		};
		openFromHash();
		window.addEventListener("hashchange", openFromHash);
		return () => window.removeEventListener("hashchange", openFromHash);
	}, [items, hashNavigation]);

	return (
		<MotionProvider>
			<div className="feature-explorer">
				<div className="feature-directory">
					{items.map((item, index) => (
						<div key={item.id} id={item.id} className="feature-entry">
							{selected === index && (
								<m.span
									layoutId="feature-indicator"
									className="feature-indicator"
									aria-hidden="true"
									transition={{ type: "spring", stiffness: 500, damping: 42 }}
								/>
							)}
							<h3>
								<button
									type="button"
									id={`${item.id}-trigger`}
									aria-expanded={expanded === index}
									aria-controls={`${item.id}-details`}
									className={selected === index ? "is-selected" : ""}
									onClick={() => {
										setSelected(index);
										setClosing(expanded);
										setExpanded(expanded === index ? null : index);
										if (hashNavigation) {
											window.history.replaceState(
												window.history.state,
												"",
												`#${item.id}`,
											);
										}
									}}
								>
									{item.step}
									<span aria-hidden="true">
										{expanded === index ? "−" : "+"}
									</span>
								</button>
							</h3>
							<m.div
								id={`${item.id}-details`}
								className="feature-fold"
								initial={false}
								animate={expanded === index ? "open" : "closed"}
								variants={{
									open: { height: "auto", opacity: 1 },
									closed: { height: 0, opacity: 0 },
								}}
								transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
								inert={expanded !== index}
								onAnimationComplete={(definition) => {
									if (definition === "closed" && closing === index)
										setClosing(null);
								}}
							>
								<div className="feature-description">
									{item.title && <p className="feature-title">{item.title}</p>}
									<p>{item.lead}</p>
									{item.points && (
										<ul>
											{item.points.map((point) => {
												const feature = point.plan;
												const plan = feature
													? plans.find((plan) =>
															plan.features.includes(feature),
														)
													: undefined;
												return (
													<li key={point.text}>
														{point.icon === XeroLogo && <XeroLogo />}
														<span>
															{point.text}
															{plan && plan !== plans[0] && (
																<span className="feature-plan">
																	{plan.name}
																</span>
															)}
														</span>
													</li>
												);
											})}
										</ul>
									)}
									{item.href && (
										<a className="text-link" href={item.href}>
											{item.link}
										</a>
									)}
									{(expanded === index || closing === index) && (
										<div className="feature-inline-preview">
											{item.visual}
											<p>{item.step} in CleanOps · Demo company</p>
										</div>
									)}
								</div>
							</m.div>
						</div>
					))}
				</div>
				<section
					className="feature-preview feature-desktop-preview"
					aria-labelledby={`${items[selected].id}-trigger`}
					aria-live="polite"
				>
					{/* Keyed by item: the old screen fades out, the new one mounts fresh and its demo plays. */}
					<AnimatePresence mode="wait" initial={false}>
						<m.div
							key={items[selected].id}
							className="feature-preview-inner"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -6 }}
							transition={{ duration: 0.2, ease: "easeOut" }}
						>
							{items[selected].visual}
						</m.div>
					</AnimatePresence>
					<p>{items[selected].step} in CleanOps · Demo company</p>
				</section>
			</div>
		</MotionProvider>
	);
}
