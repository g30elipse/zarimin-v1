'use client';

import { SearchBar } from '@/components/common/SearchBar';
import { EventFilter } from '@/components/events/EventFilter';
import { EventStatus } from '@/types/events';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export const EventSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const types = searchParams.get('types');
    return types ? types.split(',') : [];
  });
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | 'all'>(() => {
    return (searchParams.get('status') as EventStatus) || 'all';
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedTypes.length > 0) params.set('types', selectedTypes.join(','));
    if (selectedStatus && selectedStatus !== 'all') params.set('status', selectedStatus);

    const currentPage = searchParams.get('page');
    if (currentPage) params.set('page', currentPage);

    router.push(`/events?${params.toString()}`);
  }, [search, selectedTypes, selectedStatus]);

  return (
    <div className="space-y-6">
      <SearchBar value={search} onChange={setSearch} placeholder="Search events by name, venue, or city..." />
      <EventFilter
        selectedTypes={selectedTypes}
        selectedStatus={selectedStatus}
        onTypeChange={setSelectedTypes}
        onStatusChange={setSelectedStatus}
      />
    </div>
  );
};

