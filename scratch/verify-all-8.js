import { knowledgeBase } from '../server/data/knowledgeBase.js';

const RESUME_DOWNLOAD_LINK = "/resume.pdf";
const CONTACT_EMAIL = "fsdahtesham@gmail.com";

function generateFallbackResponse(userMessage) {
  const query = userMessage.toLowerCase();
  const info = knowledgeBase.personalInfo;
  const skills = knowledgeBase.skills;
  const projects = knowledgeBase.projects;
  const services = knowledgeBase.services;

  // 1. Resume Query / Download
  if (query.includes('resume') || query.includes('cv') || query.includes('download resume') || query.includes('see his resume') || query.includes('view resume') || query.includes('download')) {
    return `**Absolutely. You can download Ahtesham's latest resume here:**\n\n` +
      `**[Download Resume](${RESUME_DOWNLOAD_LINK})**`;
  }

  // 2. Unverified Company / Employment History Query
  if (query.includes('company he worked for') || query.includes('past employment') || query.includes('work history') || query.includes('previous job') || query.includes('employer') || query.includes('salary')) {
    return `That information isn't currently available in Ahtesham's portfolio.`;
  }

  // 3. Is he an AI Engineer? / Career positioning
  if (query.includes('is he an ai engineer') || query.includes('are you an ai engineer') || query.includes('ai engineer?')) {
    return `His current profile is **Full Stack Development with hands-on experience building AI-powered applications**. He is currently deepening his expertise in **AI Engineering and Generative AI**, with the long-term goal of moving into an **AI Engineer** role.`;
  }

  // 4. Atomic AI query specifically
  if (query.includes('atomic ai')) {
    return `**Atomic AI**\n` +
      `Full-stack AI platform demonstrating Groq LLM integration, RAG architecture, and intelligent workflow automation.\n\n` +
      `* **What it demonstrates:** Sub-second AI response latency, vector context retrieval, and full-stack state management.\n` +
      `* **Stack:** React · Node.js · Express · Groq API · RAG · Tailwind CSS\n` +
      `* **Why it matters:** Proves ability to embed high-performance AI features into production-ready web applications.\n\n` +
      `**[View Project](#projects)**`;
  }

  // 5. What can he build?
  if (query.includes('what can he build') || query.includes('what can ahtesham build') || query.includes('can build')) {
    return `**Ahtesham can build across three areas:**\n\n` +
      `**01 — Full Stack**\n` +
      `React applications, Node.js backends, REST APIs and database-driven systems.\n\n` +
      `**02 — AI-Powered Products**\n` +
      `LLM integrations, AI chatbots, RAG-based applications and intelligent web experiences.\n\n` +
      `**03 — Automation**\n` +
      `n8n workflows, lead qualification, appointment automation and API-driven business processes.\n\n` +
      `**Have a project in mind? [Start a conversation](#contact)**`;
  }

  // 6. Full Stack Candidate / Recruiter Fit
  if (query.includes('candidate') || query.includes('suitable') || query.includes('fit') || query.includes('full stack developer candidate') || query.includes('full stack role') || query.includes('recruiter')) {
    return `**Yes. His strongest fit is around modern full-stack development with React, Node.js, REST APIs and databases, backed by hands-on AI integration.**\n\n` +
      `* **MERN Architecture:** Strong experience building production web apps with React & Node/Express REST APIs.\n` +
      `* **Database & Auth:** Proficient in MongoDB/PostgreSQL schema design, JWT authentication, and role-based access.\n` +
      `* **AI & Automation Differentiator:** Practical integration of Groq/OpenAI APIs, Vapi Voice AI, and n8n webhooks.\n` +
      `* **CS & DSA Foundation:** BCA graduate with solid Data Structures, Algorithms, and OOP in Java and Python.\n\n` +
      `**[Download Resume](${RESUME_DOWNLOAD_LINK}) · [View Projects](#projects)**`;
  }

  // 7. Strongest Skills
  if (query.includes('strongest skill') || query.includes('strongest areas') || query.includes('skills') || query.includes('stack') || query.includes('good at')) {
    return `**Mohd Ahtesham's strongest areas are:**\n\n` +
      `* **Full Stack:** React, Node.js, Express, REST APIs, MongoDB/PostgreSQL\n` +
      `* **AI Integration:** LLM APIs, Groq, RAG, LangChain/LangGraph and AI-powered applications\n` +
      `* **Automation:** n8n workflows and API-based business automation\n` +
      `* **Engineering:** Docker, Redis, authentication, backend architecture and scalable APIs\n` +
      `* **CS Fundamentals:** Data Structures, Algorithms and OOP\n\n` +
      `**What stands out:** he combines full-stack engineering with AI integration rather than treating AI as a standalone chatbot layer.\n\n` +
      `**[Explore Projects](#projects)** · **[Download Resume](${RESUME_DOWNLOAD_LINK})**`;
  }

  // 8. AI Experience
  if (query.includes('ai experience') || query.includes('ai work') || query.includes('generative ai') || query.includes('ai project')) {
    return `**Ahtesham's AI experience focuses on building practical AI-powered applications:**\n\n` +
      `* **LLM & API Integrations:** Integrates Groq API, OpenAI API, and custom RAG workflows into web applications.\n` +
      `* **AI Voice & Booking:** Built SmailyZo, combining Vapi voice AI and n8n webhooks for automated call logging and CRM sync.\n` +
      `* **Workflow Automation:** Automated business processes using n8n, webhooks, and REST APIs.\n` +
      `* **Active Learning:** Currently deepening expertise in AI Engineering and Generative AI to transition toward a full AI Engineer role.\n\n` +
      `**Explore Atomic AI or SmailyZo to see his AI work in action.**`;
  }

  // 9. Contact / Hire
  if (query.includes('hire') || query.includes('contact') || query.includes('reach') || query.includes('email') || query.includes('linkedin')) {
    return `**You can get in touch with Mohd Ahtesham for full-stack roles or freelance projects:**\n\n` +
      `* **Email:** [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL})\n` +
      `* **LinkedIn:** [linkedin.com/in/ahteshammohd094/](${info.linkedin})\n` +
      `* **GitHub:** [github.com/mohdahtesham09](${info.github})\n` +
      `* **Resume:** [Download Resume](${RESUME_DOWNLOAD_LINK})\n\n` +
      `**Ready to start a project or schedule an interview? [Send a Message](#contact)**`;
  }

  // Default Fallback
  return `**Mohd Ahtesham** is a **Full Stack Developer** specializing in building web applications, AI integrations, and automation workflows. He is actively deepening his expertise in AI Engineering and Generative AI.\n\n` +
    `You can ask me about:\n` +
    `* **Strongest skills** (React, Node, Groq API, n8n, Java/Python)\n` +
    `* **Featured projects** (Atomic AI, MediaStack, SmailyZo, Backend-Ledger)\n` +
    `* **Full stack & AI experience**\n` +
    `* **Resume** & how to **contact** him!`;
}

const finalTests = [
  "What are Ahtesham's strongest skills?",
  "Tell me about Atomic AI.",
  "Is Ahtesham an AI Engineer?",
  "Can I download his resume?",
  "How can I contact Ahtesham?",
  "Tell me about a company he worked for."
];

console.log("=== VERIFYING FINAL 6 REQUIRED TESTS ===");
finalTests.forEach((p, i) => {
  console.log(`\n--- Test ${i + 1}: "${p}" ---`);
  console.log(generateFallbackResponse(p));
});
