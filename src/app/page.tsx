import { getLatestNews, getAllCharts, getArtistSpotlight } from '@/lib/api';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlight } from '@/components/sections/ArtistSpotlight';

export default async function Home() {
    const news = await getLatestNews();
    const charts = await getAllCharts();
    const spotlightArtists = await getArtistSpotlight();

    return (
        <main className="min-h-screen p-4 md:p-8 space-y-12">
            <LatestNews news={news} />
            <TrendingCharts charts={charts} />
            <ArtistSpotlight artists={spotlightArtists} />
        </main>
    );
}
