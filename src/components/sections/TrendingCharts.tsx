import { Chart } from '@/types';
import { ChartList } from '../charts/ChartList';
import SectionWrapper from '../layout/SectionWrapper';

interface TrendingChartsProps {
    charts: Chart[];
}

export const TrendingCharts = ({ charts }: TrendingChartsProps) => {
    return (
        <div className="bg-card-foreground text-white md:py-32 py-16">
            <SectionWrapper>
                <h2 className="text-2xl font-semibold mb-6 md:mb-14 text-center">Trending Charts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {charts.map((chart) => (
                        <ChartList key={chart.id} chart={chart} />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};
