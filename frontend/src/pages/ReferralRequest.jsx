import { useMemo, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import { createItem, readTable } from "../data/store.js";

const fields = ["fullName", "email", "phone", "linkedInProfile", "portfolioGithub", "resumeUpload", "currentLocation", "experience", "currentRole", "skills", "suitability", "additionalMessage"];

function improveMessage(text, jobTitle, companyName) {
  if (!text.trim()) return "";
  return `I am interested in the ${jobTitle || "available"} opportunity at ${companyName || "your company"}. ${text.trim()} I would be grateful if you could consider my profile for a referral. I am happy to share any additional details needed for evaluation.`;
}

export default function ReferralRequest() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const startups = readTable("startups");
  const jobs = readTable("jobs");
  const internships = readTable("internships");
  const startup = startups.find((item) => item.id === params.get("startupId"));
  const job = jobs.find((item) => item.id === params.get("jobId"));
  const internship = internships.find((item) => item.id === params.get("internshipId"));
  const companyName = startup?.name || job?.companyName || internship?.company || "";
  const opportunityTitle = job?.jobTitle || internship?.role || "General startup referral";
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((field) => [field, ""])));
  const aiSuggestion = useMemo(() => improveMessage(form.suitability, opportunityTitle, companyName), [form.suitability, opportunityTitle, companyName]);

  const submit = (event) => {
    event.preventDefault();
    createItem("referralRequests", {
      ...form,
      startupId: startup?.id || "",
      companyName,
      jobId: job?.id || "",
      internshipId: internship?.id || "",
      opportunityTitle,
      status: "Submitted",
      assignedHr: "",
      assignedReferrer: "",
      notes: ""
    });
    alert("Referral request submitted successfully.");
    navigate("/portal/candidate");
  };

  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Smart referral form"
        title="Request Referral"
        description="The selected company and opportunity are captured automatically. AI suggestions are draft-only and must be reviewed before submission."
      />

      <section className="premium-card grid gap-4 p-5 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-muted">Company</p>
          <strong className="mt-1 block text-xl text-primaryText">{companyName || "Not selected"}</strong>
        </div>
        <div>
          <p className="text-sm font-bold text-muted">Opportunity</p>
          <strong className="mt-1 block text-xl text-primaryText">{opportunityTitle}</strong>
        </div>
        <div>
          <p className="text-sm font-bold text-muted">Referral status</p>
          <strong className="mt-1 block text-xl text-primaryText">Submitted after review</strong>
        </div>
      </section>

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_.8fr]">
        <section className="premium-card grid gap-4 p-6 md:grid-cols-2">
          {fields.map((field) => (
            <label className={field === "suitability" || field === "additionalMessage" ? "grid gap-2 text-sm font-bold text-secondaryText md:col-span-2" : "grid gap-2 text-sm font-bold text-secondaryText"} key={field}>
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase())}
              {field === "suitability" || field === "additionalMessage" ? (
                <textarea required={field === "suitability"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field min-h-28 resize-none" />
              ) : (
                <input required={["fullName", "email", "skills"].includes(field)} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="field" />
              )}
            </label>
          ))}
          <button className="btn-primary md:col-span-2 md:w-fit">
            Submit Referral Request <Send className="h-4 w-4" />
          </button>
        </section>

        <aside className="grid h-fit gap-5">
          <article className="premium-card p-6">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primaryText">AI Referral Assistant</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-secondaryText">Draft improvement based on your suitability message. It is never submitted automatically.</p>
            <div className="mt-5 rounded-2xl border border-border bg-elevated p-4 text-sm leading-6 text-secondaryText">
              {aiSuggestion || "Write a short suitability message to see a professional draft suggestion."}
            </div>
            {aiSuggestion && (
              <button type="button" onClick={() => setForm({ ...form, additionalMessage: aiSuggestion })} className="btn-secondary mt-4 w-full justify-center">
                Use this draft
              </button>
            )}
          </article>
          <article className="rounded-3xl border border-primary/25 bg-primary/10 p-5">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm leading-6 text-secondaryText">Your request will appear in Admin Referral Management and Candidate Dashboard tracking after submission.</p>
          </article>
        </aside>
      </form>
    </div>
  );
}
