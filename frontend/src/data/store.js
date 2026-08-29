import {
  defaultCategories,
  defaultCompanies,
  defaultCourses,
  defaultHomeContent,
  defaultActivityLogs,
  defaultApplications,
  defaultInterviewExperiences,
  defaultInterviewQuestions,
  defaultInternships,
  defaultJobs,
  defaultLearningPlatforms,
  defaultMessages,
  defaultNotifications,
  defaultResources,
  defaultStudyMaterials,
  defaultCertifications,
  defaultTestimonials,
  defaultUsers
} from "./siteData.js";

const seed = {
  jobs: defaultJobs,
  internships: defaultInternships,
  courses: defaultCourses,
  resources: defaultResources,
  learningPlatforms: defaultLearningPlatforms,
  studyMaterials: defaultStudyMaterials,
  certifications: defaultCertifications,
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

export const tables = Object.keys(seed);
export const isExpired = (item) => Boolean(item.expiryDate && new Date(item.expiryDate) < new Date(new Date().toDateString()));
export const publicItems = (items) => items.filter((item) => item.published !== false && !isExpired(item));

export function readTable(name) {
  const raw = localStorage.getItem(`portal:${name}`);
  if (!raw) {
    localStorage.setItem(`portal:${name}`, JSON.stringify(seed[name] ?? []));
    return seed[name] ?? [];
  }
  return JSON.parse(raw);
}

export function writeTable(name, value) {
  localStorage.setItem(`portal:${name}`, JSON.stringify(value));
  window.dispatchEvent(new Event("portal-data-change"));
}

export function readRecord(name) {
  const raw = localStorage.getItem(`portal:${name}`);
  if (!raw) {
    localStorage.setItem(`portal:${name}`, JSON.stringify(seed[name] ?? {}));
    return seed[name] ?? {};
  }
  return JSON.parse(raw);
}

export function writeRecord(name, value) {
  localStorage.setItem(`portal:${name}`, JSON.stringify(value));
  window.dispatchEvent(new Event("portal-data-change"));
}

export function createItem(name, item) {
  const items = readTable(name);
  writeTable(name, [{ ...item, id: item.id || `${name}-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }, ...items]);
}

export function updateItem(name, id, patch) {
  writeTable(name, readTable(name).map((item) => (item.id === id ? { ...item, ...patch } : item)));
}

export function deleteItem(name, id) {
  writeTable(name, readTable(name).filter((item) => item.id !== id));
}
