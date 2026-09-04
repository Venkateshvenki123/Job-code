import { useMemo, useState } from "react";
import { ArrowRight, Bot, Building2, MapPin, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { startupCategories } from "../data/siteData.js";
import { publicItems, readTable } from "../data/store.js";

function parseAiQuery(query) {
  const lower = query.toLowerCase();
  return {
    industry: startupCategories.find((item) => lower.includes(item.toLowerCase())) || "",
    remote: lower.includes("remote") ? "Remote" : "",
    location: ["bengaluru", "hyderabad", "remote", "pune"].find((item) => lower.includes(item)) || "",
    skills: ["react", "java", "python", "sql", "aws", "node", "kubernetes"].filter((skill) => lower.includes(skill))
  };
}

export default function Startups() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState("");
  const [remote, setRemote] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const startups = publicItems(readTable("startups"));
  const jobs = publicItems(readTable("jobs"));
  const internships = publicItems(readTable("internships"));
  const parsed = parseAiQuery(aiQuery);
  const effectiveIndustry = industry || parsed.industry;
  const effectiveLocation = location || parsed.location;
  const effectiveRemote = remote || parsed.remote;
  const effectiveSkills = parsed.skills.join(" ");
  const stages = [...new Set(startups.map((item) => item.stage).filter(Boolean))];
  const locations = [...new Set(startups.flatMap((item) => item.workLocations.split(",").map((part) => part.trim())).filter(Boolean))];

  const filtered = useMemo(
    () =>
      startups.filter((startup) => {
        const startupJobs = jobs.filter((job) => job.startupId === startup.id);
        const startupInternships = internships.filter((item) => item.startupId === startup.id);
        const searchable = [startup.name, startup.industry, startup.technologiesUsed, startup.workLocations, startup.description, startupJobs.map((job) => job.jobTitle).join(" "), startupJobs.map((job) => job.skillsRequired).join(" "), startupInternships.map((item) => item.role).join(" "), startupInternships.map((item) => item.skills).join(" ")].join(" ").toLowerCase();
        return (
          searchable.includes(query.toLowerCase()) &&
          searchable.includes(effectiveSkills.toLowerCase()) &&
          (!effectiveIndustry || startup.industry === effectiveIndustry) &&
          (!effectiveLocation || startup.workLocations.toLowerCase().includes(effectiveLocation.toLowerCase())) &&
          (!stage || startup.stage === stage) &&
          (!effectiveRemote || startup.remoteAvailability === effectiveRemote)
        );
      }),
    [startups, jobs, internships, query, effectiveIndustry, effectiveLocation, effectiveRemote, effectiveSkills, stage]
  );

  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Startup directory"
        title="Discover startups, roles, internships, and referrals."
        description="Search verified startup profiles connected to jobs, internships, interview experiences, and referral requests."
      />

      <section className="premium-card grid gap-4 p-4 xl:grid-cols-[1fr_1fr]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search startup, skill, role, technology, or city" className="field w-full pl-12" />
        </label>
        <label className="relative">
          <Bot className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          <input value={aiQuery} onChange={(event) => setAiQuery(event.target.value)} placeholder="AI search: early-stage SaaS startups hiring Java developers" className="field w-full pl-12" />
        </label>
        <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="field">
          <option value="">All industries</option>
          {startupCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={location} onChange={(event) => setLocation(event.target.value)} className="field">
          <option value="">All locations</option>
          {locations.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={stage} onChange={(event) => setStage(event.target.value)} className="field">
          <option value="">All stages</option>
          {stages.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={remote} onChange={(event) => setRemote(event.target.value)} className="field">
          <option value="">Any work mode</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>Onsite</option>
        </select>
      </section>

      {aiQuery && (
        <section className="rounded-3xl border border-primary/25 bg-primary/10 p-5 text-sm leading-6 text-secondaryText">
          <strong className="text-primaryText">AI intent extraction:</strong> {parsed.industry || "any industry"}, {parsed.location || "any location"}, {parsed.remote || "any mode"}, skills: {parsed.skills.join(", ") || "any skill"}.
          Results below are filtered from actual platform data only.
        </section>
      )}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((startup) => {
          const openJobs = jobs.filter((job) => job.startupId === startup.id);
          const openInternships = internships.filter((item) => item.startupId === startup.id);
          return (
            <article key={startup.id} className="premium-card group flex min-h-[360px] flex-col justify-between p-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary shadow-glow">
                    {startup.logo ? <img src={startup.logo} alt={`${startup.name} logo`} className="h-full w-full rounded-2xl object-cover" /> : <Building2 className="h-6 w-6" />}
                  </span>
                  <span className="badge">{startup.hiringStatus}</span>
                </div>
                <h2 className="mt-6 text-2xl font-bold text-primaryText">{startup.name}</h2>
                <p className="mt-2 text-sm font-semibold text-primary">{startup.tagline}</p>
                <p className="mt-4 text-sm leading-6 text-secondaryText">{startup.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {[startup.industry, startup.stage, startup.companySize].map((item) => <span className="badge" key={item}>{item}</span>)}
                </div>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin className="h-4 w-4 text-primary" />{startup.workLocations}</p>
                <p className="mt-3 text-sm text-secondaryText">{openJobs.length} jobs · {openInternships.length} internships · {startup.referralAvailability ? "Referrals open" : "Referrals closed"}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to={`/startups/${startup.id}`} className="btn-primary flex-1 justify-center">View Company <ArrowRight className="h-4 w-4" /></Link>
                <Link to={`/referrals/new?startupId=${startup.id}`} className="btn-secondary flex-1 justify-center">Request Referral</Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="premium-card p-6">
        <div className="flex items-start gap-4">
          <Sparkles className="mt-1 h-6 w-6 text-primary" />
          <p className="leading-7 text-secondaryText">
            AI search converts your natural-language query into structured filters, then retrieves only real startup, job, and internship records from the platform data. It does not invent companies or openings.
          </p>
        </div>
      </section>
    </div>
  );
}
