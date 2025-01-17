import { ChartItem } from '@/components/charts/ChartItem';
import { ChartList } from '@/components/charts/ChartList';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { getAllCharts } from '@/lib/api/base';
import { OG_IMAGE_LOGO } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Charts - ZARIMIN',
    openGraph: {
        images: [OG_IMAGE_LOGO],
    },
    description: 'Discover the latest music charts from the world of Bodo music',
};

export default async function ChartsPage() {
    const charts = await getAllCharts();

    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <h1 className="text-4xl font-bold mb-8">Music Charts</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {charts.map((chart) => (
                        <ChartList key={chart.id} chart={chart} />
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
