// src/components/ui/SkeletonCard.jsx
const SkeletonCard = () => (
  <div className="animate-pulse bg-parchment text-sepia rounded-2xl shadow-lg p-6 flex flex-col">
    <div className="bg-sepia h-48 w-full rounded mb-4" />
    <div className="space-y-2 flex-1">
      <div className="h-6 bg-sepia rounded w-3/4" />
      <div className="h-4 bg-sepia rounded w-1/2" />
    </div>
    <div className="mt-4 h-8 bg-sepia rounded w-1/3" />
  </div>
);

export default SkeletonCard;