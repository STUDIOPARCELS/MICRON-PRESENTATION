
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Scan, Cpu, MessageSquare, ShieldCheck, Users, Eye, Info, Activity, Feather, FileSignature, Palette, User, Layers, Zap, Droplets, Mountain, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const teslaCards = [
  // CARD 1: REAL-WORLD INFERENCE
  { 
    id: 2, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "A Living Laboratory",
    content: "Where the people building the systems sit down with the people governing them. The conversations that happen here shape how this technology enters the world.",
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
    content: "Moving beyond laws and sidewalks into the anthropology of the future. How humanity adapts to the 'Crisis of Shared Reality' in the age of ubiquitous robotics.",
    icon: null,
    // UPDATED: Changed to Blue
    gradient: "bg-micron-eggplant-light", 
    border: "border-white/10",
    // UPDATED: Changed to Dark Gray
    subtitleColor: "text-zinc-900", 
    // UPDATED: Adjusted text color for better contrast on blue background
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
                        className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-xl relative overflow-hidden flex flex-col justify-center"
                    >
                         <div className="mb-6">
                            <h4 className="text-3xl font-bold text-micron-eggplant mb-2 tracking-tight">Stewardship & Vision</h4>
                            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Lisa Wood • Founder</p>
                         </div>
                         <div className="w-12 h-1 bg-micron-green/20 mb-6"></div>
                         <div className="space-y-4 text-zinc-600 leading-relaxed text-base font-medium">
                            <p>Three decades in tech. Retired 2023. Artist, athlete, researcher.</p>
                            <p>This Boise property has been a second home for 25 years — barely used. I love what Micron and Tesla are building. I also respect what it demands of us.</p>
                            <p>I created the Micron House concept — the strategy, the design, the branding — to propose a partnership that puts this historic asset to its highest use.</p>
                         </div>
                    </motion.div>

                    {/* Proposal Card */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-[#2c2e33] text-white rounded-[2rem] p-8 shadow-xl border border-zinc-700"
                    >
                        <h3 className="text-2xl font-bold tracking-tight text-white/90 mb-4">Long-Term Relationship</h3>
                        <p className="text-zinc-300 font-light leading-relaxed text-base">
                            The objective of this presentation is to formalize a long-term agreement. Micron and Tesla stakeholders utilize this residence as a premier corporate amenity and entertainment hub. The security and service layers enabled by your technology turn a second home into a strategic asset.
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: Concept Tiles */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                    className="bg-white rounded-[2rem] p-8 border border-zinc-200 shadow-xl flex flex-col gap-6"
                >
                     <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100">
                        <img 
                            src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-transparent.png" 
                            alt="Micron House Icon"
                            className="w-20 h-20 object-contain opacity-90 mb-4"
                        />
                        <h3 className="text-2xl font-bold text-micron-eggplant leading-tight tracking-tight">Concept & Design</h3>
                        <p className="text-sm text-zinc-500 mt-2 font-medium">
                            I designed this emblem to represent the convergence at play in this house. A visual map of the autonomous home.
                        </p>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {/* Earth - Green */}
                        <div className="bg-micron-green text-white rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Mountain size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Earth</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The foundation. Geothermal energy and renewable resources.</p>
                        </div>

                        {/* Sky - Blue */}
                        <div className="bg-micron-eggplant-light text-white rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Star size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Sky</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The stars. Infinite potential.</p>
                        </div>

                        {/* Memory - Eggplant */}
                        <div className="bg-micron-eggplant text-white rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Memory</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The intelligence. Micron. Silicon memory and processing power.</p>
                        </div>

                        {/* Velocity - Grey */}
                        <div className="bg-micron-grey1 text-white rounded-xl p-5 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Velocity</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The autonomy. Tesla. SpaceX. The service and security layer.</p>
                        </div>
                     </div>
                </motion.div>
            </div>
        )
    }

    // CONTENT FOR "REAL-WORLD INFERENCE" (ID 2)
    if (id === 2) {
        return (
            <div className="flex flex-col gap-6 h-full pb-8">
                {/* Top Description */}
                <div className="w-full">
                    <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                        Every function at Micron House — executive, social, civic, compassionate — generates domestic intelligence that flows back to Micron's product teams fifteen minutes away.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* LEFT: Large Image Block */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="relative min-h-[400px] h-full rounded-2xl overflow-hidden shadow-lg border border-black/10 group"
                    >
                         <img 
                            src="https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=1964&auto=format&fit=crop" 
                            alt="Domestic Intelligence" 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                         <div className="absolute bottom-6 left-6 text-white/80 text-xs font-bold uppercase tracking-widest">
                            Living Laboratory
                         </div>
                    </motion.div>

                    {/* RIGHT: Stacked Cards */}
                    <div className="flex flex-col gap-4 h-full">
                         {/* Card 1: Purple */}
                         <motion.div 
                            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                            transition={{ delay: 0.1 }}
                            className="bg-micron-eggplant text-white p-6 rounded-2xl shadow-lg border border-white/10 flex-1 flex flex-col justify-center"
                         >
                            <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-white">THE FEEDBACK LOOP</h3>
                            <ul className="space-y-3 text-sm font-medium text-white/80 leading-relaxed mb-4">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Optimus coordinates a confidential dinner with a James Beard semifinalist and Snake River Valley wines.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Optimus and Cybercab host a live capability demonstration for Boise State engineering students on the back terrace.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Optimus manages a quiet household for an employee's family while a loved one recovers at St. Luke's a mile away.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Cybercab delivers a senior Washington official to a fireside on autonomous regulation with Micron leadership.</span>
                                </li>
                            </ul>
                            <p className="text-white font-bold italic border-l-2 border-white/30 pl-3">
                                Four scenarios. Four emotional registers.
                            </p>
                         </motion.div>

                         {/* Card 2: Dark/Charcoal */}
                         <motion.div 
                             variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                             transition={{ delay: 0.2 }}
                             className="bg-micron-grey1 text-white p-6 rounded-2xl shadow-lg border border-white/10 flex-shrink-0"
                         >
                            <h3 className="text-xl font-black uppercase tracking-tight mb-3 text-white">PRE-PUBLIC DEPLOYMENT</h3>
                            <p className="text-white/80 text-sm font-medium leading-relaxed">
                                Micron's leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth. Confidential. Celebratory. Compassionate. Political. Every week of operational variety builds institutional knowledge competitors will spend years catching up to.
                            </p>
                         </motion.div>
                    </div>
                </div>

                {/* BOTTOM: Full-width Blue Card */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ delay: 0.3 }}
                    className="bg-micron-eggplant-light text-zinc-900 rounded-2xl p-6 shadow-xl border border-white/20"
                >
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-900/10">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">THE CLOSED LOOP</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Stats Column */}
                        <div className="md:col-span-4 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-zinc-900/10 pb-4 md:pb-0 justify-center">
                            <div>
                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tighter">15 min</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-700">FAB TO FRONT DOOR</p>
                            </div>
                            <div>
                                <h4 className="text-3xl md:text-4xl font-black text-white tracking-tighter">1</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-700">ADDRESS</p>
                            </div>
                        </div>
                        {/* Text Column */}
                        <div className="md:col-span-8 flex flex-col justify-center">
                            <p className="text-zinc-800 text-sm md:text-base font-medium leading-relaxed">
                                Micron silicon is fabricated fifteen minutes from the front door. Optimus and Cybercab run on Micron silicon. The executives who designed the memory architecture host guests, close recruits, and entertain partners alongside machines powered by their own work. <strong className="text-white">Feedback travels from the dining room to the fab floor by morning.</strong>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }
    
    // CONTENT FOR "THE TECTONIC SHIFT" (ID 1)
    return (
        <div className="flex flex-col gap-6 h-full pb-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                 <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-4 ml-2 flex items-center gap-3">
                    The Zoom Out
                    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 hover:opacity-100 transition-opacity cursor-help">
                        <path d="M9 2C5 2 2 8 2 14C2 19.5 5 22 9 22C13 22 16 19.5 16 14C16 8 13 2 9 2Z" fill="#a1a1aa"/>
                        <circle cx="6" cy="10" r="1.5" fill="#7db0d3"/>
                        <circle cx="12" cy="8" r="1.2" fill="#7db0d3"/>
                        <circle cx="9" cy="14" r="1.8" fill="#7db0d3"/>
                        <circle cx="5" cy="16" r="1" fill="#7db0d3"/>
                        <circle cx="13" cy="15" r="1.3" fill="#7db0d3"/>
                        <circle cx="8" cy="7" r="1" fill="#7db0d3"/>
                    </svg>
                 </h3>
            </motion.div>

            {/* TOP ROW: Thesis and Psychology side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white text-zinc-900 rounded-3xl p-8 border border-zinc-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="mb-4">
                        <h4 className="text-zinc-400 font-bold uppercase text-xs tracking-[0.2em] mb-4">The Thesis</h4>
                        <h5 className="text-3xl font-black text-micron-eggplant mb-4 uppercase leading-none">Crisis of<br/>"Shared Reality"</h5>
                    </div>
                    <p className="text-zinc-600 font-medium leading-relaxed">
                        For 200,000 years, a bipedal figure meant a mind. That certainty is vanishing. We risk a conceptual disruption regarding personhood and moral agency.
                    </p>
                </motion.div>

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white text-zinc-900 rounded-3xl p-8 border border-zinc-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="mb-4">
                        <h4 className="text-zinc-400 font-bold uppercase text-xs tracking-[0.2em] mb-4">The Psychology</h4>
                        <h5 className="text-3xl font-black text-micron-eggplant mb-4 uppercase leading-none">Uncanny<br/>Stress</h5>
                    </div>
                    <p className="text-zinc-600 font-medium leading-relaxed">
                        Flooding the "Face Network" with synthetic entities causes "Social Inflammation." At what density does human psychological comfort break down?
                    </p>
                </motion.div>
            </div>

            {/* BOTTOM ROW: The Open Questions (Full Width) - UPDATED TO COLORED TILES */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-zinc-200 shadow-xl flex flex-col justify-center gap-6 mt-2 text-zinc-900"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Info size={24} className="text-zinc-400" />
                    <h4 className="text-micron-eggplant font-bold uppercase text-sm tracking-[0.2em]">Open Questions</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. Empathy - Green */}
                    <div className="flex flex-col gap-3 bg-micron-green text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">Empathy</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                            Does the presence of humanoid robots in domestic spaces alter human empathy?
                        </p>
                    </div>
                    
                    {/* 2. Privacy - Grey2 */}
                    <div className="flex flex-col gap-3 bg-micron-grey2 text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">Privacy</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                             What is the legal definition of "home" when it is monitored by sensors for autonomous navigation?
                        </p>
                    </div>
                    
                    {/* 3. Etiquette - Eggplant */}
                    <div className="flex flex-col gap-3 bg-micron-eggplant text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">Etiquette</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                            How do we encode "politeness" and "personal space" into autonomous movement protocols?
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
  };

  // Randomized staggered delay array
  const randomDelays = [0, 0.4, 0.2];

  return (
    // UPDATED: Padding increased to px-8 on mobile, reduced header margins for tightness
    <section id="serving-tesla" className="container mx-auto px-8 md:px-12 py-6 md:py-12 bg-white text-zinc-900">
        
        {/* Header - Updated margins to mb-12, pb-8 and added items-end to match Vision */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">05 / LIVING LAB</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                    LIVING LAB
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           BEYOND SILICON
                       </span>
                       Where Micron's memory powers the inference, and the residence itself tests the integration. A living laboratory for the societal impact of embodied AI.
                    </p>
                 </div>
            </div>
        </motion.div>

        {/* Cards - UPDATED: Reduced min-height by ~30% from 280 to 200 */}
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teslaCards.map((card, i) => (
                    <BentoCard
                        key={card.id}
                        // UPDATED: Increased min-height to min-h-[300px] (50% increase from 200px)
                        className={`flex flex-col min-h-[300px] p-6 md:p-8 relative overflow-hidden group shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] ${card.gradient} ${card.border} transition-colors duration-500`}
                        gradient={card.gradient}
                        textColor="text-white"
                        borderColor="border-white/10"
                        delay={randomDelays[i] || 0} // Using random stagger
                        hoverEffect={true}
                        onClick={() => setModalData({
                            title: card.title,
                            subtitle: card.subtitle,
                            category: 'showcase',
                            theme: 'light', // Force light theme for consistency
                            maxWidth: 'max-w-7xl', // Ensure uniform size with other modals
                            content: getModalContent(card.id)
                        })}
                    >
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                {card.icon && (
                                    <div className={`mb-6 p-3 rounded-full bg-white/10 w-fit backdrop-blur-md border border-white/10 ${card.descriptionColor}`}>
                                        {React.cloneElement(card.icon as React.ReactElement<any>, { size: 28 })}
                                    </div>
                                )}
                                {/* Title size adjusted for smaller layout */}
                                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 leading-[0.9] text-white drop-shadow-lg transition-colors duration-300 ${card.titleHoverColor}`}>
                                    {card.title}
                                </h3>
                                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 ${card.subtitleColor}`}>
                                    {card.subtitle}
                                </p>
                            </div>
                            
                            <div className="mt-auto">
                                <div className="h-px w-full bg-white/20 mb-4" />
                                <p className={`text-sm md:text-base font-medium leading-relaxed ${card.descriptionColor}`}>
                                    {card.content}
                                </p>
                            </div>
                        </div>
                    </BentoCard>
                ))}
            </div>
        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
