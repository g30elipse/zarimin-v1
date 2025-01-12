import { News, NewsResponse } from '@/types';

export function parseNews(news: NewsResponse): News {
    return {
        author: news.author,
        category: news.contentfulMetadata.tags.map((tag) => tag.name),
        id: news.slug,
        title: news.heading,
        excerpt: news.heading,
        content: news.content.json,
        coverImage: news.image.url,
        date: news.sys?.publishedAt,
    };
}
