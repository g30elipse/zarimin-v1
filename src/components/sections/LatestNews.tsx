import { News } from '@/types';
import { NewsGrid } from '../news/NewsGrid';

interface LatestNewsProps {
    news: News[];
}

export const LatestNews = ({ news }: LatestNewsProps) => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Latest News</h2>
            <NewsGrid news={news} />
        </section>
    );
};
