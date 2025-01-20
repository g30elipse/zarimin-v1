'use client';

import FabSearch from '@/components/common/FabSearch';
import { SearchBar } from '@/components/common/SearchBar';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function NewsSearch() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get('search') || '';
    const [searchText, setSearchText] = useState(search);

    useEffect(() => {
        setSearchText(search);
    }, [search]);

    const updateUrl = (search: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('search', search);
        router.push(url.toString());
    };

    const props = {
        value: searchText,
        onChange: setSearchText,
        onSubmit: updateUrl,
        placeHolder: 'Search news...',
    };

    return (
        <>
            {/* For sm devices */}
            <FabSearch {...props} />

            {/* For md & above devices */}
            <SearchBar {...props} />
        </>
    );
}

export default NewsSearch;
