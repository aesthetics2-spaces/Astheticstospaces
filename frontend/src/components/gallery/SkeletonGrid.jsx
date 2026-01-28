const SkeletonCard = () => {
    return (
      <div
        className="
          rounded-lg
          border
          border-border
          bg-card
          shadow-sm
          overflow-hidden
          animate-pulse
        "
      >
        {/* Image */}
        <div className="h-48 bg-muted" />
  
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-3 w-12 rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  };
  
  const SkeletonGrid = ({ count = 6 }) => {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          max-w-7xl
          mx-auto
        "
      >
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  };
  
  export default SkeletonGrid;
  