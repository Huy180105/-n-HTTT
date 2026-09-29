import { Badge } from "@/components/ui/badge";
import { OrderResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface StepSixSuccessSummaryProps {
  placedOrder?: OrderResponse;
}

export const StepSixSuccessSummary = ({ placedOrder }: StepSixSuccessSummaryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-violet-100 to-violet-100 dark:from-violet-900/30 dark:to-violet-900/30 rounded-full mb-8 shadow-xl"
    >
      <Award className="w-12 h-12 text-violet-600 dark:text-cyan-400" />
    </motion.div>

    <motion.h2
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-violet-600 to-violet-600 bg-clip-text text-transparent mb-4"
    >
      Tư vấn hoàn tất! 🎉
    </motion.h2>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="space-y-4"
    >
      <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
        Cảm ơn bạn đã tin tưởng dịch vụ tư vấn AI thông minh của{" "}
        <span className="font-semibold text-violet-600 dark:text-cyan-400">Pharmacity</span>
      </p>
      
      {placedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-violet-50 dark:from-violet-950/30 dark:to-violet-950/30 rounded-xl border border-violet-200 dark:border-violet-800"
        >
          <span className="text-sm font-medium text-muted-foreground">Đơn hàng:</span>
          <Badge 
            variant="outline" 
            className="font-mono text-base px-4 py-2 bg-white dark:bg-gray-800 border-cyan-300 dark:border-violet-700"
          >
            #{placedOrder.id}
          </Badge>
          <span className="text-lg font-bold text-violet-600 dark:text-cyan-400">
            {formatCurrency(placedOrder.totalPrice || 0)}
          </span>
        </motion.div>
      )}
    </motion.div>
  </motion.div>
) 