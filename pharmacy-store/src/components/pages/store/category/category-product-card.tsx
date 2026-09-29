import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, ShoppingCart, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "@/config";
import { StockStatus } from "@/data/enums";
import { MedicineResponse } from "@/data/interfaces";

interface ProductCardProps {
  medicine: MedicineResponse;
  isHovered: boolean;
  isAddingToCart: boolean;
  onHover: (id: string | null) => void;
  onAddToCart: (id: string) => Promise<void>;
  lastRef?: React.Ref<HTMLDivElement>;
}

export function CategoryProductCard({
  medicine,
  isHovered,
  isAddingToCart,
  onHover,
  onAddToCart,
  lastRef
}: ProductCardProps) {
  const isOutOfStock = medicine.variants?.stockStatus === StockStatus.OUT_OF_STOCK;

  const handleAddToCart = async () => {
    if (isOutOfStock || isAddingToCart) return;
    await onAddToCart(medicine.id);
  };

  return (
    <Card
      className="overflow-hidden h-full flex flex-col group bg-background/50 backdrop-blur-sm border-muted hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => onHover(medicine.id)}
      onMouseLeave={() => onHover(null)}
      ref={lastRef}
    >
      <Link to={routes.store.medicineDetails(medicine.id)} className="flex-grow">
        <div className="relative pt-[100%] bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={medicine.thumbnail?.url || ""}
              alt={medicine.thumbnail?.alt || "Product Image"}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Discount badge */}
          {(medicine.variants?.discountPercent ?? 0) > 0 && (
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-700 hover:to-cyan-700">
              -{medicine.variants?.discountPercent}%
            </Badge>
          )}

          {/* Stock badge */}
          {isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Hết hàng
            </Badge>
          )}
        </div>

        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="font-medium line-clamp-2 hover:text-violet-600 dark:hover:text-cyan-400 cursor-pointer mb-2 transition-colors group-hover:text-violet-600 dark:group-hover:text-cyan-400">
            {medicine.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 flex-grow">
            {medicine.description}
          </p>

          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => {
              const starValue = medicine.ratings?.star || 0;
              const isFullStar = i < Math.floor(starValue);
              const isHalfStar = !isFullStar && i === Math.floor(starValue) && starValue % 1 >= 0.5;

              return (
                <div key={i} className="relative">
                  <Star
                    className={`h-4 w-4 ${isFullStar || isHalfStar
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                      }`}
                    fill={isFullStar ? "currentColor" : "none"}
                  />
                  {isHalfStar && (
                    <div className="absolute inset-0 overflow-hidden w-[50%]">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                </div>
              );
            })}
            <span className="text-xs text-muted-foreground ml-1">
              ({(medicine.ratings?.star || 0).toFixed(1)})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              {(medicine.variants?.discountPercent ?? 0) > 0 && (
                <span className="text-sm line-through text-muted-foreground">
                  {Math.floor((medicine.variants?.price || 0) / (1 - (medicine.variants?.discountPercent ?? 0) / 100)).toLocaleString()}₫
                </span>
              )}
              <span className="font-bold text-violet-600 dark:text-cyan-400">{(medicine.variants?.price || 0).toLocaleString()}₫</span>
              {/* Supplier name */}
              {medicine.supplier?.name && (
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {medicine.supplier.name}
                </span>
              )}
            </div>
            {!isOutOfStock ? (
              <div className="flex items-center text-xs text-violet-600 dark:text-cyan-400">
                <Truck className="h-3 w-3 mr-1" />
                <span className="font-medium">Có sẵn ({medicine.variants?.quantity || 0})</span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-400">
                <PhoneCall className="h-3 w-3 mr-1" />
                <span className="font-medium">Liên hệ</span>
              </div>
            )}
          </div>
        </CardContent>
      </Link>

      {/* Quick action buttons */}
      <div className={`absolute right-2 top-2 transition-all duration-300 flex flex-col gap-2 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
        >
          <ShoppingCart className={`h-4 w-4 ${isAddingToCart ? 'animate-ping text-violet-600' : 'text-violet-600 fill-violet-600 dark:text-cyan-400 dark:fill-cyan-400'}`} />
        </Button>
      </div>

      {/* Hover showing */}
      <div className={`mt-3 px-4 pb-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <Button
          className="w-full text-sm h-8 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0 relative overflow-hidden"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
        >
          {isAddingToCart && (
            <span className="absolute inset-0 flex items-center justify-center bg-violet-700 animate-pulse">
              Đã thêm!
            </span>
          )}
          <span className={isAddingToCart ? 'opacity-0' : 'opacity-100'}>
            {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
          </span>
        </Button>
      </div>
    </Card>
  );
} 