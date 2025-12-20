import React from 'react';
import { Globe, Bot, Workflow, Server } from 'lucide-react';

const Services = () => {
    const services = [
        {
            title: "Full-Stack Development",
            desc: "Building responsive, scalable, and secure web applications using the MERN stack (MongoDB, Express, React, Node).",
            icon: Globe,
            color: "text-blue-400"
        },
        {
            title: "AI Chatbot Solutions",
            desc: "Custom AI agents powered by OpenAI/LLMs that can handle customer support, lead generation, and business queries 24/7.",
            icon: Bot,
            color: "text-teal-400"
        },
        {
            title: "Workflow Automation",
            desc: "Streamlining business processes with n8n and Zapier. Automate repetitive tasks to save time and reduce errors.",
            icon: Workflow,
            color: "text-green-400"
        },
        {
            title: "API Development",
            desc: "Designing robust RESTful APIs and backend architectures that ensure smooth data flow and integration between systems.",
            icon: Server,
            color: "text-purple-400"
        }
    ];

    return (
        <section id="services" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    Services <span className="text-brand-blue">I Offer</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
                            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 ${service.color}`}>
                                <service.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
