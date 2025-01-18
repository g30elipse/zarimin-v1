import { getArtistSpotlight, getLatestShorts } from '@/lib/api/base';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlights } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { NewsSort } from '@/types';
import { getHomePageCharts, newsApi } from '@/lib/api';
import { Metadata } from 'next';
import { OG_IMAGE_LOGO } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'ZARIMIN',
    openGraph: {
        images: [OG_IMAGE_LOGO],
    },
    description:
        'ZARIMIN is a music magazine dedicated to promoting and preserving Bodo music culture while connecting it with the global music community.',
    keywords: ['ZARIMIN', 'Dakhwr', 'Mukut', 'Hironya', 'Bodo music', 'music magazine team'],
};

export default async function Home() {
    const [news, charts, spotlightArtists, shorts] = await Promise.all([
        getAllNews(),
        getHomePageCharts(),
        getArtistSpotlight(),
        getLatestShorts(5),
    ]);

    return (
        <main className="min-h-screen  lg:space-y-44 space-y-24 pb-32 md:pb-32">
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
