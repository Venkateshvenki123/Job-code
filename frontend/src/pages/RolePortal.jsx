import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { pipelineStages } from "../data/siteData.js";
import { readTable } from "../data/store.js";

const portalMeta = {
  "super-admin": { title: "Super Admin Portal", description: "Control roles, permissions, companies, content approval, website settings, reports, and audit activity across the recruitment ecosystem." },
  admin: { title: "Admin Recruitment Dashboard", description: "Manage jobs, internships, applications, pipeline assignments, interviews, publishing status, and complete recruitment reports." },
  hr: { title: "HR Portal", description: "View assigned openings, shortlist applicants, schedule interviews, move candidates through stages, and sync updates with Admin." },
  manager: { title: "Hiring Manager Portal", description: "Review candidate profiles, add interview comments, rate candidates, and recommend final hiring decisions." },
  candidate: { title: "Candidate Portal", description: "Track applications, saved jobs, interview schedules, resources, question submissions, and interview experiences." }
};

function Metric({ label, value }) {
  return <div className="glass rounded-2xl p-5"><strong className="text-3xl text-neon-green">{value}</strong><p className="text-sm font-bold text-soft-gray">{label}</p></div>;
}

export default function RolePortal() {
  const { role = "candidate" } = useParams();
  const meta = portalMeta[role] || portalMeta.candidate;
  const jobs = readTable("jobs");
  const applications = readTable("applications");
  const notifications = readTable("notifications");
  const questions = readTable("interviewQuestions");
  const experiences = readTable("interviewExperiences");
  const roleLabel = role.replace("-", " ");

  return (
    <div className="page-enter space-y-6">
      <PageHeader eyebrow="Role workspace" title={meta.title} description={meta.description} />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Open Jobs" value={jobs.filter((job) => job.status !== "Closed").length} />
        <Metric label="Applications" value={applications.length} />
        <Metric label="Pending Content" value={[...questions, ...experiences].filter((item) => item.status === "Pending").length} />
        <Metric label="Notifications" value={notifications.length} />
      </section>
      <section className="glass rounded-3xl p-5">
        <h2 className="text-2xl font-black capitalize">{roleLabel} Permissions</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {["Manage assigned work", "Review synchronized data", "Update recruitment workflow", "Export reports", "Receive notifications", "Audit important changes"].map((item) => <div className="rounded-2xl border border-white/10 bg-white/5 p-4 font-bold text-soft-gray" key={item}>{item}</div>)}
        </div>
      </section>
      <section className="glass rounded-3xl p-5">
        <h2 className="text-2xl font-black">Recruitment Pipeline</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {pipelineStages.map((stage) => <div className="min-h-32 rounded-2xl border border-white/10 bg-white/5 p-4" key={stage}><h3 className="font-black text-neon-cyan">{stage}</h3>{applications.filter((app) => app.stage === stage).map((app) => <p className="mt-3 rounded-xl bg-black/20 p-3 text-sm text-soft-gray" key={app.id}>{app.candidateName} - {app.jobTitle}</p>)}</div>)}
        </div>
      </section>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">Assigned Applications</h2>{applications.map((app) => <p className="mt-3 text-soft-gray" key={app.id}>{app.candidateName} - {app.stage} - {app.interviewDate}</p>)}</div>
        <div className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">Notifications</h2>{notifications.map((note) => <p className="mt-3 text-soft-gray" key={note.id}>{note.title}: {note.message}</p>)}</div>
      </section>
    </div>
  );
}
