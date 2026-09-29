import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquare, Shield, Sparkles } from "lucide-react";

export function RootAiConsultation() {
  return (
    <section className="w-full py-12 md:py-20 bg-gradient-to-br from-violet-50/80 via-slate-50 to-cyan-50/60 dark:from-slate-950 dark:via-violet-950/50 dark:to-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative max-w-7xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 xl:grid-cols-5 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start"
        >
          {/* Content Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6 xl:col-span-2 order-1"
          >
            <div className="space-y-4">
              <Badge className="bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-950/80 dark:to-cyan-950/80 text-violet-950 dark:text-cyan-300 border-0 px-4 py-2 text-sm font-bold rounded-full shadow-sm w-fit">
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="mr-2 inline-block">
                  <Sparkles className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                </motion.div>
                Pharmacity AI Health Assistant
              </Badge>
              <h2 className="text-3xl font-black tracking-tight lg:text-4xl xl:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 pb-1 leading-tight">
                Tư vấn sức khỏe thông minh 24/7
              </h2>
              <p className="text-slate-600 text-base md:text-lg xl:text-xl dark:text-slate-300 leading-relaxed max-w-2xl">
                Trợ lý AI Pharmacity Store tích hợp công nghệ RAG y khoa tiên tiến, phản hồi chính xác mọi thắc mắc về dược phẩm, liều dùng và hướng dẫn chăm sóc sức khỏe.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 mt-6">
              {[
                {
                  text: "Gợi ý đơn thuốc chuẩn triệu chứng",
                  icon: (
                    <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <Bot className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                    </motion.div>
                  )
                },
                {
                  text: "Thông tin chi tiết về liều dùng & lưu ý",
                  icon: (
                    <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                      <MessageSquare className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                    </motion.div>
                  )
                },
                {
                  text: "Hướng dẫn chăm sóc sức khỏe tại nhà",
                  icon: (
                    <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                      <Shield className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                    </motion.div>
                  )
                },
                {
                  text: "Giải đáp tức thì không chờ đợi 24/7",
                  icon: (
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <Sparkles className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                    </motion.div>
                  )
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 shadow-sm border border-slate-200/60 dark:border-slate-800 backdrop-blur-md"
                >
                  <div className="rounded-full bg-violet-100 dark:bg-violet-900/60 p-2 mr-3 shadow-inner flex-shrink-0">
                    {feature.icon}
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="bg-gradient-to-r from-violet-700 via-violet-600 to-cyan-600 hover:from-violet-800 hover:to-cyan-700 text-white py-3.5 px-6 rounded-xl font-bold shadow-md shadow-violet-600/25 hover:shadow-lg transition-all duration-200 text-base group">
                Bắt đầu tư vấn AI ngay
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="ml-2 inline-block">
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 bg-violet-50/80 dark:bg-violet-950/40 p-3.5 rounded-xl border border-violet-200/60 dark:border-violet-900/40 font-medium">
              <span className="text-amber-500 font-bold">⚠️</span> Lưu ý: AI cung cấp thông tin tham khảo y khoa. Vui lòng tham khảo ý kiến bác sĩ cho các trường hợp nghiêm trọng.
            </p>
          </motion.div>

          {/* Chat Interface Mockup */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="xl:col-span-3 order-2"
          >
            <div className="rounded-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl border border-violet-100/80 dark:border-slate-800 backdrop-blur-md overflow-hidden h-full">
              <div className="p-6 h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-cyan-500/40 ring-offset-2 ring-offset-white dark:ring-offset-slate-900">
                      <AvatarImage src="/avatar/ai.png" alt="Pharmacity AI" />
                      <AvatarFallback>
                        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                          <Bot className="h-6 w-6 text-violet-600 dark:text-cyan-400" />
                        </motion.div>
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-cyan-500 border-2 border-white dark:border-slate-900 animate-pulse"></span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pharmacity AI Assistant</h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      <Sparkles className="h-3 w-3 text-cyan-500" />
                      <span>Công nghệ RAG Y Khoa LLaMA 3.3</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 animate-ping"></div>
                    <span>Trực tuyến</span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 mb-6 min-h-[300px] max-h-[400px]">
                  <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm text-slate-800 dark:text-slate-200">
                    <p className="text-sm leading-relaxed">Xin chào! Tôi là trợ lý AI của <span className="font-bold text-violet-600 dark:text-cyan-400">Pharmacity Store</span>. Tôi có thể giúp gì cho sức khỏe của bạn hôm nay? 👋</p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[85%] shadow-sm text-slate-800 dark:text-slate-200">
                    <p className="text-sm leading-relaxed font-semibold">Tôi có thể giúp bạn:</p>
                    <ul className="text-sm mt-2 space-y-1 text-slate-600 dark:text-slate-300 font-medium">
                      <li>• Tra cứu thuốc phù hợp theo triệu chứng</li>
                      <li>• Tư vấn liều dùng & lưu ý cách sử dụng</li>
                      <li>• Đặt hàng trực tiếp từ Pharmacity Store</li>
                    </ul>
                  </div>

                  <div className="ml-auto bg-gradient-to-r from-violet-700 to-cyan-600 text-white rounded-2xl rounded-tr-sm p-4 max-w-[85%] shadow-md font-medium">
                    <p className="text-sm leading-relaxed">Tôi bị đau đầu và sốt nhẹ, nên dùng thuốc gì?</p>
                  </div>

                  <div className="bg-slate-100 dark:bg-slate-800/80 rounded-2xl rounded-tl-sm p-4 max-w-[90%] shadow-sm text-slate-800 dark:text-slate-200">
                    <p className="text-sm leading-relaxed">
                      Với triệu chứng đau đầu và sốt nhẹ, sản phẩm khuyến nghị là <span className="text-violet-600 dark:text-cyan-400 font-bold">Paracetamol 500mg</span>. 
                    </p>
                    <div className="mt-2.5 p-3 bg-violet-50 dark:bg-violet-950/40 rounded-xl text-xs text-violet-950 dark:text-cyan-200 border border-violet-100 dark:border-violet-900/30">
                      <p><strong>Liều dùng:</strong> 1-2 viên mỗi 4-6 giờ khi cần</p>
                      <p><strong>Tối đa:</strong> Không vượt quá 4,000mg/ngày</p>
                    </div>
                  </div>
                </div>

                {/* Quick Suggestions */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-bold">💡 Gợi ý câu hỏi nhanh:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Thuốc giảm đau đầu hiệu quả?",
                      "Chăm sóc khi bị cảm cúm",
                      "Thuốc hạ sốt an toàn"
                    ].map((suggestion, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 text-xs bg-violet-50 dark:bg-violet-950/50 text-violet-900 dark:text-cyan-300 rounded-full border border-violet-200 dark:border-violet-800/60 hover:bg-violet-100 dark:hover:bg-violet-900/60 transition-colors duration-200 font-semibold"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="space-y-3">
                  <div className="relative">
                    <Input
                      placeholder="Nhập triệu chứng hoặc tên thuốc bạn cần tìm..."
                      className="pr-16 pl-4 py-4 bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all duration-200 text-sm h-12"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-gradient-to-r from-violet-700 to-cyan-600 hover:from-violet-800 hover:to-cyan-700 text-white rounded-lg shadow-md transition-all duration-200 group"
                      >
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}