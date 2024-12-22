import { Artist, Song, News, Chart } from '@/types';
import { dummyArtists, dummySongs, dummyNews, dummyCharts } from './dummy-data';

export const getLatestNews = async (): Promise<News[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return dummyNews;
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
