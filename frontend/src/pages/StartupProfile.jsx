import { ArrowUpRight, Briefcase, Building2, Gift, GraduationCap, MapPin, Users } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function StartupProfile() {
  const { startupId } = useParams();
  const startup = publicItems(readTable("startups")).find((item) => item.id === startupId);
  const jobs = publicItems(readTable("jobs")).filter((job) => job.startupId === startupId);
  const internships = publicItems(readTable("internships")).filter((item) => item.startupId === startupId);
  const experiences = publicItems(readTable("interviewExperiences").map((item) => ({ ...item, published: item.status === "Published" }))).filter((item) => item.companyName === startup?.name);

  if (!startup) return <Navigate to="/startups" replace />;

  return (
    <div className="page-enter space-y-8">
      <PageHeader eyebrow="Startup profile" title={startup.name} description={startup.tagline} />

      <section className="premium-card overflow-hidden p-0">
        <div className="grid gap-6 bg-gradient-to-br from-primary/15 via-transparent to-background p-6 lg:grid-cols-[1fr_320px] lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid h-16 w-16 place-items-center rounded-3xl bg-primary/10 text-primary shadow-glow">
                {startup.logo ? <img src={startup.logo} alt={`${startup.name} logo`} className="h-full w-full rounded-3xl object-cover" /> : <Building2 className="h-8 w-8" />}
              </span>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-primaryText">{startup.name}</h1>
                <p className="mt-1 text-secondaryText">{startup.industry} | {startup.headquarters} | {startup.companySize}</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl leading-7 text-secondaryText">{startup.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[startup.industry, startup.stage, startup.fundingStage, startup.remoteAvailability].map((item) => <span className="badge" key={item}>{item}</span>)}
            </div>
          </div>
          <aside className="rounded-3xl border border-border bg-elevated p-5">
            <p className="flex items-center gap-2 text-sm text-secondaryText"><MapPin className="h-4 w-4 text-primary" /> {startup.workLocations}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-secondaryText"><Users className="h-4 w-4 text-primary" /> Founded {startup.foundedYear} by {startup.founders}</p>
            <p className="mt-3 text-sm text-secondaryText">Last updated: {startup.lastUpdatedDate}</p>
            <div className="mt-6 grid gap-3">
              <Link to={`/referrals/new?startupId=${startup.id}`} className="btn-primary justify-center">Request Referral</Link>
              <a href={startup.careersPage} className="btn-secondary justify-center">Careers Page <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          ["Company Culture", startup.cultureInformation],
          ["Tech Stack", startup.technologiesUsed],
          ["Benefits", startup.benefits]
        ].map(([title, text]) => (
          <article key={title} className="premium-card p-6">
            <h2 className="text-xl font-bold text-primaryText">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-secondaryText">{text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="premium-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primaryText"><Briefcase className="h-6 w-6 text-primary" /> Open Jobs</h2>
          <div className="mt-5 grid gap-3">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-2xl border border-border bg-elevated p-4">
                <p className="font-bold text-primaryText">{job.jobTitle}</p>
                <p className="mt-1 text-sm text-secondaryText">{job.location} | {job.experience} | {job.salary}</p>
                <Link to={`/referrals/new?startupId=${startup.id}&jobId=${job.id}`} className="mt-3 inline-flex text-sm font-bold text-primary">Request referral</Link>
              </div>
            ))}
            {jobs.length === 0 && <p className="text-secondaryText">No open jobs listed right now.</p>}
          </div>
        </article>
        <article className="premium-card p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-primaryText"><GraduationCap className="h-6 w-6 text-primary" /> Open Internships</h2>
          <div className="mt-5 grid gap-3">
            {internships.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-elevated p-4">
                <p className="font-bold text-primaryText">{item.role}</p>
                <p className="mt-1 text-sm text-secondaryText">{item.location} | {item.duration} | {item.stipend}</p>
                <Link to={`/referrals/new?startupId=${startup.id}&internshipId=${item.id}`} className="mt-3 inline-flex text-sm font-bold text-primary">Request referral</Link>
              </div>
            ))}
            {internships.length === 0 && <p className="text-secondaryText">No open internships listed right now.</p>}
          </div>
        </article>
      </section>

      <section className="premium-card p-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-primaryText"><Gift className="h-6 w-6 text-primary" /> Referral Opportunities</h2>
        <p className="mt-3 leading-7 text-secondaryText">
          {startup.referralAvailability ? "Referral requests are open for this startup. Candidate details are visible only to authorized admin, HR, and assigned referrers." : "Referral requests are currently closed for this startup."}
        </p>
      </section>

      <section className="premium-card p-6">
        <h2 className="text-2xl font-bold text-primaryText">Related Interview Experiences</h2>
        <div className="mt-5 grid gap-3">
          {experiences.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border bg-elevated p-4">
              <p className="font-bold text-primaryText">{item.jobRole}</p>
              <p className="mt-2 text-sm leading-6 text-secondaryText">{item.overallExperience}</p>
            </div>
          ))}
          {experiences.length === 0 && <p className="text-secondaryText">No related interview experiences yet.</p>}
        </div>
      </section>
    </div>
  );
}
