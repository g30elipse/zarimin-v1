import { News } from '@/types';
import { NewsGrid } from '../news/NewsGrid';
import SectionWrapper from '../layout/SectionWrapper';
import Link from 'next/link';

interface LatestNewsProps {
    news: News[];
}

export const LatestNews = ({ news }: LatestNewsProps) => {
    return (
        <SectionWrapper>
            <h2 className="text-2xl font-semibold mb-6">Latest News</h2>
            <NewsGrid news={news} />
            <div className="flex justify-start mt-12">
                <Link
                    href="/news"
                    className="text-sm px-4 py-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                    See all news
                </Link>
            </div>
        </SectionWrapper>
    );
};
