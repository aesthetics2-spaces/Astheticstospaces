import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DesignCard from "@/components/gallery/DesignCard";

const FEATURED_DESIGNS = [
  {
    id: 1,
    title: "Modern Minimalist Living Room",
    image: "designs/img6.jpg",
    style: "Modern",
    budget: "₹50K - ₹80K",
    room: "living",
    isVerified: true,
    badge: { label: "Trending", tone: "primary" },
  },
  {
    id: 2,
    title: "Cozy Bedroom Retreat",
    image: "designs/img2.jpg",
    style: "Minimal",
    budget: "₹30K - ₹50K",
    room: "bedroom",
    badge: { label: "Budget-friendly", tone: "muted" },
  },
  {
    id: 3,
    title: "Contemporary Kitchen Design",
    image: "designs/img3.jpg",
    style: "Contemporary",
    budget: "₹1L - ₹1.5L",
    room: "kitchen",
    isVerified: true,
    badge: { label: "Premium", tone: "primary" },
  },
  {
    id: 4,
    title: "Serene Balcony Garden",
    image: "designs/img4.jpg",
    style: "Eclectic",
    budget: "₹20K - ₹35K",
    room: "balcony",
    badge: { label: "Smart", tone: "primary" },
  },
  {
    id: 5,
    title: "Elegant Dining Space",
    image: "designs/img5.jpg",
    style: "Traditional",
    budget: "₹60K - ₹90K",
    room: "dining",
    isVerified: true,
    badge: { label: "Trending", tone: "primary" },
  },
  {
    id: 6,
    title: "Scandinavian Living Room",
    image: "designs/img6.jpg",
    style: "Scandinavian",
    budget: "₹70K - ₹1L",
    room: "living",
    badge: { label: "Minimal", tone: "muted" },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const FeaturedDesigns = ({ designs = FEATURED_DESIGNS, limit = 6 }) => {
  const displayedDesigns = designs.slice(0, limit);

  const handleFavorite = (id, isFavorite) => {
    // Handle favorite logic here
    console.log(`Design ${id} ${isFavorite ? "added to" : "removed from"} favorites`);
  };

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
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            Featured
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            Popular Designs
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground"
          >
            Our most loved room designs—handpicked for your budget & style.
          </motion.p>
        </div>

        {/* Design Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayedDesigns.map((design) => (
            <motion.div key={design.id} variants={itemVariants}>
              <DesignCard
                {...design}
                onFavorite={handleFavorite}
                isFavorite={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Button
            size="lg"
            asChild
            className="group relative overflow-hidden"
          >
            <Link to="/gallery">
              <motion.span
                className="flex items-center gap-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                View All Designs
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDesigns;
