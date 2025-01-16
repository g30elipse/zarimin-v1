import { ArtistGrid } from '@/components/artists/ArtistGrid';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ArtistSpotlight from '@/components/spotlight/ArtistSpotlight';
import { artistsApi, spotlightApi } from '@/lib/api';
import { ArtistsSearchParams, ServerPageProps } from '@/types';

export default async function Page(props: ServerPageProps<ArtistsSearchParams>) {
    const searchParams = await props.searchParams;
    const artists = await searchArtists(searchParams);
    const spotlights = await getLatestSpotlights();

    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <div className="flex flex-col gap-8 md:gap-16 pb-32">
                    <div className="mb-8">
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
    return spotlightApi.getLatestSpotlights(2);
}
