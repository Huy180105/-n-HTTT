import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MedicineResponse } from "@/data/interfaces";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

interface StepFourOrderSummaryProps {
  selectedMedicines: MedicineResponse[];
  totalPrice: number;
}

export const StepFourOrderSummary = ({ selectedMedicines, totalPrice }: StepFourOrderSummaryProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <Card className="border-violet-200 dark:border-violet-800/50 bg-gradient-to-br from-violet-50/50 via-sky-50/40 to-cyan-50/50 dark:from-violet-950/20 dark:to-cyan-950/20 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-lg">
            <Package className="w-5 h-5 text-violet-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold text-violet-700 dark:text-cyan-300">
            Tóm tắt đơn hàng
          </h3>
        </div>
        
        <div className="space-y-3 mb-4">
          {selectedMedicines.map((medicine, index) => (
            <motion.div
              key={medicine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-violet-200/50 dark:border-violet-800/50 hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={medicine.thumbnail?.url || ""}
                  alt={medicine.thumbnail?.alt || medicine.name || "Thuốc"}
                  className="w-14 h-14 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-medicine.png';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                  1
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-violet-700 dark:text-cyan-300 truncate">
                  {medicine.name}
                </h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Package className="w-3 h-3" />
                  Số lượng: 1 hộp
                </p>
                {medicine.usageguide?.dosage?.adult && (
                  <p className="text-xs text-violet-600 dark:text-cyan-400 mt-1">
                    Liều dùng: {medicine.usageguide.dosage.adult}
                  </p>
                )}
              </div>
              
              <div className="text-right">
                <p className="font-bold text-violet-600 dark:text-cyan-400 text-lg">
                  {formatCurrency(medicine.variants.price)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <Separator className="my-4" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-between items-center p-4 bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-900/30 dark:to-cyan-900/30 rounded-xl"
        >
          <span className="text-lg font-semibold text-violet-700 dark:text-cyan-300">
            Tổng cộng:
          </span>
          <span className="text-2xl font-bold text-violet-600 dark:text-cyan-400">
            {formatCurrency(totalPrice)}
          </span>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
) 