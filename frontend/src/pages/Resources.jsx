import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const resources = publicItems(readTable("resources"));
  const filtered = useMemo(() => resources.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase()) && (!category || item.category === category)), [resources, query, category]);
  const categories = [...new Set(resources.map((item) => item.category))];
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Resources" title="Learning Resources" description="Blogs, tutorials, documentation, community forums, and open source resources." /><div className="grid gap-3 md:grid-cols-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-neon-green md:col-span-2" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-cyber-surface px-4 py-3"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <ContentCard key={item.id} title={item.title} meta={item.category} description={item.description} action="Download / View" />)}</div></div>;
}