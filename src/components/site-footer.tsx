import { site } from "#/site";
import { Logo } from "./logo";

export function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="marketing-container footer-main">
				<div className="footer-about">
					<a href="/" aria-label="CleanOps home">
						<Logo />
					</a>
					<p>Job management for New Zealand cleaning companies.</p>
					<a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
				</div>
				<nav aria-label="Footer product links">
					<h2>CleanOps</h2>
					<a href="/product">Product</a>
					<a href="/pricing">Pricing</a>
					<a href="/app">Field app</a>
					<a href="/help">Help & contact</a>
				</nav>
				<nav aria-label="Footer account and legal links">
					<h2>Account & information</h2>
					<a href={site.app.signIn}>Sign in</a>
					<a href={site.app.register}>Start free trial</a>
					<a href="/privacy">Privacy policy</a>
					<a href="/terms">Terms of service</a>
				</nav>
			</div>
			<div className="marketing-container footer-bottom">
				<p>
					Made by {site.company.name} in {site.company.city}, New Zealand.
					{/^\d{13}$/.test(site.company.nzbn) && ` NZBN ${site.company.nzbn}.`}
				</p>
				<p>CleanOps</p>
			</div>
		</footer>
	);
}
