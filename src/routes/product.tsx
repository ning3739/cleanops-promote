import { createFileRoute } from "@tanstack/react-router";
import {
	Ban,
	BarChart3,
	BookCheck,
	CalendarClock,
	CalendarDays,
	Camera,
	Car,
	CircleCheck,
	Clock,
	FileSignature,
	FileText,
	KeyRound,
	Lock,
	Mail,
	MapPin,
	MessageSquareWarning,
	PauseCircle,
	Percent,
	ReceiptText,
	Repeat,
	ShieldCheck,
	Smartphone,
	Undo2,
	Users,
	WifiOff,
	Wrench,
} from "lucide-react";
import { ButtonLink } from "#/components/button";
import { DemoVideo } from "#/components/demo-video";
import { FeatureExplorer } from "#/components/feature-explorer";
import { DesktopShot, PhoneShot } from "#/components/screens";
import { TrialCallout } from "#/components/trial-callout";
import { XeroLogo } from "#/components/xero-logo";
import type { FeatureKey } from "#/content/plans";
import { screens } from "#/content/screens";
import { pageHead } from "#/content/seo";
import { site } from "#/site";

export const Route = createFileRoute("/product")({
	head: () =>
		pageHead(
			"/product",
			"Product — CleanOps",
			"Quotes, recurring jobs, the field app, photo checklists, review, GST invoices, hours for Xero Payroll, complaints and rework, assets and reports.",
		),
	component: Product,
});

type Point = {
	icon: typeof Camera | typeof XeroLogo;
	text: string;
	plan?: FeatureKey;
};
type Stage = {
	id: string;
	step: string;
	icon: typeof Camera;
	title: string;
	lead: string;
	points: Point[];
	visual: React.ReactNode;
};

const shot = (image: {
	src: string;
	width: number;
	height: number;
	alt: string;
}) => <DesktopShot {...image} />;

const stages: Stage[] = [
	{
		id: "quote",
		step: "Quotes",
		icon: FileSignature,
		title: "Quotes your customer accepts online.",
		lead: "Fixed price or hourly. Accepted quotes turn into jobs.",
		points: [
			{ icon: FileText, text: "Service catalogue with prices per line" },
			{ icon: CircleCheck, text: "Accept or decline from a link, no login" },
			{ icon: Repeat, text: "Becomes a one-off or a recurring job" },
		],
		visual: shot({
			src: "/screens/feat-quotes.webp",
			width: 1400,
			height: 678,
			alt: "Quotes: draft, sent, accepted, declined and expired, with totals including GST.",
		}),
	},
	{
		id: "plan",
		step: "Scheduling",
		icon: CalendarDays,
		title: "Set visit and billing schedules separately.",
		lead: "Recurring jobs generate themselves. How often you clean and how often you bill are set separately.",
		points: [
			{
				icon: Repeat,
				text: "Weekly, fortnightly and monthly visits, booked weeks ahead",
			},
			{
				icon: PauseCircle,
				text: "Pause a customer or skip one visit, on the record",
			},
			{ icon: Users, text: "Cleaners confirm or decline each job in the app" },
		],
		visual: (
			<div className="grid gap-5">
				{shot({
					src: "/screens/feat-recurring.webp",
					width: 1400,
					height: 333,
					alt: "A recurring job: standard clean, weekly on Monday, NZ$253 including GST.",
				})}
				{shot(screens.cropSchedule)}
			</div>
		),
	},
	{
		id: "do",
		step: "Field app",
		icon: Smartphone,
		title: "Job details and checklists on site.",
		lead: "iPhone and Android. Everything is saved on the phone and sent when it can be.",
		points: [
			{
				icon: Camera,
				text: "Require a photo before a checklist item is completed",
			},
			{
				icon: KeyRound,
				text: "Door codes shown only around the day, every view logged",
			},
			{ icon: WifiOff, text: "Work offline in basements, lifts and car parks" },
			{
				icon: Ban,
				text: "Field staff access their own work, without prices or invoices",
			},
		],
		visual: (
			<div className="flex items-start justify-center gap-5">
				<PhoneShot {...screens.fieldJob} className="w-[44%] max-w-[250px]" />
				<PhoneShot
					{...screens.fieldChecklist}
					className="mt-14 w-[44%] max-w-[250px]"
				/>
			</div>
		),
	},
	{
		id: "check",
		step: "Job review",
		icon: BookCheck,
		title: "Review photos, checklists and hours together.",
		lead: "Hours, photos and checklist on one screen. Approve, and the hours, extras and billing move on together.",
		points: [
			{ icon: CircleCheck, text: "Approve or send back with a reason" },
			{
				icon: ShieldCheck,
				text: "Mark photos internal-only before the customer sees them",
			},
			{
				icon: Mail,
				text: "Completion report emailed in your name, replies to your inbox",
			},
		],
		visual: (
			<div className="mx-auto max-w-md">
				<DesktopShot {...screens.cropReview} />
			</div>
		),
	},
	{
		id: "bill",
		step: "Invoicing",
		icon: ReceiptText,
		title: "Prepare GST invoices from approved jobs.",
		lead: "Per job, or one invoice per customer per week, fortnight or month.",
		points: [
			{
				icon: Percent,
				text: "GST calculated for registered companies",
			},
			{
				icon: Lock,
				text: "Void and reissue issued invoices to make a correction",
			},
			{
				icon: XeroLogo,
				text: "Pushed to Xero with a Pay now link; paid comes back",
			},
			{
				icon: CalendarClock,
				text: "One invoice per billing period",
				plan: "periodic_billing",
			},
		],
		visual: shot(screens.cropInvoice),
	},
	{
		id: "pay",
		step: "Hours & payroll",
		icon: Clock,
		title: "Prepare approved hours for payroll.",
		lead: "Sorted into ordinary, weekend, public holiday and travel. CleanOps counts hours; Xero pays people.",
		points: [
			{
				icon: CalendarDays,
				text: "NZ public holidays, including your anniversary day",
			},
			{ icon: Lock, text: "Checked before export, locked after" },
			{ icon: FileText, text: "CSV for any payroll" },
			{
				icon: XeroLogo,
				text: "Timesheets straight to Xero Payroll",
				plan: "xero_payroll",
			},
		],
		visual: (
			<div className="relative pr-[22%] pb-10">
				{shot({
					src: "/screens/feat-hours-exports.webp",
					width: 1400,
					height: 436,
					alt: "Hours exports: pay calendar, period, check export and the CSV download.",
				})}
				<PhoneShot
					{...screens.fieldHours}
					className="absolute right-0 -bottom-4 w-[34%] max-w-[230px]"
				/>
			</div>
		),
	},
	{
		id: "fix",
		step: "Complaints & rework",
		icon: MessageSquareWarning,
		title: "Track complaints and arrange rework.",
		lead: "Logged from the portal, the phone or the office. The original job and invoice stay as they were.",
		points: [
			{
				icon: MessageSquareWarning,
				text: "Every complaint tracked to an outcome",
				plan: "service_issues",
			},
			{
				icon: Undo2,
				text: "Rework is a new job, not charged by default",
				plan: "service_issues",
			},
			{ icon: BarChart3, text: "Rework rate and most-reported places" },
		],
		visual: shot({
			src: "/screens/feat-issues.webp",
			width: 1400,
			height: 630,
			alt: "Service issues: open complaints, rework needed, who is handling each, and the rework rate.",
		}),
	},
	{
		id: "run",
		step: "Vehicles & reports",
		icon: BarChart3,
		title: "Keep track of vehicles, equipment and reports.",
		lead: "Know what’s due before it’s overdue, and where the money comes from.",
		points: [
			{
				icon: Car,
				text: "Vehicles and equipment, with WOF and service dates",
				plan: "assets",
			},
			{
				icon: Wrench,
				text: "Reminders before anything expires",
				plan: "assets",
			},
			{
				icon: BarChart3,
				text: "Invoicing, labour, profit and quality reports",
				plan: "reports",
			},
			{
				icon: MapPin,
				text: "Optional live map while on duty; location never sets hours",
				plan: "gps",
			},
		],
		visual: shot({
			src: "/screens/feat-assets.webp",
			width: 1400,
			height: 1006,
			alt: "Assets: vans and equipment, who holds them, and the next WOF, service or registration date.",
		}),
	},
];

