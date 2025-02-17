import { Artist, ArtistsFilters, ArtistsSort } from '@/types';
import { appendTagSearchFilter, fetchGraphQL } from '.';
import { parseArtist } from '../parsers';

const ARTIST_GRAPHQL_FIELDS = `
  name
  profileImage {
    url
    width
    height
  }
  about {
    json
  }
    dateOfBirth
  slug
  socialLinks
   contentfulMetadata {
        tags {
            id
            name
        }
      }
  
`;

function buildArtistsFilter(_query: ArtistsFilters): string {
    const query = {
        ..._query,
        page: _query.page ?? 1,
        perPage: _query.perPage ?? 5,
        // limit: _query.perPage ?? 24,
    };

    const limit = query.perPage ?? 24;
    const skip = (query.page - 1) * limit;
    let filterString = '';

    if (query.search) {
        filterString = `OR: [ 
            { name_contains: "${query.search}" }, 
            ${appendTagSearchFilter(query.search)}
        ]`;
    }
    return `where: { ${filterString} }, skip: ${skip}, limit: ${limit}, order: ${query.sort ?? ArtistsSort.TITLE_ASC}`;
}

export const artistsApi = {
    searchArtists: async (query: ArtistsFilters): Promise<Artist[]> => {
        const entries = await fetchGraphQL(
            `query {
                artistCollection(${buildArtistsFilter(query)}) {
                  items {
                    ${ARTIST_GRAPHQL_FIELDS}
                  }
                }
                }`
        );

        console.log('entries', entries);
        return (entries?.data?.artistCollection?.items || []).map(parseArtist);
    },

    getArtistById: async (id: string): Promise<Artist | null> => {
        const entry = await fetchGraphQL(
            `query {
                artistCollection(where: { slug: "${id}", }, limit: 1) {
                  items {
                    ${ARTIST_GRAPHQL_FIELDS}
                  }
                }
              }`
        );
        return parseArtist(entry?.data?.artistCollection?.items?.[0]);
    },
};
