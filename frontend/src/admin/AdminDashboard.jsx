import { useState } from "react";
import { BarChart3, Clock, Database, Edit3, Eye, Plus, RefreshCw, Star, Trash2 } from "lucide-react";
import { defaultHomeContent } from "../data/siteData.js";
import { createItem, deleteItem, isExpired, readRecord, readTable, updateItem, writeRecord } from "../data/store.js";

const configs = {
  jobs: {
    title: "Jobs",
    singular: "Job",
    fields: ["companyLogo", "companyName", "jobTitle", "location", "workMode", "salary", "experience", "employmentType", "skillsRequired", "jobDescription", "responsibilities", "qualifications", "applicationLink", "lastDate", "expiryDate", "category", "status"],
    toggles: ["published", "featured"]
  },
  internships: {
    title: "Internships",
    singular: "Internship",
    fields: ["company", "role", "duration", "stipend", "location", "mode", "eligibility", "skills", "applyLink", "lastDate", "expiryDate"],
    toggles: ["published", "featured"]
  },
  courses: {
    title: "Courses",
    singular: "Course",
    fields: ["courseImage", "courseTitle", "instructor", "duration", "level", "category", "price", "description", "learningOutcomes", "enrollLink", "expiryDate"],
    toggles: ["published", "featured"]
  },
  resources: {
    title: "Resources",
    singular: "Resource",
    fields: ["title", "category", "pdfUpload", "videoLink", "externalLink", "description", "thumbnail"],
    toggles: ["published", "featured"]
  },
  learningPlatforms: {
    title: "Learning Platforms",
    singular: "Platform",
    fields: ["name", "description", "skillsOffered", "website", "category"],
    toggles: ["published", "featured"]
  },
  studyMaterials: {
    title: "Study Materials",
    singular: "Material",
    fields: ["title", "category", "type", "description", "link"],
    toggles: ["published", "featured"]
  },
  certifications: {
    title: "Certifications",
    singular: "Certification",
    fields: ["name", "provider", "category", "difficulty", "cost", "duration", "officialLink", "preparationMaterial"],
    toggles: ["published", "featured"]
  },
  startups: {
    title: "Startups",
    singular: "Startup",
    fields: ["logo", "name", "tagline", "industry", "stage", "fundingStage", "foundedYear", "founders", "headquarters", "workLocations", "remoteAvailability", "companySize", "website", "linkedInUrl", "careersPage", "description", "technologiesUsed", "fundingInformation", "benefits", "cultureInformation", "hiringStatus", "lastUpdatedDate"],
    toggles: ["referralAvailability", "published", "featured"]
  },
  referralRequests: {
    title: "Referral Management",
    singular: "Referral",
    fields: ["startupId", "companyName", "jobId", "internshipId", "opportunityTitle", "fullName", "email", "phone", "linkedInProfile", "portfolioGithub", "resumeUpload", "currentLocation", "experience", "currentRole", "skills", "suitability", "additionalMessage", "status", "assignedHr", "assignedReferrer", "notes"],
    toggles: []
  },
  aiSearchHistory: {
    title: "AI Search History",
    singular: "AI Search",
    fields: ["query", "extractedIntent"],
    toggles: []
  },
  aiRecommendations: {
    title: "AI Recommendations",
    singular: "Recommendation",
    fields: ["candidateId", "type", "entityId", "score", "matchingSkills", "missingSkills", "recommendation"],
    toggles: []
  },
  companies: {
    title: "Companies",
    singular: "Company",
    fields: ["logo", "name", "description", "website", "careersLink", "industry", "location"],
    toggles: []
  },
  applications: {
    title: "Applications",
    singular: "Application",
    fields: ["candidateName", "candidateEmail", "jobTitle", "companyName", "resumeUrl", "stage", "score", "assignedHr", "hiringManager", "interviewDate", "notes"],
    toggles: []
  },
  interviewQuestions: {
    title: "Interview Questions",
    singular: "Question",
    fields: ["company", "role", "technology", "experienceLevel", "department", "question", "answer", "difficulty", "tags", "interviewRound", "askedDate", "notes", "status", "submittedBy"],
    toggles: []
  },
  interviewExperiences: {
    title: "Interview Experiences",
    singular: "Experience",
    fields: ["companyName", "jobRole", "experienceLevel", "interviewDate", "location", "interviewMode", "rounds", "questionsAsked", "codingQuestions", "hrQuestions", "technicalQuestions", "overallExperience", "difficultyRating", "tips", "selectionResult", "status"],
    toggles: ["featured"]
  },
  notifications: {
    title: "Notifications",
    singular: "Notification",
    fields: ["title", "message", "audience", "status"],
    toggles: []
  }
};