function Product() {
	return (
		<>
			<section className="page-intro product-intro marketing-container">
				<div>
					<p className="section-label">The product</p>
					<h1>Schedule, record and invoice your cleaning jobs.</h1>
					<p>
						Explore the tools your office and field team use for quotes, visits,
						job review and billing.
					</p>
					<ButtonLink href={site.app.register} size="lg" data-cta="product">
						Start free trial
					</ButtonLink>
				</div>
				<DemoVideo />
			</section>
			<section className="site-section product-directory-section">
				<div className="marketing-container">
					<FeatureExplorer items={stages} hashNavigation />
				</div>
			</section>
			<section className="site-section local-section">
				<div className="marketing-container local-layout">
					<div>
						<p className="section-label">Built for New Zealand</p>
						<h2>The local details are included.</h2>
					</div>
					<dl className="local-list">
						<div>
							<dt>GST tax invoices</dt>
							<dd>
								GST invoices for registered companies, with no GST added for
								unregistered companies.
							</dd>
						</div>
						<div>
							<dt>Public holidays</dt>
							<dd>
								National and regional holidays, including your anniversary day.
							</dd>
						</div>
						<div>
							<dt className="xero-heading">
								<XeroLogo />
								Xero
							</dt>
							<dd>Invoices, payments and pay calendars.</dd>
						</div>
						<div>
							<dt>NZD pricing</dt>
							<dd>Pay for field staff. Office logins are included.</dd>
						</div>
					</dl>
				</div>
			</section>
			<section className="site-section accounting-section">
				<div className="marketing-container accounting-layout">
					<div>
						<XeroLogo />
						<h2>Keep your accounting in Xero.</h2>
						<p>
							CleanOps manages jobs and work records. Your existing accounting
							and payroll stay in Xero.
						</p>
					</div>
					<ul className="plain-list">
						<li>General ledger and bank reconciliation</li>
						<li>Card payments</li>
						<li>Pay rates, Holidays Act and pay runs</li>
						<li>GST returns</li>
					</ul>
				</div>
			</section>
			<TrialCallout />
		</>
	);
}
