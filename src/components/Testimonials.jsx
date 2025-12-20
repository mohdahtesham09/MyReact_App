import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 relative bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    Client <span className="text-brand-purple">Testimonials</span>
                </h2>

                <div className="flex justify-center">
                    <div className="glass-card p-12 text-center max-w-2xl bg-[#0F172A]/40 border-dashed border-white/10">
                        <div className="flex justify-center mb-6 text-brand-teal/50">
                            <MessageSquareQuote size={64} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Work in Progress</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            I am currently delivering high-quality solutions for my first set of clients.
                            Honest reviews and success stories will be featured here soon.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
