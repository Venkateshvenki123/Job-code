import { CalendarClock, MapPin, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Internships() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("");
  const internships = publicItems(readTable("internships"));
  const filtered = useMemo(() => internships.filter((item) => `${item.company} ${item.role} ${item.skills} ${item.location}`.toLowerCase().includes(query.toLowerCase()) && (!mode || item.mode === mode)), [internships, query, mode]);
  const modes = [...new Set(internships.map((item) => item.mode))];
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Internship" title="Gain experience with quality internships" description="Find remote, hybrid, onsite, paid, summer, and fresher-friendly internships with deadline-aware availability." />
      <div className="grid gap-3 md:grid-cols-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company, role, skill" className="field md:col-span-2" /><select value={mode} onChange={(event) => setMode(event.target.value)} className="field"><option value="">All modes</option>{modes.map((item) => <option key={item}>{item}</option>)}</select></div>
      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => <article className="premium-card p-5" key={item.id}><div className="flex items-start gap-4"><div className="grid h-13 w-13 place-items-center rounded-2xl bg-neon-green/12 text-neon-green"><UsersRound /></div><div><p className="text-sm font-bold text-soft-gray">{item.company}</p><h2 className="text-2xl font-black">{item.role}</h2></div></div><div className="mt-4 flex flex-wrap gap-2"><span className="badge"><MapPin className="h-3.5 w-3.5" />{item.location}</span><span className="badge">{item.mode}</span><span className="badge"><CalendarClock className="h-3.5 w-3.5" />{item.duration}</span><span className="badge">{item.stipend}</span></div><p className="mt-4 text-soft-gray">Eligibility: {item.eligibility}. Skills: {item.skills}</p><div className="mt-5 flex items-center justify-between gap-3"><span className="text-sm text-soft-gray">Deadline {item.lastDate}</span><a href={item.applyLink} className="btn-primary">Apply</a></div></article>)}
      </section>
      {!filtered.length && <div className="premium-card p-8 text-soft-gray">No internships matching your filters.</div>}
    </div>
  );
}
