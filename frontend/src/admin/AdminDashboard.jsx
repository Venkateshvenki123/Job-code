import { useEffect, useMemo, useState } from "react";
import { defaultHomeContent } from "../data/siteData.js";
import { createItem, deleteItem, isExpired, readRecord, readTable, updateItem, writeRecord } from "../data/store.js";

const configs = {
  jobs: { title: "Jobs", fields: ["companyLogo", "companyName", "jobTitle", "location", "salary", "experience", "employmentType", "skillsRequired", "jobDescription", "responsibilities", "qualifications", "applicationLink", "lastDate", "expiryDate", "category"], toggles: ["published", "featured"] },
  internships: { title: "Internships", fields: ["company", "role", "duration", "stipend", "location", "mode", "eligibility", "skills", "applyLink", "lastDate", "expiryDate"], toggles: ["published", "featured"] },
  courses: { title: "Courses", fields: ["courseImage", "courseTitle", "instructor", "duration", "level", "category", "price", "description", "learningOutcomes", "enrollLink", "expiryDate"], toggles: ["published", "featured"] },
  resources: { title: "Resources", fields: ["title", "category", "pdfUpload", "videoLink", "externalLink", "description", "thumbnail"], toggles: ["published", "featured"] },
  companies: { title: "Companies", fields: ["logo", "name", "description", "website", "careersLink", "industry", "location"], toggles: [] },
  applications: { title: "Applications", fields: ["candidateName", "candidateEmail", "jobTitle", "companyName", "resumeUrl", "stage", "score", "assignedHr", "hiringManager", "interviewDate", "notes"], toggles: [] },
  interviewQuestions: { title: "Interview Questions", fields: ["company", "role", "technology", "experienceLevel", "department", "question", "answer", "difficulty", "tags", "interviewRound", "askedDate", "notes", "status", "submittedBy"], toggles: [] },
  interviewExperiences: { title: "Interview Experiences", fields: ["companyName", "jobRole", "experienceLevel", "interviewDate", "location", "interviewMode", "rounds", "questionsAsked", "codingQuestions", "hrQuestions", "technicalQuestions", "overallExperience", "difficultyRating", "tips", "selectionResult", "status"], toggles: ["featured"] },
  notifications: { title: "Notifications", fields: ["title", "message", "audience", "status"], toggles: [] }
};

const labels = { jobs: "jobTitle", internships: "role", courses: "courseTitle", resources: "title", companies: "name", applications: "candidateName", interviewQuestions: "question", interviewExperiences: "companyName", notifications: "title" };

function blankFor(config) {
  return Object.fromEntries([...config.fields, ...(config.toggles || [])].map((field) => [field, config.toggles?.includes(field) ? true : ""]));
}

