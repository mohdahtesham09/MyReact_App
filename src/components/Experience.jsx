import React, { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Award, Brain } from "lucide-react";

const experiences = [
  {
    role: "AI Engineering & GenAI Focus",
    org: "Self-Directed Learning & Projects",
    desc: "Deepening capabilities in LLMs, Groq & OpenAI APIs, RAG architecture, Vapi Voice AI, and building automated n8n business workflows.",
    icon: Brain,
    color: "var(--accent-primary)",
  },
  {
    role: "Freelance Full Stack Developer",
    org: "Client & Contract Projects",
    desc: "Delivering full-stack MERN web solutions, RESTful API integrations, responsive frontends, and automation scripts for clients.",
    icon: Briefcase,
    color: "var(--accent-secondary)",
  },
  {
    role: "Cybersecurity Virtual Internship",
    org: "Goldman Sachs",
    desc: "Completed security challenge modules covering password hashing, vulnerability assessment, and cryptography fundamentals.",
    icon: Award,
    color: "#34D399",
  },
  {
    role: "BCA (Bachelor of Computer Applications)",
    org: "Meena Saha Institute of Technology & Management",
    desc: "Strong academic foundation in Computer Science, Data Structures & Algorithms, Object-Oriented Programming, and Web Development.",
    icon: GraduationCap,
    color: "var(--accent-warm)",
  },
];

const Experience = () => {
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
    <section id="experience" className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-base)" }} ref={sectionRef}>
      <div className="section-container">
        <div className="mb-14 reveal">
          <p className="section-label">Background</p>
          <h2 className="section-heading">Experience & Qualifications</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Verified technical experience, training, and education.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 space-y-8">
          {/* Vertical timeline connector */}
          <div
            className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 rounded-full"
            style={{ backgroundColor: "var(--border-subtle)" }}
          />

          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group reveal">
                {/* Timeline node */}
                <div
                  className="absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: "var(--bg-base)",
                    border: `2px solid ${exp.color}`,
                    boxShadow: `0 0 10px ${exp.color}30`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                </div>

                {/* Card */}
                <div className="card card-hover flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${exp.color}15`,
                        border: `1px solid ${exp.color}30`,
                      }}
                    >
                      <Icon size={14} style={{ color: exp.color }} />
                    </div>
                    <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                      {exp.role}
                    </h3>
                  </div>

                  <p className="text-xs font-semibold mb-2" style={{ color: exp.color }}>
                    {exp.org}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
