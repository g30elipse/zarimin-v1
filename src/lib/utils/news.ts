import { NewsFilters, NewsSearchParams } from '@/types/news';
import { News } from '@/types';

export function parseNewsSearchParams(searchParams: NewsSearchParams): NewsFilters {
    return {
        category: Array.isArray(searchParams.category)
            ? searchParams.category
            : searchParams.category
            ? [searchParams.category]
            : undefined,
        author: searchParams.author,
        search: searchParams.search,
        sort: searchParams.sort,
        page: searchParams.page ? parseInt(searchParams.page) : 1,
        perPage: searchParams.perPage ? parseInt(searchParams.perPage) : 9,
    };
}

export function filterNews(news: News[], filters: NewsFilters): News[] {
    let filtered = [...news];

    if (filters.category?.length) {
        filtered = filtered.filter((item) => item.category.some((cat) => filters.category?.includes(cat)));
    }

    if (filters.author) {
        filtered = filtered.filter((item) => item.author.toLowerCase().includes(filters.author!.toLowerCase()));
    }

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            (item) => item.title.toLowerCase().includes(searchLower) || item.excerpt.toLowerCase().includes(searchLower)
        );
    }

    if (filters.sort) {
        filtered.sort((a, b) => {
            switch (filters.sort) {
                case 'date-desc':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'date-asc':
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });
    }

    return filtered;
}

export function paginateNews(news: News[], page: number = 1, perPage: number = 9) {
    const start = (page - 1) * perPage;
    return {
        items: news.slice(start, start + perPage),
        total: news.length,
        totalPages: Math.ceil(news.length / perPage),
    };
}
