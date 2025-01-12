import { Metadata } from 'next';
import { getLatestNews } from '@/lib/api/base';
import { NewsGrid } from '@/components/news/NewsGrid';
import { NewsFilters } from '@/components/news/NewsFilter';
import { Pagination } from '@/components/common/Pagination';
import { filterNews, paginateNews, parseNewsSearchParams } from '@/lib/utils/news';
import { NewsSearchParams, NewsSort } from '@/types/news';
import SectionWrapper from '@/components/layout/SectionWrapper';
import NewsSearch from './_search';
import { newsApi } from '@/lib/api';

export const metadata: Metadata = {
    title: 'News - ZARIMIN',
    description: 'Latest news and updates from the world of Bodo music and entertainment',
};

export default async function NewsPage({ searchParams: _searchParams }: { searchParams: Promise<NewsSearchParams> }) {
    // const allNews = await getLatestNews();
    const searchParams = await _searchParams;
    const _filteredNews = await searchNews(searchParams);

    console.log('filteredNews', _filteredNews);
    // Get unique categories and authors for filters
    const categories = Array.from(new Set(_filteredNews.flatMap((news) => news.category)));
    const authors = Array.from(new Set(_filteredNews.map((news) => news.author)));

    // Parse and apply filters
    const filters = parseNewsSearchParams(searchParams);
    const filteredNews = _filteredNews;

    // Apply pagination
    const { items: paginatedNews, totalPages } = paginateNews(filteredNews, filters.page, filters.perPage);

    const subtitleArray: string[] = [];
    if (filters.author) {
        subtitleArray.push(`By ${filters.author}`);
    }
    if (filters.category?.length) {
        subtitleArray.push(`${filters.category.length} categories selected`);
    }
    const subtitle = subtitleArray.join(' • ');

    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Latest News</h1>
                    <div className="flex items-center gap-2 text-accent">
                        <span>{filteredNews.length} news found</span>
                        {subtitle.length ? <span>• {subtitle}</span> : null}
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky md:top-24">
                            <NewsFilters categories={categories} authors={authors} />
                        </div>
                    </div>

                    {/* News Grid */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Search Bar */}
                        <NewsSearch />

                        {/* Sort Options */}
                        <div className="flex justify-end gap-2">
                            {[
                                { value: NewsSort.CREATED_DESC, label: 'Newest' },
                                { value: NewsSort.CREATED_ASC, label: 'Oldest' },
                                { value: NewsSort.TITLE_ASC, label: 'A-Z' },
                                { value: NewsSort.TITLE_DESC, label: 'Z-A' },
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

async function searchNews(params: NewsSearchParams) {
    console.log('Searching news with params:', params);
    const page = params.page ? parseInt(params.page) : 1;
    return newsApi.searchNews({
        page,
        search: params.search,
        sort: params.sort,
    });
}
