import Head from 'next/head';
import { Club, getDescription, loadClub, loadClubs } from '../../sources/clubs'

export default function ClubPage({ club }: { club: Club }) {
    return (
        <div>
            <Head>
                <title>{club.metadata.name ?? ''}</title>
                <meta name="description" content={getDescription(club, 'long')} />
            </Head>

            <h1>{club.metadata.name}</h1>
            <p>{getDescription(club, 'long')}</p>
            <div dangerouslySetInnerHTML={{ __html: club.content }}></div>
        </div>
    )
}

export async function getStaticPaths() {
  const clubs = loadClubs();

  return {
    paths: clubs.map(club => ({ params: { slug: club.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
    return loadClub(slug);
}