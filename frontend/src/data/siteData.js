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
  { id: "job-1", companyLogo: "", companyName: "TechNova", jobTitle: "Junior React Developer", location: "Remote", salary: "$45k - $65k", experience: "0-2 years", employmentType: "Full-time", skillsRequired: "React, JavaScript, CSS", jobDescription: "Build responsive frontend features for a modern SaaS product.", responsibilities: "Develop UI components, fix bugs, collaborate with backend teams.", qualifications: "Portfolio projects and strong JavaScript fundamentals.", applicationLink: "https://example.com/apply", lastDate: "2026-12-31", expiryDate: "2026-12-31", category: "Web Development", published: true, featured: true, views: 240, createdAt: "2026-07-01" },
  { id: "job-2", companyLogo: "", companyName: "DataPulse", jobTitle: "Python Data Associate", location: "Bengaluru", salary: "$42k - $60k", experience: "1-3 years", employmentType: "Full-time", skillsRequired: "Python, SQL, Dashboards", jobDescription: "Support analytics projects and build data workflows.", responsibilities: "Clean data, create dashboards, automate reports.", qualifications: "Python basics, SQL, and analytical thinking.", applicationLink: "https://example.com/apply", lastDate: "2026-11-30", expiryDate: "2026-11-30", category: "Data Analytics", published: true, featured: false, views: 180, createdAt: "2026-07-01" }
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

export const defaultCompanies = [
  { id: "co-1", logo: "", name: "TechNova", description: "Product engineering company hiring frontend and backend talent.", website: "https://example.com", careersLink: "https://example.com/careers", industry: "Software", location: "Remote" },
  { id: "co-2", logo: "", name: "DataPulse", description: "Analytics company focused on data products and automation.", website: "https://example.com", careersLink: "https://example.com/careers", industry: "Data", location: "Bengaluru" }
];

export const defaultUsers = [
  { id: "user-1", name: "Demo Student", email: "student@example.com", role: "student", savedJobs: [] }
];

export const defaultMessages = [];
export const defaultCategories = ["Programming", "Web Development", "AI & Machine Learning", "Data Analytics", "Cloud Computing", "UI/UX Design", "Cybersecurity"];