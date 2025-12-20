import React from 'react';
import { Briefcase, GraduationCap, Calendar, Award } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            year: "2024 - Present",
            role: "AI & ML Focus",
            org: "Self-Directed Learning",
            desc: "Deep diving into Large Language Models (LLMs), Agentic workflows, and building automation solutions with n8n.",
            icon: Brain,
            type: "learning"
        },
        {
            year: "2023 - Present",
            role: "Freelance Web Developer",
            org: "Upwork & Local Clients",
            desc: "Delivering full-stack web solutions and automation scripts for small businesses. Specializing in MERN stack applications.",
            icon: Briefcase,
            type: "work"
        },
        {
            year: "2023",
            role: "Virtual Internship",
            org: "Goldman Sachs",
            desc: "Gained practical experience in cybersecurity protocols, password cracking simulation, and cryptography basics.",
            icon: Award,
            type: "internship"
        },
        {
            year: "2022 - 2025",
            role: "BCA (Bachelor of Computer Applications)",
            org: "Meena Saha Institute of Technology & Management",
            desc: "Building a strong foundation in Computer Science, Data Structures, Algorithms, and Software Engineering principles.",
            icon: GraduationCap,
            type: "education"
        }
    ];

    // Need to import Brain locally since I used it above
    function Brain(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                <path d="M6 18a4 4 0 0 1-1.97-3.284" />
                <path d="M17.97 14.716A4 4 0 0 1 16 18" />
            </svg>
        )
    }

    return (
        <section id="experience" className="py-20 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    My <span className="text-brand-green">Journey</span>
                </h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-transparent via-brand-blue to-transparent opacity-30"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center w-full`}>

                                {/* Spacing for center line */}
                                <div className="flex-1 w-full"></div>

                                {/* Center Point */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-neutral-900 border-2 border-brand-teal flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,184,217,0.5)]">
                                    <exp.icon size={14} className="text-brand-teal" />
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 w-full pl-10 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}>
                                    <div className="glass-card p-6 hover:bg-white/10 transition-colors group">
                                        <span className="inline-block px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue text-xs font-semibold mb-3 border border-brand-blue/30">
                                            {exp.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand-teal transition-colors">{exp.role}</h3>
                                        <h4 className="text-md text-gray-400 font-medium mb-3">{exp.org}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {exp.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
