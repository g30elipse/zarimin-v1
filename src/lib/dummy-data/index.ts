import { Artist, Song, News, Chart } from '@/types';

export const dummyArtists: Artist[] = [
    {
        id: '1',
        name: 'Bodo Waves',
        image: '/artists/artist1.jpg',
        bio: 'Pioneering fusion artist combining traditional Bodo music with modern elements',
        genre: ['Fusion', 'Traditional'],
        popularSongs: [
            {
                id: 's1',
                title: 'Modern Roots',
                artist: 'Bodo Waves',
                albumCover: '/albums/album1.jpg',
                duration: '3:45',
                streams: 150000,
            },
        ],
    },
    // Add more dummy artists...
];

export const dummySongs: Song[] = [
    {
        id: 's1',
        title: 'Modern Roots',
        artist: 'Bodo Waves',
        albumCover: '/albums/album1.jpg',
        duration: '3:45',
        streams: 150000,
    },
    // Add more dummy songs...
];

export const dummyNews: News[] = [
    {
        id: 'n1',
        title: 'Rising Star Takes Bodo Music Scene by Storm',
        excerpt: 'New artist fusion of traditional and modern music captures audience attention',
        content: 'Full article content here...',
        coverImage: '/news/news1.jpg',
        date: '2024-03-20',
        author: 'Music Editor',
        category: ['Local', 'Artist Spotlight'],
    },
    // Add more dummy news...
];

export const dummyCharts: Chart[] = [
    {
        id: 'c1',
        title: 'Top 10 Local',
        type: 'local',
        songs: dummySongs.slice(0, 10),
    },
    {
        id: 'c2',
        title: 'Top 10 Global',
        type: 'global',
        songs: dummySongs.slice(0, 10),
    },
    {
        id: 'c3',
        title: 'Top 5 Local Artists',
        type: 'local',
        songs: dummySongs.slice(0, 5),
    },
    {
        id: 'c4',
        title: 'Top 5 Upcoming Artists',
        type: 'upcoming',
        songs: dummySongs.slice(0, 5),
    },
];
