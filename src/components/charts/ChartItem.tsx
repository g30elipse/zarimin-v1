interface ChartItemProps {
    item: string;
    position: number;
}

export const ChartItem = ({ item, position }: ChartItemProps) => {
    return (
        <div className="flex items-center gap-4 p-3 transition-colors">
            <span className="text-2xl font-bold w-10 h-10 flex text-white items-center justify-center bg-red-700">
                {position}
            </span>
            <div className="flex-grow">
                <h4 className="font-medium line-clamp-1 text-gray-500">{item}</h4>
            </div>
        </div>
    );
};
