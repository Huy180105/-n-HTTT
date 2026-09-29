import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { routes } from '@/config';
import { OrderStatus } from '@/data/enums';
import { OrderResponse } from '@/data/interfaces';
import { useOrderMutations } from '@/hooks/use-order';
import { formatPaymentMethod } from '@/lib/format-payment-method';
import { OrderStatusIcon, StatusBadge } from '@/lib/order-status-badge';
import { formatCurrency } from '@/lib/utils';
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle, Clock, CreditCard, Leaf, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderCard = ({ order, showConfirmButton = false }: { order: OrderResponse; showConfirmButton?: boolean }) => {
  const formattedDate = format(new Date(order.createdAt), "dd/MM/yyyy", { locale: vi });
  const formattedTime = format(new Date(order.createdAt), "HH:mm", { locale: vi });

  const { confirmOrder, cancelOrder, isConfirming, isCancelling } = useOrderMutations();

  const handleConfirmOrder = () => confirmOrder(order.id);

  const handleCancelOrder = () => cancelOrder(order.id);

  // Null safety check for order and items
  if (!order || !order.items || order.items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)"
      }}
      className="rounded-xl overflow-hidden"
    >
      <Card className="overflow-hidden border-0 dark:border dark:border-violet-900/50 shadow-sm dark:shadow-md dark:shadow-violet-950/10 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-violet-950/20 transition-all duration-300">
        <div className="border-b border-border dark:border-violet-900/30 p-4 flex justify-between items-center bg-gradient-to-r from-violet-50/80 via-sky-50/50 to-cyan-50/80 dark:from-violet-950/40 dark:to-cyan-950/30">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-900/60 dark:to-cyan-900/40 p-2.5 rounded-full shadow-sm dark:shadow-violet-950/30 flex items-center justify-center">
              <OrderStatusIcon status={order.status} />
            </div>
            <div>
              <h3 className="font-medium text-base text-gray-800 dark:text-gray-100">Đơn hàng #{order.id.slice(-6)}</h3>
              <div className="flex flex-wrap items-center text-xs text-muted-foreground dark:text-gray-400 gap-4 mt-1.5">
                <span className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1.5 opacity-70" /> {formattedDate}
                </span>
                <span className="flex items-center">
                  <Clock className="h-3 w-3 mr-1.5 opacity-70" /> {formattedTime}
                </span>
                <span className="flex items-center">
                  <CreditCard className="h-3 w-3 mr-1.5 opacity-70" /> {formatPaymentMethod(order.paymentMethod)}
                </span>
              </div>
            </div>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <CardContent className="p-4 bg-white dark:bg-gray-900/30">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="space-y-1 md:w-2/3">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                <ShoppingBag className="h-3.5 w-3.5 mr-1.5 opacity-70" />
                {order.items.length} {order.items.length === 1 ? 'sản phẩm' : 'sản phẩm'}
              </div>
              <div className="space-y-3 border-l-2 border-violet-100 dark:border-violet-800 pl-3">
                {order.items.filter(item => item.medicine).slice(0, 2).map((item, index) => (
                  <div key={`${item.medicineId}-${index}`} className="text-sm flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 dark:from-violet-400 dark:to-cyan-500 mr-2.5 shadow-sm dark:shadow-violet-900/30"></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {item.medicine?.name || 'Sản phẩm không xác định'}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                        × {item.quantity}
                      </span>
                    </div>
                    <div className="font-medium text-violet-700 dark:text-cyan-400">{formatCurrency(item.itemTotal)}</div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-xs text-violet-600 dark:text-cyan-400 font-medium ml-4 italic flex items-center">
                    <Leaf className="h-3 w-3 mr-1.5 text-cyan-500 dark:text-cyan-400" />
                    +{order.items.length - 2} sản phẩm khác
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end justify-between">
              <div className="text-right px-4 py-2 bg-violet-50/60 dark:bg-violet-950/40 rounded-lg border border-violet-100/50 dark:border-violet-900/30">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Tổng thanh toán</div>
                <div className="font-bold text-lg text-violet-700 dark:text-cyan-400">{formatCurrency(order.totalPrice)}</div>
              </div>

              <div className="mt-4 flex flex-col md:flex-row gap-2 w-full md:w-auto">
                {/* Nút hủy đơn hàng khi trạng thái PENDING */}
                {order.status === OrderStatus.PENDING && (
                  <Button
                    onClick={handleCancelOrder}
                    disabled={isCancelling}
                    variant="destructive"
                    className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 dark:from-red-500 dark:to-red-600 dark:hover:from-red-600 dark:hover:to-red-700 text-white shadow-sm dark:shadow-red-900/20 hover:shadow"
                    size="sm"
                  >
                    {isCancelling ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang hủy...
                      </>
                    ) : (
                      <>
                        <X className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Hủy đơn hàng
                      </>
                    )}
                  </Button>
                )}

                {/* Nút xác nhận hoàn thành khi trạng thái DELIVERED */}
                {showConfirmButton && order.status === OrderStatus.DELIVERED && (
                  <Button
                    onClick={handleConfirmOrder}
                    disabled={isConfirming}
                    className="group bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 text-white shadow-sm dark:shadow-cyan-900/20 hover:shadow"
                    size="sm"
                  >
                    {isConfirming ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Xác nhận hoàn thành
                      </>
                    )}
                  </Button>
                )}

                <Button
                  asChild
                  className="group bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white shadow-sm dark:shadow-violet-900/20 hover:shadow"
                  size="sm"
                >
                  <Link to={routes.store.account.orderDetails(order.id)}>
                    Xem chi tiết <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};