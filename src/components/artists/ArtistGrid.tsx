import { Artist } from '@/types';
import { ArtistCard } from './ArtistCard';

interface ArtistGridProps {
    artists: Artist[];
}

export const ArtistGrid = ({ artists }: ArtistGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
            ))}
        </div>
    );
};
