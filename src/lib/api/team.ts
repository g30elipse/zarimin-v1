import { fetchGraphQL } from '.';
import { parseTeamMember } from '../parsers';
import { TeamMember, TeamMembersFilters, TeamMembersSort } from '@/types';

const TEAM_GRAPHQL_FIELDS = `
  name
  profileImage {
    url
    width
    height
  }
  shortDescription
    dateOfBirth
  slug
   contentfulMetadata {
        tags {
            id
            name
        }
      }
  
`;

function buildArtistsFilter(_query: TeamMembersFilters): string {
    const query = {
        ..._query,
        page: _query.page ?? 1,
        perPage: _query.perPage ?? 5,
        // limit: _query.perPage ?? 24,
    };

    const limit = query.perPage ?? 24;
    const skip = (query.page - 1) * limit;
    let filterString = '';

    if (query.search) {
        filterString = `OR: [ 
            { name_contains: "${query.search}" }, 
        ]`;
    }
    return `where: { ${filterString} }, skip: ${skip}, limit: ${limit}, order: ${
        query.sort ?? TeamMembersSort.TITLE_ASC
    }`;
}

export const teamApi = {
    searchTeamMembers: async (query: TeamMembersFilters): Promise<TeamMember[]> => {
        const entries = await fetchGraphQL(
            `query {
                teamCollection(${buildArtistsFilter(query)}) {
                  items {
                    ${TEAM_GRAPHQL_FIELDS}
                  }
                }
                }`
        );

        return (entries?.data?.teamCollection?.items || []).map(parseTeamMember);
    },

    getTeamMemberById: async (id: string): Promise<TeamMember | null> => {
        const entry = await fetchGraphQL(
            `query {
                teamCollection(where: { slug: "${id}", }, limit: 1) {
                  items {
                    ${TEAM_GRAPHQL_FIELDS}
                  }
                }
              }`
        );
        return parseTeamMember(entry?.data?.artistCollection?.items?.[0]);
    },
};
