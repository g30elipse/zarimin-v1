import { News } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface NewsCardProps {
    news: News;
}

export const NewsCard = ({ news }: NewsCardProps) => {
    return (
        <Link href={`/news/${news.id}`} className="block">
            <Card className="overflow-hidden grid grid-cols-3">
                {/* <Card  className="overflow-hidden h-full flex flex-col"> */}
                <div className="relative h-48">
                    <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 h-full justify-between flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl">{news.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-between ">
                        <p className="text-gray-600 mb-4 line-clamp-2">{news.excerpt}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{news.author}</span>
                            <time dateTime={news.date}>{new Date(news.date).toLocaleDateString()}</time>
                        </div>
                    </CardContent>
                </div>
            </Card>
        </Link>
    );
};
