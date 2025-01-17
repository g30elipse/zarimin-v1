import { Chart } from '@/types';
import { ChartItem } from './ChartItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartListProps {
    chart: Chart;
}

export const ChartList = ({ chart }: ChartListProps) => {
    // Data format is DD MMM YYYY
    const createdAt = new Date(chart.createdAt)
        .toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        })
        .split(' ')
        .join(' ');

    return (
        <Card className="rounded-card">
            <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
                <div className="flex justify-between text-sm text-gray-500">{createdAt}</div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {chart.list.map((item, index) => (
                        <ChartItem key={index} item={item} position={index + 1} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
