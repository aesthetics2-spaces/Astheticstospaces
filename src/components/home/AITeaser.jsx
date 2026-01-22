import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const AITeaser = () => {
  const [showTyping, setShowTyping] = useState(false);

  return (
    <section className="w-full bg-gradient-to-b from-muted/30 via-background to-muted/20 py-14 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4">
        {/* Main Content - Split Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
          className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12"
        >
          {/* Left Side - Text & CTA */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut" },
              },
            }}
            className="flex-1 space-y-6"
          >
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <Bot className="h-3 w-3" />
              AI Interior Consultant
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            >
              Get Design Advice Instantly
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl"
            >
              Ask anything about budgets, materials, or styles — our AI has you
              covered.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                size="lg"
                asChild
                className="group relative overflow-hidden w-full sm:w-auto"
              >
                <Link to="/ai-consultant">
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 flex items-center justify-center gap-2"
                  >
                    <Bot className="h-4 w-4" />
                    Ask AI
                  </motion.span>
                  <motion.span
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
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

              {/* Microcopy */}
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-semibold text-primary">10 free</span>{" "}
                questions daily
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Chat Preview */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
              },
            }}
            className="flex-1"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative rounded-2xl border border-border/70 bg-card/90 p-6 shadow-lg shadow-black/5 backdrop-blur-sm sm:p-8"
            >
              {/* Chat Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <Bot className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    A2S AI Assistant
                  </p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4">
                {/* User Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 shadow-sm">
                    <p className="text-sm font-medium text-primary-foreground">
                      Can I design a 2BHK under ₹5L?
                    </p>
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
                  onAnimationComplete={() => setShowTyping(true)}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-background border border-border/70 px-4 py-3 shadow-sm">
                    <p className="text-sm text-foreground">
                      Yes! I can create budget-smart designs with exact material
                      costs.
                      {showTyping && (
                        <motion.span
                          className="inline-block ml-1"
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          ●
                        </motion.span>
                      )}
                    </p>
                  </div>
                </motion.div>

                {/* Typing Indicator (Optional) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showTyping ? 0.6 : 0 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                  className="flex items-center gap-1 pl-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        className="h-2 w-2 rounded-full bg-muted-foreground/40"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AITeaser;
