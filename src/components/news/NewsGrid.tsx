import { News } from '@/types';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
    news: News[];
}

export const NewsGrid = ({ news }: NewsGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {news.map((article) => (
                <NewsCard key={article.id} news={article} />
            ))}
        </div>
    );
};
