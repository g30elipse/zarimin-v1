export * from './news';
export * from './shorts';
export * from './artists';

export interface PageProps {
    params: Record<string, any>;
    searchParams: Record<string, any>;
}

export interface BaseQuery {
    query: string;
    page: number;
    sort?: string;
    limit?: number;
    // category?: string;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    albumCover: string;
    duration: string;
    streams: number;
}

export interface Tag {
    id: string;
    name: string;
}

export interface Image {
    url: string;
    width: number;
    height: number;
}

export interface Chart {
    id: string;
    title: string;
    type: 'local' | 'global' | 'upcoming';
    songs: Song[];
}
