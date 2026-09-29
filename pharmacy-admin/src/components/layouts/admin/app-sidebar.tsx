import { userAtom } from "@/atoms";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { routes, sidebarConfig } from "@/config";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { AdminNavMain } from "./admin.nav-main";
import { AdminNavSecondary } from "./admin.nav-secondary";
import { AdminNavUser } from "./admin.nav-user";
import { AdminNavUserSkeleton } from "./admin.skeleton-nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAtomValue(userAtom);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-blue-200/60 dark:border-blue-900/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to={routes.admin.dashboard} className="text-violet-500 hover:text-violet-400 dark:text-cyan-300 dark:hover:text-cyan-200">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="w-8 h-8 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-md shadow-violet-500/20 mr-2"
                >
                  <Activity className="h-4.5 w-4.5 animate-pulse" />
                </motion.div>
                <span className="text-base font-black bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  Pharmacity Admin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={sidebarConfig.navMain} />
        <AdminNavSecondary items={sidebarConfig.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-blue-200/60 dark:border-blue-900/50">
        {user ? <AdminNavUser user={user} /> : <AdminNavUserSkeleton />}
      </SidebarFooter>
    </Sidebar>
  )
}