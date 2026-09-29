import ShapeHero from '@/components/kokonutui/shape-hero';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { routes } from '@/config';
import { ArrowRight, Phone, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function RootHero() {
  const avatars = [1, 2, 3, 4];

  return (
    <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-violet-50/90 via-slate-50 to-cyan-50/70 dark:from-slate-950 dark:via-violet-950/70 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShapeHero />
      </div>

      <div className="container px-4 md:px-6 relative z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Left Column - Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center space-y-6 lg:space-y-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex"
            >
              <Badge variant="outline" className="bg-gradient-to-r from-violet-100/90 to-cyan-100/90 dark:from-violet-950/80 dark:to-cyan-950/80 text-violet-950 dark:text-cyan-300 border-blue-300/80 dark:border-cyan-700/60 px-4 py-1.5 text-sm rounded-full shadow-sm backdrop-blur-md">
                <span className="flex items-center">
                  <span className="relative flex h-2.5 w-2.5 mr-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </span>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mr-1.5"
                  >
                    <Sparkles className="h-4 w-4 text-violet-600 dark:text-cyan-400" />
                  </motion.div>
                  <span className="font-bold">Pharmacity Store • Hệ Thống Nhà Thuốc Chuẩn Y Tế</span>
                </span>
              </Badge>
            </motion.div>

            <div className="space-y-4 lg:space-y-6">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 leading-tight"
              >
                Chăm sóc sức khỏe<br />
                thông minh & hiện đại
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-[600px] text-slate-600 text-lg md:text-xl dark:text-slate-300 leading-relaxed"
              >
                Trải nghiệm mua sắm dược phẩm chính hãng vớiPharmacity Store — tích hợp tư vấn dược sĩ 24/7 và hệ thống AI chẩn đoán thông minh.
              </motion.p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-700 via-violet-600 to-cyan-600 hover:from-violet-800 hover:to-cyan-700 text-white shadow-lg shadow-violet-600/30 hover:shadow-cyan-500/40 transition-all duration-300 border-0 font-bold rounded-xl px-6 py-3 lg:py-4 text-base group"
                asChild
              >
                <Link to={routes.store.categories}>
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="mr-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </motion.div>
                  Khám phá ngay
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-violet-200/80 hover:border-blue-400 dark:border-violet-800 dark:hover:border-violet-600 hover:bg-violet-50/80 dark:hover:bg-violet-950/60 transition-all duration-300 rounded-xl px-6 py-3 lg:py-4 text-base bg-white/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm text-violet-900 dark:text-violet-200 font-semibold"
                asChild
              >
                <Link to={routes.store.consultation}>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="mr-2"
                  >
                    <Phone className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                  Tư vấn AI miễn phí
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-4"
            >
              <div className="flex -space-x-3">
                {avatars.map((i) => (
                  <Avatar
                    key={i}
                    className="border-2 border-white dark:border-slate-900 h-10 w-10 lg:h-12 lg:w-12 transition-transform hover:scale-110 hover:z-10 shadow-md"
                  >
                    <AvatarImage src={`/avatars/${i}.jpg`} alt="User avatar" />
                    <AvatarFallback>
                      <div className="bg-gradient-to-br from-violet-600 to-cyan-500 h-full w-full flex items-center justify-center text-white font-semibold text-sm">
                        U{i}
                      </div>
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-slate-200/60 dark:border-slate-800">
                <span className="font-bold text-violet-700 dark:text-cyan-400">5,000+</span> khách hàng tin chọn <span className="font-bold text-slate-900 dark:text-white">Pharmacity Store</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-2 lg:gap-3"
            >
              {[
                { text: "100% Thuốc chính hãng", delay: 0 },
                { text: "Giao hàng siêu tốc 2h", delay: 0.1 },
                { text: "Dược sĩ tư vấn 24/7", delay: 0.2 },
                { text: "Bảo mật thông tin 100%", delay: 0.3 }
              ].map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + tag.delay }}
                  className="flex items-center text-sm font-semibold text-violet-900 dark:text-cyan-300 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm border border-violet-100 dark:border-violet-900/50 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                    className="mr-1.5"
                  >
                    <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                  {tag.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}