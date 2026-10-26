import { site } from "#/site";
import { plans } from "./plans";

// Head tags for one page: title, description, canonical and the Open Graph pair that share previews read.
export function pageHead(path: string, title: string, description: string) {
	const url = `${site.origin}${path}`;
	return {
		meta: [
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
		],
		links: [{ rel: "canonical", href: url }],
	};
}

export const organizationJsonLd = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: site.company.legalName,
	brand: site.name,
	url: site.origin,
	logo: `${site.origin}/favicon.svg`,
	email: site.contact.email,
	address: {
		"@type": "PostalAddress",
		addressLocality: site.company.city,
		addressRegion: site.company.region,
		addressCountry: "NZ",
	},
};

export const softwareJsonLd = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: site.name,
	applicationCategory: "BusinessApplication",
	operatingSystem: "Web, iOS, Android",
	description:
		"Job management for New Zealand cleaning companies: checklists, photos, hours and GST invoices, with Xero.",
	offers: plans.map((plan) => ({
		"@type": "Offer",
		name: plan.name,
		price: plan.monthly,
		priceCurrency: "NZD",
		description: `${plan.seats} field staff included. Price per month, excluding GST.`,
	})),
	publisher: { "@type": "Organization", name: site.company.legalName },
};

export function faqJsonLd(items: { question: string; answer: string }[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: { "@type": "Answer", text: item.answer },
		})),
	};
}
