import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const tracks = ["React JS", "Node.js", "Python", "Java"];
const aiProvider = process.env.AI_PROVIDER || "configurable-provider";
const startups = [
  { id: "startup-1", name: "TechNova", industry: "SaaS", location: "Remote", technologies: ["React", "Node.js", "PostgreSQL"], hiringStatus: "Hiring Now" },
  { id: "startup-2", name: "DataPulse", industry: "Data", location: "Bengaluru", technologies: ["Python", "SQL", "React"], hiringStatus: "Hiring Now" }
];
const referralStatuses = ["Submitted", "Under Review", "Referral Available", "Referred", "Application Submitted", "Interview", "Selected", "Rejected"];

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "node-api" });
});

app.get("/api/tracks", (_req, res) => {
  res.json({ tracks });
});

app.get("/api/startups", (req, res) => {
  const query = String(req.query.q || "").toLowerCase();
  const results = startups.filter((startup) => [startup.name, startup.industry, startup.location, startup.technologies.join(" ")].join(" ").toLowerCase().includes(query));
  res.json({ startups: query ? results : startups });
});

app.get("/api/referrals/statuses", (_req, res) => {
  res.json({ statuses: referralStatuses });
});

app.post("/api/ai/startup-search", (req, res) => {
  const question = String(req.body?.question || "");
  const lower = question.toLowerCase();
  const filters = {
    industry: ["ai", "saas", "data", "cloud"].find((item) => lower.includes(item)) || null,
    skills: ["react", "java", "python", "sql", "aws"].filter((skill) => lower.includes(skill)),
    location: ["bengaluru", "hyderabad", "remote"].find((item) => lower.includes(item)) || null
  };
  const results = startups.filter((startup) => {
    const haystack = [startup.industry, startup.location, startup.technologies.join(" ")].join(" ").toLowerCase();
    return (!filters.industry || haystack.includes(filters.industry)) && (!filters.location || haystack.includes(filters.location)) && filters.skills.every((skill) => haystack.includes(skill));
  });
  res.json({ provider: aiProvider, filters, startups: results, note: "Results are retrieved from platform records only; the AI layer must not invent listings." });
});

app.listen(port, () => {
  console.log(`Node API running on http://localhost:${port}`);
});
