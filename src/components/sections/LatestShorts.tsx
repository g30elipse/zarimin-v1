import { ShortContent } from '../../types/shorts';
import { ShortCard } from '../shorts/ShortCard';
import SectionWrapper from '../layout/SectionWrapper';
import Link from 'next/link';

interface LatestShortsProps {
    shorts: ShortContent[];
}

export function LatestShorts({ shorts }: LatestShortsProps) {
    return (
        <SectionWrapper>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibol mb-6d">Latest Shorts</h2>
                <Link
                    href="/shorts"
                    className="text-sm px-4 py-2 border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shorts.map((short) => (
                    <ShortCard key={short.id} content={short} />
                ))}
            </div>
        </SectionWrapper>
    );
}
