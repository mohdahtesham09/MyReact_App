import React, { useEffect, useRef } from "react";
import { roadmapStages, valueProps } from "../data/portfolioData";
import { CheckCircle2, ArrowRight, Sparkles, Layers, Server, Cpu, Rocket, ShieldCheck } from "lucide-react";

const stageIcons = [Layers, Server, Cpu, Rocket];

const EngineeringGrowthRoadmap = () => {
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
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="roadmap"
      className="py-16 sm:py-20"
      style={{ backgroundColor: "var(--bg-base)" }}
      ref={sectionRef}
    >
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-14 reveal">
          <p className="section-label">Growth & Impact</p>
          <h2 className="section-heading">My Engineering skills Track</h2>
          <p className="text-sm mt-2 max-w-xl" style={{ color: "var(--text-muted)" }}>
            Where I am → What I can contribute → Where I am heading
          </p>
        </div>

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative mb-16">
          {/* Horizontal Line Connector (Desktop) */}
          <div
            className="hidden lg:block absolute left-12 right-12 top-10 h-0.5 rounded-full z-0"
            style={{
              background: "linear-gradient(to right, var(--accent-secondary), var(--accent-primary), var(--accent-warm))",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
            {roadmapStages.map((stage, idx) => {
              const Icon = stageIcons[idx] || Layers;
              const isDestination = stage.status === "destination";

              return (
                <div
                  key={stage.step}
                  className={`card p-6 flex flex-col justify-between reveal stagger-${idx + 1} transition-all duration-300 ${
                    isDestination ? "ring-2" : ""
                  }`}
                  style={{
                    backgroundColor: isDestination ? "var(--bg-elevated)" : "var(--bg-surface)",
                    borderColor: isDestination ? "var(--accent-warm)" : "var(--border-subtle)",
                    boxShadow: isDestination ? "0 0 24px rgba(245,158,11,0.12)" : "var(--shadow-sm)",
                  }}
                >
                  <div>
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs"
                        style={{
                          backgroundColor: `${stage.color}15`,
                          border: `1px solid ${stage.color}30`,
                          color: stage.color,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          backgroundColor: `${stage.color}12`,
                          color: stage.color,
                          border: `1px solid ${stage.color}25`,
                        }}
                      >
                        {stage.tag}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold mb-1" style={{ color: "var(--text-muted)" }}>
                      STAGE {stage.step}
                    </div>

                    <h3 className="text-base font-bold mb-2 leading-tight" style={{ color: "var(--text-primary)" }}>
                      {stage.title}
                    </h3>

                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {stage.desc}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <div className="flex flex-wrap gap-1.5">
                      {stage.tech.map((t) => (
                        <span key={t} className="ref-tech-pill text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Compact Sub-Section: What I Can Bring to a Company ── */}
        <div className="rounded-2xl p-6 sm:p-8 card reveal" style={{ backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-mid)" }}>
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={18} style={{ color: "var(--accent-primary)" }} />
            <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              What I Can Bring to a Company
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {valueProps.map((vp) => (
              <div
                key={vp.title}
                className="rounded-xl p-4 transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="w-1.5 h-6 rounded-full mb-3" style={{ backgroundColor: vp.color }} />
                <h4 className="text-xs font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {vp.title}
                </h4>
                <p className="text-[11px] font-semibold mb-2" style={{ color: vp.color }}>
                  {vp.subtitle}
                </p>
                <p className="text-[11.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {vp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringGrowthRoadmap;
