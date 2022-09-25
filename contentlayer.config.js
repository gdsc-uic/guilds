import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';

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

export const Club = defineDocumentType(() => ({
    name: 'Club',
    filePathPattern: '**/*.md',
    fields: {
        name: {
            type: 'string',
            description: 'Name of the club',
            required: true
        },
        description: {
            type: 'nested',
            of: ClubDescription
        },
        tags: {
            type: 'list',
            of: { type: 'string' }
        },
        assets: {
            type: 'nested',
            of: ClubAssets
        }
    },
    computedFields: {
        url: {
            type: 'string',
            resolve: (club) => `/clubs/${club._raw.flattenedPath}`
        },
    }
}));

export default makeSource({
    contentDirPath: 'src/clubs',
    documentTypes: [Club]
});