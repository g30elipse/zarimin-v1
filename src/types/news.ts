import { BaseQuery, Image, Tag } from '.';

export enum NewsSort {
    CREATED_DESC = 'createdAt_DESC',
    CREATED_ASC = 'createdAt_ASC',
    TITLE_DESC = 'heading_DESC',
    TITLE_ASC = 'heading_ASC',
}

export interface NewsFilters {
    category?: string[];
    author?: string;
    search?: string;
    sort?: NewsSort;
    page?: number;
    perPage?: number;
}

export interface NewsQuery extends BaseQuery {}

export interface NewsResponse {
    author: string;
    content: {
        json: any;
    };
    contentfulMetadata: {
        tags: Tag[];
    };
    createdAt: string;
    heading: string;
    slug: string;
    searchText: string | null;
    image: Image;
}

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
