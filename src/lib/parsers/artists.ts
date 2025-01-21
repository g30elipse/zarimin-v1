import { Artist, ArtistsResponse } from '@/types';

export function parseArtist(artist: ArtistsResponse): Artist {
    return {
        id: artist.slug,
        name: artist.name,
        image: artist.profileImage?.url,
        dob: artist.dateOfBirth,
        bio: artist.about.json,
        genre: artist.contentfulMetadata.tags.map((tag) => tag.name),
        slug: artist.slug,
        socialLinks: artist.socialLinks || [],
    };
}
