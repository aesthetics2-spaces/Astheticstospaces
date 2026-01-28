import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Layers,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

const navItems = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Upload Design",
    to: "/admin/upload",
    icon: Upload,
  },
  {
    label: "Manage Designs",
    to: "/admin/manage",
    icon: Layers,
  },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // swallow client-side errors; you can surface if desired
      console.error("Logout error:", err);
    } finally {
      navigate("/admin/login");
    }
  };

  const baseLinkClasses =
    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  const getLinkClasses = ({ isActive }) =>
    [
      baseLinkClasses,
      isActive
        ? "bg-primary/5 text-primary border border-primary/10"
        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
    ].join(" ");

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-40 inline-flex items-center justify-center rounded-full border border-border bg-background/90 p-2 shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
        aria-label={open ? "Close admin sidebar" : "Open admin sidebar"}
      >
        {open ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeftOpen className="h-4 w-4" />
        )}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-[260px] lg:flex-col lg:border-r lg:border-border lg:bg-card lg:shadow-sm">
        <div className="flex h-16 items-center border-b border-border/80 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-semibold">
              A2S
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">
                A2S Admin
              </span>
              <span className="text-xs text-muted-foreground">
                Control center
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={getLinkClasses}>
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-border/80 px-3 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile drawer sidebar */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-y-0 left-0 z-30 w-[260px] bg-card border-r border-border shadow-xl lg:hidden"
          >
            <div className="flex h-16 items-center border-b border-border/80 px-5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary text-sm font-semibold">
                  A2S
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    A2S Admin
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Control center
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={getLinkClasses}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            <div className="border-t border-border/80 px-3 py-3">
              <button
                type="button"
                onClick={async () => {
                  setOpen(false);
                  await handleLogout();
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
