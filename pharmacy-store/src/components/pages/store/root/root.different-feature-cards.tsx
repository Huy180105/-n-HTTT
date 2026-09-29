import { Icons } from "@/components/custom/icons";
import { motion } from "framer-motion";

export function RootDifferentFeatureCards() {
  const features = [
    {
      Icon: Icons.cart,
      title: "Đặt hàng nhanh chóng",
      description: "Hệ thống đặt hàng online tiện lợi, giao hàng tận nơi trong 2h.",
      color: "text-violet-600 dark:text-cyan-400",
      bgColor: "bg-violet-100/80 dark:bg-violet-950/60"
    },
    {
      Icon: Icons.tag,
      title: "Giá cả minh bạch",
      description: "Chúng tôi cam kết về giá cả rõ ràng, không phát sinh chi phí ẩn. Mọi thông tin giá đều công khai.",
      color: "text-cyan-600 dark:text-cyan-300",
      bgColor: "bg-cyan-100/80 dark:bg-cyan-950/60"
    },
    {
      Icon: Icons.package,
      title: "Nguồn gốc rõ ràng",
      description: "Chỉ hợp tác với các nhà cung cấp uy tín, thuốc chính hãng có đầy đủ giấy tờ pháp lý chuẩn GPP.",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100/80 dark:bg-indigo-950/60"
    },
    {
      Icon: Icons.award,
      title: "Tư vấn chuyên nghiệp",
      description: "Đội ngũ dược sĩ giàu kinh nghiệm sẵn sàng tư vấn và hỗ trợ khách hàng 24/7.",
      color: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-100/80 dark:bg-sky-950/60"
    },
  ];

  return (
    <section className="max-w-[1920px] py-12 mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 md:gap-8">
      {features.map(({ Icon, title, description, color, bgColor }, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-violet-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group"
          key={`FeatureCards_${index}`}
        >
          <div className={`flex justify-center items-center p-4 rounded-2xl ${bgColor} mb-4 border border-violet-200/50 dark:border-violet-800/40 group-hover:scale-110 transition-transform duration-300`}>
            <motion.div
              animate={{ y: [0, -3, 0], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
            >
              <Icon
                width={40}
                height={40}
                className={`${color} transition-colors duration-300`}
              />
            </motion.div>
          </div>
          <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white leading-tight group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{description}</p>
        </motion.div>
      ))}
    </section>
  );
}