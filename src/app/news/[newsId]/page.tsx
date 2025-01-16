import { NewsCard } from '@/components/news/NewsCard';
import { newsApi } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface NewsPageProps {
    params: Promise<{
        newsId: string;
    }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
    const { newsId } = await params;
    const news = await newsApi.getNewsBySlug(newsId);
    const relatedNews = await newsApi.getRelatedNews(newsId);

    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-center">{news.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-8 pb-6 justify-center text-sm">
                    <span>{news.author}</span>
                    <span>•</span>
                    <time dateTime={news.date}>{new Date(news.date).toLocaleDateString()}</time>
                </div>
            </div>
            <article className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="relative h-64 md:h-96 mb-8">
                    <img src={news.coverImage} alt={news.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Article Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <div className="boxy-card p-6">
                            <h1 className="text-xl text-gray-600 font-bold mb-4">{news.excerpt}</h1>
                            {/* <div className="flex items-center gap-4 text-gray-600 mb-8 pb-6 border-b text-sm">
                                <span>{news.author}</span>
                                <span>•</span>
                                <time dateTime={news.date}>{new Date(news.date).toLocaleDateString()}</time>
                            </div> */}
                            <p className="max-w-4xl prose text-gray-600 prose-lg">
                                {documentToReactComponents(news.content, { preserveWhitespace: true })}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="boxy-card p-6">
                            <h2 className="text-xl font-bold mb-4">Categories</h2>
                            <div className="flex flex-wrap gap-2">
                                {news.category.map((cat) => (
                                    <span
                                        key={cat}
                                        className="text-sm border-2 border-secondary bg-secondary px-3 py-1"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="boxy-card p-6">
                            <h2 className="text-xl font-bold mb-4">Author</h2>
                            <div className="flex items-center gap-4 text-gray-600 text-sm">
                                <span>{news.author}</span>
                                <span>•</span>
                                <time dateTime={news.date}>{new Date(news.date).toLocaleDateString()}</time>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
            <div className="max-w-4xl mx-auto mt-12 md:mt-24 pb-32">
                <h2 className="text-xl font-bold mb-4">Related News</h2>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    {relatedNews.map((article) => (
                        <NewsCard key={article.id} news={article} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export async function generateMetadata({ params }: NewsPageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const id = (await params).newsId;

    // fetch data
    const news = await newsApi.getNewsBySlug(id);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const images = [news?.coverImage, ...previousImages].filter(Boolean) as string[];
    return {
        title: news?.title,
        openGraph: {
            images,
        },
    };
}
