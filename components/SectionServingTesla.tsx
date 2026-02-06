import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Scan, Cpu, MessageSquare, ShieldCheck, Users, Eye, Info, Activity, Feather, FileSignature, Palette, User, Layers, Zap, Droplets, Mountain, Star, Car, Bot } from 'lucide-react';
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

                {/* UPDATED LAYOUT: 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    
                    {/* LEFT COLUMN: Image + Feedback Loop */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Image Block - TOP */}
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="relative min-h-[320px] rounded-2xl overflow-hidden shadow-lg border border-black/10 group flex-1"
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

                        {/* FEEDBACK LOOP - BOTTOM (Moved from Right Top) */}
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ delay: 0.1 }}
                            className="bg-micron-eggplant text-white p-6 rounded-2xl shadow-lg border border-white/10 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* UPDATED: Title Opaque */}
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white opacity-100">THE FEEDBACK LOOP</h3>
                            
                            {/* UPDATED: Balanced subtext size (text-sm md:text-base) */}
                            <ul className="space-y-3 text-sm md:text-base font-medium text-white/90 leading-relaxed mb-4">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Optimus prepares a private dining room for a confidential executive dinner.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Optimus manages a quiet household for an employee's family.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-micron-green mt-2 shrink-0"></span>
                                    <span>Cybercab delivers a senior Washington official to a fireside.</span>
                                </li>
                            </ul>
                            <p className="text-white font-bold italic border-l-2 border-white/30 pl-3">
                                Three scenarios. Three emotional registers. Each one training autonomous systems.
                            </p>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Closed Loop + Pre-Public Deployment */}
                    <div className="flex flex-col gap-6 h-full">
                         {/* CLOSED LOOP - TOP (Moved from Bottom) */}
                        <motion.div 
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            transition={{ delay: 0.2 }}
                            className="bg-micron-eggplant-light text-zinc-900 rounded-2xl p-6 shadow-xl border border-white/20 flex-1 flex flex-col justify-center"
                        >
                            {/* UPDATED: Title Opaque & White */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-zinc-900/10">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-white opacity-100">THE CLOSED LOOP</h3>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <div className="flex gap-8 justify-start">
                                    <div>
                                        <h4 className="text-3xl font-black text-white tracking-tighter">15 min</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-700">FAB TO FRONT DOOR</p>
                                    </div>
                                    <div>
                                        <h4 className="text-3xl font-black text-white tracking-tighter">1</h4>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-700">ADDRESS</p>
                                    </div>
                                </div>
                                {/* UPDATED: Balanced subtext size (text-sm md:text-base) */}
                                <p className="text-zinc-800 text-sm md:text-base font-medium leading-relaxed">
                                    Optimus and Cybercab run on Micron silicon fabricated 15 minutes from the front door. Executives host guests alongside machines powered by their own work. <strong className="text-white">Feedback travels from the dining room to the fab floor by morning.</strong>
                                </p>
                            </div>
                        </motion.div>

                        {/* PRE-PUBLIC DEPLOYMENT - BOTTOM */}
                        <motion.div 
                             variants={{ hidden: { opacity: 0, y: 0 }, visible: { opacity: 1, y: 0 } }}
                             transition={{ delay: 0.3 }}
                             className="bg-black text-white p-6 pl-8 rounded-2xl shadow-lg border border-white/10 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                         >
                            {/* UPDATED: Title Opaque */}
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-3 text-white opacity-100">PRE-PUBLIC DEPLOYMENT</h3>
                            <div className="mb-2 pl-4 border-l-2 border-white/30">
                                {/* UPDATED: Balanced subtext size (text-sm md:text-base) */}
                                <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed italic">
                                    Micron's leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth.
                                </p>
                            </div>
                            <p className="text-white/70 text-xs font-medium leading-relaxed mt-3">
                                Confidential. Celebratory. Compassionate. Political. Operational variety building institutional knowledge.
                            </p>
                         </motion.div>
                    </div>
                </div>
            </div>
        );
    }
    
    // CONTENT FOR "THE TECTONIC SHIFT" (ID 1) -> UPDATED TO "HUMANOIDS SCALING TO BILLIONS"
    return (
        <div className="flex flex-col gap-6 h-full pb-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="w-full">
                <h3 className="text-3xl font-black text-micron-eggplant mb-4 uppercase leading-none tracking-tight">Humanoids Scaling to Billions</h3>
                <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                    Daily life transforms permanently. Micron House invites the architects of tomorrow to navigate the profound questions involved in bringing this future to the world.
                </p>
                <div className="mt-4 pt-4 border-t border-zinc-100">
                    <p className="text-lg md:text-xl text-zinc-800 font-medium leading-relaxed">
                        Does the constant sight of robots create comfort or anxiety? Where is the boundary between helpful anticipation and intrusive surveillance?
                    </p>
                </div>
            </motion.div>

            {/* TOP ROW: SCALE & FRICTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white text-zinc-900 rounded-3xl p-8 border border-zinc-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="mb-4">
                        <h5 className="text-2xl font-black text-micron-eggplant mb-2 uppercase leading-none tracking-tight">SCALE</h5>
                    </div>
                    <p className="text-zinc-600 font-medium leading-relaxed">
                        Autonomous systems are moving from thousands to billions within a decade. Speed of adoption outpaces all previous technological transition — electricity, the internet, smartphones. Micron silicon powers the memory in every unit.
                    </p>
                </motion.div>

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white text-zinc-900 rounded-3xl p-8 border border-zinc-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="mb-4">
                         <h5 className="text-2xl font-black text-micron-eggplant mb-2 uppercase leading-none tracking-tight">FRICTION</h5>
                    </div>
                    <p className="text-zinc-600 font-medium leading-relaxed">
                        Each autonomous unit carries cameras, sensors, and microphones. Billions of mobile platforms operating in homes, neighborhoods, schools, and public spaces permanently alter the sensory landscape of daily life.
                    </p>
                </motion.div>
            </div>

            {/* BOTTOM ROW: The Open Questions */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-zinc-200 shadow-xl flex flex-col justify-center gap-6 mt-2 text-zinc-900"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Info size={24} className="text-zinc-400" />
                    <h4 className="text-micron-eggplant font-bold uppercase text-sm tracking-[0.2em]">OPEN QUESTIONS</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. SURVEILLANCE - Green */}
                    <div className="flex flex-col gap-3 bg-micron-green text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">SURVEILLANCE</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                            Sensors moving through private spaces, sidewalks, schools, parks. What is being recorded, stored, and shared — and by whom?
                        </p>
                    </div>
                    
                    {/* 2. VISUAL VERNACULAR - Grey2 */}
                    <div className="flex flex-col gap-3 bg-micron-grey2 text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">VISUAL VERNACULAR</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                             Streets, homes, and neighborhoods filled with humanoid machines. How does permanent autonomous presence in everyday life change how people feel in their own communities?
                        </p>
                    </div>
                    
                    {/* 3. WORST CASE - Eggplant */}
                    <div className="flex flex-col gap-3 bg-micron-eggplant text-white p-6 rounded-xl shadow-sm border border-white/10 hover:-translate-y-1 transition-transform">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">WORST CASE</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                            Mass malfunction. Security breach across millions of units. Coordinated exploit. What does preparedness look like before deployment — and who is in the room when those scenarios are discussed?
                        </p>
                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-4 pt-4 border-t border-zinc-100">
                    <p className="text-zinc-600 font-medium italic text-center text-sm md:text-base leading-relaxed">
                        Micron House is where these concerns are explored — in person, between the people designing the systems and the people governing them.
                    </p>
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