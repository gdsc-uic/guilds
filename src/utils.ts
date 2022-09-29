import { Club, ClubAssets } from "contentlayer/generated";

export function clubAssetURL(club: Club, name: keyof ClubAssets | 'officer_images', filename?: string): string {
	let key = name;
	if (key !== 'slideshows') {
		key = club.assets[name];
	}

	return `/club_assets/${club._raw.flattenedPath}/${key}${filename ? '/' + filename : ''}`;
}

export const fetcher = (...args: [RequestInfo | URL, RequestInit?]) =>
	fetch(...args).then((res) => res.json());
