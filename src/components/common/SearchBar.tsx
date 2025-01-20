'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    onSubmit: (value: string) => void;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export function SearchBar(props: SearchBarProps) {
    const { onSubmit, value, onChange, placeholder = 'Search...', className } = props;

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(value);
        },
        [onSubmit, value]
    );

    return (
        <form
            className={cn('hidden md:block relative  bg-white z-10 md:shadow-md w-full', className)}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-2 border border-accent bg-background 
                focus:border-primary outline-none transition-colors"
            />
            <button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 py-2 bg-primary text-primary-foreground shadow-md hover:bg-secondary-foreground transition-colors"
            >
                Search
            </button>
        </form>
    );
}
