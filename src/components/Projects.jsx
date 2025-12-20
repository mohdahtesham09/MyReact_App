import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            title: "AI Business Chatbot",
            desc: "An intelligent customer support agent powered by OpenAI and Node.js. Handles ongoing conversations and provides instant business responses.",
            tech: ["React", "Node.js", "OpenAI"],
            role: "Full Stack",
            live: "#",
            github: "https://github.com/mohdahtesham09" // generic link as specific one not provided
        },
        {
            title: "AI Workflow Automation",
            desc: "Automated business processes using n8n and Postgres. Streamlines data entry and notification systems, reducing manual work by 40%.",
            tech: ["n8n", "PostgreSQL", "Webhooks"],
            role: "Automation Dev",
            live: "#",
            github: "https://github.com/mohdahtesham09"
        },
        {
            title: "E-Commerce MERN App",
            desc: "Full-featured online store with Stripe payment integration, user authentication, and admin dashboard for product management.",
            tech: ["MongoDB", "Express", "React", "Node"],
            role: "Full Stack",
            live: "#",
            github: "https://github.com/mohdahtesham09"
        },
        {
            title: "Real Estate Data Scraper",
            desc: "Python-based scraper using BeautifulSoup4 to extract real estate pricing data for market analysis and trend forecasting.",
            tech: ["Python", "BS4", "Pandas"],
            role: "Data Engineer",
            live: "#",
            github: "https://github.com/mohdahtesham09"
        },
        {
            title: "Goldman Sachs Cybersecurity",
            desc: "Simulation of cybersecurity protocols and cryptography implementation during virtual internship program.",
            tech: ["Java", "Cryptography", "Security"],
            role: "Virtual Intern",
            live: "#",
            github: "https://github.com/mohdahtesham09"
        },
        {
            title: "React Dashboard",
            desc: "Responsive analytics dashboard featuring data visualization with charts and Redux state management.",
            tech: ["React", "Redux", "Charts.js"],
            role: "Frontend",
            live: "#",
            github: "https://github.com/mohdahtesham09"
        }
    ];

    return (
        <section id="projects" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    Featured <span className="text-brand-yellow">Projects</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div key={index} className="glass-card flex flex-col h-full group">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-brand-blue transition-colors">{project.title}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300 border border-white/10">{project.role}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {project.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-medium text-brand-teal">
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 pt-0 border-t border-white/5 mt-auto flex justify-between items-center">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
                                >
                                    <Github size={18} /> Code
                                </a>
                                <a
                                    href={project.live}
                                    className="text-brand-blue hover:text-white flex items-center gap-2 text-sm font-medium transition-colors"
                                >
                                    Live Demo <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="https://github.com/mohdahtesham09" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transition-all">
                        View All Projects <ArrowRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
