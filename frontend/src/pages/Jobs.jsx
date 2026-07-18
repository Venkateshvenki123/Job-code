import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { isExpired, publicItems, readTable } from "../data/store.js";

export default function Jobs() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const jobs = publicItems(readTable("jobs"));
  const filtered = useMemo(() => jobs.filter((job) => `${job.companyName} ${job.jobTitle} ${job.skillsRequired} ${job.category}`.toLowerCase().includes(query.toLowerCase()) && (!location || job.location === location)), [jobs, query, location]);
  const locations = [...new Set(jobs.map((job) => job.location))];
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Jobs" title="Job Opportunities" description="Search latest job listings, remote jobs, entry-level jobs, and tech roles. Expired jobs are hidden from users automatically." /><div className="grid gap-3 md:grid-cols-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, skills, company" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-neon-green md:col-span-2" /><select value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-2xl border border-white/10 bg-cyber-surface px-4 py-3"><option value="">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((job) => <ContentCard key={job.id} title={job.jobTitle} meta={`${job.companyName} - ${job.location} - ${job.salary}`} description={`${job.experience} • ${job.employmentType} • Skills: ${job.skillsRequired}`} action="Apply / Save / Share" />)}</div></div>;
}