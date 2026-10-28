import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "#/components/legal";
import { money, plans, storageOveragePerGb, trialPlan } from "#/content/plans";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

// The terms a company accepts at "Start a trial" (cleanops-web register page links here; the accepted version is stored
// in organization.terms_version, set from Settings.business.terms_version in the backend — bump that when these change).
// Billing and retention mirror services/subscriptions/lifecycle.py and app/core/configuration/business.py.
// A business-to-business contract: the Consumer Guarantees Act and parts of the Fair Trading Act are contracted out of
// as sections 43 and 5D allow. As a standard form small trade contract it is also subject to the Fair Trading Act's
// unfair contract terms rules (section 26A), so each operator-favouring clause is tied to a legitimate interest and,
// where it changes the deal, to notice and a right to leave. Have a New Zealand lawyer review before launch
// (site.legalReviewed).
export const Route = createFileRoute("/terms")({
	head: () =>
		pageHead(
			"/terms",
			"Terms of service — CleanOps",
			`The agreement between a company that uses CleanOps and ${site.company.legalName}, the company that provides it.`,
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
				that business, and you confirm that you have authority to bind it. You
				agree that accepting these terms electronically is as binding as signing
				them on paper.
			</p>

			<h2>1. Business use only</h2>
			<p>
				CleanOps is supplied to businesses for business purposes. You confirm
				that you are acquiring it in trade and not as a consumer. To the extent
				the law allows, the Consumer Guarantees Act 1993 does not apply (section
				43), and sections 9, 12A, 13 and 14(1) of the Fair Trading Act 1986 do
				not apply (section 5D). We both agree that this is fair and reasonable:
				we are both in trade, CleanOps is a standard product sold at a published
				price, and you can read these terms, our pricing and our privacy policy,
				and try CleanOps free, before you pay.
			</p>

			<h2>2. What CleanOps is, and is not</h2>
			<p>
				CleanOps is software for running a cleaning business: clients, quotes,
				jobs, scheduling, the field app, checklists, photos, location sharing,
				hours and invoices. It is a tool. It does not provide accounting, tax,
				payroll, legal, health and safety or employment advice, it is not a
				payment processor, and it does not make decisions for you.
			</p>
			<p>You remain responsible for your business, including:</p>
			<ul>
				<li>
					the accuracy of everything you enter, and of quotes, invoices, reports
					and timesheets before you send or rely on them;
				</li>
				<li>
					your GST, tax returns and invoices meeting Inland Revenue’s
					requirements;
				</li>
				<li>
					paying your staff and contractors correctly, including holiday pay,
					under the Holidays Act, the Minimum Wage Act and employment law, and
					keeping the wage and time and holiday records the law requires;
				</li>
				<li>
					how you manage your staff, including any decision you make using
					hours, availability, leave or location shown in CleanOps;
				</li>
				<li>
					your obligations under the Health and Safety at Work Act, and the
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
					“Users” are the people you invite to CleanOps, including office and
					field staff and contractors. You are responsible for your users, for
					their compliance with these terms, and for anything done using your
					account. Keep sign-in details secret and tell us at once if you
					suspect misuse.
				</li>
				<li>
					Office staff must use two-step sign-in. Do not share logins. Remove
					access promptly when someone leaves.
				</li>
				<li>
					A user’s access to your company comes through you. We may end or
					restrict a user’s access where these terms allow us to suspend you, or
					where that user breaches them.
				</li>
				<li>
					You must be able to receive email at the address on your account;
					notices to that address count as received when sent.
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
					You must pay all fees in full, without set-off, counterclaim or
					deduction, except a deduction the law requires.
				</li>
				<li>
					We may change our prices by giving you at least 30 days’ notice. A new
					price applies from your next billing period after the notice ends. If
					you do not want it, you may cancel before then.
				</li>
				<li>
					<strong>Fees are not refundable</strong>, including for partly used
					periods, unused seats, downgrades, suspension for your breach, or
					cancellation, except where these terms say otherwise or the law
					requires.
				</li>
			</ul>

			<h2>6. If payment fails</h2>
			<p>
				If a payment fails, we will tell you and try again. If it is still
				unpaid after 7 days, your account becomes read-only for a further 14
				days, and then the subscription ends. Paying what is owed during that
				time restores it. After a paid plan ends, the account stays read-only
				for 90 days so you can export your data, and is then deleted. Amounts
				you owe remain payable, and you must pay our reasonable costs of
				collecting them, including debt collection and legal costs.
			</p>

			<h2>7. Your data</h2>
			<ul>
				<li>
					<strong>Your data stays yours.</strong> “Your data” means what you and
					your users put into CleanOps. You can export it at any time, including
					while the account is read-only.
				</li>
				<li>
					You give us a non-exclusive, royalty-free licence to host, copy,
					process, transmit and display your data as needed to provide, secure
					and support CleanOps, and to comply with the law. Our service
					providers may do the same on our behalf.
				</li>
				<li>
					We may collect information about how CleanOps is used, and may
					aggregate or de-identify your data so that neither you nor any person
					can be identified. We may use that information, during and after this
					agreement, to run, improve and develop our services, and it belongs to
					us.
				</li>
				<li>
					We take reasonable care of your data and take backups, but you are
					responsible for keeping your own copies of anything you cannot afford
					to lose. Use the export. We are not obliged to keep or return your
					data after the retention periods in these terms and our privacy
					policy.
				</li>
			</ul>

			<h2>8. Personal information</h2>
			<ul>
				<li>
					For personal information in your data, including about your staff,
					contractors and clients,{" "}
					<strong>you are the agency responsible</strong> under the Privacy Act
					2020, and we hold and process it as your agent (section 11). We act on
					your instructions, which are given by these terms and by how you and
					your users set up and use CleanOps.
				</li>
				<li>
					You authorise us to use the service providers listed in our{" "}
					<a href="/privacy">privacy policy</a>, including those outside New
					Zealand, to store and process your data. We may change those providers
					and will update the privacy policy when we do.
				</li>
				<li>
					We will keep your data secure using reasonable safeguards, use it only
					as these terms and our privacy policy allow, and tell you promptly if
					we become aware of a privacy breach affecting it. You are responsible
					for deciding whether the breach is notifiable and for notifying the
					Privacy Commissioner and the people affected, and we will give you the
					information we reasonably can to help.
				</li>
				<li>
					If someone asks us for, or to correct, personal information in your
					data, we may refer them to you. We will give you reasonable help to
					respond. Help beyond what CleanOps’ own tools provide may be charged
					at our reasonable rates.
				</li>
			</ul>

			<h2>9. Your promises to us</h2>
			<p>You promise, and will keep making sure, that:</p>
			<ul>
				<li>
					you have every right, consent and notice needed to put your data into
					CleanOps and to let us use it as these terms allow, and doing so does
					not breach any law or anyone’s rights;
				</li>
				<li>
					you have told your staff, contractors and clients how their
					information is collected and used, including the information you or
					others give us about them, as IPP 3 and IPP 3A of the Privacy Act
					require;
				</li>
				<li>
					before you switch on location sharing, you have a lawful purpose for
					it, have consulted your staff in good faith as employment law
					requires, and have told them when and why their location is collected
					and who sees it, and you will use it only for that purpose;
				</li>
				<li>
					you have permission to photograph your clients’ premises and to keep
					and use their access instructions and door codes;
				</li>
				<li>
					you will not put into CleanOps health information, identity documents,
					financial account details or other sensitive information it is not
					designed for;
				</li>
				<li>
					the information you give us about your business is true, and you will
					keep it up to date.
				</li>
			</ul>

			<h2>10. Acceptable use</h2>
			<p>You must not, and must not let anyone else:</p>
			<ul>
				<li>
					use CleanOps for anything unlawful, deceptive or harmful, to track
					anyone who has not been told, outside working time, or to send
					unsolicited messages;
				</li>
				<li>
					try to access another company’s data, or test, probe, scrape or
					overload the service, or get around its security or usage limits;
				</li>
				<li>
					copy, resell, rent or reverse engineer CleanOps, or use it to build a
					competing product;
				</li>
				<li>upload malicious code, or content you have no right to use.</li>
			</ul>

			<h2>11. Suspension</h2>
			<p>
				We may suspend or restrict all or part of your access, or any user’s
				access, if you do not pay, if you or a user breach these terms, if we
				reasonably believe your account has been compromised or your use puts
				the service, your data, other customers or anyone else at risk, or if
				the law or a court or regulator requires it. Where it is reasonable to,
				we will tell you first and give you a chance to fix the problem. We will
				lift the suspension once the reason for it has been dealt with. We are
				not liable for any loss caused by a suspension under this section, and
				fees remain payable during a suspension caused by you.
			</p>

			<h2>12. Our intellectual property</h2>
			<p>
				CleanOps, including its software, design, content and trade marks,
				belongs to us and our licensors. These terms give you a non-exclusive,
				non-transferable right to use CleanOps for your own business while your
				subscription is active; they do not transfer any ownership. If you or
				your users send us ideas or feedback, we may use them freely without any
				obligation to you. Unless you tell us not to, we may name you as a
				CleanOps customer and show your logo on our website and in our
				marketing.
			</p>

			<h2>13. Other services and app stores</h2>
			<p>
				CleanOps works with services we do not control, such as Xero, Stripe,
				app stores, email and mobile networks. Your use of them is governed by
				their own terms. We are not responsible for them, for their availability
				or changes, or for data once it has left CleanOps for them.
			</p>
			<p>
				The field app is licensed, not sold, to your users under these terms. If
				it was downloaded from the Apple App Store, these terms are between you
				and us, not Apple; Apple has no obligation to provide maintenance or
				support and no responsibility for the app or any claim about it, and
				Apple and its subsidiaries may enforce the app-store terms of this
				section as third-party beneficiaries.
			</p>

			<h2>14. Availability and changes</h2>
			<p>
				We work to keep CleanOps available, but we do not promise it will be
				uninterrupted or error-free, and there may be planned or emergency
				maintenance. We may change, add or remove features. If we remove a
				feature that is a material part of your plan, we will give you
				reasonable notice and you may cancel and receive a refund of fees
				prepaid for the period after the change. That is your only remedy for
				the change.
			</p>

			<h2>15. Disclaimer</h2>
			<p>
				To the extent the law allows, CleanOps is provided “as is” and “as
				available”. We give no warranty that it will meet your needs, and we
				exclude all warranties, conditions, guarantees and representations not
				set out in these terms, including any implied by law about quality,
				fitness for a particular purpose or results.
			</p>

			<h2>16. Limits on our liability</h2>
			<ul>
				<li>
					We are not liable for any loss of profit, revenue, business,
					contracts, goodwill, data or anticipated savings, or for any indirect
					or consequential loss, however it arises.
				</li>
				<li>
					We are not liable for losses arising from your data or instructions,
					from your users, staff or contractors, from your clients, from your
					breach of these terms, from services we do not control, or from events
					outside our reasonable control.
				</li>
				<li>
					Our total liability under or in connection with these terms, in
					contract, tort (including negligence), under statute or otherwise, is
					limited to the fees you paid us in the three months before the event
					giving rise to the claim. For a trial, it is limited to NZ$100.
				</li>
				<li>
					You must tell us about a claim in writing within 12 months of becoming
					aware of it.
				</li>
				<li>
					Nothing in these terms limits liability that cannot be limited by law,
					including for our fraud.
				</li>
			</ul>

			<h2>17. Your responsibility to us</h2>
			<p>
				You will indemnify us, and our directors, staff and contractors, against
				any claim, loss, liability, cost (including reasonable legal costs on a
				solicitor-and-client basis), fine or penalty arising from:
			</p>
			<ul>
				<li>your data, or our use of it as these terms allow;</li>
				<li>
					your or your users’ use of CleanOps in breach of these terms or the
					law, including any breach of your promises in section 9;
				</li>
				<li>
					any complaint or claim by your staff, contractors or clients,
					including a privacy complaint or an employment dispute, except to the
					extent it was caused by our breach of these terms.
				</li>
			</ul>

			<h2>18. Cancelling and ending the agreement</h2>
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
					We may end it at once by notice if you seriously or repeatedly breach
					these terms, do not pay, or become insolvent or go into liquidation,
					receivership or administration.
				</li>
				<li>
					When the agreement ends, your access stops and your data is kept
					read-only and then deleted as set out above and in our privacy policy.
					Export it before then. Fees owed up to the end remain payable.
					Sections 5 to 9, 12 and 15 to 21 survive the end of the agreement.
				</li>
			</ul>

			<h2>19. Changes to these terms</h2>
			<p>
				We may change these terms. We will give at least 30 days’ notice, by
				email or in the app, of a change that is materially adverse to you. A
				change needed to comply with the law or to protect the security of the
				service may take effect sooner, and other changes take effect when they
				are posted. If you keep using CleanOps after a change takes effect, you
				accept the new terms. If you do not accept a materially adverse change,
				you may cancel before it takes effect and we will refund fees prepaid
				for the period after it. Each version is dated, and we record which
				version your business accepted.
			</p>

			<h2>20. Disputes</h2>
			<p>
				If a dispute arises, tell us in writing and we will both try in good
				faith to resolve it for 20 working days before either of us starts
				proceedings, except for urgent relief or to recover unpaid fees.
			</p>

			<h2>21. General</h2>
			<ul>
				<li>
					These terms, our pricing and our privacy policy are the whole
					agreement between us about CleanOps and replace anything said or
					written before. You confirm you have not relied on any statement or
					promise not set out in them, and we agree this is fair and reasonable
					for the purposes of section 50 of the Contract and Commercial Law Act
					2017.
				</li>
				<li>
					You may not transfer this agreement without our written consent. We
					may transfer it to a related company or to a buyer of our business or
					of CleanOps, and may use subcontractors to provide CleanOps, remaining
					responsible for them.
				</li>
				<li>
					Neither of us is liable for delay or failure caused by events beyond
					our reasonable control (other than paying fees).
				</li>
				<li>
					If any part of these terms is unenforceable, it is read down or
					removed and the rest still applies. Not enforcing a right now does not
					waive it.
				</li>
				<li>
					New Zealand law governs these terms, and the New Zealand courts have
					exclusive jurisdiction. Our directors, staff and contractors may rely
					on and enforce sections 11, 16 and 17 under subpart 1 of Part 2 of the
					Contract and Commercial Law Act 2017, as may Apple for section 13.
					Otherwise, nobody other than you and us may enforce these terms, and
					we may change or end them without anyone else’s consent.
				</li>
			</ul>

			<h2>22. Contact</h2>
			<p>
				{legalName}, {city}, New Zealand.
				{/^\d{13}$/.test(nzbn) && ` NZBN ${nzbn}.`} Email{" "}
				<a href={`mailto:${email}`}>{email}</a>.
			</p>
		</LegalPage>
	);
}
