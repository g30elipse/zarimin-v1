import { eventsApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Clock, Ticket, ExternalLink, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Metadata } from 'next';
import { ServerPageProps, TicketStatus } from '@/types';

interface EventPageParams {
  eventSlug: string;
}

export async function generateMetadata({ params }: ServerPageProps<{}, EventPageParams>): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await eventsApi.getEventBySlug(resolvedParams.eventSlug);

  if (!event) {
    return {
      title: 'Event Not Found - ZARIMIN',
    };
  }

  return {
    title: `${event.title} - ZARIMIN Events`,
    description: event.excerpt || `Join us for ${event.title} at ${event.venue}, ${event.city}`,
    openGraph: {
      title: event.title,
      description: event.excerpt || `Join us for ${event.title}`,
      images: [
        {
          url: event.image.url,
          width: event.image.width,
          height: event.image.height,
          alt: event.title,
        },
      ],
    },
    keywords: [event.title, event.city, event.venue, ...event.eventType, 'ZARIMIN events'],
  };
}

export default async function EventDetailPage({ params }: ServerPageProps<{}, EventPageParams>) {
  const resolvedParams = await params;
  const event = await eventsApi.getEventBySlug(resolvedParams.eventSlug);

  if (!event) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return '';
    return timeStr;
  };

  const getTicketBadgeColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.FREE:
        return 'bg-green-500 hover:bg-green-600';
      case TicketStatus.SOLD_OUT:
        return 'bg-red-500 hover:bg-red-600';
      case TicketStatus.AVAILABLE:
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full">
        <Image src={event.image.url} alt={event.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Floating Event Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.eventType.map((type, index) => (
                <Badge key={index} variant="outline" className="bg-white/90 text-black border-none">
                  {type}
                </Badge>
              ))}
              {event.featured && (
                <Badge className="bg-orange-500 text-white border-none">Featured Event</Badge>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{event.title}</h1>
            {event.organizer && (
              <p className="text-white/90 text-lg">
                Organized by <span className="font-semibold">{event.organizer}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <div className="prose prose-lg max-w-none">
                  {documentToReactComponents(event.description.json)}
                </div>
              </CardContent>
            </Card>

            {/* Lineup */}
            {event.lineup && event.lineup.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    Lineup
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {event.lineup.map((artist, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {artist.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{artist}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Event Details */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Event Details</h3>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{formatDate(event.startDate)}</p>
                      {event.endDate && event.endDate !== event.startDate && (
                        <p className="text-sm text-gray-600">to {formatDate(event.endDate)}</p>
                      )}
                    </div>
                  </div>

                  {/* Time */}
                  {event.startTime && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">{event.venue}</p>
                      {event.address && <p className="text-sm text-gray-600">{event.address}</p>}
                      <p className="text-sm text-gray-600">{event.city}</p>
                      {event.region && <p className="text-sm text-gray-600">{event.region}</p>}
                    </div>
                  </div>

                  {/* Ticket Info */}
                  <div className="flex items-start gap-3">
                    <Ticket className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {event.ticketStatus === TicketStatus.FREE
                          ? 'Free Entry'
                          : event.ticketStatus === TicketStatus.SOLD_OUT
                            ? 'Sold Out'
                            : event.ticketPrice || 'Tickets Available'}
                      </p>
                    </div>
                  </div>

                  {/* Capacity */}
                  {event.capacity && (
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Capacity: <span className="font-semibold">{event.capacity} people</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ticket CTA */}
              {event.ticketLink && event.ticketStatus !== TicketStatus.SOLD_OUT && (
                <a
                  href={event.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full ${getTicketBadgeColor(
                    event.ticketStatus
                  )} text-white text-center py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2`}
                >
                  <Ticket className="w-5 h-5" />
                  Get Tickets
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Add to Calendar */}
              <button className="w-full border-2 border-gray-300 hover:border-orange-500 text-gray-900 hover:text-orange-500 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

