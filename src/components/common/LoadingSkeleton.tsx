export function LoadingSkeleton() {
  return (
    <div className="flex gap-3 p-3" role="status" aria-label="AI is thinking">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 skeleton-shimmer" aria-hidden="true" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded skeleton-shimmer" aria-hidden="true" />
        <div className="h-4 w-1/2 bg-gray-200 rounded skeleton-shimmer" aria-hidden="true" />
        <div className="h-4 w-2/3 bg-gray-200 rounded skeleton-shimmer" aria-hidden="true" />
      </div>
      <span className="sr-only">Analysing CV data...</span>
    </div>
  );
}
