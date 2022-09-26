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
		faq: {
			type: "nested",
			of: ClubFaq,
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
	name: 'ClubDescription',
	fields: {
			long: {
					type: 'string',
					description: 'Full description of the club',
					required: true
			},
			short: {
					type: 'string',
					description: 'Short description of the club'
			}
	}
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
	},
}));

const SocialMediaLinks = defineNestedType(() => ({
	name: "SocialMediaLinks",
	fields: {
		social_media: {
			type: "nested",
			of: [
				{ instagram: { type: "string" } },
				{ facebook: { type: "string" } },
				{ github: { type: "string" } },
				{ website: { type: "string" } },
			],
		},
	},
}));

export default makeSource({
	contentDirPath: "src/clubs",
	documentTypes: [Club],
});
