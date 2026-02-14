import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { SectionPrototype } from './components/SectionPrototype';
import { SectionProperty } from './components/SectionProperty';
import { SectionServing } from './components/SectionServing';
import { SectionServingTesla } from './components/SectionServingTesla';
import { SectionTimeline } from './components/SectionTimeline';
import { Menu, X, ArrowRight, MapPin, Mail, Phone, ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll position for Scroll-To-Top button
  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 400) {
              setShowScrollTop(true);
          } else {
              setShowScrollTop(false);
          }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: "Vision", id: "prototype" },
    { label: "Property", id: "property" },
    { label: "Serving Micron", id: "serving" },
    { label: "Living Lab", id: "serving-tesla" },
    { label: "Timeline", id: "timeline" },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 font-sans">
      {/* Navigation Overlay - Z-100 to stay on top */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between relative z-[110]">
            {/* ANIMATED BRAND LOGO */}
            <div 
              className="flex items-center gap-1.5 cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.img 
                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                alt="Micron House Logo"
                className="h-[2.9rem] w-[2.9rem] md:h-[3.4rem] md:w-[3.4rem] object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeOut"
                }}
              />
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 2.4, ease: "easeOut" }}
                className="text-lg md:text-xl font-black tracking-tight text-micron-eggplant/80 uppercase font-sans"
              >
                Micron House
              </motion.span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-5 text-sm font-semibold uppercase tracking-wider text-zinc-600">
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
                className="md:hidden text-zinc-800 p-2 rounded-md hover:bg-zinc-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <X size={28} className="opacity-0" /> : <Menu size={28} />}
            </button>
        </div>

        {/* Mobile Compact Dropdown Menu */}
        <AnimatePresence>
            {mobileMenuOpen && (
                <>
                    {/* Transparent Backdrop to close on click outside */}
                    <div 
                        className="fixed inset-0 z-[110]" 
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, originX: 1, originY: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-3 right-3 z-[120] w-64 bg-white rounded-xl shadow-2xl border border-zinc-100 flex flex-col overflow-hidden md:hidden"
                    >
                        {/* Close Button Row */}
                        <div className="flex justify-end p-2 border-b border-zinc-50">
                             <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-50 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col py-2">
                             {navLinks.map(link => (
                                 <a 
                                    key={link.id} 
                                    href={`#${link.id}`} 
                                    onClick={(e) => scrollToSection(e, link.id)} 
                                    className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-zinc-700 hover:text-micron-eggplant hover:bg-zinc-50 flex justify-between items-center transition-colors group"
                                 >
                                    {link.label}
                                    <ArrowRight size={14} className="text-micron-green transition-transform group-hover:translate-x-1" />
                                 </a>
                             ))}
                        </div>

                        {/* Compact Footer */}
                        <div className="bg-zinc-50 p-4 border-t border-zinc-100">
                             <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                                  <MapPin size={12} className="text-micron-green" />
                                  <span>Boise, ID 83712</span>
                             </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
      </nav>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] bg-micron-eggplant text-white p-2 md:p-3 rounded-full shadow-lg border border-white/20 hover:bg-micron-eggplant-light transition-colors"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-4 h-4 md:w-6 md:h-6" />
            </motion.button>
        )}
      </AnimatePresence>

      <main>
        <Hero />
        
        <div className="relative z-20">
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
                        <p className="text-zinc-500 text-lg max-w-md mb-8 leading-relaxed">
                            A convergence of historic stewardship and autonomous future. The first corporate residence designed for the era of artificial intelligence.
                        </p>
                        <div className="flex items-start gap-4 mb-2 group cursor-pointer text-base">
                            <MapPin className="text-micron-green mt-1 group-hover:text-white transition-colors flex-shrink-0" size={20} />
                            <span className="text-zinc-300 group-hover:text-white transition-colors leading-relaxed">1020 E Warm Springs Ave<br/>Boise, ID 83712</span>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Explore</h4>
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
                        <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Contact</h4>
                        <ul className="space-y-4 text-base">
                            <li className="flex items-center gap-3">
                                <Mail size={20} />
                                <a href="mailto:lisa@lisawoodstudio.com" className="hover:text-white transition-colors">lisa@lisawoodstudio.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} />
                                <a href="tel:2087202433" className="hover:text-white transition-colors">208.720.2433</a>
                            </li>
                            <li className="mt-8">
                                <span className="inline-block px-4 py-1.5 border border-white/20 rounded-full text-sm text-zinc-500 uppercase tracking-widest">
                                    Proposal v1
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-600 uppercase tracking-wider font-medium">
                    <p>© 2026 Lisa Wood Studio</p>
                </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;