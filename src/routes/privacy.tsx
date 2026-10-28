import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "#/components/legal";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

// Written from what the backend actually does: retention from app/core/configuration/business.py, deletion from
// services/purge.py and services/account_closure.py, location from services/gps.py (and the field app's
// shared/location/tracking.ts), providers from the integrations and deployment/aws/terraform. Change the product first,
// then this page. Linked from the field app, sign-in and the store listings.
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
				CleanOps, handles personal information. It covers the CleanOps website,
				the office web app, the CleanOps field app, the customer portal and the
				emails the service sends. We follow the Privacy Act 2020 and its
				Information Privacy Principles (IPPs). This policy is also our notice
				under IPP 3 and IPP 3A of the information we collect, including
				information we receive from someone other than you.
			</p>

			<h2>1. Two roles: the cleaning company and us</h2>
			<p>
				CleanOps is used by cleaning companies (“customers”) to run their work.
				The information a customer, its staff and its clients put into CleanOps
				(“customer data”) is held by us <strong>as the customer’s agent</strong>
				, for the purposes of section 11 of the Privacy Act. The customer is the
				agency responsible for that information. It decides what is collected,
				why, who in the company can see it, whether features such as location
				sharing are switched on, and how long it is kept while the account is
				open. We use customer data only to provide CleanOps to that customer and
				as this policy describes, not for our own purposes.
			</p>
			<p>
				Because the customer is responsible for customer data, it is also
				responsible for telling its staff and clients about it, for any consent
				it needs, and for answering their privacy requests. If you work for, or
				are a client of, a cleaning company that uses CleanOps, please contact
				that company first. If you contact us, we will normally pass your
				request to the company and help it to respond.
			</p>
			<p>
				We are the responsible agency only for the information we collect for
				our own purposes: sign-in and security details for user accounts, the
				CleanOps subscription and its billing, support conversations, and how
				the website and service are used.
			</p>

			<h2>2. What we collect</h2>
			<ul>
				<li>
					<strong>Account details:</strong> name, email address, phone number
					and, if you set one, a password. We store only a hash of the password,
					never the password itself. If you use two-step sign-in, we store an
					encrypted authenticator secret and hashed recovery codes. If you sign
					in with an emailed link, the link is single-use and expires after 15
					minutes.
				</li>
				<li>
					<strong>Company memberships:</strong> which companies you belong to,
					your role in each, who invited you and when you joined or left. One
					account can belong to several companies. Each company sees only its
					own information about you.
				</li>
				<li>
					<strong>Company details:</strong> company name, address, GST number,
					the plan, the settings the company chooses, and the version of our
					terms it accepted.
				</li>
				<li>
					<strong>Staff records the company keeps:</strong> name, contact
					details, whether the person is an employee or a contractor, start
					date, office notes, and an optional hourly cost rate the company uses
					to work out job costs. The company also records weekly availability,
					leave and time-off requests (with any reason given), job assignments,
					and hours worked, including breaks, approvals and every change to
					them.
				</li>
				<li>
					<strong>Work records:</strong> clients and their contacts, properties
					and access instructions, quotes, jobs, schedules, checklists, notes,
					invoices, complaints and service requests, and the history of changes
					to them.
				</li>
				<li>
					<strong>Job photos:</strong> photos taken in the field app before,
					during and after a job, with the time taken, who took them and any
					caption. The field app does not attach the camera’s location data to
					the photos it takes.
				</li>
				<li>
					<strong>Location, only when sharing is on:</strong> location sharing
					is a Business-plan feature. It works only if the company switches it
					on and the staff member then turns on sharing in the field app. While
					that person is on duty, the field app sends the phone’s location,
					including when the app is closed or in the background, with its
					accuracy and speed and the device name. Location is never collected
					while the person is off duty. Sharing ends automatically after 4 hours
					without a location, or 16 hours in total. The office sees a live map
					and whether the person has arrived at the job’s property. Location is
					context only; it never changes anyone’s recorded hours. The person can
					turn sharing off in the app at any time.
				</li>
				<li>
					<strong>Device and sign-in information:</strong> device name, app
					version, a push notification token, the type of app used, sign-in
					times, and the IP address and browser details of each session. You can
					see and end your own sessions.
				</li>
				<li>
					<strong>Offline work on the phone:</strong> when there is no signal,
					the field app keeps changes, photos and locations on the phone until
					they can be sent. They are tied to the account and company that made
					them and are removed from the phone once sent.
				</li>
				<li>
					<strong>Activity and technical logs:</strong> an audit record of
					important changes (who did what, when, and from which IP address), the
					emails and notifications sent and whether they were delivered, and
					requests, errors and timing. We use these to keep the service secure
					and working.
				</li>
				<li>
					<strong>Subscription billing:</strong> handled by Stripe. We receive
					the plan, the payment status and whether a card is on file. Card
					details stay with Stripe; we never receive or store card numbers.
				</li>
				<li>
					<strong>Support:</strong> what you tell us when you contact us.
				</li>
			</ul>
			<p>
				Some of this information is needed to use CleanOps. Without an email
				address you cannot have an account. Without location permission,
				location sharing will not work, but the rest of the field app still
				does.
			</p>

			<h2>3. Information we get from others</h2>
			<p>
				Much of the information in CleanOps does not come from the person it is
				about. We receive it in these ways:
			</p>
			<ul>
				<li>
					<strong>From the cleaning company:</strong> its office staff enter
					staff, client and property details, invite staff by email, and record
					hours, leave and notes. We hold this as the company’s agent, and the
					company is responsible for telling those people about it (section 1).
				</li>
				<li>
					<strong>From other users at the same company:</strong> for example a
					manager approving your hours or assigning you a job.
				</li>
				<li>
					<strong>From Xero</strong>, if the company connects it: client
					contacts, invoice and payment status and, if used, payroll calendars,
					employees and earnings rates, so timesheets can be matched.
				</li>
				<li>
					<strong>From Stripe:</strong> the billing details listed in section 2.
				</li>
				<li>
					<strong>From MapTiler:</strong> matching addresses and map positions
					for addresses typed into CleanOps.
				</li>
			</ul>
			<p>
				We may rely on the exceptions in IPP 3A, for example where the company
				that gave us the information has already told you about it, or where
				telling you separately is not reasonably practicable.
			</p>

			<h2>4. What we do not collect</h2>
			<p>
				CleanOps does not store employees’ IRD numbers, bank account numbers,
				tax codes, KiwiSaver details or employment contracts. Those stay in the
				company’s payroll system. We do not take card payments from cleaning
				companies’ clients; invoice payments go through the company’s own
				accounting system. We do not sell personal information, and we do not
				use it for advertising or to build advertising profiles. CleanOps is for
				businesses and their staff and is not intended for children under 16.
			</p>

			<h2>5. Why we use it</h2>
			<ul>
				<li>
					To provide, secure, maintain and support CleanOps, including sending
					the emails and notifications it needs to send.
				</li>
				<li>
					To bill for the subscription and to enforce our terms of service.
				</li>
				<li>
					To find and fix faults, prevent fraud and misuse, and keep accounts
					secure.
				</li>
				<li>
					To analyse, improve and develop CleanOps and our other services, using
					information about how the service is used, or information that has
					been aggregated or de-identified so that no person or company can be
					identified from it. Information in that form is not personal
					information, and we may keep and use it after an account is deleted.
				</li>
				<li>
					To tell account owners and administrators about changes to CleanOps,
					its pricing or our terms and policies.
				</li>
				<li>
					To meet our legal obligations, including tax and record-keeping, and
					to establish, exercise or defend legal claims.
				</li>
			</ul>

			<h2>6. Who can see what</h2>
			<ul>
				<li>
					<strong>Within a company:</strong> office staff see what their role
					allows. Field staff see their own jobs, schedule, hours and location
					history — not prices, invoices or other people’s hours. Office staff
					with permission to see location see the live map and staff location
					history.
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
					support, investigate a fault, security issue or misuse, or when the
					law requires it. That access is logged.
				</li>
			</ul>

			<h2>7. Service providers and where information is stored</h2>
			<p>
				We use the providers below to run CleanOps. They store or process
				information on our behalf, or on the customer’s, and are bound by
				obligations to protect it. Some are outside New Zealand. Where a
				provider holds information only as our agent, that is not a disclosure
				under IPP 12, but we still tell you where it goes. Where we do disclose
				personal information to someone overseas, we do so only as IPP 12
				allows, for example because they are subject to comparable safeguards or
				are bound by contract to protect it in a way comparable to the Privacy
				Act.
			</p>
			<ul>
				<li>
					<strong>Amazon Web Services</strong> (Sydney, Australia): hosting, the
					database, backups, and stored files such as photos, PDFs and exports.
				</li>
				<li>
					<strong>Cloudflare</strong> (global network): delivers the website and
					web app and protects them from attack.
				</li>
				<li>
					<strong>Postmark</strong> (United States): sends sign-in links,
					invitations, quotes, invoices, reminders, completion reports and other
					account emails.
				</li>
				<li>
					<strong>Stripe</strong> (global, including the United States): takes
					payment for CleanOps subscriptions.
				</li>
				<li>
					<strong>Expo</strong> (United States), <strong>Apple</strong> and{" "}
					<strong>Google Firebase</strong>: deliver push notifications to the
					field app. They receive the device token and the text of the
					notification.
				</li>
				<li>
					<strong>MapTiler</strong> (Switzerland): address suggestions and maps.
					Addresses typed into address fields are sent to look up matches.
				</li>
				<li>
					<strong>Google Fonts</strong> (United States): the office web app
					loads its typefaces from Google, which receives your IP address and
					browser details.
				</li>
				<li>
					<strong>Xero</strong>, only if a company connects it: client contacts,
					invoices, payments and, where chosen, payroll timesheets are exchanged
					with the company’s own Xero organisation, at the company’s direction
					and under Xero’s own terms.
				</li>
			</ul>
			<p>
				We may also disclose information where the law requires or allows it,
				including to comply with a court order or a lawful request from a law
				enforcement agency, to prevent or lessen a serious threat to anyone’s
				life, health or safety, to protect our rights or property, or to a
				buyer, investor or successor of our business or of CleanOps, who would
				be bound by this policy.
			</p>

			<h2>8. How long we keep it</h2>
			<ul>
				<li>
					While a company’s account is open, its records are kept so the company
					can use them. The company decides what to delete.
				</li>
				<li>
					Location history can be seen for 30 or 90 days, as the company
					chooses. After that it can no longer be viewed, and it is permanently
					deleted in monthly batches, within about four months of being
					recorded.
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
					When a company’s data is deleted, the account of anyone who belongs to
					no other company is erased too.
				</li>
				<li>
					A sign-up whose email address is never confirmed is deleted after 7
					days.
				</li>
				<li>
					Notifications are kept for 180 days, push delivery records for 90
					days, and ended sign-in sessions for 30 days. Technical logs are kept
					only as long as we need them to run and secure the service.
				</li>
				<li>
					Database backups are kept for 14 days and earlier versions of stored
					files for 90 days. They then expire on their own, and deleted
					information disappears from them when they do. We restore from them
					only to recover the service, never to bring back information that was
					deleted on purpose.
				</li>
				<li>
					We keep our own subscription billing records for as long as New
					Zealand tax law requires (generally seven years), and a record of the
					actions our own staff took in the service.
				</li>
			</ul>

			<h2>9. Security and privacy breaches</h2>
			<p>
				Passwords are hashed. Office staff use two-step sign-in, and sign-in
				links are single-use and short-lived. Connections are encrypted. The
				database and stored files are encrypted at rest, and sensitive fields
				such as door codes and accounting connections are encrypted again. Each
				company’s information is kept separate from every other company’s.
				Backups are taken daily and restores are tested.
			</p>
			<p>
				No system is perfectly secure, and we cannot guarantee that information
				will never be lost or accessed without authority. If a privacy breach is
				likely to cause anyone serious harm:
			</p>
			<ul>
				<li>
					for information we are responsible for, we will notify the Privacy
					Commissioner and the people affected as soon as practicable, as Part 6
					of the Privacy Act requires;
				</li>
				<li>
					for customer data, we will tell the affected company promptly and give
					it the information we reasonably can, so that it can assess the breach
					and notify the Privacy Commissioner and the people affected. We may
					notify them ourselves where the law requires it or the company asks us
					to.
				</li>
			</ul>

			<h2>10. Your rights</h2>
			<p>
				You can ask for the personal information we hold about you and ask us to
				correct it. To delete your account, see{" "}
				<a href="#delete-account">section 11</a>.
			</p>
			<p>
				Requests about information a company holds about you (for example your
				timesheets or location history) should be made to that company; we will
				help it respond. We need to confirm who you are before acting on a
				request. We will respond within 20 working days, or tell you if we need
				longer, as the Privacy Act allows. Where the Privacy Act allows, we may
				charge a reasonable fee for providing information, and we will tell you
				before we do. We may refuse a request on the grounds the Privacy Act
				allows.
			</p>
			<p>
				If you are not satisfied with our response, you can complain to the
				Office of the Privacy Commissioner at{" "}
				<a href="https://www.privacy.org.nz">privacy.org.nz</a>.
			</p>

			{/* Linked as /privacy#delete-account from Google Play's account deletion field and the App Store listing: keep the id. */}
			<h2 id="delete-account" className="scroll-mt-24">
				11. Deleting your CleanOps account
			</h2>
			<p>
				You can delete your CleanOps account at any time. You do not need to
				reinstall the app to do it.
			</p>
			<ul>
				<li>
					<strong>In the CleanOps Field app:</strong> open <em>Me</em>, tap{" "}
					<em>Delete my account</em>, enter your password and type DELETE.
				</li>
				<li>
					<strong>In the web app:</strong> open <em>Account</em> and choose{" "}
					<em>Delete my account</em>.
				</li>
				<li>
					<strong>Without the app:</strong> email{" "}
					<a href={`mailto:${email}?subject=Delete%20my%20CleanOps%20account`}>
						{email}
					</a>{" "}
					from the email address you sign in with, and say you want your account
					deleted. We check that the request comes from you, delete the account
					and confirm by email, within 20 working days.
				</li>
			</ul>
			<p>
				<strong>What is deleted:</strong> your name, email, phone, password,
				authenticator and devices, at once, and you are signed out everywhere.
				They disappear from backups when the backups expire, within 14 days.
			</p>
			<p>
				<strong>What is kept:</strong> the companies you worked for keep their
				business records, for example the jobs you did, the photos and notes you
				added and the hours you worked, with your name replaced by “Deleted
				user”, and they keep their own staff record about you. They keep these
				for as long as their account is open and the law requires (for example
				for pay and tax); they are deleted when the company’s data is deleted
				(section 8). To have that information removed or corrected, ask the
				company.
			</p>
			<p>
				<strong>Company owners:</strong> the owner of a company that is still
				open must first hand it over to another admin (Settings, Members) or
				close it (Settings, Organisation) in the web app, then delete their
				account. You can also leave one company without deleting your account.
			</p>

			<h2>12. Cookies and the website</h2>
			<p>
				The CleanOps web app uses essential cookies to keep you signed in and to
				protect against forged requests. You cannot switch them off and still
				sign in. Our hosting provider may set essential security cookies to
				block attacks. The website and web app use no advertising or tracking
				cookies and no third-party analytics. If you choose a light or dark
				theme, that choice is stored in your own browser. The field app stores
				your sign-in and its offline queue on the phone.
			</p>

			<h2>13. Changes to this policy</h2>
			<p>
				We may update this policy from time to time, for example as CleanOps or
				the law changes. The date at the top shows the version in force. If a
				change significantly affects how we handle personal information, we will
				tell account owners by email or in the app before it takes effect.
			</p>

			<h2>14. Contact</h2>
			<p>
				Privacy officer, {legalName}, {city}, New Zealand. Email{" "}
				<a href={`mailto:${email}`}>{email}</a>.
			</p>
		</LegalPage>
	);
}
