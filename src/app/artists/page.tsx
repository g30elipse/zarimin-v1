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
                {/* Header */}
                <ArtistSpotlight />
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Artists</h1>
                    <div className="flex items-center gap-2 text-accent"></div>
                </div>

                {/* Main Content */}
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
