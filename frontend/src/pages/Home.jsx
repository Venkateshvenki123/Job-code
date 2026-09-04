import { ArrowRight, Bot, BookOpen, BriefcaseBusiness, Building2, GraduationCap, Library, PlayCircle, Rocket, Search, Sparkles, Star, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { publicItems, readRecord, readTable } from "../data/store.js";

const companyNames = ["Google", "Microsoft", "Amazon", "TATA", "Infosys", "Zoho", "Accenture", "Wipro"];

const categories = [
  { title: "Find Jobs", text: "Discover verified roles with referral-ready opportunities.", icon: BriefcaseBusiness, path: "/jobs", tone: "from-violet-500/18 to-indigo-500/10" },
  { title: "Find Internships", text: "Launch with remote, hybrid, paid, and fresher-friendly internships.", icon: GraduationCap, path: "/internships", tone: "from-emerald-400/18 to-sky-400/10" },
  { title: "Learn Skills", text: "Follow premium learning paths and job-focused courses.", icon: PlayCircle, path: "/courses", tone: "from-orange-400/20 to-amber-300/10" },
  { title: "Find Resources", text: "Use study material, certifications, and interview prep.", icon: Library, path: "/learning-platforms", tone: "from-sky-400/18 to-indigo-400/10" },
  { title: "Explore Startups", text: "Find tomorrow's companies and request referrals.", icon: Rocket, path: "/startups", tone: "from-pink-400/20 to-violet-500/10" }
];

function StatStrip({ stats }) {
  return (
    <section className="glass rounded-[2rem] p-4">
      <div className="grid gap-2 md:grid-cols-5">
        {stats.map(([label, value], index) => (
          <div key={label} className="group flex items-center gap-4 rounded-3xl p-4 transition hover:bg-white/60">
            <span className="icon-3d h-12 w-12 text-neon-green"><Sparkles className="h-5 w-5 transition group-hover:-translate-y-1" /></span>
            <div>
              <strong className="text-3xl font-black text-primaryText">{value}</strong>
              <p className="text-sm font-bold text-soft-gray">{label}</p>
            </div>
            {index < stats.length - 1 && <span className="ml-auto hidden h-12 w-px bg-border md:block" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto min-h-[500px] w-full max-w-[520px]">
      <div className="floating-object absolute left-8 top-12 h-16 w-16 rotate-12 text-neon-green"><Rocket className="h-7 w-7" /></div>
      <div className="floating-object absolute right-8 top-20 h-14 w-14 -rotate-12 text-neon-purple"><Star className="h-6 w-6" /></div>
      <div className="floating-object absolute bottom-24 left-2 h-14 w-14 rotate-6 text-neon-cyan"><BookOpen className="h-6 w-6" /></div>
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-300/45 via-sky-200/35 to-pink-200/40 blur-2xl" />
      <div className="absolute left-1/2 top-28 h-72 w-64 -translate-x-1/2 rounded-[45%_45%_34%_34%] bg-gradient-to-br from-white to-violet-100 shadow-[0_34px_80px_rgba(76,29,149,.18)]" />
      <div className="absolute left-1/2 top-20 h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 shadow-2xl" />
      <div className="absolute left-[42%] top-44 h-32 w-44 -translate-x-1/2 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl" />
      <div className="absolute left-[57%] top-48 h-28 w-40 -translate-x-1/2 rounded-[2rem] bg-gradient-to-br from-violet-400 to-pink-400 shadow-2xl" />
      <div className="absolute bottom-28 left-1/2 h-28 w-72 -translate-x-1/2 rounded-[2rem] bg-gradient-to-br from-slate-800 to-indigo-950 p-4 shadow-[0_28px_70px_rgba(15,23,42,.28)]">
        <div className="h-full rounded-2xl bg-gradient-to-br from-sky-200 to-violet-200 p-3">
          <div className="h-3 w-24 rounded-full bg-white/80" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <span className="h-12 rounded-xl bg-white/70" />
            <span className="h-12 rounded-xl bg-violet-400/30" />
            <span className="h-12 rounded-xl bg-pink-400/30" />
          </div>
        </div>
      </div>
      <div className="floating-card glass absolute bottom-10 right-4 w-56 rounded-3xl p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-neon-green">Recommended Job</p>
        <h3 className="mt-2 font-black">Frontend Developer</h3>
        <p className="text-sm text-soft-gray">82% Match</p>
        <div className="mt-3 h-2 rounded-full bg-violet-100"><div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-neon-green to-neon-purple" /></div>
      </div>
      <div className="floating-card glass absolute left-0 top-72 w-52 rounded-3xl p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-neon-cyan">Skills Improving</p>
        <p className="mt-2 text-sm font-bold">JavaScript · React · SQL</p>
        <div className="mt-3 h-2 rounded-full bg-sky-100"><div className="h-2 w-[70%] rounded-full bg-neon-cyan" /></div>
      </div>
      <div className="floating-card glass absolute right-2 top-48 w-48 rounded-3xl p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-neon-purple">Interview Prep</p>
        <h3 className="mt-2 font-black">15 Sets Available</h3>
        <Link to="/interview-questions" className="mt-2 inline-flex text-sm font-black text-neon-green">Practice Now</Link>
      </div>
    </div>
  );
}

export default function Home() {
  const home = readRecord("homeContent");
  const jobs = publicItems(readTable("jobs"));
  const internships = publicItems(readTable("internships"));
  const courses = publicItems(readTable("courses"));
  const startups = publicItems(readTable("startups"));
  const stats = [
    ["Jobs Available", `${jobs.length}K+`],
    ["Internships", `${internships.length}K+`],
    ["Courses", `${courses.length}K+`],
    ["Companies", `${readTable("companies").length + startups.length}K+`],
    ["Active Users", `${readTable("users").length}K+`]
  ];
  const featured = { Jobs: jobs, Internships: internships, Courses: courses };

  return (
    <div className="page-enter space-y-16">
      <section className="grid items-center gap-8 py-6 xl:grid-cols-[1fr_1.05fr_.82fr] xl:py-12">
        <div>
          <span className="badge mb-5"><Sparkles className="h-4 w-4" /> AI-powered career ecosystem</span>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-primaryText sm:text-6xl lg:text-7xl">
            Explore Opportunities.<br />Learn Skills.<br /><span className="gradient-text">Build Your Future.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-soft-gray">Discover jobs, internships, courses, startup companies and learning resources designed to help you grow your career.</p>
          <label className="glass mt-8 flex max-w-2xl items-center gap-3 rounded-full p-2">
            <Search className="ml-3 h-5 w-5 text-neon-green" />
            <input className="min-w-0 flex-1 bg-transparent px-2 py-3 text-primaryText outline-none" placeholder="What are you looking for?" />
            <Link to="/jobs" className="btn-primary">Search <ArrowRight className="h-4 w-4" /></Link>
          </label>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/jobs" className="btn-primary">Explore Opportunities <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/courses" className="btn-secondary">Explore Courses</Link>
          </div>
        </div>

        <HeroIllustration />

        <aside className="space-y-5">
          <article className="glass rounded-[2rem] p-5">
            <h2 className="text-xl font-black text-primaryText">Top Companies Hiring</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {companyNames.slice(0, 6).map((name) => <div key={name} className="rounded-2xl bg-white/60 p-3 text-center text-sm font-black text-soft-gray shadow-sm transition hover:scale-[1.03] hover:text-neon-green">{name}</div>)}
            </div>
          </article>
          <article className="glass rounded-[2rem] p-5">
            <h2 className="text-xl font-black text-primaryText">Featured Opportunities</h2>
            <div className="mt-4 grid gap-3">
              {Object.entries(featured).flatMap(([type, items]) => items.slice(0, 1).map((item) => (
                <div key={`${type}-${item.id}`} className="rounded-2xl bg-white/60 p-4">
                  <span className="badge">{type}</span>
                  <p className="mt-2 font-black text-primaryText">{item.jobTitle || item.role || item.courseTitle}</p>
                  <p className="text-sm text-soft-gray">{item.companyName || item.company || item.instructor}</p>
                </div>
              )))}
            </div>
          </article>
        </aside>
      </section>

      <StatStrip stats={stats} />

      <section>
        <div className="mb-7 text-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-neon-green">Explore by category</p>
          <h2 className="mt-3 text-4xl font-black text-primaryText">Everything you need to build your career.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {categories.map(({ title, text, icon: Icon, path, tone }) => (
            <Link to={path} key={title} className={`perspective-card min-h-72 overflow-hidden bg-gradient-to-br ${tone} p-6`}>
              <span className="icon-3d h-16 w-16 text-neon-green"><Icon className="h-8 w-8" /></span>
              <h3 className="mt-8 text-2xl font-black text-primaryText">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-soft-gray">{text}</p>
              <ArrowRight className="mt-6 h-5 w-5 text-neon-green" />
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-violet-700 via-indigo-700 to-slate-950 p-8 text-white shadow-2xl lg:p-12">
        <div className="absolute right-10 top-8 h-44 w-44 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute bottom-6 right-20 h-20 w-20 rounded-full border border-white/20" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-black"><Bot className="h-4 w-4" /> AI Career Assistant</span>
            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight lg:text-5xl">Get personalized career guidance, job recommendations, skill suggestions and interview preparation.</h2>
            <Link to="/ai-career-assistant" className="mt-7 inline-flex rounded-full bg-white px-5 py-3 font-black text-violet-700 shadow-xl transition hover:-translate-y-1">Ask Career AI <Sparkles className="ml-2 h-4 w-4" /></Link>
          </div>
          <div className="icon-3d mx-auto h-56 w-56 rounded-[3rem] bg-gradient-to-br from-white to-violet-100 text-neon-green"><Bot className="h-24 w-24" /></div>
        </div>
      </section>

      <section className="text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-soft-gray">Trusted by leading companies</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {companyNames.map((name) => <span key={name} className="rounded-2xl border border-white/70 bg-white/50 px-5 py-3 font-black text-slate-400 shadow-sm grayscale transition hover:scale-105 hover:text-neon-green hover:grayscale-0">{name}</span>)}
        </div>
      </section>

      <section className="glass rounded-[2rem] p-8 text-center">
        <h2 className="text-4xl font-black text-primaryText">Ready to move your career forward?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-soft-gray">{home.description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3"><Link to="/jobs" className="btn-primary">Find Jobs</Link><Link to="/startups" className="btn-secondary">Explore Startups</Link><Link to="/courses" className="btn-secondary">Start Learning</Link></div>
      </section>
    </div>
  );
}
