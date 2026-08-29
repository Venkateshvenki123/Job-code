import { ShieldCheck } from "lucide-react";
import ContentCard from "../components/ContentCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function Certifications() {
  const certifications = publicItems(readTable("certifications"));
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Career credentials" title="Certification" description="Explore industry-recognized certifications with providers, cost, duration, difficulty, and preparation material." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((item) => <ContentCard key={item.id} title={item.name} meta={`${item.provider} - ${item.difficulty}`} description={`${item.category} certification. Cost: ${item.cost}. Duration: ${item.duration}. Prep: ${item.preparationMaterial}`} action="Official Link" icon={ShieldCheck} />)}
      </section>
      {!certifications.length && <div className="premium-card p-8 text-soft-gray">No certifications available yet.</div>}
    </div>
  );
}
