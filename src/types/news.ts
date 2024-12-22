export type NewsSort = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export interface NewsFilters {
    category?: string[];
    author?: string;
    search?: string;
    sort?: NewsSort;
    page?: number;
    perPage?: number;
}

export interface NewsSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    author?: string;
    search?: string;
    sort?: NewsSort;
    page?: string;
    perPage?: string;
}
