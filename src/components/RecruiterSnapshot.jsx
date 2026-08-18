import React from "react";
import { Briefcase, Code2, Brain, GraduationCap, ExternalLink, MapPin, Zap } from "lucide-react";
import { RESUME_VIEW_URL } from "../config";

const RecruiterSnapshot = () => {
  const info = [
    { label: "Role", value: "Full Stack / GenAI Developer" },
    { label: "Core Stack", value: "MERN · FastAPI · Python" },
    { label: "AI / GenAI", value: "RAG · Agents · Automation · LLMs" },
    { label: "Education", value: "BCA · 2025" },
    { label: "Location", value: "India · Remote-ready" },
  ];

  return (
    <section id="recruiters" className="py-8" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="section-container">
        <div
          className="rounded-2xl p-5 sm:p-6"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Left label */}
            <div className="shrink-0 lg:min-w-[160px]">
              <div className="flex items-center gap-2 mb-1">
                <Zap size={13} style={{ color: "var(--accent-primary)" }} />
                <h3 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                  Recruiter Snapshot
                </h3>
              </div>
              <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                5-second candidate summary
              </p>
            </div>

            {/* Divider */}
            <div
              className="hidden lg:block w-px h-12 shrink-0"
              style={{ backgroundColor: "var(--border-subtle)" }}
            />

            {/* Info grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {info.map((item) => (
                <div key={item.label}>
                  <p
                    className="text-[9.5px] uppercase tracking-wider font-semibold mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item.label}
                  </p>
                  <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Resume button */}
            <a
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shrink-0 text-[11px]"
            >
              <ExternalLink size={12} />
              View Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruiterSnapshot;
