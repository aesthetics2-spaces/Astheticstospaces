import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard,
  Images,
  ShoppingBag,
  Bot,
  ChevronDown,
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Tell Us Your Room & Budget",
    description: "Pick your room, budget range & style in under 30 seconds.",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    title: "Explore Smart Designs",
    description: "Browse curated designs tailored to your budget and vibe.",
    icon: Images,
  },
  {
    id: 3,
    title: "See Exact Materials & Costs",
    description:
      "Get paint shades, furniture, décor & exact prices — no guesswork.",
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Customize with AI & Shop",
    description:
      "Ask AI to adjust designs and buy instantly via trusted brands.",
    icon: Bot,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-120px 0px -120px 0px",
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background py-14 sm:py-20 border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            A2S Journey
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            How A2S Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground"
          >
            From empty room to a shoppable design — effortlessly.
          </motion.p>
        </div>

        {/* Journey Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Vertical line for desktop */}
          <div className="pointer-events-none absolute inset-y-2 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 md:block" />

          {/* Animated progress line (desktop) */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-2 left-1/2 hidden w-[3px] -translate-x-1/2 rounded-full bg-primary md:block"
          />

          {/* Horizontal line for mobile */}
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10 md:hidden" />

          <motion.div className="flex flex-col gap-8 md:gap-10">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  whileHover="hover"
                  className="relative md:grid md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] md:items-center"


                >
                  {/* Card for mobile (stacked) */}
                  <div className="md:hidden">
                    <motion.article
                      variants={stepVariants}
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative mx-auto max-w-sm rounded-2xl border border-border/70 bg-card/80 p-5 shadow-md shadow-black/5 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          variants={{
                            visible: { scale: 1, opacity: 1 },
                          }}
                          className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-md shadow-primary/20 ring-1 ring-primary/30"
                        >
                          <motion.div
                            variants={{
                              hover: { scale: 1.05, rotate: 4 },
                            }}
                            className="flex items-center justify-center"
                          >
                            <Icon className="h-5 w-5" />
                          </motion.div>
                          <span className="pointer-events-none absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground shadow-sm">
                            {step.id}
                          </span>
                        </motion.div>

                        <div className="space-y-1.5">
                          <h3 className="text-sm font-semibold text-foreground sm:text-base">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  </div>

                  {/* Left column card (desktop) */}
                  <div
                    className={`hidden md:flex md:h-full md:items-center ${
                      isLeft ? "md:pr-10" : "md:col-start-3 md:pl-10"
                    }`}
                  >

                    <motion.article
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="group relative max-w-md rounded-2xl border border-border/70 bg-card/90 p-6 shadow-md shadow-black/5 backdrop-blur-sm"
                    >
                      <div className="space-y-2.5">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
                          Step {step.id}
                        </p>
                        <h3 className="text-base md:text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.article>
                  </div>

{/* Center icon node (desktop) */}
<div className="hidden md:flex md:col-start-2 md:items-stretch md:justify-center">
  <div className="flex h-full items-center">
    <motion.div
      variants={{
        hidden: { scale: 0.85, opacity: 0 },
        visible: {
          scale: 1,
          opacity: 1,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      className="
        relative flex h-12 w-12 flex-col items-center justify-center gap-1
        rounded-2xl bg-card
        text-primary
        shadow-lg shadow-primary/20
        ring-2 ring-primary/40
      "
    >
      {/* Icon */}
      <Icon className="h-5 w-5" />

      {/* Step number INSIDE */}
      <span className="
        text-[0.65rem] font-semibold
        text-primary-foreground
        bg-primary
        px-2 py-0.5
        rounded-full
        leading-none
      ">
        {step.id}
      </span>
    </motion.div>
  </div>
</div>



                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Subtle animated arrow / progress hint */}
        <div className="mt-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: [0, 6, 0],
                  }
                : { opacity: 0, y: -4 }
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs text-muted-foreground shadow-sm shadow-black/5"
          >
            <span className="h-1.5 w-16 rounded-full bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
            <ChevronDown className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">
              Scroll to continue your A2S journey
            </span>
            <span className="sm:hidden">Scroll to continue</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

