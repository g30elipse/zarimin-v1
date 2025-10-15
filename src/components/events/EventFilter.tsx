'use client';

import { EventType, EventStatus } from '@/types/events';
import { Badge } from '@/components/ui/badge';

interface EventFilterProps {
  selectedTypes: string[];
  selectedStatus: EventStatus | 'all';
  onTypeChange: (types: string[]) => void;
  onStatusChange: (status: EventStatus | 'all') => void;
}

const EVENT_TYPES = Object.values(EventType);
const EVENT_STATUSES = [
  { value: 'all', label: 'All Events' },
  { value: EventStatus.UPCOMING, label: 'Upcoming' },
  { value: EventStatus.PAST, label: 'Past Events' },
];

export const EventFilter = ({ selectedTypes, selectedStatus, onTypeChange, onStatusChange }: EventFilterProps) => {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeChange([...selectedTypes, type]);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border border-gray-200">
      {/* Status Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Event Status</h3>
        <div className="flex flex-wrap gap-2">
          {EVENT_STATUSES.map((status) => (
            <Badge
              key={status.value}
              variant={selectedStatus === status.value ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => onStatusChange(status.value as EventStatus | 'all')}
            >
              {status.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Event Type Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Event Type</h3>
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((type) => (
            <Badge
              key={type}
              variant={selectedTypes.includes(type) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleType(type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedTypes.length > 0 || selectedStatus !== 'all') && (
        <button
          onClick={() => {
            onTypeChange([]);
            onStatusChange('all');
          }}
          className="text-sm text-orange-600 hover:text-orange-700 font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

