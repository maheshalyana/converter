"use client";

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from './ui/skeleton';

type RateInfoProps = {
  lastUpdated: string | null; // ISO date string
  onRefresh: () => void;
  isRefreshing: boolean;
  isError: boolean;
  isOffline: boolean; // To indicate if data is stale due to offline
};

export function RateInfo({ lastUpdated, onRefresh, isRefreshing, isError, isOffline }: RateInfoProps) {
  const displayTime = lastUpdated
    ? `${formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}`
    : 'Not available';

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
      {isRefreshing && !lastUpdated ? (
        <Skeleton className="h-5 w-40" />
      ) : (
        <span>
          Last updated: {displayTime}
          {isError && <span className="text-destructive ml-2">(Error updating)</span>}
          {isOffline && !isError && <span className="text-amber-500 ml-2">(Offline, using cached rates)</span>}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
        aria-label="Refresh exchange rates"
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
}
