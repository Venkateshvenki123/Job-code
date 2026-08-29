import { ArrowUpRight, Building2, MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { readTable } from "../data/store.js";

export default function Companies() {
  const companies = readTable("companies");
  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Companies"
        title="Hiring Companies"
        description="Explore companies, industries, locations, websites, and career links managed from the Admin Panel."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <article key={company.id} className="premium-card group p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl bg-primary/10 text-primary shadow-glow">
                {company.logo ? <img src={company.logo} alt={`${company.name} logo`} className="h-full w-full object-cover" /> : <Building2 className="h-6 w-6" />}
              </div>
              <span className="badge">{company.industry}</span>
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-primaryText">{company.name}</h2>
            <p className="mt-3 min-h-20 text-sm leading-6 text-secondaryText">{company.description}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-muted">
              <MapPin className="h-4 w-4 text-primary" />
              {company.location}
            </div>
            <div className="mt-6 flex gap-3">
              <a href={company.careersLink || "#"} className="btn-primary flex-1 justify-center">
                Careers <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={company.website || "#"} className="btn-secondary flex-1 justify-center">
                Website
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
