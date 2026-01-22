import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ROOMS = [
  {
    title: "Living Room",
    image:
      "category/img1.avif",
    room: "living",
    badge: { label: "Trending", tone: "primary" },
  },
  {
    title: "Bedroom",
    image:
      "category/img2.avif",
    room: "bedroom",
    badge: { label: "Minimal", tone: "muted" },
  },
  {
    title: "Kitchen",
    image:
      "category/img3.avif",
    room: "kitchen",
    badge: { label: "Smart", tone: "primary" },
  },
  {
    title: "Balcony",
    image:
      "category/img4.avif",
    room: "balcony",
    badge: { label: "Budget-friendly", tone: "muted" },
  },
  {
    title: "Dining",
    image:
      "category/img5.avif",
    room: "dining",
    badge: { label: "Premium", tone: "primary" },
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function Badge({ label, tone }) {
  const base =
    "absolute left-4 top-4 inline-flex items-center rounded-full px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide shadow-sm ring-1 backdrop-blur";

  const styles =
    tone === "primary"
      ? "bg-primary/15 text-primary ring-primary/25"
      : "bg-background/70 text-foreground ring-border";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9, y: -2 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`${base} ${styles}`}
    >
      <motion.span
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {label}
      </motion.span>
    </motion.span>
  );
}

export default function RoomCategories() {
  const navigate = useNavigate();

  const goToRoom = (room) => {
    navigate(`/gallery?room=${encodeURIComponent(room)}`);
  };

  const onKeyActivate = (e, room) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToRoom(room);
    }
  };

  return (
    <section className="w-full bg-background py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Rooms
          </p>
          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Explore by Room
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Pick a room and get instantly inspired.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ROOMS.map((r) => (
            <motion.article
              key={r.room}
              variants={item}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md shadow-black/5 focus-within:ring-2 focus-within:ring-primary/40"
            >
              <button
                type="button"
                onClick={() => goToRoom(r.room)}
                onKeyDown={(e) => onKeyActivate(e, r.room)}
                aria-label={`Explore ${r.title} designs`}
                className="relative block h-full w-full text-left outline-none"
              >
                {/* Background image */}
                <motion.div
                  aria-hidden="true"
                  className="relative h-56 w-full sm:h-64"
                >
                  <motion.img
                    src={r.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />

                  {/* Overlay gradient */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"
                    initial={{ opacity: 0.75 }}
                    whileHover={{ opacity: 0.92 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />

                  {/* Badge */}
                  {r.badge?.label ? (
                    <Badge label={r.badge.label} tone={r.badge.tone} />
                  ) : null}

                  {/* Bottom text */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-white">
                          {r.title}
                        </p>
                        <p className="text-xs text-white/80">
                          Tap to open gallery
                        </p>
                      </div>

                      <motion.span
                        aria-hidden="true"
                        className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur"
                        initial={{ x: 0, opacity: 0.9 }}
                        whileHover={{ x: 2, opacity: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        View
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

