'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (page: number) => {
        router.push('?' + createQueryString('page', page.toString()));
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            buttons.push(
                <button
                    key="1"
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 border-2 border-accent hover:bg-accent/10"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="start-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 border-2 transition-colors ${
                        i === currentPage
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-accent hover:bg-accent/10'
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="end-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 border-2 border-accent hover:bg-accent/10"
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-center gap-2 items-center">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border-2 border-accent hover:bg-accent/10 disabled:opacity-50 disabled:hover:bg-transparent"
            >
                Previous
            </button>
            {renderPageButtons()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border-2 border-accent hover:bg-accent/10 disabled:opacity-50 disabled:hover:bg-transparent"
            >
                Next
            </button>
        </div>
    );
}
