import { getAllCharts, getArtistSpotlight, getLatestShorts } from '@/lib/api/base';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlights } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { NewsSort } from '@/types';
import { newsApi } from '@/lib/api';

export default async function Home() {
    const [news, charts, spotlightArtists, shorts] = await Promise.all([
        getAllNews(),
        getAllCharts(),
        getArtistSpotlight(),
        getLatestShorts(5),
    ]);

    return (
        <main className="min-h-screen  lg:space-y-44 space-y-24 pb-32 md:pb-32">
            <div className="px-4 md:px-8">
                <LatestShorts shorts={shorts} />
            </div>
            <div className="px-4 md:px-8">
                <LatestNews news={news} />
            </div>
            <TrendingCharts charts={charts} />
            <div className="px-4 md:px-8">
                <ArtistSpotlights spotlights={spotlightArtists} />
            </div>
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
