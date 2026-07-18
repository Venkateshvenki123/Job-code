import { LogOut } from "lucide-react";
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
      <header className="relative z-10 border-b border-white/10 bg-cyber-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/admin" className="text-lg font-black text-neon-green">Admin Dashboard</Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm font-bold text-soft-gray hover:text-white">View Site</Link>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-black text-red-200 hover:bg-red-500/20">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><Outlet /></main>
    </div>
  );
}