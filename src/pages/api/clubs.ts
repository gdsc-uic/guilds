import { allClubs } from "contentlayer/generated";
import { NextApiRequest, NextApiResponse } from "next";
import MiniSearch from "minisearch";

type ClubSearchOptions = {
  query: string,
  type: 'non-academic' | 'academic',
  tags: string[],
  limit: string,
  page: string
}

const searchIndex = allClubs.map(c => {
	return c.tags?.map((tag) => ({
		id: c._id,
		name: c.name,
		description: c.description,
		tag,
	})) ?? [];
}).flat();

const minisarch = new MiniSearch({
	fields: ["title", "tag"],
	storeFields: ["id"],
});

minisarch.addAll(searchIndex);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405);
	}

	const params: Partial<ClubSearchOptions> = req.query;
	let results = allClubs;

	if (params.query) {
		const resultsFromSearch = Array.from(new Set(minisarch.search(params.query).map(result => result.id)));
		results = resultsFromSearch.map(id => results.find(r => r._id === id));
	}

	res.status(200).json(allClubs);
}
