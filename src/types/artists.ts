import { BaseQuery, ContentfulResponse, Image, Song } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ArtistsQuery extends BaseQuery {}

export enum ArtistsSort {
    TITLE_DESC = 'name_DESC',
    TITLE_ASC = 'name_ASC',
}

export interface ArtistsFilters {
    category?: string[];
    search?: string;
    sort?: ArtistsSort;
    page?: number;
    perPage?: number;
}

export interface ArtistsResponse extends ContentfulResponse {
    name: string;
    about: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        json: any;
    };
    dateOfBirth?: string;
    slug: string;
    searchText: string | null;
    profileImage?: Image;
    socialLinks: any[];
}

export interface Artist {
    id: string;
    name: string;
    slug: string;
    image?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: any;
    genre: string[];
    popularSongs?: Song[];
}

export interface ArtistsSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    search?: string;
    sort?: ArtistsSort;
    page?: string;
    perPage?: string;
}
