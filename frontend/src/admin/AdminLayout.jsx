import { BarChart3, Database, Home, LogOut } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "./auth.js";

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="cyber-shell relative min-h-screen">
      <div className="cyber-grid" />
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="flex items-center gap-3 text-lg font-bold text-primaryText">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-glow">
              <BarChart3 className="h-5 w-5" />
            </span>
            Admin Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="btn-secondary hidden sm:inline-flex">
              <Home className="h-4 w-4" /> View Site
            </Link>
            <button onClick={handleLogout} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="premium-card sticky top-24 hidden h-fit p-4 lg:block">
          <p className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">Manage</p>
          <nav className="mt-4 grid gap-2">
            {[
              ["Overview", "#"],
              ["Jobs", "#manage-jobs"],
              ["Internships", "#manage-internships"],
              ["Courses", "#manage-courses"],
              ["Resources", "#manage-resources"],
              ["Companies", "#manage-companies"]
            ].map(([label, href]) => (
              <a key={label} href={href} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-secondaryText transition hover:bg-primary/10 hover:text-primary">
                <Database className="h-4 w-4" />
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
