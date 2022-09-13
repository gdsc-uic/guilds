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

const ClubAssets = defineNestedType(() => ({
    name: 'ClubAssets',
    fields: {
        logo: { type: 'string' },
        cover_photo: { type: 'string' },
        slideshows: {
            type: 'list',
            of: { type: 'string' }
        }
    }
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