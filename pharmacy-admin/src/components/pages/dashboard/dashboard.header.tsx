import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import { motion } from "framer-motion";
import { BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function DashboardHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 via-fuchsia-500/10 to-cyan-500/15 dark:from-violet-950/40 dark:via-purple-950/40 dark:to-cyan-950/40 backdrop-blur-xl rounded-2xl p-6 border border-violet-200/60 dark:border-violet-800/40 shadow-lg shadow-purple-900/5 relative overflow-hidden group"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-violet-200/80 dark:border-violet-700/50 shadow-sm">
              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <BarChart3 size={28} className="text-violet-600 dark:text-violet-400" />
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-violet-700 via-purple-600 to-cyan-600 dark:from-violet-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Thống kê trang web
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-[52px] font-medium">
            Tổng quan hoạt động và thống kê hệ thống Pharmacity Store
          </p>
        </div>
        <div className="flex gap-2 ml-[52px] md:ml-0">
          <Button asChild variant="default" className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-md shadow-violet-500/20">
            <Link to={routes.admin.medicines}>
              <Plus className="h-4 w-4 mr-2" />
              Thêm thuốc
            </Link>
          </Button>
        </div>
      </div>
      <div className="ambient-banner-blob pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-violet-400/20 via-fuchsia-400/20 to-cyan-400/20 dark:from-violet-600/10 dark:via-purple-600/10 dark:to-cyan-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
    </motion.div>
  );
}