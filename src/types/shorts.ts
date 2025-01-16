import { BaseQuery, ContentfulResponse, Image } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShortsQuery extends BaseQuery {}

export interface Short {
    id: string;
    text: string;
    image: string;
    author: string;
    date: string;
    likes?: number;
}

export interface ShortResponse extends ContentfulResponse {
    caption: string;
    author: string;
    createdAt: string;
    image: Image;
    slug: string;
}
