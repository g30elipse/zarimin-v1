import { BaseQuery, ContentfulResponse, Image } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChartsQuery extends BaseQuery {}

export enum ChartsSort {
    TITLE_DESC = 'title_DESC',
    TITLE_ASC = 'title_ASC',
    CREATED_DESC = 'sys_publishedAt_DESC',
    CREATED_ASC = 'sys_publishedAt_ASC',
}

export interface ChartsFilters {
    sort?: ChartsSort;
    page?: number;
    perPage?: number;
    showInHomePage?: boolean;
}

export interface Chart {
    id: string;
    title: string;
    showInHomePage?: boolean;
    list: string[];
    createdAt: string;
}

export interface ChartsResponse extends ContentfulResponse {
    title: string;
    list: string[];
    slug: string;
    createdAt: string;
    showInHomePage?: boolean;
}

export interface ChartsSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    search?: string;
    sort?: ChartsSort;
    page?: string;
    perPage?: string;
}
