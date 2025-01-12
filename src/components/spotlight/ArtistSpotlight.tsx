import { Spotlight } from '@/types';
import { FC } from 'react';

export interface ArtistSpotlightProps {
    spotlights: Spotlight[];
}

const ArtistSpotlight: FC<ArtistSpotlightProps> = (props) => {
    const { spotlights } = props;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {spotlights.map((spotlight) => {
                const artist = spotlight.artist;
                return (
                    <div key={spotlight.id} className="bg-gray-100 p-4 rounded-lg grid grid-cols-5 gap-10">
                        <img
                            src={spotlight.image}
                            alt={spotlight.title}
                            className="aspect-square object-cover rounded-lg col-span-2"
                        />
                        <div className="mt-4 col-span-3 space-y-2">
                            <div>
                                <h5 className="text-sm font-bold">{artist.name}</h5>
                                <div className="text-sm text-gray-500">{artist.genre.join(', ')}</div>
                                <div className="text-sm text-gray-500">
                                    {new Date(spotlight.date).toLocaleDateString()}
                                </div>
                            </div>
                            <h4 className="font-semibold mt-4">{spotlight.title}</h4>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ArtistSpotlight;
