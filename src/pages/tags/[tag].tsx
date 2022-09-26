import { allClubs } from "contentlayer/generated";
export default function TagPage({ tag, clubs }) {
	return (
		<main>
			<h1>{tag}</h1>
			<p>{JSON.stringify(clubs)}</p>
		</main>
	);
}

export async function getStaticPaths() {
	const uniqueTags = new Set(allClubs.map((club) => club.tags).flat());
	const tags = Array.from(uniqueTags);

	return {
		paths: tags.map((tag) => ({ params: { tag } })),
		fallback: false,
	};
}

export async function getStaticProps({ params: { tag } }) {
	return {
		props: {
			clubs: allClubs.filter((club) => club.tags.includes(tag)),
			tag,
		},
	};
}
