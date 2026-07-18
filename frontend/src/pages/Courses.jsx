import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const courses = publicItems(readTable("courses"));
  const filtered = useMemo(() => courses.filter((course) => `${course.courseTitle} ${course.category} ${course.level}`.toLowerCase().includes(query.toLowerCase()) && (!category || course.category === category)), [courses, query, category]);
  const categories = [...new Set(courses.map((course) => course.category))];
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Courses" title="Explore Courses" description="Programming, Web Development, AI & Machine Learning, Data Analytics, Cloud Computing, and UI/UX Design courses." /><div className="grid gap-3 md:grid-cols-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-neon-green md:col-span-2" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-2xl border border-white/10 bg-cyber-surface px-4 py-3"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((course) => <ContentCard key={course.id} title={course.courseTitle} meta={`${course.duration} - ${course.level} - ${course.price}`} description={`${course.description} Outcomes: ${course.learningOutcomes}`} action="Enroll" />)}</div></div>;
}