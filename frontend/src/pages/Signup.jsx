import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Chrome, Check, Mail, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";


const VISUAL_IMAGES = [
  "hero/hero1.webp",
  "hero/hero2.jpeg",
  "hero/hero3.webp",
];

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    const { name, email, password } = formData;
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) return alert(error.message);
  
    alert("Signup successful! Please check your email to confirm.");
  
    // store name in localStorage to create profile after login
    localStorage.setItem("signup_name", name);
  };
  
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* Left Side - Signup Form */}
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
              Create your A2S account
            </h1>
            <p className="text-base text-muted-foreground">
              Start designing your dream home today.
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
            <span>Join 1,000+ Indian homeowners</span>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >

                        {/* Email Signup Section */}
                        {!showEmailForm ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
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
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className={`w-full rounded-lg border ${
                      errors.name ? "border-destructive" : "border-input"
                    } bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className={`w-full rounded-lg border ${
                      errors.email ? "border-destructive" : "border-input"
                    } bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password (min. 6 characters)"
                    className={`w-full rounded-lg border ${
                      errors.password ? "border-destructive" : "border-input"
                    } bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                    required
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`w-full rounded-lg border ${
                      errors.confirmPassword
                        ? "border-destructive"
                        : "border-input"
                    } bg-background px-4 py-3 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`}
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Signup Button */}
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" className="w-full">
                    Create Account
                  </Button>
                </motion.div>
              </motion.form>
            )}

            {/* Divider */}
            <div className="relative flex items-center py-4">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-sm text-muted-foreground">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>
            {/* Google Signup Button */}
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

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Log in
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
              Start your design journey today.
            </h2>

            <ul className="space-y-4">
              {[
                { icon: "✓", text: "Get 10 free AI credits" },
                { icon: "✓", text: "Save unlimited designs" },
                { icon: "✓", text: "Access exclusive features" },
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
                Sign up now and get
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

export default SignupPage;
