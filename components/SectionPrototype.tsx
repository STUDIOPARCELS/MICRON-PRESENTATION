import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { ArrowUpRight, Play, Zap, BrainCircuit, Globe, Activity, ShieldCheck, Server, TrendingUp, Handshake, Building2, Cpu, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

// Helper component for inner bento cards within the modal
// UPDATED: Removed decorative icon from top right, added Separator Line
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white" }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 ${textColor} relative overflow-hidden group 
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
            border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
            ${className}
        `}
    >
        {/* Top Highlight for 3D Bevel */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col">
            {(title || icon) && (
                <>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 flex items-center gap-3 drop-shadow-md">
                        {icon && React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })}
                        {title}
                    </h3>
                    {/* SEPARATOR LINE */}
                    <div className={`h-px w-full ${textColor === 'text-zinc-900' ? 'bg-zinc-900/10' : 'bg-white/20'} mb-4`}></div>
                </>
            )}
            {/* UPDATED: Decreased opacity to text-white/50 for higher contrast with bold text */}
            <div className={`text-sm md:text-base leading-relaxed font-body font-medium flex-1 drop-shadow-sm ${textColor === 'text-zinc-900' ? 'text-zinc-500' : 'text-white/50'}`}>
                {children}
            </div>
        </div>
    </motion.div>
);

const getCardData = (id: number): ModalContent => {
  // Common config for all Prototype Section modals: Light Theme (White Background), Showcase Category
  const base = { category: 'showcase' as const, theme: 'light' as const };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: 'VISION',
        content: (
            <div className="flex flex-col lg:flex-row gap-4 h-full">
                {/* LEFT COLUMN: PORTRAIT VIDEO - Reduced width to 3/12 (25%) */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-full lg:w-3/12 bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-white/10 flex-shrink-0 order-1 min-h-[300px] lg:min-h-0"
                >
                     <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1931&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                            <Play className="text-white fill-white ml-2" size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg text-center leading-none">
                            Cosmic<br/>Zoo
                        </h3>
                     </div>
                </motion.div>

                {/* RIGHT COLUMN: EXPANDED GRID - Increased width to 9/12 (75%) */}
                <div className="w-full lg:w-9/12 flex flex-col gap-4 order-2">
                    {/* ADDED INTRO LINE - WRAPPED IN WHITE 3D BENTO BOX - REDUCED FONT SIZE & PADDING */}
                    <InnerBento 
                        gradient="bg-white" 
                        textColor="text-zinc-900" 
                        // UPDATED: Removed 'border border-zinc-200' to remove outline
                        className="mb-0 shadow-xl !p-5 md:!p-6"
                        delay={0.15}
                    >
                        <p className="text-sm md:text-base font-medium text-zinc-800 leading-relaxed">
                            A private corporate residence powered by autonomous technology — where Micron hosts, entertains, and demonstrates the future it's building.
                        </p>
                    </InnerBento>

                    {/* TOP CARD: The Autonomous Hub - TIGHTER PADDING */}
                    <InnerBento 
                        title="THE AUTONOMOUS HUB" 
                        gradient="bg-micron-green" 
                        icon={<ShieldCheck className="text-white/80" />}
                        delay={0.2}
                        className="!p-5 md:!p-6"
                    >
                        <p className="text-xs md:text-sm leading-relaxed text-white font-medium">
                            A secure, autonomous property for executive hosting, strategic entertaining, and confidential events — centrally located within a historic neighborhood. Optimus and Cybercab units execute all logistics, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                        </p>
                    </InnerBento>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                         {/* BOTTOM LEFT - TIGHTER PADDING */}
                        <InnerBento 
                            title="INTEGRATION" 
                            gradient="bg-micron-eggplant" 
                            icon={<Zap className="text-white/80" />}
                            delay={0.3}
                            className="flex flex-col justify-between !p-5 md:!p-6"
                        >
                            <p className="text-xs md:text-sm leading-relaxed text-white/80 font-medium mb-2">
                                <span className="text-white font-bold block mb-1 text-base">A Venue for Leadership.</span>
                                A residential venue for the leaders building the future and the policymakers governing it. Guests meet to experience the shift to autonomous systems directly.
                            </p>
                        </InnerBento>

                        {/* BOTTOM RIGHT - TIGHTER PADDING */}
                        <InnerBento 
                            title="INFLECTION POINT" 
                            gradient="bg-micron-grey1" 
                            icon={<TrendingUp className="text-white/80" />}
                            delay={0.4}
                            className="flex flex-col justify-between !p-5 md:!p-6"
                        >
                            <p className="text-xs md:text-sm leading-relaxed text-white/80 font-medium mb-2">
                                <span className="text-white font-bold block mb-1 text-base">Scaling to Billions.</span>
                                Autonomous systems are scaling from thousands to billions. Daily life transforms permanently. The leaders building that future meet here to confront the profound questions it demands.
                            </p>
                        </InnerBento>
                    </div>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'TIMING', 
        subtitle: "THIS MOMENT",
        content: (
            <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
                {/* LEFT COLUMN: Video + Runway (Green) */}
                <div className="lg:w-5/12 flex flex-col gap-6">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer border-t border-white/20 border-b border-white/10 flex-shrink-0"
                    >
                         <div className="absolute inset-0 opacity-80 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
                         <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                             <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                                <Play className="text-white fill-white ml-1" size={24} />
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-lg">
                                The Window
                             </h3>
                         </div>
                    </motion.div>

                    <InnerBento title="RUNWAY" gradient="bg-micron-green" delay={0.3} className="flex-1">
                        <p className="text-sm leading-relaxed font-medium">The window to build, test, and refine the first autonomous corporate residence exists right now — before the technology scales to mass production and the conversation shifts from design to regulation.</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/60">Defining the Standard</p>
                    </InnerBento>
                </div>

                {/* RIGHT COLUMN */}
                <div className="lg:w-7/12 flex flex-col gap-6">
                    {/* BOISE'S MOMENT - Updated Text */}
                    <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-eggplant-light" delay={0.2}>
                        <div className="space-y-6">
                            <p className="text-sm leading-relaxed text-white/95 font-medium">
                                A city once known primarily for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment scene, and the kind of civic energy that comes with a Division I University town.
                            </p>
                            
                            {/* Stats Row */}
                            <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                                <div>
                                    <span className="block text-3xl font-black text-white">25</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Miles of Greenbelt</span>
                                </div>
                                <div>
                                    <span className="block text-3xl font-black text-white">45</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Mins to Skiing</span>
                                </div>
                            </div>
                        </div>
                    </InnerBento>

                    {/* 3 ARCS CONVERGING */}
                    <InnerBento 
                        title="3 ARCS CONVERGING" 
                        gradient="bg-micron-eggplant" 
                        className="flex-1"
                        delay={0.4}
                    >
                        <div className="flex flex-col gap-3 h-full">
                            {/* Light cards for readability inside the Purple Box */}
                            <div className="flex flex-col gap-3">
                                {/* 1. City */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Building2 size={20} className="text-micron-eggplant" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Cultural Maturity</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">A city reaching its peak after decades of quiet growth.</p>
                                    </div>
                                </div>

                                {/* 2. Micron */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Cpu size={20} className="text-micron-green" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Infrastructure</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">Micron deploying $200B investment into its hometown.</p>
                                    </div>
                                </div>

                                {/* 3. Tesla */}
                                <div className="bg-white rounded-xl p-4 flex gap-4 items-center shadow-lg transform transition-transform hover:scale-[1.02]">
                                    <div className="bg-zinc-100 p-2 rounded-lg shrink-0">
                                        <Bot size={20} className="text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-900 font-bold text-xs uppercase tracking-wider mb-0.5">Robotics</h4>
                                        <p className="text-zinc-600 text-xs font-medium leading-snug">Tesla placing autonomous systems into the world.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/10 text-center">
                                 <p className="text-white/80 text-xs leading-relaxed font-bold uppercase tracking-widest">
                                    Converging on Warm Springs Ave
                                 </p>
                            </div>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 3: return { 
        ...base, 
        title: 'COLLABORATION', 
        subtitle: 'SHARED MISSIONS',
        content: (
            <div className="flex flex-col gap-6 h-full">
                {/* ROW 1: THE PLAYERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[250px]">
                    <InnerBento 
                        title="" 
                        gradient="bg-micron-eggplant" 
                        delay={0.1}
                        className="flex flex-col justify-between"
                    >
                         <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">MICRON</h3>
                                {/* CHANGED: Icon color from text-micron-green to text-zinc-400 (Gray) */}
                                <Cpu size={24} className="text-zinc-400" />
                            </div>
                            {/* CHANGED: Sanjay name to Gray (text-zinc-400) */}
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-4">Sanjay Mehrotra, CEO</p>
                            {/* CHANGED: Text White, increased font size from text-sm to text-base */}
                            <p className="text-base font-bold leading-tight mb-4 text-white tracking-tight italic">
                                "Transform how the world uses information to enrich life for all."
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/20">
                            <p className="text-white/80 text-sm leading-relaxed font-medium">
                                Founded 1978, Boise. Today, every Tesla vehicle carries 20 Micron memory chips delivering a 30x bandwidth leap. The chips enabling Optimus originate here.
                            </p>
                        </div>
                    </InnerBento>

                    <InnerBento 
                        title="" 
                        gradient="bg-black" 
                        delay={0.2}
                        className="flex flex-col justify-between"
                    >
                         <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white leading-none">TESLA</h3>
                                <Bot size={24} className="text-zinc-400" />
                            </div>
                            <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] mb-4">Elon Musk, CEO</p>
                            {/* CHANGED: Text White, increased font size from text-sm to text-base */}
                            <p className="text-base font-bold leading-tight mb-4 text-white tracking-tight italic">
                                "Accelerate the world's transition to sustainable energy" & "Build a world of amazing abundance."
                            </p>
                        </div>
                        <div className="mt-auto pt-4 border-t border-white/20">
                            <p className="text-white/80 text-sm leading-relaxed font-medium">
                                Founded 2003. Leading the world in autonomous robotics. Optimus and Cybercab require Micron's advanced memory infrastructure.
                            </p>
                        </div>
                    </InnerBento>
                </div>

                {/* ROW 2: FUTURE SCALE (Full Width) */}
                <div className="grid grid-cols-1 gap-6 flex-1 min-h-[300px]">
                    {/* FUTURE SCALE - RESTORED TO SIDE-BY-SIDE LAYOUT */}
                    <InnerBento 
                        title="FUTURE SCALE" 
                        gradient="bg-zinc-100" 
                        textColor="text-zinc-900" 
                        icon={<TrendingUp className="text-zinc-400" />}
                        delay={0.3}
                        className="flex flex-col justify-center border-black/5"
                    >
                        <div className="flex flex-col lg:flex-row gap-8 h-full items-center">
                            {/* LEFT SIDE: STATS */}
                            <div className="flex flex-row lg:flex-col justify-between lg:justify-center gap-8 lg:gap-8 w-full lg:w-4/12 border-b lg:border-b-0 lg:border-r border-zinc-300 pb-6 lg:pb-0 lg:pr-8 h-full">
                                <div className="flex flex-col justify-center">
                                    <span className="block text-4xl lg:text-6xl font-black tracking-tighter text-micron-eggplant leading-none">$200B</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Micron Investment</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="block text-4xl lg:text-6xl font-black tracking-tighter text-micron-eggplant leading-none">1M+</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">Optimus Capacity</span>
                                </div>
                            </div>
                            
                            {/* RIGHT SIDE: TEXT */}
                            <div className="w-full lg:w-8/12 flex flex-col justify-center h-full space-y-4 pr-2">
                                <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                                    In June 2025, Micron announced <span className="font-bold text-black">$200 billion</span> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history, creating 90,000 jobs.
                                </p>
                                <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                                    Tesla is targeting <span className="font-bold text-black">50,000 Optimus units by this year and million-unit annual capacity</span> beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                                </p>
                                <p className="text-sm leading-relaxed text-zinc-900 font-medium">
                                    Under Elon Musk and Sanjay Mehrotra, these two companies are scaling toward a <span className="font-bold text-black">future where autonomous systems outnumber people</span> — and both leaders have acknowledged that the speed of <span className="font-bold text-black">this transition carries a shared responsibility</span>.
                                </p>
                            </div>
                        </div>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'PLACE',  // CHANGED FROM FOUNDATION
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        content: (
        <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
           {/* LEFT COLUMN: TALL IMAGE (50%) */}
           <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                // UPDATED: Removed 'border border-white/10'
                className="w-full lg:w-1/2 bg-zinc-900 rounded-2xl overflow-hidden shadow-lg relative group shrink-0 min-h-[400px]"
            >
                 <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" 
                    alt="Historic Foundation" 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10">
                    <span className="text-micron-green font-bold uppercase tracking-widest text-xs md:text-sm mb-1 block">Est. 1890</span>
                    <h4 className="text-white font-bold text-2xl md:text-4xl uppercase tracking-tight">The Historic Bedrock</h4>
                 </div>
           </motion.div>

           {/* RIGHT COLUMN: 3 CARDS (50%) */}
           <div className="w-full lg:w-1/2 flex flex-col gap-4">
               <InnerBento 
                    title="ADDRESS" 
                    gradient="bg-micron-green"
                    icon={<Globe />}
                    delay={0.2}
                    className=""
               >
                   <p className="text-sm leading-relaxed">
                       Warm Springs Avenue is a tree-lined corridor on the <span className="font-bold text-white">National Register of Historic Places</span> — where Boise's wealthiest families built estates heated by the <span className="font-bold text-white">city's most radical technology: hot water from the ground.</span>
                   </p>
               </InnerBento>

               <InnerBento 
                    title="ENERGY" 
                    gradient="bg-micron-eggplant-light"
                    icon={<Activity />}
                    delay={0.3}
                    className=""
               >
                   <p className="text-sm leading-relaxed">
                       In 1892, C.W. Moore piped 177°F geothermal water into his mansion — <span className="font-bold text-white">the first home in America heated by natural hot water.</span> The idea spread down the avenue, then downtown, and by 1982 to the State Capitol — now the only capitol building in the country on geothermal. Today, the same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.
                   </p>
               </InnerBento>

               <InnerBento 
                    title="CONFLUENCE"
                    // CHANGED: From bg-micron-black to bg-micron-grey1
                    gradient="bg-micron-grey1"
                    icon={<Zap />}
                    delay={0.4}
                    className=""
               >
                   <p className="text-sm leading-relaxed">
                       Heat from an aquifer tapped in 1892. Data from a satellite constellation powered by solar energy in space. Hot water rising from below. Signal arriving from above. <span className="font-bold text-white">The oldest residential energy system in the country meeting the newest</span> — on a street that has been absorbing the future for 130 years.
                   </p>
               </InnerBento>
           </div>
        </div>
    )};
    default: return { ...base, title: '', content: null };
  }
};

export const SectionPrototype: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const mainTitleWords = ["MICRON.", "TESLA.", "BOISE."];
  
  return (
    // Reduced padding: py-16 instead of py-24, adjusted px for mobile (px-4) vs desktop (px-12)
    <section id="prototype" className="container mx-auto px-4 md:px-12 py-8 md:py-16 bg-white text-zinc-900">
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
        className="pointer-events-auto"
      >
        {/* Header - Aligned with other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-green leading-none font-sans">A NEW DAY</h2>
            </div>
            <div className="md:ml-auto max-w-2xl pb-1">
                <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                    <div className="text-base font-light text-zinc-600 leading-snug font-body">
                        {/* MAIN HEADER: Text-2xl to 3xl */}
                        <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans cursor-default">
                            {mainTitleWords.map((word, i) => (
                                <motion.span 
                                        key={i}
                                        initial={{ opacity: 0, x: -5 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        whileHover={{ 
                                            y: -4, 
                                            x: 2, 
                                            scale: 1.05, 
                                            // LOGIC: BOISE=Green, TESLA=Black, Default=Eggplant
                                            color: word === "BOISE." ? '#008f25' : (word === "TESLA." ? '#000000' : '#2c0f38'),
                                            transition: { duration: 0.2 } 
                                        }}
                                        transition={{ duration: 0.4, delay: i * 0.2 }} 
                                        className="mr-3 inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        
                        {/* DESCRIPTION: Text-Base */}
                        <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: (mainTitleWords.length * 0.2) + 0.2 }}
                                className="text-micron-eggplant block text-base"
                        >
                            Creating the first autonomous corporate residence. Where Micron's semiconductor revolution, Tesla's autonomous ecosystem, and Boise's emergence as a global tech hub converge at an inflection point — and 1020 Warm Springs Avenue delivers the first tangible glimpse of the autonomous era.
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Bento Grid - RESPONSIVE FIX: grid-cols-1 (mobile) -> grid-cols-2 (tablet) -> grid-cols-4 (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: PROTOTYPE (Black) */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-black" 
            textColor="text-white"
            borderColor="border-white/10"
            delay={0.1} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(1))}
            >
                <div className="relative z-10 mt-auto">
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                        PROTOTYPE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        A New Paradigm
                    </p>
                </div>
            </BentoCard>

            {/* Card 2: COLLABORATION (Blue) */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-eggplant-light" 
            textColor="text-white"
            borderColor="border-white/10"
            delay={0.2} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(3))}
            >
                <div className="relative z-10 mt-auto">
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-black transition-colors duration-300 mb-4">
                        COLLABORATION
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Shared Missions
                    </p>
                </div>
            </BentoCard>

            {/* Card 3: TIMING (Green) */}
            <BentoCard 
                className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
                gradient="bg-micron-green"
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.3} 
                hoverEffect={true}
                onClick={() => setModalData(getCardData(2))}
            >
            <div className="relative z-10 mt-auto">
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant transition-colors duration-300 mb-4">
                        TIMING
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                        Boise's Moment
                    </p>
            </div>
            </BentoCard>

            {/* Card 4: PLACE (Eggplant) - CHANGED FROM FOUNDATION */}
            <BentoCard 
            className="flex flex-col min-h-[320px] md:h-[480px] p-8 relative overflow-hidden group" 
            gradient="bg-micron-eggplant" 
            textColor="text-white" 
            borderColor="border-white/10"
            delay={0.4} 
            hoverEffect={true}
            onClick={() => setModalData(getCardData(4))}
            >
                <div className="relative z-10 mt-auto">
                    {/* CHANGED: group-hover text color from micron-green to micron-eggplant-light (blue) */}
                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
                        PLACE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Place & Perspective
                    </p>
                </div>
            </BentoCard>

        </div>
      </motion.div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};