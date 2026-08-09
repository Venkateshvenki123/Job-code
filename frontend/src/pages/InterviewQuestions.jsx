import { useMemo, useState } from "react";
import ContentCard from "../components/ContentCard.jsx";
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
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Interview prep" title="Interview Question Bank" description="Search company, role, technology, department, and difficulty-tagged interview questions approved by the platform team." />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search questions, company, role, technology..." className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-neon-green" />
      <section className="grid gap-4 md:grid-cols-2">{filtered.map((item) => <ContentCard key={item.id} title={item.question} meta={`${item.company} - ${item.role} - ${item.difficulty}`} action={item.interviewRound}><p>{item.answer}</p><p className="mt-3 text-xs font-bold text-neon-cyan">{item.tags}</p></ContentCard>)}</section>
      <section className="glass rounded-3xl p-5">
        <h2 className="text-2xl font-black">Submit a Question</h2>
        <form onSubmit={submit} className="mt-4 grid gap-3 md:grid-cols-2">
          {Object.keys(form).map((field) => <label className="grid gap-1 text-sm font-bold text-soft-gray" key={field}>{field.replace(/([A-Z])/g, " $1")}<input value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" /></label>)}
          <button className="rounded-xl bg-neon-green px-4 py-3 font-black text-cyber-bg">Submit for Approval</button>
        </form>
      </section>
    </div>
  );
}
