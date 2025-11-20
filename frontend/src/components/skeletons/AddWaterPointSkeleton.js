import Skeleton from "../Skeleton";

export default function AddWaterPointSkeleton() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white/40 dark:bg-gray-900/50 rounded-xl shadow">
      <Skeleton className="h-8 w-40 mb-4" />

      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="mb-6">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}

      <Skeleton className="h-12 w-full" />
    </div>
  );
}
