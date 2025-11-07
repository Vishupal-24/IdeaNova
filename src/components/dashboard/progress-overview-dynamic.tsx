'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const ProgressOverview = dynamic(() => import('@/components/dashboard/progress-overview').then(mod => mod.ProgressOverview), {
  ssr: false,
  loading: () => <Skeleton className="h-[350px] w-full" />,
});

export function ProgressOverviewDynamic() {
    return <ProgressOverview />;
}
