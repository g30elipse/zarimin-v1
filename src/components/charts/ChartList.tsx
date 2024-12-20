import { Chart } from '@/types';
import { ChartItem } from './ChartItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartListProps {
    chart: Chart;
}

export const ChartList = ({ chart }: ChartListProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {chart.songs.map((song, index) => (
                        <ChartItem key={song.id} song={song} position={index + 1} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
