import { SpotlightResponse, Spotlight } from '@/types';

export function parseSpotlight(content: SpotlightResponse): Spotlight {
    return {
        id: content.slug,
        title: content.heading,
        image: content.image?.url,
        artist: {
            id: content.artist.slug,
            name: content.artist.name,
            image: content.artist.profileImage?.url,
            slug: content.artist.slug,
            genre: content.artist.contentfulMetadata.tags.map((tag) => tag.name),
        },
        date: content.sys?.publishedAt,
        slug: content.slug,
    };
}
