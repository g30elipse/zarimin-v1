'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { NewsSort } from '@/types/news';

interface NewsFiltersProps {
    categories: string[];
    authors: string[];
}

export function NewsFilters({ categories, authors }: NewsFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string | string[] | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null) {
                params.delete(name);
            } else if (Array.isArray(value)) {
                params.delete(name);
                value.forEach((v) => params.append(name, v));
            } else {
                params.set(name, value);
            }

            return params.toString();
        },
        [searchParams]
    );

    const currentCategories = searchParams.getAll('category');
    const currentAuthor = searchParams.get('author');
    const currentSort = searchParams.get('sort') as NewsSort;

    const handleCategoryChange = (category: string) => {
        let newCategories: string[];
        if (currentCategories.includes(category)) {
            newCategories = currentCategories.filter((c) => c !== category);
        } else {
            newCategories = [...currentCategories, category];
        }
        router.push('?' + createQueryString('category', newCategories.length ? newCategories : null));
    };

    const handleSortChange = (sort: NewsSort) => {
        router.push('?' + createQueryString('sort', sort));
    };

    const handleAuthorChange = (author: string) => {
        router.push('?' + createQueryString('author', author === currentAuthor ? null : author));
    };

    return (
        <div className="space-y-6 p-6 bg-secondary/50 border-2 border-accent">
            {/* Categories */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            className={`px-3 py-1 border-2 text-sm transition-colors ${
                                currentCategories.includes(category)
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-accent bg-transparent hover:bg-accent/10'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Authors */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Authors</h3>
                <div className="flex flex-wrap gap-2">
                    {authors.map((author) => (
                        <button
                            key={author}
                            onClick={() => handleAuthorChange(author)}
                            className={`px-3 py-1 border-2 text-sm transition-colors ${
                                author === currentAuthor
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-accent bg-transparent hover:bg-accent/10'
                            }`}
                        >
                            {author}
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort */}
            <div>
                <h3 className="text-lg font-semibold mb-3">Sort By</h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        { value: 'date-desc', label: 'Newest First' },
                        { value: 'date-asc', label: 'Oldest First' },
                        { value: 'title-asc', label: 'Title A-Z' },
                        { value: 'title-desc', label: 'Title Z-A' },
                    ].map((sort) => (
                        <button
                            key={sort.value}
                            onClick={() => handleSortChange(sort.value as NewsSort)}
                            className={`px-3 py-1 border-2 text-sm transition-colors ${
                                sort.value === currentSort
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-accent bg-transparent hover:bg-accent/10'
                            }`}
                        >
                            {sort.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
