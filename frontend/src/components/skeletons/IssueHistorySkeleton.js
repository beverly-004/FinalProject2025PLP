import Skeleton from "../Skeleton";

export default function IssueHistorySkeleton() {
  return (
    <div className="p-6">
      <Skeleton className="h-8 w-64 mb-6" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 mb-4 bg-white/40 dark:bg-gray-900/50 rounded-xl shadow">
          <Skeleton className="h-4 w-48 mb-2" />
          <Skeleton className="h-3 w-72 mb-2" />
          <Skeleton className="h-3 w-56" />
        </div>
      ))}
    </div>
  );
}
