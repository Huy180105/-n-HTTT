import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { routes } from "@/config";
import { useMetaColor } from "@/hooks/use-meta-color";
import { motion } from "framer-motion";
import { Bot as ChatBubbleLeftRightIcon, HomeIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

export function StoreNavMobile() {
  const [open, setOpen] = useState(false);
  const { setMetaColor, metaColor } = useMetaColor();

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor]
  );

  const closeDrawer = () => setOpen(false);

  const navigationItems = [
    { href: routes.store.root, label: "Trang chủ", icon: HomeIcon },
    { href: routes.store.categories, label: "Danh mục", icon: ShoppingBagIcon },
    { href: routes.store.consultation, label: "Chẩn đoán AI", icon: ChatBubbleLeftRightIcon },
    { href: routes.store.account.root, label: "Tài khoản", icon: UserIcon },
  ];

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-violet-50 dark:hover:bg-violet-950/50 hover:text-violet-600 dark:hover:text-cyan-400 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6 text-slate-700 dark:text-slate-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[65svh] p-0 border-t-2 border-violet-200 dark:border-violet-900/50 bg-gradient-to-br from-violet-50/90 to-cyan-50/90 dark:from-slate-950 dark:to-violet-950/60 backdrop-blur-md">
        <div className="px-6 py-8">
          <div className="mb-6 pb-4 border-b border-violet-200/60 dark:border-violet-800/60">
            <h2 className="text-lg font-extrabold bg-gradient-to-r from-violet-800 to-cyan-600 dark:from-violet-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Menu điều hướng Pharmacity
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Khám phá các tính năng của Pharmacity Store
            </p>
          </div>

          <nav className="space-y-3">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeDrawer}
                  className="group flex items-center gap-4 px-4 py-4 text-slate-700 dark:text-slate-200 hover:text-violet-700 dark:hover:text-cyan-300 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 dark:hover:from-violet-900/40 dark:hover:to-cyan-900/40 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-900/50 dark:to-cyan-900/50 group-hover:from-violet-200 group-hover:to-cyan-200 dark:group-hover:from-violet-800/60 dark:group-hover:to-cyan-800/60 transition-all duration-300 shadow-sm">
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.2 }}>
                      <IconComponent className="w-5 h-5 text-violet-600 dark:text-cyan-400 group-hover:text-violet-700 dark:group-hover:text-cyan-300 transition-colors duration-300" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-base">{item.label}</span>
                    <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300 rounded-full mt-1"></div>
                  </div>
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-violet-200/60 dark:border-violet-800/60">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-950/80 dark:to-cyan-950/80 rounded-full border border-violet-200 dark:border-cyan-800">
                <div className="w-2 h-2 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full animate-ping"></div>
                <span className="text-sm font-bold text-violet-900 dark:text-cyan-300">
                  Pharmacity Store
                </span>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}