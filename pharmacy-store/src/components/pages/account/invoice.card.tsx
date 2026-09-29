import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { routes } from '@/config';
import { InvoiceStatus } from '@/data/enums';
import { InvoiceResponse } from "@/data/interfaces";
import { formatPaymentMethod } from "@/lib/format-payment-method";
import { formatCurrency } from '@/lib/utils';
import { motion } from 'framer-motion';
import { CalendarIcon, CreditCard, FileCheck, FileClock, FileX, Receipt, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const InvoiceCard = ({ invoice }: { invoice: InvoiceResponse }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800/40 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-violet-100 dark:border-violet-800/30 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-cyan-400 flex items-center justify-center shadow-sm">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100">Hóa đơn #{invoice.invoiceNumber}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                  {new Date(invoice.issuedAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <Badge className={`px-3 py-1.5 rounded-full text-xs font-medium 
            ${invoice.status === InvoiceStatus.PAID
              ? "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-cyan-400 dark:border-violet-800/50 hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-900/60 dark:hover:text-cyan-300"
              : invoice.status === InvoiceStatus.PENDING
                ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50 hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-900/60 dark:hover:text-amber-300"
                : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50 hover:bg-rose-100 hover:text-rose-800 dark:hover:bg-rose-900/60 dark:hover:text-rose-300"}`
          }>
            {invoice.status === InvoiceStatus.PAID
              ? <><FileCheck className="w-3 h-3 mr-1" /> Đã thanh toán</>
              : invoice.status === InvoiceStatus.PENDING
                ? <><FileClock className="w-3 h-3 mr-1" /> Chờ thanh toán</>
                : <><FileX className="w-3 h-3 mr-1" /> Đã hủy</>}
          </Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-cyan-400 dark:from-cyan-500 dark:to-cyan-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Tổng cộng</h4>
                <p className="text-base font-semibold text-violet-600 dark:text-cyan-400">{formatCurrency(invoice.totalPrice)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm">{formatPaymentMethod(invoice.paymentMethod)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-gradient-to-b from-violet-400 to-indigo-400 dark:from-violet-500 dark:to-indigo-500 rounded-full"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Số sản phẩm</h4>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">{invoice.items.length} sản phẩm</p>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {invoice.orderId ? `Đơn hàng #${invoice.orderId.slice(-6)}` : 'Mua trực tiếp'}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-violet-100/60 dark:border-violet-900/40 flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800/50 dark:text-cyan-400 dark:hover:bg-violet-900/30 dark:hover:text-cyan-300"
            asChild
          >
            <Link to={routes.store.account.invoiceDetails(invoice.id)}>
              <Search className="mr-1.5 h-3.5 w-3.5" />
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};