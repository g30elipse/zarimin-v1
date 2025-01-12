import { BaseQuery, ContentfulResponse, Image } from '.';

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
