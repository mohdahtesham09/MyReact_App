import React from "react";
import { Code2, Brain, Server, Workflow } from "lucide-react";

const reasons = [
  {
    title: "Full Stack Ownership",
    subtitle: "Frontend + Backend End-to-End",
    desc: "Complete capability from designing responsive React user interfaces to engineering secure REST APIs, databases, and authentication systems.",
    icon: Code2,
    color: "var(--accent-secondary)",
  },
  {
    title: "AI Engineering",
    subtitle: "Practical GenAI Systems",
    desc: "Hands-on integration of Groq, OpenAI APIs, vector RAG context retrieval, and custom AI chat interfaces directly into web applications.",
    icon: Brain,
    color: "var(--accent-primary)",
  },
  {
    title: "Backend & Scalability",
    subtitle: "Clean Architecture & APIs",
    desc: "Building structured APIs using Node.js, Express, and FastAPI with robust schema validation, JWT auth, and clean data modeling.",
    icon: Server,
    color: "#34D399",
  },
  {
    title: "AI Automation",
    subtitle: "Business Workflow Systems",
    desc: "Automating lead handling, CRM updates, and scheduling using n8n workflows, Vapi voice AI agents, and custom webhooks.",
    icon: Workflow,
    color: "var(--accent-warm)",
  },
];

const VibeCoding = () => {
  return (
    <section id="vibe" className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="section-container">
        <div className="mb-14 reveal">
          <p className="section-label">Value Proposition</p>
          <h2 className="section-heading">Why Choose Me</h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Concrete engineering capabilities that deliver measurable value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`card card-hover p-6 flex flex-col reveal stagger-${idx + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: `${item.color}15`,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>

                <h3 className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold mb-3" style={{ color: item.color }}>
                  {item.subtitle}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VibeCoding;
