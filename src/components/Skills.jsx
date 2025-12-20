import React from 'react';
import { Code, Server, Database, Brain, Terminal, Layout } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: Layout,
            skills: ["React.js", "Tailwind CSS", "Redux", "Framer Motion", "HTML5/CSS3", "JavaScript (ES6+)"],
            color: "text-blue-400"
        },
        {
            title: "Backend Development",
            icon: Server,
            skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "Authentication (JWT)"],
            color: "text-green-400"
        },
        {
            title: "Programming & DSA",
            icon: Code,
            skills: ["Java", "Python", "Data Structures", "Algorithms", "Problem Solving", "Object-Oriented Programming"],
            color: "text-yellow-400"
        },
        {
            title: "AI & Automation",
            icon: Brain,
            skills: ["n8n Workflows", "OpenAI API", "vapi", "Loveable", "Prompt Engineering", "Chatbots", "Voice Calling Agents"],
            color: "text-purple-400"
        },
        {
            title: "Tools & DevOps",
            icon: Terminal,
            skills: ["Git", "GitHub", "VS Code", "Postman", "Cursor", "Docker"],
            color: "text-orange-400"
        }
    ];

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    Technical <span className="text-brand-teal">Arsenal</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="glass-card p-6 transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="flex items-center mb-6">
                                <div className={`p-3 rounded-lg bg-white/5 ${category.color}`}>
                                    <category.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white ml-4">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-brand-teal/50 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
