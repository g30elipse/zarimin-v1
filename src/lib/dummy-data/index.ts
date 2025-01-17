import { Artist, News, Chart } from '@/types';
import { Short } from '@/types/shorts';

export const dummySongs: any[] = [
    {
        id: 's1',
        title: 'Modern Roots',
        artist: 'Bodo Waves',
        albumCover:
            'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        duration: '3:45',
        streams: 150000,
    },
    {
        id: 's2',
        title: 'Rhythms of the Past',
        artist: 'Bodo Beats',
        albumCover:
            'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        duration: '4:12',
        streams: 120000,
    },
    {
        id: 's3',
        title: 'Echoes of the Hills',
        artist: 'Bodo Echoes',
        albumCover:
            'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        duration: '3:29',
        streams: 90000,
    },
    {
        id: 's4',
        title: 'Harmony',
        artist: 'Bodo Harmony',
        albumCover:
            'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        duration: '3:59',
        streams: 80000,
    },

    // Add more dummy songs...
];

export const dummyNews: News[] = [
    {
        id: 'n1',
        title: 'Rising Star Takes Bodo Music Scene by Storm',
        excerpt: 'New artist fusion of traditional and modern music captures audience attention',
        content: 'Full article content here...',
        coverImage:
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '2024-03-20',
        author: 'Music Editor',
        category: ['Local', 'Artist Spotlight'],
    },
    {
        id: 'n2',
        title: 'Bodo Music Festival Returns for 2024',
        excerpt: 'Annual festival celebrates the best of local music and culture',
        content: 'Full article content here...',
        coverImage:
            'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        date: '2024-03-19',
        author: 'Editorial Team',
        category: ['Local', 'Events'],
    },
    // Add more dummy news...
];

export const dummyShorts: Short[] = [
    {
        id: 's1',
        text: 'Just wrapped up an amazing recording session with @BodoBeats. The fusion of traditional instruments with modern production is mind-blowing! 🎵 #BodoMusic #FusionVibes',
        image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: 'Maya Singh',
        date: '2024-03-22',
        likes: 243,
    },
    {
        id: 's2',
        text: 'Behind the scenes at the annual Bodo Music Festival. The energy here is electrifying! Traditional meets contemporary in the most beautiful way.',
        image: 'https://images.unsplash.com/photo-1458560871784-56d23406c091?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: 'Rahul Dev',
        date: '2024-03-21',
        likes: 189,
    },
    {
        id: 's3',
        text: 'Exploring the rhythms of Bodo folk music with master musicians. Every session is a learning experience. The depth of our musical heritage never ceases to amaze.',
        image: 'https://images.unsplash.com/photo-1482443462550-d2c99314ab6a?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: 'Jyoti Sharma',
        date: '2024-03-20',
        likes: 567,
    },
    {
        id: 's4',
        text: 'The Bodo Music Awards are back! Celebrating the best of local talent and creativity. Stay tuned for live updates and exclusive interviews. #BodoMusicAwards',
        image: 'https://plus.unsplash.com/premium_photo-1682125896993-12a1758b6cb3?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        author: 'Music Editor',
        date: '2024-03-19',
        likes: 312,
    },
];
