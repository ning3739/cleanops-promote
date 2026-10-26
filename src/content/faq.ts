import { site } from "#/site";

// Two sentences at most per answer. Every claim here is checked against the product (产品报告, plans.py); change the
// product first, then this.
export const homeFaq = [
	{
		question: "What if there is no signal?",
		answer:
			"The app keeps working. Everything your cleaners do is saved on the phone and sent when the signal comes back, and the app shows what is still waiting to send.",
	},
	{
		question: "Do my cleaners need their own phones?",
		answer:
			"Yes, a recent iPhone or Android phone. No separate CleanOps device is required.",
	},
	{
		question: "Can I move across from spreadsheets?",
		answer:
			"Import your customers and properties, then add your current jobs. Historical jobs are optional.",
	},
	{
		question: "Is this monitoring my staff?",
		answer:
			"No. Location sharing is off unless your company turns it on, it only runs while someone is working, and it never decides anyone’s hours.",
	},
	{
		question: "Does it work with Xero?",
		answer:
			"Invoices go to Xero with the same number, and payments come back on their own. Payroll timesheets go to Xero on the Pro and Business plans.",
	},
	{
		question: "Do you do payroll or accounting?",
		answer:
			"No. We hand Xero the invoices and the hours; Xero does the money, the pay runs and the GST return.",
	},
	{
		question: "What happens if I stop paying?",
		answer:
			"The account goes read-only: you can still sign in, see everything and export it. Data is kept for 30 days after a trial and 90 days after a paid plan ends, and we email you before anything is deleted.",
	},
	{
		question: "Who makes CleanOps?",
		answer: `${site.company.name}, a New Zealand software company in ${site.company.city}. Your email goes to the team who build CleanOps.`,
	},
];

export const pricingFaq = [
	{
		question: "What counts as a seat?",
		answer:
			"One field staff member with the app, contractors included. Office logins are free and unlimited.",
	},
	{
		question: "Can I change plan later?",
		answer:
			"Any time, in both directions. Moving to a smaller plan never deletes data.",
	},
	{
		question: "What happens when the trial ends?",
		answer:
			"Nothing disappears. Pick a plan when you are ready; until then the account is read-only for 30 days and your export still works.",
	},
	{
		question: "Is there an annual price?",
		answer:
			"Yes. Paying yearly costs ten months instead of twelve; extra seats and storage are still billed monthly.",
	},
];
