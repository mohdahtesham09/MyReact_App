import React, { useState, useRef } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Instagram } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        // TODO: REPLACE THESE WITH YOUR ACTUAL EMAILJS SERVICE/TEMPLATE/PUBLIC KEYS
        // Get these from https://www.emailjs.com/
        const serviceId = 'service_mx64ife';
        const templateId = 'template_jz6f27d';
        const publicKey = 'F3IjEdxdYF8RoEROh';

        if (serviceId === 'service_id_placeholder') {
            alert("Email Functionality requires setup!\n\nPlease open 'src/components/Contact.jsx' and replace 'service_id_placeholder' (and others) with your actual EmailJS keys.");
            setLoading(false);
            return;
        }

        try {
            // 1. Send Email via EmailJS
            await emailjs.send(serviceId, templateId, {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: 'ahteshammohd094@gmail.com'
            }, publicKey);

            // 2. Save to Google Sheets (Fire and forget from user perspective)
            try {
                const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbwf8v1FDCrexgG85OkW1n8hhnvrF6gNGQ5TP30vM622xe9PCEVGBhAv5XfyHhDP_VQK/exec';
                await fetch(googleSheetUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                    })
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
                // We do NOT set status to error here, so the user sees success from the email
            }

            setStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully.'
            });
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.error("Email Error:", error);
            setStatus({
                type: 'error',
                message: 'Oops! Failed to send email. Please check your config.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-20 relative text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    Get In Touch
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info Card */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                        <p className="text-gray-400 mb-10 leading-relaxed font-light">
                            I'm currently looking for new opportunities in Full-Stack Development and AI.
                            Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-transparent border border-white/20 rounded-xl text-white">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Email Me</p>
                                    <a href="mailto:ahteshammohd094@gmail.com" className="text-white hover:text-brand-blue transition-colors font-medium">ahteshammohd094@gmail.com</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 bg-transparent border border-white/20 rounded-xl text-brand-teal">
                                    <MapPin size={24} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Location</p>
                                    <p className="text-white font-medium">Gonda, Uttar Pradesh, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-10">
                            <h4 className="text-white font-bold mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                <a href="https://linkedin.com/in/ahteshammohd094/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#334155] rounded-xl text-white hover:bg-brand-blue hover:scale-110 transition-all">
                                    <Linkedin size={20} />
                                </a>
                                <a href="https://github.com/mohdahtesham09" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#334155] rounded-xl text-white hover:bg-black hover:scale-110 transition-all">
                                    <Github size={20} />
                                </a>
                                <a href="https://instagram.com/fsd.ahtesham/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[#334155] rounded-xl text-white hover:bg-brand-red hover:scale-110 transition-all">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-[#1e293b]/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#334155]/50 border border-transparent focus:border-brand-blue rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-2">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#334155]/50 border border-transparent focus:border-brand-blue rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-400 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="w-full bg-[#334155]/50 border border-transparent focus:border-brand-blue rounded-lg px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                                    placeholder="Project details..."
                                    required
                                ></textarea>
                            </div>

                            {status.message && (
                                <div className={`p-4 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {status.message}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform active:scale-95 flex justify-center items-center gap-2"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <Send size={20} className="ml-1" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
