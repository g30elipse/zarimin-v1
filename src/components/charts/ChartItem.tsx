interface ChartItemProps {
    item: string;
    position: number;
}

export const ChartItem = ({ item, position }: ChartItemProps) => {
    const textArr = item.split(' - ');
    const title = textArr[0];
    const subtitle = textArr.slice(1).join(',');

    return (
        <div className="flex items-center gap-4 p-3 hover:translate-x-1 transition-transform">
            <span className="text-2xl font-bold w-12 h-12 flex text-white items-center justify-center bg-red-700">
                {position.toString()}
            </span>
            <div className="flex-grow">
                <h4 className="font-medium line-clamp-1 text-gray-500">{title}</h4>
                <p className="line-clamp-1 text-gray-400">{subtitle}</p>
            </div>
        </div>
    );
};
