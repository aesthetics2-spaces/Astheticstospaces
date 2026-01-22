import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

// UI Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Icons
import {
  Menu,
  X,
  Heart,
  User,
  Wallet,
  Sparkles,
  LogOut,
  Bookmark,
  MessageSquare,
} from "lucide-react";


// Constants
const NAVIGATION = {
  PUBLIC: [
    { label: "Explore Designs", href: "/gallery" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "AI Consultant", href: "/ai-consultant", requiresAuth: true },
  ],
  AUTHENTICATED: [
    { label: "Gallery", href: "/gallery", icon: <Sparkles className="mr-2 h-4 w-4" /> },
    { label: "Saved Designs", href: "/saved", icon: <Heart className="mr-2 h-4 w-4" /> },
    { label: "AI Consultant", href: "/ai-consultant", icon: <Sparkles className="mr-2 h-4 w-4" /> },
  ],
};

// Mobile Menu Component
const MobileMenu = React.memo(({
  navItems,
  isLoggedIn,
  onOpenCredits,
  onLogout,
  open,
  onClose
}) => {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    onClose();
    navigate(item.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Side Menu */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 bg-background border-b shadow-xl z-50"
          >
            <div className="container mx-auto px-6 py-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Navigation</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Profile Section */}
              {isLoggedIn && (
                <div className="mb-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src="/avatar.png" alt="User profile" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">John Doe</p>
                      <p className="text-sm text-muted-foreground">Premium Member</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="mb-6">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-12 text-base"
                        onClick={() => handleNavigation(item)}
                      >
                        {item.icon && <span className="mr-3">{item.icon}</span>}
                        {item.label}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={onOpenCredits}
                    >
                      <Wallet className="mr-3 h-4 w-4" />
                      <span>Credits</span>
                      <Badge variant="secondary" className="ml-auto">
                        8
                      </Badge>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        onClose();
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => {
                        onClose();
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

MobileMenu.displayName = "MobileMenu";

// Navbar Component
export default function Navbar() {
  const { isLoggedIn} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [dialogState, setDialogState] = useState({
    credits: false,
    loginRequired: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = useMemo(
    () => (isLoggedIn ? NAVIGATION.AUTHENTICATED : NAVIGATION.PUBLIC),
    [isLoggedIn]
  );

  const userCredits = 8;

  const handleNavClick = (item) => {
    if (item.requiresAuth && !isLoggedIn) {
      setDialogState(prev => ({ ...prev, loginRequired: true }));
      return;
    }
    navigate(item.href);
  };

  // LOGOUT (Supabase)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
  };

  const updateDialogState = (key, value) => {
    setDialogState(prev => ({ ...prev, [key]: value }));
  };

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link 
              to={isLoggedIn ? "/gallery" : "/"} 
              className="flex items-center gap-3 group"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-lg ">
                <img 
                  src="/logo1.png" 
                  alt="Aesthetic to Spaces Logo" 
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Aesthetic to Spaces
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => handleNavClick(item)}
                  asChild
                >
                  <Link to={item.href}>
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateDialogState("credits", true)}
                    className="gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>Credits</span>
                    <Badge variant="secondary" className="ml-1">
                      {userCredits}
                    </Badge>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatar.png" alt="User avatar" />
                          <AvatarFallback className="bg-primary/10">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/saved" className="cursor-pointer">
                          <Bookmark className="mr-2 h-4 w-4" />
                          <span>Saved Designs</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/feedback" className="cursor-pointer">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Feedback</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dialogs */}
      <Dialog open={dialogState.credits} onOpenChange={(open) => updateDialogState("credits", open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Your Credits
            </DialogTitle>
            <DialogDescription>
              Credits are used to generate new designs and access premium features.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="text-4xl font-bold text-primary mb-2">{userCredits}</div>
            <p className="text-sm text-muted-foreground">Available Credits</p>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => updateDialogState("credits", false)}>
              Close
            </Button>
            <Button onClick={() => {
              updateDialogState("credits", false);
              navigate("/pricing");
            }}>
              Get More Credits
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={dialogState.loginRequired} onOpenChange={(open) => updateDialogState("loginRequired", open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
            <DialogDescription>
              Please log in to access this feature and unlock personalized AI design consultations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto" onClick={() => updateDialogState("loginRequired", false)}>
              Cancel
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => {
              updateDialogState("loginRequired", false);
              navigate("/login");
            }}>
              Log In
            </Button>
            <Button variant="ghost" className="w-full sm:w-auto" onClick={() => {
              updateDialogState("loginRequired", false);
              navigate("/signup");
            }}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu */}
      <MobileMenu
        navItems={navItems}
        isLoggedIn={isLoggedIn}
        onOpenCredits={() => updateDialogState("credits", true)}
        onLogout={handleLogout}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}

