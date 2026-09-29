import { AccountSidebar } from "@/components/layouts/account";
import { routes } from "@/config";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

export function AccountLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={routes.auth.login} />
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-cyan-50 to-violet-50 dark:from-violet-950/30 dark:via-violet-950/30 dark:to-violet-950/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10" />
      {/* Animated circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

      <div className="container-wrapper relative z-10 h-full overflow-y-auto">
        <div className="container flex py-6">
          <AccountSidebar />
          <div className="flex-1 pl-6 min-h-screen mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  )
}