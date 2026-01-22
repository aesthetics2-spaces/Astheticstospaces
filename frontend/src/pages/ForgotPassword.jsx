import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const VISUAL_IMAGES = [
  "hero/hero1.webp",
  "hero/hero2.jpeg",
  "hero/hero3.webp",
];

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % VISUAL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setSent(true);

    // 🔐 Replace with real password reset logic
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex w-full flex-col items-center justify-center bg-background p-6 lg:w-1/2 lg:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo1.png"
              alt="A2S Logo"
              className="h-10 w-10 rounded-md"
            />
            <span className="text-xl font-semibold">Asthetic to Spaces</span>
          </Link>

          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Forgot your password?
            </h1>
            <p className="text-muted-foreground">
              We’ll send you a reset link to your email.
            </p>
          </div>

          {/* Form / Success */}
          {!sent ? (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className={`w-full rounded-lg border ${
                    error ? "border-destructive" : "border-input"
                  } bg-background px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/40`}
                />
                {error && (
                  <p className="mt-1 text-xs text-destructive">{error}</p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send reset link
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Back to login
                </Link>
              </p>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-border bg-muted/30 p-6 text-center space-y-4"
            >
              <Check className="mx-auto h-10 w-10 text-primary" />
              <h2 className="text-lg font-semibold">Check your inbox</h2>
              <p className="text-sm text-muted-foreground">
                We’ve sent a password reset link to
                <br />
                <span className="font-medium">{email}</span>
              </p>

              <Link
                to="/login"
                className="inline-block text-sm font-semibold text-primary hover:underline"
              >
                Back to login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={VISUAL_IMAGES[currentImageIndex]}
              alt="Interior design"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90" />

        <div className="relative z-10 flex h-full items-center p-12 text-white">
          <div className="max-w-lg space-y-6">
            <h2 className="text-4xl font-bold">
              Secure access to your designs
            </h2>
            <p className="text-lg opacity-90">
              Reset your password and continue building your dream home with
              A2S.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
