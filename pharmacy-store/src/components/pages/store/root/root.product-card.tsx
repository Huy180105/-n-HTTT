import { Icons } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config";
import { MedicineResponse } from "@/data/interfaces";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

interface RootProductCardProps {
  className?: string;
  medicine: MedicineResponse;
  index?: number;
}

function StarRating({ rating, className }: { rating: number; className?: string }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
    );
  }
  
  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative">
        <Star className="h-3.5 w-3.5 text-slate-300" />
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
        </div>
      </div>
    );
  }
  
  const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="h-3.5 w-3.5 text-slate-300 dark:text-slate-700" />
    );
  }
  
  return (
    <div className={cn("flex items-center", className)}>
      {stars}
    </div>
  );
}

export function RootProductCard({ className, medicine, index = 0, ...props }: RootProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn("", className)}
      {...props}
    >
      <Card className="rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group bg-white/90 backdrop-blur-sm dark:bg-slate-900/80 h-full flex flex-col">
        <Link to={routes.store.medicineDetails(medicine.id)} className="block flex-1">
          <CardContent className="relative p-0 overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-slate-50 to-violet-50/40 dark:from-slate-800/40 dark:to-violet-950/20 flex items-center justify-center overflow-hidden">
              <img
                src={medicine.thumbnail?.url || ""}
                alt={medicine.thumbnail?.alt || medicine.name || "Thuốc"}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-gradient-to-br from-violet-50 to-cyan-50 dark:from-violet-900/30 dark:to-cyan-900/20 flex items-center justify-center">
                      <svg class="h-16 w-16 text-violet-500 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/>
                      </svg>
                    </div>
                  `;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {medicine.variants?.discountPercent && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                -{medicine.variants.discountPercent}%
              </div>
            )}
          </CardContent>

          <CardHeader className="p-5">
            <div className="flex items-center mb-2.5">
              <div className="flex items-center bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md border border-amber-200/50 dark:border-amber-800/40">
                <StarRating rating={medicine.ratings?.star || 5} className="mr-1.5" />
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  {medicine.ratings?.star || 5}
                </span>
              </div>
              <Separator orientation="vertical" className="mx-2 h-3.5" />
              <div className="text-xs text-slate-500 dark:text-slate-400">
                ({medicine.ratings?.reviewCount || 0} đánh giá)
              </div>
            </div>
            
            <CardTitle className="font-semibold text-base mb-1.5 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-cyan-400 transition-colors duration-200 text-slate-900 dark:text-white">
              {medicine.name}
            </CardTitle>

            <div className="hidden md:block mb-3">
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {medicine.description}
              </CardDescription>
            </div>

            <div className="flex items-baseline gap-2">
              <div className="font-bold text-lg bg-gradient-to-r from-violet-700 to-cyan-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-300">
                {medicine.variants?.price?.toLocaleString('vi-VN')}₫
              </div>
              {medicine.variants?.originalPrice && (
                <div className="text-xs text-slate-400 line-through">
                  {medicine.variants.originalPrice.toLocaleString('vi-VN')}₫
                </div>
              )}
            </div>
          </CardHeader>
        </Link>

        <CardFooter className="p-5 pt-0 mt-auto">
          <div className="flex gap-2.5 w-full">
            <Suspense
              fallback={
                <Button className="rounded-xl p-0 h-9 w-9" disabled>
                  <Icons.basket className="h-4 w-4" />
                </Button>
              }
            >
              <Button
                size="icon"
                className="rounded-xl h-9 w-9 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Icons.basket className="h-4 w-4" />
              </Button>
            </Suspense>

            <Button
              variant="default"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-medium group border-0 shadow-sm hover:shadow-md transition-all duration-200 flex-1 text-xs"
              asChild
            >
              <Link to={routes.store.medicineDetails(medicine.id)}>
                <span>Xem chi tiết</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </CardFooter>
        
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-cyan-500 to-cyan-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Card>
    </motion.div>
  );
}
