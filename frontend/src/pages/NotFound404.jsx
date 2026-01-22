import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const float = {
  animate: {
    y: [0, -14, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function NotFound404() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      
      {/* Floating decor */}
      <motion.div
        variants={float}
        animate="animate"
        className="absolute left-12 top-24 h-36 w-36 rounded-3xl bg-accent/40 blur-2xl"
      />
      <motion.div
        variants={float}
        animate="animate"
        className="absolute bottom-24 right-16 h-44 w-44 rounded-full bg-muted/40 blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        
        {/* A2S Badge */}
        <div className="mb-6 inline-flex items-center rounded-full bg-accent px-4 py-1 text-xs font-medium text-accent-foreground">
          Designed by A2S AI
        </div>

        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-8xl font-extrabold tracking-tight text-primary sm:text-9xl"
        >
          404
        </motion.h1>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl"
        >
          Looks like this room doesn’t exist
        </motion.h2>

        {/* Description */}
        <p className="mt-4 text-muted-foreground">
          The page you’re looking for moved or was never designed.
          <span className="mt-2 block text-sm italic">
            Even our AI couldn’t find this room.
          </span>
        </p>

        {/* Search */}
        <div className="relative mx-auto mt-8 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search designs instead"
            className="w-full rounded-lg border border-input bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ y: -2 }}>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:shadow-lg"
            >
              Go Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }}>
            <Link
              to="/designs"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary hover:shadow-md"
            >
              Explore Designs
            </Link>
          </motion.div>
        </div>

        {/* Popular Rooms */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
          <Link to="/designs/living-room" className="hover:text-primary">
            Living Room
          </Link>
          <span>•</span>
          <Link to="/designs/bedroom" className="hover:text-primary">
            Bedroom
          </Link>
          <span>•</span>
          <Link to="/designs/kitchen" className="hover:text-primary">
            Kitchen
          </Link>
        </div>
      </div>
    </section>
  );
}
