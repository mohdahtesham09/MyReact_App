import React, { useEffect, useRef } from "react";
import { Github, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from "../config";
import { personalInfo, journeyPath } from "../data/portfolioData";

const capabilities = [
  {
    title: "Full Stack Development",
    desc: "Building complete React frontends connected to scalable Node.js/Express backends.",
    accent: "var(--accent-secondary)",
  },
  {
    title: "Backend Engineering",
    desc: "REST APIs, database design, JWT auth and clean MVC architecture.",
    accent: "#34D399",
  },
  {
    title: "AI / GenAI Integration",
    desc: "LLM integrations, RAG pipelines and intelligent AI-powered web experiences.",
    accent: "var(--accent-primary)",
  },
  {
    title: "Automation",
    desc: "n8n workflows, Vapi voice agents and webhook-driven business automation.",
    accent: "var(--accent-warm)",
  },
];

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20" style={{ backgroundColor: "var(--bg-base)" }} ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <div className="mb-14 reveal">
          <p className="section-label">About</p>
          <h2 className="section-heading">Building with code, AI & automation.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left — Bio + progression + social */}
          <div className="lg:col-span-5 reveal">
            <div
              className="rounded-2xl p-6 h-full flex flex-col gap-6"
              style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
            >
              {/* Exact bio text */}
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                <p style={{ color: "var(--text-primary)" }}>{personalInfo.bio}</p>
              </div>

              {/* Engineering progression (NO dates!) */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold mb-4" style={{ color: "var(--text-muted)" }}>
                  Engineering Progression
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  {journeyPath.map((step, i) => (
                    <React.Fragment key={step}>
                      <div
                        className="px-2.5 py-1 rounded-md text-[10.5px] font-semibold transition-all"
                        style={{
                          backgroundColor: i === journeyPath.length - 1 ? "rgba(124,108,252,0.15)" : "var(--bg-elevated)",
                          color: i === journeyPath.length - 1 ? "var(--accent-primary)" : "var(--text-secondary)",
                          border: `1px solid ${i === journeyPath.length - 1 ? "rgba(124,108,252,0.30)" : "var(--border-subtle)"}`,
                        }}
                      >
                        {step}
                      </div>
                      {i < journeyPath.length - 1 && (
                        <ArrowRight size={10} style={{ color: "var(--border-mid)", flexShrink: 0 }} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div
                className="pt-5 mt-auto flex items-center gap-2"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                {[
                  { href: GITHUB_URL, Icon: Github, label: "GitHub" },
                  { href: LINKEDIN_URL, Icon: Linkedin, label: "LinkedIn" },
                  { href: INSTAGRAM_URL, Icon: Instagram, label: "Instagram" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all"
                    style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}
                    title={label}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-mid)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Capability cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={cap.title}
                className={`rounded-2xl p-5 card card-hover reveal stagger-${i + 1}`}
              >
                <div
                  className="w-1 h-8 rounded-full mb-4"
                  style={{ backgroundColor: cap.accent }}
                />
                <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {cap.title}
                </h4>
                <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
