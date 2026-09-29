import { AccountRole, AccountStatus } from "@/data/enum";
import { UserResponse } from "@/data/interfaces";
import { ShieldCheck, Stethoscope, UserCircle2 } from "lucide-react";

// Loại trạng thái với màu sắc tinh chỉnh
export const statusTypes = new Map<UserResponse["status"], string>([
  [AccountStatus.ACTIVE, "bg-blue-50/80 text-blue-600 dark:text-cyan-400 border-blue-200 ring-1 ring-blue-200/80 shadow-sm dark:bg-blue-900/20 dark:border-blue-700 dark:ring-blue-800/30"],
  [AccountStatus.SUSPENDED, "bg-amber-50/80 text-amber-600 dark:text-amber-400 border-amber-200 ring-1 ring-amber-200/80 shadow-sm dark:bg-amber-900/20 dark:border-amber-700 dark:ring-amber-800/30"],
  [AccountStatus.PENDING, "bg-sky-50/80 text-sky-600 dark:text-sky-400 border-sky-200 ring-1 ring-sky-200/80 shadow-sm dark:bg-sky-900/20 dark:border-sky-700 dark:ring-sky-800/30"],
]);

// Vai trò người dùng với kiểu dáng tinh chỉnh
export const userTypes = [
  {
    label: "Quản trị viên",
    value: AccountRole.ADMIN,
    icon: ShieldCheck,
    color: "text-purple-600 dark:text-purple-400 bg-purple-50/70 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30",
  },
  {
    label: "Dược sĩ",
    value: AccountRole.PHARMACIST,
    icon: Stethoscope,
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30",
  },
  {
    label: "Khách hàng",
    value: AccountRole.CUSTOMER,
    icon: UserCircle2,
    color: "text-amber-600 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30",
  },
];

export * from "./account.columns";
export { default as AccountDataTable } from "./account.data-table";

