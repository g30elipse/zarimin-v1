import { Metadata } from 'next';
import { ShortGrid } from '@/components/shorts/ShortGrid';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { shortsApi } from '@/lib/api';
import { OG_IMAGE_LOGO } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'Shorts - ZARIMIN',
    openGraph: {
        images: [OG_IMAGE_LOGO],
    },
    description: 'Quick updates and insights from the world of Bodo music',
};

export default async function ShortsPage() {
    const shorts = await shortsApi.getAllShorts({
        page: 1,
        limit: 24,
        query: '',
        sort: 'createdAt_DESC',
    });
    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <h1 className="text-4xl font-bold mb-8">Shorts</h1>
                <ShortGrid shorts={shorts} />
            </SectionWrapper>
        </main>
    );
}
