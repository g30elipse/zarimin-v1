import { Song } from '@/types';

interface ChartItemProps {
    song: Song;
    position: number;
}

export const ChartItem = ({ song, position }: ChartItemProps) => {
    return (
        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-lg font-bold w-8 text-gray-500">{position}</span>
            <img src={song.albumCover} alt={song.title} className="w-12 h-12 object-cover rounded" />
            <div className="flex-grow">
                <h4 className="font-medium line-clamp-1">{song.title}</h4>
                <p className="text-sm text-gray-600">{song.artist}</p>
            </div>
            <div className="text-sm text-gray-500">{song.duration}</div>
        </div>
    );
};
