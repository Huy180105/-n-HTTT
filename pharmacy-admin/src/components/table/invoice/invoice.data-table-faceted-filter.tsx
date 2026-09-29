import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { CheckIcon, Filter, PlusCircle } from "lucide-react";
import { motion } from "motion/react";

interface InvoiceDataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string | boolean;
    icon?: React.ComponentType<{ className?: string }>;
    color?: string;
    count?: number; // Tổng số từ toàn bộ data
  }[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function InvoiceDataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  value,
  onValueChange
}: InvoiceDataTableFacetedFilterProps<TData, TValue>) {
  const selectedValues = new Set(value ? [value] : column?.getFilterValue() as (string | boolean)[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-9 border-blue-200 dark:border-blue-800/40 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-blue-700 transition-all duration-200 px-3 shadow-sm",
            selectedValues?.size > 0 ? "border-cyan-300 dark:border-blue-700 text-blue-700 dark:text-cyan-400" : "border-dashed"
          )}
        >
          {selectedValues?.size > 0 ? (
            <Filter className="h-3.5 w-3.5 mr-2 text-cyan-500 dark:text-cyan-400" />
          ) : (
            <PlusCircle className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{title}</span>
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4 bg-blue-200 dark:bg-blue-800/60" />
              <Badge
                variant="secondary"
                className="rounded-md px-1.5 py-0 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800/50 lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-md px-1.5 py-0 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800/50"
                  >
                    {selectedValues.size} đã chọn
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="outline"
                        key={option.value.toString()}
                        className={cn(
                          "rounded-md px-1.5 py-0 text-xs font-medium flex items-center gap-1",
                          option.color || "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800/50"
                        )}
                      >
                        {option.icon && <option.icon className="h-3 w-3" />}
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[220px] p-0 border-blue-100 dark:border-blue-800/40 shadow-lg rounded-md overflow-hidden"
        align="start"
        sideOffset={8}
      >
        <Command className="bg-white dark:bg-slate-900">
          <CommandInput
            placeholder={`Tìm ${title?.toLowerCase()}...`}
            className="h-9 px-3 text-sm border-b border-blue-100 dark:border-blue-800/30 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-sm text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Filter className="w-4 h-4 text-slate-400" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Không tìm thấy kết quả</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Thử tìm kiếm với từ khóa khác</p>
              </div>
            </CommandEmpty>
            <CommandGroup className="py-1.5 px-1">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value.toString()}
                    onSelect={() => {
                      onValueChange?.(option.value.toString());
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                    className="flex items-center gap-2.5 px-2 py-1.5 cursor-pointer text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 aria-selected:bg-blue-50 dark:aria-selected:bg-blue-900/20 aria-selected:text-blue-700 dark:aria-selected:text-cyan-400 rounded-sm"
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm text-sm",
                        isSelected
                          ? "bg-blue-600 dark:bg-cyan-500 text-white border-blue-600 dark:border-cyan-500"
                          : "border border-slate-300 dark:border-slate-600"
                      )}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: isSelected ? 1 : 0 }}
                        transition={{ duration: 0.1 }}
                      >
                        <CheckIcon className="h-3.5 w-3.5" />
                      </motion.div>
                    </div>
                    {option.icon && (
                      <option.icon className={cn(
                        "h-3.5 w-3.5",
                        isSelected ? "text-blue-600 dark:text-cyan-400" : "text-muted-foreground"
                      )} />
                    )}
                    <span className="truncate">{option.label}</span>
                    {option.count !== undefined && (
                      <Badge className="ml-auto h-5 px-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-cyan-400 border-blue-200 dark:border-blue-800/50 text-xs rounded-full">
                        {option.count}
                      </Badge>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator className="bg-blue-100 dark:bg-blue-800/30 -mx-1" />
                <CommandGroup className="py-1.5 px-1">
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center w-full px-2 py-1.5 cursor-pointer text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-sm font-medium text-sm"
                  >
                    Xóa bộ lọc
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}