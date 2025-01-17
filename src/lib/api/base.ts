import { Artist, News, Chart, NewsSort, Spotlight } from '@/types';
import { Short, ShortsSort } from '@/types/shorts';
import { artistsApi, chartsApi, newsApi, shortsApi, spotlightApi } from '.';

export const getLatestNews = async (): Promise<News[]> => {
    return newsApi.getAllNews({
        page: 1,
        perPage: 4,
        search: '',
        sort: NewsSort.CREATED_DESC,
    });
};

export const getLatestShorts = async (count: number): Promise<Short[]> => {
    return shortsApi.getAllShorts({
        page: 1,
        limit: count,
        query: '',
        sort: ShortsSort.CREATED_DESC,
    });
};

export const getArtistSpotlight = async (): Promise<Spotlight[]> => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // return dummyArtists.slice(0, 5);
    return spotlightApi.getLatestSpotlights(5);
};

export const getAllCharts = async (): Promise<Chart[]> => {
    return chartsApi.searchCharts({
        page: 1,
        perPage: 4,
    });
};

export const getHomePageCharts = async (): Promise<Chart[]> => {
    return chartsApi.searchCharts({
        page: 1,
        perPage: 4,
        showInHomePage: true,
    });
};

export const getArtistById = async (id: string): Promise<Artist | null> => {
    return artistsApi.getArtistById(id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchGraphQL(query: string, preview = false): Promise<any> {
    return fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
                preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        },
        body: JSON.stringify({ query }),
        next: {
            revalidate: 1,
        },
    }).then((response) => response.json());
}
