import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Scan, Cpu, MessageSquare, ShieldCheck, Users, Eye, Info, Activity, Feather, FileSignature, Palette, User, Layers, Zap, Droplets, Mountain, Star, Car, Bot, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// --- HELPER COMPONENT (Matched to SectionPrototype) ---
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white", padding = "p-5", direction = "up" }: any) => {
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: 100 };
    if (direction === "left") initial = { opacity: 0, x: -100 };
    if (direction === "right") initial = { opacity: 0, x: 100 };
    if (direction === "down") initial = { opacity: 0, y: -100 };

    return (
        <motion.div 
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className={`
                ${gradient} rounded-xl ${padding} ${textColor} relative overflow-hidden group 
                shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300
                flex flex-col justify-start
                border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
                ${className}
            `}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            <div className="relative z-10 h-full flex flex-col gap-3">
                {(title || icon) && (
                    <div className="mb-1 shrink-0">
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-tight flex items-center gap-2 drop-shadow-md leading-none ${textColor === 'text-white' ? 'text-white/70' : ''}`}>
                            {icon && React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
                            {title}
                        </h3>
                    </div>
                )}
                <div className={`leading-relaxed font-body font-normal flex-1 ${textColor === 'text-zinc-900' ? 'text-zinc-600' : 'text-white/80'}`}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const teslaCards = [
  // CARD 1: REAL-WORLD INFERENCE
  { 
    id: 2, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "A Living Laboratory",
    content: "Where Micron executives, engineers, guests, and partners generate domestic intelligence from Optimus and Cybercab — across real dinners, real stays, and real events.",
    icon: null,
    gradient: "bg-micron-grey1", 
    border: "border-white/10",
    subtitleColor: "text-micron-green", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-eggplant-light"
  },
  // CARD 2: THE TECTONIC SHIFT
  {
    id: 1,
    title: "A TECTONIC SHIFT", 
    subtitle: "Anthropology of the Future",
    content: "Moving beyond regulation and infrastructure into the deeper questions. How daily life, neighborhoods, and human comfort adapt when autonomous systems become permanent residents.",
    icon: null,
    gradient: "bg-micron-eggplant-light", 
    border: "border-white/10",
    subtitleColor: "text-zinc-900", 
    descriptionColor: "text-white/90 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-zinc-100"
  },
  // CARD 3: GENESIS
  {
    id: 3,
    title: "GENESIS", 
    subtitle: "Origin & Intent",
    content: "The strategy, design, and stewardship behind the Micron House concept. Aligning a historic asset with the future Micron and Tesla are leading.",
    icon: null,
    gradient: "bg-micron-eggplant", 
    border: "border-white/10",
    subtitleColor: "text-zinc-400", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-eggplant-light"
  },
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const getModalContent = (id: number) => {
    // CONTENT FOR "GENESIS" (ID 3)
    if (id === 3) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* LEFT COLUMN: Vision & Proposal */}
                <div className="flex flex-col gap-6">
                    {/* Vision Card */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-zinc-100 rounded-[2rem] p-8 border border-zinc-200 relative overflow-hidden flex flex-col justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                    >
                         <div className="mb-6">
                            <h4 className="text-3xl font-bold text-micron-eggplant mb-2 tracking-tight">Stewardship & Vision</h4>
                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Lisa Wood • Founder</p>
                         </div>
                         <div className="w-12 h-1 bg-micron-green/20 mb-6"></div>
                         <div className="space-y-4 text-zinc-600 leading-relaxed text-lg font-medium">
                            <p>Three decades in tech. Mother, artist, athlete, explorer, researcher.</p>
                            <p>I own this Boise property — 25 years now, barely used. I love what Micron and Tesla are building. I also respect what it demands of us.</p>
                            <p>I created the Micron House concept — the strategy, the design, the branding — to propose a partnership that puts this historic asset to its highest use.</p>
                         </div>
                    </motion.div>

                    {/* Proposal Card - UPDATED WITH CONTACT INFO */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-[#2c2e33] text-white rounded-[2rem] p-8 border border-zinc-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight text-white/90 mb-4">Long-Term Relationship</h3>
                            <div className="text-zinc-300 font-light leading-relaxed text-lg space-y-4">
                                <p>
                                    I'm proposing a long-term partnership. The most interesting version of Micron House is the one we haven't imagined yet — and getting there requires years of shared commitment.
                                </p>
                                <p>
                                    The next step is a visit. I'd love to show you the property in person.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-zinc-600">
                             <p className="text-white font-bold text-lg mb-1">Lisa Wood</p>
                             <div className="flex flex-col gap-1 text-zinc-400 font-medium">
                                <a href="tel:2087202433" className="hover:text-white transition-colors w-fit">208.720.2433</a>
                                <a href="mailto:lisa@lisawoodstudio.com" className="hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">lisa@lisawoodstudio.com</a>
                             </div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Concept Tiles */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                    className="bg-white rounded-[2rem] p-8 border border-zinc-200 flex flex-col gap-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                     <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100">
                        <img 
                            src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-transparent.png" 
                            alt="Micron House Icon"
                            className="w-40 h-40 object-contain opacity-90 mb-6"
                        />
                        <h3 className="text-2xl font-bold text-micron-eggplant leading-tight tracking-tight">Concept & Design</h3>
                        <p className="text-lg text-zinc-500 mt-2 font-medium">
                            I designed the emblem around a single idea: balance. Earth and Sky represent the world we inherited. Intelligence and Vision represent the world Micron and Tesla are building. The star at the center is where all four forces converge — the spark of something new. An icon for the autonomous home of the future.
                        </p>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {/* Earth - Green */}
                        <div className="bg-micron-green text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Mountain size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Earth</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Boise, Home, Ground</p>
                        </div>

                        {/* Sky - Blue */}
                        <div className="bg-micron-eggplant-light text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Star size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Sky</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Starlink, Energy</p>
                        </div>

                        {/* Memory - Eggplant */}
                        <div className="bg-micron-eggplant text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Memory</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Micron, Intelligence, Meaning</p>
                        </div>

                        {/* Vision - Grey */}
                        <div className="bg-micron-grey1 text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Eye size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Vision</span>
                            </div>
                            <p className="text-white/80 text-lg leading-relaxed font-medium">Abundance, Autonomy, Tesla, SpaceX</p>
                        </div>
                     </div>
                </motion.div>
            </div>
        )
    }

    // CONTENT FOR "REAL-WORLD INFERENCE" (ID 2)
    if (id === 2) {
        return (
            // MATCHING PROTOTYPE LAYOUT STRUCTURE
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto pb-12">
                
                {/* LEFT COLUMN: IMAGE + CLOSED LOOP CARD */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* IMAGE */}
                    <div className="w-full aspect-square">
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="w-full h-full relative rounded-xl overflow-hidden border border-zinc-200 group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                         >
                            <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/UPPER_FLOOR/stairs.webp" loading="lazy" 
                                alt="Stairs" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                         </motion.div>
                    </div>

                    {/* CLOSED LOOP CARD */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full bg-white rounded-xl px-6 py-3 md:px-8 md:py-4 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="flex items-baseline gap-4 mb-2 relative z-10">
                            <h3 className="text-xl font-black uppercase tracking-tight text-micron-green flex items-center gap-2">
                                <Activity size={20} /> CLOSED LOOP
                            </h3>
                        </div>
                        
                        <div className="w-full h-px bg-zinc-200 mb-4 relative z-10" />

                        <div className="flex flex-col gap-4 text-zinc-600 text-lg font-medium leading-relaxed relative z-10">
                            {/* UPDATED: Flex layout to align "Micron to Front Door" next to "15 min" */}
                            <div className="flex flex-row items-baseline gap-4">
                                 <span className="block text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">15 <span className="text-2xl font-bold align-top text-zinc-400">min</span></span>
                                 <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Micron to Front Door</span>
                            </div>
                            
                            <p className="leading-snug">
                                Optimus and Cybercab run on Micron silicon fabricated fifteen minutes from the front door.
                            </p>
                        </div>
                    </motion.div>
                </div>
                
                {/* RIGHT COLUMN: STACKED BENTOS */}
                <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                    {/* THE FEEDBACK LOOP */}
                    <InnerBento 
                        gradient="bg-micron-eggplant" 
                        direction="right" 
                        delay={0.7} 
                        className="flex-grow" 
                        padding="p-6"
                    >
                        {/* UPDATED: Increased gap from mb-3 to gap-2 (approx mb-4 visual equivalent) */}
                        <div className="flex flex-col mb-4 gap-2">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-sans flex items-center gap-2">
                                <MessageSquare size={16} /> THE FEEDBACK LOOP
                            </h3>
                            <span className="text-xs uppercase tracking-widest text-white/50">Training Ground</span>
                        </div>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <ul className="space-y-3 mb-4">
                            {[
                                "Optimus prepares a private dining room for a confidential executive dinner.",
                                "Optimus manages a quiet household for an employee's family.",
                                "Cybercab delivers a senior Washington official to a fireside."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/90 text-base font-medium leading-snug">
                                    <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-white/60 font-bold tracking-wide leading-relaxed border-t border-white/10 pt-3">
                            Three scenarios. Three emotional registers. Each one training autonomous systems.
                        </p>
                    </InnerBento>

                    {/* PRE-PUBLIC DEPLOYMENT */}
                    <InnerBento 
                        gradient="bg-micron-grey1" 
                        direction="right" 
                        delay={1.0} 
                        className="flex-grow" 
                        padding="p-6"
                    >
                         {/* UPDATED: Increased gap from mb-3 to gap-2 */}
                        <div className="flex flex-col mb-4 gap-2">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 font-sans flex items-center gap-2">
                                <ShieldCheck size={16} /> PRE-PUBLIC DEPLOYMENT
                            </h3>
                            <span className="text-xs uppercase tracking-widest text-white/50">First Access</span>
                        </div>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <div className="space-y-4 text-white/90 text-base font-medium leading-relaxed">
                            <p>
                                Micron's leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth.
                            </p>
                            <p>
                                Operational variety builds institutional knowledge. Every scenario deepens the data, sharpens the model, and strengthens the partnership.
                            </p>
                            <div className="w-full h-px bg-white/20 mt-4 mb-3" />
                            {/* UPDATED: Removed "Political" */}
                            <p className="text-sm font-bold tracking-widest text-micron-green">
                                Confidential. Celebratory. Compassionate.
                            </p>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    }
    
    // CONTENT FOR "THE TECTONIC SHIFT" (ID 1)
    return (
        <div className="flex flex-col gap-6 h-full pb-8">
            {/* MERGED: SCALE & FRICTION into one Light Blue Tile */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-micron-eggplant-light text-zinc-900 rounded-[2rem] p-8 md:p-10 border border-white/20 flex flex-col gap-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                 {/* Scale Section */}
                 <div>
                    <h5 className="text-3xl font-black text-white mb-3 uppercase leading-none tracking-tight">SCALE</h5>
                    <p className="text-white font-medium leading-relaxed text-lg">
                        Autonomous systems are moving from thousands to billions within a decade. Speed of adoption outpaces all previous technological transition — electricity, the internet, smartphones. Micron silicon powers the memory in every unit.
                    </p>
                 </div>

                 {/* Divider */}
                 <div className="w-full h-px bg-white/30" />

                 {/* Friction Section */}
                 <div>
                    <h5 className="text-3xl font-black text-white mb-3 uppercase leading-none tracking-tight">FRICTION</h5>
                    <p className="text-white font-medium leading-relaxed text-lg">
                        Each autonomous unit carries cameras, sensors, and microphones. Billions of mobile platforms operating in homes, neighborhoods, schools, and public spaces permanently alter the sensory landscape of daily life.
                    </p>
                 </div>
            </motion.div>

            {/* BOTTOM ROW: Questions */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-zinc-200 flex flex-col justify-center gap-6 mt-2 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-micron-eggplant font-bold uppercase text-sm tracking-[0.2em]">QUESTIONS</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. SURVEILLANCE - Green */}
                    <div className="flex flex-col gap-3 bg-micron-green text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">SURVEILLANCE</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                            Sensors moving through private spaces, sidewalks, schools, parks. What is being recorded, stored, and shared — and by whom?
                        </p>
                    </div>
                    
                    {/* 2. VISUAL VERNACULAR - Grey2 */}
                    <div className="flex flex-col gap-3 bg-micron-grey2 text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">VISUAL VERNACULAR</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                             Streets, homes, and neighborhoods filled with humanoid machines. How does permanent autonomous presence in everyday life change how people feel in their own communities?
                        </p>
                    </div>
                    
                    {/* 3. WORST CASE - Eggplant */}
                    <div className="flex flex-col gap-3 bg-micron-eggplant text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-sm tracking-widest">WORST CASE</span>
                        <div className="w-full h-px bg-white/20" />
                        <p className="text-white/80 font-medium leading-relaxed text-base">
                            Mass malfunction. Security breach across millions of units. Coordinated exploit. What does preparedness look like before deployment — and who is in the room when those scenarios are discussed?
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
  };

  const openModal = (card: typeof teslaCards[0]) => {
    setModalData({
      title: card.title,
      subtitle: card.subtitle,
      category: 'showcase',
      theme: 'light',
      maxWidth: 'max-w-6xl',
      content: getModalContent(card.id)
    });
  };

  return (
      <section id="serving-tesla" className="container mx-auto px-8 md:px-12 py-12 bg-white text-zinc-900">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8"
          >
              <div className="flex-shrink-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">05 / PARTNERSHIP</span>
                  <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-grey1 leading-none font-sans">
                      LIVING LAB
                  </h2>
              </div>
              
              <div className="md:ml-auto max-w-2xl pb-1">
                   <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                      <p className="text-base font-light text-zinc-600 leading-snug font-body">
                         <span className="font-bold text-micron-grey1 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                             AUTONOMOUS ECOSYSTEM
                         </span>
                         The first residential deployment of the Tesla autonomous ecosystem. Optimus and Cybercab operating in a living environment — creating a continuous feedback loop between the technology and the human experience.
                      </p>
                   </div>
              </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {teslaCards.map((card, i) => (
                  <BentoCard 
                      key={card.id}
                      className={`flex flex-col min-h-[300px] p-8 relative overflow-hidden group ${card.gradient}`}
                      gradient={card.gradient}
                      textColor="text-white"
                      borderColor={card.border}
                      delay={i * 0.1}
                      hoverEffect={true}
                      hideArrow={true}
                      onClick={() => openModal(card)}
                  >
                       <div className="relative z-10 flex flex-col h-full">
                           <div className="mb-auto">
                               <h3 className={`text-3xl font-black uppercase tracking-tight leading-none mb-2 text-white transition-colors duration-300 ${card.titleHoverColor}`}>
                                   {card.title}
                               </h3>
                               <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${card.subtitleColor}`}>
                                   {card.subtitle}
                               </p>
                               <div className="w-full h-px bg-white/20 mb-6" />
                               <p className={`text-lg font-medium leading-relaxed ${card.descriptionColor}`}>
                                   {card.content}
                               </p>
                           </div>
                       </div>
                  </BentoCard>
              ))}
          </div>

          <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
      </section>
  );
};