import { Image, Tag, ContentfulResponse } from './index';
import { Artist } from './artists';

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: {
    json: any;
  };
  image: Image;
  excerpt?: string;

  // Date & Time
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;

  // Location
  venue: string;
  address?: string;
  city: string;
  region?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };

  // Event Details
  eventType: EventType[];
  artists?: Artist[];
  lineup?: string[];
  organizer?: string;

  // Tickets
  ticketPrice?: string;
  ticketLink?: string;
  ticketStatus: TicketStatus;

  // Metadata
  featured: boolean;
  status: EventStatus;
  capacity?: number;
  tags: Tag[];
  createdAt: string;
  updatedAt?: string;
}

export enum EventType {
  CONCERT = 'Concert',
  FESTIVAL = 'Festival',
  WORKSHOP = 'Workshop',
  ALBUM_LAUNCH = 'Album Launch',
  MEETUP = 'Artist Meetup',
  CULTURAL = 'Cultural Event',
  AWARDS = 'Awards Show',
  OTHER = 'Other',
}

export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  PAST = 'past',
  CANCELLED = 'cancelled',
}

export enum TicketStatus {
  AVAILABLE = 'available',
  SOLD_OUT = 'sold-out',
  FREE = 'free',
}

export enum EventSort {
  DATE_ASC = 'startDate_ASC',
  DATE_DESC = 'startDate_DESC',
  CREATED_ASC = 'sys_publishedAt_ASC',
  CREATED_DESC = 'sys_publishedAt_DESC',
  TITLE_ASC = 'title_ASC',
  TITLE_DESC = 'title_DESC',
}

export interface EventFilters {
  page?: number;
  perPage?: number;
  search?: string;
  sort?: EventSort;
  eventType?: string[];
  city?: string;
  status?: EventStatus;
  featured?: boolean;
  startDateFrom?: string;
  startDateTo?: string;
}

export interface ContentfulEvent extends ContentfulResponse {
  title: string;
  slug: string;
  description: {
    json: any;
  };
  image: {
    url: string;
    width: number;
    height: number;
  };
  excerpt?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  venue: string;
  address?: string;
  city: string;
  region?: string;
  eventType: string[];
  lineup?: string[];
  organizer?: string;
  ticketPrice?: string;
  ticketLink?: string;
  ticketStatus: string;
  featured: boolean;
}

