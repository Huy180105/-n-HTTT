import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { OrderStatus } from "@/data/enum";
import { OrderResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { OrderAPI } from "@/services/v1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { motion } from "framer-motion";
import { AlertCircle, Banknote, Calendar, CheckCircle2, CreditCard, Package, ShoppingBag, User, XCircle } from "lucide-react";
import { memo, useState } from "react";
import { toast } from "sonner";

interface Props {
  currentOrder?: OrderResponse;
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  mode: OrderStatus;
}

export const OrdersChangeStatusDialog = memo(function OrdersChangeStatusDialog({ currentOrder, open, onOpenChange, mode }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return {
          title: "Duyệt xử lý đơn hàng",
          description: "Chuyển trạng thái đơn hàng từ Đã đặt hàng sang Đang xử lý?",
          confirmText: "Duyệt xử lý đơn",
          icon: <CheckCircle2 className="h-10 w-10 text-indigo-500" />,
          color: "text-indigo-600 dark:text-indigo-400",
          bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
          borderColor: "border-indigo-100 dark:border-indigo-800/30",
          iconBg: "bg-gradient-to-br from-indigo-50 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/20",
          iconBorder: "border-indigo-100/50 dark:border-indigo-800/20",
          destructive: false,
          status: OrderStatus.PROCESSING,
        };
      case OrderStatus.SHIPPED:
        return {
          title: "Giao hàng cho vận chuyển",
          description: "Chuyển trạng thái đơn hàng sang Đang giao hàng?",
          confirmText: "Giao cho vận chuyển",
          icon: <Package className="h-10 w-10 text-cyan-500" />,
          color: "text-cyan-600 dark:text-cyan-400",
          bgColor: "bg-cyan-50 dark:bg-cyan-900/20",
          borderColor: "border-cyan-100 dark:border-cyan-800/30",
          iconBg: "bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/20",
          iconBorder: "border-cyan-100/50 dark:border-cyan-800/20",
          destructive: false,
          status: OrderStatus.SHIPPED,
        };
      case OrderStatus.DELIVERED:
        return {
          title: "Xác nhận đã giao hàng",
          description: "Xác nhận đơn hàng đã giao thành công tới người mua?",
          confirmText: "Xác nhận đã giao",
          icon: <CheckCircle2 className="h-10 w-10 text-purple-500" />,
          color: "text-purple-600 dark:text-purple-400",
          bgColor: "bg-purple-50 dark:bg-purple-900/20",
          borderColor: "border-purple-100 dark:border-purple-800/30",
          iconBg: "bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/20",
          iconBorder: "border-purple-100/50 dark:border-purple-800/20",
          destructive: false,
          status: OrderStatus.DELIVERED,
        };
      case OrderStatus.CANCELLED:
        return {
          title: "Hủy đơn hàng",
          description: "Bạn có chắc chắn muốn hủy đơn hàng này? Thao tác này không thể hoàn tác.",
          confirmText: "Hủy đơn hàng",
          icon: <XCircle className="h-10 w-10 text-rose-500" />,
          color: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-900/20",
          borderColor: "border-rose-100 dark:border-rose-800/30",
          iconBg: "bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/30 dark:to-red-900/20",
          iconBorder: "border-rose-100/50 dark:border-rose-800/20",
          destructive: true,
          status: OrderStatus.CANCELLED,
        };
      case OrderStatus.COMPLETED:
        return {
          title: "Hoàn thành đơn hàng",
          description: "Bạn có chắc chắn muốn đánh dấu đơn hàng này là đã hoàn thành?",
          confirmText: "Xác nhận hoàn thành",
          icon: <ShoppingBag className="h-10 w-10 text-violet-500" />,
          color: "text-violet-600 dark:text-violet-400",
          bgColor: "bg-violet-50 dark:bg-violet-900/20",
          borderColor: "border-violet-100 dark:border-violet-800/30",
          iconBg: "bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/20",
          iconBorder: "border-violet-100/50 dark:border-violet-800/20",
          destructive: false,
          status: OrderStatus.COMPLETED,
        };
      default:
        return {
          title: "Thay đổi trạng thái đơn hàng",
          description: "Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này?",
          confirmText: "Xác nhận",
          icon: <AlertCircle className="h-10 w-10 text-amber-500" />,
          color: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-900/20",
          borderColor: "border-amber-100 dark:border-amber-800/30",
          iconBg: "bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/20",
          iconBorder: "border-amber-100/50 dark:border-amber-800/20",
          destructive: false,
          status: mode,
        };
    }
  };

  const orderStatusMutation = useMutation({
    mutationFn: async () => {
      if (!currentOrder) return null;

      // Get the actual status to send based on the mode
      const statusConfig = getStatusConfig(mode);
      const statusToSend = statusConfig.status;

      // Log for debugging
      console.log(`Changing order status to: ${statusToSend}`);

      return await OrderAPI.OrderChangeStatus(
        { status: statusToSend },
        currentOrder.id
      );
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      let successMessage = "";
      
      switch (mode) {
        case OrderStatus.PROCESSING:
          successMessage = "Đơn hàng đã được xác nhận thành công!";
          break;
        case OrderStatus.CANCELLED:
          successMessage = "Đơn hàng đã được hủy thành công!";
          break;
        case OrderStatus.COMPLETED:
          successMessage = "Đơn hàng đã được đánh dấu hoàn thành!";
          break;
        default:
          successMessage = "Đã cập nhật trạng thái đơn hàng!";
      }

      toast.success(successMessage, {
        description: `Mã đơn hàng: #${currentOrder?.id.slice(0, 8)}...`,
        duration: 5000,
      });
      
      // Refetch orders data
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error("Error changing order status:", error);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái đơn hàng", {
        description: "Vui lòng thử lại sau",
        duration: 5000,
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const handleConfirm = () => {
    orderStatusMutation.mutate();
  };

  const { 
    title, 
    description, 
    confirmText, 
    icon, 
    color, 
    bgColor, 
    borderColor, 
    iconBg, 
    iconBorder, 
    destructive,
    status 
  } = getStatusConfig(mode);

  if (!currentOrder) return null;

  // Helper function to render appropriate icon in confirm button
  const renderStatusIcon = () => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return <CheckCircle2 className="h-4 w-4" />;
      case OrderStatus.COMPLETED:
        return <ShoppingBag className="h-4 w-4" />;
      case OrderStatus.CANCELLED:
        return <XCircle className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex flex-col items-center text-center pb-2">
          <div className={`flex items-center justify-center p-3 rounded-full mb-2 ${iconBg} shadow-sm border ${iconBorder}`}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              {icon}
            </motion.div>
          </div>
          <motion.span 
            className={`text-lg font-semibold ${color}`}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {title}
          </motion.span>
        </div>
      }
      desc={
        <motion.div 
          className="text-center mt-0 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{description}</p>
          
          <div className={`${bgColor} p-3 rounded-lg mt-3 text-left border ${borderColor} shadow-sm`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-lg bg-white dark:bg-slate-800 p-1.5 shadow-sm">
                <Package className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              </div>
              <span className="font-medium text-slate-800 dark:text-slate-200 text-sm">
                Thông tin đơn hàng
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <Package className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Mã đơn hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    #{currentOrder.id.slice(0, 12)}...
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <User className="h-3 w-3 text-rose-500 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Khách hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate">
                    {currentOrder.user.firstname} {currentOrder.user.lastname}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  <Calendar className="h-3 w-3 text-indigo-500 dark:text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Ngày đặt hàng
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {format(new Date(currentOrder.createdAt), "dd/MM/yyyy", { locale: vi })} ({format(new Date(currentOrder.createdAt), "HH:mm", { locale: vi })})
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1 mt-0.5 flex-shrink-0">
                  {currentOrder.paymentMethod === "COD" ? (
                    <Banknote className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  ) : (
                    <CreditCard className="h-3 w-3 text-violet-500 dark:text-violet-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Tổng tiền
                  </span>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {formatCurrency(currentOrder.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      }
      confirmText={
        <span className="flex items-center justify-center gap-1.5">
          {renderStatusIcon()}
          {confirmText}
        </span>
      }
      cancelBtnText="Hủy bỏ"
      destructive={destructive}
      handleConfirm={handleConfirm}
      isLoading={isLoading}
      className="max-w-sm"
    />
  );
});
