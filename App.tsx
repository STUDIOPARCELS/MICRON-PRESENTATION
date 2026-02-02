import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { SectionIntro } from './components/SectionIntro';
import { SectionPrototype } from './components/SectionPrototype';
import { SectionProperty } from './components/SectionProperty';
import { SectionServing } from './components/SectionServing';
import { SectionServingTesla } from './components/SectionServingTesla';
import { SectionTimeline } from './components/SectionTimeline';
import { Menu, X, ArrowRight, MapPin, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to handle smooth scrolling with header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Close mobile menu on click
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 85; // Height of fixed header + breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: "Vision", id: "prototype" },
    { label: "Property", id: "property" },
    { label: "Serving Micron", id: "serving" },
    // Changed label from "Serving Tesla" to "Living Lab"
    { label: "Living Lab", id: "serving-tesla" },
    { label: "Timeline", id: "timeline" },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 font-sans">
      {/* Navigation Overlay - Z-50 to stay on top */}
      {/* UPDATED: Removed padding/flex from outer nav to allow inner container to handle alignment */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 md:px-12 py-5 flex items-center justify-between">
            <div 
              className="text-2xl font-bold tracking-tight text-micron-eggplant uppercase font-sans cursor-pointer hover:opacity-80 transition-opacity z-50 relative" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Micron House
            </div>
            
            {/* Desktop Menu - Font Size Increased to text-base */}
            <div className="hidden md:flex gap-8 text-base font-bold uppercase tracking-widest text-zinc-500">
               {navLinks.map(link => (
                 <a 
                    key={link.id}
                    href={`#${link.id}`} 
                    onClick={(e) => scrollToSection(e, link.id)} 
                    className="hover:text-micron-green transition-colors"
                 >
                    {link.label}
                 </a>
               ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
                className="md:hidden text-zinc-800 z-50 relative p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Full Screen Menu - Z-40 (Under Navbar but above content) */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 overflow-y-auto"
                >
                    <div className="flex flex-col gap-6 text-xl font-bold uppercase tracking-widest text-zinc-800 pb-10">
                        {navLinks.map(link => (
                            <a 
                                key={link.id}
                                href={`#${link.id}`} 
                                onClick={(e) => scrollToSection(e, link.id)} 
                                className="border-b border-zinc-100 pb-4 flex justify-between items-center group cursor-pointer"
                            >
                                {link.label}
                                <ArrowRight size={20} className="text-micron-green opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </nav>

      <main>
        <Hero />
        {/* Removed onAnimationComplete as Prototype section is now independent */}
        <SectionIntro />
        <div className="relative z-20 bg-white">
          <SectionPrototype />
          <SectionProperty />
          <SectionServing />
          <SectionServingTesla />
          <SectionTimeline />

          {/* New Professional Footer */}
          <footer className="bg-zinc-950 text-zinc-400 py-24 border-t border-zinc-800">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
                    
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">Micron House</h3>
                        {/* Increased text size */}
                        <p className="text-zinc-500 text-lg max-w-md mb-8 leading-relaxed">
                            A convergence of historic stewardship and autonomous future. The first corporate residence designed for the era of artificial intelligence.
                        </p>
                        {/* Increased text size */}
                        <div className="flex items-start gap-4 mb-2 group cursor-pointer text-base">
                            <MapPin className="text-micron-green mt-1 group-hover:text-white transition-colors flex-shrink-0" size={20} />
                            <span className="text-zinc-300 group-hover:text-white transition-colors leading-relaxed">1020 E Warm Springs Ave<br/>Boise, ID 83712</span>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        {/* Increased Header Size */}
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Explore</h4>
                        {/* Increased Link Size */}
                        <ul className="space-y-4 text-base">
                            {navLinks.map(link => (
                                <li key={link.id}>
                                    <a href={`#${link.id}`} onClick={(e) => scrollToSection(e, link.id)} className="hover:text-micron-green transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        {/* Increased Header Size */}
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Contact</h4>
                        {/* Increased Content Size */}
                        <ul className="space-y-4 text-base">
                            <li className="flex items-center gap-3">
                                <Mail size={20} />
                                <a href="mailto:inquiry@micronhouse.com" className="hover:text-white transition-colors">inquiry@micronhouse.com</a>
                            </li>
                            <li className="mt-8">
                                <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm text-zinc-500 uppercase tracking-widest">
                                    Proposal v1.2
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-600 uppercase tracking-wider font-medium">
                    <p>© 2025 Proposal for Micron Technology</p>
                    <div className="flex gap-8">
                        <span className="cursor-pointer hover:text-zinc-400 transition-colors">Privacy</span>
                        <span className="cursor-pointer hover:text-zinc-400 transition-colors">Terms</span>
                        <span className="cursor-pointer hover:text-zinc-400 transition-colors">Security</span>
                    </div>
                </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;