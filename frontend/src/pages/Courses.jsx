import { BookOpen, Star } from "lucide-react";
import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const courses = publicItems(readTable("courses"));
  const filtered = useMemo(() => courses.filter((course) => `${course.courseTitle} ${course.category} ${course.level} ${course.instructor}`.toLowerCase().includes(query.toLowerCase()) && (!category || course.category === category)), [courses, query, category]);
  const categories = [...new Set(courses.map((course) => course.category))];
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Course" title="Learn skills that improve employability" description="Explore practical programming, web development, AI, data, cloud, and UI/UX courses curated for career growth." />
      <div className="grid gap-3 md:grid-cols-3"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses, instructor, skill" className="field md:col-span-2" /><select value={category} onChange={(e) => setCategory(e.target.value)} className="field"><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((course) => <article className="premium-card overflow-hidden" key={course.id}><div className="grid h-40 place-items-center bg-gradient-to-br from-neon-green/18 to-neon-cyan/10"><BookOpen className="h-14 w-14 text-neon-green" /></div><div className="p-5"><div className="flex items-center justify-between gap-3"><span className="badge">{course.category}</span><span className="inline-flex items-center gap-1 text-sm font-black text-amber-300"><Star className="h-4 w-4 fill-current" />4.8</span></div><h2 className="mt-4 text-2xl font-black">{course.courseTitle}</h2><p className="mt-2 text-sm text-soft-gray">{course.description}</p><div className="mt-4 flex flex-wrap gap-2"><span className="badge">{course.level}</span><span className="badge">{course.duration}</span><span className="badge">{course.price}</span></div><p className="mt-4 text-sm text-soft-gray">Instructor: {course.instructor}</p><a href={course.enrollLink} className="btn-primary mt-5 w-full">Enroll</a></div></article>)}
      </section>
      {!filtered.length && <div className="premium-card p-8 text-soft-gray">No courses matching your filters.</div>}
    </div>
  );
}
