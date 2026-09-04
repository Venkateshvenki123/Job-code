import { useMemo, useState } from "react";
import { Bot, Briefcase, CheckCircle2, GraduationCap, Search, ShieldCheck } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

function scoreJob(skills, job) {
  const wanted = job.skillsRequired.toLowerCase().split(/,\s*/).filter(Boolean);
  const candidate = skills.toLowerCase();
  const matching = wanted.filter((skill) => candidate.includes(skill.toLowerCase()));
  const missing = wanted.filter((skill) => !candidate.includes(skill.toLowerCase()));
  return {
    ...job,
    score: wanted.length ? Math.round((matching.length / wanted.length) * 100) : 0,
    matching,
    missing
  };
}

export default function AiCareerAssistant() {
  const [question, setQuestion] = useState("Find AI startups hiring freshers in Bengaluru");
  const [skills, setSkills] = useState("React, JavaScript, SQL");
  const jobs = publicItems(readTable("jobs"));
  const startups = publicItems(readTable("startups"));
  const courses = publicItems(readTable("courses"));
  const certifications = publicItems(readTable("certifications"));
  const lowerQuestion = question.toLowerCase();

  const matchedStartups = useMemo(
    () =>
      startups.filter((startup) =>
        [startup.name, startup.industry, startup.technologiesUsed, startup.workLocations, startup.description, startup.stage]
          .join(" ")
          .toLowerCase()
          .split(/\s+/)
          .some((word) => word.length > 3 && lowerQuestion.includes(word))
      ),
    [startups, lowerQuestion]
  );
  const matchedJobs = useMemo(() => jobs.map((job) => scoreJob(skills, job)).sort((a, b) => b.score - a.score), [jobs, skills]);

  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="AI career assistant"
        title="Ask career questions using real platform data."
        description="Find startups, compare skills to jobs, get course and certification recommendations, and prepare for interviews without inventing listings."
      />

      <section className="premium-card grid gap-4 p-5 lg:grid-cols-[1fr_360px]">
        <label className="relative">
          <Bot className="pointer-events-none absolute left-4 top-5 h-5 w-5 text-primary" />
          <textarea value={question} onChange={(event) => setQuestion(event.target.value)} className="field min-h-28 w-full resize-none pl-12" />
        </label>
        <label className="grid gap-2 text-sm font-bold text-secondaryText">
          Candidate skills
          <textarea value={skills} onChange={(event) => setSkills(event.target.value)} className="field min-h-28 resize-none" />
        </label>
      </section>

      <section className="rounded-3xl border border-primary/25 bg-primary/10 p-5 text-sm leading-6 text-secondaryText">
        <strong className="text-primaryText">AI safety:</strong> this assistant formats and matches existing records only. Match scores are recommendations, not guarantees of hiring outcomes.
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="premium-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primaryText"><Search className="h-6 w-6 text-primary" /> Relevant Startups</h2>
          <div className="mt-5 grid gap-3">
            {(matchedStartups.length ? matchedStartups : startups.slice(0, 3)).map((startup) => (
              <div className="rounded-2xl border border-border bg-elevated p-4" key={startup.id}>
                <p className="font-bold text-primaryText">{startup.name}</p>
                <p className="mt-1 text-sm text-secondaryText">{startup.industry} | {startup.workLocations} | {startup.stage}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="premium-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primaryText"><Briefcase className="h-6 w-6 text-primary" /> AI Job Matching</h2>
          <div className="mt-5 grid gap-3">
            {matchedJobs.slice(0, 3).map((job) => (
              <div className="rounded-2xl border border-border bg-elevated p-4" key={job.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-primaryText">{job.jobTitle}</p>
                  <span className="badge">{job.score}% match</span>
                </div>
                <p className="mt-2 text-sm text-secondaryText">Matching: {job.matching.join(", ") || "Needs profile details"}</p>
                <p className="mt-1 text-sm text-secondaryText">Improve: {job.missing.join(", ") || "Strong match"}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="premium-card p-6">
          <GraduationCap className="h-7 w-7 text-primary" />
          <h2 className="mt-4 text-xl font-bold text-primaryText">Recommended Courses</h2>
          <div className="mt-4 grid gap-3 text-sm text-secondaryText">
            {courses.slice(0, 3).map((course) => <p key={course.id}><CheckCircle2 className="mr-2 inline h-4 w-4 text-primary" />{course.courseTitle}</p>)}
          </div>
        </article>
        <article className="premium-card p-6">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h2 className="mt-4 text-xl font-bold text-primaryText">Certifications</h2>
          <div className="mt-4 grid gap-3 text-sm text-secondaryText">
            {certifications.slice(0, 3).map((cert) => <p key={cert.id}><CheckCircle2 className="mr-2 inline h-4 w-4 text-primary" />{cert.name}</p>)}
          </div>
        </article>
        <article className="premium-card p-6">
          <Bot className="h-7 w-7 text-primary" />
          <h2 className="mt-4 text-xl font-bold text-primaryText">Interview Plan</h2>
          <p className="mt-4 text-sm leading-6 text-secondaryText">Day 1: fundamentals. Day 2: SQL/API practice. Day 3: project walkthrough. Day 4: role-specific questions. Day 5: mock interview.</p>
        </article>
      </section>
    </div>
  );
}
