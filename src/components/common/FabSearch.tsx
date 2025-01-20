import { CornerDownLeft, Search, X } from 'lucide-react';
import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface FabSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    onSubmit: (value: string) => void;
}

const FabSearch: FC<FabSearchProps> = (props) => {
    const { value, onChange, onSubmit, placeholder = 'Search...' } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSubmit = () => {
        handleCollapse();
        onSubmit(value);
    };

    return (
        <div className="bg-white rounded-full flex items-center justify-center  md:hidden fixed bottom-28 right-4 z-10 shadow-md">
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={twMerge(
                    'w-0 outline-none transition-width duration-300 ease-in-out rounded-full',
                    isExpanded && 'w-[60vw] px-6'
                )}
            />
            <div className="p-4 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                {isExpanded ? (
                    <button onClick={handleSubmit}>{value ? <CornerDownLeft className="" /> : <X />}</button>
                ) : (
                    <button onClick={handleExpand}>
                        <Search />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FabSearch;
