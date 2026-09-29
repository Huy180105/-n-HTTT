import { isAuthenticatedAtom } from "@/atoms";
import { Spotlight } from "@/components/custom/spotlight";
import { routes } from "@/config";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { Activity, Lock, ShieldCheck, Zap } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  if (isAuthenticated) return <Navigate to={routes.admin.root} />;

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-slate-950 text-slate-100 antialiased selection:bg-purple-500 selection:text-white">
      {/* Ambient Mesh Gradient Blobs */}
      <div className="pointer-events-none fixed -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-violet-600/30 via-purple-600/20 to-pink-600/20 blur-[140px]" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-cyan-500/30 via-sky-600/20 to-indigo-600/20 blur-[160px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/3 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tl from-fuchsia-600/25 via-rose-600/20 to-amber-500/20 blur-[140px]" />

      {/* Left side - Login Form Area */}
      <div className="flex-1 lg:flex-[1.1] flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-2xl bg-slate-900/70 border border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl shadow-purple-950/40 relative overflow-hidden group">
            <Outlet />
            <div className="pointer-events-none absolute -right-16 -bottom-16 w-48 h-48 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
          </div>
        </div>
      </div>

      {/* Right side - Interactive Security & Tech Showcase */}
      <div className="hidden lg:flex lg:flex-[1.5] relative items-center justify-center p-12 overflow-hidden border-l border-slate-800/50 bg-slate-950/40 backdrop-blur-md">
        {/* Subtle grid pattern overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 select-none opacity-20",
            "[background-size:40px_40px]",
            "[background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]",
          )}
        />

        <Spotlight
          className="-top-20 -right-20"
          fill="url(#violetGradient)"
        />

        {/* Dynamic Center Stage */}
        <div className="relative z-10 max-w-lg text-center space-y-8">
          {/* Animated Central Emblem */}
          <div className="relative inline-block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute -inset-8 rounded-full border border-dashed border-violet-500/20"
            />
            
            <div className="relative flex size-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-violet-600 via-purple-500 to-cyan-400 shadow-2xl shadow-violet-500/30 mx-auto">
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Activity className="size-14 text-white drop-shadow-md" />
              </motion.div>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              Hệ thống Bảo mật chuẩn Y tế
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-medium">
              Nền tảng quản lý nhà thuốc Pharmacity tích hợp công nghệ mã hóa hiện đại, đảm bảo an toàn và bảo mật tối đa cho dữ liệu hệ thống.
            </p>
          </div>

          {/* Compliance Badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>SSL 256-bit</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-violet-500/30 text-violet-300 text-xs font-bold shadow-sm">
              <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span>ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-bold shadow-sm">
              <div className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
              <span>GDPR Ready</span>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">Bảo vệ dữ liệu</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mx-auto border border-violet-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">Tốc độ cao</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mx-auto border border-fuchsia-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">Mã hóa AES-256</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SVG Spotlight Gradient Definition */}
      <svg className="absolute" width="0" height="0">
        <defs>
          <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d946ef" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}