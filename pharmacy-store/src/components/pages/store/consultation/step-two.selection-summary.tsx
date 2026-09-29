import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MedicineResponse } from "@/data/interfaces";
import { CheckCircle, Star } from "lucide-react";

export const StepTwoSelectionSummary = ({ medicines }: { medicines: MedicineResponse[] }) => {
  if (medicines.length === 0) return null;
  const totalPrice = medicines.reduce((total, med) => total + med.variants.price, 0);

  return (
    <Card className="border-violet-200 dark:border-violet-800 bg-cyan-50 dark:bg-violet-950/20 shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-violet-700 dark:text-cyan-300">
                Đã chọn {medicines.length} thuốc
              </h4>
              <p className="text-sm text-violet-600 dark:text-cyan-400">
                Tổng: {totalPrice.toLocaleString('vi-VN')} ₫
              </p>
            </div>
          </div>
          <Badge className="bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-cyan-300">
            <Star className="w-4 h-4 mr-1" />
            Đã chọn
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};