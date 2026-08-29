export const navItems = [
  { label: "Home", path: "/" },
  { label: "Jobs", path: "/jobs" },
  { label: "Internships", path: "/internships" },
  { label: "Courses", path: "/courses" },
  { label: "Resources", path: "/resources" },
  { label: "Companies", path: "/companies" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" }
];

export const roles = [
  { id: "super-admin", label: "Super Admin", permissions: ["all"] },
  { id: "admin", label: "Admin", permissions: ["content", "jobs", "applications", "reports"] },
  { id: "hr", label: "HR", permissions: ["assignedJobs", "applications", "interviews"] },
  { id: "manager", label: "Hiring Manager", permissions: ["reviews", "feedback", "selection"] },
  { id: "candidate", label: "Candidate", permissions: ["apply", "track", "submitContent"] }
];

export const pipelineStages = ["Applied", "Resume Screening", "HR Round", "Technical Round", "Manager Round", "Final HR Discussion", "Offer Released", "Joined", "Rejected"];

export const defaultHomeContent = {
  heroTitle: "Learn, Build, and Grow Your Career",
  heroSubtitle: "Access courses, study resources, internships, career opportunities, and learning resources in one place.",
  description: "A professional education and career platform connecting students with courses, jobs, internships, companies, and resources.",
  mission: "Make career growth accessible through structured learning, trusted opportunities, and practical resources.",
  vision: "Become the most reliable digital bridge between learners, educators, companies, and career opportunities.",
  footer: "Learn, build, and grow your career with New Website.",
  contactEmail: "hello@newwebsite.dev",
  socials: "LinkedIn, GitHub, X"
};

export const defaultTestimonials = [
  { name: "Ayaan", role: "Web Development Student", quote: "The platform helped me organize courses, resources, and internship applications in one place." },
  { name: "Mira", role: "Career Switcher", quote: "The job filters and career pages made my search much more focused and professional." },
  { name: "Kabir", role: "Junior Developer", quote: "Clean UI, useful learning paths, and practical career content. It feels like a real portal." }
];

export const defaultJobs = [
  { id: "job-1", companyLogo: "", companyName: "TechNova", jobTitle: "Junior React Developer", department: "Engineering", location: "Remote", workMode: "Remote", salary: "$45k - $65k", experience: "0-2 years", employmentType: "Full-time", skillsRequired: "React, JavaScript, CSS", jobDescription: "Build responsive frontend features for a modern SaaS product.", responsibilities: "Develop UI components, fix bugs, collaborate with backend teams.", qualifications: "Portfolio projects and strong JavaScript fundamentals.", benefits: "Remote work, mentorship, learning budget", vacancies: "4", hiringManager: "Riya Sharma", assignedHr: "Anika HR", applicationLink: "https://example.com/apply", lastDate: "2026-12-31", expiryDate: "2026-12-31", category: "Web Development", status: "Open", published: true, featured: true, views: 240, createdAt: "2026-07-01" },
  { id: "job-2", companyLogo: "", companyName: "DataPulse", jobTitle: "Python Data Associate", department: "Analytics", location: "Bengaluru", workMode: "Hybrid", salary: "$42k - $60k", experience: "1-3 years", employmentType: "Full-time", skillsRequired: "Python, SQL, Dashboards", jobDescription: "Support analytics projects and build data workflows.", responsibilities: "Clean data, create dashboards, automate reports.", qualifications: "Python basics, SQL, and analytical thinking.", benefits: "Hybrid work, certification support", vacancies: "2", hiringManager: "Karan Mehta", assignedHr: "Anika HR", applicationLink: "https://example.com/apply", lastDate: "2026-11-30", expiryDate: "2026-11-30", category: "Data Analytics", status: "Open", published: true, featured: false, views: 180, createdAt: "2026-07-01" }
];

export const defaultInternships = [
  { id: "int-1", company: "CodeNest Labs", role: "Frontend Intern", duration: "12 weeks", stipend: "$400/month", location: "Remote", mode: "Remote", eligibility: "Students and freshers", skills: "React, Git, UI", applyLink: "https://example.com/apply", lastDate: "2026-10-30", expiryDate: "2026-10-30", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "int-2", company: "CloudNova", role: "Cloud Intern", duration: "8 weeks", stipend: "$300/month", location: "Hyderabad", mode: "Hybrid", eligibility: "Final-year students", skills: "Cloud, Linux, APIs", applyLink: "https://example.com/apply", lastDate: "2026-09-30", expiryDate: "2026-09-30", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultCourses = [
  { id: "course-1", courseImage: "", courseTitle: "Modern Web Development", instructor: "New Website Academy", duration: "12 weeks", level: "Intermediate", category: "Web Development", price: "$99", description: "Build responsive React apps with routing, APIs, and deployment.", learningOutcomes: "React, routing, UI systems, deployment", enrollLink: "https://example.com/enroll", expiryDate: "2026-12-31", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "course-2", courseImage: "", courseTitle: "AI Foundations", instructor: "AI Mentor Team", duration: "10 weeks", level: "Beginner", category: "AI & Machine Learning", price: "$129", description: "Understand machine learning concepts and practical AI workflows.", learningOutcomes: "ML basics, prompts, workflows, ethics", enrollLink: "https://example.com/enroll", expiryDate: "2026-12-31", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultResources = [
  { id: "res-1", title: "Web Development Notes", category: "Notes", pdfUpload: "", videoLink: "", externalLink: "https://developer.mozilla.org", description: "Concise HTML, CSS, JavaScript, and React notes.", thumbnail: "", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "res-2", title: "Interview Preparation Guide", category: "Interview Preparation Guides", pdfUpload: "", videoLink: "", externalLink: "https://example.com", description: "Technical and behavioral interview preparation material.", thumbnail: "", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultLearningPlatforms = [
  { id: "lp-1", name: "freeCodeCamp", description: "Hands-on coding curriculum for web development, data, and backend skills.", skillsOffered: "HTML, CSS, JavaScript, APIs", website: "https://www.freecodecamp.org", category: "Programming", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "lp-2", name: "Coursera", description: "University and company-led professional courses and guided certificates.", skillsOffered: "AI, Cloud, Data, Business", website: "https://www.coursera.org", category: "Professional Learning", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultStudyMaterials = [
  { id: "sm-1", title: "Frontend Interview Notes", category: "Interview Preparation", type: "PDF", description: "Concise notes for HTML, CSS, JavaScript, React, and browser fundamentals.", link: "https://example.com/frontend-notes", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "sm-2", title: "SQL Practice Set", category: "Practice Questions", type: "Guide", description: "Common SQL queries, joins, grouping, and case-based practice questions.", link: "https://example.com/sql-practice", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultCertifications = [
  { id: "cert-1", name: "AWS Cloud Practitioner", provider: "Amazon Web Services", category: "Cloud", difficulty: "Beginner", cost: "$100", duration: "4-6 weeks", officialLink: "https://aws.amazon.com/certification/", preparationMaterial: "Cloud basics, billing, IAM, compute, storage", published: true, featured: true, createdAt: "2026-07-01" },
  { id: "cert-2", name: "Google Data Analytics Certificate", provider: "Google", category: "Data Analytics", difficulty: "Beginner", cost: "Subscription", duration: "3-6 months", officialLink: "https://grow.google/certificates/data-analytics/", preparationMaterial: "Spreadsheets, SQL, dashboards, case studies", published: true, featured: false, createdAt: "2026-07-01" }
];

export const defaultCompanies = [
  { id: "co-1", logo: "", name: "TechNova", description: "Product engineering company hiring frontend and backend talent.", website: "https://example.com", careersLink: "https://example.com/careers", industry: "Software", location: "Remote" },
  { id: "co-2", logo: "", name: "DataPulse", description: "Analytics company focused on data products and automation.", website: "https://example.com", careersLink: "https://example.com/careers", industry: "Data", location: "Bengaluru" }
];

export const defaultUsers = [
  { id: "user-1", name: "Demo Student", email: "student@example.com", role: "candidate", savedJobs: ["job-1"] },
  { id: "user-2", name: "Anika HR", email: "hr@example.com", role: "hr", savedJobs: [] },
  { id: "user-3", name: "Riya Sharma", email: "manager@example.com", role: "manager", savedJobs: [] }
];

export const defaultMessages = [];
export const defaultCategories = ["Programming", "Web Development", "AI & Machine Learning", "Data Analytics", "Cloud Computing", "UI/UX Design", "Cybersecurity"];

export const defaultApplications = [
  { id: "app-1", candidateName: "Demo Student", candidateEmail: "student@example.com", jobId: "job-1", jobTitle: "Junior React Developer", companyName: "TechNova", resumeUrl: "", stage: "Technical Round", score: "82", assignedHr: "Anika HR", hiringManager: "Riya Sharma", interviewDate: "2026-08-18", notes: "Strong portfolio, schedule React assessment.", createdAt: "2026-08-01" },
  { id: "app-2", candidateName: "Neha Rao", candidateEmail: "neha@example.com", jobId: "job-2", jobTitle: "Python Data Associate", companyName: "DataPulse", resumeUrl: "", stage: "Resume Screening", score: "74", assignedHr: "Anika HR", hiringManager: "Karan Mehta", interviewDate: "2026-08-21", notes: "Good SQL fundamentals.", createdAt: "2026-08-01" }
];

export const defaultInterviewQuestions = [
  { id: "q-1", company: "TechNova", role: "React Developer", technology: "JavaScript", experienceLevel: "Entry", department: "Engineering", question: "Explain how React state updates are batched.", answer: "React groups compatible state updates to reduce renders and improve UI performance.", difficulty: "Medium", tags: "React, State", interviewRound: "Technical Round", askedDate: "2026-07-20", notes: "Frequently asked in frontend rounds.", status: "Published", submittedBy: "Admin", createdAt: "2026-07-20" },
  { id: "q-2", company: "DataPulse", role: "Data Analyst", technology: "SQL", experienceLevel: "Junior", department: "Analytics", question: "What is the difference between WHERE and HAVING?", answer: "WHERE filters rows before grouping; HAVING filters grouped results.", difficulty: "Easy", tags: "SQL, Analytics", interviewRound: "Technical Round", askedDate: "2026-07-22", notes: "Useful screening question.", status: "Pending", submittedBy: "Candidate", createdAt: "2026-07-22" }
];

export const defaultInterviewExperiences = [
  { id: "exp-1", companyName: "TechNova", jobRole: "Junior React Developer", experienceLevel: "0-2 years", interviewDate: "2026-07-25", location: "Remote", interviewMode: "Video", rounds: "3", questionsAsked: "React hooks, routing, API state, CSS layout.", codingQuestions: "Build a searchable card list.", hrQuestions: "Why frontend engineering?", technicalQuestions: "Explain useMemo and useEffect dependencies.", overallExperience: "Structured, respectful, and practical.", difficultyRating: "Medium", tips: "Prepare project walkthroughs and JavaScript fundamentals.", selectionResult: "Selected", anonymous: false, status: "Published", featured: true, createdAt: "2026-07-25" }
];

export const defaultNotifications = [
  { id: "note-1", title: "New application received", message: "Demo Student applied for Junior React Developer.", audience: "Admin,HR", status: "Unread", createdAt: "2026-08-01" },
  { id: "note-2", title: "Interview scheduled", message: "Technical Round scheduled for Demo Student.", audience: "Candidate,Manager", status: "Unread", createdAt: "2026-08-02" }
];

export const defaultActivityLogs = [
  { id: "log-1", actor: "Admin", action: "Published job", entity: "Junior React Developer", createdAt: "2026-08-01" }
];
