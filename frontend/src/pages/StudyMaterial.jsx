import { FileText } from "lucide-react";
import ContentCard from "../components/ContentCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { publicItems, readTable } from "../data/store.js";

export default function StudyMaterial() {
  const materials = publicItems(readTable("studyMaterials"));
  return (
    <div className="page-enter space-y-7">
      <PageHeader eyebrow="Study material" title="Study Material" description="Access curated notes, PDFs, tutorials, guides, interview preparation, coding resources, and technical references." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {materials.map((item) => <ContentCard key={item.id} title={item.title} meta={`${item.category} - ${item.type}`} description={item.description} action="View Material" icon={FileText} />)}
      </section>
      {!materials.length && <div className="premium-card p-8 text-soft-gray">No study material available yet.</div>}
    </div>
  );
}
