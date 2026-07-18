import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Internships() {
  const [mode, setMode] = useState("");
  const items = publicItems(readTable("internships"));
  const filtered = useMemo(() => items.filter((item) => !mode || item.mode === mode), [items, mode]);
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Internships" title="Internship Opportunities" description="Remote, paid, summer, and freshers internships. Expired internships are removed from public views automatically." /><select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-2xl border border-white/10 bg-cyber-surface px-4 py-3"><option value="">All modes</option><option>Remote</option><option>Hybrid</option><option>Onsite</option></select><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{filtered.map((item) => <ContentCard key={item.id} title={item.role} meta={`${item.company} - ${item.duration} - ${item.stipend}`} description={`${item.location} • ${item.mode} • Eligibility: ${item.eligibility} • Skills: ${item.skills}`} action="Apply" />)}</div></div>;
}