import { Short, ShortsQuery, ShortsSort } from '@/types';
import { fetchGraphQL } from './base';
import { parseShort } from '../parsers';

const SHORT_GRAPHQL_FIELDS = `
  caption
  image {
    url
    width
    height
  }
  sys {
    id  
    publishedAt
  }
  author
  slug
  contentfulMetadata {
        tags {
            id
            name
        }
      }
  
`;

function buildShortsFilter(query: ShortsQuery): string {
    const limit = query.limit ?? 24;
    const skip = (query.page - 1) * limit;
    let filterString = '';

    if (query.query) {
        // search title
        // search searchText
        // or filter
        filterString = `OR: [ {caption_contains: "${query.query}"}  ]`;
    }
    // if (query.category) {
    //     filters.push(`category_contains_some: "${query.category}"`);
    // }
    return `where: { ${filterString} }, skip: ${skip}, limit: ${limit}, order: ${
        query.sort ?? ShortsSort.CREATED_DESC
    }`;
}

export const shortsApi = {
    getAllShorts: async (query: ShortsQuery): Promise<Short[]> => {
        const entries = await fetchGraphQL(
            `query {
                shortCollection(${buildShortsFilter(query)}) {
                  items {
                    ${SHORT_GRAPHQL_FIELDS}
                  }
                }
              }`
        );
        console.log('shorts', entries?.data?.shortCollection?.items);

        return (entries?.data?.shortCollection?.items || []).map(parseShort);
    },
};
