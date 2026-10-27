// The captured screens in public/screens (see README, "Screenshots and the recording"). Sizes are the files' own, so
// the page reserves the right space before they load.
const desktop = { width: 1600, height: 1000 };
const phone = { width: 603, height: 1311 };

export const screens = {
	officeToday: {
		src: "/screens/office-today.webp",
		...desktop,
		alt: "The office Today page: jobs today, one waiting for review, unpaid invoices and what needs attention.",
	},
	officeSchedule: {
		src: "/screens/office-schedule.webp",
		...desktop,
		alt: "The week’s schedule by person, with unassigned jobs, confirmations and Labour Day marked.",
	},
	officeReview: {
		src: "/screens/office-review.webp",
		...desktop,
		alt: "Reviewing a finished job: checklist, photos and hours on one screen before approval.",
	},
	officeInvoice: {
		src: "/screens/office-invoice.webp",
		...desktop,
		alt: "An invoice with GST, its Xero status and email delivery.",
	},
	fieldToday: {
		src: "/screens/field-today.webp",
		...phone,
		alt: "The field app’s Today screen: the job running now and the hours so far.",
	},
	fieldJob: {
		src: "/screens/field-job.webp",
		...phone,
		alt: "A job in the field app with its checklist, photos, notes and the Finish job button.",
	},
	fieldChecklist: {
		src: "/screens/field-checklist.webp",
		...phone,
		alt: "The job checklist in the field app; a camera icon marks items that need a photo.",
	},
	fieldHours: {
		src: "/screens/field-hours.webp",
		...phone,
		alt: "The field app’s Hours screen: the running timer and this pay period.",
	},
	fieldSchedule: {
		src: "/screens/field-schedule.webp",
		...phone,
		alt: "The next fortnight of jobs in the field app, each waiting for the cleaner to confirm.",
	},
	portalVisits: {
		src: "/screens/portal-safari-visits.webp",
		...phone,
		alt: "The customer portal on a phone: past visits and their photos.",
	},
	portalInvoices: {
		src: "/screens/portal-safari-invoices.webp",
		...phone,
		alt: "The customer portal’s invoices, with what is due and how to pay.",
	},
	// Close-ups cut from the desktop captures, for feature cards.
	cropSchedule: {
		src: "/screens/crop-schedule.webp",
		width: 1400,
		height: 684,
		alt: "The week by person: who is going where, who confirmed, and the jobs nobody has yet.",
	},
	cropReview: {
		src: "/screens/crop-review.webp",
		width: 800,
		height: 1200,
		alt: "Reviewing a finished job: time on site, the photo and the completed checklist.",
	},
	cropInvoice: {
		src: "/screens/crop-invoice.webp",
		width: 1400,
		height: 678,
		alt: "A paid invoice: one line per job, GST at 15%, and the payment recorded.",
	},
} as const;

// The product film: real screens animated, with music ("Upbeat Happy Corporate" by kornevmusic, Pixabay Content
// License, free for commercial use; pixabay.com/music/corporate-upbeat-happy-corporate-487426). README, "The film".
// Rendered by scripts/film/render.mjs in four versions; the player lists them in this order and the browser takes the
// first it can play: 720p on narrow screens, AV1 WebM where supported (about two-thirds the size), H.264 MP4 otherwise.
const PHONE = "(max-width: 767px)";
export const recording = {
	src: "/media/how-it-works.mp4",
	poster: "/media/how-it-works-poster.webp",
	seconds: 47,
	sources: [
		{
			src: "/media/how-it-works-720.webm",
			type: 'video/webm; codecs="av01.0.05M.08, opus"',
			media: PHONE,
		},
		{ src: "/media/how-it-works-720.mp4", type: "video/mp4", media: PHONE },
		{
			src: "/media/how-it-works.webm",
			type: 'video/webm; codecs="av01.0.08M.08, opus"',
			media: undefined,
		},
		{ src: "/media/how-it-works.mp4", type: "video/mp4", media: undefined },
	],
};
