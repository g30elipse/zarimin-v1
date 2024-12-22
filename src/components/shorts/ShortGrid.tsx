import { ShortContent } from '../../types/shorts';
import { ShortCard } from './ShortCard';

interface ShortGridProps {
    shorts: ShortContent[];
}

export function ShortGrid({ shorts }: ShortGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shorts.map((short) => (
                <ShortCard key={short.id} content={short} />
            ))}
        </div>
    );
}
