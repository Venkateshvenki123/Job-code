import { Bell, Bot, Briefcase, ChevronDown, GraduationCap, Library, Menu, Moon, Search, ShieldCheck, Sparkles, Sun, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const navGroups = [
  {
    label: "Explore",
    items: [
      { label: "Startups", path: "/startups", description: "Discover startup companies", icon: Sparkles },
      { label: "Courses", path: "/courses", description: "Build role-ready skills", icon: GraduationCap }
    ]
  },
  {
    label: "Opportunities",
    items: [
      { label: "Jobs", path: "/jobs", description: "Find full-time roles", icon: Briefcase },
      { label: "Internships", path: "/internships", description: "Launch with internships", icon: GraduationCap }
    ]
  },
  {
    label: "Resources",
    items: [
      { label: "Learning Platforms", path: "/learning-platforms", description: "Trusted platforms", icon: GraduationCap },
      { label: "Study Materials", path: "/study-material", description: "Notes and guides", icon: Library },
      { label: "Certifications", path: "/certifications", description: "Credential paths", icon: ShieldCheck },
      { label: "Interview Preparation", path: "/interview-questions", description: "Questions and experiences", icon: Bot }
    ]
  }
];

const profileItems = [
  ["My Profile", "/portal/candidate"],
  ["My Dashboard", "/portal/candidate"],
  ["Applications", "/portal/candidate"],
  ["Saved Opportunities", "/jobs"],
  ["Referral Requests", "/portal/candidate"],
  ["Notifications", "/portal/candidate"],
  ["Settings", "/portal/candidate"],
  ["Logout", "/"]
];

function Breadcrumbs() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  const parts = location.pathname.split("/").filter(Boolean);
  return (
    <div className="mb-5 flex flex-wrap gap-2 text-sm text-soft-gray">
      <Link to="/" className="hover:text-neon-green">Home</Link>
      {parts.map((part, index) => (
        <span key={part} className="flex gap-2">
          <span>/</span>
          <Link to={`/${parts.slice(0, index + 1).join("/")}`} className="capitalize hover:text-neon-green">{part.replaceAll("-", " ")}</Link>
        </span>
      ))}
    </div>
  );
}

function Dropdown({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-extrabold text-soft-gray transition hover:bg-white/70 hover:text-neon-green">
        {group.label} <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full w-80 pt-3">
          <div className="glass rounded-[1.35rem] p-3 shadow-2xl">
            <p className="px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-neon-green">{group.label}</p>
            {group.items.map(({ label, path, description, icon: Icon }) => (
              <Link key={path} to={path} className="flex gap-3 rounded-2xl p-3 transition hover:bg-white/70">
                <span className="icon-3d h-11 w-11 shrink-0 text-neon-green"><Icon className="h-5 w-5" /></span>
                <span>
                  <strong className="block text-sm text-primaryText">{label}</strong>
                  <span className="text-xs text-soft-gray">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="cyber-shell relative min-h-screen">
      <div className="cyber-grid" />
      <header className="sticky top-0 z-50 px-4 py-4">
        <div className="glass mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-4 py-3 shadow-2xl sm:px-5">
          <Link to="/" className="flex items-center gap-3 font-black">
            <span className="icon-3d h-11 w-11 text-neon-green"><Briefcase className="h-5 w-5" /></span>
            <span className="leading-tight">
              <span className="block text-primaryText">CareerGrid</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-soft-gray">3D Career Platform</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavLink to="/" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-extrabold transition ${isActive ? "bg-neon-green text-white shadow-lg" : "text-soft-gray hover:bg-white/70 hover:text-neon-green"}`}>Home</NavLink>
            {navGroups.map((group) => <Dropdown key={group.label} group={group} />)}
            <NavLink to="/about" className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-extrabold transition ${isActive ? "bg-neon-green text-white shadow-lg" : "text-soft-gray hover:bg-white/70 hover:text-neon-green"}`}>About</NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-full border border-white/70 bg-white/50 p-2 text-soft-gray shadow-sm hover:text-neon-green sm:grid" aria-label="Search"><Search className="h-5 w-5" /></button>
            <button className="hidden rounded-full border border-white/70 bg-white/50 p-2 text-soft-gray shadow-sm hover:text-neon-green sm:grid" aria-label="Notifications"><Bell className="h-5 w-5" /></button>
            <button onClick={() => setDark(!dark)} className="rounded-full border border-white/70 bg-white/50 p-2 text-soft-gray shadow-sm hover:text-neon-green" aria-label="Toggle dark light mode">{dark ? <Sun /> : <Moon />}</button>
            <div className="relative hidden sm:block">
              <button onClick={() => setProfileOpen(!profileOpen)} className="inline-flex items-center gap-2 rounded-full bg-neon-green px-3 py-2 text-sm font-black text-white shadow-lg">
                <UserCircle className="h-5 w-5" /> Login
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full w-64 pt-3">
                  <div className="glass rounded-[1.25rem] p-3">
                    {profileItems.map(([label, path]) => <Link key={label} to={path} onClick={() => setProfileOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-bold text-soft-gray hover:bg-white/70 hover:text-neon-green">{label}</Link>)}
                    <Link to="/admin/login" onClick={() => setProfileOpen(false)} className="mt-2 block rounded-xl bg-neon-green px-3 py-2 text-sm font-black text-white">Role Login</Link>
                  </div>
                </div>
              )}
            </div>
            <button className="rounded-full border border-white/70 bg-white/50 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-950/55 p-4 backdrop-blur-sm lg:hidden">
          <div className="glass h-full overflow-auto rounded-[2rem] p-4">
            <div className="mb-4 flex items-center justify-between"><strong>Menu</strong><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div>
            <nav className="grid gap-2">
              <Link to="/" onClick={() => setMobileOpen(false)} className="rounded-2xl px-3 py-3 font-bold text-soft-gray hover:bg-white/60">Home</Link>
              {navGroups.map((group) => (
                <div className="rounded-2xl border border-white/60 p-3" key={group.label}>
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-neon-green">{group.label}</p>
                  {group.items.map(({ label, path, icon: Icon }) => <Link key={path} to={path} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-soft-gray hover:bg-white/70 hover:text-neon-green"><Icon className="h-4 w-4" />{label}</Link>)}
                </div>
              ))}
              <Link to="/about" onClick={() => setMobileOpen(false)} className="rounded-2xl px-3 py-3 font-bold text-soft-gray hover:bg-white/60">About</Link>
              <Link to="/admin/login" onClick={() => setMobileOpen(false)} className="btn-primary mt-2">Login / Sign Up</Link>
            </nav>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><Breadcrumbs /><Outlet /></main>
      <footer className="relative z-10 border-t border-white/50 px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 text-sm text-soft-gray lg:grid-cols-[1.4fr_2fr]">
          <p><strong className="text-primaryText">CareerGrid</strong> connects learning, internships, jobs, startups, referrals, interview prep, and AI career guidance in one premium platform.</p>
          <div className="flex flex-wrap gap-4 lg:justify-end"><Link to="/startups">Startups</Link><Link to="/courses">Courses</Link><Link to="/internships">Internships</Link><Link to="/jobs">Jobs</Link><Link to="/learning-platforms">Learning Platforms</Link><Link to="/study-material">Study Materials</Link><Link to="/certifications">Certifications</Link><Link to="/ai-career-assistant">AI Assistant</Link><Link to="/admin/login">Login</Link></div>
        </div>
      </footer>
    </div>
  );
}
