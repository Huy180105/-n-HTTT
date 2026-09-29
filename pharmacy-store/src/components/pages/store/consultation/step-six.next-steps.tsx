import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Bot, HelpCircle, RotateCcw, MessageCircle } from "lucide-react";

interface StepSixNextStepsProps {
  onStartNewConsultation: () => void;
}

export const StepSixNextSteps = ({ onStartNewConsultation }: StepSixNextStepsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.0 }}
  >
    <Card className="border-violet-200 dark:border-violet-800/50 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
            <Sparkles className="w-6 h-6 text-violet-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-violet-700 dark:text-blue-300">
            Bước tiếp theo
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Consultation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group p-6 bg-gradient-to-br from-cyan-50 to-violet-50 dark:from-violet-950/30 dark:to-violet-950/30 rounded-xl border-2 border-violet-200 dark:border-violet-800 cursor-pointer hover:border-cyan-300 dark:hover:border-violet-700 hover:shadow-lg transition-all"
            onClick={onStartNewConsultation}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-violet-100 dark:bg-violet-900/50 rounded-xl group-hover:bg-violet-200 dark:group-hover:bg-violet-800/70 transition-colors">
                <Bot className="w-7 h-7 text-violet-600 dark:text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-violet-700 dark:text-cyan-300">
                Tư vấn AI mới
              </h4>
            </div>
            
            <p className="text-base text-violet-600 dark:text-cyan-400 mb-6 leading-relaxed">
              Bắt đầu một phiên tư vấn AI hoàn toàn mới cho các triệu chứng hoặc vấn đề sức khỏe khác
            </p>
            
            <Button 
              variant="outline" 
              className="w-full border-2 border-cyan-300 hover:border-cyan-400 hover:bg-violet-100 dark:border-violet-700 dark:hover:border-violet-600 dark:hover:bg-violet-950/50 h-12 text-base font-medium group-hover:shadow-md transition-all"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Bắt đầu tư vấn mới
            </Button>
          </motion.div>

          {/* Get Help */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border-2 border-orange-200 dark:border-orange-800 cursor-pointer hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl group-hover:bg-orange-200 dark:group-hover:bg-orange-800/70 transition-colors">
                <HelpCircle className="w-7 h-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="text-xl font-bold text-orange-700 dark:text-orange-300">
                Hỗ trợ chuyên sâu
              </h4>
            </div>
            
            <p className="text-base text-orange-600 dark:text-orange-400 mb-6 leading-relaxed">
              Liên hệ trực tiếp với dược sĩ chuyên nghiệp để được tư vấn chi tiết và cá nhân hóa
            </p>
            
            <Button 
              variant="outline" 
              className="w-full border-2 border-orange-300 hover:border-orange-400 hover:bg-orange-100 dark:border-orange-700 dark:hover:border-orange-600 dark:hover:bg-orange-950/50 h-12 text-base font-medium group-hover:shadow-md transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat với dược sĩ
            </Button>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800"
        >
          <div className="text-center">
            <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
              💡 <strong>Lưu ý:</strong> Dịch vụ tư vấn AI được phát triển bởi đội ngũ chuyên gia dược học
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              Luôn tham khảo ý kiến bác sĩ trước khi sử dụng thuốc
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  </motion.div>
) 