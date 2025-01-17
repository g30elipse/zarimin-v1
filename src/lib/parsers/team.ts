import { TeamMember, TeamMembersResponse } from '@/types/team';

export function parseTeamMember(teamMember: TeamMembersResponse): TeamMember {
    return {
        id: teamMember.slug,
        name: teamMember.name,
        image: teamMember.profileImage?.url,
        role: teamMember.role,
        bio: teamMember.shortDescription ?? '',
        tags: teamMember.contentfulMetadata.tags.map((tag) => tag.name),
        slug: teamMember.slug,
    };
}
