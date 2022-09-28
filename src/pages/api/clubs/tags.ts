import { allClubs } from "contentlayer/generated";
import { NextApiRequest, NextApiResponse } from "next";

const clubTags = Object.entries(allClubs.map(c => c.tags ?? []).flat().reduce<Record<string, number>>((p, v) => {
    if (!p[v]) {
        p[v] = 0
    }

    p[v]++;
    return p;
}, {})).filter(([_, occurances]) => {
    // TODO: occurances must not be 1!
    return occurances >= 1;
}).map(([tag, _]) => tag);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405);
	}

	res.status(200).json(clubTags);
}
