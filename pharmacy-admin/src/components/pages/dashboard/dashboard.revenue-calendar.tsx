import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DashboardRevenueCalendar as RevenueData } from '@/data/interfaces';
import { DashboardAPI } from '@/services/v1';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { CalendarDays, CalendarIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface DashboardRevenueCalendarProps {
  isLoading?: boolean;
}

export function DashboardRevenueCalendar({ isLoading }: DashboardRevenueCalendarProps) {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
    to: currentDate,
  });

  useEffect(() => {
    const now = new Date();
    setRange({
      from: new Date(now.getFullYear(), now.getMonth(), 1),
      to: now,
    });
  }, []);

  const setToday = () => {
    const now = new Date();
    setRange({ from: now, to: now });
  };

  const setLast7Days = () => {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - 6);
    setRange({ from: past, to: now });
  };

  const resetToCurrentMonth = () => {
    const now = new Date();
    setRange({
      from: new Date(now.getFullYear(), now.getMonth(), 1),
      to: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    });
  };

  const setLastMonth = () => {
    const now = new Date();
    setRange({
      from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
      to: new Date(now.getFullYear(), now.getMonth(), 0),
    });
  };

  const chartConfig = {
    revenue: {
      label: "Doanh thu",
      color: "#10b981", // cyan-500
    },
  };

  // Generate list of distinct (month, year) pairs needed for the current range
  const monthsToFetch = useMemo(() => {
    if (!range?.from) {
      const now = new Date();
      return [{ month: now.getMonth() + 1, year: now.getFullYear() }];
    }

    const fromDate = new Date(range.from);
    const toDate = range.to ? new Date(range.to) : new Date(range.from);

    const months: { month: number; year: number }[] = [];
    const current = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
    const end = new Date(toDate.getFullYear(), toDate.getMonth(), 1);

    while (current <= end) {
      months.push({
        month: current.getMonth() + 1,
        year: current.getFullYear(),
      });
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }, [range?.from, range?.to]);

  const { data: revenueData = [], isLoading: isLoadingRevenueData } = useQuery<RevenueData[]>({
    queryKey: ['dashboard-revenue-calendar', monthsToFetch],
    queryFn: async () => {
      const allResults = await Promise.all(
        monthsToFetch.map(async ({ month, year }) => {
          const result = await DashboardAPI.DashboardRevenueCalendar(month, year);
          if (result?.length > 0) {
            return result.map((item: { date: string; revenue: number; orders: number }) => {
              let formattedDate = item.date;
              if (item.date.includes('/')) {
                const parts = item.date.split('/');
                const dayStr = parts[0].padStart(2, '0');
                const monthStr = parts.length > 1 ? parts[1].padStart(2, '0') : String(month).padStart(2, '0');
                const yearStr = parts.length > 2 ? parts[2] : String(year);
                formattedDate = `${yearStr}-${monthStr}-${dayStr}`;
              }
              return {
                ...item,
                date: formattedDate,
              };
            });
          }
          return [];
        })
      );
      return allResults.flat().sort((a, b) => a.date.localeCompare(b.date));
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });

  const filteredData = useMemo(() => {
    if (!range?.from) return revenueData;
    const toDate = range.to || range.from;
    
    const fromStr = `${range.from.getFullYear()}-${String(range.from.getMonth() + 1).padStart(2, '0')}-${String(range.from.getDate()).padStart(2, '0')}`;
    const toStr = `${toDate.getFullYear()}-${String(toDate.getMonth() + 1).padStart(2, '0')}-${String(toDate.getDate()).padStart(2, '0')}`;

    return revenueData.filter((item: RevenueData) => {
      return item.date >= fromStr && item.date <= toStr;
    });
  }, [revenueData, range]);

  const isMultiMonth = useMemo(() => {
    if (!range?.from) return false;
    const toDate = range.to || range.from;
    return range.from.getMonth() !== toDate.getMonth() || range.from.getFullYear() !== toDate.getFullYear();
  }, [range]);

  const totalRevenue = useMemo(() => {
    return filteredData.reduce((acc: number, curr: RevenueData) => acc + (curr.revenue || 0), 0);
  }, [filteredData]);

  const formatDateRange = () => {
    if (range?.from) {
      const toDate = range.to || range.from;
      if (range.from.getTime() === toDate.getTime()) {
        return range.from.toLocaleDateString('vi-VN');
      }
      return `${range.from.toLocaleDateString('vi-VN')} - ${toDate.toLocaleDateString('vi-VN')}`;
    }
    return "Chọn khoảng thời gian";
  };

  const isComponentLoading = isLoading || isLoadingRevenueData;

  if (isComponentLoading) {
    return (
      <Card className="@container/card w-full shadow-md">
        <CardHeader className="flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-blue-600" />
              Doanh thu theo ngày
            </CardTitle>
            <CardDescription>Đang tải dữ liệu doanh thu...</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <div className="h-[250px] w-full bg-gray-100 animate-pulse rounded"></div>
        </CardContent>
      </Card>
    );
  }

  const renderHeaderControls = () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={setToday} className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700">
        Hôm nay
      </Button>
      <Button variant="outline" size="sm" onClick={setLast7Days} className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700">
        7 ngày qua
      </Button>
      <Button variant="outline" size="sm" onClick={resetToCurrentMonth} className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700">
        Tháng này
      </Button>
      <Button variant="outline" size="sm" onClick={setLastMonth} className="dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700">
        Tháng trước
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-auto min-w-[200px] justify-center font-normal dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:dark:bg-slate-700">
            {formatDateRange()}
            <CalendarIcon className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 dark:border-slate-800 dark:bg-slate-900" align="end">
          <Calendar
            className="w-full"
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            captionLayout="dropdown"
            fixedWeeks
            showOutsideDays
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  if (!filteredData || filteredData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="@container/card w-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-900/80">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-slate-800 gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <CalendarDays className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
                Doanh thu theo ngày
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400">
                Biểu đồ cột hiển thị doanh thu hàng ngày trong khoảng thời gian được chọn
              </CardDescription>
            </div>
            {renderHeaderControls()}
          </CardHeader>
          <CardContent className="px-4 py-8">
            <div className="flex flex-col items-center justify-center h-[250px] text-center">
              <CalendarDays className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Không có dữ liệu</h3>
              <p className="text-slate-500 dark:text-slate-400">Không có dữ liệu doanh thu cho khoảng thời gian đã chọn.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card className="@container/card w-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-900/80">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200/80 dark:border-slate-800 gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <CalendarDays className="h-5 w-5 text-blue-600 dark:text-cyan-400" />
              Doanh thu theo ngày
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              Biểu đồ cột hiển thị doanh thu hàng ngày trong khoảng thời gian được chọn
            </CardDescription>
          </div>
          {renderHeaderControls()}
        </CardHeader>
        <CardContent className="px-4 py-8">
          <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
            <BarChart accessibilityLayer data={filteredData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={15}
                tickFormatter={(value: string) => {
                  const d = new Date(value);
                  if (isNaN(d.getTime())) return value;
                  if (isMultiMonth) {
                    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
                  }
                  return `${d.getDate()}`;
                }}
              />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                tickLine={false}
                axisLine={false}
                className="text-xs"
              />
              <ChartTooltip
                formatter={(value: number) => [`${value.toLocaleString('vi-VN')} đ`, "Doanh thu"]}
                labelFormatter={(label: string) => {
                  const d = new Date(label);
                  if (isNaN(d.getTime())) return label;
                  return d.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit", 
                    year: "numeric",
                  });
                }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="border-t border-slate-200/80 dark:border-slate-800">
          <div className="text-sm pt-5 text-slate-700 dark:text-slate-300">
            Tổng doanh thu trong khoảng thời gian đã chọn:{" "}
            <span className="font-semibold text-blue-600 dark:text-cyan-400">
              {totalRevenue.toLocaleString('vi-VN')} đ
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 