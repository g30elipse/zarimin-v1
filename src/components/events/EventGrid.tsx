import { Event } from '@/types/events';
import { EventCard } from './EventCard';

interface EventGridProps {
  events: Event[];
}

export const EventGrid = ({ events }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No events found</p>
        <p className="text-gray-400 text-sm mt-2">Check back later for upcoming events!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

