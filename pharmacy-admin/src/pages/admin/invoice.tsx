import InvoiceDialog from "@/components/dialogs/invoice.dialog";
import { InvoiceStats } from "@/components/pages/invoice";
import { invoiceColumns, InvoiceDataTable, InvoicePrimaryButtons } from "@/components/table/invoice";
import { routeNames, routes, siteConfig } from "@/config";
import { InvoiceResponse, InvoiceStatsResponse } from "@/data/interfaces";
import { useTable } from "@/hooks";
import { InvoiceAPI } from "@/services/v1";
import { Receipt } from "lucide-react";
import { motion } from 'motion/react';
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

type FilterParams = Record<string, string> & {
  status?: string;
};

export default function InvoicePage() {
  const {
    data: invoiceData,
    statsData,
    isLoading,
    isStatsLoading,
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
  } = useTable<InvoiceResponse, InvoiceStatsResponse>({
    queryKey: "invoices",
    dataFetcher: InvoiceAPI.InvoiceList,
    statsFetcher: InvoiceAPI.InvoiceStats,
    defaultFilters: {
      status: ""
    } as FilterParams
  });

  // Memoize pagination props để tránh re-render không cần thiết
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
        <title>{routeNames[routes.admin.invoices]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 via-pink-500/10 to-cyan-500/15 dark:from-violet-950/50 dark:via-fuchsia-950/40 dark:to-cyan-950/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-950/20 border border-violet-500/20 dark:border-violet-700/30 relative overflow-hidden group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-rose-100 dark:bg-rose-800/30 p-2.5 rounded-lg">
              <Receipt size={28} className="text-rose-600 dark:text-rose-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Quản lý Hóa đơn
            </h2>
          </div>
          <p className="text-rose-600/90 dark:text-rose-400/80 ml-[52px]">
            Quản lý hóa đơn và giao dịch tài chính của khách hàng tại Pharmacity Store
          </p>
          <div className="ambient-banner-blob pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-amber-400/20 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
        </motion.div>

        {/* Statistics */}
        <InvoiceStats
          statsData={statsData}
          isStatsLoading={isStatsLoading}
        />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Receipt size={18} className="text-rose-500" />
                Danh sách hóa đơn
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Quản lý và theo dõi hóa đơn của khách hàng
              </p>
            </motion.div>
            <InvoicePrimaryButtons />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-white/95 via-slate-50/60 to-white/95 dark:from-slate-900/95 dark:via-slate-950/85 dark:to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <InvoiceDataTable
                columns={invoiceColumns}
                data={invoiceData}
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

        <InvoiceDialog />
      </div>
    </div>
  );
}