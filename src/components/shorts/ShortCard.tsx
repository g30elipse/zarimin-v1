import { twJoin, twMerge } from 'tailwind-merge';
import { Short } from '../../types/shorts';

interface ShortCardProps {
    content: Short;
    className?: string;
    variant?: 'default' | 'compact';
}

const FONT_SIZE_MAP = {
    default: 'text-md font-medium line-clamp-5',
    compact: 'text-sm font-normal line-clamp-3',
};

export function ShortCard({ content, className, variant = 'default' }: ShortCardProps) {
    return (
        <div className={twMerge('relative aspect-shorts group cursor-pointer overflow-hidden', className)}>
            {/* Image */}
            <img
                src={content.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className={twJoin('mb-4', FONT_SIZE_MAP[variant])}>{content.text}</p>

                <div className={twJoin('flex items-center justify-between text-white/80', FONT_SIZE_MAP[variant])}>
                    <div className="flex items-center gap-4">
                        <span>{content.author}</span>
                        <span>•</span>
                        <time dateTime={content.date}>{new Date(content.date).toLocaleDateString()}</time>
                    </div>
                </div>
            </div>
        </div>
    );
}
