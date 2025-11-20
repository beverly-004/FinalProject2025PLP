import Skeleton from "../Skeleton";

export default function WaterPointsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-white/40 dark:bg-gray-900/50 rounded-xl shadow-lg backdrop-blur">
          <Skeleton className="h-6 w-44 mb-4" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
    </div>
  );
}
