import { Icons } from "@/components/custom/icons";
import { ModeSwitcher } from "@/components/custom/mode-switch";
import { StoreCart, StoreNavMobile, StoreNavPC, StoreNavUser } from "@/components/layouts/store";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { routes, siteConfig } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { Phone, Sparkles, SquareTerminal } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

export function StoreHeader() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-100 dark:border-slate-800/80 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="hidden md:block bg-gradient-to-r from-violet-900 via-violet-800 to-cyan-700 text-white py-2 text-xs font-semibold tracking-wide">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-cyan-200 transition-colors">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Phone className="w-3.5 h-3.5 text-cyan-300" />
              </motion.div>
              <span>Hotline miễn phí: 1800 6821</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-0.5 rounded-full backdrop-blur-md border border-white/15">
              <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </motion.div>
              <span>Chẩn đoán & Tư vấn Dược phẩm AI 24/7</span>
            </div>
          </div>
          <div className="hidden md:block font-bold tracking-tight">Chào mừng đến với {siteConfig.name}</div>
        </div>
      </div>

      <div className="container-wrapper">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <StoreNavPC />
            <StoreNavMobile />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="w-full max-w-sm md:w-auto md:flex-none">
              {import.meta.env.DEV && (
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-violet-700 to-cyan-600 text-white px-3 py-1 rounded-full border-none shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xs font-bold flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4" />
                    DEVELOPMENT
                  </span>
                </Badge>
              )}
            </div>

            <nav className="flex items-center gap-3">
              <ModeSwitcher />

              <Suspense>
                {isAuthenticated ? (
                  user ? (
                    <StoreNavUser user={user} />
                  ) : (
                    <Skeleton className="h-9 w-9 rounded-full" />
                  )
                ) : (
                  <Link to={routes.auth.login} className="flex items-center text-slate-800 dark:text-slate-200 hover:text-violet-600 dark:hover:text-cyan-400 font-bold text-sm transition-all bg-violet-50/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-violet-100 dark:border-slate-700 hover:shadow-md">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                      <Icons.user className="h-4 w-4 mr-2 text-violet-600 dark:text-cyan-400" />
                    </motion.div>
                    <span>Đăng nhập / Đăng ký</span>
                  </Link>
                )}
              </Suspense>

              <Suspense>
                {isAuthenticated && <StoreCart />}
              </Suspense>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}