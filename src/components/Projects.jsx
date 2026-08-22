import React, { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, ArrowRight, Layers } from "lucide-react";

const defaultProjects = [
  {
    id: "atomic-ai",
    name: "Atomic AI",
    tagline: "Full-Stack AI Application & Knowledge Assistant",
    desc: "Full-stack AI platform with Groq LLM integration, RAG architecture, and intelligent workflow automation.",
    description: "An AI-powered full-stack application demonstrating Groq API integrations, RAG architecture, and intelligent workflow automation in a scalable MERN environment.",
    tech: ["React", "Node.js", "Express", "Groq API", "RAG"],
    technologies: ["React", "Node.js", "Express", "Groq API", "RAG"],
    role: "Full Stack & AI Developer",
    category: "GenAI Engineering",
    pinned: true,
    live: "#",
    github: "https://github.com/mohdahtesham09",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80",
    featured: true,
    problem: "Complex user queries required fast context retrieval and accurate AI response synthesis.",
    solution: "Engineered a high-performance full-stack web system integrating Groq LLM endpoints, structured prompts, and responsive React state management.",
    features: ["Sub-second AI response latency", "RAG context retrieval", "Full-stack state sync", "Responsive React UI"],
    metrics: "Sub-second AI response latency with seamless full-stack state synchronization.",
  },
  {
    id: "mediastack",
    name: "MediaStack",
    tagline: "Multi-User Content & Blogging Platform",
    desc: "Feature-rich blogging platform with multi-user auth, dashboard analytics, and RESTful API architecture.",
    description: "A feature-rich blogging application enabling creators to publish, manage, and curate articles with user authentication, dashboard analytics, and RESTful API architecture.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    role: "Full Stack Developer",
    category: "MERN Full Stack",
    pinned: true,
    live: "https://mediastack.in",
    github: "https://github.com/mohdahtesham09",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80",
    featured: true,
    problem: "Creators needed an intuitive, fast content management platform with role-based access controls.",
    solution: "Developed a full-stack MERN application with modular Express routes, JWT auth, and a responsive React UI.",
    features: ["Multi-user content creation", "Role-based access", "Dashboard analytics", "RESTful API architecture"],
    metrics: "Built modular architecture supporting multi-user content creation with sub-100ms API response times.",
  },
  {
    id: "smailyzo",
    name: "SmailyZo",
    tagline: "AI Voice & Chat Booking Engine for Dental Clinics",
    desc: "AI appointment system combining Vapi voice AI and n8n automation to handle calls and sync calendars.",
    description: "Intelligent dental appointment scheduling system utilizing Vapi voice AI agents and n8n workflow automation to log calls and update schedules automatically.",
    tech: ["TypeScript", "React", "Vapi Voice AI", "n8n Workflows", "Groq API"],
    technologies: ["TypeScript", "React", "Vapi Voice AI", "n8n Workflows", "Groq API"],
    role: "Full Stack & AI Automation Developer",
    category: "n8n Automation",
    pinned: true,
    live: "#",
    github: "https://github.com/mohdahtesham09",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    featured: true,
    problem: "Dental clinics lose potential patients due to delayed phone handling and manual appointment entry.",
    solution: "Integrated Vapi voice AI and n8n webhooks with a React frontend to automate instant caller qualification and CRM calendar sync.",
    features: ["AI voice agents", "Automated call logging", "CRM calendar sync", "Instant caller qualification"],
    metrics: "Automated 80%+ of routine appointment inquiries with real-time AI conversation and CRM logging.",
  },
  {
    id: "backend-ledger",
    name: "Backend Ledger",
    tagline: "Secure Transaction & Account Management API",
    desc: "Financial ledger backend with strict transactional integrity, role authorization, and MongoDB validation.",
    description: "Financial ledger backend system implementing strict transactional integrity, role authorization, and MongoDB data validation.",
    tech: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
    technologies: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
    role: "Backend Developer",
    category: "Python Full Stack",
    pinned: true,
    live: "#",
    github: "https://github.com/mohdahtesham09",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    featured: true,
    problem: "Managing financial records accurately requires robust backend validation and atomic transaction operations.",
    solution: "Engineered scalable REST APIs with MVC architecture, JWT auth middleware, and comprehensive schema validation.",
    features: ["MVC architecture", "JWT auth", "Schema validation", "Audit trail"],
    metrics: "Designed zero-loss financial audit trail endpoints following strict MVC security patterns.",
  },
];

