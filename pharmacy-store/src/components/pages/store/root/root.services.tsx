import { BackgroundPathsOnly } from "@/components/kokonutui/background-paths";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, MessageCircle, Shield, ShoppingCart, Sparkles, Star } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function RootServices() {
  const features = [
    {
      icon: (
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
          <ShoppingCart className="text-violet-600 dark:text-cyan-400" size={26} />
        </motion.div>
      ),
      title: "Giao hàng nhanh 2h",
      description: "Giao nhận siêu tốc cho các đơn thuốc khẩn cấp và miễn phí vận chuyển cho đơn hàng từ 300.000đ.",
      borderLight: "border-violet-200/70",
      borderDark: "dark:border-violet-800/30",
      textGradient: "bg-gradient-to-r from-violet-700 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300",
      iconGradient: "bg-gradient-to-br from-violet-100 to-cyan-100/80 dark:from-violet-950/80 dark:to-cyan-900/40"
    },
    {
      icon: (
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
          <Shield className="text-indigo-600 dark:text-indigo-400" size={26} />
        </motion.div>
      ),
      title: "100% Thuốc chính hãng",
      description: "Cam kết thuốc và thực phẩm chức năng có xuất xứ rõ ràng, kiểm định nghiêm ngặt chuẩn GPP.",
      borderLight: "border-indigo-200/70",
      borderDark: "dark:border-indigo-800/30",
      textGradient: "bg-gradient-to-r from-indigo-700 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-300",
      iconGradient: "bg-gradient-to-br from-indigo-100 to-violet-100/80 dark:from-indigo-950/80 dark:to-violet-900/40"
    },
    {
      icon: (
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}>
          <MessageCircle className="text-cyan-600 dark:text-cyan-400" size={26} />
        </motion.div>
      ),
      title: "Tư vấn AI & Dược sĩ 24/7",
      description: "Sự kết hợp hoàn hảo giữa công nghệ AI tự động chuẩn đoán và đội ngũ dược sĩ chuyên môn cao.",
      borderLight: "border-cyan-200/70",
      borderDark: "dark:border-cyan-800/30",
      textGradient: "bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-cyan-300",
      iconGradient: "bg-gradient-to-br from-cyan-100 to-sky-100/80 dark:from-cyan-950/80 dark:to-sky-900/40"
    },
    {
      icon: (
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}>
          <Clock className="text-sky-600 dark:text-sky-400" size={26} />
        </motion.div>
      ),
      title: "Đặt hàng thuận tiện",
      description: "Quy trình mua hàng tối giản, không lo chờ đợi và theo dõi hành trình đơn hàng thời gian thực.",
      borderLight: "border-sky-200/70",
      borderDark: "dark:border-sky-800/30",
      textGradient: "bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-violet-300",
      iconGradient: "bg-gradient-to-br from-sky-100 to-violet-100/80 dark:from-sky-950/80 dark:to-violet-900/40"
    }
  ];

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-white via-violet-50/30 to-slate-50 dark:from-slate-950 dark:via-violet-950/30 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <BackgroundPathsOnly />
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="flex flex-col items-center justify-center space-y-6 text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-950/80 dark:to-cyan-950/80 text-violet-950 dark:text-cyan-300 border-blue-300 dark:border-cyan-700/60 px-4 py-1.5 text-sm font-bold rounded-full shadow-sm">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="mr-1.5 inline-block"
              >
                <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-cyan-400" />
              </motion.div>
              <span>Tại sao chọn Pharmacity Store?</span>
            </Badge>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-black tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 pb-2"
          >
            Dịch Vụ Y Tế Đáng Tin Cậy
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="max-w-[850px] text-slate-600 text-lg md:text-xl/relaxed dark:text-slate-300 leading-relaxed"
          >
            Chúng tôi mang đến giải pháp chăm sóc sức khỏe trực tuyến hiện đại với sự đồng hành của đội ngũ chuyên gia dược phẩm.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 mt-4 bg-white/90 dark:bg-slate-900/80 py-2.5 px-5 rounded-full shadow-md border border-slate-200/80 dark:border-slate-800 backdrop-blur-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                >
                  <Star size={18} className="text-amber-500 fill-amber-500" />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">4.9/5 từ 3,000+ đánh giá tại Pharmacity Store</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              custom={index}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Card className="border border-violet-100/80 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group h-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className={`p-4 w-16 h-16 rounded-2xl ${feature.iconGradient} flex items-center justify-center mb-4 border ${feature.borderLight} ${feature.borderDark} group-hover:-translate-y-1 transition-transform duration-300 shadow-sm`}>
                    {feature.icon}
                  </div>
                  <CardTitle className={`text-xl font-bold ${feature.textGradient}`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2.5 text-violet-900 dark:text-cyan-300 font-bold bg-white/90 dark:bg-slate-900/80 px-6 py-3.5 rounded-full border border-violet-200 dark:border-violet-900/50 shadow-md backdrop-blur-md hover:shadow-lg transition-all duration-300">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Shield size={20} className="text-violet-600 dark:text-cyan-400" />
            </motion.div>
            <span>Pharmacity Store đã được Bộ Y tế xác thực chuẩn GPP</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}