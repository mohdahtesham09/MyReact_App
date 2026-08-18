import React, { useEffect, useRef } from "react";
import { Bot, Code, Workflow, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    title: "AI Development",
    desc: "Building custom GenAI applications, LLM API integrations, RAG systems, and intelligent web experiences.",
    icon: Bot,
    color: "var(--accent-primary)",
    tech: ["Groq", "OpenAI", "RAG", "Python", "FastAPI"],
  },
  {
    title: "Full Stack Development",
    desc: "End-to-end web applications with modern React frontends, scalable Node.js backends, and robust APIs.",
    icon: Code,
    color: "var(--accent-secondary)",
    tech: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    title: "AI Automation",
    desc: "Designing n8n workflows, webhook integrations, and automated lead processing pipelines for businesses.",
    icon: Workflow,
    color: "var(--accent-warm)",
    tech: ["n8n", "Webhooks", "REST APIs", "Automation"],
  },
  {
    title: "AI Agents & Voice",
    desc: "Interactive conversational agents, voice booking systems, and automated customer qualification systems.",
    icon: Cpu,
    color: "#34D399",
    tech: ["Vapi AI", "Voice Agents", "Webhooks", "CRM Sync"],
  },
];

const FreelanceServices = ({ onOpenAIChat }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="freelance" className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-base)" }} ref={sectionRef}>
      <div className="section-container">
        <div className="mb-14 reveal">
          <p className="section-label">Services</p>
          <h2 className="section-heading">Available for Freelance Projects</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            High-impact web development, GenAI systems, and automated workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className={`card card-hover p-6 flex flex-col justify-between reveal stagger-${idx + 1}`}
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      backgroundColor: `${svc.color}15`,
                      border: `1px solid ${svc.color}30`,
                    }}
                  >
                    <Icon size={20} style={{ color: svc.color }} />
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {svc.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                    {svc.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {svc.tech.map((t) => (
                      <span key={t} className="ref-tech-pill text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn btn-ghost text-xs w-full justify-between mt-auto"
                  style={{ padding: "8px 12px" }}
                >
                  <span>Discuss a Project</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreelanceServices;
