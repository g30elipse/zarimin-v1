import { Short, ShortResponse } from '@/types';

export function parseShort(content: ShortResponse): Short {
    return {
        id: content.slug,
        text: content.caption,
        image: content.image.url,
        author: content.author,
        date: content.sys?.publishedAt,
    };
}
