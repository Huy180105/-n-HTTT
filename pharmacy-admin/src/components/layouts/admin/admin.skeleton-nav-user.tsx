import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminNavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="cursor-default hover:bg-transparent"
        >
          <Skeleton className="h-8 w-8 rounded-lg bg-indigo-100/60 dark:bg-indigo-900/20" />
          <div className="grid flex-1 text-left text-sm leading-tight gap-1">
            <Skeleton className="h-4 w-24 bg-indigo-100/60 dark:bg-indigo-900/20" />
            <Skeleton className="h-3 w-32 bg-indigo-100/60 dark:bg-indigo-900/20" />
          </div>
          <Skeleton className="ml-auto size-4 rounded-md bg-indigo-100/60 dark:bg-indigo-900/20" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}