import React, { useState } from "react";
import { Mail, MapPin, Send, Linkedin, Github, Instagram, MessageSquare, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from "../config";

const Contact = ({ onOpenAIChat }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const serviceId = "service_mx64ife";
    const templateId = "template_jz6f27d";
    const publicKey = "F3IjEdxdYF8RoEROh";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: CONTACT_EMAIL,
        },
        publicKey
      );

      try {
        const googleSheetUrl =
          "https://script.google.com/macros/s/AKfycbwf8v1FDCrexgG85OkW1n8hhnvrF6gNGQ5TP30vM622xe9PCEVGBhAv5XfyHhDP_VQK/exec";
        fetch(googleSheetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (err) {}

      setStatus({ type: "success", message: "Message sent successfully! I'll get back to you shortly." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: `Could not send message. Please email ${CONTACT_EMAIL} directly.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20" style={{ backgroundColor: "var(--bg-base)" }}>
      <div className="section-container">
        {/* Banner CTA */}
        <div
          className="card p-8 sm:p-12 text-center mb-12 relative overflow-hidden"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-mid)",
          }}
        >
          {/* Subtle glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-36 rounded-full blur-[90px] pointer-events-none"
            style={{ backgroundColor: "var(--accent-primary)", opacity: 0.12 }}
          />

          <h2 className="text-2xl sm:text-4xl font-bold mb-3 relative z-10" style={{ color: "var(--text-primary)" }}>
            Let's build something useful.
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8 relative z-10" style={{ color: "var(--text-secondary)" }}>
            Open for Full Stack Developer roles, GenAI opportunities, and freelance projects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="btn btn-primary text-xs"
              style={{ padding: "10px 22px" }}
            >
              <Mail size={14} /> Email Me
            </a>
            <a
              href="#contact-form"
              className="btn btn-secondary text-xs"
              style={{ padding: "10px 22px" }}
            >
              Hire Me <ArrowRight size={14} />
            </a>
            <button
              onClick={onOpenAIChat}
              className="btn btn-accent text-xs"
              style={{ padding: "10px 22px" }}
            >
              <MessageSquare size={14} /> Ask AI Assistant
            </button>
          </div>
        </div>

        {/* Contact Form & Info Grid */}
        <div id="contact-form" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between card p-6">
            <div>
              <p className="section-label mb-1">Direct Contact</p>
              <h3 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Get In Touch
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="p-3 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "rgba(34,211,238,0.12)",
                      border: "1px solid rgba(34,211,238,0.25)",
                      color: "var(--accent-secondary)",
                    }}
                  >
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-sm font-semibold transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div
                    className="p-3 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "rgba(124,108,252,0.12)",
                      border: "1px solid rgba(124,108,252,0.25)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
                      Location
                    </p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      Gonda, Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="pt-6 mt-8 border-t flex items-center gap-3" style={{ borderColor: "var(--border-subtle)" }}>
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
                  className="p-2.5 rounded-xl transition-all"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                  title={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 card p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[11px] font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
              </div>

              {status.message && (
                <div
                  className="p-3 rounded-xl text-xs font-medium"
                  style={{
                    backgroundColor:
                      status.type === "success" ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)",
                    color: status.type === "success" ? "#34D399" : "#F87171",
                    border: `1px solid ${status.type === "success" ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                  }}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3 text-xs"
              >
                {loading ? "Sending Message..." : "Send Message"}
                {!loading && <Send size={14} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
