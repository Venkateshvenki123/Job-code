import { useMemo, useState } from "react";
import { MessageSquarePlus, Search, Send } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { createItem, publicItems, readTable } from "../data/store.js";

const fields = ["companyName", "jobRole", "experienceLevel", "interviewDate", "location", "interviewMode", "rounds", "questionsAsked", "codingQuestions", "hrQuestions", "technicalQuestions", "overallExperience", "difficultyRating", "tips", "selectionResult"];

export default function InterviewExperiences() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(Object.fromEntries(fields.map((field) => [field, ""])));
  const experiences = publicItems(readTable("interviewExperiences").map((item) => ({ ...item, published: item.status === "Published" })));
  const filtered = useMemo(() => experiences.filter((item) => [item.companyName, item.jobRole, item.overallExperience, item.tips].join(" ").toLowerCase().includes(query.toLowerCase())), [experiences, query]);
  const submit = (event) => {
    event.preventDefault();
    createItem("interviewExperiences", { ...form, anonymous: false, status: "Pending", featured: false });
    setForm(Object.fromEntries(fields.map((field) => [field, ""])));
    alert("Experience submitted for approval.");
  };

  return (
    <div className="page-enter space-y-8">
      <PageHeader eyebrow="Candidate stories" title="Interview Experiences" description="Read approved interview journeys and submit your own experience to help future candidates prepare." />
      <label className="premium-card relative block p-3">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company, role, tips..." className="field w-full pl-12" />
      </label>
      <section className="grid gap-5 md:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="premium-card p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge">{item.companyName}</span>
              <span className="badge">{item.rounds} rounds</span>
              <span className="badge">{item.difficultyRating}</span>
            </div>
            <h2 className="text-xl font-bold text-primaryText">{item.jobRole}</h2>
            <p className="mt-4 text-sm leading-6 text-secondaryText">{item.overallExperience}</p>
            <p className="mt-4 rounded-2xl border border-border bg-elevated p-4 text-sm leading-6 text-secondaryText">{item.tips}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">{item.selectionResult}</p>
          </article>
        ))}
      </section>
      <section className="premium-card p-6">
        <div className="flex items-center gap-3">
          <MessageSquarePlus className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primaryText">Share Interview Experience</h2>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-2">
          {fields.map((field) => (
            <label className="grid gap-2 text-sm font-bold text-secondaryText" key={field}>
              {field.replace(/([A-Z])/g, " $1")}
              <textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field min-h-24 resize-none" />
            </label>
          ))}
          <button className="btn-primary md:col-span-2 md:w-fit">
            Submit Experience <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
