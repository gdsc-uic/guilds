import { Club, ClubAssets } from "contentlayer/generated";

export function clubAssetURL(club: Club, name: keyof ClubAssets): string {
    return `/club_assets/${club._raw.flattenedPath}/${club.assets[name]}`;
}

export const fetcher = (...args: [RequestInfo | URL, RequestInit?]) => fetch(...args).then((res) => res.json())