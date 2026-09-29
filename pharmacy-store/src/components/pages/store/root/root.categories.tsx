import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { routes } from "@/config";
import { StoreAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Apple, ArrowRight, Package, Pill, ShoppingBag, Stethoscope, Tablets } from "lucide-react";
import { Link } from "react-router-dom";

function CategorySkeleton() {
  return (
    <>
      {Array(8).fill(0).map((_, index) => (
        <Card key={index} className="bg-white dark:bg-slate-900 border-0 shadow-sm overflow-hidden group">
          <CardContent className="p-6 flex flex-col items-center text-center relative">
            <Skeleton className="p-3 rounded-full w-16 h-16 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

const categoryIcons: Record<string, React.ElementType> = {
  "Thuốc kê đơn": Pill,
  "Thuốc không kê đơn": Tablets,
  "Thực phẩm chức năng": Package,
  "Thiết bị y tế": Stethoscope,
  "Vitamin & Khoáng chất": Apple,
  "default": ShoppingBag
};

export function RootCategories() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: StoreAPI.CategoryRoot,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b from-slate-50 via-white to-violet-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <div className="space-y-2">
            <Badge variant="outline" className="border-violet-200 dark:border-violet-800 bg-violet-50/90 dark:bg-violet-950/70 text-violet-900 dark:text-cyan-300 px-4 py-1.5 text-sm font-bold rounded-full shadow-sm">
              Danh mục sản phẩm
            </Badge>
            <h2 className="text-3xl font-black tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-violet-800 via-cyan-600 to-cyan-500 dark:from-violet-400 dark:via-cyan-300 dark:to-cyan-300 bg-clip-text text-transparent">
              Khám phá sản phẩm Pharmacity Store
            </h2>
            <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-300">
              Cung cấp đa dạng các dòng thuốc kê đơn, không kê đơn, thực phẩm chức năng và thiết bị y tế chính hãng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {isLoading ? (
            <CategorySkeleton />
          ) : !categories || categories.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-slate-500">Không có danh mục nào</p>
            </div>
          ) : (
            (() => {
              const uniqueCategories: typeof categories = [];
              const seenTitles = new Set<string>();
              categories.forEach(cat => {
                if (cat.isActive !== false && !seenTitles.has(cat.title)) {
                  seenTitles.add(cat.title);
                  uniqueCategories.push(cat);
                }
              });
              return uniqueCategories;
            })().map((category, index) => {
              const CategoryIcon = categoryIcons[category.title] || categoryIcons.default;

              return (
                <Link key={index} to={`${routes.store.root}?category=${category.title}`} className="h-full">
                  <div className="h-full">
                    <Card className="bg-white dark:bg-slate-900 border border-violet-100/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer overflow-hidden h-full flex flex-col rounded-2xl">
                      <CardContent className="p-6 flex flex-col items-center text-center relative flex-1">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-violet-950/80 dark:to-cyan-950/50 mb-4 group-hover:from-violet-100 group-hover:to-cyan-100 dark:group-hover:from-violet-900/80 dark:group-hover:to-cyan-900/80 transition-colors duration-300 relative z-10 border border-cyan-200/50 dark:border-cyan-800/40">
                          <motion.div
                            animate={{ y: [0, -3, 0], scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}
                            className="text-violet-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                          >
                            <CategoryIcon size={30} />
                          </motion.div>
                        </div>
                        <h3 className="font-bold text-lg mb-1 relative z-10 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors duration-300 text-slate-900 dark:text-white">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 relative z-10 line-clamp-2 flex-1">
                          {category.description || `Khám phá các sản phẩm trong danh mục ${category.title}`}
                        </p>

                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                      </CardContent>
                    </Card>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="group bg-gradient-to-r from-violet-700 via-violet-600 to-cyan-600 hover:from-violet-800 hover:to-cyan-700 text-white border-0 shadow-md hover:shadow-lg shadow-violet-600/25 transition-all duration-300 rounded-xl px-7 py-3.5 font-bold" asChild>
            <Link to={routes.store.categories} className="flex items-center gap-2">
              Xem tất cả danh mục
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}