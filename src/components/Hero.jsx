import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Github,
  Linkedin,
  FileText,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Bot,
  Loader2,
  Terminal,
  Cpu,
  Zap,
  Database,
  Globe,
  Code2,
} from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  RESUME_VIEW_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  CONTACT_EMAIL,
} from "../config";
import { generateClientAIResponse } from "../utils/aiKnowledgeEngine";

// ── AI Ask Bar Suggestion Chips ───────────────────────────────────────────────
const SUGGESTION_CHIPS = [
  { label: "View Projects", query: "What projects has Ahtesham built?" },
  {
    label: "Tech Stack",
    query: "What is his tech stack and strongest skills?",
  },
  {
    label: "GenAI Experience",
    query: "What AI and GenAI experience does he have?",
  },
  { label: "Resume", query: "Give me Ahtesham's resume." },
  { label: "Freelance", query: "Is he available for freelance work?" },
];

const handleAnchorClick = (e, url) => {
  if (url.startsWith("#")) {
    e.preventDefault();
    const id = url.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

// ── Inline markdown renderer ──────────────────────────────────────────────────
const renderMd = (text) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ");
    const content = isBullet ? trimmed.slice(2) : line;
    const parts = [];
    const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
    let last = 0;
    let m;
    while ((m = regex.exec(content)) !== null) {
      if (m.index > last) parts.push(content.slice(last, m.index));
      if (m[1]) {
        const label = m[2];
        const url = m[3];
        const isInternal = url.startsWith("#");
        parts.push(
          <a
            key={m.index}
            href={url}
            target={isInternal ? "_self" : "_blank"}
            rel='noopener noreferrer'
            onClick={(e) => handleAnchorClick(e, url)}
            className='underline font-semibold my-0.5'
            style={{
              color: isInternal
                ? "var(--accent-primary)"
                : "var(--accent-secondary)",
            }}
          >
            {label}
          </a>,
        );
      } else if (m[4]) {
        parts.push(
          <strong key={m.index} style={{ color: "var(--text-primary)" }}>
            {m[5]}
          </strong>,
        );
      }
      last = m.index + m[0].length;
    }
    if (last < content.length) parts.push(content.slice(last));
    if (!trimmed) return <div key={i} className='h-1.5' />;
    return isBullet ? (
      <div key={i} className='flex gap-2 my-0.5 pl-1'>
        <span style={{ color: "var(--accent-secondary)" }}>•</span>
        <div>{parts}</div>
      </div>
    ) : (
      <div key={i} className='my-0.5'>
        {parts}
      </div>
    );
  });
};

