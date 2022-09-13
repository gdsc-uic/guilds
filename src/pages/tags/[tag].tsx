import { getClubsFromTag, getTags } from "../../sources/clubs";

export default function TagPage({ tag, clubs }) {
    return (
        <main>
            <h1>{tag}</h1>
            <p>{JSON.stringify(clubs)}</p>
        </main>
    )
}

export async function getStaticPaths() {
    const tags = getTags();

    return {
        paths: tags.map(tag => ({ params: { tag } })),
        fallback: false
    }
}

export async function getStaticProps({ params: { tag } }) {
    return {
        props: {
            clubs: getClubsFromTag(tag),
            tag
        }
    }
}