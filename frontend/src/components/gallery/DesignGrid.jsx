import { motion, AnimatePresence } from "framer-motion";
import DesignCard from "./DesignCard";
import SkeletonGrid from "./SkeletonGrid";

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const DesignGrid = ({
  designs = [],
  isLoading = false,
}) => {
  // Loading state
  if (isLoading) {
    return <SkeletonGrid />;
  }

  // Empty state
  if (!designs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-foreground">
          No designs match your filters
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your budget or style preferences
        </p>
      </div>
    );
  }

  // Populated state
  return (
    <AnimatePresence>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="visible"
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
        {designs.map((design) => (
          <motion.div
            key={design.id}
            variants={itemVariants}
            className="
              transition-transform
              duration-200
              ease-out
              hover:-translate-y-1
            "
          >
            <DesignCard {...design} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DesignGrid;
