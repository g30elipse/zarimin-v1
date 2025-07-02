import { News } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface NewsCardProps {
    news: News;
    className?: string;
}

export const NewsCard = ({ news, className }: NewsCardProps) => {
    return (
        <Link href={`/news/${news.id}`} className="block">
            <Card className={twMerge("overflow-hidden grid grid-cols-3", className)}>
                {/* <Card  className="overflow-hidden h-full flex flex-col"> */}

                <div className="h-full justify-between flex flex-col col-span-3 md:col-span-2">
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
                <div className="relative col-span-3 md:col-span-1">
                    <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover aspect-news" />
                </div>
            </Card>
        </Link>
    );
};
