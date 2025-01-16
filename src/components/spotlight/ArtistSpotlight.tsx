import { Spotlight } from '@/types';
import { FC } from 'react';
import SpotlightCard from './SpotlightCard';

export interface ArtistSpotlightProps {
    spotlights: Spotlight[];
}

const ArtistSpotlight: FC<ArtistSpotlightProps> = (props) => {
    const { spotlights } = props;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
            {spotlights.map((spotlight) => (
                <SpotlightCard key={spotlight.id} spotlight={spotlight} />
            ))}
        </div>
    );
};

export default ArtistSpotlight;
