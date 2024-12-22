import { News } from '@/types';
import { NewsGrid } from '../news/NewsGrid';
import SectionWrapper from '../layout/SectionWrapper';

interface LatestNewsProps {
    news: News[];
}

export const LatestNews = ({ news }: LatestNewsProps) => {
    return (
        <SectionWrapper>
            <h2 className="text-2xl font-semibold">Latest News</h2>
            <NewsGrid news={news} />
        </SectionWrapper>
    );
};
