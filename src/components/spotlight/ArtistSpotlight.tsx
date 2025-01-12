import { FC } from 'react';

export interface ArtistSpotlightProps {}

const ArtistSpotlight: FC<ArtistSpotlightProps> = (props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((short) => (
                <div className="relative aspect-[3/4] group cursor-pointer overflow-hidden">
                    {/* Image */}
                    <img
                        src="https://via.placeholder.com/300"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <p className="mb-4 text-md font-medium line-clamp-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor, felis nec fauc
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArtistSpotlight;
