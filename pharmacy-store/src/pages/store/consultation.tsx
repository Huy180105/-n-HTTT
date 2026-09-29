import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ConsultationStepOne,
  ConsultationStepTwo,
  ConsultationStepThree,
  ConsultationStepFour,
  ConsultationStepFine,
  ConsultationStepSix,
} from "@/components/pages/store/consultation";
import { useStepConsultation } from "@/hooks/use-step-consultation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Check, BotMessageSquare, CheckCircle2, FileText, Pill, User } from "lucide-react";

interface StepItem {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const stepsList: StepItem[] = [
  { number: 1, title: "Nhập triệu chứng", description: "Mô tả vấn đề sức khỏe", icon: User },
  { number: 2, title: "AI Chẩn đoán", description: "Phân tích và tư vấn thuốc", icon: BotMessageSquare },
  { number: 3, title: "Thông tin giao hàng", description: "Địa chỉ và phương thức", icon: FileText },
  { number: 4, title: "Xác nhận đơn hàng", description: "Kiểm tra chi tiết đơn hàng", icon: Pill },
  { number: 5, title: "Hoàn tất đơn hàng", description: "Thanh toán và theo dõi", icon: CheckCircle2 },
  { number: 6, title: "Đánh giá dịch vụ", description: "Phản hồi trải nghiệm", icon: BotMessageSquare },
];

export default function ConsultationPage() {
  const { currentStep, totalSteps } = useStepConsultation();
  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ConsultationStepOne />;
      case 2:
        return <ConsultationStepTwo />;
      case 3:
        return <ConsultationStepThree />;
      case 4:
        return <ConsultationStepFour />;
      case 5:
        return <ConsultationStepFine />;
      case 6:
        return <ConsultationStepSix />;
      default:
        return <ConsultationStepOne />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/80 via-slate-50 to-cyan-50/60 dark:from-slate-950 dark:via-violet-950/50 dark:to-slate-900">
      <div className="container-wrapper">
        <div className="container py-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-700 via-violet-600 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-violet-500/25">
              <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                <Bot className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 bg-clip-text text-transparent mb-2">
              Tư vấn thuốc AI - Pharmacity Store
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">
              Nhận tư vấn y tế chuyên nghiệp và hỗ trợ đặt thuốc trực tuyến
            </p>
          </div>
          {/* Main Layout - 2 Columns */}
          <div className="grid lg:grid-cols-12 max-w-8xl gap-8">
            {/* Left Column - Interactive Content */}
            <div className="lg:col-span-8">
              <Card className="shadow-xl border-violet-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl">
                <CardContent className="p-8">
                  {renderCurrentStep()}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Steps Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Progress Overview */}
                <Card className="border-violet-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-700 to-cyan-500 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      Tiến trình tư vấn
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400 font-medium">Hoàn thành:</span>
                        <span className="font-bold text-violet-600 dark:text-cyan-400">
                          {Math.round(progressPercentage)}% ({currentStep}/{totalSteps})
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2 bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </CardContent>
                </Card>

                {/* Steps List */}
                <Card className="border-violet-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white"> Các bước tư vấn </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {stepsList.map((step) => {
                      const Icon = step.icon;
                      const isCurrent = step.number === currentStep;
                      const isComplete = step.number < currentStep;

                      return (
                        <div
                          key={step.number}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 border",
                            isCurrent
                              ? "bg-violet-50 dark:bg-violet-950/60 border-blue-300 dark:border-violet-700/60 shadow-sm"
                              : isComplete
                              ? "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800"
                              : "bg-transparent border-transparent opacity-60"
                          )}
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all shadow-sm",
                              isCurrent
                                ? "bg-gradient-to-br from-violet-700 to-cyan-600 text-white shadow-violet-500/25"
                                : isComplete
                                ? "bg-gradient-to-br from-violet-600 to-cyan-500 text-white"
                                : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                            )}
                          >
                            {isComplete ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <motion.div animate={isCurrent ? { scale: [1, 1.15, 1] } : {}} transition={{ repeat: Infinity, duration: 2 }}>
                                <Icon className="w-5 h-5" />
                              </motion.div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p
                                className={cn(
                                  "font-bold text-sm truncate",
                                  isCurrent
                                    ? "text-violet-900 dark:text-cyan-300"
                                    : isComplete
                                    ? "text-slate-800 dark:text-slate-200"
                                    : "text-slate-500"
                                )}
                              >
                                {step.title}
                              </p>
                              {isCurrent && (
                                <div className="w-2 h-2 rounded-full bg-violet-600 dark:bg-cyan-400 animate-ping" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}