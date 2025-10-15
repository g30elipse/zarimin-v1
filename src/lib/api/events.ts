import { Event, EventFilters, EventSort, EventStatus } from '@/types/events';
import { parseEvent } from '../parsers';
import { fetchGraphQL } from './base';

const EVENT_GRAPHQL_FIELDS = `
  title
  slug
  image {
    url
    width
    height
  }
  description {
    json
  }
  excerpt
  startDate
  endDate
  startTime
  endTime
  venue
  address
  city
  region
  eventType
  lineup
  organizer
  ticketPrice
  ticketLink
  ticketStatus
  featured
  sys {
    id
    publishedAt
  }
  contentfulMetadata {
    tags {
      id
      name
    }
  }
`;

function buildEventFilter(_query: EventFilters): string {
  const query = {
    ..._query,
    page: _query.page ?? 1,
    perPage: _query.perPage ?? 12,
  };

  const limit = query.perPage ?? 12;
  const skip = (query.page - 1) * limit;
  const filterStringArr: string[] = [];

  // Search filter
  if (query.search) {
    filterStringArr.push(`OR: [ 
            { title_contains: "${query.search}" }, 
            { city_contains: "${query.search}" },
            { venue_contains: "${query.search}" },
            { organizer_contains: "${query.search}" }
        ]`);
  }

  // Event type filter
  if (query.eventType && query.eventType.length > 0) {
    filterStringArr.push(`eventType_contains_some: [${query.eventType.map((t) => `"${t}"`).join(', ')}]`);
  }

  // City filter
  if (query.city) {
    filterStringArr.push(`city_contains: "${query.city}"`);
  }

  // Featured filter
  if (query.featured !== undefined) {
    filterStringArr.push(`featured: ${query.featured}`);
  }

  // Date range filter - only show upcoming events by default
  const now = new Date().toISOString();
  if (query.status === EventStatus.PAST) {
    filterStringArr.push(`startDate_lt: "${now}"`);
  } else if (query.status === EventStatus.UPCOMING || query.status === undefined) {
    filterStringArr.push(`startDate_gte: "${now}"`);
  }

  // Custom date range
  if (query.startDateFrom) {
    filterStringArr.push(`startDate_gte: "${query.startDateFrom}"`);
  }
  if (query.startDateTo) {
    filterStringArr.push(`startDate_lte: "${query.startDateTo}"`);
  }

  console.log('Event filterStringArr', filterStringArr);

  return `where: { ${filterStringArr.join(', ')} }, skip: ${skip}, limit: ${limit}, order: ${query.sort ?? EventSort.DATE_ASC
    }`;
}

export const eventsApi = {
  // Get all events with filters
  getAllEvents: async (query: EventFilters): Promise<Event[]> => {
    const entries = await fetchGraphQL(
      `query {
            eventCollection(${buildEventFilter(query)}) {
              items {
                ${EVENT_GRAPHQL_FIELDS}
              }
            }
          }`
    );

    return (entries?.data?.eventCollection?.items || []).map(parseEvent);
  },

  // Get upcoming events (homepage)
  getUpcomingEvents: async (limit: number = 4): Promise<Event[]> => {
    const now = new Date().toISOString();
    const entries = await fetchGraphQL(
      `query {
            eventCollection(
              where: { startDate_gte: "${now}" }, 
              order: ${EventSort.DATE_ASC}, 
              limit: ${limit}
            ) {
              items {
                ${EVENT_GRAPHQL_FIELDS}
              }
            }
          }`
    );

    return (entries?.data?.eventCollection?.items || []).map(parseEvent);
  },

  // Get featured events
  getFeaturedEvents: async (limit: number = 3): Promise<Event[]> => {
    const now = new Date().toISOString();
    const entries = await fetchGraphQL(
      `query {
            eventCollection(
              where: { featured: true, startDate_gte: "${now}" }, 
              order: ${EventSort.DATE_ASC}, 
              limit: ${limit}
            ) {
              items {
                ${EVENT_GRAPHQL_FIELDS}
              }
            }
          }`
    );

    return (entries?.data?.eventCollection?.items || []).map(parseEvent);
  },

  // Get event by slug
  getEventBySlug: async (slug: string): Promise<Event | null> => {
    const entry = await fetchGraphQL(
      `query {
            eventCollection(where: { slug: "${slug}" }, limit: 1) {
              items {
                ${EVENT_GRAPHQL_FIELDS}
              }
            }
          }`
    );

    return entry?.data?.eventCollection?.items?.[0] ? parseEvent(entry.data.eventCollection.items[0]) : null;
  },

  // Get event by ID
  getEventById: async (id: string): Promise<Event | null> => {
    const entry = await fetchGraphQL(
      `query {
            event(id: "${id}") {
              ${EVENT_GRAPHQL_FIELDS}
            }
          }`
    );

    return entry?.data?.event ? parseEvent(entry.data.event) : null;
  },

  // Get events by city
  getEventsByCity: async (city: string, limit: number = 10): Promise<Event[]> => {
    const now = new Date().toISOString();
    const entries = await fetchGraphQL(
      `query {
            eventCollection(
              where: { city: "${city}", startDate_gte: "${now}" }, 
              order: ${EventSort.DATE_ASC}, 
              limit: ${limit}
            ) {
              items {
                ${EVENT_GRAPHQL_FIELDS}
              }
            }
          }`
    );

    return (entries?.data?.eventCollection?.items || []).map(parseEvent);
  },

  // Get total events count
  getTotalEvents: async (): Promise<number> => {
    const entries = await fetchGraphQL(
      `query {
            eventCollection {
              total
            }
          }`
    );
    return entries?.data?.eventCollection?.total || 0;
  },
};

