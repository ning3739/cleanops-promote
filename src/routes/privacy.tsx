import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "#/components/legal";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

// Written from what the backend actually does: retention from app/core/configuration/business.py, deletion from
// services/purge.py and services/account_closure.py, location from services/gps.py, providers from the integrations.
// Change the product first, then this page. Linked from the field app, sign-in and the store listings.
export const Route = createFileRoute("/privacy")({
	head: () =>
		pageHead(
			"/privacy",
			"Privacy policy — CleanOps",
			"What CleanOps collects, why, who it is shared with, how long it is kept and how to get it corrected or removed.",
		),
	component: Privacy,
});

function Privacy() {
	const { legalName, city } = site.company;
	const email = site.contact.email;
	return (
		<LegalPage title="Privacy policy">
			<p>
				This policy explains how {legalName} (“we”, “us”), the company behind
				CleanOps, handles personal information. It applies to the CleanOps
				website, the office web app, the CleanOps field app, the customer portal
				and the emails the service sends. We follow the Privacy Act 2020 and its
				Information Privacy Principles.
			</p>

			<h2>1. Two roles: the cleaning company and us</h2>
			<p>
				CleanOps is used by cleaning companies (“customers”) to run their work.
				The information a customer puts into CleanOps about its own clients,
				properties and staff is held by us{" "}
				<strong>on that customer’s behalf</strong>. Under section 11 of the
				Privacy Act, the customer remains the agency responsible for that
				information and decides what is collected and why. We only use it to
				provide CleanOps to that customer.
			</p>
			<p>
				If you are a cleaner employed by, or a client of, a cleaning company
				that uses CleanOps, please contact that company first about your
				information. You can also contact us and we will pass your request on or
				help where we can.
			</p>
			<p>
				We are directly responsible for the information we collect for our own
				purposes: account and sign-in details, billing for the CleanOps
				subscription, support conversations, and how the website and service are
				used.
			</p>

			<h2>2. What we collect</h2>
			<ul>
				<li>
					<strong>Account details:</strong> name, email address, phone number, a
					hashed password (never the password itself), and for office staff the
					authenticator used for two-step sign-in.
				</li>
				<li>
					<strong>Company details:</strong> company name, address, GST number,
					and the settings the company chooses.
				</li>
				<li>
					<strong>Work records the company enters or its staff create:</strong>{" "}
					clients and their contacts, properties and access instructions,
					quotes, jobs, schedules, checklists, photos, notes, hours worked,
					invoices, complaints and the history of changes to them.
				</li>
				<li>
					<strong>Location, only if the company turns it on:</strong> while a
					field staff member is clocked on, the field app sends the phone’s
					location. It is never collected outside working time. Location is only
					context; it never changes anyone’s recorded hours.
				</li>
				<li>
					<strong>Device and sign-in information:</strong> the device name, a
					push notification token, sign-in times and the IP address of each
					session, so you can see and end your own sessions.
				</li>
				<li>
					<strong>Technical logs:</strong> requests, errors and timing, used to
					keep the service secure and working.
				</li>
				<li>
					<strong>Subscription billing:</strong> handled by Stripe. We receive
					the plan, payment status and the last four digits and expiry of the
					card. We never receive or store full card numbers.
				</li>
			</ul>

			<h2>3. What we do not collect</h2>
			<p>
				CleanOps does not store employees’ IRD numbers, bank account numbers,
				tax codes, KiwiSaver details, pay rates or employment contracts. Those
				stay in the company’s payroll system. We do not take card payments from
				cleaning companies’ clients; invoice payments go through the company’s
				own accounting system. We do not sell personal information, and we do
				not use it for advertising.
			</p>

			<h2>4. Why we use it</h2>
			<ul>
				<li>
					To provide, secure and support CleanOps, including sending the emails
					and notifications it needs to send.
				</li>
				<li>To bill for the subscription and enforce our terms of service.</li>
				<li>
					To find and fix faults, prevent misuse and keep accounts secure.
				</li>
				<li>
					To improve CleanOps, using information that has been aggregated or
					de-identified so that no person or company can be identified from it.
				</li>
				<li>
					To meet our legal obligations, including tax and record-keeping.
				</li>
			</ul>

			<h2>5. Who can see what</h2>
			<ul>
				<li>
					<strong>Within a company:</strong> office staff see what their role
					allows. Field staff see their own jobs, schedule and hours — not
					prices, invoices or other people’s hours.
				</li>
				<li>
					<strong>Door and alarm codes</strong> are encrypted and shown only to
					staff assigned to that property around the day of the job. Every view
					is recorded. Codes never appear in emails, PDFs, the customer portal
					or logs.
				</li>
				<li>
					<strong>The company’s clients</strong> see only their own visits,
					completion reports, photos the company has not marked internal, and
					invoices, through a link that expires. They never see door codes,
					staff costs, internal notes or location.
				</li>
				<li>
					<strong>Our staff</strong> access a company’s account only to provide
					support, investigate a fault or misuse, or when the law requires it.
					That access is logged.
				</li>
			</ul>

			<h2>6. Service providers and where information is stored</h2>
			<p>
				We use the following providers to run CleanOps. Each receives only what
				it needs for its job and is bound by obligations to protect it. Some are
				outside New Zealand; where information leaves New Zealand we rely on
				providers that are subject to comparable privacy safeguards.
			</p>
			<ul>
				<li>
					<strong>Amazon Web Services</strong> (Sydney, Australia): hosting, the
					database and stored files such as photos and PDFs.
				</li>
				<li>
					<strong>Cloudflare</strong> (global network): delivers the website and
					web app and protects them from attack.
				</li>
				<li>
					<strong>Postmark</strong> (United States): sends quotes, invoices,
					reminders, completion reports and account emails.
				</li>
				<li>
					<strong>Stripe</strong> (global): takes payment for CleanOps
					subscriptions.
				</li>
				<li>
					<strong>Expo</strong>, <strong>Apple</strong> and{" "}
					<strong>Google</strong>: deliver push notifications to the field app.
				</li>
				<li>
					<strong>MapTiler</strong> (Switzerland): address suggestions and maps.
					Addresses typed into address fields are sent to look up matches.
				</li>
				<li>
					<strong>Xero</strong>, only if a company connects it: client contacts,
					invoices, payments and, where chosen, payroll timesheets are exchanged
					with the company’s own Xero organisation.
				</li>
			</ul>
			<p>
				We may also disclose information if the law requires it, to protect
				people from serious harm, or to a buyer of our business, who would be
				bound by this policy.
			</p>

			<h2>7. How long we keep it</h2>
			<ul>
				<li>
					While a company’s account is open, its records are kept so the company
					can use them.
				</li>
				<li>
					Location history is kept for 30 or 90 days, as the company chooses,
					then deleted automatically.
				</li>
				<li>
					If a trial ends without a plan, the account becomes read-only for 30
					days. If a paid plan ends, it becomes read-only for 90 days. We email
					the company before anything is deleted, and then delete its records
					and files.
				</li>
				<li>
					If an owner closes the company’s account, sign-in stops at once and
					everything is deleted 30 days later. During those 30 days the closure
					can be reversed by contacting us.
				</li>
				<li>
					A sign-up whose email address is never confirmed is deleted after 7
					days.
				</li>
				<li>
					Notifications are kept for 180 days, ended sign-in sessions for 30
					days, and technical logs only as long as we need them to run the
					service.
				</li>
				<li>
					Backups are kept for a limited period and expire on their own; deleted
					information disappears from them when they do.
				</li>
				<li>
					We keep subscription billing records for as long as New Zealand tax
					law requires (generally seven years).
				</li>
			</ul>

			<h2>8. Security</h2>
			<p>
				Passwords are hashed. Office staff use two-step sign-in. Connections are
				encrypted, sensitive fields such as door codes and accounting
				connections are encrypted at rest, and each company’s information is
				kept separate from every other company’s. Backups are taken daily and
				restores are tested. No system is perfectly secure, but if a privacy
				breach is likely to cause serious harm, we will notify the people
				affected and the Privacy Commissioner as the law requires, and we will
				tell the affected company promptly.
			</p>

			<h2>9. Your rights</h2>
			<p>
				You can ask to see the personal information we hold about you and ask us
				to correct it. You can delete your own account from your account
				settings: your name, email, phone, password and authenticator are
				erased, and the companies you worked for keep their business records
				without your name attached. The owner of a company that is still open
				must hand it over or close it first.
			</p>
			<p>
				Requests about information a company holds about you (for example your
				timesheets) are best made to that company; we will help it respond. We
				may need to confirm who you are before acting on a request, and we will
				respond within 20 working days.
			</p>
			<p>
				If you are not satisfied with our response, you can complain to the
				Office of the Privacy Commissioner at{" "}
				<a href="https://www.privacy.org.nz">privacy.org.nz</a>.
			</p>

			<h2>10. Cookies and the website</h2>
			<p>
				The CleanOps app uses essential cookies to keep you signed in and to
				protect against forged requests. The marketing website uses no
				advertising or tracking cookies. If you choose a light or dark theme,
				that choice is stored in your own browser.
			</p>

			<h2>11. Changes to this policy</h2>
			<p>
				We may update this policy as CleanOps changes. The date at the top shows
				the latest version. If a change is significant, we will tell account
				owners by email or in the app before it takes effect.
			</p>

			<h2>12. Contact</h2>
			<p>
				Privacy officer, {legalName}, {city}, New Zealand. Email{" "}
				<a href={`mailto:${email}`}>{email}</a>.
			</p>
		</LegalPage>
	);
}
