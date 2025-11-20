import Skeleton from "../Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-6 rounded-xl shadow-lg bg-white/40 dark:bg-gray-900/50 backdrop-blur">
          <Skeleton className="h-20 w-20 mx-auto mb-4" />
          <Skeleton className="h-4 w-32 mx-auto mb-2" />
          <Skeleton className="h-3 w-48 mx-auto" />
        </div>
      ))}
    </div>
  );
}
