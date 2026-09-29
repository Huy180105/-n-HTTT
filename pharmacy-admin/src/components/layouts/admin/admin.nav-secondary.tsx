import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function AdminNavSecondary({
  items,
  title = "Support",
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    badge?: string
  }[]
  title?: string
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent className="border-t border-blue-200 dark:border-blue-700/50 mt-1 pt-1">
        {title && (
          <h3 className="px-2 mb-0.5 text-[10px] font-medium text-cyan-500 dark:text-cyan-400">{title}</h3>
        )}
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url ||
              (item.url !== '#' && item.url !== '/' && location.pathname.startsWith(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={`group transition-all duration-300 rounded-xl px-2.5 py-1.5 ${
                    isActive
                      ? "bg-slate-200/80 dark:bg-slate-800/80 text-violet-700 dark:text-cyan-300 font-bold"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Link
                    to={item.url}
                    className="flex w-full items-center gap-2.5"
                  >
                    {item.icon && (
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                        isActive
                          ? "bg-violet-500/20 dark:bg-cyan-500/20 border-violet-500/30 dark:border-cyan-400/30 text-violet-600 dark:text-cyan-300"
                          : "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-700/70"
                      }`}>
                        <motion.div whileHover={{ rotate: [0, 45, 0] }} transition={{ duration: 0.4 }}>
                          <item.icon className="h-3.5 w-3.5" />
                        </motion.div>
                      </div>
                    )}
                    <span className={`truncate text-xs font-semibold ${isActive ? "text-violet-700 dark:text-cyan-300" : ""}`}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isActive ? "bg-violet-100 text-violet-700 dark:bg-cyan-900/50 dark:text-cyan-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
                {isActive && (
                  <motion.div
                    layoutId="secondaryNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-violet-600 dark:bg-cyan-400 rounded-r-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}