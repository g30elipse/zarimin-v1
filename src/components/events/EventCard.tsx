import { Event, TicketStatus } from '@/types/events';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
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
        return 'bg-green-100 text-green-800 border-green-300';
      case TicketStatus.SOLD_OUT:
        return 'bg-red-100 text-red-800 border-red-300';
      case TicketStatus.AVAILABLE:
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Link href={`/events/${event.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full group">
        <div className="relative aspect-news overflow-hidden">
          <Image
            src={event.image.url}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {event.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-orange-500 text-white border-none">Featured</Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge className={getTicketBadgeColor(event.ticketStatus)}>
              {event.ticketStatus === TicketStatus.FREE
                ? 'Free Entry'
                : event.ticketStatus === TicketStatus.SOLD_OUT
                  ? 'Sold Out'
                  : event.ticketPrice || 'Tickets Available'}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <div className="space-y-3">
            {/* Event Type Tags */}
            <div className="flex flex-wrap gap-2">
              {event.eventType.slice(0, 2).map((type, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
              {event.title}
            </h3>

            {/* Date & Time */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div>{formatDate(event.startDate)}</div>
                {event.startTime && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {formatTime(event.startTime)}
                    {event.endTime && ` - ${formatTime(event.endTime)}`}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{event.venue}</div>
                <div className="text-xs text-gray-500">{event.city}</div>
              </div>
            </div>

            {/* Lineup Preview */}
            {event.lineup && event.lineup.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <div className="text-gray-600 truncate">
                  {event.lineup.slice(0, 2).join(', ')}
                  {event.lineup.length > 2 && ` +${event.lineup.length - 2} more`}
                </div>
              </div>
            )}

            {/* Excerpt */}
            {event.excerpt && <p className="text-sm text-gray-500 line-clamp-2">{event.excerpt}</p>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

