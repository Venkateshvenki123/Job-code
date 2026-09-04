import { Bookmark, BriefcaseBusiness, MapPin, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Jobs() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const jobs = publicItems(readTable("jobs"));
  const filtered = useMemo(() => jobs.filter((job) => `${job.companyName} ${job.jobTitle} ${job.skillsRequired} ${job.category} ${job.employmentType}`.toLowerCase().includes(query.toLowerCase()) && (!location || job.location === location) && (!mode || job.workMode === mode)), [jobs, query, location, mode]);
  const locations = [...new Set(jobs.map((job) => job.location))];
  const modes = [...new Set(jobs.map((job) => job.workMode).filter(Boolean))];
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Job portal" title="Find the right job faster" description="Search active roles by company, skill, location, work mode, experience, salary, and employment type. Expired jobs are hidden automatically." />
      <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="glass h-fit rounded-3xl p-5"><h2 className="text-lg font-black">Filters</h2><div className="mt-4 grid gap-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Role, skill, company" className="field" /><select value={location} onChange={(e) => setLocation(e.target.value)} className="field"><option value="">All locations</option>{locations.map((item) => <option key={item}>{item}</option>)}</select><select value={mode} onChange={(e) => setMode(e.target.value)} className="field"><option value="">All work modes</option>{modes.map((item) => <option key={item}>{item}</option>)}</select></div></aside>
        <section className="grid gap-4">
          {filtered.map((job) => <article className="premium-card p-5" key={job.id}><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-4"><div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-cyber-bg"><BriefcaseBusiness className="h-7 w-7 text-neon-green" /></div><div><p className="text-sm font-bold text-soft-gray">{job.companyName}</p><h2 className="mt-1 text-2xl font-black">{job.jobTitle}</h2><div className="mt-3 flex flex-wrap gap-2"><span className="badge"><MapPin className="h-3.5 w-3.5" />{job.location}</span><span className="badge">{job.workMode}</span><span className="badge">{job.experience}</span><span className="badge">{job.salary}</span><span className="badge">{job.employmentType}</span></div></div></div><div className="flex gap-2"><button className="rounded-full border border-white/10 p-2 text-soft-gray hover:text-white" aria-label="Save job"><Bookmark className="h-4 w-4" /></button><button className="rounded-full border border-white/10 p-2 text-soft-gray hover:text-white" aria-label="Share job"><Share2 className="h-4 w-4" /></button></div></div><p className="mt-4 leading-7 text-soft-gray">{job.jobDescription}</p><div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-sm text-soft-gray">Skills: {job.skillsRequired} - Expires {job.expiryDate}</p><div className="flex flex-wrap gap-2"><a href={job.applicationLink} className="btn-primary">Apply Now</a><Link to={`/referrals/new?startupId=${job.startupId || ""}&jobId=${job.id}`} className="btn-secondary">Request Referral</Link></div></div></article>)}
          {!filtered.length && <div className="premium-card p-8 text-soft-gray">No jobs matching your filters.</div>}
        </section>
      </section>
    </div>
  );
}
