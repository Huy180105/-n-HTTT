import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function RootLessIsMoreCard() {
  return (
    <section className="max-w-[1920px] mx-auto h-[620px] md:h-[580px] bg-gradient-to-br from-violet-50 via-slate-50 to-cyan-100/70 dark:from-slate-950 dark:via-violet-950/60 dark:to-slate-900 grid grid-cols-12 my-16 relative overflow-hidden border-y border-violet-100 dark:border-slate-800">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-3xl transform translate-x-32 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl transform -translate-x-48 translate-y-24"></div>
      
      <div className="relative w-full h-[340px] md:h-[580px] col-span-12 md:col-span-8 overflow-hidden group">
        <img
          src="https://res.cloudinary.com/dr9fzhpcj/image/upload/v1751347964/allopathic-medicine_pl4qcg.jpg"
          alt="Thuốc chất lượng cao"
          className="object-cover object-center w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out filter group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
      </div>

      <div className="col-span-12 md:col-span-4 pb-6 md:py-20 px-6 md:px-16 relative z-10 flex flex-col justify-center bg-violet-50/60 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="space-y-6 transform hover:translate-y-[-4px] transition-transform duration-300">
          <div className="inline-flex items-center gap-2">
            <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
              <Sparkles className="w-5 h-5 text-cyan-500" />
            </motion.div>
            <div className="w-12 h-1 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full"></div>
          </div>
          
          <h2 className="text-xl md:text-3xl font-black mb-3 leading-tight bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 bg-clip-text text-transparent">
            Sức khỏe là ưu tiên hàng đầu
          </h2>
          
          <p className="text-xs leading-[1.6] md:text-lg tracking-tight mb-8 text-left max-w-md text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            Chúng tôi tin rằng mọi người đều xứng đáng được tiếp cận với những sản phẩm 
            chăm sóc sức khỏe chất lượng cao với mức giá hợp lý. Đó là lý do tại sao 
            chúng tôi cam kết cung cấp các sản phẩm dược phẩm đạt tiêu chuẩn quốc tế 
            với giá cả phải chăng cho mọi gia đình.
          </p>
          
          <div className="relative inline-block group/button">
            <Link
              to={routes.store.categories}
              className={cn(
                buttonVariants(), 
                "relative rounded-full text-xs md:text-md font-bold bg-gradient-to-r from-violet-700 via-violet-600 to-cyan-600 hover:from-violet-800 hover:to-cyan-700 dark:from-violet-600 dark:to-cyan-600 dark:hover:from-violet-700 dark:hover:to-cyan-700 shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 border-0 text-white px-8 py-3.5"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                Khám phá ngay
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}