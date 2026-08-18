import express from 'express';
import Groq from 'groq-sdk';
import { knowledgeBase } from '../data/knowledgeBase.js';

const router = express.Router();

const RESUME_VIEW_LINK = "https://drive.google.com/file/d/1GSbzaLSAi-FO-MsoQA516f76JO-P6Pvl/view";
const CONTACT_EMAIL = "fsdahtesham@gmail.com";

// Server-side knowledge fallback generator
function generateFallbackResponse(userMessage) {
  const q = (userMessage || "").toLowerCase().trim();

  // 1. Off-topic / Unrelated Questions
  const isOffTopic =
    q.includes("capital of france") ||
    q.includes("who is president") ||
    q.includes("write python code") ||
    q.includes("write java code") ||
    q.includes("solve math") ||
    q.includes("tell me a joke") ||
    q.includes("what is 2+") ||
    q.includes("weather") ||
    q.includes("recipe") ||
    (q.length > 5 && !q.includes("ahtesham") && !q.includes("project") && !q.includes("skill") && !q.includes("stack") && !q.includes("resume") && !q.includes("cv") && !q.includes("contact") && !q.includes("hire") && !q.includes("ai") && !q.includes("backend") && !q.includes("frontend") && !q.includes("experience") && !q.includes("education") && !q.includes("freelance") && !q.includes("node") && !q.includes("react") && !q.includes("fastapi") && !q.includes("n8n") && !q.includes("vapi") && !q.includes("atomic") && !q.includes("mediastack") && !q.includes("smailyzo") && !q.includes("ledger") && !q.includes("who are you") && !q.includes("hi") && !q.includes("hello") && !q.includes("hey"));

  if (isOffTopic) {
    return `I'm Ahtesham's portfolio assistant. I can help you with his projects, skills, experience, resume, and services.\n\n` +
      `**Suggested questions:**\n` +
      `* What projects has Ahtesham built?\n` +
      `* What is his tech stack?\n` +
      `* Can I see his resume?\n` +
      `* How can I contact him?`;
  }

  // 2. Unverified Company / Employment History / Salary
  if (
    q.includes("company he worked for") ||
    q.includes("past employment") ||
    q.includes("work history") ||
    q.includes("previous job") ||
    q.includes("employer") ||
    q.includes("salary") ||
    q.includes("certification")
  ) {
    return `I don't have that information in Ahtesham's portfolio.\n\n` +
      `You can check his verified projects and skills:\n` +
      `* **[View Projects](#projects)**\n` +
      `* **[View Resume](${RESUME_VIEW_LINK})**`;
  }

  // 3. Resume Query
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("download resume") ||
    q.includes("see his resume") ||
    q.includes("view resume") ||
    q.includes("download")
  ) {
    return `You can view and download Ahtesham's latest resume here:\n\n` +
      `**[View Resume](${RESUME_VIEW_LINK})**`;
  }

  // 4. Contact / Hire Query (NO mailto popup trigger!)
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("email") ||
    q.includes("work with him") ||
    q.includes("send message")
  ) {
    return `You can contact Mohd Ahtesham directly:\n\n` +
      `* **Email:** ${CONTACT_EMAIL}\n` +
      `* **Location:** Gonda, UP, India\n\n` +
      `**[Go to Contact](#contact)** · **[View Freelance Services](#freelance)**`;
  }

  // 5. Tech Stack Query
  if (
    q.includes("tech stack") ||
    q.includes("technologies") ||
    q.includes("skills") ||
    q.includes("good at") ||
    q.includes("fastapi")
  ) {
    return `**Mohd Ahtesham's verified Technical Stack:**\n\n` +
      `* **Frontend:** React.js, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5/CSS3, Framer Motion\n` +
      `* **Backend:** Node.js, Express.js, FastAPI, REST APIs, JWT Authentication\n` +
      `* **Databases:** MongoDB, PostgreSQL, Redis\n` +
      `* **AI & GenAI:** LLMs, RAG Architecture, Groq API, OpenAI API, LangChain, AI Agents\n` +
      `* **Automation:** n8n Workflows, Vapi Voice AI, Webhooks\n` +
      `* **DevOps:** Git, GitHub, Docker, Postman\n\n` +
      `**[View Skills](#skills)** · **[View Projects](#projects)**`;
  }

  // 6. Projects Query
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("portfolio work") ||
    q.includes("show me") ||
    q.includes("atomic") ||
    q.includes("mediastack") ||
    q.includes("smailyzo")
  ) {
    return `**Mohd Ahtesham has built several verified projects:**\n\n` +
      `* **MediaStack** — Multi-user content & blogging platform built with React, Node, Express, MongoDB, and Tailwind CSS.\n` +
      `* **Atomic AI** — Full-stack AI application with Groq LLM integration and vector RAG context retrieval.\n` +
      `* **SmailyZo** — AI appointment system for dental clinics combining Vapi Voice AI and n8n webhooks.\n` +
      `* **Backend Ledger System** — Secure financial ledger API with JWT auth and audit trails.\n\n` +
      `**[View Projects](#projects)**`;
  }

  // Default Fallback
  return `**Mohd Ahtesham** is a **Full Stack Developer** specializing in building web applications, REST APIs, AI integrations, and automation workflows.\n\n` +
    `Ask me about:\n` +
    `* **Projects** (Atomic AI, MediaStack, SmailyZo, Backend Ledger)\n` +
    `* **Tech Stack** (React, Node.js, FastAPI, Groq, n8n)\n` +
    `* **Resume** & how to **contact** him!\n\n` +
    `**[View Projects](#projects)** · **[View Resume](${RESUME_VIEW_LINK})**`;
}

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request. Messages array is required.' });
  }

  const lastUserMessage = messages[messages.length - 1]?.content || '';
  const rawKey = process.env.GROQ_API_KEY || '';
  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();

  // Set SSE response headers for real-time streaming
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendFallbackStream = (replyText) => {
    const chunkSize = 25;
    let i = 0;
    const interval = setInterval(() => {
      if (i < replyText.length) {
        const chunk = replyText.slice(i, i + chunkSize);
        res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        i += chunkSize;
      } else {
        clearInterval(interval);
        res.write(`data: [DONE]\n\n`);
        res.end();
      }
    }, 15);
  };

  if (!apiKey) {
    const reply = generateFallbackResponse(lastUserMessage);
    return sendFallbackStream(reply);
  }

  try {
    const groq = new Groq({ apiKey });
    const modelName = (process.env.GROQ_MODEL || 'llama-3.3-70b-versatile').trim();

    const systemPrompt = `You are Mohd Ahtesham's professional portfolio AI assistant.

CRITICAL ASSISTANT RULES:
1. SCOPE: You ONLY answer questions related to Mohd Ahtesham (his projects, skills, experience, education, tech stack, GenAI work, freelance services, resume, contact info).
2. OFF-TOPIC QUESTIONS: If asked non-portfolio or general knowledge questions (e.g., capital of France, writing random code, weather, general math), refuse politely:
   "I'm Ahtesham's portfolio assistant. I can help you with his projects, skills, experience, resume and services."
3. FACTUAL ACCURACY: NEVER invent, infer, or hallucinate companies, jobs, clients, salary, certifications, or experience NOT present in the verified data. If information is missing, say: "I don't have that information in Ahtesham's portfolio."
4. CONTACT NAVIGATION: When user asks to contact or hire Ahtesham, respond: "You can reach Ahtesham through the contact section below:\n\n[Go to Contact](#contact)" (DO NOT output mailto links!).
5. RESUME LINK: When user asks for resume, respond: "You can view Ahtesham's resume here:\n\n[View Resume](${RESUME_VIEW_LINK})"
6. ACTION LINKS: Include internal anchor links where helpful: [View Projects](#projects), [View Skills](#skills), [View Freelance Services](#freelance), [Go to Contact](#contact).

VERIFIED PORTFOLIO DATA:
${JSON.stringify(knowledgeBase, null, 2)}`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }))
    ];

    const stream = await groq.chat.completions.create({
      messages: formattedMessages,
      model: modelName,
      temperature: 0.2,
      max_tokens: 750,
      stream: true
    });

    let isThinking = false;

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (!content) continue;

      if (content.includes('<think>')) { isThinking = true; continue; }
      if (content.includes('</think>')) { isThinking = false; continue; }
      if (isThinking) continue;

      res.write(`data: ${JSON.stringify({ chunk: content })}\n\n`);
    }

    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('=== GROQ STREAM ERROR ===', error.message);
    const fallbackReply = generateFallbackResponse(lastUserMessage);
    return sendFallbackStream(fallbackReply);
  }
});

export default router;
