import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { StockStatus } from "@/data/enums";
import { MedicineResponse } from "@/data/interfaces";
import { CheckCircle, Coins, Pill, Star } from "lucide-react";

interface StepTwoMedicineCardProps {
  medicine: MedicineResponse;
  isSelected: boolean;
  onToggle: () => void;
}

export const StepTwoMedicineCard = ({ medicine, isSelected, onToggle }: StepTwoMedicineCardProps) => (
  <Card
    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-violet-200 dark:border-violet-800 overflow-hidden ${isSelected
      ? 'ring-2 ring-cyan-400 bg-gradient-to-br from-violet-50/80 to-cyan-50/80 dark:from-violet-950/30 dark:to-cyan-950/30'
      : 'hover:bg-gradient-to-br hover:from-violet-50/30 hover:to-cyan-50/30 dark:hover:from-violet-950/20 dark:hover:to-cyan-950/20'
      }`}
    onClick={onToggle}
  >
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <Checkbox
          checked={isSelected}
          className="w-4 h-4 border-2 border-cyan-400 data-[state=checked]:bg-cyan-500"
        />
        {isSelected && (
          <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300">
            <Star className="w-3 h-3 mr-1" />
            Đã chọn
          </Badge>
        )}
      </div>

      <div className="flex gap-3 mb-3">
        <img
          src={medicine.thumbnail?.url || ""}
          alt={medicine.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
          onError={(e) => { e.currentTarget.src = '/placeholder-medicine.png'; }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground mb-2 line-clamp-2">
            {medicine.name}
          </h4>
          <Badge variant="outline" className="text-xs border-cyan-300 dark:border-cyan-700 text-cyan-700 dark:text-cyan-300">
            <Pill className="w-3 h-3 mr-1" />
            {medicine.usageguide.dosage.adult}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1">
          <Coins className="w-4 h-4 text-violet-600 dark:text-cyan-400" />
          <span className="text-lg font-bold text-violet-600 dark:text-cyan-400">
            {medicine.variants.price.toLocaleString('vi-VN')} ₫
          </span>
        </div>
        <Badge className={medicine.variants.stockStatus === StockStatus.IN_STOCK
          ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300"
          : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
        }>
          <CheckCircle className="w-3 h-3 mr-1" />
          {medicine.variants.stockStatus === StockStatus.IN_STOCK ? 'Còn hàng' : 'Hết hàng'}
        </Badge>
      </div>

      <div className="p-3 bg-gradient-to-r from-gray-50 to-violet-50/30 dark:from-gray-800/50 dark:to-violet-950/20 rounded-lg border border-violet-200/50 dark:border-violet-800/50">
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {medicine.description}
        </p>
      </div>
    </CardContent>
  </Card>
);