import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { routeNames, routes } from "@/config";
import { useTheme } from "@/providers/theme.provider";
import { Home, Moon, Sun } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function AdminHeader() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex sticky top-0 z-50 h-12 rounded-t-3xl shrink-0 items-center gap-2 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm transition-colors duration-300 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between px-2">
        <div className="flex items-center gap-2 px-2 md:px-4">
          <SidebarTrigger className="-ml-1 text-slate-700 dark:text-slate-200" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4 bg-slate-200 dark:bg-slate-800"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to={routes.admin.dashboard} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
                    <Home size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">Home</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathnames.map((value, index) => {
                if (value.match(/^\d+$/)) return null;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                let displayName = routeNames[to];
                if (!displayName) displayName = value.charAt(0).toUpperCase() + value.slice(1);
                return (
                  <React.Fragment key={to}>
                    <BreadcrumbSeparator className="hidden md:block text-slate-400 dark:text-slate-600" />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="font-semibold text-slate-900 dark:text-slate-100">{displayName}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={to} className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">{displayName}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Quick Theme Toggle Button */}
        <div className="flex items-center gap-2 mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            title={theme === "dark" ? "Chuyển sang giao diện Sáng" : "Chuyển sang giao diện Tối"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-violet-600" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}