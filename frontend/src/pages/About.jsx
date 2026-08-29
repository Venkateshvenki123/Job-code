import { CheckCircle2, HelpCircle, Mail, Target, Users } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { readRecord, readTable } from "../data/store.js";

export default function About() {
  const home = readRecord("homeContent");
  const companies = readTable("companies");
  const courses = readTable("courses");
  const faqs = [
    "How do students discover verified opportunities?",
    "Can admins update jobs, courses, and resources without code?",
    "How are expired jobs and internships handled?",
    "How do companies get listed on the platform?"
  ];
  const values = [
    { title: "Company Overview", icon: Users, text: "A scalable career and learning platform connecting students, employers, and curated resources in one professional workspace." },
    { title: "Mission", icon: Target, text: home.mission },
    { title: "Vision", icon: CheckCircle2, text: home.vision },
    { title: "What We Offer", icon: HelpCircle, text: "Jobs, internships, courses, study material, certifications, companies, interview prep, and dynamic admin-managed content." }
  ];

  return (
    <div className="page-enter space-y-10">
      <PageHeader
        eyebrow="About us"
        title="A smarter bridge between learning and hiring."
        description="Built as a professional job portal where public content, opportunities, resources, and website sections are managed dynamically from the Admin Dashboard."
      />

      <section className="grid gap-5 lg:grid-cols-4">
        {values.map(({ title, icon: Icon, text }) => (
          <article key={title} className="premium-card p-6">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary shadow-glow">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-primaryText">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-secondaryText">{text}</p>
          </article>
        ))}
      </section>

      <section className="premium-card overflow-hidden p-0">
        <div className="grid lg:grid-cols-[.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-primary/20 via-surface to-background p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary">Why choose us</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-primaryText">Everything stays organized, current, and admin controlled.</h2>
            <p className="mt-4 leading-7 text-secondaryText">
              The platform is designed so the admin can add, publish, expire, and renew content without changing source code.
              Students get clean discovery, while teams get structured management.
            </p>
          </div>
          <div className="grid gap-4 p-8 sm:grid-cols-3">
            {[
              ["Companies", companies.length],
              ["Courses", courses.length],
              ["Admin modules", "10+"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-border bg-elevated p-5">
                <strong className="text-3xl text-primary">{value}</strong>
                <p className="mt-2 text-sm font-semibold text-secondaryText">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <article className="premium-card p-6">
          <Mail className="h-8 w-8 text-primary" />
          <h2 className="mt-4 text-2xl font-bold text-primaryText">Contact Information</h2>
          <p className="mt-3 text-secondaryText">Email: {home.contactEmail}</p>
          <p className="mt-2 text-secondaryText">Social: {home.socials}</p>
        </article>
        <article className="premium-card p-6">
          <h2 className="text-2xl font-bold text-primaryText">Frequently Asked Questions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq} className="rounded-2xl border border-border bg-elevated p-4 text-sm font-semibold text-secondaryText">
                {faq}
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
