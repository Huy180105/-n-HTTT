import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routeNames, routes } from "@/config";
import { ForgotPasswordDto } from "@/data/dto";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/data/schemas";
import { AuthLayout } from "@/layouts";
import { AuthAPI } from "@/services/v1";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { ArrowLeft, BriefcaseMedical, CheckCircle, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const forgotPasswordMutation = useMutation({
    mutationFn: AuthAPI.fetchForgotPassword,
    onSuccess: () => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success("Email đặt lại mật khẩu đã được gửi!", {
        description: "Vui lòng kiểm tra hộp thư đến của bạn.",
      });
    },
    onError: (err: AxiosError) => {
      console.log(err);
      setIsLoading(false);
      if (err.response?.status === 404) {
        toast.error("Email không tồn tại!", {
          description: "Vui lòng kiểm tra lại địa chỉ email.",
        });
      } else {
        toast.error("Có lỗi xảy ra!", {
          description: "Vui lòng thử lại sau.",
        });
      }
    },
  });

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordForm) => {
    setIsLoading(true);
    const forgotPasswordData: ForgotPasswordDto = {
      email: data.email,
    };
    forgotPasswordMutation.mutate(forgotPasswordData);
  };

  if (emailSent) {
    return (
      <AuthLayout title={routeNames[routes.auth.forgotPassword]}>
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-col items-center gap-6">
            <Link
              to={routes.store.root}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-900/60 dark:to-violet-900/60 text-violet-600 dark:text-cyan-400 shadow-md hover:shadow-lg transition-all duration-300">
                <BriefcaseMedical className="size-6" />
              </div>
              <span className="sr-only">Medicare Inc.</span>
            </Link>

            <div className="text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-900/60 dark:to-violet-900/60 text-violet-600 dark:text-cyan-400 shadow-lg mx-auto">
                <CheckCircle className="size-8" />
              </div>
              
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 dark:from-cyan-400 dark:to-cyan-400 pb-1">
                Email đã được gửi!
              </h1>
              
              <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến email của bạn. 
                Vui lòng kiểm tra hộp thư đến và làm theo hướng dẫn.
              </div>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50"
              >
                Gửi lại email
              </Button>
              
              <Link to={routes.auth.login}>
                <Button
                  variant="ghost"
                  className="w-full text-violet-600 dark:text-cyan-400 hover:text-violet-700 dark:hover:text-cyan-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={routeNames[routes.auth.forgotPassword]}>
      <div className="flex flex-col gap-6 relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <Link
                  to={routes.store.root}
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-900/60 dark:to-violet-900/60 text-violet-600 dark:text-cyan-400 shadow-md hover:shadow-lg transition-all duration-300">
                    <BriefcaseMedical className="size-6" />
                  </div>
                  <span className="sr-only">Medicare Inc.</span>
                </Link>
                
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 dark:from-cyan-400 dark:to-cyan-400 pb-1">
                  Quên mật khẩu?
                </h1>
                
                <div className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                  Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu
                </div>
              </div>

              <div className="space-y-5 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-800/50 backdrop-blur-sm">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                        Địa chỉ email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="your-email@example.com"
                            className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 focus:border-cyan-400 dark:focus:border-violet-600 rounded-lg pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 hover:from-violet-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 font-medium shine-effect py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 text-white">
                      <Loader2 className="animate-spin" />
                      Đang gửi...
                    </div>
                  ) : (
                    <span className="text-white text-base">Gửi email đặt lại mật khẩu</span>
                  )}
                </Button>

                <div className="flex items-center justify-center pt-2">
                  <Link
                    to={routes.auth.login}
                    className="text-violet-600 dark:text-cyan-400 hover:underline underline-offset-4 hover:opacity-75 transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại đăng nhập
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AuthLayout>
  );
}