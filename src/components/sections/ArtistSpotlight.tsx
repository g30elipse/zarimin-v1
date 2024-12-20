import { Artist } from '@/types';
import { ArtistGrid } from '../artists/ArtistGrid';

interface ArtistSpotlightProps {
    artists: Artist[];
}

export const ArtistSpotlight = ({ artists }: ArtistSpotlightProps) => {
    return (
        <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Artist Spotlight</h2>
            <ArtistGrid artists={artists} />
        </section>
    );
};
