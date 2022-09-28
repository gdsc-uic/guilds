import { allClubs } from "contentlayer/generated";
import { NextApiRequest, NextApiResponse } from "next";
import MiniSearch from "minisearch";

// type ClubSearchOptions = {
//   query: string,
//   type: 'non-academic' | 'academic',
//   tags: string[],
//   limit: string,
//   page: string
// }
// const searchIndex = allClubs.map(c => {

// });

// const minisarch = new MiniSearch({
// 	fields: ["title", "tags"],
// 	storeFields: ["title"],
// });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405);
	}

	// TODO: use a search indexer to index clubs
	// const params: ClubSearchOptions = req.query;
	res.status(200).json(allClubs);
}
