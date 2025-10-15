import { eventsApi } from '@/lib/api';
import { EventGrid } from '@/components/events/EventGrid';
import { EventSearch } from './_search';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Pagination } from '@/components/common/Pagination';
import { EventSort, EventStatus, ServerPageProps } from '@/types';
import { Metadata } from 'next';
import { OG_IMAGE_LOGO } from '@/lib/constants';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Events - ZARIMIN',
  openGraph: {
    images: [OG_IMAGE_LOGO],
  },
  description:
    'Discover upcoming music events, concerts, festivals, and cultural gatherings in the Bodo music community.',
  keywords: ['events', 'concerts', 'festivals', 'Bodo music events', 'live music', 'ZARIMIN'],
};

interface EventsPageSearchParams {
  page?: string;
  search?: string;
  types?: string;
  status?: EventStatus;
}

export default async function EventsPage({ searchParams }: ServerPageProps<EventsPageSearchParams>) {
  const resolvedParams = await searchParams;
  const page = parseInt(resolvedParams.page || '1');
  const search = resolvedParams.search || '';
  const types = resolvedParams.types ? resolvedParams.types.split(',') : [];
  const status = resolvedParams.status;

  const events = await eventsApi.getAllEvents({
    page,
    perPage: 12,
    search,
    eventType: types,
    status,
    sort: EventSort.DATE_ASC,
  });

  const totalEvents = await eventsApi.getTotalEvents();
  const totalPages = Math.ceil(totalEvents / 12);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-72">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/banner1.JPG)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Events</h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Discover the latest concerts, festivals, and cultural events
          </p>
        </div>
      </div>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
              <EventSearch />
            </Suspense>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {events.length > 0 ? (
                  <>
                    Showing <span className="font-semibold">{events.length}</span> event
                    {events.length !== 1 ? 's' : ''}
                  </>
                ) : (
                  'No events found'
                )}
              </p>
            </div>

            {/* Events Grid */}
            <EventGrid events={events} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination currentPage={page} totalPages={totalPages} />
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

