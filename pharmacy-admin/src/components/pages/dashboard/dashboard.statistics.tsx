import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats } from "@/data/interfaces";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Clock, DollarSign, Pill, ShoppingCart, TrendingUp, UserPlus, Users } from "lucide-react";

interface DashboardStatisticsCardProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

export function DashboardStatisticsCard({ stats, isLoading }: DashboardStatisticsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Users Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50/90 via-slate-50 to-cyan-50/70 border-blue-200/80 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 dark:border-blue-900/50 shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-blue-900 dark:text-blue-200">Tổng người dùng</CardTitle>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-cyan-400 shadow-sm">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <Users className="h-5 w-5" />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-950 dark:text-white">
              {isLoading ? <Skeleton className="h-8 w-16 bg-blue-200/50 dark:bg-blue-700/30" /> : stats.overview.totalUsers.total.toLocaleString()}
            </div>
            <div className="flex gap-1.5 mt-2.5">
              <Badge variant="secondary" className="text-xs bg-blue-100/80 text-blue-900 dark:bg-blue-900/50 dark:text-cyan-300 border-0 font-bold">
                {stats.overview.totalUsers.customers} khách hàng
              </Badge>
              <Badge variant="secondary" className="text-xs bg-cyan-100/80 text-cyan-900 dark:bg-cyan-900/50 dark:text-cyan-300 border-0 font-bold">
                {stats.overview.totalUsers.pharmacists} dược sĩ
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold">
              <UserPlus className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
              <span className="text-blue-700 dark:text-cyan-400">+{stats.todayStats.newCustomers} khách mới hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Medicines Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-cyan-50/90 via-slate-50 to-indigo-50/70 border-cyan-200/80 dark:from-slate-900 dark:via-cyan-950/40 dark:to-slate-900 dark:border-cyan-900/50 shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-cyan-900 dark:text-cyan-200">Tổng dược phẩm</CardTitle>
            <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-900/60 text-cyan-600 dark:text-cyan-300 shadow-sm">
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Pill className="h-5 w-5" />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-cyan-950 dark:text-white">
              {isLoading ? <Skeleton className="h-8 w-16 bg-cyan-200/50 dark:bg-cyan-700/30" /> : stats.overview.totalMedicines.total.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
              <span className="text-blue-700 dark:text-cyan-400">{stats.overview.totalMedicines.inStock} sẵn sàng</span>
              {stats.overview.totalMedicines.outOfStock > 0 && (
                <>
                  <span className="mx-1 text-slate-300">•</span>
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                  <span className="text-rose-600 dark:text-rose-400">{stats.overview.totalMedicines.outOfStock} hết hàng</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/70 border-indigo-200/80 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 dark:border-indigo-900/50 shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Tổng đơn hàng</CardTitle>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 shadow-sm">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <ShoppingCart className="h-5 w-5" />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-indigo-950 dark:text-white">
              {isLoading ? <Skeleton className="h-8 w-16 bg-indigo-200/50 dark:bg-indigo-700/30" /> : stats.overview.totalOrders.total.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span className="text-amber-700 dark:text-amber-400">{stats.overview.totalOrders.pending} chờ xử lý</span>
              <span className="mx-1 text-slate-300">•</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-blue-700 dark:text-cyan-400">{stats.overview.totalOrders.completed} xong</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
              <span className="text-blue-700 dark:text-cyan-300">+{stats.todayStats.ordersToday} đơn hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Revenue Statistics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50/90 via-cyan-50/50 to-indigo-50/70 border-blue-200/80 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 dark:border-blue-900/50 shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-2xl">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-bold text-blue-900 dark:text-blue-200">Tổng doanh thu</CardTitle>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-cyan-300 shadow-sm">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <DollarSign className="h-5 w-5" />
              </motion.div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-black text-blue-950 dark:text-white">
              {isLoading ? (
                <Skeleton className="h-8 w-20 bg-blue-200/50 dark:bg-blue-700/30" />
              ) : (
                `${(stats.overview.totalRevenue).toLocaleString()} VNĐ`
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-xs font-semibold">
              <TrendingUp className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-cyan-700 dark:text-cyan-400">+{stats.todayStats.revenueToday.toLocaleString()} VNĐ hôm nay</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}