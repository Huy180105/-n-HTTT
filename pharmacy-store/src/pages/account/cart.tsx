import { CartItem, CartSkeletons } from "@/components/pages/account";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, PackageCheck, ShoppingBag, ShoppingCart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, isInitializing: isLoading, updateItemQuantity: updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    return total + (item.medicine.variants.price * item.quantity);
  }, 0);

  const handleQuantityChange = (medicineId: string, quantity: number) => {
    updateQuantity({ medicineId, quantity });
  };

  const handleRemoveItem = (medicineId: string) => {
    removeItem(medicineId);
  };

  const handleCheckout = () => {
    navigate(routes.store.checkout);
  };

  return (
    <>
      <Helmet>
        <title>Giỏ hàng | Pharmacity Store</title>
      </Helmet>
      
      <div className="container py-10 md:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Header section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-cyan-400">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold md:text-3xl">Giỏ hàng của bạn</h1>
            </div>
            <p className="text-muted-foreground ml-13 pl-0.5">
              {isLoading ? 
                <Skeleton className="h-4 w-40" /> : 
                (cart.length > 0 ? 
                  `Bạn có ${cart.length} sản phẩm trong giỏ hàng` : 
                  'Giỏ hàng của bạn đang trống')}
            </p>
          </div>

          {isLoading ? (
            // Loading state
            <Card className="border-violet-100 dark:border-violet-800/30 shadow-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-cyan-950/20 border-b border-violet-100 dark:border-violet-800/30">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-40" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CartSkeletons />
              </CardContent>
            </Card>
          ) : cart.length === 0 ? (
            <Card className="border-dashed bg-gradient-to-br from-slate-50 to-violet-50/50 dark:from-slate-900/50 dark:to-violet-950/30 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-20">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-cyan-400 mb-4">
                  <ShoppingCart className="h-10 w-10" />
                </div>
                <h2 className="mt-2 text-xl font-semibold">Giỏ hàng của bạn đang trống</h2>
                <p className="mt-3 text-center text-muted-foreground max-w-md">
                  Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm. Bạn có thể tìm thấy nhiều sản phẩm y tế chất lượng trong cửa hàng Pharmacity Store của chúng tôi.
                </p>
                <Button asChild size="lg" className="mt-8 px-6 bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700">
                  <Link to={routes.store.medicines} className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card className="border-violet-100 dark:border-violet-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-cyan-950/20 border-b border-violet-100 dark:border-violet-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="h-5 w-5 text-violet-600 dark:text-cyan-400" />
                      Sản phẩm trong giỏ hàng
                      <Badge variant="outline" className="ml-2 bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-900/30 dark:text-cyan-400 dark:border-violet-800/40">
                        {cart.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[calc(100vh-25rem)] pr-0">
                      <div className="divide-y divide-violet-100 dark:divide-violet-800/30">
                        <AnimatePresence initial={false}>
                          {cart.map((item) => (
                            <CartItem 
                              key={item.medicine.id}
                              item={item}
                              onQuantityChange={handleQuantityChange}
                              onRemove={handleRemoveItem}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </ScrollArea>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-cyan-950/20 border-t border-violet-100 dark:border-violet-800/30">
                    <Button variant="outline" asChild className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-800/30">
                      <Link to={routes.store.medicines} className="flex items-center gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Tiếp tục mua sắm
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card className="sticky top-24 border-violet-100 dark:border-violet-800/30 shadow-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-cyan-950/20 border-b border-violet-100 dark:border-violet-800/30">
                    <CardTitle className="flex items-center gap-2">
                      <PackageCheck className="h-5 w-5 text-violet-600 dark:text-cyan-400" />
                      Tổng đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 p-5">
                    {isLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Separator className="bg-violet-100 dark:bg-violet-800/30" />
                        <Skeleton className="h-7 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tạm tính</span>
                            <span>{formatCurrency(totalPrice)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Phí vận chuyển</span>
                            <span className="text-violet-600 dark:text-cyan-400 font-medium">Miễn phí</span>
                          </div>
                        </div>
                        <Separator className="bg-violet-100 dark:bg-violet-800/30" />
                        <div className="flex justify-between">
                          <span className="font-medium">Tổng cộng</span>
                          <span className="font-bold text-xl text-violet-600 dark:text-cyan-400">{formatCurrency(totalPrice)}</span>
                        </div>
                        <div className="pt-3">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Button 
                              className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 dark:from-violet-600 dark:to-cyan-600 dark:hover:from-violet-500 dark:hover:to-cyan-500 shadow-md" 
                              size="lg"
                              onClick={handleCheckout}
                            >
                              Tiến hành thanh toán
                            </Button>
                          </motion.div>
                          <p className="text-xs text-center text-muted-foreground mt-3">
                            Đơn hàng sẽ được xử lý an toàn và bảo mật
                          </p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}