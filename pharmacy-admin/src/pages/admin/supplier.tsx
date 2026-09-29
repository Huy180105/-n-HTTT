import SupplierDialog from "@/components/dialogs/supplier.dialog";
import { SuppliersPrimaryButtons, SupplierStats } from "@/components/pages/supplier";
import { supplierColumns, SupplierDataTable } from "@/components/table/suppiler";
import { routeNames, routes, siteConfig } from "@/config";
import { SupplierResponse, SupplierStatsResponse } from "@/data/interfaces";
import { useTable } from "@/hooks";
import { SupplierAPI } from "@/services/v1";
import { Building2 } from "lucide-react";
import { motion } from 'motion/react';
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

export default function SupplierPage() {
  const {
    data: supplierData,
    statsData,
    isStatsLoading,
    isLoading,
    isChangingPage,
    paginationInfo,
    searchTerm,
    setSearchTerm,
    handlePageChange,
    handlePageSizeChange,
    pageSize,
  } = useTable<SupplierResponse, SupplierStatsResponse>({
    queryKey: "suppliers",
    dataFetcher: SupplierAPI.SupplierList,
    statsFetcher: SupplierAPI.SupplierStats,
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
        <title>{routeNames[routes.admin.suppliers]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 via-cyan-500/10 to-indigo-500/15 dark:from-emerald-950/50 dark:via-teal-950/40 dark:to-cyan-950/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl shadow-purple-950/20 border border-teal-500/20 dark:border-teal-700/30 relative overflow-hidden group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-violet-100 dark:bg-violet-800/30 p-2.5 rounded-lg">
              <Building2 size={28} className="text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Quản lý Nhà cung cấp
            </h2>
          </div>
          <p className="text-violet-600/90 dark:text-violet-400/80 ml-[52px]">
            Quản lý thông tin nhà cung cấp, hợp đồng và lịch sử giao dịch
          </p>
          <div className="ambient-banner-blob pointer-events-none absolute -right-12 -bottom-12 w-64 h-64 bg-gradient-to-br from-amber-400/20 via-fuchsia-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
        </motion.div>

        <SupplierStats statsData={statsData} isLoading={isStatsLoading} />

        {/* Table Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Building2 size={18} className="text-violet-500" />
                Danh sách nhà cung cấp
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Theo dõi và quản lý các đối tác cung cấp thuốc
              </p>
            </motion.div>
            <SuppliersPrimaryButtons />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-white/95 via-slate-50/60 to-white/95 dark:from-slate-900/95 dark:via-slate-950/85 dark:to-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 dark:border-slate-800/80 relative overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <SupplierDataTable
                columns={supplierColumns}
                data={supplierData}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isLoading={isLoading}
                isChangingPage={isChangingPage}
                statsData={statsData}
                pagination={paginationProps}
              />
            </div>
          </motion.div>
        </div>

        <SupplierDialog />
      </div>
    </div>
  );
}