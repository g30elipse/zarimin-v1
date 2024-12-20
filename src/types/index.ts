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
    content: string;
    coverImage: string;
    date: string;
    author: string;
    category: string[];
}

export interface Chart {
    id: string;
    title: string;
    type: 'local' | 'global' | 'upcoming';
    songs: Song[];
}
