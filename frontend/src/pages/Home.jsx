import { ArrowRight, BookOpen, BriefcaseBusiness, Building2, FileCheck2, GraduationCap, Layers3, Sparkles, UsersRound } from "lucide-react";
import ContentCard from "../components/ContentCard.jsx";
import { readRecord, readTable, publicItems } from "../data/store.js";

const benefits = [
  ["Find Jobs", "Search role-ready opportunities with filters and expiry-aware listings.", BriefcaseBusiness],
  ["Find Internships", "Discover remote, hybrid, paid, and fresher-friendly internships.", UsersRound],
  ["Learn Skills", "Follow course paths built for employable technical skills.", BookOpen],
  ["Prepare Interviews", "Practice questions and read real candidate experiences.", FileCheck2],
  ["Discover Certifications", "Choose industry credentials with preparation guidance.", GraduationCap],
  ["Access Study Materials", "Use notes, PDFs, guides, and technical resources.", Layers3]
];

const steps = ["Discover jobs, internships, courses, and resources.", "Learn skills through curated courses and study material.", "Prepare with interview questions and experience timelines.", "Apply to relevant opportunities and track progress.", "Grow with feedback, certifications, and career insights."];

export default function Home() {
  const home = readRecord("homeContent");
  const stats = [
    ["Jobs", publicItems(readTable("jobs")).length],
    ["Internships", publicItems(readTable("internships")).length],
    ["Courses", publicItems(readTable("courses")).length],
    ["Companies", readTable("companies").length],
    ["Candidates", readTable("users").length]
  ];
  const testimonials = readTable("testimonials");
  return (
    <div className="page-enter space-y-12">
      <section className="grid items-center gap-8 py-6 lg:grid-cols-[1.08fr_.92fr] lg:py-14">
        <div>
          <span className="badge mb-5"><Sparkles className="h-4 w-4 text-neon-green" /> Modern recruitment and learning platform</span>
          <h1 className="max-w-5xl text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">Build Your Career. Find Opportunities. Learn What Matters.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-soft-gray">{home.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="/jobs" className="btn-primary">Explore Jobs <ArrowRight className="h-4 w-4" /></a><a href="/internships" className="btn-secondary">Explore Internships</a></div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-soft-gray"><span className="badge">Admin-managed content</span><span className="badge">Expiry-aware listings</span><span className="badge">Interview preparation</span></div>
        </div>
        <div className="glass relative min-h-[420px] overflow-hidden rounded-[2rem] p-5">
          <div className="absolute inset-8 rounded-[2rem] border border-white/10 bg-white/5" />
          <div className="absolute right-8 top-8 w-64 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-neon-green">Recommended Job</p><h3 className="mt-3 text-2xl font-black">Frontend Developer</h3><p className="mt-2 text-sm text-soft-gray">Remote - React - Full-time</p></div>
          <div className="absolute bottom-10 left-6 w-72 rounded-3xl border border-white/10 bg-cyber-surface/80 p-5 shadow-2xl"><p className="text-xs font-black uppercase tracking-[0.2em] text-neon-cyan">Learning path</p><h3 className="mt-3 text-xl font-black">React + Interview Prep</h3><div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-2 w-3/4 rounded-full bg-neon-green" /></div></div>
          <div className="absolute left-12 top-16 grid h-20 w-20 place-items-center rounded-3xl bg-white text-cyber-bg shadow-2xl"><BriefcaseBusiness className="h-9 w-9 text-neon-green" /></div>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{stats.map(([label, value]) => <div className="premium-card p-5" key={label}><strong className="text-4xl text-neon-green">{value}</strong><p className="mt-1 font-bold text-soft-gray">{label}</p></div>)}</section>
      <section><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-neon-green">Why this platform?</p><h2 className="mt-2 text-3xl font-black">Everything candidates and recruiters expect</h2></div></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{benefits.map(([title, description, icon]) => <ContentCard key={title} title={title} description={description} action="Explore" icon={icon} />)}</div></section>
      <section className="glass rounded-[2rem] p-6 sm:p-8"><p className="text-xs font-black uppercase tracking-[0.22em] text-neon-green">How it works</p><div className="mt-6 grid gap-4 lg:grid-cols-5">{steps.map((step, index) => <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={step}><span className="text-3xl font-black text-neon-green">{index + 1}</span><p className="mt-3 text-sm leading-6 text-soft-gray">{step}</p></div>)}</div></section>
      <section><h2 className="mb-4 text-3xl font-black">Testimonials</h2><div className="grid gap-4 md:grid-cols-3">{testimonials.map((item) => <div className="premium-card p-5" key={item.name}><p className="leading-7 text-soft-gray">"{item.quote}"</p><strong className="mt-4 block">{item.name}</strong><span className="text-sm text-neon-cyan">{item.role}</span></div>)}</div></section>
      <section className="glass rounded-[2rem] p-8 text-center"><h2 className="text-4xl font-black">Ready to move your career forward?</h2><p className="mx-auto mt-4 max-w-2xl text-soft-gray">{home.description}</p><div className="mt-7 flex flex-wrap justify-center gap-3"><a href="/jobs" className="btn-primary">Find Jobs</a><a href="/courses" className="btn-secondary">Start Learning</a><a href="/internships" className="btn-secondary">Explore Internships</a></div></section>
    </div>
  );
}
