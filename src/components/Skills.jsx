import React, { useState, useRef, useEffect } from "react";
import { Layout, Server, Database, Brain, Workflow, Terminal, Code2 } from "lucide-react";
import { skillsGrouped } from "../data/portfolioData";

const categoryIcons = {
  "Frontend": Layout,
  "Backend": Server,
  "Databases & Caching": Database,
  "AI / GenAI": Brain,
  "Automation": Workflow,
  "Cloud / DevOps": Terminal,
  "Programming & Tools": Code2,
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
        }),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20" style={{ backgroundColor: "var(--bg-base)" }} ref={sectionRef}>
      <div className="section-container">
        <div className="mb-14 reveal">
          <p className="section-label">Capabilities</p>
          <h2 className="section-heading">Technical Arsenal</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Structured capabilities across full stack development, cloud engineering, and GenAI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsGrouped.map((cat, idx) => {
            const Icon = categoryIcons[cat.category] || Code2;
            return (
              <div
                key={cat.category}
                className={`card card-hover p-5 reveal stagger-${(idx % 4) + 1}`}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                  >
                    <Icon size={15} style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {cat.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tech-pill text-[10.5px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
