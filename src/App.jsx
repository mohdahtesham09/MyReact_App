import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RecruiterSnapshot from "./components/RecruiterSnapshot";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import AllProjectsPage from "./components/AllProjectsPage";
import EngineeringApproach from "./components/EngineeringApproach";
import EngineeringGrowthRoadmap from "./components/EngineeringGrowthRoadmap";
import FreelanceServices from "./components/FreelanceServices";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// AI Assistant & CMS Modals
import AIChatModal from "./components/AIChatModal";
import AIChatWidget from "./components/AIChatWidget";
import ProjectDetailsModal from "./components/ProjectDetailsModal";
import AdminLoginModal from "./components/Admin/AdminLoginModal";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  const [currentView, setCurrentView] = useState("home"); // "home" | "projects"
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token") || null);

  // ── Theme System ──────────────────────────────────────────────────────────
  const getInitialTheme = () => {
    const stored = localStorage.getItem("portfolio_theme");
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (adminToken) {
      fetch("/api/auth/verify", {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.valid) {
            localStorage.removeItem("admin_token");
            setAdminToken(null);
          }
        })
        .catch(() => {});
    }
  }, [adminToken]);

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
    setIsAdminDashboardOpen(false);
  };

  // Global Fail-Safe Scroll Reveal Observer
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView]);

  const handleNavigateToHome = () => {
    setCurrentView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      data-theme={theme}
      style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}
      className="font-sans antialiased min-h-screen flex flex-col"
    >
      <Navbar
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={!!adminToken}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigateHome={handleNavigateToHome}
      />

      <main className="relative flex-1">
        {currentView === "home" ? (
          <>
            <Hero onOpenAIChat={() => setIsAIChatOpen(true)} />
            <RecruiterSnapshot onOpenAIChat={() => setIsAIChatOpen(true)} />
            <About />
            <Skills />
            <Projects
              onSelectProject={(project) => setSelectedProject(project)}
              onNavigateToProjects={() => {
                setCurrentView("projects");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <EngineeringApproach />
            <EngineeringGrowthRoadmap />
            <FreelanceServices onOpenAIChat={() => setIsAIChatOpen(true)} />
            <Experience />
            <Contact onOpenAIChat={() => setIsAIChatOpen(true)} />
          </>
        ) : (
          <AllProjectsPage
            onBack={handleNavigateToHome}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
      </main>

      <Footer
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        isAdminLoggedIn={!!adminToken}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Floating AI Chat Trigger Button */}
      <AIChatWidget onClick={() => setIsAIChatOpen(true)} isOpen={isAIChatOpen} />

      {/* AI Assistant Chat Modal */}
      <AIChatModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Project Details Drawer */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(token) => {
          setAdminToken(token);
          setIsAdminDashboardOpen(true);
        }}
      />

      {/* Admin CMS Dashboard */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        token={adminToken}
        onLogout={handleAdminLogout}
        onProjectsUpdated={() => {}}
      />
    </div>
  );
}

export default App;
