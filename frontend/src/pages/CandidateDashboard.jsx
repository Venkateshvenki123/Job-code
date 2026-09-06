import { Bot, BriefcaseBusiness, CalendarClock, CheckCircle2, GraduationCap, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { referralStatuses } from "../data/siteData.js";
import { publicItems, readTable } from "../data/store.js";

function Metric({ label, value, icon: Icon }) {
  return (
    <article className="premium-card p-5">
      <span className="icon-3d h-12 w-12 text-neon-green"><Icon className="h-5 w-5" /></span>
      <strong className="mt-4 block text-3xl text-primaryText">{value}</strong>
      <p className="text-sm font-bold text-soft-gray">{label}</p>
    </article>
  );
}

export default function CandidateDashboard() {
  const jobs = publicItems(readTable("jobs"));
  const courses = publicItems(readTable("courses"));
  const referrals = readTable("referralRequests");
  const interviews = readTable("interviewExperiences");

  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Candidate workspace"
        title="Welcome back. Your career progress is organized here."
        description="Track saved opportunities, referral requests, interview preparation, and AI recommendations without the HR management clutter."
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Recommended Jobs" value={jobs.length} icon={BriefcaseBusiness} />
        <Metric label="Learning Paths" value={courses.length} icon={GraduationCap} />
        <Metric label="Referral Requests" value={referrals.length} icon={Star} />
        <Metric label="Interview Stories" value={interviews.length} icon={CalendarClock} />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_.85fr]">
        <article className="premium-card p-6">
          <h2 className="text-2xl font-black text-primaryText">Recommended Jobs</h2>
          <div className="mt-5 grid gap-3">
            {jobs.slice(0, 4).map((job) => (
              <div key={job.id} className="rounded-2xl border border-border bg-white/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-black text-primaryText">{job.jobTitle}</p>
                    <p className="mt-1 text-sm text-soft-gray">{job.companyName} | {job.location} | {job.employmentType}</p>
                  </div>
                  <Link to={`/referrals/new?startupId=${job.startupId || ""}&jobId=${job.id}`} className="btn-secondary px-4 py-2 text-sm">Request Referral</Link>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="premium-card p-6">
          <h2 className="text-2xl font-black text-primaryText">Career Progress</h2>
          <div className="mt-5 h-3 rounded-full bg-violet-100">
            <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-neon-green to-neon-purple" />
          </div>
          <p className="mt-4 text-sm leading-6 text-soft-gray">Profile, skills, referrals, interview prep, and learning recommendations are 80% complete.</p>
          <Link to="/ai-career-assistant" className="btn-primary mt-5">Ask Career AI <Bot className="h-4 w-4" /></Link>
        </article>
      </section>

      <section className="premium-card p-6">
        <h2 className="text-2xl font-black text-primaryText">Referral Status</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {referralStatuses.map((status) => (
            <div key={status} className="rounded-2xl border border-border bg-white/50 p-3 text-sm font-black text-soft-gray">
              <CheckCircle2 className="mb-2 h-4 w-4 text-neon-green" />
              {status}
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          {referrals.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-white/50 p-4">
              <p className="font-black text-primaryText">{item.companyName} - {item.opportunityTitle}</p>
              <p className="mt-1 text-sm text-soft-gray">{item.status} | Submitted by {item.fullName}</p>
            </div>
          ))}
          {referrals.length === 0 && <p className="text-soft-gray">No referral requests yet.</p>}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="premium-card p-6">
          <h2 className="text-2xl font-black text-primaryText">Skills To Improve</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Docker", "AWS", "System Design", "SQL Practice"].map((skill) => <span className="badge" key={skill}>{skill}</span>)}
          </div>
        </article>
        <article className="premium-card p-6">
          <h2 className="text-2xl font-black text-primaryText">Recommended Courses</h2>
          <div className="mt-4 grid gap-3">
            {courses.slice(0, 3).map((course) => <p key={course.id} className="text-sm font-bold text-soft-gray">{course.courseTitle} | {course.duration}</p>)}
          </div>
        </article>
      </section>
    </div>
  );
}
