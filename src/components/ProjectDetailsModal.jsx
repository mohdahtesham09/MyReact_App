import React, { useEffect, useRef } from "react";
import { X, Github, ExternalLink, Cpu, Database, Globe, Terminal, Layers } from "lucide-react";

const ArchNode = ({ label, color, icon: Icon }) => (
  <div
    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium"
    style={{ backgroundColor: `${color}14`, border: `1px solid ${color}35`, color }}
  >
    <Icon size={11} />
    {label}
  </div>
);

const ProjectDetailsModal = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  if (!project) return null;

  const name = project.name || project.title;
  const tech = project.technologies || project.tech || [];
  const features = Array.isArray(project.features) ? project.features : [];
  const isAI = (project.category || "").toLowerCase().includes("ai");

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fadeInFast"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[560px] overflow-y-auto animate-slideInRight flex flex-col"
        style={{ backgroundColor: "var(--bg-surface)", borderLeft: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-lg)" }}
        role="dialog"
        aria-label={`Project: ${name}`}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-5 shrink-0"
          style={{ backgroundColor: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div>
            {project.category && (
              <p className="section-label mb-0.5">{project.category}</p>
            )}
            <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{name}</h2>
            {project.tagline && (
              <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{project.tagline}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all ml-4 flex-shrink-0"
            style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-overlay)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Project image */}
        {project.image && (
          <div className="relative h-52 shrink-0 overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
            <img
              src={project.image}
              alt={name}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-7 flex-1">

          {/* Overview */}
          {project.description && (
            <div>
              <p className="section-label mb-2">Overview</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.description}
              </p>
            </div>
          )}

          {/* Problem / Solution */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.problem && (
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)" }}
                >
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: "#F87171" }}>Problem</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}
                >
                  <p className="text-[10px] uppercase tracking-wider font-semibold mb-2" style={{ color: "#34D399" }}>Solution</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Architecture (AI projects) */}
          {isAI && (
            <div>
              <p className="section-label mb-3">Architecture</p>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <ArchNode label="React UI" color="#22D3EE" icon={Globe} />
                  <span style={{ color: "var(--text-muted)" }}>→</span>
                  <ArchNode label="Node API" color="#34D399" icon={Terminal} />
                  <span style={{ color: "var(--text-muted)" }}>→</span>
                  <ArchNode label="LLM / Groq" color="var(--accent-primary)" icon={Cpu} />
                  <span style={{ color: "var(--text-muted)" }}>→</span>
                  <ArchNode label="RAG / Vector" color="#F59E0B" icon={Database} />
                </div>
                {project.architecture && (
                  <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>{project.architecture}</p>
                )}
              </div>
            </div>
          )}

          {/* Key Features */}
          {features.length > 0 && (
            <div>
              <p className="section-label mb-3">Key Features</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg px-3 py-2.5"
                    style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "var(--accent-primary)" }} />
                    <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology */}
          {tech.length > 0 && (
            <div>
              <p className="section-label mb-3">Technology</p>
              <div className="flex flex-wrap gap-2">
                {tech.map((t, i) => (
                  <span key={i} className="ref-tech-pill text-xs">{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: "rgba(124,108,252,0.07)", border: "1px solid rgba(124,108,252,0.15)" }}
            >
              <p className="text-[10px] uppercase tracking-wider font-semibold mb-1.5" style={{ color: "var(--accent-primary)" }}>
                Result
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{project.metrics}</p>
            </div>
          )}

          {/* Role */}
          {project.role && (
            <div>
              <p className="section-label mb-1">Role</p>
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{project.role}</p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="sticky bottom-0 p-5 flex gap-3 shrink-0"
          style={{ backgroundColor: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)" }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost flex-1 text-[11px]"
            >
              <Github size={13} /> GitHub
            </a>
          )}
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 text-[11px]"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsModal;
