// Photographs of cleaning work, from Unsplash under the Unsplash License (free for commercial use, no attribution
// required; credited here anyway). They set the scene; they are not CleanOps customers, so the site never names or
// quotes the people in them.
export const photos = {
	officeVacuum: {
		src: "/photos/office-vacuum.webp",
		width: 1600,
		height: 1280,
		alt: "A cleaner in overalls and yellow gloves vacuuming an office floor.",
		credit: "web seo, unsplash.com/photos/CVcIMnH_7so",
	},
	upholstery: {
		src: "/photos/upholstery.webp",
		width: 1100,
		height: 733,
		alt: "A cleaner in a green shirt and black gloves vacuuming an upholstered ottoman.",
		credit: "Giorgio Trovato, unsplash.com/photos/5TXz228u4eo",
	},
	livingRoomMop: {
		src: "/photos/living-room-mop.webp",
		width: 1600,
		height: 900,
		alt: "A cleaner in yellow gloves mopping the floor of a bright living room.",
		credit: "Vitaly Gariev, unsplash.com/photos/2NcTLdFHpH8",
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
