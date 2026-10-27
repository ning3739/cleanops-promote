import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { ButtonLink } from "#/components/button";
import { DemoVideo } from "#/components/demo-video";
import { FeatureExplorer } from "#/components/feature-explorer";
import { PhoneShot } from "#/components/screens";
import { ShotDemo } from "#/components/shot-demo";
import { TrialCallout } from "#/components/trial-callout";
import { XeroLogo } from "#/components/xero-logo";
import { photos } from "#/content/photos";
import { money, plans } from "#/content/plans";
import { recording, screens } from "#/content/screens";
import { pageHead, softwareJsonLd } from "#/content/seo";
import { site } from "#/site";

export const Route = createFileRoute("/")({
	head: () => ({
		...pageHead(
			"/",
			"CleanOps — job management for New Zealand cleaning companies",
			"Schedule cleaning jobs, collect photos and hours, and prepare GST invoices. Job management for New Zealand cleaning companies, connected to Xero.",
		),
		scripts: [
			{ type: "application/ld+json", children: JSON.stringify(softwareJsonLd) },
		],
	}),
	component: Home,
});

const workflow = [
	{
		id: "home-schedule",
		href: "/product#plan",
		link: "Scheduling & recurring jobs",
		step: "Scheduling",
		title: "",
		lead: "Assign one-off and recurring jobs. See the week by cleaner, including confirmations and NZ public holidays.",
		visual: <ShotDemo shot={screens.officeSchedule} demo="schedule" />,
	},
	{
		id: "home-review",
		href: "/product#check",
		link: "Checklists & job review",
		step: "Checklists & job review",
		title: "",
		lead: "Review a completed job’s checklist, required photos and recorded hours before approving it.",
		visual: (
			<ShotDemo
				shot={screens.cropReview}
				demo="review"
				className="review-preview"
			/>
		),
	},
	{
		id: "home-invoices",
		href: "/product#bill",
		link: "Invoicing & Xero",
		step: "Invoicing & Xero",
		title: "",
		lead: "Approval creates a draft GST invoice. Review it, send it and sync with Xero.",
		visual: <ShotDemo shot={screens.cropInvoice} demo="invoice" />,
	},
];

function Home() {
	return (
		<>
			<section className="home-hero marketing-container">
				<div className="home-hero-copy">
					<p className="section-label">Made in New Zealand</p>
					<h1>Job management for cleaning companies.</h1>
					<p className="hero-description">
						Schedule jobs, collect photos and hours, and prepare GST invoices.
						Keep the office and field team on the same job record.
					</p>
					<div className="hero-actions">
						<ButtonLink href={site.app.register} size="lg" data-cta="hero">
							Start free trial
						</ButtonLink>
						<a href="#demo" className="text-link">
							<Play className="size-4" aria-hidden="true" />
							Watch the overview
						</a>
					</div>
					<p className="trial-note">
						{site.trialDays} days free. No credit card required.
					</p>
					<div className="hero-integration">
						<XeroLogo />
						<span>
							Connected to Xero<span>GST invoices and payroll hours</span>
						</span>
					</div>
				</div>
				<div className="home-hero-media">
					<img
						src={photos.officeVacuum.src}
						alt={photos.officeVacuum.alt}
						width={photos.officeVacuum.width}
						height={photos.officeVacuum.height}
						fetchPriority="high"
						decoding="async"
						className="home-hero-photo"
					/>
					<PhoneShot
						{...screens.fieldToday}
						priority
						className="home-hero-phone"
					/>
				</div>
			</section>

			<section id="product" className="site-section workflow-section">
				<div className="marketing-container">
					<div className="section-intro">
						<div>
							<p className="section-label">The office</p>
							<h2>From the schedule to the invoice.</h2>
						</div>
						<a href="/product" className="text-link">
							Explore the product{" "}
							<ArrowRight className="size-4" aria-hidden="true" />
						</a>
					</div>
					<FeatureExplorer items={workflow} />
				</div>
			</section>

			<section className="site-section people-section">
				<div className="marketing-container people-layout">
					<div className="people-copy">
						<p className="section-label">On site</p>
						<h2>The field app</h2>
						<p>
							Addresses, access instructions, checklists and time records for
							iPhone and Android. Work offline and sync when connected.
						</p>
						<ul className="plain-list">
							<li>Confirm or decline upcoming jobs</li>
							<li>Cleaners see their own work, without customer prices</li>
						</ul>
						<a href="/app" className="text-link">
							See the field app{" "}
							<ArrowRight className="size-4" aria-hidden="true" />
						</a>
					</div>
					<div className="field-screens">
						<PhoneShot {...screens.fieldJob} />
						<PhoneShot {...screens.fieldChecklist} />
					</div>
				</div>
			</section>

			<section className="customer-strip site-section">
				<div className="marketing-container customer-layout">
					<div className="portal-screens">
						<PhoneShot {...screens.portalVisits} />
						<PhoneShot {...screens.portalInvoices} />
					</div>
					<div>
						<p className="section-label">Your customers</p>
						<h2>Customer records</h2>
						<p>
							Customers can view visits, completion reports, photos and invoices
							from a link, without creating an account.
						</p>
						<p className="plan-explanation">
							Customer portal on Business. Completion reports by email on every
							plan.
						</p>
						<a href="/pricing" className="text-link">
							Compare Business features{" "}
							<ArrowRight className="size-4" aria-hidden="true" />
						</a>
					</div>
				</div>
			</section>

			<section id="demo" className="site-section overview-section">
				<div className="marketing-container overview-layout">
					<div>
						<p className="section-label">Product overview</p>
						<h2>See a job in CleanOps.</h2>
						<p>
							A {recording.seconds}-second walkthrough of the office view, field
							app and invoice.
						</p>
					</div>
					<DemoVideo />
				</div>
			</section>
			<section className="home-pricing">
				<div className="marketing-container home-pricing-inner">
					<div>
						<p className="section-label">Pricing</p>
						<h2>
							From {money(plans[0].monthly)} <span>NZD / month + GST</span>
						</h2>
						<p>
							{plans[0].seats} cleaners included. Unlimited office logins on
							every plan.
						</p>
					</div>
					<a href="/pricing" className="text-link">
						Compare plans <ArrowRight className="size-4" aria-hidden="true" />
					</a>
				</div>
			</section>
			<TrialCallout />
		</>
	);
}
