import { useEffect, useState } from "react";
import { type FeatureKey, plans } from "#/content/plans";
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
		<div className="feature-explorer">
			<div className="feature-directory">
				{items.map((item, index) => (
					<div key={item.id} id={item.id} className="feature-entry">
						<h3>
							<button
								type="button"
								id={`${item.id}-trigger`}
								aria-expanded={expanded === index}
								aria-controls={`${item.id}-details`}
								className={selected === index ? "is-selected" : ""}
								onClick={() => {
									setSelected(index);
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
								<span aria-hidden="true">{expanded === index ? "−" : "+"}</span>
							</button>
						</h3>
						<div
							id={`${item.id}-details`}
							hidden={expanded !== index}
							className="feature-description"
						>
							{item.title && <p className="feature-title">{item.title}</p>}
							<p>{item.lead}</p>
							{item.points && (
								<ul>
									{item.points.map((point) => {
										const feature = point.plan;
										const plan = feature
											? plans.find((plan) => plan.features.includes(feature))
											: undefined;
										return (
											<li key={point.text}>
												{point.icon === XeroLogo && <XeroLogo />}
												<span>
													{point.text}
													{plan && plan !== plans[0] && (
														<span className="feature-plan">{plan.name}</span>
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
							{expanded === index && (
								<div className="feature-inline-preview">
									{item.visual}
									<p>{item.step} in CleanOps · Demo company</p>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
			<section
				className="feature-preview feature-desktop-preview"
				aria-labelledby={`${items[selected].id}-trigger`}
				aria-live="polite"
			>
				<div className="feature-preview-inner">{items[selected].visual}</div>
				<p>{items[selected].step} in CleanOps · Demo company</p>
			</section>
		</div>
	);
}
