import { useEffect, useState, useRef } from "react";
import DesignGrid from "@/components/gallery/DesignGrid";
import Pagination from "@/components/gallery/Pagination";
import FilterSidebar from "@/components/gallery/FilterSidebar";
import { motion } from "framer-motion";
import { Sparkles, Filter } from "lucide-react";

const PAGE_SIZE = 20;

// Static mock designs (100 items) using images from /public/designs
const ROOM_TYPES = [
  "Living Room",
  "Master Bedroom",
  "Kids Bedroom",
  "Kitchen",
  "Dining",
  "Balcony",
];

const STYLES = ["Modern", "Minimal", "Luxury", "Boho", "Traditional"];

const STATIC_DESIGNS = Array.from({ length: 100 }, (_, index) => {
  const i = index + 1;
  const roomType = ROOM_TYPES[index % ROOM_TYPES.length];
  const style = STYLES[index % STYLES.length];
  const price = 50000 + (index % 10) * 15000; // 50K - 185K
  const createdAt = new Date(
    Date.now() - index * 24 * 60 * 60 * 1000
  ).toISOString();
  const popularity = 1000 - index * 5; // descending for "popular" sort

  return {
    id: i,
    title: `${style} ${roomType} ${i}`,
    image: `/designs/img${(index % 6) + 1}.jpg`, // cycles img1–img6 from public/designs
    roomType,
    style,
    price,
    budget: price,
    popularity,
    createdAt,
    isVerified: index % 3 === 0,
    badge:
      index % 4 === 0
        ? { label: "Trending", tone: "primary" }
        : index % 5 === 0
        ? { label: "New", tone: "muted" }
        : null,
  };
});

const Gallery = () => {
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const filterSidebarRef = useRef(null);

  useEffect(() => {
    // fetchDesigns(); // API disabled – using static mock data instead
    setDesigns(STATIC_DESIGNS);
    setFilteredDesigns(STATIC_DESIGNS);
    setIsLoading(false);
  }, []);

  // Original API fetch (commented out as requested)
  // const fetchDesigns = async () => {
  //   setIsLoading(true);
  //   const res = await fetch("http://localhost:5000/api/designs/all");
  //   const data = await res.json();
  //   setDesigns(data);
  //   setFilteredDesigns(data);
  //   setIsLoading(false);
  // };

  const handleFilter = (data) => {
    setFilteredDesigns(data);
    setPage(0);
  };

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedDesigns = filteredDesigns.slice(start, end);
  const hasNext = (page + 1) * PAGE_SIZE < filteredDesigns.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Design Gallery
              </h1>
            </div>

            <motion.button
              onClick={() => filterSidebarRef.current?.open()}
              className="md:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open filters"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm">Filters</span>
            </motion.button>
          </div>
          <p className="text-muted-foreground ml-12 md:ml-12">
            Explore our curated collection of interior designs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <FilterSidebar
            ref={filterSidebarRef}
            totalCount={designs.length}
            designs={designs}
            onFilter={handleFilter}
          />

          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
            <DesignGrid designs={paginatedDesigns} isLoading={isLoading} />
            {paginatedDesigns.length > 0 && (
              <Pagination page={page} setPage={setPage} hasNext={hasNext} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
