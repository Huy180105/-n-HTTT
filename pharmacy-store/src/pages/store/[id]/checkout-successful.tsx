import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderStatus } from "@/data/enums";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ClipboardCheck, MapPin, Package, Truck, Phone, Mail, Clock } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const benefitCards = [
  {
    icon: Clock,
    title: "Giao hàng nhanh",
    description: "2-3 ngày làm việc",
    color: "from-violet-500 to-cyan-500"
  },
  {
    icon: Phone,
    title: "Hỗ trợ 24/7",
    description: "1800 5998 98",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Mail,
    title: "Liên hệ support",
    description: "support@medicare.vn",
    color: "from-cyan-500 to-cyan-500"
  }
];

export default function CheckoutSuccessfulPage() {
  const { id: orderId } = useParams<{ id: string }>();
  const orderNumber = orderId || "PH" + Math.floor(100000 + Math.random() * 900000);
  const navigate = useNavigate();

  // Query để kiểm tra order có tồn tại không
  const { data: orderData, isError: orderNotFound, isLoading: checkingOrder } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => StoreAPI.OrderDetails(orderId!),
    enabled: !!orderId,
    retry: false, // Không retry nếu order không tồn tại
  });

  // Bảo vệ trang khỏi truy cập trực tiếp và kiểm tra order tồn tại
  useEffect(() => {
    console.log("🔍 Checkout Success Effect Running:", {
      checkingOrder,
      orderNotFound,
      orderId,
      orderExists: !!orderData
    });
    
    // Nếu đang check order thì chờ
    if (checkingOrder) {
      console.log("⏳ Still checking order, waiting...");
      return;
    }
    
    // Nếu order không tồn tại trong DB
    if (orderNotFound) {
      console.log("❌ Order not found in database, redirecting to orders page");
      toast.error("Không tìm thấy đơn hàng này");
      navigate(routes.store.account.orders);
      return;
    }
    
    // Kiểm tra session confirmation (chỉ khi order tồn tại)
    const orderConfirmation = sessionStorage.getItem("order-confirmation");
    const storedOrderId = sessionStorage.getItem("order-id");
    
    console.log("🔍 Session check:", { 
      orderConfirmation, 
      storedOrderId, 
      urlOrderId: orderId,
      orderExists: !!orderData
    });
    
    // IMPORTANT: Nếu có orderData từ API nghĩa là order tồn tại
    if (orderData) {
      console.log("✅ Order exists in database:", orderData.id);
      
      // Nếu không có confirmation nhưng order tồn tại, có thể là refresh trang
      if (!orderConfirmation) {
        console.log("⚠️ No order confirmation but order exists - might be page refresh");
        // CHỈ redirect nếu order đã cũ (hơn 5 phút)
        const orderCreatedAt = new Date(orderData.createdAt);
        const now = new Date();
        const diffMinutes = (now.getTime() - orderCreatedAt.getTime()) / (1000 * 60);
        
        if (diffMinutes > 5) {
          console.log("⏰ Order is older than 5 minutes, redirecting to orders");
          toast.info("Vui lòng kiểm tra đơn hàng của bạn tại trang đơn hàng");
          navigate(routes.store.account.orders);
          return;
        } else {
          console.log("🕐 Order is recent, allowing access");
        }
      }
      
      // Đánh dấu đã xem trang thành công
      sessionStorage.setItem("order-viewed", "true");
      console.log("✅ Checkout success page loaded successfully");
    }
  }, [navigate, orderId, orderData, orderNotFound, checkingOrder]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (sessionStorage.getItem("order-viewed")) {
        sessionStorage.removeItem("order-confirmation");
        sessionStorage.removeItem("order-viewed");
        sessionStorage.removeItem("order-id");
      }
    };
  }, []);

  // Hiển thị loading nếu đang kiểm tra order
  if (checkingOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang kiểm tra đơn hàng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20">
      <Helmet>
        <title>{`${routeNames[routes.store.checkoutSuccess(":id")]} | ${siteConfig.name}`}</title>
      </Helmet>

      <div className="container max-w-6xl py-12 px-4">
        {/* Header Success Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 shadow-2xl shadow-cyan-500/25 mb-8"
            >
              <CheckCircle2 className="h-16 w-16 text-white" />
            </motion.div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    y: [0, -50, -100]
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className={`absolute w-2 h-2 bg-cyan-400 rounded-full`}
                  style={{
                    left: `${30 + i * 8}%`,
                    top: '50%'
                  }}
                />
              ))}
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent mb-4"
          >
            Đặt hàng thành công! <span className="text-yellow-500">🎉</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-2"
          >
            Cảm ơn bạn đã tin tưởng và mua sắm tại <span className="font-bold text-violet-600 dark:text-cyan-400">Pharmacity Store</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-block px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-violet-200 dark:border-violet-800/50"
          >
            <span className="text-lg text-gray-700 dark:text-gray-300">
              Mã đơn hàng: <span className="font-bold text-violet-600 text-xl">#{orderNumber}</span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="p-8 h-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-xl">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                Trạng thái đơn hàng
              </h2>

              <div className="space-y-6">
                {(() => {
                  const currentStatus = orderData?.status || OrderStatus.PENDING;
                  const dynamicOrderSteps = [
                    {
                      icon: ClipboardCheck,
                      title: "Đặt hàng thành công",
                      description: "Đơn hàng đã được khởi tạo thành công",
                      isCompleted: true,
                      isCurrent: currentStatus === OrderStatus.PENDING,
                    },
                    {
                      icon: Package,
                      title: "Duyệt & Chuẩn bị hàng",
                      description: currentStatus === OrderStatus.PENDING ? "Đang chờ Admin duyệt đơn hàng" : "Admin đã duyệt & đóng gói sản phẩm",
                      isCompleted: currentStatus !== OrderStatus.PENDING,
                      isCurrent: currentStatus === OrderStatus.PROCESSING,
                    },
                    {
                      icon: Truck,
                      title: "Vận chuyển",
                      description: (currentStatus === OrderStatus.SHIPPED || currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.COMPLETED) ? "Đang trong quá trình giao hàng" : "Chờ bàn giao vận chuyển",
                      isCompleted: currentStatus === OrderStatus.SHIPPED || currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.COMPLETED,
                      isCurrent: currentStatus === OrderStatus.SHIPPED,
                    },
                    {
                      icon: MapPin,
                      title: "Giao hàng thành công",
                      description: (currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.COMPLETED) ? "Đã giao đến người nhận" : "Chờ hoàn tất giao hàng",
                      isCompleted: currentStatus === OrderStatus.DELIVERED || currentStatus === OrderStatus.COMPLETED,
                      isCurrent: currentStatus === OrderStatus.DELIVERED,
                    }
                  ];

                  return dynamicOrderSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = step.isCompleted;
                    const isCurrent = step.isCurrent;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-4 relative"
                    >
                      {/* Connecting line */}
                      {index !== dynamicOrderSteps.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-700" />
                      )}

                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500
                        ${isCompleted
                          ? 'bg-cyan-500 border-cyan-500 shadow-lg shadow-cyan-500/25'
                          : isCurrent
                            ? 'bg-violet-500 border-violet-500 shadow-lg shadow-violet-500/25 animate-pulse'
                            : 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600'
                        }
                      `}>
                        <Icon className={`w-5 h-5 ${isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                          }`} />
                      </div>

                      <div className="flex-1">
                        <h3 className={`font-semibold ${isCompleted || isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${isCompleted || isCurrent ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                          }`}>
                          {step.description}
                        </p>
                      </div>

                      {isCompleted && (
                        <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                      )}
                    </motion.div>
                  );
                });
              })()}
              </div>
            </Card>
          </motion.div>

          {/* Support Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            {benefitCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-3 border-2 hover:border-cyan-500 hover:text-violet-600 transition-all duration-300"
          >
            <Link to={routes.store.root}>
              <ArrowLeft className="h-5 w-5" />
              Tiếp tục mua sắm
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="gap-3 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 hover:from-violet-700 hover:to-violet-700 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <Link to={routes.store.account.orders}>
              Xem đơn hàng của tôi
              <ArrowLeft className="h-5 w-5 rotate-180" />
            </Link>
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-violet-50 to-violet-50 dark:from-violet-950/20 dark:to-violet-950/20 border-violet-200 dark:border-violet-800/50">
            <p className="text-gray-600 dark:text-gray-400">
              📧 Thông tin chi tiết đơn hàng đã được gửi đến email của bạn
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua hotline <span className="font-semibold text-violet-600">1800 5998 98</span>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 