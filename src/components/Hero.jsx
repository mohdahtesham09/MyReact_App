import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Brain,
  Globe,
  Terminal,
  Bot,
  Cloud,
  Layout,
  Download,
} from "lucide-react";

const Typewriter = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className='text-brand-teal ml-1'
      >
        |
      </motion.span>
    </span>
  );
};

const RotatingIcon = ({
  icon: Icon,
  radius,
  duration,
  reverse = false,
  color,
}) => {
  return (
    <motion.div
      className='absolute left-1/2 top-1/2'
      style={{
        transformOrigin: "center center",
        // We'll define the sizing here but the animation happens via framer
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
    >
      {/* The offset wrapper moves the icon out to the radius */}
      <div
        className='absolute -translate-x-1/2 -translate-y-1/2'
        style={{ transform: `translateX(${radius}px)` }}
      >
        {/* The Icon wrapper counter-rotates to keep the icon upright */}
        <motion.div
          animate={{ rotate: reverse ? 360 : -360 }}
          transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
          className={`p-3 rounded-2xl bg-[#0F172A] border border-white/10 shadow-lg ${color}`}
        >
          <Icon size={24} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section
      id='home'
      className='min-h-screen flex items-center pt-20 overflow-hidden relative'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='text-left z-10'
        >
          <div className='inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6 backdrop-blur-md'>
            Available for hire
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 leading-tight text-white'>
            Hi, I'm <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-400'>
              Mohd Ahtesham
            </span>
          </h1>

          <h2 className='text-xl md:text-2xl text-gray-300 font-light mb-6 min-h-[40px]'>
            <Typewriter
              text='Automation Specialist | Full Stack Developer'
              speed={70}
            />
          </h2>

          <p className='text-gray-400 text-lg max-w-lg mb-10 leading-relaxed'>
            Results-driven developer passionate about crafting scalable web
            applications and AI-powered solutions. Transforming ideas into
            clean, efficient code.
          </p>

          <div className='flex flex-wrap gap-4'>
            <a
              href='#projects'
              className='px-8 py-4 rounded-full bg-primary-blue hover:bg-blue-600 text-white font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,82,204,0.3)]'
            >
              View Projects
            </a>
            <a
              href='../assets/resume.pdf'
              className='px-8 py-4 rounded-full bg-transparent border border-brand-teal/50 text-brand-teal hover:bg-brand-teal/10 font-bold flex items-center gap-2 transition-all hover:scale-105'
            >
              <Download size={20} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Right Animation - Orbital System */}
        <div className='relative h-[600px] w-full flex items-center justify-center perspective-1000'>
          {/* Background Gradients */}
          <div className='absolute inset-0 bg-gradient-to-tr from-brand-blue/10 to-transparent rounded-full blur-3xl opacity-30'></div>
          {/* Central Hub */}
          <div className='relative z-20 w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal shadow-[0_0_50px_rgba(0,184,217,0.4)] flex items-center justify-center'>
            <span className='text-white font-black text-2xl tracking-widest'>
              DEV
            </span>
          </div>
          {/* Orbits - SVG/Borders */}
          {/* Orbit 1 */}
          <div className='absolute rounded-full border border-white/5 w-[280px] h-[280px]'></div>
          {/* Orbit 2 */}
          <div className='absolute rounded-full border border-white/5 w-[420px] h-[420px]'></div>
          {/* Orbit 3 */}
          <div className='absolute rounded-full border border-white/5 w-[560px] h-[560px]'></div>
          {/* Floating Icons */}
          {/* Inner Orbit (Radius ~140px) */}
          <RotatingIcon
            icon={Code}
            radius={140}
            duration={15}
            color='text-brand-blue'
          />
          <RotatingIcon
            icon={Brain}
            radius={140}
            duration={15}
            reverse={true}
            color='text-brand-red'
          />{" "}
          {/* Reverse logic needs positioning adjustment if on same orbit, usually we offset angle. Simplified here implies same start angle. */}
          {/* To properly distribute them, the simplest way without complex math in CSS is rotating the parent container of EACH icon to a starting degree. */}
          {/* Re-implementing with wrapper for angles */}
          <div className='absolute inset-0 flex items-center justify-center rotate-0'>
            <RotatingIcon
              icon={Code}
              radius={140}
              duration={20}
              color='text-blue-400'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center rotate-180'>
            <RotatingIcon
              icon={Layout}
              radius={140}
              duration={20}
              color='text-pink-400'
            />
          </div>
          {/* Middle Orbit (Radius ~210px) */}
          <div className='absolute inset-0 flex items-center justify-center rotate-45'>
            <RotatingIcon
              icon={Server}
              radius={210}
              duration={25}
              reverse={true}
              color='text-green-400'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center rotate-135'>
            <RotatingIcon
              icon={Database}
              radius={210}
              duration={25}
              reverse={true}
              color='text-yellow-400'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center rotate-225'>
            <RotatingIcon
              icon={Globe}
              radius={210}
              duration={25}
              reverse={true}
              color='text-cyan-400'
            />
          </div>
          {/* Outer Orbit (Radius ~280px) */}
          <div className='absolute inset-0 flex items-center justify-center rotate-90'>
            <RotatingIcon
              icon={Bot}
              radius={280}
              duration={30}
              color='text-purple-400'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center rotate-270'>
            <RotatingIcon
              icon={Cloud}
              radius={280}
              duration={30}
              color='text-orange-400'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center rotate-0'>
            <RotatingIcon
              icon={Terminal}
              radius={280}
              duration={30}
              color='text-white'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
