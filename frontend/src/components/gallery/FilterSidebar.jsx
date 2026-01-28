import React, { useEffect, useMemo, useState, useImperativeHandle, forwardRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  DollarSign,
  Sliders,
  ArrowUpDown,
  CheckCircle,
  Home,
  Bed,
  Baby,
  ChefHat,
  UtensilsCrossed,
  Sun,
  Filter,
  XCircle,
} from "lucide-react";

const ROOM_TYPES = [
  { label: "Living Room", icon: Home },
  { label: "Master Bedroom", icon: Bed },
  { label: "Kids Bedroom", icon: Baby },
  { label: "Kitchen", icon: ChefHat },
  { label: "Dining", icon: UtensilsCrossed },
  { label: "Balcony", icon: Sun },
];

const STYLES = [
  { label: "Modern", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { label: "Minimal", color: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20" },
  { label: "Luxury", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { label: "Boho", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { label: "Traditional", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
];

const SORT_OPTIONS = [
  { value: "price_asc", label: "Price Low to High" },
  { value: "popular", label: "Popular" },
  { value: "new", label: "New" },
];

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

const FilterSidebar = forwardRef(function FilterSidebar({
  designs = [],
  totalCount = 0, 
  onFilter = () => {},
}, ref) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Expose openMobileFilter function to parent via ref
  useImperativeHandle(ref, () => ({
    open: () => setMobileOpen(true),
  }));

  const [filters, setFilters] = useState({
    roomType: "",
    style: "",
    budget: 500000,
    sort: "popular",
  });

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.roomType) count++;
    if (filters.style) count++;
    if (filters.budget < 500000) count++;
    return count;
  }, [filters]);

  // Real-time filtering logic
  const filteredDesigns = useMemo(() => {
    let data = [...designs];

    if (filters.roomType)
      data = data.filter((d) => d.roomType === filters.roomType);

    if (filters.style)
      data = data.filter((d) => d.style === filters.style);

    data = data.filter((d) => d.price <= filters.budget);

    if (filters.sort === "price_asc") {
      data.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "new") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      data.sort((a, b) => b.popularity - a.popularity);
    }

    return data;
  }, [designs, filters]);

  useEffect(() => {
    onFilter(filteredDesigns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDesigns]);

  const clearFilters = () =>
    setFilters({
      roomType: "",
      style: "",
      budget: 500000,
      sort: "popular",
    });

  return (
    <>
      {/* Mobile Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <motion.button
          aria-label="Open filters"
          className="relative p-4 rounded-2xl shadow-xl bg-gradient-to-br from-primary to-primary/80 backdrop-blur-md border border-primary/20 hover:shadow-2xl transition-all"
          onClick={() => setMobileOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter className="w-6 h-6 text-primary-foreground" />
          {activeFiltersCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[0.65rem] font-bold text-destructive-foreground shadow-lg"
            >
              {activeFiltersCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 sticky top-6 h-fit">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 p-6 space-y-6"
        >
          <SidebarContent
            filters={filters}
            setFilters={setFilters}
            filteredCount={filteredDesigns.length}
            totalCount={totalCount}  
            clearFilters={clearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </motion.div>
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            aria-label="Close filters overlay"
          >
            <motion.div
              className="absolute right-0 top-0 w-4/5 h-full bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl shadow-2xl border-l border-border/50 rounded-l-3xl p-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-bold">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <button
                  aria-label="Close filters"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <SidebarContent
                filters={filters}
                setFilters={setFilters}
                filteredCount={filteredDesigns.length}
                totalCount={totalCount} 
                clearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default FilterSidebar;

function SidebarContent({ filters, setFilters, filteredCount, totalCount, clearFilters, activeFiltersCount }) {
  return (
    <div className="space-y-6">
{/* Header */}
<motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5 border border-primary/20"
>
  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
  <div className="relative flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-primary/10">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Showing</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {filteredCount}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          out of <span className="font-semibold text-foreground">{totalCount}</span> designs
        </p>
      </div>
    </div>
  </div>
  {activeFiltersCount > 0 && (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={clearFilters}
      aria-label="Clear all filters"
      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-medium transition-colors border border-destructive/20"
    >
      <XCircle className="w-4 h-4" />
      Clear All Filters
    </motion.button>
  )}
</motion.div>


      {/* Room Type */}
      <FilterCard title="Room Type" icon={<Home className="w-5 h-5" />}>
        <div className="grid grid-cols-2 gap-2.5">
          {ROOM_TYPES.map((room, index) => {
            const Icon = room.icon;
            const selected = filters.roomType === room.label;
            return (
              <motion.button
                key={room.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    roomType: selected ? "" : room.label,
                  }))
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all overflow-hidden
                  ${
                    selected
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/30"
                  }
                `}
                aria-pressed={selected}
              >
                {selected && (
                  <motion.div
                    layoutId="roomTypeBg"
                    className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 w-5 h-5 transition-transform ${selected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
                <span className={`relative z-10 text-xs text-center leading-tight ${selected ? "text-primary-foreground font-semibold" : "text-foreground"}`}>
                  {room.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </FilterCard>

      {/* Budget */}
      <FilterCard title="Budget" icon={<DollarSign className="w-5 h-5" />}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Up to</span>
            <motion.span
              key={filters.budget}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
            >
              {formatCurrency(filters.budget)}
            </motion.span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="20000"
              max="500000"
              step="1000"
              value={filters.budget}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  budget: Number(e.target.value),
                }))
              }
              aria-label="Budget range slider"
              className="w-full h-2.5 rounded-full appearance-none cursor-pointer bg-muted/50 accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-[0.65rem] text-muted-foreground">
              <span>₹20K</span>
              <span>₹5L</span>
            </div>
          </div>
        </div>
      </FilterCard>

      {/* Style */}
      <FilterCard title="Style" icon={<Sparkles className="w-5 h-5" />}>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((style, index) => {
            const selected = filters.style === style.label;
            return (
              <motion.button
                key={style.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    style: selected ? "" : style.label,
                  }))
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all relative overflow-hidden
                  ${selected 
                    ? `${style.color} border-current shadow-lg shadow-current/20` 
                    : `bg-card/50 hover:bg-card/80 border-border/50 hover:border-current/30 ${style.color.split(' ')[0]}`
                  }
                `}
                aria-pressed={selected}
              >
                {style.label}
              </motion.button>
            );
          })}
        </div>
      </FilterCard>

      {/* Sort */}
      <FilterCard title="Sort By" icon={<ArrowUpDown className="w-5 h-5" />}>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
            aria-label="Sort designs"
            className="w-full rounded-xl border-2 border-border/50 bg-card/50 hover:bg-card/80 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </FilterCard>
    </div>
  );
}

function FilterCard({ title, icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -z-0" />
      <div className="relative z-10 flex items-center gap-2.5 mb-4">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
