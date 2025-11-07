"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type SidebarContext = {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
  isCollapsed: boolean
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
    } else {
      setOpen((prev) => !prev)
    }
  }, [isMobile])

  // Add keyboard shortcut to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const contextValue = {
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
    isCollapsed: !open,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </SidebarContext.Provider>
  )
}

const sidebarVariants = cva(
  "fixed inset-y-0 z-30 flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
  {
    variants: {
      side: {
        left: "left-0 border-r border-sidebar-border",
        right: "right-0 border-l border-sidebar-border",
      },
      state: {
        open: "w-64",
        closed: "w-12",
      },
    },
    defaultVariants: {
      side: "left",
      state: "open",
    },
  }
)

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof sidebarVariants>
>(({ className, side = "left", ...props }, ref) => {
  const { isMobile, openMobile, setOpenMobile, isCollapsed } = useSidebar()

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side} className="w-64 bg-sidebar p-0 text-sidebar-foreground">
          <div className={cn("flex h-full flex-col", className)} {...props} ref={ref} />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(sidebarVariants({ side, state: isCollapsed ? "closed" : "open" }), className)}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggleSidebar, isMobile } = useSidebar()
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(isMobile ? "md:hidden" : "hidden md:flex", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-16 shrink-0 items-center px-4", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-grow overflow-y-auto", className)}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("shrink-0 border-t border-sidebar-border p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    icon: React.ReactNode
    tooltip?: string
  }
>(({ asChild, isActive, icon, children, tooltip, ...props }, ref) => {
  const { isCollapsed } = useSidebar()
  const Comp = asChild ? Slot : "button"

  const buttonContent = (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center">{icon}</div>
      <span
        className={cn(
          "truncate transition-opacity",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}
      >
        {children}
      </span>
    </div>
  )

  const button = (
    <Comp
      ref={ref}
      data-active={isActive}
      className={cn(
        "flex h-10 w-full items-center justify-start rounded-md px-2 text-sm font-medium text-sidebar-foreground/80 outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-semibold"
      )}
      {...props}
    >
      {buttonContent}
    </Comp>
  )

  if (isCollapsed && tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" align="center">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  Separator as SidebarSeparator,
}