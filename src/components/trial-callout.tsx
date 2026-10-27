import { photos } from "#/content/photos";
import { site } from "#/site";
import { ButtonLink } from "./button";

export function TrialCallout() {
	return (
		<section className="trial-callout">
			{/* Behind the copy on wide screens (mirrored so the owner stands on the right); above it on phones. */}
			<img
				src={photos.ownerSchedule.src}
				alt=""
				width={photos.ownerSchedule.width}
				height={photos.ownerSchedule.height}
				loading="lazy"
				decoding="async"
				className="trial-callout-photo"
			/>
			<div className="marketing-container trial-callout-inner">
				<div>
					<h2>Try CleanOps with your own jobs.</h2>
					<p>{site.trialDays} days on Pro. No credit card required.</p>
				</div>
				<div>
					<ButtonLink href={site.app.register} size="lg" data-cta="closing">
						Start free trial
					</ButtonLink>
					<a href={`mailto:${site.contact.email}`}>Or ask us a question</a>
				</div>
			</div>
		</section>
	);
}
