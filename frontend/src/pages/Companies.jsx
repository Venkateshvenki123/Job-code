import PageHeader from "../components/PageHeader.jsx";
import ContentCard from "../components/ContentCard.jsx";
import { readTable } from "../data/store.js";

export default function Companies() {
  const companies = readTable("companies");
  return <div className="page-enter space-y-7"><PageHeader eyebrow="Companies" title="Hiring Companies" description="Explore companies, industries, locations, websites, and career links managed from the Admin Panel." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{companies.map((company) => <ContentCard key={company.id} title={company.name} meta={`${company.industry} - ${company.location}`} description={company.description} action="Visit Careers" />)}</div></div>;
}