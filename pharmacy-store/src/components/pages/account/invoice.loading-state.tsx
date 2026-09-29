import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function InvoiceLoadingState() {
  return (
    <Card className="border-violet-100 dark:border-violet-800/30 shadow-sm overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-violet-950/20 dark:to-violet-950/20 border-b border-violet-100 dark:border-violet-800/30">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-40" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-5 p-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border border-violet-100 dark:border-violet-800/30 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full bg-violet-100/60 dark:bg-violet-900/30" />
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-32 bg-violet-100/60 dark:bg-violet-900/30" />
                        <Skeleton className="h-4 w-40 bg-violet-100/60 dark:bg-violet-900/30" />
                      </div>
                    </div>
                  </div>
                  <Skeleton className="h-7 w-28 rounded-full bg-violet-100/60 dark:bg-violet-900/30" />
                </div>

                <div className="mt-6 space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-2 rounded-md bg-violet-100/60 dark:bg-violet-900/30" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-40 bg-violet-100/60 dark:bg-violet-900/30" />
                          <Skeleton className="h-3 w-20 bg-violet-100/60 dark:bg-violet-900/30" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-24 bg-violet-100/60 dark:bg-violet-900/30" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-violet-100/60 dark:border-violet-900/40 flex justify-end gap-3">
                  <Skeleton className="h-9 w-28 rounded-full bg-violet-100/60 dark:bg-violet-900/30" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 