import { routes } from "@/config";
import { cn } from "@/lib/utils";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

type Props = { className?: string }

export function Branding({ className }: Props) {
  return (
    <Link
      to={routes.store.root}
      className={cn(
        "inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight transition-all duration-300 hover:scale-105 group",
        className
      )}
    >
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-700 via-cyan-500 to-sky-400 text-white shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300 border border-cyan-300/30"
      >
        <Activity className="w-5 h-5 animate-pulse text-white" />
      </motion.div>
      <div className="flex items-center font-black text-2xl tracking-tighter">
        <span className="bg-gradient-to-r from-violet-700 via-cyan-500 to-sky-400 bg-clip-text text-transparent dark:from-violet-400 dark:via-cyan-300 dark:to-sky-300">
          PHARMACITY
        </span>
        <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-cyan-100 text-violet-900 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 font-extrabold uppercase tracking-wider shadow-sm">
          STORE
        </span>
      </div>
    </Link>
  )
}