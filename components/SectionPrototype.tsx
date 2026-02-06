
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
const VIDEO_PROTOTYPE = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/CYPEROPTIMUS%20FINAL.mp4";

// --- HELPER COMPONENTS ---

const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white", padding = "p-5", direction = "up" }: any) => {
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: 30 };
    if (direction === "left") initial = { opacity: 0, x: -30 };
    if (direction === "right") initial = { opacity: 0, x: 30 };
    if (direction === "down") initial = { opacity: 0, y: -30 };

    return (
        <motion.div 
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay, duration: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
            className={`
                ${gradient} rounded-xl ${padding} ${textColor} relative overflow-hidden group 
                shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] 
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

const HoverVideoPlayer = ({ src, className = "", isHovering = false }: { src: string; className?: string; isHovering?: boolean }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.6 });

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
        const shouldPlay = isTouch ? isInView : isHovering;

        if (shouldPlay) {
            // Only play if it's not already playing to prevent restarting or jitter
            if (video.paused) {
                video.play().catch(() => {});
            }
        } else {
            video.pause();
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

// --- NEW COMPONENT: ModalVideo ---
// Plays once, stops. Replays on hover or when scrolled back into view.
const ModalVideo = ({ src, className = "" }: { src: string; className?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 });
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // If video comes into view and has already finished previously, restart it.
        // "Loops through again" when they scroll over it.
        if (isInView && hasPlayed && video.paused) {
            video.currentTime = 0;
            video.play().catch(() => {});
        }
    }, [isInView, hasPlayed]);

    const handleEnded = () => {
        setHasPlayed(true);
    };

    const handleMouseEnter = () => {
        const video = videoRef.current;
        if (video) {
             // Restart on hover only if paused or ended
             if (video.paused) {
                 if (video.ended) video.currentTime = 0;
                 video.play().catch(() => {});
             }
        }
    };

    return (
        <div 
            ref={containerRef} 
            className={`relative overflow-hidden bg-black rounded-xl ${className}`} 
            onMouseEnter={handleMouseEnter}
        >
             <video 
                ref={videoRef}
                src={src} 
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                playsInline 
                onEnded={handleEnded}
                // Important: loop is false so it plays once then stops
                loop={false}
            />
        </div>
    )
}

const getCardData = (id: number): ModalContent => {
  const base = { category: 'showcase' as const, theme: 'light' as const, maxWidth: 'max-w-6xl' };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        // UPDATED: Added subtitle here so it gets the divider line automatically in the Modal header
        subtitle: 'AUTONOMOUS HUB', 
        modalLayout: 'default', 
        maxWidth: 'max-w-7xl', 
        aspectRatio: 'aspect-[3/4]', 
        content: (
            // UPDATED: Added pb-12 for bottom padding and increased gap to gap-8
            <div className="flex flex-col gap-8 h-auto pb-12">
                {/* 1. AUTONOMOUS HUB (Full Width) */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="w-full flex flex-col items-start"
                >
                    {/* UPDATED: Removed the manual header and divider since it's now in the modal title/subtitle */}
                    <div className="text-zinc-900 text-lg font-medium leading-relaxed">
                        <p>
                            A private corporate residence powered by autonomous technology — where Micron hosts, entertains, and demonstrates the future it's building. Optimus and Cybercab units execute all logistics, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                        </p>
                    </div>
                </motion.div>

                {/* 2. SERVICE & SECURITY LAYER (Full Width, Underneath) */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full bg-white rounded-xl px-6 py-5 md:px-8 md:py-6 text-zinc-900 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] relative overflow-hidden group"
                >
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-micron-green relative z-10">SERVICE & SECURITY LAYER</h3>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 text-zinc-600 text-base font-medium leading-relaxed relative z-10">
                        <p>
                            Five minutes from downtown. Fifteen from the airport. Fifteen from Micron headquarters. The home sits at the center of everything Boise offers — and Optimus and Cybercab are the mechanism that brings it through the front door.
                        </p>
                        
                        {/* Separator Line */}
                        <div className="hidden md:block w-px bg-zinc-200 h-full"></div>
                        <div className="md:hidden w-full h-px bg-zinc-200"></div>

                        <p>
                            Culinary, wellness, recreation, entertainment — each delivered into an intimate, private setting with a level of coordination and discretion that the autonomous infrastructure sustains across every event.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 w-full h-full">
                         <ModalVideo 
                            src={VIDEO_PROTOTYPE}
                            className="w-full aspect-[1.5/1.1] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200 group"
                         />
                    </div>
                    
                    <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                        <InnerBento 
                            gradient="bg-micron-eggplant" 
                            direction="left" 
                            delay={0.3} 
                            className="flex-grow" 
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">INTEGRATION</h3>
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <div className="space-y-4 text-white/90 text-base font-medium leading-relaxed">
                                <p className="font-bold text-white text-base">A Venue for Leadership.</p>
                                <p>A residential venue for the leaders and policy makers building and governing the future.</p>
                                <p>Guests meet to experience the shift to autonomous systems directly.</p>
                            </div>
                        </InnerBento>

                        <InnerBento 
                            gradient="bg-micron-grey1" 
                            direction="left" 
                            delay={0.4} 
                            className="flex-grow" 
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 font-sans">INFLECTION POINT</h3>
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <div className="space-y-4 text-white/90 text-base font-medium leading-relaxed">
                                <p className="font-bold text-white text-base">Scaling to Billions.</p>
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
            // UPDATED: Added Flex col wrapper to stack the new intro text
            <div className="flex flex-col gap-10 h-full pb-12">
               
               {/* NEW SUBTEXT UPDATED: Removed max-width restriction */}
               <div className="w-full">
                    <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                        Boise has arrived. A city once known primarily for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment scene, and the kind of civic energy that comes with a Division I University town.
                    </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 h-full">
                   <div className="w-full h-full min-h-[300px] lg:min-h-0 lg:col-span-3">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-full"
                        >
                             <ModalVideo 
                                src={VIDEO_TIMING} 
                                className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200"
                            />
                        </motion.div>
                   </div>
                   
                   <div className="flex flex-col gap-4 h-full justify-between lg:col-span-2">
                        {/* UPDATED: Adjusted padding - less top padding, more bottom padding */}
                        <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-eggplant-light" icon={<TrendingUp />} className="flex-1" padding="pt-6 pb-12 px-8">
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
                                <p>
                                    The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.
                                </p>
                            </div>
                        </InnerBento>

                        {/* UPDATED: Reduced padding - p-3 was already small, trying p-4 pb-2 for tighter bottom */}
                        <InnerBento title="RUNWAY" gradient="bg-micron-green" icon={<Activity />} className="flex-1" padding="pt-5 pb-2 px-5">
                            <div className="w-full h-px bg-white/20 mb-4" />
                            {/* UPDATED: "Micron executives" lower case e */}
                            <p className="mb-2 text-base md:text-lg text-white/90 leading-relaxed">
                                Micron executives, employees, and their guests live alongside, interact, and engage with the technology before the world does.
                            </p>
                        </InnerBento>
                        <InnerBento title="3 ARCS CONVERGING" gradient="bg-micron-eggplant" icon={<Zap />} className="flex-1">
                             <div className="w-full h-px bg-white/20 mb-4" />
                             <div className="space-y-4 text-white/90 text-base md:text-lg mb-3 leading-relaxed">
                                {/* UPDATED: Changed 'placing' to 'innovating' */}
                                <p>
                                    A city reaching cultural maturity. A semiconductor company deploying historic investment. A robotics company innovating autonomous systems.
                                </p>
                             </div>
                        </InnerBento>
                   </div>
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
            // UPDATED: Added pb-12 for bottom padding
            <div className="flex flex-col gap-6 h-auto pb-12">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full items-stretch">
                   
                   <div className="w-full h-full min-h-[300px] lg:min-h-0">
                        <ModalVideo 
                            src={VIDEO_COLLAB} 
                            className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200 group"
                        />
                   </div>

                   <div className="flex flex-col gap-4 h-full">
                        <div className="bg-micron-eggplant rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-4 right-4 opacity-30"><Cpu size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black uppercase mb-1">MICRON</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Sanjay Mehrotra, CEO</p>
                                <div className="mb-2 pl-3 border-l-2 border-white/30">
                                    <p className="text-sm md:text-[1.05rem] font-bold italic text-white/90 leading-relaxed tracking-tight">"Transform how the world uses information to enrich life for all."</p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium mt-4">
                                <p className="text-base font-medium text-white">Founded 1978.</p>
                            </div>
                        </div>

                        <div className="bg-black rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-4 right-4 opacity-30"><Bot size={24} /></div>
                            <div>
                                <h3 className="text-2xl font-black uppercase mb-1">TESLA</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Elon Musk, CEO</p>
                                <div className="mb-2 pl-3 border-l-2 border-white/30">
                                    <p className="text-sm md:text-[1.05rem] font-bold italic text-white/90 leading-relaxed tracking-tight">
                                        "Accelerate the world's transition to sustainable energy. Build a world of amazing abundance."
                                    </p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium mt-4">
                                <p className="text-base font-medium text-white">Founded 2003.</p>
                            </div>
                        </div>
                   </div>
               </div>
               
               {/* FUTURE SCALE - UPDATED COLORS: Eggplant Light BG, White Text */}
               <div className="bg-micron-eggplant-light rounded-xl p-6 text-zinc-900 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-micron-eggplant/20">
                        {/* UPDATED: Icon text-white */}
                        <TrendingUp className="text-white" size={24} />
                        {/* UPDATED: Title text-white */}
                        <h3 className="text-3xl font-black uppercase tracking-tight text-white">FUTURE SCALE</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-micron-eggplant/20 pb-4 md:pb-0 justify-center">
                            <div>
                                {/* UPDATED: Value text-white */}
                                <h4 className="text-4xl font-black text-white tracking-tighter">$200B</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Micron Investment</p>
                            </div>
                            <div>
                                {/* UPDATED: Value text-white */}
                                <h4 className="text-4xl font-black text-white tracking-tighter">1M+</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Optimus Capacity</p>
                            </div>
                        </div>
                        <div className="md:col-span-8 flex flex-col gap-3 text-sm md:text-base font-medium text-zinc-700 leading-relaxed justify-center">
                            <p>
                                In June 2025, Micron announced <strong className="text-micron-eggplant">$200 billion</strong> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history.
                            </p>
                            <p>
                                Tesla is targeting <strong className="text-micron-eggplant">50,000 Optimus units by this year and million-unit annual capacity</strong>. Every unit is a mobile supercomputer requiring Micron silicon.
                            </p>
                            <p>
                                Elon Musk and Sanjay Mehrotra are scaling toward a <strong className="text-micron-eggplant">future where autonomous systems outnumber people</strong> — and both leaders have acknowledged that the speed of this transition carries a shared responsibility.
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
        paddingClassName: 'px-6 md:px-12 pt-0 pb-6 md:pb-12', // Added bottom padding here
        content: (
        <div className="flex flex-col gap-4 h-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
               <div className="w-full h-auto aspect-[4/3]">
                    <ModalVideo 
                        src={VIDEO_PLACE} 
                        className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200"
                    />
               </div>
               
               <InnerBento 
                    gradient="bg-micron-eggplant-light" 
                    className="h-full flex flex-col"
                    delay={0.2}
               >
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 mb-3 font-sans flex items-center gap-2">
                        <Activity size={18} strokeWidth={2.5} /> ENERGY
                   </h3>
                   <div className="w-full h-px bg-white/30 mb-4" />
                   <div className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
                       <p>In 1892, C.W. Moore piped 177°F geothermal water into his mansion — the <span className="font-bold text-white drop-shadow-sm">first home in America heated by natural hot water</span>. The idea spread down the avenue, then downtown, and by 1982 to the State Capitol.</p>
                       <p className="mt-3">Today, the same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.</p>
                   </div>
               </InnerBento>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
               <InnerBento 
                    gradient="bg-micron-grey1" 
                    className="h-full flex flex-col"
                    delay={0.3}
               >
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 font-sans flex items-center gap-2">
                        <Zap size={18} strokeWidth={2.5} /> CONFLUENCE
                   </h3>
                   <div className="w-full h-px bg-white/20 mb-4" />
                   <div className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
                       <p><span className="font-bold text-white">The oldest residential energy system in the country meeting the newest</span> — on a street that has been absorbing the future for 130 years.</p>
                   </div>
               </InnerBento>

               <InnerBento 
                    gradient="bg-micron-green" 
                    className="h-full flex flex-col"
                    delay={0.4}
               >
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 mb-3 font-sans flex items-center gap-2">
                        <Globe size={18} strokeWidth={2.5} /> ADDRESS
                   </h3>
                   <div className="w-full h-px bg-white/30 mb-5" />
                   <div className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
                       <p>Warm Springs Avenue is a tree-lined corridor on the <span className="font-bold text-white drop-shadow-sm">National Register of Historic Places</span> — where Boise's wealthiest families built estates heated by the city's most radical technology: hot water from the ground.</p>
                   </div>
               </InnerBento>
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
    // UPDATED: Padding increased to px-8 on mobile, pb-6 on mobile to close gap to Property
    <section id="prototype" className="container mx-auto px-8 md:px-12 pt-0 pb-6 md:pb-12 bg-white text-zinc-900">
        <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            // UPDATED: Removed border-b and reduced mb-8 to mb-6 to remove 'wrapper' look
            className="mb-6 flex flex-col md:flex-row md:items-end gap-6 pb-2"
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
                                        viewport={{ once: false }}
                                        whileHover={{ 
                                            y: -4, 
                                            x: 2, 
                                            scale: 1.05, 
                                            color: word === "BOISE." ? '#008f25' : (word === "TESLA." ? '#000000' : '#2c0f38'),
                                            transition: { duration: 0.2 } 
                                        }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }} 
                                        className="mr-3 inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </span>
                        
                        <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 1.5, delay: (mainTitleWords.length * 0.2) + 0.2 }}
                                className="text-micron-eggplant block text-base"
                        >
                            Creating the first autonomous corporate residence. Where Micron's semiconductor revolution, Tesla's autonomous ecosystem, and Boise's emergence as a global tech hub <strong className="font-bold">converge at an inflection point to deliver the first tangible glimpse of the autonomous era</strong>.
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
                <HoverVideoPlayer src={VIDEO_PROTOTYPE} isHovering={hoveredCard === 1} />
                <div className="relative z-10 mt-auto pt-6">
                    {/* UPDATED: Title hover color reverted to text-micron-eggplant-light (Blue) */}
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
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
                    {/* UPDATED: Title hover color to text-zinc-500 (Gray) - kept consistent for others or as per specific request? User only asked for Prototype and Place. Leaving this as gray as per last instruction unless instructed otherwise. Wait, usually better to revert all. But following explicit instructions: "revert the Prototype... and Place". I will leave this one as gray from previous turn. */}
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-zinc-500 transition-colors duration-300 mb-4">
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
                duration={1.5}
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(2))}
                onMouseEnter={() => setHoveredCard(2)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_TIMING} isHovering={hoveredCard === 2} />
                <div className="relative z-10 mt-auto pt-6">
                    {/* UPDATED: Title hover color to text-zinc-500 (Gray) - kept consistent/unchanged based on explicit prompt */}
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
                duration={1.5}
                hoverEffect={true}
                hideArrow={true}
                onClick={() => setModalData(getCardData(4))}
                onMouseEnter={() => setHoveredCard(4)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_PLACE} isHovering={hoveredCard === 4} />
                <div className="relative z-10 mt-auto pt-6">
                    {/* UPDATED: Title hover color reverted to text-micron-eggplant-light (Blue) */}
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-eggplant-light transition-colors duration-300 mb-4">
                        PLACE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        GROUNDING THE TECHNOLOGY
                    </p>
                </div>
            </BentoCard>

        </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
}
