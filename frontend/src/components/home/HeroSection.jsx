import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/* ================= IMAGES ================= */
const HERO_IMAGES = [
  { id: 1, url: "hero/hero1.webp", alt: "Modern Indian living room" },
  { id: 2, url: "hero/hero2.jpeg", alt: "Minimal living room" },
  { id: 3, url: "hero/hero3.webp", alt: "Contemporary apartment" },
];

/* ================= HEADINGS ================= */
const HERO_HEADINGS = [
  { title: "Design Your Dream Room.", highlight: "Within Your Budget." },
  { title: "AI-Powered Interior Designs.", highlight: "For Indian Homes." },
  { title: "Plan Smart. Build Beautiful.", highlight: "With Exact Costs." },
];

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [headingIndex, setHeadingIndex] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const i = setInterval(
      () => setImageIndex((p) => (p + 1) % HERO_IMAGES.length),
      3500
    );
    return () => clearInterval(i);
  }, [pause]);

  useEffect(() => {
    const h = setInterval(
      () => setHeadingIndex((p) => (p + 1) % HERO_HEADINGS.length),
      5000
    );
    return () => clearInterval(h);
  }, []);

  return (
    <section className="relative min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-xs font-medium text-primary">
            A2S · AI Interior Design Platform
          </span>

          {/* Animated Heading */}
          <div className="relative min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.h1
                key={headingIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl xl:text-6xl"
              >
                {HERO_HEADINGS[headingIndex].title}
                <br />
                <span className="text-primary">
                  {HERO_HEADINGS[headingIndex].highlight}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          <p className="max-w-xl text-base text-muted-foreground">
            AI-powered interior designs tailored for Indian homes — complete
            with exact materials, prices, and trusted shopping links.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/gallery">Explore Designs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/waitlist">Join Waitlist</Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="grid max-w-lg grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            <div className="rounded-lg border bg-card px-4 py-2">₹20K–₹2L+</div>
            <div className="rounded-lg border bg-card px-4 py-2">Indian Brands</div>
            <div className="rounded-lg border bg-card px-4 py-2">WhatsApp Share</div>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE SLIDER ================= */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-2xl border bg-card shadow-xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={HERO_IMAGES[imageIndex].id}
                src={HERO_IMAGES[imageIndex].url}
                alt={HERO_IMAGES[imageIndex].alt}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`h-1.5 w-5 rounded-full transition ${
                    i === imageIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
