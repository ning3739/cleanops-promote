// Photographs of cleaning work. Most are from Unsplash under the Unsplash License (free for commercial use, no
// attribution required; credited here anyway). The hero, closing-call and Field app photos are AI-generated scenes of a New
// Zealand crew: they are not CleanOps staff or customers, so the site never names, quotes or captions them as such. They set the scene; they are not CleanOps customers, so the site never names or
// quotes the people in them.
export const photos = {
	crewArrival: {
		src: "/photos/crew-arrival.webp",
		width: 1402,
		height: 1122,
		alt: "Two cleaners in navy polos arriving at a weatherboard house: one lifts a vacuum from the van, the other carries a cleaning caddy.",
		credit: "AI-generated (ChatGPT) for CleanOps",
	},
	basementChecklist: {
		src: "/photos/basement-checklist.webp",
		width: 1122,
		height: 1402,
		alt: "A cleaner in a navy polo checking his phone beside a cleaning trolley in an underground car park.",
		credit: "AI-generated (ChatGPT) for CleanOps",
	},
	ownerSchedule: {
		src: "/photos/owner-schedule.webp",
		width: 1536,
		height: 1024,
		alt: "A cleaning company owner checking her phone beside the open door of her van.",
		credit: "AI-generated (ChatGPT) for CleanOps",
	},
	upholstery: {
		src: "/photos/upholstery.webp",
		width: 1100,
		height: 733,
		alt: "A cleaner in a green shirt and black gloves vacuuming an upholstered ottoman.",
		credit: "Giorgio Trovato, unsplash.com/photos/5TXz228u4eo",
	},
	hallwayMop: {
		src: "/photos/hallway-mop.webp",
		width: 1600,
		height: 1066,
		alt: "Mopping a long white hallway.",
		credit: "Toon Lambrechts, unsplash.com/photos/0FTI9ceTUOc",
	},
	kitchenBroom: {
		src: "/photos/kitchen-broom.webp",
		width: 1100,
		height: 733,
		alt: "A cleaner in an apron with a broom and dustpan in a home kitchen.",
		credit: "Josue Michel, unsplash.com/photos/MwxsRSG1A2s",
	},
	ownerLaptop: {
		src: "/photos/owner-laptop.webp",
		width: 1100,
		height: 618,
		alt: "A business owner working on a laptop at home.",
		credit: "Vitaly Gariev, unsplash.com/photos/OfuwkI80iPY",
	},
} as const;

export type Photo = (typeof photos)[keyof typeof photos];
