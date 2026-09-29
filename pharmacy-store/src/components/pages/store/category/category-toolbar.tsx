import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid, List, Search, TrendingUp } from "lucide-react";
import type { MedicineFilterParams } from "@/data/interfaces";
import { useState, useEffect } from "react";

interface CategoryToolbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  totalProducts: number;
  hasActiveFilters: boolean;
  sortBy?: MedicineFilterParams["sort_by"];
  sortOrder?: "asc" | "desc";
  onSortChange?: (sortField: MedicineFilterParams["sort_by"], order?: "asc" | "desc") => void;
}

const POPULAR_SUGGESTIONS = [
  "Paracetamol", "Vitamin C", "Ibuprofen", "Thuốc ho",
  "Thuốc đau đầu", "Kháng sinh", "Canxi", "Omega 3",
  "Berocca", "Prospan",
];

export function CategoryToolbar({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  totalProducts,
  hasActiveFilters,
  sortBy = "created_at",
  sortOrder = "desc",
  onSortChange
}: CategoryToolbarProps) {

  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  // Live search voi debounce 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = localSearchValue.trim();
      if (trimmed !== searchQuery) {
        setSearchQuery(trimmed);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearchValue, searchQuery, setSearchQuery]);

  const handleClearSearch = () => {
    setLocalSearchValue("");
    setSearchQuery("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setLocalSearchValue(suggestion);
    setSearchQuery(suggestion);
    setIsFocused(false);
  };

  const filteredSuggestions = localSearchValue.trim().length > 0
    ? POPULAR_SUGGESTIONS.filter(s =>
        s.toLowerCase().includes(localSearchValue.toLowerCase()) &&
        s.toLowerCase() !== localSearchValue.toLowerCase()
      ).slice(0, 5)
    : POPULAR_SUGGESTIONS;

  const showDropdown = isFocused && (localSearchValue.trim().length === 0 || filteredSuggestions.length > 0);

  const getSortValue = () => {
    if (sortBy === "price_asc") return "price-asc";
    if (sortBy === "price_desc") return "price-desc";
    if (sortBy === "rating_desc") return "rating-desc";
    if (sortBy === "popular") return "popular";
    if (sortBy === "name" && sortOrder === "asc") return "name-asc";
    if (sortBy === "name" && sortOrder === "desc") return "name-desc";
    if (sortBy === "created_at" && sortOrder === "desc") return "newest";
    return "default";
  };

  const handleSortChange = (value: string) => {
    if (!onSortChange) return;
    switch (value) {
      case "default":
      case "newest":
        onSortChange("created_at", "desc");
        break;
      case "price-asc":
        onSortChange("price_asc");
        break;
      case "price-desc":
        onSortChange("price_desc");
        break;
      case "rating-desc":
        onSortChange("rating_desc");
        break;
      case "popular":
        onSortChange("popular");
        break;
      case "name-asc":
        onSortChange("name", "asc");
        break;
      case "name-desc":
        onSortChange("name", "desc");
        break;
      default:
        onSortChange("created_at", "desc");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Hiển thị {totalProducts} sản phẩm
          </span>
        </div>
        {hasActiveFilters && (
          <Badge variant="outline" className="bg-cyan-50 dark:bg-violet-900/20 text-violet-700 dark:text-cyan-300 border-violet-200 dark:border-violet-700">
            Đã áp dụng bộ lọc
          </Badge>
        )}
      </div>

      <div className="flex-1 max-w-lg mx-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-white dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-cyan-400 dark:focus-within:border-cyan-500 transition-all duration-300">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-11 h-11 text-gray-400 dark:text-gray-500 group-focus-within:text-cyan-500 transition-colors duration-200">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm thuốc..."
                value={localSearchValue}
                onChange={(e) => setLocalSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="flex-1 py-3 pr-4 text-sm bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
              />
              {localSearchValue && (
                <button
                  onClick={handleClearSearch}
                  className="flex items-center justify-center w-8 h-8 mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2 px-1">
                  <TrendingUp className="w-3 h-3" />
                  {localSearchValue.trim().length === 0 ? "Tìm kiếm phổ biến" : "Gợi ý"}
                </div>
                <div className="space-y-0.5">
                  {filteredSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onMouseDown={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors duration-150 flex items-center gap-2"
                    >
                      <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Sắp xếp:</span>
          <Select value={getSortValue()} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-sm">
              <SelectValue placeholder="Chọn cách sắp xếp" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
              <SelectItem value="default">Mặc định</SelectItem>
              <SelectItem value="price-asc">Giá tăng dần</SelectItem>
              <SelectItem value="price-desc">Giá giảm dần</SelectItem>
              <SelectItem value="rating-desc">Đánh giá cao nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="popular">Phổ biến nhất</SelectItem>
              <SelectItem value="name-asc">Tên A-Z</SelectItem>
              <SelectItem value="name-desc">Tên Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Hiển thị:</span>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`h-8 w-8 p-0 rounded-md transition-all duration-200 ${viewMode === "grid"
                  ? "bg-white dark:bg-gray-800 shadow-sm text-violet-600 dark:text-cyan-400"
                  : "hover:bg-white/50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                }`}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`h-8 w-8 p-0 rounded-md transition-all duration-200 ${viewMode === "list"
                  ? "bg-white dark:bg-gray-800 shadow-sm text-violet-600 dark:text-cyan-400"
                  : "hover:bg-white/50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400"
                }`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