const labels = {
  jobs: "jobTitle",
  internships: "role",
  courses: "courseTitle",
  resources: "title",
  learningPlatforms: "name",
  studyMaterials: "title",
  certifications: "name",
  startups: "name",
  referralRequests: "fullName",
  aiSearchHistory: "query",
  aiRecommendations: "type",
  companies: "name",
  applications: "candidateName",
  interviewQuestions: "question",
  interviewExperiences: "companyName",
  notifications: "title"
};

const multilineFields = new Set([
  "description",
  "jobDescription",
  "responsibilities",
  "qualifications",
  "learningOutcomes",
  "eligibility",
  "questionsAsked",
  "codingQuestions",
  "hrQuestions",
  "technicalQuestions",
  "overallExperience",
  "tips",
  "notes",
  "message",
  "preparationMaterial",
  "cultureInformation",
  "technologiesUsed",
  "fundingInformation",
  "benefits",
  "suitability",
  "additionalMessage",
  "recommendation",
  "extractedIntent"
]);

function fieldLabel(field) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function blankFor(config) {
  return Object.fromEntries([...config.fields, ...(config.toggles || [])].map((field) => [field, config.toggles?.includes(field) ? true : ""]));
}

function MetricCard({ icon: Icon, label, value, tone = "primary" }) {
  const toneClass = tone === "danger" ? "bg-red-500/10 text-red-300" : tone === "gold" ? "bg-amber-400/10 text-amber-300" : "bg-primary/10 text-primary";
  return (
    <article className="premium-card p-5">
      <div className="flex items-center justify-between gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${toneClass}`}>
          <Icon className="h-5 w-5" />
        </span>
        <strong className="text-3xl font-bold text-primaryText">{value}</strong>
      </div>
      <p className="mt-4 text-sm font-semibold text-secondaryText">{label}</p>
    </article>
  );
}

