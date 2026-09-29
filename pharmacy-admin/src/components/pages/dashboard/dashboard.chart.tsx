import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DashboardChartData } from '@/data/interfaces';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart as RechartsPieChart, XAxis, YAxis } from 'recharts';

interface DashboardChartProps {
  revenueData: DashboardChartData[];
  ordersData: { name: string; value: number; color: string }[];
  isLoading?: boolean;
}

export function DashboardCharts({ revenueData, ordersData, isLoading }: DashboardChartProps) {
  const chartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "#2563eb",
    },
    orders: {
      label: "Đơn hàng",
      color: "#0284c7",
    },
    medicines: {
      label: "Thuốc",
      color: "#0d9488",
    },
  };

  const filteredOrdersData = ordersData.filter(item => item.value > 0);

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Doanh thu 6 tháng gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"></div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-cyan-600" />
                Trạng thái đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="lg:col-span-2"
      >
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 text-blue-900 dark:text-blue-200">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span>Doanh thu 6 tháng gần đây</span>
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Biểu đồ thể hiện xu hướng doanh thu phát sinh từ hệ thống Pharmacity Store
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="month" tickLine={false} />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M đ`}
                  tickLine={false}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: number) => [
                    "Doanh thu:",
                    <span style={{ color: '#2563eb', fontWeight: 'bold' }}>
                      {`${value.toLocaleString('vi-VN')} đ`}
                    </span>,
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  fill="url(#colorRevenue)"
                  fillOpacity={1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Order Status Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.35 }}
      >
        <Card className="shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-900/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2.5 text-cyan-900 dark:text-cyan-200">
              <div className="p-2 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <PieChart className="h-5 w-5" />
              </div>
              <span>Trạng thái đơn hàng</span>
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Tỷ lệ phân bổ trạng thái các đơn hàng hiện có
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[300px] pb-0"
            >
              <RechartsPieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie 
                  data={filteredOrdersData} 
                  dataKey="value" 
                  nameKey="name"
                  label
                >
                  {filteredOrdersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}