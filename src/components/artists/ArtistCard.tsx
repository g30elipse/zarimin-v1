import { Artist } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

interface ArtistCardProps {
    artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
    return (
        <Link href={`/artists/${artist.id}`} className="block hover:-translate-y-2 transition-transform">
            <Card className="overflow-hidden h-full">
                <div className="relative">
                    <img src={artist.image} alt={artist.name} className="w-full aspect-[3/4] object-cover" />
                </div>
                <CardHeader>
                    <h3 className="text-lg font-semibold">{artist.name}</h3>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {artist.genre.map((g) => (
                            <span key={g} className="text-xs bg-secondary text-gray-500 px-2 py-1">
                                {g.toUpperCase()}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
