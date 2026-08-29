import { Bell, BookOpen, Briefcase, ChevronDown, GraduationCap, Library, Menu, Moon, Search, ShieldCheck, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  ["Home", "/"],
  ["Course", "/courses"],
  ["Internship", "/internships"],
  ["Job", "/jobs"],
  ["About", "/about"],
  ["Login/Admin", "/admin/login"]
];

const resourceItems = [
  { label: "Learning Platform", path: "/learning-platforms", description: "Discover trusted learning platforms", icon: GraduationCap },
  { label: "Study Material", path: "/study-material", description: "Notes, guides, PDFs, tutorials", icon: Library },
  { label: "Certification", path: "/certifications", description: "Industry credentials and paths", icon: ShieldCheck }
];

function Breadcrumbs() {
  const location = useLocation();
  if (location.pathname === "/") return null;
  const parts = location.pathname.split("/").filter(Boolean);
  return <div className="mb-5 flex flex-wrap gap-2 text-sm text-soft-gray"><Link to="/" className="hover:text-neon-green">Home</Link>{parts.map((part, index) => <span key={part} className="flex gap-2"><span>/</span><Link to={`/${parts.slice(0, index + 1).join("/")}`} className="capitalize hover:text-neon-green">{part.replaceAll("-", " ")}</Link></span>)}</div>;
}

function NavLinks({ onClick }) {
  return navItems.map(([label, path]) => <NavLink key={path} to={path} onClick={onClick} className={({ isActive }) => `rounded-full px-3.5 py-2 text-sm font-extrabold transition ${isActive ? "bg-neon-green/12 text-white ring-1 ring-neon-green/25" : "text-soft-gray hover:bg-white/6 hover:text-white"}`}>{label}</NavLink>);
}

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [light, setLight] = useState(() => localStorage.getItem("theme") === "light");
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <div className="cyber-shell relative min-h-screen">
      <div className="cyber-grid" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-cyber-bg/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-cyber-bg shadow-lg"><Briefcase className="h-5 w-5 text-neon-green" /></span><span className="leading-tight"><span className="block">CareerGrid</span><span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-soft-gray">Recruitment + Learning</span></span></Link>
          <nav className="hidden items-center gap-1 lg:flex">
            <NavLinks />
            <div className="relative" onMouseEnter={() => setResourceOpen(true)} onMouseLeave={() => setResourceOpen(false)}>
              <button onClick={() => setResourceOpen(!resourceOpen)} className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-extrabold text-soft-gray transition hover:bg-white/6 hover:text-white">Resource <ChevronDown className="h-4 w-4" /></button>
              {resourceOpen && <div className="absolute left-0 top-full w-80 pt-3"><div className="glass rounded-2xl p-3 shadow-2xl"><p className="px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-neon-green">Resource</p>{resourceItems.map(({ label, path, description, icon: Icon }) => <Link key={path} to={path} className="flex gap-3 rounded-xl p-3 transition hover:bg-white/8"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-neon-green"><Icon className="h-5 w-5" /></span><span><strong className="block text-sm text-white">{label}</strong><span className="text-xs text-soft-gray">{description}</span></span></Link>)}</div></div>}
            </div>
          </nav>
          <div className="flex items-center gap-2"><button className="hidden rounded-full border border-white/10 p-2 text-soft-gray hover:text-white sm:grid" aria-label="Search"><Search className="h-5 w-5" /></button><button className="hidden rounded-full border border-white/10 p-2 text-soft-gray hover:text-white sm:grid" aria-label="Notifications"><Bell className="h-5 w-5" /></button><button onClick={() => setLight(!light)} className="rounded-full border border-white/10 p-2 text-soft-gray hover:text-white" aria-label="Toggle dark light mode">{light ? <Moon /> : <Sun />}</button><button className="rounded-full border border-white/10 p-2 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button></div>
        </div>
      </header>
      {mobileOpen && <div className="fixed inset-0 z-[60] bg-black/70 p-4 lg:hidden"><div className="glass h-full rounded-3xl p-4"><div className="mb-4 flex items-center justify-between"><strong>Menu</strong><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div><nav className="grid gap-1"><NavLinks onClick={() => setMobileOpen(false)} /><div className="mt-3 rounded-2xl border border-white/10 p-3"><p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-neon-green">Resource</p>{resourceItems.map(({ label, path, icon: Icon }) => <Link key={path} to={path} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-soft-gray hover:bg-white/8 hover:text-white"><Icon className="h-4 w-4" />{label}</Link>)}</div></nav></div></div>}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><Breadcrumbs /><Outlet /></main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-8"><div className="mx-auto grid max-w-7xl gap-6 text-sm text-soft-gray lg:grid-cols-[1.4fr_2fr]"><p><strong className="text-white">CareerGrid</strong> connects learning, internships, jobs, interview prep, and recruitment workflows in one professional platform.</p><div className="flex flex-wrap gap-4 lg:justify-end"><Link to="/courses">Course</Link><Link to="/internships">Internship</Link><Link to="/jobs">Job</Link><Link to="/learning-platforms">Learning Platform</Link><Link to="/study-material">Study Material</Link><Link to="/certifications">Certification</Link><Link to="/interview-questions">Questions</Link><Link to="/interview-experiences">Experiences</Link><Link to="/admin/login">Admin</Link></div></div></footer>
    </div>
  );
}
