import { ExternalLink, GraduationCap } from "lucide-react";
import ContentCard from "../components/ContentCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function LearningPlatforms() {
  const platforms = publicItems(readTable("learningPlatforms"));
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Resource library" title="Learning Platform" description="Discover trusted platforms for structured learning, skill-building, guided projects, and career-ready certificates." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {platforms.map((item) => <ContentCard key={item.id} title={item.name} meta={item.category} description={`${item.description} Skills: ${item.skillsOffered}`} action="Visit Platform" icon={GraduationCap} />)}
      </section>
      {!platforms.length && <div className="premium-card p-8 text-soft-gray">No learning platforms available yet.</div>}
    </div>
  );
}
