export function DataGridSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 rounded-md bg-muted"></div>
        <div className="h-5 w-36 rounded-md bg-muted"></div>
      </div>

      {/* Toolbar skeleton */}
      <div className="h-12 rounded-md border bg-card"></div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-md border">
        {/* Header row */}
        <div className="h-10 bg-muted"></div>

        {/* Data rows */}
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-12 border-t bg-card"></div>
          ))}

        {/* Footer */}
        <div className="h-10 border-t bg-muted"></div>
      </div>
    </div>
  );
}
