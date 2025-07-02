import { getArtistSpotlight, getLatestShorts } from '@/lib/api/base';
import { LatestNews } from '@/components/sections/LatestNews';
import { TrendingCharts } from '@/components/sections/TrendingCharts';
import { ArtistSpotlights } from '@/components/sections/ArtistSpotlight';
import { LatestShorts } from '@/components/sections/LatestShorts';
import { NewsSort } from '@/types';
import { getHomePageCharts, newsApi } from '@/lib/api';
import { Metadata } from 'next';
import { OG_IMAGE_LOGO } from '@/lib/constants';
import Image from 'next/image';

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
            <div className="relative" style={{
                backgroundImage: 'url(/hero.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                height: '80vh',
                width: '100%',
            }}>
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 px-8 flex items-center justify-center">
                    <h1 className="lg:text-8xl text-3xl font-dancing tracking-wide text-white text-center">
                        Preserving <span className="text-orange-400">Culture</span>
                    </h1>
                </div>
            </div>
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
