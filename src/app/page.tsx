import { getLatestNews, getAllCharts, getArtistSpotlight, getLatestShorts } from '@/lib/api';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlight } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';

export default async function Home() {
    const [news, charts, spotlightArtists, latestShorts] = await Promise.all([
        getLatestNews(),
        getAllCharts(),
        getArtistSpotlight(),
        getLatestShorts(4),
    ]);

    return (
        <main className="min-h-screen p-4 md:p-8 space-y-12">
            <LatestNews news={news} />
            <LatestShorts shorts={latestShorts} />
            <TrendingCharts charts={charts} />
            <ArtistSpotlight artists={spotlightArtists} />
        </main>
    );
}
