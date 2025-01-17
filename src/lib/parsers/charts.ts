import { Chart, ChartsResponse } from '@/types';

export function parseChart(chart: ChartsResponse): Chart {
    return {
        id: chart.slug,
        title: chart.title,
        list: chart.list,
        createdAt: chart.sys.publishedAt,
        showInHomePage: chart.showInHomePage,
    };
}
