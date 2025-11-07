// src/app/(app)/layout.tsx
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppLayoutContent } from '@/components/layout/app-layout-content';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
          <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProvider>
    );
}
