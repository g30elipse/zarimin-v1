import { getLatestNews, getAllCharts, getArtistSpotlight, getLatestShorts, newsApi } from '@/lib/api';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlight } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { PageProps } from '@/types';
import { shortsApi } from '@/lib/services';

export default async function Home(props: PageProps) {
    const [news, charts, spotlightArtists, shorts] = await Promise.all([
        getAllNews(),
        getAllCharts(),
        getArtistSpotlight(),
        getLatestShorts(5),
    ]);

    return (
        <main className="min-h-screen p-4 md:p-8 lg:space-y-44 space-y-24">
            <LatestShorts shorts={shorts} />
            <LatestNews news={news} />
            <TrendingCharts charts={charts} />
            <ArtistSpotlight artists={spotlightArtists} />
        </main>
    );
}

function getAllNews() {
    return newsApi.getAllNews({
        page: 1,
        limit: 4,
        query: '',
        sort: 'createdAt_DESC',
    });
}
