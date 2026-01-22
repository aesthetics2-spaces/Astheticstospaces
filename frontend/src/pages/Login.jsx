import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Chrome, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const VISUAL_IMAGES = [
  "hero/hero1.webp",
  "hero/hero2.jpeg",
  "hero/hero3.webp",
];

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showEmailInput, setShowEmailInput] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % VISUAL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  
    if (error) alert(error.message);
  };
  
  

  const handleEmailContinue = async (e) => {
    e.preventDefault();
  
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) return alert(error.message);
  
    alert("Login successful");
  
    // Create profile after login
    const name = localStorage.getItem("signup_name");
  
    if (name) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          full_name: name,
        });
  
      if (profileError) console.log(profileError.message);
      localStorage.removeItem("signup_name");
    }
  
    window.location.href = "/dashboard";
  };
  

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex w-full flex-col items-center justify-center bg-background p-6 lg:w-1/2 lg:p-12"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo1.png"
                alt="A2S Logo"
                className="h-10 w-10 rounded-md"
              />
              <span className="text-xl font-semibold text-foreground">
                Asthetic to Spaces
              </span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Welcome back to A2S
            </h1>
            <p className="text-base text-muted-foreground">
              Design smarter. Spend better.
            </p>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Check className="h-4 w-4 text-primary" />
            <span>Used by 1,000+ Indian homeowners</span>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Email Input Section */}
            {!showEmailInput ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="button"
                  onClick={() => setShowEmailInput(true)}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Continue with Email
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleEmailContinue}
                className="space-y-4"
              >
                {/* Email */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/40"
                  required
                />

                {/* Password */}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/40"
                    required
                  />

                {/* Login Button */}
                <Button type="submit" size="lg" className="w-full">
                  Login
                </Button>

                {/* Forgot password */}
                <Link
                  to="/forgot-password"
                  className="block text-right text-sm text-muted-foreground hover:text-primary"
                >
                  Forgot password?
                </Link>
              </motion.form>
            )}
            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
            {/* Google Login Button */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                type="button"
                onClick={handleGoogleLogin}
                size="lg"
                variant="outline"
                className="w-full border-2 hover:border-primary/50 transition-all"
              >
                <Chrome className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>
            </motion.div>






            {/* Footer Microcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs text-center text-muted-foreground"
            >
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="underline hover:text-primary transition-colors"
              >
                Terms
              </Link>{" "}
              &{" "}
              <Link
                to="/privacy"
                className="underline hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </motion.p>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Visual / Branding Section */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        {/* Background Images with Slide Animation */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={VISUAL_IMAGES[currentImageIndex]}
              alt={`Interior design ${currentImageIndex + 1}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/90"></div>

        {/* Overlay Content */}
        <div className="relative z-10 flex h-full flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-lg space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Design your dream home. Within your budget.
            </h2>

            <ul className="space-y-4">
              {[
                { icon: "✓", text: "Exact material costs" },
                { icon: "✓", text: "Indian brands" },
                { icon: "✓", text: "AI-powered suggestions" },
              ].map((highlight, index) => (
                <motion.li
                  key={highlight.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                  }}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                    {highlight.icon}
                  </span>
                  <span className="font-medium">{highlight.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* AI Credits Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
            >
              <p className="text-sm font-medium opacity-90 mb-2">
                New users get
              </p>
              <p className="text-3xl font-bold">
                <span className="text-primary-foreground">10</span> AI Credits
              </p>
              <p className="text-sm opacity-80 mt-1">
                Start designing instantly
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
