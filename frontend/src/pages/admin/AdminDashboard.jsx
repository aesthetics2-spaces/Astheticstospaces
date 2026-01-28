import React from "react";
import {
  Palette,
  CheckCircle2,
  FileClock,
  Eye,
  MoreHorizontal,
  Edit3,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import AdminSidebar from "../../components/admin/AdminSidebar";

// Mock stats
const STATS = [
  {
    label: "Total Designs",
    value: "128",
    icon: Palette,
  },
  {
    label: "Published Designs",
    value: "94",
    icon: CheckCircle2,
  },
  {
    label: "Draft Designs",
    value: "34",
    icon: FileClock,
  },
  {
    label: "Total Views",
    value: "24.3K",
    icon: Eye,
  },
];

// Mock recent designs
const RECENT_DESIGNS = [
  {
    id: 1,
    title: "Modern Living Room",
    roomType: "Living Room",
    budget: "$4,500",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Minimalist Bedroom",
    roomType: "Bedroom",
    budget: "$3,200",
    status: "Draft",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Cozy Workspace Nook",
    roomType: "Home Office",
    budget: "$2,100",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Luxury Dining Area",
    roomType: "Dining Room",
    budget: "$5,900",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=400&q=80",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <AdminSidebar />

      {/* Main content area (shifts right on desktop due to fixed sidebar) */}
      <div className="lg:ml-[260px] flex min-h-screen flex-col">
        <main className="flex-1 px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Welcome back, admin. Here&apos;s an overview of your designs.
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {STATS.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-card/90 px-4 py-4 shadow-sm shadow-black/5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-foreground">
                        {value}
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.section>

            {/* Recent designs */}
            <section className="rounded-2xl border border-border bg-card/90 shadow-sm shadow-black/5">
              <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-border/80">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Recent Designs
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Manage your latest uploaded or edited designs.
                  </p>
                </div>
              </div>

              {/* Table on desktop, stacked list on mobile */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead className="border-b border-border/80 bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 sm:px-6 font-medium">Design</th>
                      <th className="px-4 py-3 sm:px-6 font-medium">
                        Room Type
                      </th>
                      <th className="px-4 py-3 sm:px-6 font-medium">Budget</th>
                      <th className="px-4 py-3 sm:px-6 font-medium">Status</th>
                      <th className="px-4 py-3 sm:px-6 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {RECENT_DESIGNS.map((design) => (
                      <tr key={design.id} className="align-middle">
                        <td className="px-4 py-3 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-16 overflow-hidden rounded-lg bg-muted">
                              <img
                                src={design.image}
                                alt={design.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {design.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ID #{design.id.toString().padStart(4, "0")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 sm:px-6 text-sm text-muted-foreground">
                          {design.roomType}
                        </td>
                        <td className="px-4 py-3 sm:px-6 text-sm text-muted-foreground">
                          {design.budget}
                        </td>
                        <td className="px-4 py-3 sm:px-6">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              design.status === "Published"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                            {design.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 sm:px-6">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              className="inline-flex items-center justify-center rounded-full border border-border/80 bg-background p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Compact list for very small screens (optional if table overflows) */}
              <div className="block sm:hidden border-t border-border/70">
                <div className="px-4 py-3 text-[11px] text-muted-foreground">
                  Tip: swipe horizontally to see more columns.
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;