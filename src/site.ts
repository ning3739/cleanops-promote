// Everything the site says about the company and where its links go, in one place. The 【】 placeholders are values
// that are not decided yet; search for PLACEHOLDER before launch.

export const site = {
	name: "CleanOps",
	origin: "https://cleanops.nz",
	company: {
		// Trading name for everyday copy; the registered name for the legal pages and structured data.
		name: "ByteTech",
		legalName: "ByteTech Limited",
		// PLACEHOLDER: a real NZBN has 13 digits; this is the value supplied so far.
		nzbn: "123456789",
		city: "Queenstown",
		region: "Otago",
		country: "New Zealand",
	},
	contact: {
		email: "support@cleanops.nz",
		hours: "Monday to Friday, 9am–5pm NZ time",
	},
	app: {
		origin: "https://app.cleanops.nz",
		signIn: "https://app.cleanops.nz/login",
		register: "https://app.cleanops.nz/register",
	},
	stores: {
		// CleanOps Field on the App Store (bundle com.ning3739.cleanops-mobile). The id also drives Safari's Smart App
		// Banner on /app.
		appStore: "https://apps.apple.com/us/app/cleanops-field/id6821582460",
		appStoreId: "6821582460",
		// CleanOps on Google Play (package com.ning3739.cleanopsmobile, cleanops-mobile/app.json); the same link is in
		// cleanops-web/src/shared/env.ts.
		playStore:
			"https://play.google.com/store/apps/details?id=com.ning3739.cleanopsmobile",
		live: true,
	},
	trialDays: 14,
	// The privacy policy and terms, written from the product's own rules. legalReviewed false shows a draft notice.
	// When the terms change, update legalUpdated and bump terms_version in cleanops/app/core/configuration/business.py
	// (currently 2026-10-26) so new sign-ups record the version they accepted.
	legalReviewed: true,
	legalUpdated: "26 October 2026",
} as const;

// The trial link carries an email when the visitor typed one (cleanops-web/src/routes/register.tsx accepts ?email=).
export function registerUrl(email?: string): string {
	return email
		? `${site.app.register}?email=${encodeURIComponent(email)}`
		: site.app.register;
}