function CrudManager({ name, refresh }) {
  const config = configs[name];
  const [items, setItems] = useState(() => readTable(name));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(() => blankFor(config));

  const reset = () => {
    setEditing(null);
    setForm(blankFor(config));
    setItems(readTable(name));
    refresh();
  };

  const save = (event) => {
    event.preventDefault();
    if (editing) updateItem(name, editing, form);
    else createItem(name, form);
    reset();
  };

  const edit = (item) => {
    setEditing(item.id);
    setForm({ ...blankFor(config), ...item });
  };

  const remove = (id) => {
    if (confirm(`Delete this ${config.singular.toLowerCase()}?`)) {
      deleteItem(name, id);
      reset();
    }
  };

  const toggle = (item, field) => {
    updateItem(name, item.id, { [field]: !item[field] });
    reset();
  };

  const renew = (item) => {
    updateItem(name, item.id, { expiryDate: "2026-12-31" });
    reset();
  };

  return (
    <section className="premium-card scroll-mt-24 p-5" id={`manage-${name}`}>
      <div className="mb-5 flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Content manager</p>
          <h2 className="mt-2 text-2xl font-bold text-primaryText">Manage {config.title}</h2>
        </div>
        <span className="badge">{items.length} records</span>
      </div>

      <form onSubmit={save} className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {config.fields.map((field) => (
          <label className={multilineFields.has(field) ? "grid gap-2 text-sm font-bold text-secondaryText md:col-span-2 xl:col-span-3" : "grid gap-2 text-sm font-bold text-secondaryText"} key={field}>
            {fieldLabel(field)}
            {multilineFields.has(field) ? (
              <textarea value={form[field] || ""} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field min-h-24 resize-none" />
            ) : (
              <input value={form[field] || ""} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field" />
            )}
          </label>
        ))}
        <div className="flex flex-wrap items-center gap-4 md:col-span-2 xl:col-span-3">
          {config.toggles.map((field) => (
            <label className="inline-flex items-center gap-2 rounded-2xl border border-border bg-elevated px-4 py-3 text-sm font-bold text-secondaryText" key={field}>
              <input type="checkbox" checked={Boolean(form[field])} onChange={(event) => setForm({ ...form, [field]: event.target.checked })} />
              {fieldLabel(field)}
            </label>
          ))}
          <button className="btn-primary">
            <Plus className="h-4 w-4" />
            {editing ? "Update" : "Add"} {config.singular}
          </button>
          {editing && (
            <button type="button" onClick={reset} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[840px] text-left text-sm">
          <thead className="bg-elevated text-xs uppercase tracking-[0.16em] text-muted">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Expiry</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr className="border-t border-border" key={item.id}>
                <td className="max-w-md p-4 font-bold text-primaryText">{item[labels[name]] || "Untitled"}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className={isExpired(item) ? "badge border-red-400/30 bg-red-500/10 text-red-300" : "badge"}>
                      {isExpired(item) ? "Expired" : item.published === false ? "Draft" : item.status || "Published"}
                    </span>
                    {item.featured && <span className="badge border-amber-300/30 bg-amber-400/10 text-amber-300">Featured</span>}
                  </div>
                </td>
                <td className="p-4 text-secondaryText">{item.expiryDate || "-"}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => edit(item)} className="btn-secondary px-3 py-2">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>
                    <button type="button" onClick={() => remove(item.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm font-bold text-red-300">
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                    {config.toggles.includes("published") && (
                      <button type="button" onClick={() => toggle(item, "published")} className="btn-secondary px-3 py-2">
                        <Eye className="h-4 w-4" /> {item.published === false ? "Publish" : "Unpublish"}
                      </button>
                    )}
                    {config.toggles.includes("featured") && (
                      <button type="button" onClick={() => toggle(item, "featured")} className="btn-secondary px-3 py-2">
                        <Star className="h-4 w-4" /> {item.featured ? "Unfeature" : "Feature"}
                      </button>
                    )}
                    {isExpired(item) && (
                      <button type="button" onClick={() => renew(item)} className="btn-secondary px-3 py-2">
                        <RefreshCw className="h-4 w-4" /> Renew
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function HomeContentManager({ refresh }) {
  const [home, setHome] = useState(() => readRecord("homeContent"));
  const save = () => {
    writeRecord("homeContent", home);
    refresh();
    alert("Home content saved");
  };

  return (
    <section className="premium-card p-5">
      <div className="mb-5 border-b border-border pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Website settings</p>
        <h2 className="mt-2 text-2xl font-bold text-primaryText">Home Page Content</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.keys(defaultHomeContent).map((field) => (
          <label className="grid gap-2 text-sm font-bold text-secondaryText" key={field}>
            {fieldLabel(field)}
            <textarea value={home[field] || ""} onChange={(event) => setHome({ ...home, [field]: event.target.value })} className="field min-h-24 resize-none" />
          </label>
        ))}
      </div>
      <button onClick={save} className="btn-primary mt-5">
        Save Home Content
      </button>
    </section>
  );
}

export default function AdminDashboard() {
  const [, setVersion] = useState(0);
  const refresh = () => setVersion((value) => value + 1);
  const jobs = readTable("jobs");
  const internships = readTable("internships");
  const courses = readTable("courses");
  const resources = readTable("resources");
  const companies = readTable("companies");
  const users = readTable("users");
  const applications = readTable("applications");
  const questions = readTable("interviewQuestions");
  const experiences = readTable("interviewExperiences");
  const recent = [...jobs, ...internships, ...courses, ...resources].slice(0, 6);
  const viewed = [...jobs].sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0)).slice(0, 4);

  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: Database },
    { label: "Total Internships", value: internships.length, icon: Database },
    { label: "Total Courses", value: courses.length, icon: Database },
    { label: "Total Resources", value: resources.length, icon: Database },
    { label: "Total Companies", value: companies.length, icon: Database },
    { label: "Total Users", value: users.length, icon: Database },
    { label: "Expired Jobs", value: jobs.filter(isExpired).length, icon: Clock, tone: "danger" },
    { label: "Expired Internships", value: internships.filter(isExpired).length, icon: Clock, tone: "danger" }
  ];

  return (
    <div className="page-enter space-y-8">
      <section className="premium-card overflow-hidden p-0">
        <div className="grid gap-6 bg-gradient-to-br from-primary/15 via-transparent to-background p-6 lg:grid-cols-[1fr_360px] lg:p-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Admin Control Center</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-primaryText md:text-5xl">Website Management Dashboard</h1>
            <p className="mt-4 max-w-3xl leading-7 text-secondaryText">
              Manage jobs, internships, courses, resource pages, companies, applications, interview content, notifications, and editable home page content without touching source code.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-elevated p-5">
            <BarChart3 className="h-8 w-8 text-primary" />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">Pending approvals</p>
            <strong className="mt-2 block text-5xl font-bold text-primaryText">{[...questions, ...experiences].filter((item) => item.status === "Pending").length}</strong>
            <p className="mt-3 text-sm leading-6 text-secondaryText">Review candidate-submitted questions and interview experiences before publication.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="premium-card p-5">
          <h2 className="text-2xl font-bold text-primaryText">Recently Added Items</h2>
          <div className="mt-5 grid gap-3">
            {recent.map((item) => (
              <div className="rounded-2xl border border-border bg-elevated p-4" key={item.id}>
                <p className="font-bold text-primaryText">{item.jobTitle || item.role || item.courseTitle || item.title}</p>
                <p className="mt-1 text-sm text-secondaryText">{item.createdAt || "Recently updated"}</p>
              </div>
            ))}
          </div>
        </article>
        <article className="premium-card p-5">
          <h2 className="text-2xl font-bold text-primaryText">Most Viewed Jobs</h2>
          <div className="mt-5 grid gap-3">
            {viewed.map((item) => (
              <div className="flex items-center justify-between rounded-2xl border border-border bg-elevated p-4" key={item.id}>
                <div>
                  <p className="font-bold text-primaryText">{item.jobTitle}</p>
                  <p className="mt-1 text-sm text-secondaryText">{item.companyName}</p>
                </div>
                <span className="badge">{item.views || 0} views</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <HomeContentManager refresh={refresh} />
      {Object.keys(configs).map((name) => (
        <CrudManager key={name} name={name} refresh={refresh} />
      ))}

      <section className="premium-card p-5">
        <h2 className="text-2xl font-bold text-primaryText">Contact Messages</h2>
        <div className="mt-5 grid gap-3">
          {readTable("messages").map((msg) => (
            <div className="rounded-2xl border border-border bg-elevated p-4 text-sm text-secondaryText" key={msg.id}>
              <strong className="text-primaryText">{msg.name}</strong> - {msg.email}: {msg.message}
            </div>
          ))}
          {readTable("messages").length === 0 && <p className="text-secondaryText">No contact messages yet.</p>}
        </div>
      </section>
    </div>
  );
}
