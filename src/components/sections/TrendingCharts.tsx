import { Chart } from '@/types';
import { ChartList } from '../charts/ChartList';
import SectionWrapper from '../layout/SectionWrapper';

interface TrendingChartsProps {
    charts: Chart[];
}

export const TrendingCharts = ({ charts }: TrendingChartsProps) => {
    return (
        <SectionWrapper>
            <h2 className="text-2xl font-semibold mb-6">Trending Charts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {charts.map((chart) => (
                    <ChartList key={chart.id} chart={chart} />
                ))}
            </div>
        </SectionWrapper>
    );
};
