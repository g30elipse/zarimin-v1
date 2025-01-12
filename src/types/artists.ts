import { BaseQuery, Image, Song, Tag } from '.';

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

export interface ArtistsResponse {
    name: string;
    about: {
        json: any;
    };
    contentfulMetadata: {
        tags: Tag[];
    };
    dateOfBirth: string;
    slug: string;
    searchText: string | null;
    profileImage: Image;
    socialLinks: any[];
}

export interface Artist {
    id: string;
    name: string;
    image: string;
    bio: string;
    genre: string[];
    popularSongs?: Song[];
}
