
import React, { useState, useRef, useEffect } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Play, Zap, ShieldCheck, TrendingUp, Globe, Activity, Cpu, Bot, Building2, Check, ArrowRight, MessageSquare, Quote } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// --- VIDEO ASSETS ---
const VIDEO_TIMING = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cropped%20POTATO%20MICRON%20SEQUENCE.mp4";
const VIDEO_COLLAB = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/FINAL%20FINAL.mp4";
const VIDEO_PLACEHOLDER = VIDEO_COLLAB; 

// Helper component for inner bento cards within the modal
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
                shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] h-full flex flex-col justify-between
                border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
                ${className}
            `}
        >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            <div className="relative z-10 h-full flex flex-col justify-between gap-3">
                {(title || icon) && (
                    <div className="mb-1">
                        {/* UPDATED: Title color is now text-white/70 (lighter) if textColor is white */}
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-tight flex items-center gap-2 drop-shadow-md leading-none ${textColor === 'text-white' ? 'text-white/70' : ''}`}>
                            {icon && React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
                            {title}
                        </h3>
                    </div>
                )}
                {/* UPDATED: Changed font-medium to font-normal and removed drop-shadow-sm for better readability on dark cards */}
                <div className={`leading-relaxed font-body font-normal flex-1 ${textColor === 'text-zinc-900' ? 'text-zinc-600' : 'text-white/80'}`}>
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

// REFACTORED VIDEO PLAYER
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


