import { getLatestNews, getAllCharts, getArtistSpotlight, getLatestShorts } from '@/lib/api/base';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlights } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { NewsSort } from '@/types';
import { newsApi, shortsApi } from '@/lib/api';

export default async function Home() {
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
            <ArtistSpotlights spotlights={spotlightArtists} />
        </main>
    );
}

function getAllNews() {
    return newsApi.getAllNews({
        page: 1,
        perPage: 4,
        search: '',
        sort: NewsSort.CREATED_DESC,
    });
}
