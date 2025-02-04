import Image from 'next/image';
import { getSocialLinkMeta } from '@/lib/constants';

interface ChartItemProps {
    item: string;
    position: number;
}

export const ChartItem = ({ item, position }: ChartItemProps) => {
    const { title, subtitle, links } = getMetaData(item);

    return (
        <div className="flex items-center gap-4 p-3 hover:translate-x-1 transition-transform">
            <span className="text-2xl font-bold w-12 h-12 flex text-white items-center justify-center bg-red-700">
                {position.toString()}
            </span>
            <div className="flex-grow">
                <h4 className="font-medium line-clamp-1 text-gray-500">{title}</h4>
                <p className="line-clamp-1 text-gray-400">{subtitle}</p>
            </div>
            <div className="flex flex-row gap-2">
                {links.map((link) => {
                    const meta = getSocialLinkMeta(link);
                    return (
                        <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-primary flex items-center gap-2"
                        >
                            <Image src={meta.icon} width={24} height={24} className="h-4" alt={meta.label} />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

function getMetaData(item: string) {
    // item is of the format "title - subtitle [link-1] [link-2] ..."
    // remove links from subtitle
    // return { title, subtitle, links }
    const textArr = item.split(' - ');
    const title = textArr[0];
    const subtitle = textArr[1].split(' [')[0];
    const _links = textArr[1].match(/\[(.*?)\]/g) || [];
    const links = _links.map((link) => link.replace(/\[|\]/g, ''));

    return { title, subtitle, links };
}
