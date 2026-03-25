import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-10 w-32 bg-white/5" />
        <Skeleton className="h-10 w-40 bg-white/5" />
      </div>

      <div className="h-48 w-full rounded-3xl bg-white/5 border border-white/10 p-8 mb-8 animate-pulse" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10 p-6 animate-pulse" />
        ))}
      </div>

      <div className="h-[400px] w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 animate-pulse" />
      
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 bg-white/5" />
        <div className="h-96 w-full rounded-xl bg-white/5 border border-white/10 animate-pulse" />
      </div>
    </div>
  );
}
