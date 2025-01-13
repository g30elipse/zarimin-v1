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
        <Link href={`/spotlights/${spotlight.id}`} className="block">
            <Card className="overflow-hidden h-full grid grid-cols-5 hover:shadow-lg relative pr-10">
                <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className="h-full object-cover rounded-lg col-span-2"
                />
                <div className="col-span-3 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-md">{spotlight.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col col-span-3 text-xs text-gray-500">
                        <h5 className="">{artist.name}</h5>
                        <div className="text-xs">{artist.genre.join(', ')}</div>
                    </CardContent>
                </div>
                <p className="absolute top-0 flex items-center justify-center right-0 bottom-0 w-10 bg-primary text-white [writing-mode:vertical-rl] text-center">
                    SPOTLIGHT
                </p>
            </Card>
        </Link>
    );
};

export default SpotlightCard;