// ── Hero AI Workspace Visual (right panel) ────────────────────────────────────
const AIWorkspacePanel = () => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [nodeActive, setNodeActive] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setCursorVisible((v) => !v), 600);
    const t2 = setInterval(() => setNodeActive((n) => (n + 1) % 4), 1800);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  const nodes = [
    { label: "React UI", icon: Globe, color: "#22D3EE" },
    { label: "Node JS", icon: Terminal, color: "#34D399" },
    { label: "LLM / LangChain", icon: Cpu, color: "var(--accent-primary)" },
    { label: "MongoDB", icon: Database, color: "#F59E0B" },
  ];

  return (
    <div
      className='relative rounded-2xl overflow-hidden'
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      {/* Window chrome */}
      <div
        className='flex items-center justify-between px-4 py-3'
        style={{
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-elevated)",
        }}
      >
        <div className='flex items-center gap-2.5'>
          <div className='flex gap-1.5'>
            <span className='w-2.5 h-2.5 rounded-full bg-rose-500/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-amber-500/70' />
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-500/70' />
          </div>
          <span
            className='text-[10px] font-mono'
            style={{ color: "var(--text-muted)" }}
          >
            ahtesham.dev
          </span>
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseDot' />
          <span className='text-[9px] font-medium text-emerald-400'>
            online
          </span>
        </div>
      </div>

      {/* Code editor area */}
      <div
        className='p-4 font-mono text-[10.5px] leading-[1.7]'
        style={{
          backgroundColor: "var(--bg-input)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          <span style={{ color: "#c792ea" }}>const</span>{" "}
          <span style={{ color: "#82aaff" }}>developer</span> = {"{"}
        </div>
        <div className='pl-4'>
          <span style={{ color: "#c3e88d" }}>name</span>:{" "}
          <span style={{ color: "#f78c6c" }}>"Mohd Ahtesham"</span>,
        </div>
        <div className='pl-4'>
          <span style={{ color: "#c3e88d" }}>role</span>:{" "}
          <span style={{ color: "#f78c6c" }}>"Full Stack & AI Dev"</span>,
        </div>
        <div className='pl-4'>
          <span style={{ color: "#c3e88d" }}>stack</span>: [
          <span style={{ color: "#f78c6c" }}>"React"</span>,{" "}
          <span style={{ color: "#f78c6c" }}>"Node"</span>,{" "}
          <span style={{ color: "#f78c6c" }}>"FastAPI"</span>],
        </div>
        <div className='pl-4'>
          <span style={{ color: "#c3e88d" }}>ai</span>: [
          <span style={{ color: "#f78c6c" }}>"Groq"</span>,{" "}
          <span style={{ color: "#f78c6c" }}>"OpenAI"</span>,{" "}
          <span style={{ color: "#f78c6c" }}>"RAG"</span>,{" "}
          <span style={{ color: "#f78c6c" }}>"n8n"</span>],
        </div>
        <div className='pl-4'>
          <span style={{ color: "#c3e88d" }}>status</span>:{" "}
          <span style={{ color: "#c3e88d" }}>"Available"</span>
          <span
            className='inline-block w-[2px] h-[12px] ml-0.5 align-middle'
            style={{
              backgroundColor: "var(--accent-secondary)",
              opacity: cursorVisible ? 1 : 0,
            }}
          />
        </div>
        <div>{"}"}</div>
      </div>

      {/* Architecture nodes */}
      <div className='p-4'>
        <p
          className='text-[9px] font-semibold uppercase tracking-wider mb-3'
          style={{ color: "var(--text-muted)" }}
        >
          System Architecture
        </p>
        <div className='grid grid-cols-2 gap-2'>
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const active = nodeActive === i;
            return (
              <div
                key={node.label}
                className='flex items-center gap-2 rounded-lg px-2.5 py-2 transition-all duration-500'
                style={{
                  backgroundColor: active
                    ? `${node.color}14`
                    : "var(--bg-elevated)",
                  border: `1px solid ${active ? `${node.color}40` : "var(--border-subtle)"}`,
                }}
              >
                <Icon
                  size={12}
                  style={{ color: active ? node.color : "var(--text-muted)" }}
                />
                <span
                  className='text-[10px] font-medium'
                  style={{
                    color: active ? node.color : "var(--text-secondary)",
                  }}
                >
                  {node.label}
                </span>
                {active && (
                  <span
                    className='ml-auto w-1.5 h-1.5 rounded-full animate-pulseDot'
                    style={{ backgroundColor: node.color }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Status bar */}
        <div
          className='mt-3 rounded-lg px-3 py-2 flex items-center gap-2'
          style={{
            backgroundColor: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <Terminal size={10} style={{ color: "var(--accent-secondary)" }} />
          <span
            className='text-[9.5px] font-mono'
            style={{ color: "var(--text-muted)" }}
          >
            npm run dev
          </span>
          <span className='ml-auto text-[9px] font-medium text-emerald-400 flex items-center gap-1'>
            <span className='w-1 h-1 rounded-full bg-emerald-400 animate-pulseDot' />{" "}
            Running
          </span>
        </div>

        {/* Tech pills */}
        <div className='flex flex-wrap gap-1.5 mt-3'>
          {["React", "Node.js", "FastAPI", "Groq API", "n8n", "RAG"].map(
            (t) => (
              <span key={t} className='ref-tech-pill text-[9.5px]'>
                {t}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Hero Component ───────────────────────────────────────────────────────
const Hero = ({ onOpenAIChat }) => {
  const [askInput, setAskInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [hasAsked, setHasAsked] = useState(false);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handle = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 12);
      mouseY.set((e.clientY / innerHeight - 0.5) * 8);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  // Speech recognition setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) setVoiceSupported(true);
  }, []);

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    setIsListening(true);
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setAskInput(transcript);
      setIsListening(false);
      // Auto-submit after voice
      setTimeout(() => handleAsk(transcript), 300);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleAsk = useCallback(
    async (queryOverride) => {
      const query = (queryOverride || askInput).trim();
      if (!query || isStreaming) return;

      // Special case: resume query
      const isResumeQuery = /resume|cv|download/i.test(query);
      if (isResumeQuery) {
        setHasAsked(true);
        setAiResponse(
          `Here is Ahtesham's resume:\n\n**[View Resume](${RESUME_VIEW_URL})**\n\nClick the link above to open it in a new tab.`,
        );
        return;
      }

      setHasAsked(true);
      setAiResponse("");
      setIsStreaming(true);

      try {
        const ctrl = new AbortController();
        abortRef.current = ctrl;
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: query }],
          }),
          signal: ctrl.signal,
        });

        if (!response.ok || !response.body) throw new Error("Stream error");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.chunk) setAiResponse((prev) => prev + parsed.chunk);
            } catch {}
          }
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          const fallbackText = generateClientAIResponse(query);
          setAiResponse(fallbackText);
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [askInput, isStreaming],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAsk();
  };

  const handleChipClick = (chip) => {
    setAskInput(chip.query);
    handleAsk(chip.query);
  };

  return (
    <section
      id='home'
      className='min-h-screen flex items-center pt-20 pb-16 overflow-hidden relative'
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      {/* Ambient background gradients */}
      <div
        className='absolute top-0 left-0 w-full h-full pointer-events-none'
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 15% 25%, rgba(124,108,252,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 85% 70%, rgba(34,211,238,0.05) 0%, transparent 60%)
          `,
        }}
      />

      <div className='section-container w-full z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center'>
          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className='lg:col-span-7'
          >
            {/* Status badge */}
            <div className='status-pill mb-6 w-fit'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseDot' />
              Available for Full Stack & GenAI Opportunities
            </div>

            {/* Headline */}
            <h1
              className='text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.18] tracking-tight mb-5'
              style={{ color: "var(--text-primary)" }}
            >
              Full Stack Developer building{" "}
              <span style={{ color: "var(--accent-primary)" }}>
                scalable web applications
              </span>{" "}
              and{" "}
              <span style={{ color: "var(--accent-secondary)" }}>
                AI-powered products
              </span>
              .
            </h1>

            {/* Supporting text */}
            <p
              className='text-sm leading-relaxed max-w-xl mb-8'
              style={{ color: "var(--text-secondary)" }}
            >
              Building modern web applications, APIs, GenAI systems and
              AI-powered automation using technologies such as MERN, FastAPI and
              modern LLM tooling.
            </p>

            {/* ── AI ASK BAR + FULL CHAT ── */}
            <div className='mb-4'>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row gap-2.5'>
                  <div className='ai-ask-bar flex-1'>
                    <Bot
                      size={16}
                      style={{ color: "var(--accent-primary)", flexShrink: 0 }}
                    />
                    <input
                      ref={inputRef}
                      type='text'
                      value={askInput}
                      onChange={(e) => setAskInput(e.target.value)}
                      placeholder={
                        isListening
                          ? "Listening..."
                          : "Ask about my projects, skills, experience or resume..."
                      }
                      disabled={isStreaming}
                      aria-label='Ask about Ahtesham'
                    />
                    {voiceSupported && (
                      <button
                        type='button'
                        onClick={handleVoice}
                        className='p-2 rounded-full flex-shrink-0 transition-all'
                        style={{
                          backgroundColor: isListening
                            ? "rgba(124,108,252,0.2)"
                            : "var(--bg-elevated)",
                          color: isListening
                            ? "var(--accent-primary)"
                            : "var(--text-muted)",
                          border: `1px solid ${isListening ? "rgba(124,108,252,0.35)" : "var(--border-subtle)"}`,
                        }}
                        aria-label={
                          isListening ? "Stop listening" : "Start voice input"
                        }
                        title={
                          isListening ? "Stop listening" : "Use voice input"
                        }
                      >
                        {isListening ? (
                          <Mic size={14} className='animate-pulseDot' />
                        ) : (
                          <Mic size={14} />
                        )}
                      </button>
                    )}
                    <button
                      type='submit'
                      disabled={!askInput.trim() || isStreaming}
                      className='flex-shrink-0 p-2 rounded-full transition-all'
                      style={{
                        backgroundColor:
                          askInput.trim() && !isStreaming
                            ? "var(--accent-primary)"
                            : "var(--bg-elevated)",
                        color:
                          askInput.trim() && !isStreaming
                            ? "#fff"
                            : "var(--text-muted)",
                      }}
                      aria-label='Send question'
                    >
                      {isStreaming ? (
                        <Loader2 size={14} className='animate-spin' />
                      ) : (
                        <Send size={14} />
                      )}
                    </button>
                  </div>

                  {/* Full Chat Action Button */}
                  <button
                    type='button'
                    onClick={onOpenAIChat}
                    className='btn btn-accent text-[11.5px] shrink-0 h-[42px] px-4 rounded-full flex items-center justify-center gap-1.5 shadow-sm'
                    title='Open Full AI Workspace'
                  >
                    <Sparkles size={13} /> Full Chat
                  </button>
                </div>
              </form>

              {/* Suggestion chips */}
              {!hasAsked && (
                <div className='flex flex-wrap items-center gap-2 mt-3'>
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      onClick={() => handleChipClick(chip)}
                      className='btn btn-ghost text-[10.5px]'
                      style={{ padding: "5px 12px", borderRadius: "9999px" }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}

              {/* AI Response */}
              {hasAsked && (
                <div
                  className='mt-4 rounded-xl p-4 text-[12.5px] leading-relaxed animate-fadeIn'
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {isStreaming && !aiResponse && (
                    <div className='typing-indicator'>
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  <div style={{ color: "var(--text-secondary)" }}>
                    {renderMd(aiResponse)}
                  </div>
                  {!isStreaming && aiResponse && (
                    <div
                      className='mt-3 pt-3 flex items-center gap-3'
                      style={{ borderTop: "1px solid var(--border-subtle)" }}
                    >
                      <button
                        onClick={() => {
                          setHasAsked(false);
                          setAiResponse("");
                          setAskInput("");
                        }}
                        className='text-[10.5px]'
                        style={{ color: "var(--text-muted)" }}
                      >
                        Clear
                      </button>
                      <button
                        onClick={onOpenAIChat}
                        className='btn btn-accent text-[10.5px] ml-auto'
                        style={{ padding: "5px 12px" }}
                      >
                        <Sparkles size={11} /> Full AI Chat
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick links */}
            <div
              className='flex flex-wrap items-center gap-4 pt-5 mt-2 text-xs'
              style={{
                borderTop: "1px solid var(--border-subtle)",
                color: "var(--text-muted)",
              }}
            >
              <a
                href={GITHUB_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 transition-colors hover:text-[var(--text-primary)]'
                style={{ color: "var(--text-muted)" }}
              >
                <Github size={13} /> GitHub
              </a>
              <span style={{ color: "var(--border-mid)" }}>·</span>
              <a
                href={LINKEDIN_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 transition-colors'
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <Linkedin size={13} /> LinkedIn
              </a>
              <span style={{ color: "var(--border-mid)" }}>·</span>
              <a
                href={RESUME_VIEW_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-1.5 transition-colors'
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                <FileText size={13} /> Resume
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — AI Workspace Visual ── */}
          <motion.div
            className='lg:col-span-5 w-full'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ x: springX, y: springY }}
          >
            <AIWorkspacePanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
