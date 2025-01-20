'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ArtistsSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get('search') || '';
    const [searchText, setSearchText] = useState(search);

    useEffect(() => {
        setSearchText(search);
    }, [search]);

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const updateUrl = (search: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('search', search);
        router.push(url.toString());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateUrl(searchText);
    };

    return (
        <form className="relative md:shadow-md w-full md:w-1/3" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search artists..."
                value={searchText}
                onChange={handleSearchTextChange}
                className="w-full px-4 py-2 border border-accent bg-background 
                focus:border-primary outline-none transition-colors"
            />
            <button
                type="submit"
                onClick={() => updateUrl(searchText)}
                className="absolute inset-y-0 right-0 px-4 py-2 bg-primary text-primary-foreground shadow-md hover:bg-secondary-foreground transition-colors"
            >
                Search
            </button>
        </form>
    );
}

export default ArtistsSearch;
