import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "#/components/legal";
import { money, plans, storageOveragePerGb, trialPlan } from "#/content/plans";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

// The terms a company accepts at "Start a trial" (cleanops-web register page links here; the accepted version is stored
// in organization.terms_version, set from Settings.business.terms_version in the backend — bump that when these change).
// Billing and retention mirror services/subscriptions/lifecycle.py and app/core/configuration/business.py.
// A business-to-business contract: the Consumer Guarantees Act and parts of the Fair Trading Act are contracted out of
// as sections 43 and 5D allow. Have a New Zealand lawyer review before launch (site.legalReviewed).
export const Route = createFileRoute("/terms")({
	head: () =>
		pageHead(
			"/terms",
			"Terms of service — CleanOps",
			"The agreement between a company that uses CleanOps and ByteTech, the company that provides it.",
		),
	component: Terms,
});

function Terms() {
	const { legalName, city, nzbn } = site.company;
	const email = site.contact.email;
	return (
		<LegalPage title="Terms of service">
			<p>
				These terms are an agreement between {legalName} (“we”, “us”) and the
				business that signs up for CleanOps (“you”). By starting a trial,
				choosing a plan or using CleanOps, you accept these terms on behalf of
				that business, and you confirm you have authority to do so.
			</p>

			<h2>1. Business use only</h2>
			<p>
				CleanOps is supplied to businesses for business purposes. You confirm
				you are acquiring it in trade. To the extent the law allows, the
				Consumer Guarantees Act 1993 does not apply (section 43), and sections
				9, 12A, 13 and 14(1) of the Fair Trading Act 1986 do not apply (section
				5D). We both agree that this is fair and reasonable, given we are both
				in trade and you can read these terms and our pricing before you pay.
			</p>

			<h2>2. What CleanOps is, and is not</h2>
			<p>
				CleanOps is software for running a cleaning business: clients, quotes,
				jobs, scheduling, the field app, checklists, photos, hours and invoices.
				It is a tool. It does not provide accounting, tax, payroll, legal or
				employment advice, and it is not a payment processor.
			</p>
			<p>You remain responsible for your business, including:</p>
			<ul>
				<li>
					the accuracy of everything you enter, and of quotes, invoices and
					reports before you send them;
				</li>
				<li>
					your GST, tax returns and invoices meeting Inland Revenue’s
					requirements;
				</li>
				<li>
					paying your staff and contractors correctly, including holiday pay,
					under the Holidays Act and employment law;
				</li>
				<li>
					your obligations under the Health and Safety at Work Act, and for the
					conduct of your staff on your clients’ premises;
				</li>
				<li>
					checking the result of anything sent to or received from Xero or other
					connected services.
				</li>
			</ul>

			<h2>3. Your account and your users</h2>
			<ul>
				<li>
					You are responsible for everyone you invite, and for anything done
					using your account. Keep sign-in details secret and tell us at once if
					you suspect misuse.
				</li>
				<li>Office staff must use two-step sign-in. Do not share logins.</li>
				<li>
					You must be able to receive email at the address on your account;
					notices to that address count as received.
				</li>
			</ul>

			<h2>4. Trial</h2>
			<p>
				You can try CleanOps free for {site.trialDays} days with the features of
				the {trialPlan.name} plan. No card is needed. A trial is provided as is,
				without any commitment from us, and we may change or end trials at any
				time. If you do not choose a plan by the end of the trial, the account
				becomes read-only for 30 days and is then deleted.
			</p>

			<h2>5. Plans, fees and payment</h2>
			<ul>
				<li>
					Plans start at {money(plans[0].monthly)} a month. Prices are in New
					Zealand dollars and exclude GST, which is added. Current prices are on
					our <a href="/pricing">pricing page</a>.
				</li>
				<li>
					Fees are billed in advance, monthly or yearly, to the card you
					provide, and you authorise us (through Stripe) to charge it. A yearly
					plan is charged at ten months’ fees.
				</li>
				<li>
					A <strong>field seat</strong> is each active field staff member,
					contractors included, and each invitation not yet accepted. Seats
					above your plan’s allowance are charged at your plan’s extra-seat
					rate, pro rata from the day they are added. Removing a seat does not
					give a refund for the current period.
				</li>
				<li>
					Storage above your plan’s allowance is charged at{" "}
					{money(storageOveragePerGb)} per GB a month, rounded up to the next
					whole GB. We never block photos from the field because of storage.
				</li>
				<li>
					Extra seats and storage are charged monthly in arrears, including on
					yearly plans.
				</li>
				<li>
					We may change our prices by giving you at least 30 days’ notice. A new
					price applies from your next billing period after the notice ends. If
					you do not want it, you may cancel before then.
				</li>
				<li>
					<strong>Fees are not refundable</strong>, including for partly used
					periods, unused seats, downgrades or cancellation, except where these
					terms say otherwise or the law requires.
				</li>
			</ul>

			<h2>6. If payment fails</h2>
			<p>
				If a payment fails, we will tell you and try again. If it is still
				unpaid after 7 days, your account becomes read-only for a further 14
				days, and then the subscription ends. Paying what is owed during that
				time restores it. After a paid plan ends, the account stays read-only
				for 90 days so you can export your data, and is then deleted. Amounts
				you owe remain payable, and we may recover reasonable costs of
				collecting them.
			</p>

			<h2>7. Your data</h2>
			<ul>
				<li>
					<strong>Your data stays yours.</strong> “Your data” means what you and
					your users put into CleanOps. You can export it at any time, including
					while the account is read-only.
				</li>
				<li>
					You give us a licence to host, copy, process, transmit and display
					your data as needed to provide, secure and support CleanOps, and to
					comply with the law.
				</li>
				<li>
					We may use information about how CleanOps is used, aggregated or
					de-identified so that neither you nor any person can be identified, to
					run, improve and develop our services. That information belongs to us.
				</li>
				<li>
					You are responsible for having the right to put your data into
					CleanOps, including telling your staff and clients how their
					information is used, and obtaining any consent needed — for example
					before turning on location sharing or photographing a client’s
					property.
				</li>
				<li>
					We take reasonable care of your data and take backups, but you are
					responsible for keeping your own copies of anything you cannot afford
					to lose. Use the export.
				</li>
				<li>
					Our <a href="/privacy">privacy policy</a> explains how personal
					information is handled. For personal information in your data, you are
					the responsible agency and we hold it on your behalf.
				</li>
			</ul>

			<h2>8. Acceptable use</h2>
			<p>You must not, and must not let anyone else:</p>
			<ul>
				<li>
					use CleanOps for anything unlawful, deceptive or harmful, or to send
					unsolicited messages;
				</li>
				<li>
					try to access another company’s data, or test, probe or overload the
					service;
				</li>
				<li>
					copy, resell, rent or reverse engineer CleanOps, or use it to build a
					competing product;
				</li>
				<li>upload malicious code, or content you have no right to use.</li>
			</ul>

			<h2>9. Suspension</h2>
			<p>
				We may suspend all or part of your access, without liability, if you do
				not pay, if you breach these terms, if your use puts the service, other
				customers or anyone else at risk, or if the law requires it. Where it is
				reasonable to, we will tell you first and give you a chance to fix the
				problem.
			</p>

			<h2>10. Our intellectual property</h2>
			<p>
				CleanOps, including its software, design, content and trade marks,
				belongs to us and our licensors. These terms give you a right to use
				CleanOps while your subscription is active; they do not transfer any
				ownership. If you send us ideas or feedback, we may use them freely
				without any obligation to you.
			</p>

			<h2>11. Other services</h2>
			<p>
				CleanOps works with services we do not control, such as Xero, Stripe,
				app stores, email and mobile networks. Your use of them is governed by
				their own terms. We are not responsible for them, for their availability
				or changes, or for data once it has left CleanOps for them.
			</p>

			<h2>12. Availability and changes</h2>
			<p>
				We work to keep CleanOps available, but we do not promise it will be
				uninterrupted or error-free, and there may be planned maintenance. We
				may change, add or remove features. If we remove a feature that is a
				material part of your plan, we will give you reasonable notice and you
				may cancel and receive a refund of fees prepaid for the period after the
				change.
			</p>

			<h2>13. Disclaimer</h2>
			<p>
				To the extent the law allows, CleanOps is provided “as is” and “as
				available”. We give no warranty that it will meet your needs, and
				exclude all warranties, conditions and guarantees not set out in these
				terms, including any about fitness for a particular purpose or results.
			</p>

			<h2>14. Limits on our liability</h2>
			<ul>
				<li>
					We are not liable for any loss of profit, revenue, business, goodwill
					or data, or for any indirect or consequential loss, however it arises.
				</li>
				<li>
					We are not liable for losses arising from your data or instructions,
					from your staff or contractors, from your clients, from services we do
					not control, or from events outside our reasonable control.
				</li>
				<li>
					Our total liability under or in connection with these terms, in
					contract, tort (including negligence) or otherwise, is limited to the
					fees you paid us in the three months before the event giving rise to
					the claim. For a trial, it is limited to NZ$100.
				</li>
				<li>
					Nothing in these terms limits liability that cannot be limited by law,
					including for our fraud.
				</li>
			</ul>

			<h2>15. Your responsibility to us</h2>
			<p>
				You will indemnify us against any claim, loss, cost (including
				reasonable legal costs) or penalty arising from your data, your use of
				CleanOps in breach of these terms or the law, or any dispute between you
				and your staff, contractors or clients.
			</p>

			<h2>16. Cancelling and ending the agreement</h2>
			<ul>
				<li>
					You can cancel your plan at any time in settings. It ends at the close
					of the current billing period, with no refund for the remainder. You
					can also close your account; sign-in stops at once and your data is
					deleted 30 days later.
				</li>
				<li>
					We may end this agreement for convenience by giving you 30 days’
					notice, and will refund fees you have prepaid for any period after it
					ends.
				</li>
				<li>
					We may end it at once if you seriously or repeatedly breach these
					terms, do not pay, or become insolvent.
				</li>
				<li>
					When the agreement ends, your access stops and your data is kept
					read-only and then deleted as set out above and in our privacy policy.
					Export it before then. Sections 5 to 7 and 10 to 19 survive the end of
					the agreement.
				</li>
			</ul>

			<h2>17. Changes to these terms</h2>
			<p>
				We may change these terms. We will give at least 30 days’ notice of a
				change that is materially adverse to you, by email or in the app. If you
				keep using CleanOps after the change takes effect, you accept the new
				terms; if you do not, you may cancel before then. Each version is dated,
				and we record which version your business accepted.
			</p>

			<h2>18. Disputes</h2>
			<p>
				If a dispute arises, tell us in writing and we will both try in good
				faith to resolve it for 20 working days before either of us starts
				proceedings, except for urgent relief or to recover unpaid fees.
			</p>

			<h2>19. General</h2>
			<ul>
				<li>
					These terms, our pricing and our privacy policy are the whole
					agreement between us about CleanOps.
				</li>
				<li>
					You may not transfer this agreement without our written consent. We
					may transfer it to a buyer of our business or of CleanOps.
				</li>
				<li>
					Neither of us is liable for delay or failure caused by events beyond
					our reasonable control (other than paying fees).
				</li>
				<li>
					If any part of these terms is unenforceable, the rest still applies.
					Not enforcing a right now does not waive it.
				</li>
				<li>
					New Zealand law governs these terms, and the New Zealand courts have
					exclusive jurisdiction. The Contract and Commercial Law Act 2017
					applies; nobody other than you and us may enforce these terms.
				</li>
			</ul>

			<h2>20. Contact</h2>
			<p>
				{legalName}, {city}, New Zealand.
				{/^\d{13}$/.test(nzbn) && ` NZBN ${nzbn}.`} Email{" "}
				<a href={`mailto:${email}`}>{email}</a>.
			</p>
		</LegalPage>
	);
}
