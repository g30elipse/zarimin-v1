export * from './news';
export * from './shorts';

export interface PageProps {
    params: Record<string, any>;
    searchParams: Record<string, any>;
}

export interface Artist {
    id: string;
    name: string;
    image: string;
    bio: string;
    genre: string[];
    popularSongs?: Song[];
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    albumCover: string;
    duration: string;
    streams: number;
}

export interface News {
    id: string;
    title: string;
    excerpt: string;
    content: any;
    coverImage: string;
    date: string;
    author: string;
    category: string[];
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

export interface NewsResponse {
    author: string;
    content: {
        json: any;
    };
    contentfulMetadata: {
        tags: Tag[];
    };
    createdAt: string;
    heading: string;
    slug: string;
    searchText: string | null;
    image: Image;
}

export interface Chart {
    id: string;
    title: string;
    type: 'local' | 'global' | 'upcoming';
    songs: Song[];
}
