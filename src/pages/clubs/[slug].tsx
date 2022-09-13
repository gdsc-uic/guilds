import Head from 'next/head';
import { allClubs, Club } from 'contentlayer/generated'

export default function ClubPage({ club }: { club: Club }) {
    return (
        <div>
            <Head>
                <title>{club.name}</title>
                <meta name="description" content={club.description?.long ?? ''} />
            </Head>

            <h1>{club.name}</h1>
            <p>{club.description?.long ?? ''}</p>
            <div dangerouslySetInnerHTML={{ __html: club.body.html }}></div>
        </div>
    )
}

export async function getStaticPaths() {
  const paths = allClubs.map(c => c.url);

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
    const club = allClubs.find(club => club._raw.flattenedPath === slug);
    return {
        props: {
            club
        }
    }
}