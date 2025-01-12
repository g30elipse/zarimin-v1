import { ArtistGrid } from '@/components/artists/ArtistGrid';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ArtistSpotlight from '@/components/spotlight/ArtistSpotlight';
import { artistsApi, spotlightApi } from '@/lib/api';
import { ArtistsSearchParams, ServerPageProps } from '@/types';

export default async function Page(props: ServerPageProps<ArtistsSearchParams>) {
    const searchParams = await props.searchParams;
    const artists = await searchArtists(searchParams);
    const spotlights = await getLatestSpotlights();

    console.log('Artists:', artists, spotlights);
    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <div className="flex flex-col gap-40 md:gap-80">
                    <ArtistSpotlight spotlights={spotlights} />
                    <ArtistGrid artists={artists} />
                </div>
            </SectionWrapper>
        </main>
    );
}

async function searchArtists(params: ArtistsSearchParams) {
    console.log('Searching artists with params:', params);
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
    return spotlightApi.getLatestSpotlights(5);
}
