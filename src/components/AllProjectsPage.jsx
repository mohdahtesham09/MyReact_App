import React, { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowLeft, ArrowRight, Layers, Sparkles, Filter, Pin } from "lucide-react";

const CATEGORIES = [
  "All Projects",
  "MERN Full Stack",
  "Python Full Stack",
  "AI Engineering",
  "GenAI Engineering",
  "n8n Automation"
];

const categoryColors = {
  "MERN Full Stack":    { bg: "rgba(34,211,238,0.12)", color: "var(--accent-secondary)", border: "rgba(34,211,238,0.3)" },
  "Python Full Stack":  { bg: "rgba(52,211,153,0.12)", color: "#34D399",                 border: "rgba(52,211,153,0.3)" },
  "AI Engineering":     { bg: "rgba(124,108,252,0.12)", color: "var(--accent-primary)", border: "rgba(124,108,252,0.3)" },
  "GenAI Engineering":  { bg: "rgba(244,63,94,0.12)",  color: "#F43F5E",                 border: "rgba(244,63,94,0.3)" },
  "n8n Automation":     { bg: "rgba(251,146,60,0.12)", color: "#FB923C",                 border: "rgba(251,146,60,0.3)" },
};

const defaultCategoryStyle = { bg: "rgba(124,108,252,0.12)", color: "var(--accent-primary)", border: "rgba(124,108,252,0.3)" };

const AllProjectsPage = ({ onBack, onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProjects(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching projects for AllProjectsPage:", err);
      }
      // Fallback
      import("../data/portfolioData").then((mod) => {
        setProjects(mod.projects || []);
        setLoading(false);
      });
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (p.published === false) return false;
    if (selectedCategory === "All Projects") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen py-24" style={{ backgroundColor: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="section-container">
        {/* Top Header Controls */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="btn btn-ghost text-xs w-fit flex items-center gap-2 group"
            style={{ padding: "8px 16px" }}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border w-fit"
            style={{
              backgroundColor: "var(--bg-elevated)",
              borderColor: "var(--border-subtle)",
              color: "var(--text-muted)"
            }}
          >
            Showcase ({filteredProjects.length} Projects)
          </span>
        </div>

        {/* Page Hero Title */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <p className="section-label flex items-center justify-center gap-1.5 mb-2">
            <Layers size={14} /> Full Project Archive
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Engineering & Automation Projects
          </h1>
          <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Explore full-stack web applications, AI integrations, and dedicated n8n automation workflows categorized by core engineering discipline.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected ? "shadow-md scale-[1.02]" : "hover:opacity-80"
                }`}
                style={{
                  backgroundColor: isSelected ? "var(--accent-primary)" : "var(--bg-elevated)",
                  color: isSelected ? "#FFFFFF" : "var(--text-secondary)",
                  border: `1px solid ${isSelected ? "var(--accent-primary)" : "var(--border-subtle)"}`,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Loading projects archive...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div
            className="py-16 text-center rounded-2xl border p-8 max-w-md mx-auto"
            style={{ backgroundColor: "var(--bg-elevated)", borderColor: "var(--border-subtle)" }}
          >
            <Filter size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-semibold mb-1">No projects in this category yet</p>
            <p className="text-xs text-muted mb-4">Try selecting another filter or viewing all projects.</p>
            <button
              onClick={() => setSelectedCategory("All Projects")}
              className="btn btn-accent text-xs"
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const name = project.name || project.title;
              const tagline = project.tagline;
              const desc = project.desc || project.description;
              const tech = project.technologies || project.tech || [];
              const cat = project.category || "Full Stack";
              const catStyle = categoryColors[cat] || defaultCategoryStyle;

              return (
                <div
                  key={project.id || idx}
                  className="card card-hover overflow-hidden group flex flex-col cursor-pointer transition-all duration-300"
                  onClick={() => onSelectProject(project)}
                >
                  {/* Thumbnail Image Container */}
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
                    <img
                      src={
                        project.image ||
                        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
                      }
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md"
                        style={{
                          backgroundColor: catStyle.bg,
                          color: catStyle.color,
                          border: `1px solid ${catStyle.border}`
                        }}
                      >
                        {cat}
                      </span>
                    </div>

                    {/* Pinned Badge Indicator if Pinned */}
                    {project.pinned && (
                      <div className="absolute top-3 right-3">
                        <span
                          className="p-1.5 rounded-full backdrop-blur-md flex items-center justify-center text-amber-400"
                          style={{ backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid rgba(251,191,36,0.3)" }}
                          title="Pinned Project"
                        >
                          <Pin size={12} fill="currentColor" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3
                      className="text-base font-bold mb-1 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {name}
                    </h3>

                    {tagline && (
                      <p className="text-[11.5px] font-medium mb-2.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>
                        {tagline}
                      </p>
                    )}

                    <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--text-secondary)" }}>
                      {desc}
                    </p>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                      {tech.slice(0, 4).map((t, i) => (
                        <span key={i} className="ref-tech-pill text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Card Action Buttons */}
                    <div
                      className="pt-3.5 flex items-center gap-2"
                      style={{ borderTop: "1px solid var(--border-subtle)" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => onSelectProject(project)}
                        className="btn btn-ghost text-[11px] flex-1 justify-center"
                        style={{ padding: "7px 12px" }}
                      >
                        View Details <ArrowRight size={11} />
                      </button>

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all"
                          style={{
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)"
                          }}
                          title="GitHub Repository"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={14} />
                        </a>
                      )}

                      {project.live && project.live !== "#" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg transition-all"
                          style={{
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-elevated)",
                            border: "1px solid var(--border-subtle)"
                          }}
                          title="Live Application"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjectsPage;
