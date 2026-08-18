import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Lock, Sun, Moon, MessageSquare, FileText, Sparkles } from "lucide-react";
import { RESUME_VIEW_URL } from "../config";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Freelance", href: "#freelance" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const Navbar = ({ onOpenAIChat, onOpenAdminLogin, isAdminLoggedIn, onOpenAdminDashboard, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);

  // Scroll detection for navbar glass effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Active section tracker via IntersectionObserver
  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "freelance", "experience", "contact"];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topEntry = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          );
          setActiveSection(topEntry.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  const isActive = (href) => activeSection === href.replace("#", "");

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "border-b"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(var(--bg-surface-rgb, 17,21,32), 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        borderColor: scrolled ? "var(--border-subtle)" : "transparent",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
        background: scrolled
          ? `color-mix(in srgb, var(--bg-surface) 92%, transparent)`
          : "transparent",
      }}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 font-semibold text-sm tracking-tight shrink-0 transition-opacity hover:opacity-75"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--accent-primary)", color: "#fff" }}
            >
              A
            </span>
            <span>Mohd Ahtesham</span>
          </a>

          {/* Center Navigation */}
          <div
            className="hidden lg:flex items-center rounded-full px-1 py-1 gap-0.5"
            style={{
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-[11.5px] font-medium transition-all duration-200"
                style={{
                  color: isActive(link.href) ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive(link.href) ? "var(--bg-overlay)" : "transparent",
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all"
              style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Admin */}
            {isAdminLoggedIn ? (
              <button
                onClick={onOpenAdminDashboard}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all"
                style={{ backgroundColor: "rgba(52,211,153,0.10)", color: "#34D399", border: "1px solid rgba(52,211,153,0.20)" }}
              >
                CMS
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 rounded-full transition-all"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border-subtle)", backgroundColor: "var(--bg-elevated)" }}
                title="Admin"
              >
                <Lock size={12} />
              </button>
            )}

            {/* Resume */}
            <a
              href={RESUME_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-[11px]"
              style={{ padding: "7px 14px" }}
            >
              <FileText size={12} />
              Resume
            </a>

            {/* AI Chat */}
            <button
              onClick={onOpenAIChat}
              className="btn btn-accent text-[11px]"
              style={{ padding: "7px 14px" }}
            >
              <Sparkles size={12} />
              Ask AI
            </button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full"
              style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button
              onClick={onOpenAIChat}
              className="p-2 rounded-full"
              style={{ color: "var(--accent-primary)", backgroundColor: "rgba(124,108,252,0.10)", border: "1px solid rgba(124,108,252,0.20)" }}
            >
              <MessageSquare size={14} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full transition-all"
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="lg:hidden animate-fadeIn border-t"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}
        >
          <div className="section-container py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive(link.href) ? "var(--bg-elevated)" : "transparent",
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-3 flex gap-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
              <a
                href={RESUME_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex-1 text-[11px]"
              >
                <FileText size={12} /> Resume
              </a>
              <button
                onClick={() => { onOpenAIChat(); setIsOpen(false); }}
                className="btn btn-accent flex-1 text-[11px]"
              >
                <Sparkles size={12} /> Ask AI
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
