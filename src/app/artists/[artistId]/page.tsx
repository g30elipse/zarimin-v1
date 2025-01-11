import { getArtistById } from '@/lib/api/base';
import { notFound } from 'next/navigation';

interface ArtistPageProps {
    params: Promise<{
        artistId: string;
    }>;
}

// function get

export default async function ArtistPage({ params }: ArtistPageProps) {
    const { artistId } = await params;
    const artist = await getArtistById(artistId);

    if (!artist) {
        notFound();
    }

    return (
        <main className="min-h-screen p-4 md:p-8">
            <article className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="relative h-64 md:h-96 mb-8">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">{artist.name}</h1>
                </div>

                {/* Artist Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="boxy-card p-6">
                            <h2 className="text-2xl font-bold mb-4">About</h2>
                            <p className="text-gray-600">{artist.bio}</p>
                        </div>

                        {/* Popular Songs */}
                        {artist.popularSongs && (
                            <div className="boxy-card p-6">
                                <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
                                <div className="space-y-4">
                                    {artist.popularSongs.map((song, index) => (
                                        <div
                                            key={song.id}
                                            className="flex items-center gap-4 p-3 hover:bg-secondary border-2 
                               border-transparent hover:border-border transition-colors"
                                        >
                                            <span className="text-lg font-bold w-8">{index + 1}</span>
                                            <img
                                                src={song.albumCover}
                                                alt={song.title}
                                                className="w-12 h-12 object-cover"
                                            />
                                            <div>
                                                <h3 className="font-bold">{song.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {song.streams.toLocaleString()} streams
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <div className="boxy-card p-6">
                            <h2 className="text-xl font-bold mb-4">Genres</h2>
                            <div className="flex flex-wrap gap-2">
                                {artist.genre.map((g) => (
                                    <span key={g} className="text-sm border-2 border-secondary bg-secondary px-3 py-1">
                                        {g}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </article>
        </main>
    );
}
