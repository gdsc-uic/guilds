import {
	defineDocumentType,
	defineNestedType,
	makeSource,
} from "contentlayer/source-files";

export const Club = defineDocumentType(() => ({
	name: "Club",
	filePathPattern: "**/*.md",
	fields: {
		name: {
			type: "string",
			description: "Name of the club",
			required: true,
		},
		type: {
			type: "enum",
			options: ["academic", "non-academic"],
			default: "academic",
		},
		links: {
			type: "list",
			of: { type: ClubLink },
		},
		description: {
			type: "nested",
			of: ClubDescription,
		},
		tags: {
			type: "list",
			of: { type: "string" },
		},
		assets: {
			type: "nested",
			of: ClubAssets,
		},
		faqs: {
			type: "list",
			of: { type: ClubFaq },
		},
		theme: {
			type: "nested",
			of: ClubTheme,
		},
		registration: {
			type: "nested",
			of: ClubRegistration,
		},
		officers: {
			type: "list",
			of: ClubOfficer,
		},
	},
	computedFields: {
		url: {
			type: "string",
			resolve: (club) => `/clubs/${club._raw.flattenedPath}`,
		},
	},
}));

const ClubDescription = defineNestedType(() => ({
	name: "ClubDescription",
	fields: {
		full: {
			type: "string",
			description: "Full description of the club",
			required: true,
		},
		short: {
			type: "string",
			description: "Short description of the club",
		},
	},
}));

const ClubFaq = defineNestedType(() => ({
	name: "ClubFaq",
	fields: {
		question: {
			type: "string",
			description: "Write a question that is frequently asked",
		},
		answer: {
			type: "string",
			description: "Answer description",
		},
	},
}));

const ClubAssets = defineNestedType(() => ({
	name: "ClubAssets",
	fields: {
		logo: { type: "string" },
		cover_photo: { type: "string" },
		slideshows: {
			type: "list",
			of: { type: "string" },
		},
		video_url: { type: "string" },
	},
}));

const ClubLink = defineNestedType(() => ({
	name: "ClubLink",
	fields: {
		label: { type: "string" },
		url: { type: "string" },
	},
}));

const ClubTheme = defineNestedType(() => ({
	name: "ClubTheme",
	fields: {
		primary_color: { type: "string" },
		secondary_color: { type: "string" },
	},
}));

const ClubRegistration = defineNestedType(() => ({
	name: "ClubRegistration",
	fields: {
		form_url: { type: "string", required: false },
		meeting_url: { type: "string", required: false },
		livestream_url: { type: "string", required: false },
	},
}));

const ClubOfficer = defineNestedType(() => ({
	name: "ClubOfficer",
	fields: {
		name: { type: "string", required: true },
		position: { type: "string", required: true },
		photo_name: { type: "string", required: false },
	},
}));

export default makeSource({
	contentDirPath: "src/clubs",
	documentTypes: [Club],
});
