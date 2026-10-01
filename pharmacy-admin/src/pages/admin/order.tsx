import { OrderDialog } from "@/components/dialogs/order.dialog";
import { orderColumns, OrderDataTable } from "@/components/table/order";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderResponse, OrderStatsResponse } from "@/data/interfaces";
import { useTable } from "@/hooks";
import { OrderAPI } from "@/services/v1";
import { ShoppingCart } from "lucide-react";
import { motion } from 'motion/react';
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

type FilterParams = Record<string, string> & {
  status?: string;
};

export default function OrderPage() {
  const {
    data: orderData,
    isLoading,
    isChangingPage,
    paginationInfo,
    searchTerm,
    setSearchTerm,
    filters,
    handleFiltersChange,
    resetFilters,
    handlePageChange,
    handlePageSizeChange,
    pageSize,
  } = useTable<OrderResponse, OrderStatsResponse>({
    queryKey: "orders",
    dataFetcher: OrderAPI.OrderList,
    statsFetcher: OrderAPI.OrderStats,
    defaultFilters: {
      status: ""
    } as FilterParams
  });

  const paginationProps = useMemo(() => {
    if (searchTerm) return undefined; // Không hiển thị pagination khi đang search
    return {
      currentPage: paginationInfo.currentPage,
      totalPages: paginationInfo.totalPages,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
      pageSize,
      totalItems: paginationInfo.totalItems
    };
  }, [
    searchTerm,
    paginationInfo.currentPage,
    paginationInfo.totalPages,
    paginationInfo.totalItems,
    handlePageChange,
    handlePageSizeChange,
    pageSize
  ]);
  
  return (
    <div className="flex-col md:flex">
      <Helmet>
        <title>{routeNames[routes.admin.orders]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-500/15 via-pink-500/10 via-amber-500/10 to-orange-500/15 dark:from-rose-950/50 dark:via-pink-950/40 dark:to-amber-950/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-950/20 border border-rose-500/20 dark:border-rose-700/30 relative overflow-hidden group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-100 dark:bg-indigo-800/30 p-2.5 rounded-lg">
              <ShoppingCart size={28} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
              Quản lý đơn hàng
            </h2>
          </div>
          <p className="text-indigo-600/90 dark:text-indigo-400/80 ml-[52px]">
            Quản lý đơn hàng, đơn đặt hàng và lịch sử giao dịch
          </p>
          <div className="ambient-banner-blob pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-amber-400/20 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
        </motion.div>

        {/* Table Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <ShoppingCart size={18} className="text-indigo-500" />
                Danh sách đơn hàng
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Theo dõi và quản lý các đơn hàng, đơn đặt hàng và lịch sử giao dịch
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-white/95 via-slate-50/60 to-white/95 dark:from-slate-900/95 dark:via-slate-950/85 dark:to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <OrderDataTable
                columns={orderColumns}
                data={orderData}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isLoading={isLoading}
                isChangingPage={isChangingPage}
                pagination={paginationProps}
                filters={filters as Record<string, string>}
                onFiltersChange={handleFiltersChange as (filters: Record<string, string>) => void}
                onResetFilters={resetFilters}
              />
            </div>
          </motion.div>
        </div>

        <OrderDialog />
      </div>
    </div>
  );
}