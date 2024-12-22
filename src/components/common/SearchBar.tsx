'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';
    const [search, setSearch] = useState(initialSearch);

    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === null || value === '') {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    // Debounce the search to avoid too many URL updates
    useDebounce(
        () => {
            if (search !== initialSearch) {
                const newQueryString = createQueryString('search', search || null);
                router.push(`?${newQueryString}`);
            }
        },
        500,
        [search]
    );

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border-2 border-accent bg-background 
                          focus:border-primary outline-none transition-colors"
            />
        </div>
    );
}
