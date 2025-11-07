// src/components/layout/app-layout-content.tsx
'use client';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobile } = useSidebar();

  return (
    <div className="flex min-h-screen w-full bg-secondary/40 dark:bg-background">
      <AppSidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 ease-in-out',
          !isMobile && (isCollapsed ? 'ml-12' : 'ml-64')
        )}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
