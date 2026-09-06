import { BarChart3, Bell, BriefcaseBusiness, GraduationCap, Home, LogOut, Menu, Settings, UserRound, Users, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "./auth.js";
import { readTable } from "../data/store.js";

const navigation = [
  { label: "Overview", section: "overview", icon: BarChart3 },
  { label: "Content", section: "content", tab: "jobs", icon: BriefcaseBusiness },
  { label: "Learning Hub", section: "learning", tab: "platforms", icon: GraduationCap },
  { label: "Recruitment", section: "recruitment", tab: "referrals", icon: UserRound },
  { label: "Users", section: "users", tab: "users", icon: Users },
  { label: "Settings", section: "settings", tab: "general", icon: Settings }
];

function navUrl(item) {
  return item.section === "overview" ? "/admin" : `/admin?section=${item.section}&tab=${item.tab}`;
}

function Navigation({ onNavigate }) {
  return (
    <nav className="grid gap-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        return <Link key={item.section} to={navUrl(item)} onClick={onNavigate} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-secondaryText transition hover:bg-primary/10 hover:text-primary"><Icon className="h-4 w-4" />{item.label}</Link>;
      })}
    </nav>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = readTable("notifications").slice(0, 5);
  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="cyber-shell relative min-h-screen">
      <div className="cyber-grid" />
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-border p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open admin navigation"><Menu className="h-5 w-5" /></button>
            <Link to="/admin" className="flex items-center gap-3 text-lg font-bold text-primaryText">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-white shadow-glow"><BarChart3 className="h-5 w-5" /></span>
              <span className="hidden sm:inline">CareerGrid Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setNotificationsOpen((value) => !value)} className="rounded-2xl border border-border p-2 text-secondaryText hover:text-primary" aria-label="Notifications"><Bell className="h-5 w-5" /></button>
              {notificationsOpen && <div className="absolute right-0 top-full z-50 mt-3 w-72 rounded-2xl border border-border bg-white p-3 shadow-2xl"><p className="px-2 py-2 text-sm font-black text-primaryText">Notifications</p>{notifications.length ? notifications.map((item) => <p key={item.id} className="border-t border-border px-2 py-3 text-sm text-secondaryText">{item.title || item.message}</p>) : <p className="border-t border-border px-2 py-3 text-sm text-secondaryText">You&apos;re all caught up.</p>}</div>}
            </div>
            <Link to="/" className="btn-secondary hidden sm:inline-flex"><Home className="h-4 w-4" /> View Site</Link>
            <button onClick={handleLogout} className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500/20"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </div>
      </header>
      {mobileOpen && <div className="fixed inset-0 z-50 bg-slate-950/55 p-4 backdrop-blur-sm lg:hidden"><aside className="glass h-full max-w-sm rounded-[2rem] p-5"><div className="flex items-center justify-between"><strong>CareerGrid Admin</strong><button onClick={() => setMobileOpen(false)} aria-label="Close admin navigation"><X /></button></div><div className="mt-6"><Navigation onNavigate={() => setMobileOpen(false)} /></div></aside></div>}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="premium-card sticky top-24 hidden h-fit p-4 lg:block"><p className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-muted">Workspace</p><div className="mt-4"><Navigation /></div></aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
