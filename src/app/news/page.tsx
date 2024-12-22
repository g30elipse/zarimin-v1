import { Metadata } from 'next';
import { getLatestNews } from '@/lib/api';
import { NewsGrid } from '@/components/news/NewsGrid';
import { NewsFilters } from '@/components/news/NewsFilter';
import { Pagination } from '@/components/common/Pagination';
import { filterNews, paginateNews, parseNewsSearchParams } from '@/lib/utils/news';
import { NewsSearchParams } from '@/types/news';
import SectionWrapper from '@/components/layout/SectionWrapper';

export const metadata: Metadata = {
    title: 'News - ZARIMIN',
    description: 'Latest news and updates from the world of Bodo music and entertainment',
};

export default async function NewsPage({ searchParams: _searchParams }: { searchParams: Promise<NewsSearchParams> }) {
    const allNews = await getLatestNews();
    const searchParams = await _searchParams;
    // Get unique categories and authors for filters
    const categories = Array.from(new Set(allNews.flatMap((news) => news.category)));
    const authors = Array.from(new Set(allNews.map((news) => news.author)));

    // Parse and apply filters
    const filters = parseNewsSearchParams(searchParams);
    const filteredNews = filterNews(allNews, filters);

    // Apply pagination
    const { items: paginatedNews, totalPages } = paginateNews(filteredNews, filters.page, filters.perPage);

    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Latest News</h1>
                    <div className="flex items-center gap-2 text-accent">
                        <span>{filteredNews.length} articles found</span>
                        {(filters.category?.length || filters.author || filters.search) && <span>•</span>}
                        {filters.category?.length ? <span>{filters.category.length} categories selected</span> : null}
                        {filters.author && <span>By {filters.author}</span>}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4">
                            <NewsFilters categories={categories} authors={authors} />
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                defaultValue={filters.search}
                                className="w-full px-4 py-2 border border-accent bg-background 
                                          focus:border-primary outline-none transition-colors"
                            />
                        </div>

                        {/* Sort Options */}
                        <div className="flex justify-end gap-2">
                            {[
                                { value: 'date-desc', label: 'Newest' },
                                { value: 'date-asc', label: 'Oldest' },
                                { value: 'title-asc', label: 'A-Z' },
                                { value: 'title-desc', label: 'Z-A' },
                            ].map((sort) => (
                                <button
                                    key={sort.value}
                                    className={`px-3 py-1 text-sm border transition-colors ${
                                        sort.value === filters.sort
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-accent hover:bg-accent/10'
                                    }`}
                                >
                                    {sort.label}
                                </button>
                            ))}
                        </div>

                        {/* News Grid */}
                        {paginatedNews.length > 0 ? (
                            <NewsGrid news={paginatedNews} />
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">No articles found matching your criteria.</p>
                                <p className="mt-2">Try adjusting your filters or search term.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8">
                                <Pagination currentPage={filters.page || 1} totalPages={totalPages} />
                            </div>
                        )}
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
