import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ButtonLink } from "#/components/button";
import { Faq } from "#/components/section";
import { pricingFaq } from "#/content/faq";
import {
	everyPlan,
	featureLabels,
	hasFeature,
	money,
	plans,
	storageOveragePerGb,
	trialPlan,
} from "#/content/plans";
import { faqJsonLd, pageHead, softwareJsonLd } from "#/content/seo";
import { site } from "#/site";

export const Route = createFileRoute("/pricing")({
	head: () => ({
		...pageHead(
			"/pricing",
			"Pricing — CleanOps",
			`From ${money(plans[0].monthly)} a month plus GST. You pay for cleaners in the field; office logins are free and unlimited.`,
		),
		scripts: [
			{ type: "application/ld+json", children: JSON.stringify(softwareJsonLd) },
			{
				type: "application/ld+json",
				children: JSON.stringify(faqJsonLd(pricingFaq)),
			},
		],
	}),
	component: Pricing,
});

const audience: Record<string, string> = {
	STARTER: "For owner-operators",
	PRO: "For growing teams",
	BUSINESS: "For several teams and commercial work",
};

function Pricing() {
	const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
	return (
		<>
			<section className="page-intro pricing-intro marketing-container">
				<div>
					<p className="section-label">Pricing</p>
					<h1>Choose a plan for your team.</h1>
					<p>
						Pay for cleaners in the field. Office logins are included, with no
						limit on your office team.
					</p>
				</div>
				<div className="pricing-trial">
					<p>
						Try {trialPlan.name} free for {site.trialDays} days.
					</p>
					<span>
						No credit card required. All prices in NZD, excluding GST.
					</span>
				</div>
			</section>
			<section className="plans-section marketing-container">
				<div className="billing-row">
					<fieldset
						aria-label="Billing period"
						className="billing-switch"
					>
						<button
							type="button"
							aria-pressed={billing === "monthly"}
							onClick={() => setBilling("monthly")}
						>
							Monthly
						</button>
						<button
							type="button"
							aria-pressed={billing === "annual"}
							onClick={() => setBilling("annual")}
						>
							Yearly
						</button>
					</fieldset>
					<p>Two months free with yearly billing.</p>
				</div>
				<div className="plans-grid">
					{plans.map((plan, index) => {
						const previous = plans[index - 1];
						const added = featureLabels.filter(
							(f) =>
								hasFeature(plan, f.key) &&
								(!previous || !hasFeature(previous, f.key)),
						);
						return (
							<article key={plan.code} className="plan-column">
								<header>
									<h2>{plan.name}</h2>
									<p>{audience[plan.code]}</p>
								</header>
								<div className="plan-price" aria-live="polite">
									<strong>
										{money(billing === "monthly" ? plan.monthly : plan.annual)}
									</strong>
									<span>
										/ {billing === "monthly" ? "month" : "year"} + GST
									</span>
								</div>
								<p className="plan-billing-note">
									{billing === "monthly"
										? `${money(plan.annual)} / year with yearly billing`
										: "Billed yearly. Extra cleaners and storage billed monthly."}
								</p>
								<ButtonLink
									href={site.app.register}
									intent={plan.code === "PRO" ? "primary" : "secondary"}
									className="plan-button"
									data-cta={`pricing-${plan.code.toLowerCase()}`}
								>
									Start free trial
								</ButtonLink>
								<dl className="plan-capacity">
									<div>
										<dt>Cleaners included</dt>
										<dd>{plan.seats}</dd>
									</div>
									<div>
										<dt>Extra cleaner / month</dt>
										<dd>{money(plan.extraSeat)}</dd>
									</div>
									<div>
										<dt>Storage</dt>
										<dd>{plan.storageGb} GB</dd>
									</div>
									<div>
										<dt>Office logins</dt>
										<dd>Unlimited</dd>
									</div>
								</dl>
								<div className="plan-features">
									<h3>
										{previous
											? `Everything in ${previous.name}, plus`
											: "Included in Starter"}
									</h3>
									<ul>
										{(previous
											? added.map((f) => f.label)
											: [
													"Jobs, schedule and field app",
													"Checklists and photos",
													"GST invoices and Xero",
													"Hours export",
												]
										).map((label) => (
											<li key={label}>{label}</li>
										))}
									</ul>
								</div>
							</article>
						);
					})}
				</div>
				<div className="seat-note">
					<p>
						A seat is one cleaner using the app, including contractors. Extra
						storage is {money(storageOveragePerGb)} per GB.
					</p>
					<a href="#compare">Compare every feature ↓</a>
				</div>
			</section>
			<section id="compare" className="site-section comparison-section">
				<div className="marketing-container">
					<div className="comparison-intro">
						<h2>Compare plans</h2>
						<p>Every plan includes {everyPlan}</p>
					</div>
					<p className="table-scroll-note">
						Scroll across to compare all three plans.
					</p>
					<section
						className="comparison-scroll"
						// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard users need to scroll the wide comparison table.
						tabIndex={0}
						aria-label="Plan comparison. Scroll horizontally on smaller screens."
					>
						<table className="comparison-table">
							<caption className="sr-only">CleanOps plan features</caption>
							<thead>
								<tr>
									<th scope="col">Features</th>
									{plans.map((plan) => (
										<th key={plan.code} scope="col">
											{plan.name}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">Field staff included</th>
									{plans.map((plan) => (
										<td key={plan.code}>{plan.seats}</td>
									))}
								</tr>
								<tr>
									<th scope="row">Storage included</th>
									{plans.map((plan) => (
										<td key={plan.code}>{plan.storageGb} GB</td>
									))}
								</tr>
								{featureLabels.map((feature) => (
									<tr key={feature.key}>
										<th scope="row">{feature.label}</th>
										{plans.map((plan) => (
											<td key={plan.code}>
												{hasFeature(plan, feature.key) ? (
													<>
														<span aria-hidden="true" className="included-mark">
															✓
														</span>
														<span className="sr-only">Included</span>
													</>
												) : (
													<>
														<span aria-hidden="true">—</span>
														<span className="sr-only">Not included</span>
													</>
												)}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</section>
				</div>
			</section>
			<section className="site-section questions-section">
				<div className="marketing-container questions-layout">
					<h2>Pricing questions</h2>
					<Faq items={pricingFaq} />
				</div>
			</section>
		</>
	);
}
