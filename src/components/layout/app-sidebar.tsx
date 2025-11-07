
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import {
  Bot,
  Briefcase,
  Building,
  FileText,
  GraduationCap,
  LayoutGrid,
  Map,
  Settings,
  Trophy,
  Compass,
  Lightbulb
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { PricingDialog } from '../pricing/pricing-dialog';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'guidance', label: 'Guidance', icon: Compass },
  { id: 'pathway', label: 'Career Pathway', icon: Map },
  { id: 'projects', label: 'Project Ideas', icon: Lightbulb },
  { id: 'colleges', label: 'Colleges', icon: Building },
  { id: 'internships', label: 'Internships', icon: Briefcase },
  { id: 'resume', label: 'Resume Builder', icon: FileText },
  { id: 'mentor', label: 'AI Mentor', icon: Bot },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
];

function AppSidebarComponent() {
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const { isCollapsed, setOpenMobile } = useSidebar();
  const [isPricingDialogOpen, setIsPricingDialogOpen] = React.useState(false);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // The offset is to account for the height of the fixed header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(id);
      setOpenMobile(false);
    }
  };
  
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    const sections = menuItems.map(item => item.id).concat('settings');
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            observer.observe(element);
        }
    });

    return () => {
        sections.forEach(id => {
            const element = document.getElementById(id);
            if(element) {
                observer.unobserve(element);
            }
        });
    };
  }, []);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <GraduationCap className="size-6 shrink-0 text-primary-foreground" />
            </div>
            <h1
              className={cn(
                'text-xl font-headline font-bold text-sidebar-foreground truncate transition-opacity',
                isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              )}
            >
              CareerLeap
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-grow">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => handleScrollTo(item.id)}
                  isActive={activeSection === item.id}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2 space-y-2">
            <SidebarMenuItem>
              <SidebarMenuButton
                  onClick={() => handleScrollTo('settings')}
                  isActive={activeSection === 'settings'}
                  icon={<Settings />}
                  tooltip={'Settings'}
              >
                  Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Button
              variant={'default'}
              className={cn(
                'w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900',
                !isCollapsed && 'justify-start'
              )}
              onClick={() => setIsPricingDialogOpen(true)}
            >
              <Trophy className="mr-2" />
              <span className={cn(isCollapsed && 'hidden')}>Go Pro</span>
            </Button>
          </div>
          <div className="flex items-center gap-3 p-2 border-t border-sidebar-border mt-2">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage
                src={"https://picsum.photos/100"}
                alt="User Avatar"
                data-ai-hint="person face"
              />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                'overflow-hidden transition-opacity',
                isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              )}
            >
              <p className="font-semibold truncate font-headline text-sidebar-foreground">
                Student
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                student@example.com
              </p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <PricingDialog open={isPricingDialogOpen} onOpenChange={setIsPricingDialogOpen} />
    </>
  );
}

export const AppSidebar = React.memo(AppSidebarComponent);
