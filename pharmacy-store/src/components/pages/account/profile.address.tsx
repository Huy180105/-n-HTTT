import { Button } from "@/components/ui/button";
import { routes } from "@/config";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileAddress() {
  return (
    <section className="space-y-2">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Địa chỉ</h3>
      <div className="flex items-start space-x-2 p-6 rounded-lg shadow-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 transition-colors duration-200">
        <div className="p-2 w-14 h-14 rounded-full bg-violet-50 dark:bg-violet-950 flex items-center justify-center">
          <MapPin className="w-8 h-8 text-violet-600 dark:text-cyan-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-base text-gray-900 dark:text-gray-100">Địa chỉ giao hàng</h4>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bạn có thể thêm địa chỉ giao hàng tại{" "}
            <Link to={routes.store.account.addresses} className="text-violet-600 dark:text-cyan-400 hover:underline">
              Trang quản lý địa chỉ
            </Link>
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 border-violet-200 hover:border-cyan-300 dark:border-violet-800 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/50">
          <Link to={routes.store.account.addresses}>
            Quản lý địa chỉ
          </Link>
        </Button>
      </div>
    </section>
  );
}