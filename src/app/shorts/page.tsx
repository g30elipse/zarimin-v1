import { Metadata } from 'next';
import { dummyShorts } from '@/lib/dummy-data';
import { ShortGrid } from '@/components/shorts/ShortGrid';
import SectionWrapper from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
    title: 'Shorts - ZARIMIN',
    description: 'Quick updates and insights from the world of Bodo music',
};

export default function ShortsPage() {
    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <h1 className="text-4xl font-bold mb-8">Shorts</h1>
                <ShortGrid shorts={dummyShorts} />
            </SectionWrapper>
        </main>
    );
}
