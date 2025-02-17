import { News, NewsFilters, NewsSort } from '@/types';
import { parseNews } from '../parsers';
import { fetchGraphQL } from './base';

const NEWS_GRAPHQL_FIELDS = `
  heading
  image {
    url
    width
    height
  }
  content {
    json
  }
  author
  excerpt
  searchText
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
  
`;

function buildNewsFilter(_query: NewsFilters): string {
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

    if (query.author) {
        filterStringArr.push(`author_contains: "${query.author}"`);
    }
    if (query.category && query.category.length) {
        filterStringArr.push(
            `contentfulMetadata: { tags: { id_contains_some: [${query.category.map((c) => `"${c.toLowerCase()}"`)}] } }`
        );
    }

    console.log('filterStringArr', filterStringArr);

    return `where: { ${filterStringArr.join(', ')} }, skip: ${skip}, limit: ${limit}, order: ${
        query.sort ?? NewsSort.CREATED_DESC
    }`;
}

export const newsApi = {
    getRelatedNews: async (slug: string): Promise<News[]> => {
        const entries = await fetchGraphQL(
            `query {
            newsCollection(where: { slug_not_in: "${slug}" }, order: ${NewsSort.CREATED_DESC}, limit: 2) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
            }`
        );

        console.log('entries', entries);

        return (entries?.data?.newsCollection?.items || []).map(parseNews);
    },

    getTotalNews: async (): Promise<number> => {
        const entries = await fetchGraphQL(
            `query {
            newsCollection {
              total
            }
          }`
        );
        return entries?.data?.blogCollection?.total;
    },

    // --------------------- News --------------------- //
    searchNews: async (query: NewsFilters): Promise<News[]> => {
        const entries = await fetchGraphQL(
            `query {
            newsCollection(${buildNewsFilter(query)}) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
            }`
        );

        console.log('entries', entries);

        return (entries?.data?.newsCollection?.items || []).map(parseNews);
    },

    getAllNews: async (query: NewsFilters): Promise<News[]> => {
        const entries = await fetchGraphQL(
            `query {
            newsCollection(${buildNewsFilter(query)}) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
          }`
        );

        return (entries?.data?.newsCollection?.items || []).map(parseNews);
    },

    getNewsBySlug: async (slug: string): Promise<News | null> => {
        const entry = await fetchGraphQL(
            `query {
            newsCollection(where: { slug: "${slug}" }, limit: 1) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
          }`
        );

        return entry?.data?.newsCollection?.items?.[0] ? parseNews(entry.data.newsCollection.items[0]) : null;
    },
};
