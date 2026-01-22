import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const MATERIALS = [
  { item: "Paint (Premium)", price: "₹15,000" },
  { item: "Sofa (3-Seater)", price: "₹45,000" },
  { item: "Lighting Set", price: "₹8,000" },
  { item: "Coffee Table", price: "₹12,500" },
  { item: "Curtains & Blinds", price: "₹7,500" },
  { item: "Wall Art & Décor", price: "₹6,000" },
  { item: "Rug (8x10 ft)", price: "₹9,000" },
  { item: "Flooring", price: "₹22,000" },
];

const TOTAL_COST = "₹1,25,000";

const MaterialPreview = () => {
  return (
    <section className="w-full bg-background py-14 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3 w-3" />
            AI-Powered Breakdown
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            Material Intelligence Preview
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground"
          >
            See exact items & costs for a design—no guesswork.
          </motion.p>
        </div>

        {/* Main Content - Split Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12"
        >
          {/* Left Side - Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-lg shadow-black/5"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <motion.img
                  src="designs/img6.jpg"
                  alt="Modern living room design with material breakdown"
                  loading="lazy"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* AI Verified Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-[0.7rem] font-semibold text-primary shadow-md ring-1 ring-primary/20 backdrop-blur-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>AI Verified</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Side - Material List */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
              },
            }}
            className="flex-1"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-2xl border border-border/70 bg-card p-6 shadow-lg shadow-black/5 sm:p-8"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6"
              >
                Exact cost breakdown
              </motion.span>

              {/* Materials Table */}
              <div className="space-y-3 mb-6">
                {MATERIALS.map((material, index) => (
                  <motion.div
                    key={material.item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.6 + index * 0.05,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-sm sm:text-base font-medium text-foreground">
                      {material.item}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-primary">
                      {material.price}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Total Cost */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-6 flex items-center justify-between rounded-lg bg-primary/5 border border-primary/20 px-4 py-3 mb-6"
              >
                <span className="text-base sm:text-lg font-bold text-foreground">
                  Total Cost
                </span>
                <span className="text-lg sm:text-xl font-bold text-primary">
                  {TOTAL_COST}
                </span>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="w-full group relative overflow-hidden"
                >
                  <Link to="/gallery">
                    <motion.span
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 flex items-center justify-center gap-2"
                    >
                      View Full Breakdown
                    </motion.span>
                    <motion.span
                      animate={{
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-md bg-primary/20 blur-sm"
                    />
                  </Link>
                </Button>
              </motion.div>

              {/* Optional Note */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mt-4 text-center text-xs text-muted-foreground"
              >
                Includes paint, furniture, décor & more.
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MaterialPreview;
  