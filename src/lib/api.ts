import { Artist, News, Chart } from '@/types';
import { dummyArtists, dummyNews, dummyCharts, dummyShorts } from './dummy-data';
import { ShortContent } from '@/types/shorts';
import { parseNews } from './parsers';

export const getLatestNews = async (): Promise<News[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyNews;
};

export const getLatestShorts = async (count: number): Promise<ShortContent[]> => {
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

export const getNewsById = async (id: string): Promise<News | null> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyNews.find((news) => news.id === id) || null;
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

export const news = {
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

        console.log('entries', entries);
        return (entries?.data?.newsCollection?.items || []).map(parseNews);
    },

    getNewsBySlug: async (slug: string): Promise<News | null> => {
        const entry = await fetchGraphQL(
            `query {
            blogCollection(where: { slug: "${slug}" }, limit: 1) {
              items {
                ${NEWS_GRAPHQL_FIELDS}
              }
            }
          }`
        );
        return entry?.data?.blogCollection?.items?.[0] ? parseNews(entry.data.blogCollection.items[0]) : null;
    },
};
