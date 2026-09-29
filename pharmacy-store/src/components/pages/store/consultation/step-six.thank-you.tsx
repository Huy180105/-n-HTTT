import { motion } from "framer-motion";
import { ThumbsUp } from "lucide-react";

export const StepSixThankYou = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4 }}
    className="text-center py-8"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
      className="flex items-center justify-center gap-3 mb-6"
    >
      <div className="p-3 bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-900/50 dark:to-violet-900/50 rounded-full">
        <ThumbsUp className="w-6 h-6 text-violet-600 dark:text-cyan-400" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
        Cảm ơn bạn đã sử dụng Pharmacity! 🎉
      </span>
      <span className="text-2xl">🙏</span>
    </motion.div>
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="space-y-4 max-w-3xl mx-auto"
    >
      <p className="text-lg text-muted-foreground leading-relaxed">
        Chúng tôi cam kết mang đến dịch vụ tư vấn AI thông minh và những sản phẩm chất lượng cao nhất. 
      </p>
      <p className="text-base text-violet-600 dark:text-cyan-400 font-medium">
        ✨ Sức khỏe của bạn là ưu tiên hàng đầu của chúng tôi ✨
      </p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/30 dark:to-cyan-950/30 rounded-xl border border-violet-200 dark:border-violet-800"
      >
        <p className="text-sm text-violet-700 dark:text-cyan-300 font-medium">
          📞 Liên hệ hỗ trợ: <span className="font-bold">1800 6821</span> | 
          📧 Email: <span className="font-bold">support@medicare.vn</span>
        </p>
        <p className="text-xs text-violet-600 dark:text-cyan-400 mt-1">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
        </p>
      </motion.div>
    </motion.div>
  </motion.div>
) 