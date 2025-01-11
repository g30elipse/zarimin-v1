import { Short } from '../../types/shorts';
import { ShortCard } from '../shorts/ShortCard';
import SectionWrapper from '../layout/SectionWrapper';
import Link from 'next/link';

interface LatestShortsProps {
    shorts: Short[];
}

export function LatestShorts({ shorts }: LatestShortsProps) {
    return (
        <SectionWrapper>
            <div className="flex items-center justify-between mb-8">
                {/* <h2 className="text-2xl font-semibol mb-6d">Latest Shorts</h2> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12 md:px-24">
                {shorts.slice(0, 1).map((short) => {
                    return <ShortCard className="col-span-1" key={short.id} content={short} />;
                })}
                <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 grid grid-cols-2 gap-6">
                    {shorts.slice(1, 4).map((short) => {
                        return <ShortCard variant="compact" key={short.id} content={short} />;
                    })}
                </div>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {shorts.map((short) => (
                    <ShortCard key={short.id} content={short} />
                ))}
            </div> */}
            <div className="flex justify-start md:pl-24">
                <Link
                    href="/shorts"
                    className="text-sm px-4 py-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                    Check Out More
                </Link>
            </div>
        </SectionWrapper>
    );
}
