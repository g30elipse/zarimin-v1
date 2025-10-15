import { Event } from '@/types/events';
import { EventCard } from '@/components/events/EventCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface UpcomingEventsProps {
  events: Event[];
}

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  if (events.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Upcoming Events</h2>
          <p className="text-gray-600 mt-2">Don't miss out on these exciting events</p>
        </div>
        <Link
          href="/events"
          className="hidden md:flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
        >
          View All Events
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="flex justify-center md:hidden">
        <Link
          href="/events"
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
        >
          View All Events
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

