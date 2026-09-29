import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStep1 } from "@/hooks/use-step-consultation";
import { MessageCircle, FileText } from "lucide-react";

export function StepOneInputArea() {
  const { symptoms, setSymptoms } = useStep1()

  return (
    <Card className="border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-50/70 via-sky-50/50 to-cyan-50/70 dark:from-violet-950/40 dark:to-cyan-950/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-md">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-violet-700 dark:text-cyan-300 font-semibold">
              Mô tả triệu chứng
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">
              Hãy mô tả chi tiết tình trạng sức khỏe của bạn
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="symptoms-input" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-violet-600 dark:text-cyan-400" />
            Triệu chứng chi tiết
          </Label>
          <div className="relative">
            <Textarea
              id="symptoms-input"
              placeholder="Ví dụ: Tôi bị đau đầu từ sáng nay, cảm thấy chóng mặt và hơi buồn nôn. Đau tập trung ở vùng thái dương, mức độ trung bình..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-36 resize-none border-2 border-violet-200 dark:border-violet-700 focus:border-cyan-400 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 rounded-xl text-base pr-20"
              maxLength={1000}
            />
            <div className="absolute bottom-3 right-3">
              <Badge 
                variant="outline" 
                className={`text-xs font-medium transition-colors ${
                  symptoms.length > 900 
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                    : symptoms.length > 700
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-300'
                    : 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-700 text-violet-700 dark:text-cyan-300'
                }`}
              >
                {symptoms.length}/1000
              </Badge>
            </div>
          </div>
        </div>

        {/* Helper text */}
        <div className="bg-violet-50/80 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-white font-bold">💡</span>
            </div>
            <div className="text-sm text-violet-700 dark:text-cyan-300">
              <p className="font-medium mb-2">Gợi ý để mô tả triệu chứng hiệu quả:</p>
              <ul className="space-y-1 text-xs list-disc list-inside ml-2">
                <li>Thời gian bắt đầu xuất hiện triệu chứng</li>
                <li>Mức độ đau/khó chịu (nhẹ, trung bình, nặng)</li>
                <li>Vị trí cụ thể trên cơ thể</li>
                <li>Các yếu tố làm tăng/giảm triệu chứng</li>
                <li>Triệu chứng kèm theo khác (nếu có)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}