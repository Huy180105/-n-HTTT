import { useInvoiceDialog } from "@/atoms";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ClipboardPlus, FileDown, FileSpreadsheet, MoreHorizontal, Printer, Search } from "lucide-react";
import { motion } from 'motion/react';
import { useNavigate } from "react-router-dom";

export function InvoicePrimaryButtons() {
  const { setOpen } = useInvoiceDialog();
  const navigate = useNavigate();

  const handleViewInvoice = () => {
    // This would open a dialog to enter an invoice ID
    // or you could navigate to a search page
    navigate("/admin/invoices/search");
  };

  return (
    <div className="flex items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          className="gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md border-0 font-medium px-4 py-2.5 h-auto rounded-lg transition-all duration-200"
          onClick={() => setOpen("add")}
        >
          <ClipboardPlus size={17} className="stroke-[2.5px]" />
          <span>Tạo Hóa Đơn</span>
        </Button>
      </motion.div>

      <div className="hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 border-blue-200 dark:border-blue-800/30 hover:bg-blue-50 hover:border-cyan-300 dark:hover:bg-blue-900/20 transition-colors shadow-sm rounded-lg"
              >
                <MoreHorizontal className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[220px] rounded-md border border-blue-100 dark:border-blue-800/30 shadow-lg bg-white dark:bg-slate-900"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuItem
                className="cursor-pointer gap-3 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 group"
                onClick={handleViewInvoice}
              >
                <Search className="h-5 w-5 text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300" />
                <span className="font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-cyan-300">Tìm Hóa Đơn</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                <FileDown className="h-5 w-5 text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300" />
                <span className="font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-cyan-300">Xuất Hóa Đơn (Excel)</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                <Printer className="h-5 w-5 text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300" />
                <span className="font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-cyan-300">In Tất Cả Hóa Đơn</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-blue-100/70 dark:bg-blue-800/30 my-1" />
              <DropdownMenuItem className="cursor-pointer gap-3 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 group">
                <FileSpreadsheet className="h-5 w-5 text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300" />
                <span className="font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-cyan-300">Tạo Báo Cáo Doanh Thu</span>
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}