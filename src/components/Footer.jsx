import React from "react";
import { Lock, Github, Linkedin, Mail, Sun, Moon, FileText } from "lucide-react";
import { RESUME_VIEW_URL, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "../config";

const Footer = ({ onOpenAdminLogin, isAdminLoggedIn, onOpenAdminDashboard, theme, toggleTheme }) => {
  return (
    <footer
      className="py-10 border-t"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-subtle)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Identity */}
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
              Ahtesham
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Full Stack Developer · AI Applications & Automation
            </p>
          </div>

          {/* Socials & Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Github size={14} /> GitHub
            </a>
            <span style={{ color: "var(--border-subtle)" }}>·</span>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <span style={{ color: "var(--border-subtle)" }}>·</span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Mail size={14} /> Email
            </a>
            <span style={{ color: "var(--border-subtle)" }}>·</span>
            <a
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold transition-colors"
              style={{ color: "var(--accent-primary)" }}
            >
              <FileText size={14} /> Resume
            </a>
          </div>

          {/* Theme switcher & Admin link */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all flex items-center gap-1.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
            </button>

            <span style={{ color: "var(--border-subtle)" }}>|</span>

            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="text-xs font-semibold hover:underline"
                style={{ color: "#34D399" }}
              >
                CMS Dashboard
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-1.5 rounded transition-colors flex items-center gap-1 text-xs"
                style={{ color: "var(--text-muted)" }}
                title="Admin Login"
              >
                <Lock size={12} /> Admin
              </button>
            )}
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center text-[11px]"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} Mohd Ahtesham. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
