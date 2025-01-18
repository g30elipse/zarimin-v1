import { ArtistGrid } from '@/components/artists/ArtistGrid';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ArtistSpotlight from '@/components/spotlight/ArtistSpotlight';
import { artistsApi, spotlightApi } from '@/lib/api';
import { OG_IMAGE_LOGO } from '@/lib/constants';
import { ArtistsSearchParams, ServerPageProps } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Artists - ZARIMIN',
    openGraph: {
        images: [OG_IMAGE_LOGO],
    },
    description: 'Artists from our community',
};

export default async function Page(props: ServerPageProps<ArtistsSearchParams>) {
    const searchParams = await props.searchParams;
    const artists = await searchArtists(searchParams);
    const spotlights = await getLatestSpotlights();

    return (
        <main className="min-h-screen py-4 md:py-8">
            <SectionWrapper>
                <div className="flex flex-col gap-8 md:gap-16 pb-32">
                    <div className="mb-8 md:mb-16 lg:mb-32">
                        <ArtistSpotlight spotlights={spotlights} />
                    </div>
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-8">Artists</h1>
                        <ArtistGrid artists={artists} />
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

async function searchArtists(params: ArtistsSearchParams) {
    const page = params.page ? parseInt(params.page) : 1;
    const category = params.category
        ? Array.isArray(params.category)
            ? params.category
            : [params.category]
        : undefined;

    return artistsApi.searchArtists({
        page,
        search: params.search,
        sort: params.sort,
        category,
    });
}

async function getLatestSpotlights() {
    return spotlightApi.getLatestSpotlights(4);
}
