import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, FileText, FolderOpen, Search } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

const categoryIcons = {
  Blogs: BookOpen,
  Tutorials: FileText,
  Documentation: FolderOpen,
  "Open Source": FolderOpen
};

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const resources = publicItems(readTable("resources"));
  const categories = [...new Set(resources.map((item) => item.category).filter(Boolean))];
  const filtered = useMemo(
    () =>
      resources.filter((item) => {
        const searchable = [item.title, item.category, item.description].join(" ").toLowerCase();
        return searchable.includes(query.toLowerCase()) && (!category || item.category === category);
      }),
    [resources, query, category]
  );

  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Resource library"
        title="Learning Resources"
        description="Browse curated guides, documentation, communities, and practical material managed from the Admin Dashboard."
      />

      <section className="premium-card grid gap-4 p-4 lg:grid-cols-[1fr_260px]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search resources, categories, or topics"
            className="field w-full pl-12"
          />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="field">
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const Icon = categoryIcons[item.category] || BookOpen;
          return (
            <article key={item.id} className="premium-card group flex min-h-64 flex-col justify-between p-6">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="badge">{item.category || "Resource"}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-primaryText">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-secondaryText">{item.description}</p>
              </div>
              <a href={item.externalLink || item.videoLink || item.fileUrl || "#"} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Open resource <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
}
