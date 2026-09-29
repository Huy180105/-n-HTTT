import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enums";
import { CheckCircle2Icon, Clock, ClockIcon, Package, ShoppingBag, ShoppingBagIcon, Truck, TruckIcon } from "lucide-react";

export const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusConfig = {
    [OrderStatus.PENDING]: {
      color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
      hoverColor: "hover:bg-amber-100/70 hover:text-amber-800 hover:border-amber-300 dark:hover:bg-amber-900/50 dark:hover:text-amber-300 dark:hover:border-amber-700/60",
      label: "Chờ xác nhận",
      icon: <ClockIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.PROCESSING]: {
      color: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-blue-400 dark:border-violet-800/50",
      hoverColor: "hover:bg-violet-100/70 hover:text-violet-800 hover:border-blue-300 dark:hover:bg-violet-900/50 dark:hover:text-blue-300 dark:hover:border-violet-700/60",
      label: "Đang xử lý",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.SHIPPED]: {
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800/50",
      hoverColor: "hover:bg-indigo-100/70 hover:text-indigo-800 hover:border-indigo-300 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-300 dark:hover:border-indigo-700/60",
      label: "Đang giao hàng",
      icon: <Truck className="w-3 h-3 mr-1" />
    },
    [OrderStatus.DELIVERED]: {
      color: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50",
      hoverColor: "hover:bg-sky-100/70 hover:text-sky-800 hover:border-sky-300 dark:hover:bg-sky-900/50 dark:hover:text-sky-300 dark:hover:border-sky-700/60",
      label: "Đã giao hàng",
      icon: <ShoppingBagIcon className="w-3 h-3 mr-1" />
    },
    [OrderStatus.CANCELLED]: {
      color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/50",
      hoverColor: "hover:bg-rose-100/70 hover:text-rose-800 hover:border-rose-300 dark:hover:bg-rose-900/50 dark:hover:text-rose-300 dark:hover:border-rose-700/60",
      label: "Đã hủy",
      icon: <Package className="w-3 h-3 mr-1" />
    },
    [OrderStatus.COMPLETED]: {
      color: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-400 dark:border-cyan-800/50",
      hoverColor: "hover:bg-cyan-100/70 hover:text-cyan-800 hover:border-cyan-300 dark:hover:bg-cyan-900/50 dark:hover:text-cyan-300 dark:hover:border-cyan-700/60",
      label: "Hoàn thành",
      icon: <CheckCircle2Icon className="w-3 h-3 mr-1" />
    },
  };

  const config = statusConfig[status];
  return (
    <Badge className={`${config.color} ${config.hoverColor} px-3 py-1.5 rounded-full text-xs font-medium flex items-center shadow-sm border dark:shadow-none transition-colors duration-200 cursor-pointer`}>
      {config.icon} {config.label}
    </Badge>
  );
};

export const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <Clock className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
    case OrderStatus.PROCESSING:
      return <Package className="h-5 w-5 text-violet-500 dark:text-blue-400" />;
    case OrderStatus.SHIPPED:
      return <TruckIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return <ShoppingBag className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />;
    case OrderStatus.CANCELLED:
      return <Package className="h-5 w-5 text-rose-500 dark:text-rose-400" />;
    default:
      return <Package className="h-5 w-5 text-violet-600 dark:text-blue-400" />;
  }
};