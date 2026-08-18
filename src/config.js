// ============================================================
//  PORTFOLIO CENTRALIZED CONFIGURATION
//  Synchronized with master data in src/data/portfolioData.js
// ============================================================
import { personalInfo, resumeConfig } from "./data/portfolioData";

export const RESUME_VIEW_URL = resumeConfig.resumeViewUrl;
export const RESUME_PDF_URL = resumeConfig.resumePdfUrl;

export const CONTACT_EMAIL = personalInfo.email;
export const GITHUB_URL = personalInfo.github;
export const LINKEDIN_URL = personalInfo.linkedin;
export const INSTAGRAM_URL = personalInfo.instagram;

export const PORTFOLIO_NAME = personalInfo.name;
export const PORTFOLIO_TITLE = personalInfo.title;
