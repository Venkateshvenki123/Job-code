import { useMemo, useState } from "react";
import ContentCard from "../components/ContentCard.jsx";
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
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Candidate stories" title="Interview Experiences" description="Read approved interview journeys and submit your own experience to help future candidates prepare." />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company, role, tips..." className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-neon-green" />
      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => <ContentCard key={item.id} title={`${item.companyName} - ${item.jobRole}`} meta={`${item.rounds} rounds - ${item.difficultyRating}`} action={item.selectionResult}><p>{item.overallExperience}</p><p className="mt-3 text-soft-gray">{item.tips}</p></ContentCard>)}
      </section>
      <section className="glass rounded-3xl p-5">
        <h2 className="text-2xl font-black">Share Interview Experience</h2>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
          {fields.map((field) => <label className="grid gap-1 text-sm font-bold text-soft-gray" key={field}>{field.replace(/([A-Z])/g, " $1")}<textarea value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="min-h-12 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" /></label>)}
          <button className="rounded-xl bg-neon-green px-4 py-3 font-black text-cyber-bg">Submit Experience</button>
        </form>
      </section>
    </div>
  );
}
