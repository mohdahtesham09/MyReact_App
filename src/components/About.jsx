import React from 'react';
import { User, Github, Linkedin, Instagram, MapPin, Code, Terminal } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white relative inline-block left-1/2 -translate-x-1/2">
                    About Me
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-blue rounded-full"></span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Card */}
                    <div className="lg:col-span-1 h-full">
                        <div className="glass-card p-8 flex flex-col items-center text-center h-full bg-[#0F172A]/60 border-white/10">
                            <div className="w-32 h-32 rounded-full border-4 border-white/5 bg-white/5 flex items-center justify-center mb-6 overflow-hidden relative shadow-lg shadow-brand-blue/20">
                                <img src="/profile.jpg" alt="Mohd Ahtesham" className="w-full h-full object-cover" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Mohd Ahtesham</h3>
                            <p className="text-brand-teal font-medium text-sm mb-6">
                                Aspiring Full-Stack Developer | Future AI Engineer
                            </p>

                            <div className="flex items-center text-gray-400 text-sm mb-8">
                                <MapPin size={16} className="mr-2" />
                                Gonda, Uttar Pradesh, India
                            </div>

                            <div className="flex space-x-4 mt-auto">
                                <a href="https://linkedin.com/in/ahteshammohd094/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://github.com/mohdahtesham09" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Github size={20} />
                                </a>
                                <a href="https://instagram.com/fsd.ahtesham/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - My Journey */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-8 md:p-10 bg-[#0F172A]/60 border-white/10 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>

                            <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                                <p>
                                    Hello! I'm <span className="text-brand-blue font-semibold">Mohd Ahtesham</span>, a passionate developer and BCA graduate from Meena Saha Institute of Technology & Management. My journey began with a curiosity about how the web works, which quickly evolved into a strong passion for programming and problem-solving.

                                </p>
                                <p>
                                    I specialize in the <span className="text-brand-teal font-semibold">MERN Stack (MongoDB, Express, React, Node.js)</span> with a solid foundation in Data Structures and Algorithms. Alongside full-stack development, I’m actively working in the AI automation space, building intelligent systems using tools like n8n, AI agents, chatbots, and workflow automation.
                                <p>
                                    From developing scalable web applications to automating business processes and extracting insights through data scraping, I enjoy solving real-world problems that demand both logic and creativity.

                                    My goal is to grow as a Full-Stack AI Engineer, building next-generation intelligent web products that deliver real business impact.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-brand-blue/10 p-5 rounded-xl border border-brand-blue/20">
                                    <div className="flex items-center text-brand-blue mb-2 font-bold">
                                        <Code size={18} className="mr-2" /> Frontend
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        Crafting responsive, accessible, and pixel-perfect user interfaces.
                                    </p>
                                </div>
                                <div className="bg-brand-teal/10 p-5 rounded-xl border border-brand-teal/20">
                                    <div className="flex items-center text-brand-teal mb-2 font-bold">
                                        <Terminal size={18} className="mr-2" /> Backend
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        Building scalable APIs and secure server-side architectures.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
};

export default About;
