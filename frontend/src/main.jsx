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
import RolePortal from "./pages/RolePortal.jsx";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";

createRoot(document.getElementById("root")).render(
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
          <Route path="portal/:role" element={<RolePortal />} />
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
