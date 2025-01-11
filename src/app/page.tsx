import { getLatestNews, getAllCharts, getArtistSpotlight, getLatestShorts, newsApi } from '@/lib/api';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlight } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { PageProps } from '@/types';

export default async function Home(props: PageProps) {
    const { news } = await getData(props);

    const [charts, spotlightArtists, latestShorts] = await Promise.all([
        getAllCharts(),
        getArtistSpotlight(),
        getLatestShorts(4),
    ]);

    return (
        <main className="min-h-screen p-4 md:p-8 lg:space-y-44 space-y-24">
            <LatestShorts shorts={latestShorts} />
            <LatestNews news={news} />
            <TrendingCharts charts={charts} />
            <ArtistSpotlight artists={spotlightArtists} />
        </main>
    );
}

export const getData = async (props: PageProps) => {
    const _news = await newsApi.getAllNews({
        page: 1,
        limit: 4,
        query: '',
        sort: 'createdAt_DESC',
    });

    return {
        news: _news,
    };
};
