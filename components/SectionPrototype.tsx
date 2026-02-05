
import React, { useState, useRef, useEffect } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Play, Zap, ShieldCheck, TrendingUp, Globe, Activity, Cpu, Bot, Building2, Check, ArrowRight, MessageSquare, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// --- VIDEO ASSETS ---
const VIDEO_TIMING = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cropped%20POTATO%20MICRON%20SEQUENCE.mp4";
const VIDEO_COLLAB = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/FINAL%20FINAL.mp4";
const VIDEO_PLACE = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/FINAL%20CW%20MOORE%20FULL.mp4"; 
const VIDEO_PLACEHOLDER = VIDEO_COLLAB; 

// --- HELPER COMPONENTS ---

const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white", direction = "up" }: any) => {
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: 20 };
    if (direction === "left") initial = { opacity: 0, x: -30 };
    if (direction === "right") initial = { opacity: 0, x: 30 };
    if (direction === "down") initial = { opacity: 0, y: -30 };

    return (
        <motion.div 
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className={`
                ${gradient} rounded-xl p-5 ${textColor} relative overflow-hidden group 
                shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] 
                flex flex-col justify-start
                border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
                ${className}
            `}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            <div className="relative z-10 h-full flex flex-col gap-3">
                {(title || icon) && (
                    <div className="mb-1">
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-tight flex items-center gap-2 drop-shadow-md leading-none ${textColor === 'text-white' ? 'text-white/70' : ''}`}>
                            {icon && React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
                            {title}
                        </h3>
                    </div>
                )}
                <div className={`leading-relaxed font-body font-normal ${textColor === 'text-zinc-900' ? 'text-zinc-600' : 'text-white/80'}`}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const HoverVideoPlayer = ({ src, className = "", isHovering = false }: { src: string; className?: string; isHovering?: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.6 });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

        if (isTouch) {
            if (isInView) {
                video.currentTime = 0;
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        } else {
            if (isHovering) {
                 video.currentTime = 0;
                 video.play().catch(() => {});
            } else {
                 video.pause();
            }
        }
    }, [isInView, isHovering, src]);

    return (
        <div 
            ref={containerRef}
            className={`w-full relative rounded-xl overflow-hidden mb-0 bg-black z-20 group/video ${className}`} 
            style={{ aspectRatio: '1.5/1.1' }}
        >
            <video 
                ref={videoRef}
                key={src}
                src={src} 
                className="absolute inset-0 w-full h-full object-cover" 
                muted 
                playsInline 
            />
        </div>
    );
};

// MODAL VIDEO WRAPPER - Forces aspect-video (16:9) to fit content exactly
const ModalVideo = ({ src, className = "", children }: { src: string; className?: string; children?: React.ReactNode }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative border border-zinc-200 group ${className}`}
    >
      <video 
          key={src} 
          src={src} 
          className="w-full h-full object-cover" 
          autoPlay 
          muted 
          loop
          playsInline 
      />
      {children}
    </motion.div>
);

const getCardData = (id: number): ModalContent => {
  const base = { category: 'showcase' as const, theme: 'light' as const, maxWidth: 'max-w-6xl' };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: undefined, 
        modalLayout: 'default', 
        maxWidth: 'max-w-7xl', 
        content: (
            <div className="flex flex-col gap-6 h-auto">
                {/* Intro Text - Compacted padding/spacing based on screenshot arrows */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="shrink-0 p-1 md:p-2 flex flex-col items-start w-full border-none shadow-none bg-transparent"
                >
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 font-sans">
                        AUTONOMOUS HUB
                    </h3>
                    <div className="text-zinc-900 text-lg font-medium leading-relaxed">
                        <p>
                            A private corporate residence powered by autonomous technology — where Micron hosts, entertains, and demonstrates the future it's building. Optimus and Cybercab units execute all logistics, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                        </p>
                    </div>
                </motion.div>

                {/* Main Content Grid: Video Left, Stack Right */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Video (Takes 2 cols) - ASPECT 1.5/1.1 */}
                    <div className="lg:col-span-2 w-full h-full">
                         <div className="w-full aspect-[1.5/1.1] bg-black rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative border border-zinc-200 group">
                              <video 
                                  src={VIDEO_PLACEHOLDER} 
                                  className="w-full h-full object-cover" 
                                  autoPlay 
                                  muted 
                                  loop
                                  playsInline 
                              />
                         </div>
                    </div>
                    
                    {/* Column 2: Stacked Bentos (Takes 1 col) */}
                    <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                        {/* Box 1: Integration */}
                        <InnerBento 
                            gradient="bg-micron-eggplant" 
                            direction="left" 
                            delay={0.3} 
                            className="flex-shrink-0" 
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">INTEGRATION</h3>
                            <div className="space-y-4 text-white/90 text-lg font-medium leading-relaxed">
                                <p className="font-bold text-white text-lg">A Venue for Leadership.</p>
                                <p>A residential venue for the leaders building the future and the policymakers governing it.</p>
                                <p>Guests meet to experience the shift to autonomous systems directly.</p>
                            </div>
                        </InnerBento>

                        {/* Box 2: Humanoids - TEXT REMOVED TO BALANCE LAYOUT */}
                        <InnerBento 
                            gradient="bg-micron-grey1" 
                            direction="left" 
                            delay={0.4} 
                            className="flex-grow" 
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 font-sans">HUMANOIDS</h3>
                            <div className="space-y-4 text-white/90 text-lg font-medium leading-relaxed">
                                <p className="font-bold text-white text-lg">Scaling to Billions.</p>
                                <p>Daily life transforms permanently. This setting invites the architects of tomorrow to navigate the profound questions involved in bringing this future to the world.</p>
                            </div>
                        </InnerBento>
                    </div>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'TIMING', 
        subtitle: "BOISE'S MOMENT",
        maxWidth: 'max-w-7xl',
        content: (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
               <div className="w-full">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative border border-zinc-200"
                    >
                         <video 
                            src={VIDEO_TIMING} 
                            className="w-full h-full object-cover" 
                            autoPlay muted loop playsInline 
                        />
                        {/* Play Button Removed */}
                        <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                             <h3 className="text-2xl font-black uppercase text-white drop-shadow-md">The Window of Opportunity</h3>
                        </div>
                    </motion.div>
               </div>
               
               <div className="flex flex-col gap-4 h-full">
                    {/* Updated Content Matches Screenshot */}
                    <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-eggplant-light" icon={<TrendingUp />} className="h-auto">
                        <p className="mb-2 text-sm">Boise has arrived. A city once known primarily for potatoes now supports a James Beard-nominated culinary scene, world-class wineries, and a thriving arts scene.</p>
                        <p className="text-sm">The Boise River Greenbelt connects 25 miles of parkland. Bogus Basin is 45 minutes away.</p>
                    </InnerBento>
                    <InnerBento title="RUNWAY" gradient="bg-micron-green" icon={<Activity />} className="h-auto">
                        <p className="mb-2 text-sm">There are no Optimus robots operating in private residences today. The window to build, test, and refine exists right now.</p>
                        <p className="font-bold text-white text-sm">This is a unique moment where a prototype can still define the standard.</p>
                    </InnerBento>
                    <InnerBento title="3 ARCS CONVERGING" gradient="bg-micron-eggplant" icon={<Zap />} className="h-auto">
                         <p className="text-white/90 text-sm mb-3">A city reaching cultural maturity. A semiconductor company deploying historic investment. A robotics company entering the home.</p>
                         <p className="text-white/80 text-sm border-l border-white/20 pl-4">These trajectories converge on the same street where geothermal water first heated homes in 1892.</p>
                    </InnerBento>
               </div>
            </div>
        )
    };
    case 3: return { 
        ...base, 
        title: 'COLLABORATION', 
        subtitle: 'SHARED MISSIONS',
        maxWidth: 'max-w-7xl',
        content: (
            <div className="flex flex-col gap-6 h-auto">
               {/* TOP SECTION: Video & Cards Side-by-Side to eliminate whitespace */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-stretch">
                   
                   {/* LEFT: Video - Aspect Video (16:9) to prevent cutting off */}
                   <div className="lg:col-span-8 w-full h-full">
                        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative border border-zinc-200 group h-full">
                             <video 
                                src={VIDEO_COLLAB} 
                                className="w-full h-full object-cover" 
                                autoPlay muted loop playsInline 
                            />
                        </div>
                   </div>

                   {/* RIGHT: Stacked Cards */}
                   <div className="lg:col-span-4 flex flex-col gap-4 h-full">
                        {/* MICRON CARD */}
                        <div className="bg-micron-eggplant rounded-xl p-5 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1">
                            <div className="absolute top-4 right-4 opacity-30"><Cpu size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black uppercase mb-1">MICRON</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Sanjay Mehrotra, CEO</p>
                                <div className="mb-2 pl-3 border-l-2 border-white/30">
                                    {/* FONT SIZE INCREASED to text-base */}
                                    <p className="text-sm md:text-base font-bold italic text-white/90">"Transform how the world uses information to enrich life for all."</p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium">
                                <p className="text-base font-black text-white">Founded 1978, Boise.</p>
                                {/* REMOVED SENTENCE */}
                            </div>
                        </div>

                        {/* TESLA CARD */}
                        <div className="bg-black rounded-xl p-5 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1">
                            <div className="absolute top-4 right-4 opacity-30"><Bot size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black uppercase mb-1">TESLA</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Elon Musk, CEO</p>
                                <div className="mb-2 pl-3 border-l-2 border-white/30">
                                    {/* FONT SIZE INCREASED to text-base */}
                                    <p className="text-sm md:text-base font-bold italic text-white/90">"Accelerate the world's transition to sustainable energy."</p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium">
                                <p className="text-base font-black text-white">Founded 2003.</p>
                                {/* REMOVED SENTENCE */}
                            </div>
                        </div>
                   </div>
               </div>
               
               {/* BOTTOM SECTION: Future Scale (Full Width) */}
               <div className="bg-zinc-100 rounded-xl p-6 text-zinc-900 border border-zinc-200 shadow-md">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="text-zinc-400" size={20} />
                        <h3 className="text-xl font-black uppercase tracking-tight">FUTURE SCALE</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-zinc-300 pb-4 md:pb-0 justify-center">
                            <div>
                                <h4 className="text-4xl font-black text-micron-eggplant tracking-tighter">$200B</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Micron Investment</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-black text-zinc-800 tracking-tighter">1M+</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Optimus Capacity</p>
                            </div>
                        </div>
                        <div className="md:col-span-8 flex flex-col gap-3 text-sm md:text-base font-medium text-zinc-600 leading-relaxed justify-center">
                            <p>
                                In June 2025, Micron announced <strong className="text-zinc-900">$200 billion</strong> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history.
                            </p>
                            <p>
                                Tesla is targeting <strong className="text-zinc-900">50,000 Optimus units by this year and million-unit annual capacity</strong> beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                            </p>
                            <p>
                                Elon Musk and Sanjay Mehrotra are scaling toward a <strong className="text-zinc-900">future where autonomous systems outnumber people</strong> — and both leaders have acknowledged that the speed of this transition carries a shared responsibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'PLACE',
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        maxWidth: 'max-w-7xl',
        content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto">
           <div className="w-full">
                <div className="w-full aspect-video rounded-xl overflow-hidden relative shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                    <video src={VIDEO_PLACE} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden"></div>
                    <div className="absolute bottom-6 left-6 z-10">
                        <h3 className="text-2xl font-black uppercase text-white leading-none">THE HISTORIC<br/>BEDROCK</h3>
                        <p className="text-micron-green font-bold text-xs uppercase tracking-widest mt-2">Est. 1890</p>
                    </div>
                </div>
           </div>
           
           <div className="flex flex-col gap-4 h-full">
               <div className="flex-1">
                   <InnerBento title="ADDRESS" gradient="bg-micron-green" icon={<Globe />} direction="left" delay={0.2} className="h-full">
                       <p className="text-sm md:text-base font-medium leading-relaxed">
                           Warm Springs Avenue is a tree-lined corridor on the <span className="font-bold text-white">National Register of Historic Places</span> — where Boise's wealthiest families built estates heated by the city's most radical technology: hot water from the ground.
                       </p>
                   </InnerBento>
               </div>
               <div className="flex-1">
                   <InnerBento title="ENERGY" gradient="bg-micron-eggplant-light" icon={<Activity />} direction="right" delay={0.3} className="h-full">
                       <p className="text-sm leading-relaxed">
                           In 1892, C.W. Moore piped 177°F geothermal water into his mansion — the <span className="font-bold text-white">first home in America heated by natural hot water</span>. The idea spread down the avenue, then downtown, and by 1982 to the State Capitol — now the only capitol building in the country on geothermal. Today, the same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.
                       </p>
                   </InnerBento>
               </div>
               <div className="flex-1">
                   <InnerBento title="CONFLUENCE" gradient="bg-micron-grey1" icon={<Zap />} direction="up" delay={0.4} className="h-full">
                       <p className="text-sm leading-relaxed">
                           Heat from an aquifer tapped in 1892. Data from a satellite constellation powered by solar energy in space. Hot water rising from below. Signal arriving from above. <span className="font-bold text-white">The oldest residential energy system in the country meeting the newest</span> — on a street that has been absorbing the future for 130 years.
                       </p>
                   </InnerBento>
               </div>
           </div>
        </div>
    )};
    default: return { ...base, title: '', content: null };
  }
};

export const SectionPrototype: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const mainTitleWords = ["MICRON.", "TESLA.", "BOISE."];

  return (
    <section id="prototype" className="container mx-auto px-4 md:px-12 pt-0 pb-12 bg-white text-zinc-900">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 flex flex-col md:flex-row md:items-end gap-6 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">A NEW DAY</h2>
            </div>

            <div className="md:ml-auto max-w-2xl pb-1">
                <div className="md:pl-6 md:border-l-4 md:border-micron-eggplant/20 md:hover:border-micron-eggplant md:transition-colors md:duration-500">
                    <div className="text-base font-light text-zinc-600 leading-snug font-body">
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
                        
                        <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: (mainTitleWords.length * 0.2) + 0.2 }}
                                className="text-micron-eggplant block text-base"
                        >
                            Creating the first autonomous corporate residence. Where Micron's semiconductor revolution, Tesla's autonomous ecosystem, and Boise's emergence as a global tech hub converge at an inflection point to deliver the first tangible glimpse of the autonomous era.
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BentoCard 
                className="flex flex-col min-h-[320px] md:min-h-[500px] p-6 relative overflow-hidden group" 
                gradient="bg-micron-grey1" 
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.1} 
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(1))}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_PLACEHOLDER} isHovering={hoveredCard === 1} />
                <div className="relative z-10 mt-auto pt-6">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                        PROTOTYPE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        A New Paradigm
                    </p>
                </div>
            </BentoCard>

            <BentoCard 
                className="flex flex-col min-h-[320px] md:min-h-[500px] p-6 relative overflow-hidden group" 
                gradient="bg-micron-eggplant-light" 
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.2} 
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(3))}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_COLLAB} isHovering={hoveredCard === 3} />
                <div className="relative z-10 mt-auto pt-6">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-black transition-colors duration-300 mb-4">
                        COLLABORATION
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Shared Missions
                    </p>
                </div>
            </BentoCard>

            <BentoCard 
                className="flex flex-col min-h-[320px] md:min-h-[500px] p-6 relative overflow-hidden group" 
                gradient="bg-micron-eggplant"
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.3}
                duration={1.0}
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(2))}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_TIMING} isHovering={hoveredCard === 2} />
                <div className="relative z-10 mt-auto pt-6">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-zinc-500 transition-colors duration-300 mb-4">
                        TIMING
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                        Boise's Moment
                    </p>
                </div>
            </BentoCard>

            <BentoCard 
                className="flex flex-col min-h-[320px] md:min-h-[500px] p-6 relative overflow-hidden group" 
                gradient="bg-micron-green" 
                textColor="text-white" 
                borderColor="border-white/10" 
                delay={0.5} 
                duration={1.0}
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(4))}
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_PLACE} isHovering={hoveredCard === 4} />
                <div className="relative z-10 mt-auto pt-6">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
                        PLACE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Place & Perspective
                    </p>
                </div>
            </BentoCard>

        </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
