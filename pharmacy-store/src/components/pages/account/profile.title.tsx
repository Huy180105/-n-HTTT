import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";

export function ProfileTitle() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
      <div className="space-y-2">
        <Badge variant="outline" className="border-violet-200 dark:border-violet-800 bg-violet-100 dark:bg-violet-900/60 text-violet-800 dark:text-cyan-300 px-3 py-1 text-sm rounded-full">
          <span className="flex items-center">
            <UserCircle className="h-3.5 w-3.5 mr-2 text-violet-600 dark:text-cyan-400" />
            Thông tin tài khoản
          </span>
        </Badge>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 dark:from-cyan-400 dark:to-cyan-400">
          Hồ sơ của tôi
        </h1>
        <p className="max-w-[600px] mx-auto text-gray-500 md:text-xl dark:text-gray-400">
          Quản lý thông tin cá nhân và tùy chọn tài khoản của bạn
        </p>
      </div>
    </div>
  );
}