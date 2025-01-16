export * from './news';
export * from './shorts';
export * from './artists';
export * from './spotlight';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ServerPageProps<SP = Record<string, any>, P = Record<string, any>> {
    params: Promise<P>;
    searchParams: Promise<SP>;
}

export interface GraphQlResponse<T> {
    data: T;
}

export interface GraphQlCollectionResponse<T> {
    data: {
        [key: string]: {
            items: T[];
        };
    };
}
export interface ContentfulResponse {
    sys: {
        id: string;
        publishedAt: string;
    };
    contentfulMetadata: {
        tags: Tag[];
    };
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
