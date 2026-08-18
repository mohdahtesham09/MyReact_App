import React, { useState, useRef, useEffect } from "react";
import {
  X, Send, Bot, User, Trash2, Sparkles, RefreshCw, Mic, MicOff, Volume2, VolumeX, FileText, Plus, ArrowRight
} from "lucide-react";
import { RESUME_VIEW_URL, CONTACT_EMAIL } from "../config";
import { generateClientAIResponse } from "../utils/aiKnowledgeEngine";

// ── Initial Suggestion Prompts ────────────────────────────────────────────────
const SUGGESTIONS = [
  "What projects has Ahtesham built?",
  "What is his tech stack?",
  "Tell me about his GenAI work.",
  "Show his resume.",
  "How can I hire him?",
];

// ── Link Click Handler (Smooth Anchor Scroll) ─────────────────────────────────
const handleLinkClick = (e, url, onClose) => {
  if (url.startsWith("#")) {
    e.preventDefault();
    const id = url.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      if (onClose) onClose();
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }
};

// ── Inline Markdown Renderer ──────────────────────────────────────────────────
const parseInlineMd = (text, onClose) => {
  if (!text) return null;
  const regex = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)/g;
  const tokens = [];
  let last = 0, m, key = 0;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) tokens.push(text.slice(last, m.index));
    if (m[1]) {
      const label = m[2];
      const url = m[3];
      const isInternal = url.startsWith("#");
      const isResume = url.includes("drive.google") || url.includes("resume");

      tokens.push(
        <a
          key={key++}
          href={url}
          target={isInternal ? "_self" : "_blank"}
          rel="noopener noreferrer"
          onClick={(e) => handleLinkClick(e, url, onClose)}
          className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded transition-all text-xs my-0.5"
          style={{
            backgroundColor: isInternal ? "rgba(124,108,252,0.12)" : "rgba(34,211,238,0.12)",
            color: isInternal ? "var(--accent-primary)" : "var(--accent-secondary)",
            border: `1px solid ${isInternal ? "rgba(124,108,252,0.25)" : "rgba(34,211,238,0.25)"}`,
            textDecoration: "none",
          }}
        >
          {isResume && <FileText size={12} />}
          {label}
          {isInternal && <ArrowRight size={11} />}
        </a>
      );
    } else if (m[4]) {
      tokens.push(<strong key={key++} style={{ color: "var(--text-primary)" }}>{m[5]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push(text.slice(last));
  return tokens;
};

const renderFormattedText = (text, onClose) => {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ");
    const isNumbered = /^\d+\.\s/.test(trimmed);
    const clean = isBullet ? trimmed.slice(2) : isNumbered ? trimmed.replace(/^\d+\.\s/, "") : line;
    const parsed = parseInlineMd(clean, onClose);

    if (!trimmed) return <div key={i} className="h-2" />;
    if (isBullet) {
      return (
        <div key={i} className="flex items-start gap-2 my-1 pl-1">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent-primary)" }} />
          <div className="flex-1 leading-relaxed">{parsed}</div>
        </div>
      );
    }
    if (isNumbered) {
      return (
        <div key={i} className="flex items-start gap-2 my-1 pl-1">
          <span className="flex-shrink-0 text-xs font-bold" style={{ color: "var(--accent-primary)" }}>
            {trimmed.match(/^\d+/)[0]}.
          </span>
          <div className="flex-1 leading-relaxed">{parsed}</div>
        </div>
      );
    }
    return <div key={i} className="my-1 leading-relaxed">{parsed}</div>;
  });
};

