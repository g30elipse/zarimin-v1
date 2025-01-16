import { BaseQuery, ContentfulResponse, Image } from '.';

export enum NewsSort {
    CREATED_DESC = 'sys_publishedAt_DESC',
    CREATED_ASC = 'sys_publishedAt_ASC',
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewsQuery extends BaseQuery {}

export interface NewsResponse extends ContentfulResponse {
    author: string;
    content: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json: any;
    };
    // createdAt: string;
    heading: string;
    excerpt: string;
    slug: string;
    searchText: string | null;
    image: Image;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface News {
    id: string;
    title: string;
    excerpt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
