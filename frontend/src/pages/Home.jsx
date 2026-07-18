import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { readRecord, readTable, publicItems } from "../data/store.js";

export default function Home() {
  const home = readRecord("homeContent");
  const stats = [
    ["Jobs Posted", publicItems(readTable("jobs")).length],
    ["Companies", readTable("companies").length],
    ["Students", readTable("users").length],
    ["Courses", publicItems(readTable("courses")).length]
  ];
  const testimonials = readTable("testimonials");
  const features = ["Admin-managed content", "Search and filters", "Saved jobs and bookmarks", "Career-focused resources"];
  return <div className="page-enter space-y-10"><PageHeader eyebrow="Professional job portal" title={home.heroTitle} description={home.heroSubtitle}><div className="flex flex-wrap gap-3"><a href="/courses" className="rounded-2xl bg-neon-green px-5 py-3 font-black text-cyber-bg">Explore Courses</a><a href="/jobs" className="rounded-2xl border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-3 font-black">Find Jobs</a></div></PageHeader><section className="grid gap-4 lg:grid-cols-2"><div className="glass rounded-3xl p-6"><h2 className="text-3xl font-black">Mission</h2><p className="mt-3 text-soft-gray">{home.mission}</p></div><div className="glass rounded-3xl p-6"><h2 className="text-3xl font-black">Vision</h2><p className="mt-3 text-soft-gray">{home.vision}</p></div></section><section><h2 className="mb-4 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-4">{features.map((feature) => <ContentCard key={feature} title={feature} description="Built for learners, job seekers, companies, and admins who need a scalable professional portal." action="Learn More" />)}</div></section><section><h2 className="mb-4 text-3xl font-black">Why choose this platform?</h2><p className="glass rounded-3xl p-6 text-soft-gray">{home.description}</p></section><section className="grid gap-4 md:grid-cols-4">{stats.map(([label, value]) => <div className="glass rounded-2xl p-5" key={label}><strong className="text-4xl text-neon-green">{value}</strong><p className="font-bold text-soft-gray">{label}</p></div>)}</section><section><h2 className="mb-4 text-3xl font-black">Testimonials</h2><div className="grid gap-4 md:grid-cols-3">{testimonials.map((item) => <div className="glass rounded-2xl p-5" key={item.name}><p className="text-soft-gray">"{item.quote}"</p><strong className="mt-4 block">{item.name}</strong><span className="text-sm text-neon-cyan">{item.role}</span></div>)}</div></section></div>;
}