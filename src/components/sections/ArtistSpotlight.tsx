import { Artist } from '@/types';
import { ArtistGrid } from '../artists/ArtistGrid';
import SectionWrapper from '../layout/SectionWrapper';

interface ArtistSpotlightProps {
    artists: Artist[];
}

export const ArtistSpotlight = ({ artists }: ArtistSpotlightProps) => {
    return (
        <SectionWrapper>
            <h2 className="text-2xl font-semibold mb-6">Artist Spotlight</h2>
            <ArtistGrid artists={artists} />
        </SectionWrapper>
    );
};
