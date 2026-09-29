import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { isPharmacistUserAtom } from "@/atoms";
import { routes } from "@/config";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Signature color palette & animations for each admin section
const itemStyles: Record<string, {
  activeGradient: string;
  activeIndicator: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  hoverGlow: string;
  badgeBg: string;
  badgeText: string;
  animateHover: any;
}> = {
  [routes.admin.dashboard]: {
    activeGradient: "bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25",
    activeIndicator: "from-violet-400 via-fuchsia-400 to-cyan-300",
    iconBg: "bg-violet-100 dark:bg-violet-950/60 group-hover:bg-violet-200 dark:group-hover:bg-violet-900/80",
    iconBorder: "border-violet-200 dark:border-violet-800/60",
    iconColor: "text-violet-600 dark:text-violet-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-violet-500/20",
    badgeBg: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    badgeText: "text-violet-700 dark:text-violet-300",
    animateHover: { rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }
  },
  [routes.admin.account]: {
    activeGradient: "bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25",
    activeIndicator: "from-cyan-300 via-sky-300 to-blue-400",
    iconBg: "bg-cyan-100 dark:bg-cyan-950/60 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-900/80",
    iconBorder: "border-cyan-200 dark:border-cyan-800/60",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-cyan-500/20",
    badgeBg: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    animateHover: { y: [0, -2, 0], scale: [1, 1.12, 1] }
  },
  [routes.admin.categories]: {
    activeGradient: "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-lg shadow-amber-500/25",
    activeIndicator: "from-amber-300 via-orange-300 to-rose-400",
    iconBg: "bg-amber-100 dark:bg-amber-950/60 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/80",
    iconBorder: "border-amber-200 dark:border-amber-800/60",
    iconColor: "text-amber-600 dark:text-amber-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-amber-500/20",
    badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    badgeText: "text-amber-700 dark:text-amber-300",
    animateHover: { rotate: [0, 8, -8, 0], scale: [1, 1.12, 1] }
  },
  [routes.admin.medicines]: {
    activeGradient: "bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25",
    activeIndicator: "from-indigo-300 via-cyan-300 to-teal-300",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/60 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/80",
    iconBorder: "border-indigo-200 dark:border-indigo-800/60",
    iconColor: "text-indigo-600 dark:text-cyan-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-indigo-500/20",
    badgeBg: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-cyan-300",
    badgeText: "text-indigo-700 dark:text-cyan-300",
    animateHover: { rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }
  },
  [routes.admin.suppliers]: {
    activeGradient: "bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25",
    activeIndicator: "from-teal-300 via-emerald-300 to-cyan-300",
    iconBg: "bg-teal-100 dark:bg-teal-950/60 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/80",
    iconBorder: "border-teal-200 dark:border-teal-800/60",
    iconColor: "text-teal-600 dark:text-emerald-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-teal-500/20",
    badgeBg: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
    badgeText: "text-teal-700 dark:text-teal-300",
    animateHover: { scale: [1, 1.15, 1] }
  },
  [routes.admin.orders]: {
    activeGradient: "bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-rose-500/25",
    activeIndicator: "from-rose-300 via-pink-300 to-amber-300",
    iconBg: "bg-rose-100 dark:bg-rose-950/60 group-hover:bg-rose-200 dark:group-hover:bg-rose-900/80",
    iconBorder: "border-rose-200 dark:border-rose-800/60",
    iconColor: "text-rose-600 dark:text-rose-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-rose-500/20",
    badgeBg: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    badgeText: "text-rose-700 dark:text-rose-300",
    animateHover: { y: [0, -3, 0], scale: [1, 1.12, 1] }
  },
  [routes.admin.invoices]: {
    activeGradient: "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-blue-500/25",
    activeIndicator: "from-blue-300 via-indigo-300 to-violet-300",
    iconBg: "bg-blue-100 dark:bg-blue-950/60 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/80",
    iconBorder: "border-blue-200 dark:border-blue-800/60",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverGlow: "group-hover:shadow-md group-hover:shadow-blue-500/20",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    badgeText: "text-blue-700 dark:text-blue-300",
    animateHover: { scale: [1, 1.12, 1] }
  },
};

const defaultStyle = {
  activeGradient: "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20",
  activeIndicator: "from-cyan-400 via-fuchsia-400 to-violet-500",
  iconBg: "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700",
  iconBorder: "border-slate-200 dark:border-slate-700",
  iconColor: "text-slate-600 dark:text-slate-300",
  hoverGlow: "group-hover:shadow-md",
  badgeBg: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  badgeText: "text-slate-700 dark:text-slate-300",
  animateHover: { scale: [1, 1.1, 1] }
};

export function AdminNavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    badge?: string
  }[]
}) {
  const location = useLocation();
  const isPharmacist = useAtomValue(isPharmacistUserAtom);

  const filteredItems = isPharmacist 
    ? items.filter(item => item.url !== routes.admin.account)
    : items;

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1.5 py-2">
        <SidebarMenu>
          {filteredItems.map((item, index) => {
            const isActive = location.pathname === item.url ||
              (item.url !== '#' && item.url !== '/' && location.pathname.startsWith(item.url));

            const style = itemStyles[item.url] || defaultStyle;

            return (
              <SidebarMenuItem key={item.title} className="relative">
                <SidebarMenuButton
                  tooltip={item.title}
                  asChild
                  isActive={isActive}
                  className={`group transition-all duration-300 rounded-xl px-3 py-2.5 ${isActive
                    ? `${style.activeGradient} font-bold`
                    : "hover:bg-slate-100/80 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold"
                    }`}
                >
                  <Link to={item.url} className="flex items-center gap-3 w-full">
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b ${style.activeIndicator} rounded-r-md`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item.icon && (
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 border-white/30 text-white shadow-inner"
                            : `${style.iconBg} ${style.iconBorder} ${style.iconColor} ${style.hoverGlow}`
                        }`}
                      >
                        <motion.div
                          animate={isActive ? style.animateHover : {}}
                          whileHover={!isActive ? style.animateHover : undefined}
                          transition={{ repeat: isActive ? Infinity : 0, duration: 2.5, delay: index * 0.15 }}
                        >
                          <item.icon className="h-4 w-4 stroke-[2.2]" />
                        </motion.div>
                      </div>
                    )}
                    <span className={`text-sm ${isActive ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive 
                          ? "bg-white/25 text-white" 
                          : `${style.badgeBg}`
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}