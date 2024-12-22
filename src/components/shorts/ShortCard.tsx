import { ShortContent } from '../../types/shorts';

interface ShortCardProps {
    content: ShortContent;
}

export function ShortCard({ content }: ShortCardProps) {
    return (
        <div className="relative aspect-[3/4] group cursor-pointer overflow-hidden">
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
                <p className="text-md font-medium mb-4 line-clamp-5">{content.text}</p>

                <div className="flex items-center justify-between text-sm text-white/80">
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
