import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-br from-background to-muted/20">
      {/* Desktop Skeleton */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
              <tr>
                {Array.from({ length: columns }).map((_, i) => (
                  <th key={i} className="p-4 text-left">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b">
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="p-4">
                      {colIndex === 0 ? (
                        <Skeleton className="h-4 w-4" />
                      ) : colIndex === 1 ? (
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      ) : (
                        <Skeleton className="h-4 w-24" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="p-4 lg:hidden">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-background to-muted/10 p-4"
            >
              <div className="flex items-start gap-3">
                <Skeleton className="mt-1 h-4 w-4" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}