function CrudManager({ name, refresh }) {
  const config = configs[name];
  const [items, setItems] = useState(() => readTable(name));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(() => blankFor(config));

  const reset = () => { setEditing(null); setForm(blankFor(config)); setItems(readTable(name)); refresh(); };
  const save = (event) => {
    event.preventDefault();
    if (editing) updateItem(name, editing, form); else createItem(name, form);
    reset();
  };
  const edit = (item) => { setEditing(item.id); setForm(item); };
  const remove = (id) => { if (confirm("Delete this item?")) { deleteItem(name, id); reset(); } };
  const toggle = (item, field) => { updateItem(name, item.id, { [field]: !item[field] }); reset(); };
  const renew = (item) => { updateItem(name, item.id, { expiryDate: "2026-12-31" }); reset(); };

  return <section className="glass rounded-3xl p-5"><h2 className="mb-4 text-2xl font-black">Manage {config.title}</h2><form onSubmit={save} className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{config.fields.map((field) => <label className="grid gap-1 text-sm font-bold text-soft-gray" key={field}>{field.replace(/([A-Z])/g, " $1")}<input value={form[field] || ""} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" /></label>)}{config.toggles.map((field) => <label className="flex items-center gap-2 text-sm font-bold" key={field}><input type="checkbox" checked={Boolean(form[field])} onChange={(e) => setForm({ ...form, [field]: e.target.checked })} /> {field}</label>)}<button className="rounded-xl bg-neon-green px-4 py-3 font-black text-cyber-bg">{editing ? "Update" : "Add"} {config.title.slice(0, -1)}</button></form><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="text-soft-gray"><tr><th className="p-3">Name</th><th className="p-3">Status</th><th className="p-3">Expiry</th><th className="p-3">Actions</th></tr></thead><tbody>{items.map((item) => <tr className="border-t border-white/10" key={item.id}><td className="p-3 font-black">{item[labels[name]]}</td><td className="p-3"><span className={isExpired(item) ? "text-red-300" : "text-neon-green"}>{isExpired(item) ? "Expired" : item.published === false ? "Draft" : "Published"}</span>{item.featured && <span className="ml-2 text-neon-cyan">Featured</span>}</td><td className="p-3 text-soft-gray">{item.expiryDate || "-"}</td><td className="flex flex-wrap gap-2 p-3"><button onClick={() => edit(item)} className="rounded-lg bg-white/10 px-3 py-1">Edit</button><button onClick={() => remove(item.id)} className="rounded-lg bg-red-500/20 px-3 py-1 text-red-200">Delete</button>{config.toggles.includes("published") && <button onClick={() => toggle(item, "published")} className="rounded-lg bg-neon-cyan/10 px-3 py-1">Publish</button>}{config.toggles.includes("featured") && <button onClick={() => toggle(item, "featured")} className="rounded-lg bg-neon-green/10 px-3 py-1">Feature</button>}{isExpired(item) && <button onClick={() => renew(item)} className="rounded-lg bg-neon-purple/20 px-3 py-1">Renew</button>}</td></tr>)}</tbody></table></div></section>;
}

function HomeContentManager({ refresh }) {
  const [home, setHome] = useState(() => readRecord("homeContent"));
  const save = () => { writeRecord("homeContent", home); refresh(); alert("Home content saved"); };
  return <section className="glass rounded-3xl p-5"><h2 className="mb-4 text-2xl font-black">Home Page Content</h2><div className="grid gap-3 md:grid-cols-2">{Object.keys(defaultHomeContent).map((field) => <label className="grid gap-1 text-sm font-bold text-soft-gray" key={field}>{field}<textarea value={home[field] || ""} onChange={(e) => setHome({ ...home, [field]: e.target.value })} className="min-h-20 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white" /></label>)}</div><button onClick={save} className="mt-4 rounded-xl bg-neon-green px-4 py-3 font-black text-cyber-bg">Save Home Content</button></section>;
}

export default function AdminDashboard() {
  const [, setVersion] = useState(0);
  const refresh = () => setVersion((v) => v + 1);
  const jobs = readTable("jobs");
  const internships = readTable("internships");
  const applications = readTable("applications");
  const questions = readTable("interviewQuestions");
  const experiences = readTable("interviewExperiences");
  const stats = [
    ["Total Jobs", jobs.length], ["Total Internships", internships.length], ["Applications", applications.length], ["Open Jobs", jobs.filter((job) => job.status !== "Closed").length], ["Questions", questions.length], ["Experiences", experiences.length], ["Pending Approvals", [...questions, ...experiences].filter((item) => item.status === "Pending").length], ["Expired Jobs", jobs.filter(isExpired).length]
  ];
  const recent = [...jobs, ...internships, ...readTable("courses")].slice(0, 5);
  const viewed = [...jobs].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  return <div className="page-enter space-y-7"><section className="glass rounded-3xl p-6"><p className="text-xs font-black uppercase tracking-[0.24em] text-neon-green">Admin Control Center</p><h1 className="mt-3 text-4xl font-black">Admin Dashboard</h1><p className="mt-3 text-soft-gray">Full CRUD management for jobs, internships, courses, resources, companies, applications, interview content, notifications, and home page content.</p></section><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([label, value]) => <div className="glass rounded-2xl p-5" key={label}><strong className="text-3xl text-neon-green">{value}</strong><p className="text-sm font-bold text-soft-gray">{label}</p></div>)}</section><section className="grid gap-4 lg:grid-cols-2"><div className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">Recently Added Items</h2>{recent.map((item) => <p className="mt-2 text-soft-gray" key={item.id}>{item.jobTitle || item.role || item.courseTitle}</p>)}</div><div className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">Most Viewed Jobs</h2>{viewed.map((item) => <p className="mt-2 text-soft-gray" key={item.id}>{item.jobTitle} - {item.views} views</p>)}</div></section><HomeContentManager refresh={refresh} />{Object.keys(configs).map((name) => <CrudManager key={name} name={name} refresh={refresh} />)}<section className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">Contact Messages</h2>{readTable("messages").map((msg) => <p className="mt-2 text-soft-gray" key={msg.id}>{msg.name} - {msg.email}: {msg.message}</p>)}</section></div>;
}
