import { Artist } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

interface ArtistCardProps {
    artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
    return (
        <Link href={`/artists/${artist.id}`} className="block">
            <Card className="overflow-hidden">
                <div className="relative h-48">
                    <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                    <h3 className="text-lg font-semibold">{artist.name}</h3>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {artist.genre.map((g) => (
                            <span key={g} className="text-xs bg-primary text-white px-2 py-1 rounded">
                                {g}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
