import { ContentfulEvent, Event, EventStatus, TicketStatus } from '@/types/events';

export const parseEvent = (event: ContentfulEvent): Event => {
  // Determine event status based on dates
  const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : startDate;

  let status = EventStatus.UPCOMING;
  if (now > endDate) {
    status = EventStatus.PAST;
  } else if (now >= startDate && now <= endDate) {
    status = EventStatus.ONGOING;
  }

  return {
    id: event.sys.id,
    slug: event.slug,
    title: event.title,
    description: event.description,
    image: event.image,
    excerpt: event.excerpt,
    startDate: event.startDate,
    endDate: event.endDate,
    startTime: event.startTime,
    endTime: event.endTime,
    venue: event.venue,
    address: event.address,
    city: event.city,
    region: event.region,
    eventType: event.eventType as any[],
    lineup: event.lineup,
    organizer: event.organizer,
    ticketPrice: event.ticketPrice,
    ticketLink: event.ticketLink,
    ticketStatus: (event.ticketStatus as TicketStatus) || TicketStatus.AVAILABLE,
    featured: event.featured || false,
    status,
    tags: event.contentfulMetadata?.tags || [],
    createdAt: event.sys.publishedAt,
  };
};

