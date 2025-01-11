import { newsApi } from '@/lib/api';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { notFound } from 'next/navigation';

interface NewsPageProps {
    params: Promise<{
        newsId: string;
    }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
    const { newsId } = await params;
    const news = await newsApi.getNewsBySlug(newsId);
    console.log('news', news);
    if (!news) {
        notFound();
    }

    return (
        <main className="min-h-screen p-4 md:p-8">
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
                            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                            <div className="flex items-center gap-4 text-gray-600 mb-8 pb-6 border-b">
                                <span>{news.author}</span>
                                <span>•</span>
                                <time dateTime={news.date}>{new Date(news.date).toLocaleDateString()}</time>
                            </div>
                            <p className="max-w-4xl prose text-text-light-primary mt-6">
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
                    </aside>
                </div>
            </article>
        </main>
    );
}
