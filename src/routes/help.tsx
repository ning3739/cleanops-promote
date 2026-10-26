import { createFileRoute } from "@tanstack/react-router";
import { Faq } from "#/components/section";
import { XeroLogo } from "#/components/xero-logo";
import { homeFaq } from "#/content/faq";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

export const Route = createFileRoute("/help")({
	head: () =>
		pageHead(
			"/help",
			"Help and contact — CleanOps",
			"Contact the CleanOps team in Queenstown, New Zealand. Help with signing in, adding cleaners, Xero and your subscription.",
		),
	component: Help,
});

function Help() {
	return (
		<>
			<section className="page-intro help-intro marketing-container">
				<div>
					<p className="section-label">Support</p>
					<h1>Help & contact</h1>
					<p>
						Questions about CleanOps? Email the team who build it, based in{" "}
						{site.company.city}, New Zealand.
					</p>
				</div>
				<div className="contact-details">
					<a className="contact-email" href={`mailto:${site.contact.email}`}>
						{site.contact.email}
					</a>
					<p>{site.contact.hours}</p>
					<span>
						{site.company.name} · {site.company.city}
					</span>
				</div>
			</section>
			<section className="site-section help-start-section">
				<div className="marketing-container help-start-layout">
					<h2>Where to start</h2>
					<dl className="help-topics">
						<div>
							<dt>Signing in</dt>
							<dd>
								Use the web app for office work and the field app for cleaning
								jobs. You can reset your password or request an email sign-in
								link.
							</dd>
						</div>
						<div>
							<dt>Adding cleaners</dt>
							<dd>
								In the office app, open Employees → Invite. Your cleaner
								installs the app and opens the invitation email.
							</dd>
						</div>
						<div>
							<dt className="xero-heading">
								<XeroLogo />
								Connecting Xero
							</dt>
							<dd>
								Open Settings → Xero. Invoices are sent to Xero and payments are
								synced back.
							</dd>
						</div>
						<div>
							<dt>Plan & data</dt>
							<dd>
								Manage your subscription in Settings → Plan and usage. Your
								records are available from Data export.
							</dd>
						</div>
					</dl>
				</div>
			</section>
			<section className="site-section questions-section">
				<div className="marketing-container questions-layout">
					<div>
						<h2>Common questions</h2>
						<p className="questions-contact">
							Still need help?
							<br />
							<a href={`mailto:${site.contact.email}`}>
								Email the CleanOps team
							</a>
							.
						</p>
					</div>
					<Faq items={homeFaq} />
				</div>
			</section>
			<div className="marketing-container help-legal-links">
				<a href="/privacy">Privacy policy</a>
				<a href="/terms">Terms of service</a>
			</div>
		</>
	);
}
