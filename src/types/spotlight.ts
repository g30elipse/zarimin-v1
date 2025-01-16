import { Artist, ArtistsResponse, BaseQuery, ContentfulResponse, Image } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SpotlightQuery extends BaseQuery {}

export enum SpotlightSort {
    TITLE_DESC = 'name_DESC',
    TITLE_ASC = 'name_ASC',
    CREATED_DESC = 'sys_publishedAt_DESC',
    CREATED_ASC = 'sys_publishedAt_ASC',
}

export interface SpotlightFilters {
    category?: string[];
    search?: string;
    sort?: SpotlightSort;
    page?: number;
    perPage?: number;
}

export interface Spotlight {
    id: string;
    title: string;
    slug: string;
    image?: string;
    date: string;
    artist: Pick<Artist, 'id' | 'name' | 'slug' | 'image' | 'genre'>;
}

export interface SpotlightResponse extends ContentfulResponse {
    heading: string;
    slug: string;
    image?: Image;
    artist: ArtistsResponse;
}

export interface SpotlightSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    search?: string;
    sort?: SpotlightSort;
    page?: string;
    perPage?: string;
}
