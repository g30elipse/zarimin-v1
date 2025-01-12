import { Artist, ArtistsResponse } from '@/types';

export function parseArtist(artist: ArtistsResponse): Artist {
    return {
        id: artist.slug,
        name: artist.name,
        image: artist.profileImage.url,
        bio: artist.about.json,
        genre: artist.contentfulMetadata.tags.map((tag) => tag.name),
    };
}
