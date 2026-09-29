import { updateTokenAtom, userAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routeNames, routes, siteConfig } from "@/config";
import { AccountRole } from "@/data/enum";
import { CredentialForm, credentialSchema } from "@/data/schemas";
import { cn } from "@/lib/utils";
import { AuthAPI } from "@/services/v1";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function LoginPage({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom)
  const updateToken = useSetAtom(updateTokenAtom)
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CredentialForm>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      account: import.meta.env.DEV ? "admin@pharmacity.com" : "",
      password: import.meta.env.DEV ? "Admin@123" : "",
    }
  })

  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthAPI.fetchLogin,
    onSuccess: (data) => {
      // Kiểm tra role có được phép truy cập admin không
      const allowedRoles = [AccountRole.ADMIN, AccountRole.PHARMACIST];
      if (!allowedRoles.includes(data.user.role)) {
        toast.error("Không có quyền truy cập", {
          description: "Chỉ quản trị viên và dược sĩ mới có thể truy cập hệ thống quản lý",
        });
        return;
      }

      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn đến với hệ thống quản lý bán hàng",
      });
      updateToken(data.accessToken);
      setUser(data.user);
      navigate(routes.admin.root);
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message?: string })?.message || "Đăng nhập thất bại";
      toast.error(errorMessage);
    }
  })

  const onSubmit = async (data: CredentialForm) => {
    login(data);
  }

  return (
    <div className={cn("flex flex-col gap-6 relative z-10", className)} {...props}>
      <Helmet>
        <title>{routeNames[routes.auth.login]} | {siteConfig.name}</title>
      </Helmet>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl animate-pulse" />
              <div className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-500 to-cyan-400 shadow-xl shadow-violet-500/30 mx-auto">
                <ShieldCheck className="size-8 text-white drop-shadow" />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                Đăng nhập hệ thống
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                Chào mừng bạn đến với hệ thống quản lý {siteConfig.name}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Tài khoản
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <User className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 transition-colors duration-200 group-focus-within:text-cyan-300" />
                      <Input
                        {...field}
                        placeholder="admin@pharmacity.com"
                        tabIndex={1}
                        className="bg-slate-950/80 border-slate-700/80 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 rounded-xl pl-12 pr-4 py-3.5 text-sm transition-all duration-300 hover:bg-slate-900 hover:border-cyan-400/50 [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#09090b_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-rose-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 transition-colors duration-200 group-focus-within:text-cyan-300" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        tabIndex={2}
                        className="bg-slate-950/80 border-slate-700/80 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30 rounded-xl pl-12 pr-12 py-3.5 text-sm transition-all duration-300 hover:bg-slate-900 hover:border-cyan-400/50 [&:-webkit-autofill]:bg-slate-950 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_#09090b_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-rose-400" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none border border-violet-500/30 text-sm"
          >
            {isPending ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang xác thực...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <span>Đăng nhập hệ thống</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </Button>

          {/* Bottom Links */}
          <div className="text-center space-y-3 pt-2">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span>Kênh kết nối bảo mật mã hóa</span>
            </div>
            <a 
              href="http://localhost:8082" 
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-semibold underline underline-offset-4 transition-colors"
            >
              Trở về Pharmacity Store
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}