import { GraphQlCollectionResponse, Spotlight, SpotlightFilters, SpotlightResponse, SpotlightSort } from '@/types';
import { fetchGraphQL } from '.';
import { parseSpotlight } from '../parsers';

const SPOTLIGHT_GRAPHQL_FIELDS = `
      heading
      image {
        title
        url
        width
        height
      }
      slug
      artist {
        name
        slug
        sys {
          id
          publishedAt
        }
        contentfulMetadata {
          tags {
            id
            name
          }
        }
        profileImage {
          title
          width
          height
          url
          sys {
            id
          }
        }
      }
      sys {
        publishedAt
        id
      }
      contentfulMetadata {
        tags {
          id
          name
        }
      }
    
`;

function buildSpotlightFilter(_query: SpotlightFilters): string {
    const query = {
        ..._query,
        page: _query.page ?? 1,
        perPage: _query.perPage ?? 5,
        // limit: _query.perPage ?? 24,
    };

    const limit = query.perPage ?? 24;
    const skip = (query.page - 1) * limit;
    const filterStringArr: string[] = [];

    if (query.search) {
        // search title
        // search searchText
        // or filter
        filterStringArr.push(`OR: [ 
            { heading_contains: "${query.search}" }, 
            { searchText_contains: "${query.search}" },
            { author_contains: "${query.search}" },
        ]`);
    }

    return `where: { ${filterStringArr.join(', ')} }, skip: ${skip}, limit: ${limit}, order: ${
        query.sort ?? 'createdAt_DESC'
    }`;
}

export const spotlightApi = {
    getLatestSpotlights: async (count: number): Promise<Spotlight[]> => {
        const entries: GraphQlCollectionResponse<SpotlightResponse> = await fetchGraphQL(
            `query {
              artistSpotlightCollection(${buildSpotlightFilter({
                  page: 1,
                  sort: SpotlightSort.CREATED_DESC,
                  perPage: count,
              })}) {
                items {
                  ${SPOTLIGHT_GRAPHQL_FIELDS}
                }
              }
              }`
        );

        return (entries?.data?.artistSpotlightCollection?.items || []).map(parseSpotlight);
    },
};
