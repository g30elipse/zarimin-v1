import { BaseQuery } from '.';

export type NewsSort = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export interface NewsFilters {
    category?: string[];
    author?: string;
    search?: string;
    sort?: NewsSort;
    page?: number;
    perPage?: number;
}

export interface NewsQuery extends BaseQuery {}

export interface News {
    id: string;
    title: string;
    excerpt: string;
    content: any;
    coverImage: string;
    date: string;
    author: string;
    category: string[];
}

export interface NewsSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    author?: string;
    search?: string;
    sort?: NewsSort;
    page?: string;
    perPage?: string;
}
