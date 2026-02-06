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
                        // UPDATED: Added floating shadow effects
                        className="bg-zinc-100 rounded-[2rem] p-8 border border-zinc-200 relative overflow-hidden flex flex-col justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
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
                        // UPDATED: Added floating shadow effects
                        className="bg-[#2c2e33] text-white rounded-[2rem] p-8 border border-zinc-700 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
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
                    // UPDATED: Added floating shadow effects
                    className="bg-white rounded-[2rem] p-8 border border-zinc-200 flex flex-col gap-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                >
                     <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-100">
                        <img 
                            src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-transparent.png" 
                            alt="Micron House Icon"
                            // UPDATED: Doubled size from w-20 h-20 to w-40 h-40, increased mb to 6
                            className="w-40 h-40 object-contain opacity-90 mb-6"
                        />
                        <h3 className="text-2xl font-bold text-micron-eggplant leading-tight tracking-tight">Concept & Design</h3>
                        <p className="text-sm text-zinc-500 mt-2 font-medium">
                            I designed this emblem to represent the convergence at play in this house. A visual map of the autonomous home.
                        </p>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {/* Earth - Green */}
                        <div className="bg-micron-green text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Mountain size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Earth</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The foundation. Geothermal energy and renewable resources.</p>
                        </div>

                        {/* Sky - Blue */}
                        <div className="bg-micron-eggplant-light text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Star size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Sky</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The stars. Infinite potential.</p>
                        </div>

                        {/* Memory - Eggplant */}
                        <div className="bg-micron-eggplant text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers size={18} className="text-white/80" />
                                <span className="font-bold uppercase text-xs tracking-widest">Memory</span>
                            </div>
                            <p className="text-white/80 text-xs leading-relaxed font-medium">The intelligence. Micron. Silicon memory and processing power.</p>
                        </div>

                        {/* Velocity - Grey */}
                        <div className="bg-micron-grey1 text-white rounded-xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10 flex flex-col gap-2">
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
            // MATCHING PROTOTYPE LAYOUT STRUCTURE
            <div className="flex flex-col gap-8 h-auto pb-12">
                
                {/* 1. INTRO TEXT (Full Width) */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full flex flex-col items-start"
                >
                    {/* REMOVED HEADER "THE LIVING LABORATORY" AS REQUESTED */}
                    {/* UPDATED: Font size increased to text-xl */}
                    <div className="text-zinc-900 text-xl font-medium leading-relaxed">
                        <p>
                            Domestic intelligence generated at Micron House feeds directly into product development cycles. The residence becomes an active research node — gathering real-world behavioral data in a controlled, premium environment.
                        </p>
                    </div>
                </motion.div>

                {/* 2. WHITE FEATURE CARD (Full Width - Matches 'Service & Security Layer') */}
                {/* UPDATED: Height reduced by ~20% (py-6->py-4, mb-6->mb-4, min-h-[120px]->min-h-[80px]) */}
                {/* UPDATED: Added floating shadow effects */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full bg-white rounded-xl px-6 py-4 md:px-8 md:py-4 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                    <div className="flex items-baseline gap-4 mb-4 relative z-10">
                        <h3 className="text-xl font-black uppercase tracking-tight text-micron-green flex items-center gap-2">
                            <Activity size={20} /> CLOSED LOOP
                        </h3>
                        {/* UPDATED: Increased to text-sm */}
                        <span className="text-sm font-bold uppercase tracking-widest text-zinc-400 hidden md:block">Proximity Advantage</span>
                    </div>
                    
                    {/* UPDATED: Reduced bottom margin */}
                    <div className="w-full h-px bg-zinc-200 mb-4 relative z-10" />

                    {/* UPDATED: Increased base text to text-lg md:text-xl, reduced grid gap */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 text-zinc-600 text-lg md:text-xl font-medium leading-relaxed relative z-10 items-center">
                        <div className="flex flex-col gap-6 md:gap-8">
                             <div>
                                 <span className="block text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">15 <span className="text-2xl font-bold align-top text-zinc-400">min</span></span>
                                 {/* UPDATED: Increased to text-sm */}
                                 <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Fab to Front Door</span>
                             </div>
                             <div>
                                 <span className="block text-5xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-none">1</span>
                                 {/* UPDATED: Increased to text-sm */}
                                 <span className="text-sm font-bold uppercase tracking-widest text-zinc-500">Address</span>
                             </div>
                        </div>
                        
                        {/* Separator - Reduced height */}
                        <div className="hidden md:flex justify-center h-full min-h-[80px]">
                            <div className="w-[3px] bg-micron-green h-full rounded-full"></div>
                        </div>
                        <div className="md:hidden w-full h-[3px] bg-micron-green rounded-full"></div>

                        <div className="flex flex-col gap-2">
                             <p className="leading-snug">
                                Optimus and Cybercab run on Micron silicon fabricated fifteen minutes from the front door. Executives host guests alongside machines powered by their own work. Feedback travels from the dining room to the fab floor by morning.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 3. BOTTOM GRID (Split 2/3 + 1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* LEFT: IMAGE (Col Span 2) */}
                    <div className="lg:col-span-2 w-full h-full min-h-[400px]">
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            // UPDATED: Added floating shadow effects
                            className="w-full h-full relative rounded-xl overflow-hidden border border-zinc-200 group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
                         >
                            <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/tesla-optimus-gen-3-delay.png" 
                                alt="Optimus Gen 3" 
                                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-2">
                                    Living Laboratory
                                </div>
                                <h4 className="text-white text-2xl font-black uppercase leading-none tracking-tight">
                                    Intelligence Flow
                                </h4>
                            </div>
                         </motion.div>
                    </div>
                    
                    {/* RIGHT: STACKED BENTOS (Col Span 1) */}
                    <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                        {/* THE FEEDBACK LOOP */}
                        <InnerBento 
                            gradient="bg-micron-eggplant" 
                            direction="right" 
                            delay={0.7} 
                            className="flex-grow" 
                            padding="p-6"
                        >
                            <div className="flex flex-col mb-3">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1 font-sans flex items-center gap-2">
                                    <MessageSquare size={16} /> THE FEEDBACK LOOP
                                </h3>
                                {/* UPDATED: Increased to text-xs */}
                                <span className="text-xs uppercase tracking-widest text-white/50">Training Ground</span>
                            </div>
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <ul className="space-y-3 mb-4">
                                {[
                                    "Optimus prepares a private dining room for a confidential executive dinner.",
                                    "Optimus manages a quiet household for an employee's family.",
                                    "Cybercab delivers a senior Washington official to a fireside."
                                ].map((item, i) => (
                                    // UPDATED: Increased to text-base
                                    <li key={i} className="flex items-start gap-3 text-white/90 text-base font-medium leading-snug">
                                        <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* UPDATED: Increased to text-sm */}
                            <p className="text-sm text-white/60 font-bold uppercase tracking-wide leading-relaxed border-t border-white/10 pt-3">
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
                            <div className="flex flex-col mb-3">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-1 font-sans flex items-center gap-2">
                                    <ShieldCheck size={16} /> PRE-PUBLIC DEPLOYMENT
                                </h3>
                                {/* UPDATED: Increased to text-xs */}
                                <span className="text-xs uppercase tracking-widest text-white/50">First Access</span>
                            </div>
                            <div className="w-full h-px bg-white/20 mb-4" />
                            {/* UPDATED: Increased to text-base */}
                            <div className="space-y-4 text-white/90 text-base font-medium leading-relaxed">
                                <p>
                                    Micron's leadership experiences Optimus and Cybercab across the full spectrum of real life before any consumer on earth.
                                </p>
                                <p>
                                    Operational variety builds institutional knowledge. Every scenario deepens the data, sharpens the model, and strengthens the partnership.
                                </p>
                                {/* UPDATED: Increased to text-sm */}
                                <p className="text-sm font-bold uppercase tracking-widest text-micron-green pt-2">
                                    Confidential. Celebratory. Compassionate. Political.
                                </p>
                            </div>
                        </InnerBento>
                    </div>
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
                // UPDATED: Added floating shadow effects
                className="bg-micron-eggplant-light text-zinc-900 rounded-[2rem] p-8 md:p-10 border border-white/20 flex flex-col gap-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                 {/* Scale Section */}
                 <div>
                    <h5 className="text-3xl font-black text-white mb-3 uppercase leading-none tracking-tight">SCALE</h5>
                    <p className="text-white font-medium leading-relaxed text-lg md:text-xl">
                        Autonomous systems are moving from thousands to billions within a decade. Speed of adoption outpaces all previous technological transition — electricity, the internet, smartphones. Micron silicon powers the memory in every unit.
                    </p>
                 </div>

                 {/* Divider */}
                 <div className="w-full h-px bg-white/30" />

                 {/* Friction Section */}
                 <div>
                    <h5 className="text-3xl font-black text-white mb-3 uppercase leading-none tracking-tight">FRICTION</h5>
                    <p className="text-white font-medium leading-relaxed text-lg md:text-xl">
                        Each autonomous unit carries cameras, sensors, and microphones. Billions of mobile platforms operating in homes, neighborhoods, schools, and public spaces permanently alter the sensory landscape of daily life.
                    </p>
                 </div>
            </motion.div>

            {/* BOTTOM ROW: The Open Questions */}
            <motion.div 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                // UPDATED: Added floating shadow effects
                className="bg-white rounded-[2rem] p-8 md:p-10 border border-zinc-200 flex flex-col justify-center gap-6 mt-2 text-zinc-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Info size={24} className="text-zinc-400" />
                    <h4 className="text-micron-eggplant font-bold uppercase text-sm tracking-[0.2em]">OPEN QUESTIONS</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. SURVEILLANCE - Green */}
                    <div className="flex flex-col gap-3 bg-micron-green text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">SURVEILLANCE</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                            Sensors moving through private spaces, sidewalks, schools, parks. What is being recorded, stored, and shared — and by whom?
                        </p>
                    </div>
                    
                    {/* 2. VISUAL VERNACULAR - Grey2 */}
                    <div className="flex flex-col gap-3 bg-micron-grey2 text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
                        <span className="text-white font-bold uppercase text-xs tracking-widest">VISUAL VERNACULAR</span>
                        <p className="text-white/80 font-medium leading-relaxed text-sm">
                             Streets, homes, and neighborhoods filled with humanoid machines. How does permanent autonomous presence in everyday life change how people feel in their own communities?
                        </p>
                    </div>
                    
                    {/* 3. WORST CASE - Eggplant */}
                    <div className="flex flex-col gap-3 bg-micron-eggplant text-white p-6 rounded-xl border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300">
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
                  <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">05 / LIVING LAB</span>
                  <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-400 leading-none font-sans">
                      TESLA
                  </h2>
              </div>
              
              <div className="md:ml-auto max-w-2xl pb-1">
                   <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                      <p className="text-base font-light text-zinc-600 leading-snug font-body">
                         {/* UPDATED: Changed color to text-zinc-400 (Tesla Gray) */}
                         <span className="font-bold text-zinc-400 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
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
                      className={`flex flex-col min-h-[400px] p-8 relative overflow-hidden group ${card.gradient}`}
                      gradient={card.gradient}
                      textColor="text-white"
                      borderColor={card.border}
                      delay={i * 0.1}
                      hoverEffect={true}
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
                               <div className="w-12 h-1 bg-white/20 mb-6" />
                               <p className={`text-lg font-medium leading-relaxed ${card.descriptionColor}`}>
                                   {card.content}
                               </p>
                           </div>
                           
                           <div className="mt-8 flex justify-end">
                              <div className="p-2 rounded-full border border-white/20 bg-white/5 group-hover:bg-white/10 transition-colors">
                                  <ArrowRight size={20} className="text-white" />
                              </div>
                           </div>
                       </div>
                  </BentoCard>
              ))}
          </div>

          <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
      </section>
  );
};