// ── Main Immersive Claude-Inspired AI Workspace Modal ─────────────────────────
const AIChatModal = ({ isOpen, onClose }) => {
  const initialMessages = [
    {
      role: "assistant",
      content: `Hi! I'm **Ahtesham's AI Assistant**.\n\nAsk me anything about his **skills**, **projects** (Atomic AI, MediaStack, SmailyZo), **GenAI work**, **freelance services**, or **resume**.\n\nWhat would you like to explore?`,
    },
  ];

  // Load from sessionStorage if available
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("portfolio_ai_history");
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialMessages;
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Save to sessionStorage on message update
  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_ai_history", JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) setVoiceSupported(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Voice Input (STT) Handler
  const handleVoiceInput = () => {
    setMicError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SR) {
      setMicError("Speech recognition is not supported in this browser.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;

      setIsListening(true);

      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        if (e.error === "not-allowed" || e.error === "service-not-allowed") {
          setMicError("Microphone permission denied. Please allow microphone access.");
        } else if (e.error !== "no-speech") {
          setMicError(`Voice error: ${e.error}`);
        }
      };

      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (err) {
      setIsListening(false);
      setMicError("Could not start voice recognition.");
    }
  };

  // Text-To-Speech (TTS) Handler
  const handleSpeak = (text, idx) => {
    if (!window.speechSynthesis) return;
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      return;
    }

    window.speechSynthesis.cancel();
    const plain = text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_#]/g, "");

    const utterance = new SpeechSynthesisUtterance(plain);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  // Main Send Handler with Fail-Safe Offline Fallback Engine
  const handleSend = async (textOverride) => {
    const query = (textOverride || input).trim();
    if (!query || loading) return;

    const userMsg = { role: "user", content: query };
    const updated = [...messages, userMsg];
    setMessages([...updated, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    setMicError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });

      if (!response.ok || !response.body) throw new Error("API call failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let receivedAnyChunk = false;

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
            if (parsed.chunk) {
              receivedAnyChunk = true;
              setMessages((prev) => {
                const arr = [...prev];
                const last = arr.length - 1;
                if (arr[last]?.role === "assistant") {
                  arr[last] = { ...arr[last], content: arr[last].content + parsed.chunk };
                }
                return arr;
              });
              chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }
          } catch {}
        }
      }

      if (!receivedAnyChunk) throw new Error("Empty response stream");
    } catch (err) {
      // Graceful fallback using local AI Knowledge Engine
      const fallbackText = generateClientAIResponse(query);

      setMessages((prev) => {
        const arr = [...prev];
        const last = arr.length - 1;
        if (arr[last]?.role === "assistant") {
          arr[last] = { ...arr[last], content: fallbackText };
        }
        return arr;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingIdx(null);
    setMessages(initialMessages);
    try {
      sessionStorage.removeItem("portfolio_ai_history");
    } catch {}
  };

  return (
    <>
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md animate-fadeInFast"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Large Immersive Centered Workspace Modal (Desktop) / Fullscreen (Mobile) */}
      <div
        className="fixed z-50 inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:max-w-4xl h-full md:h-[86vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: "var(--radius-2xl, 20px)",
        }}
        role="dialog"
        aria-label="Ahtesham AI Workspace"
        aria-modal="true"
      >
        {/* ── Header Bar ── */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            borderBottom: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
              style={{
                backgroundColor: "rgba(124,108,252,0.15)",
                border: "1px solid rgba(124,108,252,0.25)",
              }}
            >
              <Bot size={20} style={{ color: "var(--accent-primary)" }} />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                Ahtesham AI
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                  style={{
                    backgroundColor: "rgba(52,211,153,0.12)",
                    color: "#34D399",
                    border: "1px solid rgba(52,211,153,0.20)",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulseDot" /> Online
                </span>
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Portfolio Assistant · Verified Information Only
              </p>
            </div>
          </div>

          {/* Top Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="btn btn-ghost text-xs hidden sm:flex items-center gap-1.5"
              style={{ padding: "6px 12px" }}
              title="Start New Chat"
            >
              <Plus size={14} /> New Chat
            </button>
            <button
              onClick={handleNewChat}
              className="p-2 rounded-lg transition-all"
              style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-overlay)" }}
              title="Clear Conversation"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-all"
              style={{ color: "var(--text-muted)", backgroundColor: "var(--bg-overlay)" }}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Conversation Body ── */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 sm:gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              {/* Assistant Avatar */}
              {msg.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    backgroundColor: "rgba(124,108,252,0.15)",
                    border: "1px solid rgba(124,108,252,0.25)",
                  }}
                >
                  <Bot size={16} style={{ color: "var(--accent-primary)" }} />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                  msg.role === "user" ? "rounded-tr-xs" : "rounded-tl-xs"
                }`}
                style={
                  msg.role === "user"
                    ? { backgroundColor: "var(--text-primary)", color: "var(--text-inverted)", fontWeight: 500 }
                    : {
                        backgroundColor: "var(--bg-elevated)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                      }
                }
              >
                {/* Typing Indicator */}
                {loading && idx === messages.length - 1 && msg.role === "assistant" && !msg.content && (
                  <div className="typing-indicator py-1">
                    <span /><span /><span />
                  </div>
                )}

                {renderFormattedText(msg.content, onClose)}

                {/* TTS Control for AI Messages */}
                {msg.role === "assistant" && msg.content && !loading && (
                  <div className="mt-3 pt-2 flex items-center justify-between" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      Ahtesham AI Response
                    </span>
                    <button
                      onClick={() => handleSpeak(msg.content, idx)}
                      className="flex items-center gap-1.5 text-[10.5px] font-medium transition-all"
                      style={{ color: speakingIdx === idx ? "var(--accent-primary)" : "var(--text-muted)" }}
                      title={speakingIdx === idx ? "Stop Audio" : "Listen to Response"}
                    >
                      {speakingIdx === idx ? <VolumeX size={12} /> : <Volume2 size={12} />}
                      {speakingIdx === idx ? "Stop" : "Speak"}
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.role === "user" && (
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    backgroundColor: "var(--bg-overlay)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <User size={16} style={{ color: "var(--text-secondary)" }} />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* ── Suggestions Row ── */}
        <div
          className="px-4 sm:px-6 py-2.5 shrink-0 overflow-x-auto"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-elevated)",
          }}
        >
          <div className="flex items-center gap-2 w-max">
            <span className="text-[10.5px] font-semibold flex items-center gap-1 shrink-0" style={{ color: "var(--text-muted)" }}>
              <Sparkles size={11} style={{ color: "var(--accent-warm)" }} /> Suggested:
            </span>
            {SUGGESTIONS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="text-[11px] px-3 py-1 rounded-full shrink-0 transition-all font-medium"
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-mid)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* ── Input Bar ── */}
        <div
          className="p-4 sm:p-5 shrink-0"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            backgroundColor: "var(--bg-surface)",
          }}
        >
          {micError && (
            <div className="mb-2 text-[11px] font-medium text-rose-400 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
              <span>{micError}</span>
              <button onClick={() => setMicError("")}><X size={12} /></button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3"
          >
            <div className="ai-ask-bar flex-1" style={{ borderRadius: "var(--radius-xl, 16px)" }}>
              {voiceSupported && (
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className="p-2 rounded-full flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: isListening ? "rgba(124,108,252,0.2)" : "var(--bg-elevated)",
                    color: isListening ? "var(--accent-primary)" : "var(--text-muted)",
                    border: `1px solid ${isListening ? "rgba(124,108,252,0.35)" : "var(--border-subtle)"}`,
                  }}
                  aria-label={isListening ? "Stop listening" : "Start voice input"}
                  title={isListening ? "Listening... Click to stop" : "Voice input"}
                >
                  {isListening ? <Mic size={15} className="animate-pulseDot" /> : <Mic size={15} />}
                </button>
              )}

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening... Speak now" : "Ask about Ahtesham's skills, projects, resume..."}
                disabled={loading}
                className="text-xs sm:text-sm"
                aria-label="Chat query input"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded-full flex-shrink-0 transition-all"
                style={{
                  backgroundColor: input.trim() && !loading ? "var(--accent-primary)" : "var(--bg-elevated)",
                  color: input.trim() && !loading ? "#fff" : "var(--text-muted)",
                }}
                aria-label="Send message"
              >
                {loading ? <RefreshCw size={15} className="animate-spin" /> : <Send size={15} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIChatModal;
