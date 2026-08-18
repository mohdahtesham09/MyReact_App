import React, { useEffect, useRef } from "react";
import { Search, Compass, Code2, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Understand",
    desc: "Understand the problem, users, business objectives, and technical requirements.",
    icon: Search,
    color: "var(--accent-secondary)",
  },
  {
    num: "02",
    title: "Design",
    desc: "Plan the system architecture, REST APIs, database models, and AI workflows.",
    icon: Compass,
    color: "var(--accent-primary)",
  },
  {
    num: "03",
    title: "Build",
    desc: "Develop high-quality frontend, robust backend, and AI capabilities with clean code.",
    icon: Code2,
    color: "#34D399",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Test thoroughly, optimize performance, and deploy to production reliably.",
    icon: Rocket,
    color: "var(--accent-warm)",
  },
];

const EngineeringApproach = () => {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="approach"
      className="py-16 sm:py-20 border-y"
      style={{
        backgroundColor: "var(--bg-elevated)",
        borderColor: "var(--border-subtle)",
      }}
      ref={sectionRef}
    >
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto reveal">
          <p className="section-label justify-center">Workflow</p>
          <h2 className="section-heading">Engineering Approach</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            A disciplined 4-step process for turning concepts into production-ready software.
          </p>
        </div>

        {/* Process Cards - Desktop Horizontal Flow / Mobile Vertical */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`card p-6 flex flex-col justify-between relative group reveal stagger-${idx + 1}`}
                style={{
                  backgroundColor: "var(--bg-surface)",
                  borderColor: "var(--border-subtle)",
                }}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded-md"
                      style={{
                        backgroundColor: `${step.color}15`,
                        color: step.color,
                        border: `1px solid ${step.color}30`,
                      }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        color: step.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>

                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>

                  <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.desc}
                  </p>
                </div>

                {/* Connector Arrow for Desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <ArrowRight size={10} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringApproach;
