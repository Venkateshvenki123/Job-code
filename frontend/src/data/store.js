import {
  defaultActivityLogs,
  defaultAiRecommendations,
  defaultAiSearchHistory,
  defaultApplications,
  defaultCategories,
  defaultCertifications,
  defaultCompanies,
  defaultCourses,
  defaultHomeContent,
  defaultInternships,
  defaultInterviewExperiences,
  defaultInterviewQuestions,
  defaultJobs,
  defaultLearningPlatforms,
  defaultMessages,
  defaultNotifications,
  defaultReferralRequests,
  defaultResources,
  defaultStartups,
  defaultStudyMaterials,
  defaultTestimonials,
  defaultUsers
} from "./siteData.js";
import { apiRequest } from "./api.js";

const seed = {
  jobs: defaultJobs,
  internships: defaultInternships,
  courses: defaultCourses,
  resources: defaultResources,
  learningPlatforms: defaultLearningPlatforms,
  studyMaterials: defaultStudyMaterials,
  certifications: defaultCertifications,
  startups: defaultStartups,
  referralRequests: defaultReferralRequests,
  aiSearchHistory: defaultAiSearchHistory,
  aiRecommendations: defaultAiRecommendations,
  companies: defaultCompanies,
  users: defaultUsers,
  messages: defaultMessages,
  applications: defaultApplications,
  interviewQuestions: defaultInterviewQuestions,
  interviewExperiences: defaultInterviewExperiences,
  notifications: defaultNotifications,
  activityLogs: defaultActivityLogs,
  categories: defaultCategories,
  testimonials: defaultTestimonials,
  homeContent: defaultHomeContent
};

const apiResources = {
  jobs: "/jobs",
  internships: "/internships",
  courses: "/courses",
  resources: "/resources",
  startups: "/startups",
  referralRequests: "/referrals"
};
const memory = structuredClone(seed);
export const tables = Object.keys(seed);
let hydrationPromise;

export const isExpired = (item) => Boolean(item.expiryDate && new Date(item.expiryDate) < new Date(new Date().toDateString()));
export const publicItems = (items) => items.filter((item) => item.published !== false && !isExpired(item));

export function readTable(name) {
  return memory[name] ?? [];
}

export function writeTable(name, value) {
  memory[name] = value;
  window.dispatchEvent(new Event("portal-data-change"));
}

export function readRecord(name) {
  return memory[name] ?? {};
}

export function writeRecord(name, value) {
  memory[name] = value;
  window.dispatchEvent(new Event("portal-data-change"));
}

export function createItem(name, item) {
  const optimistic = { ...item, id: item.id || `${name}-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
  writeTable(name, [optimistic, ...readTable(name)]);
  const path = apiResources[name];
  if (path) {
    apiRequest(path, { method: "POST", body: JSON.stringify(item) }).then((created) => {
      const records = readTable(name).filter((record) => record.id !== optimistic.id);
      writeTable(name, [created, ...records]);
    }).catch((error) => console.error(`[CareerGrid] ${name} was not persisted:`, error.message));
  }
  return optimistic;
}

export function updateItem(name, id, patch) {
  writeTable(name, readTable(name).map((item) => (item.id === id ? { ...item, ...patch } : item)));
  const path = apiResources[name];
  if (path && !String(id).startsWith(`${name}-`)) {
    apiRequest(`${path}/${id}`, { method: "PATCH", body: JSON.stringify(patch) }).catch((error) => console.error(`[CareerGrid] ${name} was not persisted:`, error.message));
  }
}

export function deleteItem(name, id) {
  writeTable(name, readTable(name).filter((item) => item.id !== id));
  const path = apiResources[name];
  if (path && !String(id).startsWith(`${name}-`)) {
    apiRequest(`${path}/${id}`, { method: "DELETE" }).catch((error) => console.error(`[CareerGrid] ${name} was not persisted:`, error.message));
  }
}

export function hydrateStore() {
  if (!hydrationPromise) {
    hydrationPromise = Promise.all(Object.entries(apiResources).filter(([name]) => name !== "referralRequests").map(async ([name, path]) => {
      const result = await apiRequest(path);
      memory[name] = result[name] || [];
    })).then(() => {
      window.dispatchEvent(new Event("portal-data-change"));
      return { source: "api" };
    });
  }
  return hydrationPromise;
}
