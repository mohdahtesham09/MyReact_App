import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import VibeCoding from './components/VibeCoding';
import Experience from './components/Experience';

import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <VibeCoding />
        <Experience />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
