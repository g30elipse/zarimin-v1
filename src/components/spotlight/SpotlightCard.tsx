import { Spotlight } from '@/types';
import Link from 'next/link';
import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export interface SpotlightCardProps {
    spotlight: Spotlight;
}

const SpotlightCard: FC<SpotlightCardProps> = (props) => {
    const { spotlight } = props;
    const artist = spotlight.artist;

    return (
        <Link href={`/artists/${artist.id}`} className="block">
            <Card className="overflow-hidden h-full hover:shadow-lg flex flex-col relative">
                <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className="object-cover rounded-lg col-span-2 aspect-square"
                />
                <p className="w-full font-thin flex items-center justify-center py-1  bg-primary text-white tracking-wider uppercase">
                    {artist.name}
                </p>
                <div className="w-full flex flex-col justify-between h-full flex-1">
                    <CardHeader>
                        <CardTitle className="text-md text-gray-500">{spotlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 justify-end items-center flex gap-2 col-span-3 text-xs text-gray-500">
                        <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <h5 className="">{artist.name}</h5>
                            <div className="text-xs">{artist.genre.slice(0, 2).join(', ')}</div>
                        </div>
                    </CardContent>
                </div>
                {/* <p className="absolute top-0 flex items-center justify-center right-0 bottom-0 w-10 bg-primary text-white [writing-mode:vertical-rl] text-center">
                    SPOTLIGHT
                </p> */}
            </Card>
        </Link>
    );
};

export default SpotlightCard;
