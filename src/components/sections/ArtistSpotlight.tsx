import { Spotlight } from '@/types';
import ArtistSpotlight from '../spotlight/ArtistSpotlight';
import SectionWrapper from '../layout/SectionWrapper';

interface ArtistSpotlightProps {
    spotlights: Spotlight[];
}

export const ArtistSpotlights = ({ spotlights }: ArtistSpotlightProps) => {
    return (
        <SectionWrapper className='md:pb-32 pb-24'>
            <h2 className="text-2xl font-semibold mb-6 md:px-24">Artist Spotlight</h2>
            <ArtistSpotlight spotlights={spotlights} />
        </SectionWrapper>
    );
};
