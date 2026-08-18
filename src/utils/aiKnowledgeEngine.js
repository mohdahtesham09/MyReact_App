import { personalInfo, resumeConfig, careerDirection, skillsGrouped, projects, valueProps } from "../data/portfolioData";

export function generateClientAIResponse(userQuery) {
  const q = (userQuery || "").toLowerCase().trim();

  // 1. Off-topic / Unrelated Questions (quantum physics, write code, weather, general trivia)
  const isOffTopic =
    q.includes("quantum physics") ||
    q.includes("capital of france") ||
    q.includes("who is president") ||
    q.includes("write python code") ||
    q.includes("write java code") ||
    q.includes("solve math") ||
    q.includes("tell me a joke") ||
    q.includes("what is 2+") ||
    q.includes("weather") ||
    q.includes("recipe") ||
    (q.length > 5 &&
      !q.includes("ahtesham") &&
      !q.includes("project") &&
      !q.includes("skill") &&
      !q.includes("stack") &&
      !q.includes("resume") &&
      !q.includes("cv") &&
      !q.includes("contact") &&
      !q.includes("hire") &&
      !q.includes("ai") &&
      !q.includes("backend") &&
      !q.includes("frontend") &&
      !q.includes("experience") &&
      !q.includes("education") &&
      !q.includes("freelance font") &&
      !q.includes("freelance") &&
      !q.includes("node") &&
      !q.includes("react") &&
      !q.includes("fastapi") &&
      !q.includes("n8n") &&
      !q.includes("vapi") &&
      !q.includes("atomic") &&
      !q.includes("mediastack") &&
      !q.includes("smailyzo") &&
      !q.includes("ledger") &&
      !q.includes("github") &&
      !q.includes("linkedin") &&
      !q.includes("email") &&
      !q.includes("role") &&
      !q.includes("direction") &&
      !q.includes("langgraph") &&
      !q.includes("langchain") &&
      !q.includes("aws") &&
      !q.includes("docker") &&
      !q.includes("who are you") &&
      !q.includes("hi") &&
      !q.includes("hello") &&
      !q.includes("hey"));

  if (isOffTopic) {
    return `I'm Ahtesham's portfolio assistant. I can answer questions about his skills, projects, experience, resume and career profile.\n\n` +
      `**Suggested questions:**\n` +
      `* What projects has Ahtesham built?\n` +
      `* What is his tech stack?\n` +
      `* Does he know LangGraph or AWS?\n` +
      `* What is his career direction?\n` +
      `* Can I see his resume?`;
  }

  // 2. Unverified Company / Employment History / Salary / Certifications
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
      `You can explore his verified projects, skills, and background below:\n` +
      `* **[View Projects](#projects)**\n` +
      `* **[View Experience](#experience)**\n` +
      `* **[View Resume](${resumeConfig.resumeViewUrl})**`;
  }

  // 3. GitHub Query
  if (q.includes("github")) {
    return `Here is Mohd Ahtesham's GitHub profile:\n\n` +
      `**[${personalInfo.github}](${personalInfo.github})**`;
  }

  // 4. LinkedIn Query
  if (q.includes("linkedin")) {
    return `Here is Mohd Ahtesham's LinkedIn profile:\n\n` +
      `**[${personalInfo.linkedin}](${personalInfo.linkedin})**`;
  }

  // 5. Email / Contact Details Query
  if (q.includes("email") || q.includes("what is his email")) {
    return `Mohd Ahtesham's email address is:\n\n` +
      `Email: **[${personalInfo.email}](mailto:${personalInfo.email})**\n\n` +
      `You can also reach out directly via the portfolio contact form:\n\n` +
      `**[Go to Contact](#contact)**`;
  }

  // 6. Contact / Hire Navigation Query (NO automatic mailto redirect!)
  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("reach") ||
    q.includes("work with him") ||
    q.includes("send message") ||
    q.includes("start project")
  ) {
    return `You can reach out to Mohd Ahtesham for Full Stack Developer roles, Software Engineering opportunities, or freelance projects:\n\n` +
      `* **Email:** [${personalInfo.email}](mailto:${personalInfo.email})\n` +
      `* **Location:** ${personalInfo.location}\n` +
      `* **LinkedIn:** [${personalInfo.linkedin}](${personalInfo.linkedin})\n` +
      `* **GitHub:** [${personalInfo.github}](${personalInfo.github})\n\n` +
      `**[Go to Contact](#contact)** · **[View Freelance Services](#freelance)**`;
  }

  // 7. Resume Query
  if (
    q.includes("resume") ||
    q.includes("cv") ||
    q.includes("download resume") ||
    q.includes("see his resume") ||
    q.includes("view resume") ||
    q.includes("download")
  ) {
    if (resumeConfig.resumePdfUrl) {
      return `You can view or download Mohd Ahtesham's resume using the links below:\n\n` +
        `* **[Download Resume PDF](${resumeConfig.resumePdfUrl})**\n` +
        `* **[View Resume Google Drive](${resumeConfig.resumeViewUrl})**`;
    }
    return `You can view Mohd Ahtesham's resume using the link below:\n\n` +
      `**[View Resume](${resumeConfig.resumeViewUrl})**`;
  }

  // 8. Specific Skill Inquiries (e.g., "Does he know LangGraph?", "AWS experience?", "Docker?")
  if (
    q.includes("does he know") ||
    q.includes("have experience with") ||
    q.includes("know langgraph") ||
    q.includes("langgraph") ||
    q.includes("langchain") ||
    q.includes("aws") ||
    q.includes("docker") ||
    q.includes("redis") ||
    q.includes("fastapi")
  ) {
    let matchedSkill = "";
    if (q.includes("langgraph")) matchedSkill = "LangGraph";
    else if (q.includes("langchain")) matchedSkill = "LangChain";
    else if (q.includes("aws")) matchedSkill = "AWS (AWS ECS Fargate, ECR, ALB, CloudFront)";
    else if (q.includes("docker")) matchedSkill = "Docker";
    else if (q.includes("redis")) matchedSkill = "Redis";
    else if (q.includes("fastapi")) matchedSkill = "FastAPI";

    if (matchedSkill) {
      return `**Yes.** Mohd Ahtesham has verified experience with **${matchedSkill}** as part of his AI Application & Production Backend engineering stack.\n\n` +
        `* **AI / GenAI Stack:** LLM, LangChain, LangGraph, RAG, Multi-Agent Systems\n` +
        `* **Backend & Cloud:** FastAPI, Node.js, Express, Redis, Docker, AWS, CI/CD\n\n` +
        `**[View Technical Arsenal](#skills)** · **[View Projects](#projects)**`;
    }
  }

  // 9. Tech Stack / Skills Query
  if (
    q.includes("tech stack") ||
    q.includes("technologies") ||
    q.includes("skills") ||
    q.includes("good at") ||
    q.includes("stack")
  ) {
    return `**Mohd Ahtesham's verified Technical Arsenal:**\n\n` +
      skillsGrouped
        .map((cat) => `* **${cat.category}:** ${cat.skills.join(", ")}`)
        .join("\n") +
      `\n\n**[View Skills](#skills)** · **[View Projects](#projects)**`;
  }

  // 10. Projects Query
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("portfolio work") ||
    q.includes("show me") ||
    q.includes("atomic") ||
    q.includes("mediastack") ||
    q.includes("smailyzo") ||
    q.includes("ledger")
  ) {
    return `**Mohd Ahtesham has built several verified projects:**\n\n` +
      projects
        .map(
          (p) =>
            `**${p.name}** — ${p.tagline}\n` +
            `* ${p.desc}\n` +
            `* *Stack:* ${p.tech.join(", ")}\n` +
            `* [View Project Details](#projects)` +
            (p.github ? ` · [GitHub](${p.github})` : "") +
            (p.live && p.live !== "#" ? ` · [Live Demo](${p.live})` : "")
        )
        .join("\n\n") +
      `\n\n**[View Projects Section](#projects)**`;
  }

  // 11. Career Direction Query
  if (
    q.includes("career direction") ||
    q.includes("career goal") ||
    q.includes("what role") ||
    q.includes("looking for") ||
    q.includes("direction")
  ) {
    return `**Mohd Ahtesham's Target Roles & Progression:**\n\n` +
      `**Open Roles:**\n` +
      careerDirection.targetRoles.map((r) => `* ${r}`).join("\n") +
      `\n\n**Engineering Progression:**\n` +
      careerDirection.progression.join(" → ") +
      `\n\n**Long-Term Focus:**\n` +
      `${careerDirection.longTermGoal}\n\n` +
      `**[View Roadmap](#roadmap)** · **[Go to Contact](#contact)**`;
  }

  // 12. About / Bio Query
  if (
    q.includes("about") ||
    q.includes("who is ahtesham") ||
    q.includes("education") ||
    q.includes("bca") ||
    q.includes("background")
  ) {
    return `${personalInfo.bio}\n\n` +
      `* **Degree:** ${personalInfo.degree} — ${personalInfo.institution}\n` +
      `* **Progression:** ${journeyPath.join(" → ")}\n` +
      `* **Location:** ${personalInfo.location}\n\n` +
      `**[View About Section](#about)** · **[View Resume](${resumeConfig.resumeViewUrl})**`;
  }

  // 13. Greetings / Hello
  if (q === "hi" || q === "hello" || q === "hey" || q.includes("who are you")) {
    return `Hi! I'm **Ahtesham AI** (Portfolio & Career Assistant).\n\n` +
      `I can answer questions about Ahtesham's **skills**, **projects** (Atomic AI, MediaStack, SmailyZo), **tech stack**, **career direction**, and **resume**.\n\n` +
      `What would you like to explore?`;
  }

  // Default Fallback
  return `**Mohd Ahtesham** is a **Full Stack Developer** specializing in MERN, FastAPI, and AI-powered applications.\n\n` +
    `Ask me about:\n` +
    `* **Projects** (Atomic AI, MediaStack, SmailyZo, Backend Ledger)\n` +
    `* **Tech Stack** (React, Node.js, FastAPI, AWS, Docker, LangGraph, RAG)\n` +
    `* **Career Direction** (Full Stack → Backend → AI Applications → GenAI)\n` +
    `* **Resume** & how to **contact/hire** him!\n\n` +
    `**[View Projects](#projects)** · **[View Resume](${resumeConfig.resumeViewUrl})**`;
}
