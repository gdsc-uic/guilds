import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import md from 'markdown-it';

const CLUB_DIRECTORY = path.join('src', 'clubs');
const MD = md();

export interface ClubMetadata {
    name: string
    description?: { short: string, long: string } | string
    assets?: {
        logo?: string
        cover_photo?: string
        slideshows?: string[]
    }
}

export interface Club {
    slug: string
    metadata: ClubMetadata
    content: string
}

function loadAndProcessClubData(fileName: string): Club {
    const slug = fileName.replace('.md', '');
    const clubFile = fs.readFileSync(path.join(CLUB_DIRECTORY, fileName), 'utf-8');
    const { data: metadata, content } = matter(clubFile);

    return {
        slug,
        content: MD.render(content),
        metadata: metadata as ClubMetadata
    }
}

export function loadClubs(): Club[] {
    const clubFiles = fs.readdirSync(CLUB_DIRECTORY);
    return clubFiles.map(loadAndProcessClubData);
}

export function loadClub(slug: string) {
    const clubData = loadAndProcessClubData(`${slug}.md`);
    return {
        props: {
            club: clubData
        }
    }
}

export function getDescription(club: Club, type: 'long' | 'short' = 'long'): string {
    switch (typeof club.metadata.description) {
        case 'object':
            return club.metadata.description[type];
        case 'string':
            return club.metadata.description;
        default:
            return '';
    }
}