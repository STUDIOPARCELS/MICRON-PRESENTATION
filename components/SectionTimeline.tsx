
import React from 'react';
import { motion } from 'framer-motion';

const roadmapItems = [
  { 
    id: 1, 
    date: "NOW", 
    title: "AGREEMENT", 
    subtitle: "Architectural interface.", 
    bg: "bg-micron-black",
    text: "text-white"
  },
  { 
    id: 2, 
    date: "MAR 1", 
    title: "PROTOCOL ASSESSMENT", 
    subtitle: "Infrastructure install.", 
    bg: "bg-micron-eggplant-light", // Light Blue
    text: "text-white"
  },
  { 
    id: 3, 
    date: "APR 1", 
    title: "WELLNESS INSTALL", 
    subtitle: "Core logic ingest.", 
    bg: "bg-micron-green",
    text: "text-white"
  },
  { 
    id: 4, 
    date: "MAY 1", 
    title: "ACCESS BEGINS", 
    subtitle: "Executive residence.", 
    bg: "bg-[#878d9f]", // Grey/Slate manual override to match screenshot vibe
    text: "text-white"
  },
  { 
    id: 5, 
    date: "SEPT", 
    title: "FULL AUTONOMY", 
    subtitle: "Zero human intervention.", 
    bg: "bg-micron-eggplant",
    text: "text-white"
  }
];

export const SectionTimeline: React.FC = () => {
  return (
    // REDUCED PADDING: py-16 -> py-10
    <section id="timeline" className="container mx-auto px-4 md:px-12 py-12 mb-20 bg-white text-zinc-900">
      
          {/* Header Row - REMOVED OUTER BENTO WRAPPER */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8">
              <div className="flex-shrink-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">06 / DEPLOYMENT</span>
                  {/* UPDATED: Changed color to text-micron-green */}
                  <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none font-sans">
                      ROADMAP
                  </h2>
              </div>
              
              <div className="md:ml-auto max-w-2xl pb-1">
                 {/* Updated Header Structure to match other sections */}
                 <div className="pl-6 border-l-4 border-zinc-900/20 hover:border-zinc-900 transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       {/* UPDATED: Changed color to text-micron-green */}
                       <span className="font-bold text-micron-green block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           TIMELINE
                       </span>
                       {/* Increased description size to text-base */}
                       From agreement to installation, then testing to full autonomy as Cybercab and Optimus deploy to the property.
                    </p>
                 </div>
              </div>
          </div>

          {/* Horizontal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {roadmapItems.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    // Added deeper shadows, 3D borders, and hover effects
                    className={`
                        ${item.bg} ${item.text} 
                        aspect-square rounded-2xl p-6 flex flex-col justify-between 
                        relative overflow-hidden group 
                        /* FLOATING SHADOW UPDATE */
                        shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)]
                        hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] 
                        hover:-translate-y-2
                        transition-all duration-300
                        border-t border-white/20 border-l border-white/10 border-b border-black/10 border-r border-black/10
                    `}
                >
                    {/* 3D Bevel Highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    {/* Top Left Icon/Number Indicator */}
                    <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-white/20 transition-colors">
                        {item.id}
                    </div>

                    {/* Center Content */}
                    <div className="mt-auto relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-90">{item.date}</span>
                            <div className="h-px bg-white/40 flex-1"></div>
                        </div>
                        
                        <h3 className="text-2xl font-black uppercase leading-[0.9] mb-2 tracking-tight drop-shadow-md">
                            {item.title}
                        </h3>
                        
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                            {item.subtitle}
                        </p>
                    </div>
                </motion.div>
            ))}
          </div>

    </section>
  );
};