const getCardData = (id: number): ModalContent => {
  const base = { category: 'showcase' as const, theme: 'light' as const, maxWidth: 'max-w-6xl' };

  // UPDATED: ModalVideo now uses stronger shadow for floating effect
  const ModalVideo = ({ src, className = "", children }: { src: string; className?: string; children?: React.ReactNode }) => (
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-full bg-black rounded-xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative border border-zinc-200 group ${className}`}
      >
        <video 
            key={src} 
            src={src} 
            // Changed from object-cover to object-contain to ensure full view
            className="w-full h-full object-contain" 
            autoPlay 
            muted 
            loop
            playsInline 
        />
        {children}
      </motion.div>
  );

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: undefined, 
        modalLayout: 'default',
        maxWidth: 'max-w-7xl', // WIDER LANDSCAPE MODAL
        content: (
            <div className="flex flex-col gap-6 h-full">
                
                {/* 1. Combined Floating Description Card - WHITE BOX STYLING REMOVED */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.005 }}
                    // REMOVED: bg-white rounded-xl border border-zinc-200 shadow-xl
                    // KEPT: Padding and structure for floating text effect
                    className="shrink-0 p-2 md:p-3 flex flex-col items-start"
                >
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 font-sans">
                        AUTONOMOUS HUB
                    </h3>
                    <div className="text-zinc-900 text-lg font-medium leading-relaxed max-w-5xl">
                        {/* UPDATED: Reduced bottom margin from mb-6 to mb-3 */}
                        <p className="mb-3">
                            A private corporate residence powered by autonomous technology — where Micron hosts, entertains, and demonstrates the future it's building.
                        </p>
                        <p>
                            Optimus and Cybercab units execute all logistics, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                        </p>
                    </div>
                </motion.div>

                {/* 2. SPLIT LAYOUT: Video (75%) + Cards (25%) Side-by-Side */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-0">
                    
                    {/* VIDEO COLUMN - Scales down to 75% width (col-span-3) */}
                    <div className="lg:col-span-3 w-full h-full min-h-[300px] lg:min-h-0">
                         <ModalVideo src={VIDEO_PLACEHOLDER} className="h-full w-full" />
                    </div>

                    {/* SIDE COLUMN - Integration & Inflection stacked vertically */}
                    <div className="lg:col-span-1 flex flex-col gap-4 h-full">
                        <InnerBento 
                            gradient="bg-micron-eggplant" 
                            direction="left"
                            delay={0.3}
                            className="flex-1 min-h-[160px]"
                        >
                            <div className="flex flex-col h-full">
                                {/* Custom Header matching Autonomous Hub style */}
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 font-sans">
                                    INTEGRATION
                                </h3>
                                
                                {/* Content split into paragraphs */}
                                <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed flex-1">
                                    <p className="font-bold text-white text-sm">A Venue for Leadership.</p>
                                    <p>
                                        A residential venue for the leaders building the future and the policymakers governing it. 
                                    </p>
                                    <p>
                                        Guests meet to experience the shift to autonomous systems directly.
                                    </p>
                                </div>
                            </div>
                        </InnerBento>

                        <InnerBento 
                            gradient="bg-micron-grey1" 
                            direction="left"
                            delay={0.4}
                            className="flex-1 min-h-[160px]"
                        >
                            <div className="flex flex-col h-full">
                                {/* Custom Header matching Autonomous Hub style */}
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4 font-sans">
                                    INFLECTION POINT
                                </h3>
                                
                                {/* Content split into paragraphs & text removed */}
                                <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed flex-1">
                                    <p className="font-bold text-white text-sm">Scaling to Billions.</p>
                                    {/* Deleted "Autonomous systems are scaling from thousands to billions." */}
                                    <p>
                                        Daily life transforms permanently. 
                                    </p>
                                    <p>
                                        The leaders building that future meet here to confront the profound questions it demands.
                                    </p>
                                </div>
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
        aspectRatio: 'aspect-[6/5]',
        maxWidth: 'max-w-4xl',
        content: (
            <div className="flex flex-col gap-4 h-full">
                {/* 1. HERO VIDEO TOP - Aspect Video Container */}
                <div className="w-full aspect-video relative rounded-xl overflow-hidden shrink-0 bg-black shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                    <ModalVideo src={VIDEO_TIMING} className="h-full w-full" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                             <Play className="text-white fill-white" size={32} />
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                         <h3 className="text-2xl font-black uppercase text-white drop-shadow-md">The Window of Opportunity</h3>
                    </div>
                </div>

                {/* 2. SPLIT ROW */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                     <InnerBento 
                        title="BOISE'S MOMENT"
                        gradient="bg-micron-eggplant-light"
                        icon={<TrendingUp />}
                        className="h-full"
                     >
                        <p className="mb-3 text-sm">
                            Boise has arrived. A city once known primarily for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment scene, and the kind of civic energy that comes with a Division I University town.
                        </p>
                        <p className="text-sm">
                            The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.
                        </p>
                     </InnerBento>

                     <InnerBento 
                        title="RUNWAY"
                        gradient="bg-micron-green" 
                        icon={<Activity />}
                        className="h-full"
                     >
                        <p className="mb-3 text-sm">
                            There are no Optimus robots operating in private residences today. The window to build, test, and refine the first autonomous corporate residence exists right now — before the technology scales to mass production and the conversation shifts from design to regulation.
                        </p>
                        <p className="font-bold text-white text-sm">
                            This is a unique moment in the timeline of automation where a prototype can still define the standard.
                        </p>
                     </InnerBento>
                </div>

                {/* 3. FULL WIDTH BOTTOM */}
                <div className="shrink-0">
                     <InnerBento 
                        title="3 ARCS CONVERGING"
                        gradient="bg-micron-eggplant"
                        icon={<Zap />}
                        className="min-h-[140px]"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <p className="text-white/90 text-sm">
                                A city reaching cultural maturity after decades of quiet growth. A semiconductor company deploying the largest memory infrastructure investment in American history into its hometown. A robotics company preparing to place autonomous systems into the world for the first time.
                            </p>
                            <p className="text-white/80 text-sm border-l border-white/20 pl-4">
                                These three trajectories are converging right now, in the same city, on the same street where a Boise banker piped 177-degree water from the ground to heat his home in 1892 — before most American homes had electricity — and started a tradition of adopting technology the rest of the country hadn't imagined yet.
                            </p>
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
        aspectRatio: 'aspect-[6/5]',
        maxWidth: 'max-w-5xl', 
        content: (
            <div className="flex flex-col gap-4 h-full">
                
                {/* UPDATED: HERO VIDEO TOP - Aspect Video to prevent cropping */}
                <div className="w-full aspect-video shrink-0 rounded-xl overflow-hidden relative border border-zinc-200 bg-black shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                    <ModalVideo src={VIDEO_COLLAB} className="h-full w-full" />
                </div>

                {/* TOP ROW: MICRON & TESLA SIDE BY SIDE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                    
                    {/* MICRON CARD */}
                    <div className="bg-micron-eggplant rounded-xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-6 right-6 opacity-30">
                            <Cpu size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-1">MICRON</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Sanjay Mehrotra, CEO</p>
                            
                            <div className="mb-6 pl-4 border-l-2 border-white/30">
                                {/* UPDATED: Reduced quote font size to text-sm md:text-base */}
                                <p className="text-sm md:text-base font-bold italic text-white/90">"Transform how the world uses information to enrich life for all."</p>
                            </div>
                        </div>
                        {/* UPDATED: Increased 'Founded' font size */}
                        <div className="text-white/70 leading-relaxed font-medium">
                            <p className="text-xl md:text-2xl font-black text-white mb-2">Founded 1978, Boise.</p>
                            <p className="text-sm md:text-base">
                                Today, every Tesla vehicle carries 20 Micron memory chips delivering a 30x bandwidth leap. The chips enabling Optimus originate here.
                            </p>
                        </div>
                    </div>

                    {/* TESLA CARD */}
                    <div className="bg-black rounded-xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                        <div className="absolute top-6 right-6 opacity-30">
                            <Bot size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black uppercase mb-1">TESLA</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Elon Musk, CEO</p>
                            
                            <div className="mb-6 pl-4 border-l-2 border-white/30">
                                {/* UPDATED: Reduced quote font size to text-sm md:text-base */}
                                <p className="text-sm md:text-base font-bold italic text-white/90">"Accelerate the world's transition to sustainable energy" & "Build a world of amazing abundance."</p>
                            </div>
                        </div>
                        {/* UPDATED: Increased 'Founded' font size */}
                        <div className="text-white/70 leading-relaxed font-medium">
                            <p className="text-xl md:text-2xl font-black text-white mb-2">Founded 2003.</p>
                            <p className="text-sm md:text-base">
                                Leading the world in autonomous robotics. Optimus and Cybercab require Micron's advanced memory infrastructure.
                            </p>
                        </div>
                    </div>

                </div>

                {/* BOTTOM ROW: FUTURE SCALE */}
                <div className="bg-zinc-100 rounded-xl p-6 md:p-8 text-zinc-900 border border-zinc-200 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)]">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="text-zinc-400" />
                        <h3 className="text-2xl font-black uppercase tracking-tight">FUTURE SCALE</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* STATS LEFT */}
                        <div className="lg:col-span-4 flex flex-col gap-6 border-b lg:border-b-0 lg:border-r border-zinc-300 pb-6 lg:pb-0">
                            <div>
                                <h4 className="text-5xl font-black text-micron-eggplant tracking-tighter">$200B</h4>
                                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Micron Investment</p>
                            </div>
                            <div>
                                <h4 className="text-5xl font-black text-zinc-800 tracking-tighter">1M+</h4>
                                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">Optimus Capacity</p>
                            </div>
                        </div>

                        {/* TEXT RIGHT */}
                        <div className="lg:col-span-8 flex flex-col gap-4 text-sm md:text-base font-medium text-zinc-600 leading-relaxed">
                            <p>
                                In June 2025, Micron announced <strong className="text-zinc-900">$200 billion</strong> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history, creating 90,000 jobs.
                            </p>
                            <p>
                                Tesla is targeting <strong className="text-zinc-900">50,000 Optimus units by this year and million-unit annual capacity</strong> beyond that. Every unit is a mobile supercomputer requiring Micron silicon.
                            </p>
                            <p>
                                Under Elon Musk and Sanjay Mehrotra, these two companies are scaling toward a <strong className="text-zinc-900">future where autonomous systems outnumber people</strong> — and both leaders have acknowledged that the speed of <strong className="text-zinc-900">this transition carries a shared responsibility</strong>.
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
        aspectRatio: 'aspect-[6/4]',
        content: (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
           
           {/* LEFT: IMAGE (Span 5) */}
           <div className="lg:col-span-5 relative h-full min-h-[300px] lg:min-h-0">
                <div className="w-full h-full rounded-xl overflow-hidden relative shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]">
                    <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Historic Bedrock" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden"></div>
                    <div className="absolute bottom-6 left-6 z-10">
                        <h3 className="text-2xl font-black uppercase text-white leading-none">THE HISTORIC<br/>BEDROCK</h3>
                        <p className="text-micron-green font-bold text-xs uppercase tracking-widest mt-2">Est. 1890</p>
                    </div>
                </div>
           </div>

           {/* RIGHT: CONTENT STACK (Span 7) */}
           <div className="lg:col-span-7 flex flex-col gap-3 h-full">
               
               {/* TOP: ADDRESS (Green) */}
               <div className="flex-1">
                   <InnerBento title="ADDRESS" gradient="bg-micron-green" icon={<Globe />} direction="left" delay={0.2} className="h-full min-h-[140px]">
                       <p className="text-sm md:text-base font-medium leading-relaxed">
                           Warm Springs Avenue is a tree-lined corridor on the <span className="font-bold text-white">National Register of Historic Places</span> — where Boise's wealthiest families built estates heated by the city's most radical technology: hot water from the ground.
                       </p>
                   </InnerBento>
               </div>

               {/* MIDDLE: ENERGY (Blue) */}
               <div className="flex-1">
                   <InnerBento title="ENERGY" gradient="bg-micron-eggplant-light" icon={<Activity />} direction="right" delay={0.3} className="h-full min-h-[160px]">
                       <p className="text-sm leading-relaxed">
                           In 1892, C.W. Moore piped 177°F geothermal water into his mansion — the <span className="font-bold text-white">first home in America heated by natural hot water</span>. The idea spread down the avenue, then downtown, and by 1982 to the State Capitol — now the only capitol building in the country on geothermal. Today, the same system delivers to roughly 300 homes — operational for over 130 years, the water temperature unchanged within one degree.
                       </p>
                   </InnerBento>
               </div>

               {/* BOTTOM: CONFLUENCE (Dark Grey) */}
               <div className="flex-1">
                   <InnerBento title="CONFLUENCE" gradient="bg-micron-grey1" icon={<Zap />} direction="up" delay={0.4} className="h-full min-h-[140px]">
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
  // Track hovered card index to trigger video from parent
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const mainTitleWords = ["MICRON.", "TESLA.", "BOISE."];

  return (
    <section id="prototype" className="container mx-auto px-4 md:px-12 py-8 md:py-12 bg-white text-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
        // UPDATED: Reduced padding on mobile from p-8 to p-5 to match request
        className="pointer-events-auto w-full bg-white rounded-[2.5rem] p-5 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 ring-1 ring-zinc-50"
      >
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // UPDATED: Reduced header gap from gap-12 to gap-6 on mobile
            // UPDATED: Reduced bottom padding from pb-8 to pb-4 on mobile
            className="mb-6 flex flex-col md:flex-row md:items-end gap-6 md:gap-12 border-b border-zinc-100 pb-4 md:border-b-0 md:pb-0"
        >
            {/* UPDATED: Reduced padding inside header boxes from p-6 to p-4 on mobile */}
            <div className="flex-shrink-0 bg-zinc-50 p-4 md:p-6 rounded-2xl border border-zinc-100 shadow-sm md:bg-transparent md:p-0 md:border-0 md:shadow-none md:rounded-none">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">A NEW DAY</h2>
            </div>

            <div className="md:ml-auto max-w-2xl pb-1 bg-white p-4 md:p-6 rounded-2xl border border-zinc-100 shadow-sm md:bg-transparent md:p-0 md:border-0 md:shadow-none md:rounded-none">
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
                // UPDATED: Reduced min-height on mobile from 500px to 320px
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
                <HoverVideoPlayer src={VIDEO_PLACEHOLDER} isHovering={hoveredCard === 4} />
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
      </motion.div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
