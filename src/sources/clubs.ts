import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import md from 'markdown-it';

const CLUB_DIRECTORY = path.join('src', 'clubs');
const MD = md();

export interface ClubMetadata {
    name: string
    description?: { short: string, long: string } | string
    tags?: string[]
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

function getFullMarkdownFilepath(fileName: string) {
    const fullPath = path.join(CLUB_DIRECTORY, fileName);
    if (!fileName.endsWith('.md')) {
        if (fs.lstatSync(fullPath).isDirectory()) {
            // If the full path is a directory, return the location of
            // the directory's index.md
            return path.join(CLUB_DIRECTORY, fileName, 'index.md');
        } else {
            // Or else use the {fileName}.md
            return getFullMarkdownFilepath(`${fileName}.md`);
        }
    }

    return fullPath;
}

function loadAndProcessClubData(fileName: string): Club {
    const fullPath = getFullMarkdownFilepath(fileName);
    const slug = fileName.replace('.md', '');
    const clubFile = fs.readFileSync(fullPath, 'utf-8');
    const { data: metadata, content } = matter(clubFile);

    return {
        slug,
        content: MD.render(content),
        metadata: metadata as ClubMetadata
    }
}

export function getTags(): string[] {
    const clubs = loadClubs();
    const uniqueTags = new Set(clubs.map(club => club.metadata.tags ?? []).flat())
    return Array.from(uniqueTags);
}

export function getClubsFromTag(tag: string): Club[] {
    const clubs = loadClubs();
    return clubs.filter(c => c.metadata.tags && c.metadata.tags.includes(tag));
}

export function loadClubs(): Club[] {
    const clubFiles = fs.readdirSync(CLUB_DIRECTORY);
    return clubFiles.map(loadAndProcessClubData);
}

export function loadClub(slug: string) {
    const club = loadAndProcessClubData(slug);
    return {
        props: {
            club
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