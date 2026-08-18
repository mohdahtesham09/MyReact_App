import { personalInfo, resumeConfig, careerDirection, skillsGrouped, projects } from '../../src/data/portfolioData.js';

export const knowledgeBase = {
  personalInfo: {
    name: personalInfo.name,
    title: personalInfo.title,
    careerGoal: personalInfo.bio,
    bio: personalInfo.bio,
    education: {
      degree: personalInfo.degree,
      institution: personalInfo.institution,
      highlights: "Foundation in Computer Science, Data Structures & Algorithms, Object-Oriented Programming, and Web Development."
    },
    location: personalInfo.location,
    email: personalInfo.email,
    github: personalInfo.github,
    linkedin: personalInfo.linkedin,
    instagram: personalInfo.instagram,
    resumeUrl: resumeConfig.resumeViewUrl,
    resumePdfUrl: resumeConfig.resumePdfUrl,
    availability: personalInfo.availability
  },

  careerDirection,
  skillsGrouped,
  projects
};
