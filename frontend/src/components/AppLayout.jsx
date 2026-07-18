import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  ["Home", "/"],
  ["Jobs", "/jobs"],
  ["Internships", "/internships"],
  ["Courses", "/courses"],
  ["Resources", "/resources"],
  ["Companies", "/companies"],
  ["About Us", "/about"],
  ["Contact Us", "/contact"],
  ["Login/Admin", "/admin/login"]
];

function Breadcrumbs() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  const parts = location.pathname.split("/").filter(Boolean);
  return <div className="mb-5 flex flex-wrap gap-2 text-sm text-soft-gray"><Link to="/" className="hover:text-neon-green">Home</Link>{parts.map((part, index) => <span key={part} className="flex gap-2"><span>/</span><Link to={`/${parts.slice(0, index + 1).join("/")}`} className="capitalize hover:text-neon-green">{part.replaceAll("-", " ")}</Link></span>)}</div>;
}

function NavLinks({ onClick }) {
  return navItems.map(([label, path]) => <NavLink key={path} to={path} onClick={onClick} className={({ isActive }) => `rounded-xl px-3 py-2 text-sm font-extrabold transition ${isActive ? "bg-neon-green/15 text-neon-green" : "text-soft-gray hover:bg-white/5 hover:text-white"}`}>{label}</NavLink>);
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [light, setLight] = useState(() => localStorage.getItem("theme") === "light");
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <div className="cyber-shell relative min-h-screen">
      <div className="cyber-grid" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-cyber-bg/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-black"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-green to-neon-cyan text-cyber-bg">JP</span><span>Job Portal</span></Link>
          <nav className="hidden items-center gap-1 lg:flex"><NavLinks /></nav>
          <div className="flex items-center gap-2"><button onClick={() => setLight(!light)} className="rounded-xl border border-white/10 p-2" aria-label="Toggle dark light mode">{light ? <Moon /> : <Sun />}</button><button className="rounded-xl border border-white/10 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button></div>
        </div>
      </header>
      {mobileOpen && <div className="fixed inset-0 z-[60] bg-black/70 p-4 lg:hidden"><div className="glass h-full rounded-3xl p-4"><div className="mb-4 flex items-center justify-between"><strong>Menu</strong><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div><nav className="grid gap-1"><NavLinks onClick={() => setMobileOpen(false)} /></nav></div></div>}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><Breadcrumbs /><Outlet /></main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-8"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-soft-gray md:flex-row md:items-center md:justify-between"><p><strong className="text-white">Job Portal</strong> - Professional education and career platform.</p><div className="flex flex-wrap gap-4"><Link to="/jobs">Jobs</Link><Link to="/internships">Internships</Link><Link to="/courses">Courses</Link><Link to="/resources">Resources</Link><Link to="/admin/login">Admin</Link></div></div></footer>
    </div>
  );
}