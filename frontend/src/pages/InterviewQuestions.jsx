import { useMemo, useState } from "react";
import { Search, Send, Sparkles } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { createItem, publicItems, readTable } from "../data/store.js";

export default function InterviewQuestions() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ company: "", role: "", experienceLevel: "", question: "", answer: "", interviewRound: "", difficulty: "Medium", tags: "" });
  const questions = publicItems(readTable("interviewQuestions").map((item) => ({ ...item, published: item.status === "Published" })));
  const filtered = useMemo(() => questions.filter((item) => [item.company, item.role, item.technology, item.tags, item.question].join(" ").toLowerCase().includes(query.toLowerCase())), [questions, query]);
  const submit = (event) => {
    event.preventDefault();
    createItem("interviewQuestions", { ...form, company: form.company || "Community", technology: form.tags, department: "Community", status: "Pending", submittedBy: "Candidate", askedDate: new Date().toISOString().slice(0, 10), notes: "Pending admin approval" });
    setForm({ company: "", role: "", experienceLevel: "", question: "", answer: "", interviewRound: "", difficulty: "Medium", tags: "" });
    alert("Question submitted for approval.");
  };

  return (
    <div className="page-enter space-y-8">
      <PageHeader eyebrow="Interview prep" title="Interview Question Bank" description="Search company, role, technology, department, and difficulty-tagged interview questions approved by the platform team." />
      <label className="premium-card relative block p-3">
        <Search className="pointer-events-none absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, company, role, technology..." className="field w-full pl-12" />
      </label>
      <section className="grid gap-5 md:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="premium-card p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge">{item.company}</span>
              <span className="badge">{item.role}</span>
              <span className="badge">{item.difficulty}</span>
            </div>
            <h2 className="text-xl font-bold leading-7 text-primaryText">{item.question}</h2>
            <p className="mt-4 text-sm leading-6 text-secondaryText">{item.answer}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">{item.interviewRound}</p>
            <p className="mt-2 text-sm text-muted">{item.tags}</p>
          </article>
        ))}
      </section>
      <section className="premium-card p-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-primaryText">Submit a Question</h2>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-2">
          {Object.keys(form).map((field) => (
            <label className="grid gap-2 text-sm font-bold text-secondaryText" key={field}>
              {field.replace(/([A-Z])/g, " $1")}
              <input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field" />
            </label>
          ))}
          <button className="btn-primary md:col-span-2 md:w-fit">
            Submit for Approval <Send className="h-4 w-4" />
          </button>
        </form>
      </section>
    </div>
  );
}
