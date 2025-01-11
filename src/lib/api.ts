import { Artist, News, Chart } from '@/types';
import { dummyArtists, dummyNews, dummyCharts, dummyShorts } from './dummy-data';
import { Short } from '@/types/shorts';
import { parseNews } from './parsers';

export const getLatestNews = async (): Promise<News[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyNews;
};

export const getLatestShorts = async (count: number): Promise<Short[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyShorts.slice(0, count);
};

export const getChartsByType = async (type: string): Promise<Chart[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyCharts.filter((chart) => chart.type === type);
};

export const getArtistSpotlight = async (): Promise<Artist[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyArtists.slice(0, 5);
};

export const getAllCharts = async (): Promise<Chart[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyCharts;
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyArtists.find((artist) => artist.id === id) || null;
};

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
  searchText
  createdAt
  slug
   contentfulMetadata {
        tags {
            id
            name
        }
      }
  
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        },
        body: JSON.stringify({ query }),
        next: { tags: ['news'] },
    }).then((response) => response.json());
}

interface NewsQuery {
    query: string;
    page: number;
    sort?: string;
    limit?: number;
    // category?: string;
}

// export async function getNewsBySlugAndMore(
//     slug: string,
//     preview: boolean
// ): Promise<{
//     news: News | null;
//     moreNews: News[];
// }> {
//     const entry = await newsApi.getNewsBySlug(slug);
//     const entries = await newsApi.getRelatedNews(slug);

//     const selectRandom = (arr: any[], n: number) => {
//         let result = new Array(n);
//         let len = arr.length;
//         const taken = new Array(len);
//         if (n > len) {
//             n = len;
//             result = new Array(n);
//         }
//         while (n--) {
//             const x = Math.floor(Math.random() * len);
//             result[n] = arr[x in taken ? taken[x] : x];
//             taken[x] = --len in taken ? taken[len] : len;
//         }
//         return result;
//     };
//     return {
//         news: entry,
//         moreNews: selectRandom(entries, 4),
//     };
// }

function buildNewsFilter(query: NewsQuery): string {
    const limit = query.limit ?? 24;
    const skip = (query.page - 1) * limit;
    let filterString = '';

    if (query.query) {
        // search title
        // search searchText
        // or filter
        filterString = `OR: [ {heading_contains: "${query.query}"}, {searchText_contains: "${query.query}"} ]`;
    }
    // if (query.category) {
    //     filters.push(`category_contains_some: "${query.category}"`);
    // }
    return `where: { ${filterString} }, skip: ${skip}, limit: ${limit}, order: ${query.sort ?? 'createdAt_DESC'}`;
}

export const newsApi = {
    getRelatedNews: async (slug: string): Promise<News[]> => {
        const entries = await fetchGraphQL(
            `query {
            newsCollection(where: { slug_not_in: "${slug}" }, order: createdAt_DESC, limit: 4) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
            }`
        );

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
    getAllNews: async (query: NewsQuery): Promise<News[]> => {
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
