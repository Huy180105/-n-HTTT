import { ProtectedRoute } from "@/components/auth";
import { AdminHeader } from "@/components/layouts/admin/admin.header";
import { AppSidebar } from "@/components/layouts/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased overflow-hidden selection:bg-purple-500 selection:text-white transition-colors duration-300">
        {/* Soft Pastel Ambient Mesh Gradient Blobs */}
        <div className="pointer-events-none fixed -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-violet-300/40 via-fuchsia-200/30 to-pink-200/30 dark:from-violet-950/40 dark:via-purple-950/30 dark:to-fuchsia-950/20 blur-[120px] transition-colors duration-500" />
        <div className="pointer-events-none fixed top-1/4 -right-40 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-cyan-300/40 via-sky-300/30 to-purple-300/30 dark:from-cyan-950/40 dark:via-indigo-950/30 dark:to-purple-950/20 blur-[140px] transition-colors duration-500" />
        <div className="pointer-events-none fixed -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tl from-amber-200/30 via-rose-200/30 to-indigo-300/30 dark:from-violet-950/30 dark:via-indigo-950/30 dark:to-cyan-950/20 blur-[130px] transition-colors duration-500" />

        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative z-10 border-l border-slate-200/60 dark:border-slate-800/60 shadow-inner transition-colors duration-300">
            <AdminHeader />
            <main className="flex flex-1 flex-col relative">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <Outlet />
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
}
