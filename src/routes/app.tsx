import { createFileRoute } from "@tanstack/react-router";
import { PhoneShot } from "#/components/screens";
import { photos } from "#/content/photos";
import { screens } from "#/content/screens";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

// For cleaners who were invited: download the app, sign in from the invitation. Not a sales page.
export const Route = createFileRoute("/app")({
	head: () => {
		const head = pageHead(
			"/app",
			"The CleanOps field app — for iPhone and Android",
			"Your jobs, checklists, photos and hours on your phone. Works without signal. Free for cleaners invited by their company.",
		);
		return {
			...head,
			// Safari's Smart App Banner needs the real App Store id; skip it while the id is still the placeholder.
			meta:
				site.stores.live && !/^0+$/.test(site.stores.appStoreId)
					? [
							...head.meta,
							{
								name: "apple-itunes-app",
								content: `app-id=${site.stores.appStoreId}`,
							},
						]
					: head.meta,
		};
	},
	component: FieldAppPage,
});

// The stores' own badges, unaltered: Apple's from developer.apple.com, Google's from play.google.com. Google's PNG
// carries its required clear space (41px of 250 on each side), so it is drawn taller inside a 48px box that hides
// the top and bottom padding; its visible badge matches Apple’s height and its side padding stays as clear space.
function StoreBadges() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<a href={site.stores.appStore} data-cta="app-store" className="block">
				<img
					src="/badges/app-store-black.svg"
					alt="Download on the App Store"
					width={120}
					height={40}
					className="block h-12 w-auto"
				/>
			</a>
			<a
				href={site.stores.playStore}
				data-cta="play-store"
				className="block h-12 overflow-hidden"
			>
				<img
					src="/badges/google-play.png"
					alt="Get it on Google Play"
					width={646}
					height={250}
					className="-mt-[11.7px] block h-[71.4px] w-auto max-w-none"
				/>
			</a>
		</div>
	);
}

function FieldAppPage() {
	const features = [
		["Today", "The job you are on and what is next."],
		["Schedule", "See two weeks ahead and confirm or decline jobs."],
		[
			"Checklists & photos",
			"Complete the checklist and record the required photos.",
		],
		["Hours", "Record your work and travel time for the office to review."],
		["Offline access", "Work is saved on your phone and sent when connected."],
		[
			"Your own work",
			"Customer prices and other people’s hours are not shown.",
		],
	];
	return (
		<>
			<section className="page-intro download-intro marketing-container">
				<div>
					<p className="section-label">iPhone & Android</p>
					<h1>The CleanOps field app.</h1>
					<p>
						Your jobs, checklists, photos and hours on your phone. Free for
						cleaners invited by their company.
					</p>
					<div className="download-options">
						<StoreBadges />
					</div>
					{!site.stores.live && (
						<p className="download-availability">
							Coming soon to the App Store and Google Play.
						</p>
					)}
					<p className="download-office-note">
						Office staff? <a href={site.app.signIn}>Sign in on the web</a>.
					</p>
				</div>
				<div className="download-preview">
					<PhoneShot {...screens.fieldToday} priority />
					<PhoneShot {...screens.fieldChecklist} priority />
				</div>
			</section>
			<section className="setup-section">
				<div className="marketing-container setup-layout">
					<h2>Getting started</h2>
					<ol>
						<li>
							<span>1</span>
							<div>
								<h3>Get your invitation</h3>
								<p>
									Your company adds you in CleanOps and sends an email
									invitation.
								</p>
							</div>
						</li>
						<li>
							<span>2</span>
							<div>
								<h3>Install the app</h3>
								<p>Download CleanOps from your phone’s app store.</p>
							</div>
						</li>
						<li>
							<span>3</span>
							<div>
								<h3>Open the invitation link</h3>
								<p>Set a password, then sign in to see your assigned jobs.</p>
							</div>
						</li>
					</ol>
				</div>
			</section>
			<section className="site-section">
				<div className="marketing-container app-details-layout">
					<div>
						<h2>What’s in the app</h2>
						<dl className="app-features">
							{features.map(([title, text]) => (
								<div key={title}>
									<dt>{title}</dt>
									<dd>{text}</dd>
								</div>
							))}
						</dl>
						<p className="location-note">
							Location is shared only while you work, only if your company turns
							it on, and never sets your hours.
						</p>
					</div>
					<figure className="app-work-photo">
						<img
							src={photos.basementChecklist.src}
							alt={photos.basementChecklist.alt}
							width={photos.basementChecklist.width}
							height={photos.basementChecklist.height}
							loading="lazy"
							decoding="async"
						/>
						<figcaption>
							The app keeps working without a signal. Your records sync when you
							reconnect.
						</figcaption>
					</figure>
				</div>
			</section>
		</>
	);
}