const categoryColors = {
  "MERN Full Stack":    { bg: "rgba(34,211,238,0.10)",  color: "var(--accent-secondary)", border: "rgba(34,211,238,0.25)" },
  "Python Full Stack":  { bg: "rgba(52,211,153,0.10)",  color: "#34D399",                 border: "rgba(52,211,153,0.25)" },
  "AI Engineering":     { bg: "rgba(124,108,252,0.12)", color: "var(--accent-primary)", border: "rgba(124,108,252,0.25)" },
  "GenAI Engineering":  { bg: "rgba(244,63,94,0.12)",  color: "#F43F5E",                 border: "rgba(244,63,94,0.25)" },
  "n8n Automation":     { bg: "rgba(251,146,60,0.12)", color: "#FB923C",                 border: "rgba(251,146,60,0.25)" },
};

const defaultCategoryStyle = { bg: "rgba(124,108,252,0.12)", color: "var(--accent-primary)", border: "rgba(124,108,252,0.25)" };

const Projects = ({ onSelectProject, onNavigateToProjects }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) { setProjects(data); setLoading(false); return; }
        }
      } catch {}
      setProjects(defaultProjects);
      setLoading(false);
    };
    load();
  }, []);

  // Filter ONLY pinned projects for the homepage section (max 4)
  const pinnedProjects = projects.filter((p) => p.pinned !== false && p.published !== false);
  const displayedProjects = pinnedProjects.slice(0, 4);

  return (
    <section id="projects" className="py-20" style={{ backgroundColor: "var(--bg-base)" }} ref={sectionRef}>
      <div className="section-container">
        <div className="mb-14 reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="section-heading">Selected Projects</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Real engineering problems. Real solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedProjects.map((project, idx) => {
            const name = project.name || project.title;
            const tagline = project.tagline;
            const desc = project.desc || project.description;
            const tech = project.technologies || project.tech || [];
            const cat = project.category || "MERN Full Stack";
            const catStyle = categoryColors[cat] || defaultCategoryStyle;

            return (
              <div
                key={project.id || idx}
                className={`card card-hover overflow-hidden group flex flex-col cursor-pointer reveal stagger-${(idx % 4) + 1}`}
                onClick={() => onSelectProject(project)}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden" style={{ backgroundColor: "var(--bg-elevated)" }}>
                  <img
                    src={project.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}` }}
                    >
                      {cat}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-sm font-bold mb-1 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-primary)"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                  >
                    {name}
                  </h3>

                  {tagline && (
                    <p className="text-[11px] font-medium mb-2" style={{ color: "var(--text-muted)" }}>{tagline}</p>
                  )}

                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
                    {desc}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tech.slice(0, 4).map((t, i) => (
                      <span key={i} className="ref-tech-pill">{t}</span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div
                    className="mt-auto pt-3 flex items-center gap-2"
                    style={{ borderTop: "1px solid var(--border-subtle)" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn btn-ghost text-[11px]"
                      style={{ padding: "6px 12px" }}
                    >
                      View Case Study <ArrowRight size={11} />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg transition-all"
                        style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                        title="GitHub"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={13} />
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg transition-all"
                        style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                        title="Live Demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* More Projects Button */}
        <div className="mt-12 text-center reveal">
          <button
            onClick={onNavigateToProjects}
            className="btn btn-outline text-xs inline-flex items-center gap-2 group px-6 py-3 rounded-full font-semibold shadow-sm transition-all hover:scale-105"
            style={{
              borderColor: "var(--border-subtle)",
              backgroundColor: "var(--bg-elevated)",
              color: "var(--text-primary)"
            }}
          >
            <Layers size={14} className="text-accent" />
            <span>More Projects</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
