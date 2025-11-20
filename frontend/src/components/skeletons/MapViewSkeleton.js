import Skeleton from "../Skeleton";

export default function MapViewSkeleton() {
  return (
    <div className="p-6">
      <div className="bg-white/70 dark:bg-gray-800/60 p-6 rounded-xl shadow mb-4">
        <Skeleton className="h-8 w-56 mb-4" />
        <Skeleton className="h-10 w-40" />
      </div>

      <Skeleton className="h-[75vh] w-full rounded-xl" />
    </div>
  );
}
