import { BaseQuery } from '@/lib/api';
import { Image } from '.';

export interface ShortsQuery extends BaseQuery {}

export interface Short {
    id: string;
    text: string;
    image: string;
    author: string;
    date: string;
    likes?: number;
}

export interface ShortResponse {
    caption: string;
    author: string;
    createdAt: string;
    image: Image;
    slug: string;
}
