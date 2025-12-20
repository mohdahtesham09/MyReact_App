import React from 'react';
import { Sparkles, Code2, Rocket, Heart } from 'lucide-react';

const VibeCoding = () => {
    return (
        <section id="vibe" className="py-20 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center p-3 mb-8 bg-white/5 rounded-full border border-white/10">
                            <Sparkles className="text-brand-yellow mr-2" size={24} />
                            <span className="text-white font-medium uppercase tracking-wider text-sm">Vibe Coding</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">Creativity</span> meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-green">Logic</span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            I don't just write code; I craft experiences. My development philosophy is built on three core pillars that ensure every project is not just functional, but exceptional.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Code2 className="text-brand-blue mb-4" size={32} />
                                <h3 className="text-lg font-bold text-white mb-2">Clean Code</h3>
                                <p className="text-gray-400 text-sm">
                                    Maintainable, scalable, and self-documenting architectures that stand the test of time.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Heart className="text-brand-red mb-4" size={32} />
                                <h3 className="text-lg font-bold text-white mb-2">User-Centric</h3>
                                <p className="text-gray-400 text-sm">
                                    Design driven by empathy. Every interaction is crafted to delight and serve the user's needs.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                <Rocket className="text-brand-green mb-4" size={32} />
                                <h3 className="text-lg font-bold text-white mb-2">Performance</h3>
                                <p className="text-gray-400 text-sm">
                                    Optimized for speed and efficiency. Seconds matter in the digital world.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VibeCoding;
