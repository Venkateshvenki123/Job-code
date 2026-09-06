import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";
import AppLayout from "./components/AppLayout.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import ProtectedAdminRoute from "./admin/ProtectedAdminRoute.jsx";
import Home from "./pages/Home.jsx";
import Jobs from "./pages/Jobs.jsx";
import Internships from "./pages/Internships.jsx";
import Courses from "./pages/Courses.jsx";
import Startups from "./pages/Startups.jsx";
import StartupProfile from "./pages/StartupProfile.jsx";
import ReferralRequest from "./pages/ReferralRequest.jsx";
import AiCareerAssistant from "./pages/AiCareerAssistant.jsx";
import Resources from "./pages/Resources.jsx";
import LearningPlatforms from "./pages/LearningPlatforms.jsx";
import StudyMaterial from "./pages/StudyMaterial.jsx";
import Certifications from "./pages/Certifications.jsx";
import Companies from "./pages/Companies.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import InterviewQuestions from "./pages/InterviewQuestions.jsx";
import InterviewExperiences from "./pages/InterviewExperiences.jsx";
import CandidateDashboard from "./pages/CandidateDashboard.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import { hydrateStore } from "./data/store.js";

function LoadingScreen() {
  return (
    <main className="loading-screen" aria-live="polite" aria-label="Loading CareerGrid">
      <div className="loading-card">
        <div className="loading-logo" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="loading-brand">CareerGrid</p>
        <p className="loading-message">Preparing your career journey</p>
        <div className="loading-progress" role="progressbar" aria-label="Loading" />
      </div>
    </main>
  );
}

function App() {
  const [loading, setLoading] = React.useState(true);
  const [startupError, setStartupError] = React.useState("");

  React.useEffect(() => {
    let active = true;
    Promise.all([
      hydrateStore(),
      new Promise((resolve) => window.setTimeout(resolve, 350))
    ]).then(() => {
      if (active) setLoading(false);
    }).catch((error) => {
      if (active) {
        setStartupError(error.message);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  if (loading) return <LoadingScreen />;
  if (startupError) return <main className="loading-screen"><div className="loading-card"><p className="loading-brand">CareerGrid API unavailable</p><p className="loading-message">{startupError} Configure PostgreSQL or explicitly enable DEV_FALLBACK=true for local development.</p></div></main>;

  return (
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="startups" element={<Startups />} />
          <Route path="startups/:startupId" element={<StartupProfile />} />
          <Route path="referrals/new" element={<ReferralRequest />} />
          <Route path="ai-career-assistant" element={<AiCareerAssistant />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="internships" element={<Internships />} />
          <Route path="courses" element={<Courses />} />
          <Route path="resources" element={<Resources />} />
          <Route path="learning-platforms" element={<LearningPlatforms />} />
          <Route path="study-material" element={<StudyMaterial />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="companies" element={<Companies />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="interview-questions" element={<InterviewQuestions />} />
          <Route path="interview-experiences" element={<InterviewExperiences />} />
          <Route path="candidate-dashboard" element={<CandidateDashboard />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
          <Route index element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
