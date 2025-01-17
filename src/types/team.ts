import { BaseQuery, ContentfulResponse, Image } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TeamMembersQuery extends BaseQuery {}

export enum TeamMembersSort {
    TITLE_DESC = 'name_DESC',
    TITLE_ASC = 'name_ASC',
}

export interface TeamMembersFilters {
    category?: string[];
    search?: string;
    sort?: TeamMembersSort;
    page?: number;
    perPage?: number;
}

export interface TeamMembersResponse extends ContentfulResponse {
    name: string;
    // about: {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     json: any;
    // };
    dateOfBirth?: string;
    slug: string;
    // searchText: string | null;
    profileImage?: Image;
    // socialLinks: any[];
    shortDescription: string | null;
    role: string;
}

export interface TeamMember {
    id: string;
    name: string;
    slug: string;
    image?: string;
    role?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: string;
    tags: string[];
}

export interface TeamMembersSearchParams extends Record<string, string | string[] | undefined> {
    category?: string | string[];
    search?: string;
    sort?: TeamMembersSort;
    page?: string;
    perPage?: string;
}
