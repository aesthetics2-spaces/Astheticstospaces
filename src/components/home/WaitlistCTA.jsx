import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WaitlistCTA = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // On success
      setIsSuccess(true);
      setEmail("");
      
      // Reset after 5 seconds (optional)
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-primary/5 via-muted/30 to-primary/5 py-14 sm:py-20 border-t border-border">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative rounded-2xl border border-border/70 bg-card/90 p-8 shadow-lg shadow-black/5 backdrop-blur-sm sm:p-12"
        >
          {/* Success State */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  You're on the list 🎉
                </h2>
                <p className="text-base text-muted-foreground">
                  We'll notify you when early access is available.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4"
                  >
                    <Sparkles className="h-3 w-3" />
                    Early Access
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground flex items-center justify-center gap-3 flex-wrap"
                  >
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    Get early access to AI Room Upload & 3D Designs
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
                  >
                    Be the first to try next-gen interior design tools built for
                    Indian homes.
                  </motion.p>

                  {/* Social Proof */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    className="text-sm font-semibold text-primary"
                  >
                    Join 1,200+ designers & homeowners
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <motion.div
                      className="flex-1"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        placeholder="Enter your email"
                        disabled={isLoading}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Email address"
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-xs text-destructive"
                        >
                          {error}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      whileFocus={{ scale: 1.02 }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full sm:w-auto relative overflow-hidden group"
                      >
                        <motion.span
                          className="relative z-10 flex items-center justify-center gap-2"
                          animate={{ opacity: isLoading ? 0.7 : 1 }}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Joining…
                            </>
                          ) : (
                            "Join Waitlist"
                          )}
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
                      </Button>
                    </motion.div>
                  </div>

                  {/* Trust Microcopy */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center text-xs text-muted-foreground"
                  >
                    No spam. Early users get bonus AI credits.
                  </motion.p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistCTA;
