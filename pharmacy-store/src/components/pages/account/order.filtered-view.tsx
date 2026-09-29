import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config";
import { OrderResponse } from "@/data/interfaces";
import { ChevronLeft, ClipboardList, ShoppingBag } from "lucide-react";
import { OrderCard } from "./order.card";

interface OrderFilteredViewProps {
  filteredOrders: OrderResponse[];
}

export function OrderFilteredView({ filteredOrders }: OrderFilteredViewProps) {
  return (
    <Card className="border-violet-100 dark:border-violet-800/30 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-violet-950/20 border-b border-violet-100 dark:border-violet-800/30">
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-violet-600 dark:text-cyan-400" />
          Đơn hàng đã lọc
          {filteredOrders && filteredOrders.length > 0 && (
            <Badge variant="outline" className="ml-2 bg-violet-50 hover:bg-violet-100/80 text-violet-600 hover:text-violet-700 border-violet-200 hover:border-cyan-300 dark:bg-violet-900/30 dark:hover:bg-violet-900/40 dark:text-cyan-400 dark:hover:text-cyan-300 dark:border-violet-800/40 dark:hover:border-violet-700/60 transition-colors duration-200">
              {filteredOrders.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-violet-100 dark:divide-violet-800/30">
          {filteredOrders && filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-violet-50 dark:bg-violet-900/30 rounded-full flex items-center justify-center mb-4 border border-violet-100 dark:border-violet-800/30 shadow-sm">
                <ClipboardList className="w-8 h-8 text-cyan-500 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Không tìm thấy đơn hàng nào</h3>
              <p className="text-muted-foreground max-w-md mx-auto">Không có đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-violet-950/20 border-t border-violet-100 dark:border-violet-800/30">
        <Button variant="outline" asChild className="border-violet-200 dark:border-violet-800/50 hover:bg-violet-100 dark:hover:bg-violet-800/30">
          <a href={routes.store.medicines} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Tiếp tục mua sắm
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
} 