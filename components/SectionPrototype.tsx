
import React, { useState, useRef, useEffect } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Play, Zap, ShieldCheck, TrendingUp, Globe, Activity, Cpu, Bot, Building2, Check, ArrowRight, MessageSquare, Quote, Mountain } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// --- GLOBAL iOS VIDEO UNLOCK ---
// iOS blocks programmatic video.play() until first user gesture.
// On first tap/click anywhere, try to play every video on the page.
let videoUnlocked = false;
const unlockVideos = () => {
    if (videoUnlocked) return;
    videoUnlocked = true;
    document.querySelectorAll('video').forEach(v => {
        if (v.paused) {
            v.muted = true;
            v.play().catch(() => {});
        }
    });
    document.removeEventListener('touchstart', unlockVideos);
    document.removeEventListener('click', unlockVideos);
};
if (typeof document !== 'undefined') {
    document.addEventListener('touchstart', unlockVideos, { once: true });
    document.addEventListener('click', unlockVideos, { once: true });
}

// --- VIDEO ASSETS ---
const VIDEO_TIMING = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/micron-boise-timing.mp4";
const VIDEO_COLLAB = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/micron-house-collaboration.mp4";
const VIDEO_PLACE = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/cw-moore-history.mp4"; 
const VIDEO_PROTOTYPE = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/micron-house-prototype.mp4";

// --- HELPER COMPONENTS ---

const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white", padding = "p-5", direction = "up" }: any) => {
    // UPDATED: Standardized travel to y: 100 or x: 100 for consistent "visible motion"
    let initial: { opacity: number; x?: number; y?: number } = { opacity: 0, y: 100 };
    if (direction === "left") initial = { opacity: 0, x: -100 };
    if (direction === "right") initial = { opacity: 0, x: 100 };
    if (direction === "down") initial = { opacity: 0, y: -100 };

    return (
        <motion.div 
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            // UPDATED: Duration 2.5s and smooth easing
            transition={{ delay, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
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
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Autoplay on scroll into view (all devices), replay on hover
        const shouldPlay = isInView || isHovering;

        if (shouldPlay) {
            if (video.paused) {
                if (video.ended || hasPlayed) video.currentTime = 0;
                video.muted = true;
                video.play().catch(() => {});
            }
        }
        // Don't pause on scroll-away — let it finish playing
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
                preload="auto"
                loop={false}
                onEnded={() => setHasPlayed(true)}
            />
            {/* Invisible overlay blocks iOS from rendering native play button */}
            <div className="absolute inset-0 z-10" style={{ WebkitTapHighlightColor: 'transparent' }} />
        </div>
    );
};

// --- NEW COMPONENT: ModalVideo ---
// Plays once, stops. Replays on hover or when scrolled back into view.
const ModalVideo = ({ src, className = "" }: { src: string; className?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1 });
    const [hasPlayed, setHasPlayed] = useState(false);

    // Play via JS when in view (works on mobile without showing native controls)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            if (video.paused) {
                if (video.ended || hasPlayed) video.currentTime = 0;
                video.muted = true;
                video.play().catch(() => {});
            }
        }
    }, [isInView, hasPlayed]);

    const handleEnded = () => {
        setHasPlayed(true);
    };

    const handleMouseEnter = () => {
        const video = videoRef.current;
        if (video) {
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
                muted 
                playsInline 
                preload="metadata"
                onEnded={handleEnded}
                loop={false}
            />
            {/* Invisible overlay blocks iOS native play button */}
            <div className="absolute inset-0 z-10" style={{ WebkitTapHighlightColor: 'transparent' }} />
        </div>
    )
}

const getCardData = (id: number): ModalContent => {
  const base = { category: 'showcase' as const, theme: 'light' as const, maxWidth: 'max-w-6xl' };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: 'AUTONOMOUS HUB', 
        modalLayout: 'default', 
        maxWidth: 'max-w-7xl', 
        content: (
            // UPDATED LAYOUT: SEAMLESS 2-ROW GRID
            <div className="flex flex-col gap-6 h-full w-full">
                
                {/* ROW 1: VIDEO (2/3) + INTRO (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
                    
                    {/* VIDEO TILE - Spans 2 */}
                    <div className="lg:col-span-2 w-full h-full min-h-[300px]">
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                            className="w-full h-full"
                         >
                            {/* Force h-full to fill grid cell, object-cover handles aspect. Removed fixed aspect class. */}
                            <ModalVideo 
                                src={VIDEO_PROTOTYPE}
                                className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200 group object-cover"
                            />
                         </motion.div>
                    </div>

                    {/* INTRO TILE - Spans 1 */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="lg:col-span-1 w-full bg-white rounded-xl p-6 md:p-8 text-zinc-900 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group flex flex-col justify-center h-full"
                    >
                        {/* UPDATED: Removed "Corporate", now "First Autonomous Residence" */}
                        <h3 className="text-lg md:text-xl font-black text-black mb-3 leading-tight">
                            First Autonomous Residence
                        </h3>
                        <div className="w-full h-px bg-zinc-200 mb-4" />
                        
                        <div className="text-zinc-600 text-lg font-medium leading-relaxed relative z-10">
                            <p>
                                A private corporate residence powered by autonomous systems — where Micron hosts, entertains, and demonstrates the future it's building. Optimus and Cybercab units execute all logistics, delivering high-end culinary, wellness, and entertainment experiences with privacy and precision.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* ROW 2: SERVICE (1/3) + INTEGRATION (1/3) + INFLECTION (1/3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-stretch">
                    
                    {/* SERVICE & SECURITY - Now in bottom row */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-full bg-white rounded-xl p-6 md:p-8 text-zinc-900 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group flex flex-col h-full"
                    >
                        <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-micron-green relative z-10 leading-none">SERVICE & SECURITY</h3>
                        <div className="w-full h-px bg-zinc-200 mb-5 relative z-10" />

                        <div className="flex flex-col gap-6 text-zinc-600 text-lg font-medium leading-relaxed relative z-10 flex-1">
                            <p>
                                Five minutes from downtown. Fifteen from the airport. Fifteen from Micron headquarters.
                            </p>
                            <p>
                                Optimus and Cybercab handle arrivals, departures, transfers, and coordinate deliveries, services, and experiences directly into the residence.
                            </p>
                        </div>
                    </motion.div>

                    {/* INTEGRATION */}
                    <InnerBento 
                        gradient="bg-micron-eggplant" 
                        direction="up" 
                        delay={0.5} 
                        className="h-full" 
                        padding="p-6 md:p-8"
                    >
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">INTEGRATION</h3>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <div className="space-y-4 text-white/70 text-lg font-medium leading-relaxed flex-1">
                            <p className="font-bold text-white text-xl">A Venue for Leadership.</p>
                            <p>A residential venue where Micron executives host, entertain, and recruit alongside Optimus and Cybercab in full operation. Board members and partners experience autonomous systems as part of daily life.</p>
                        </div>
                    </InnerBento>

                    {/* INFLECTION POINT */}
                    <InnerBento 
                        gradient="bg-micron-grey1" 
                        direction="up" 
                        delay={0.6} 
                        className="h-full" 
                        padding="p-6 md:p-8"
                    >
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 font-sans">INFLECTION POINT</h3>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <div className="space-y-4 text-white/70 text-lg font-medium leading-relaxed flex-1">
                            <p className="font-bold text-white text-xl">Scaling to Billions.</p>
                            <p>Tesla is scaling Optimus Gen 3 production at its Fremont factory, with over 1,000 units already deployed internally and a dedicated line targeting one million units annually. Micron House is operational at the earliest stage of that curve — generating institutional knowledge from day one.</p>
                        </div>
                    </InnerBento>

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
            // UPDATED: Removed redundant div wrapper and flex styling, cleaned up structure
            <div className="flex flex-col gap-6 h-auto pb-12">
               
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
                   {/* LEFT COLUMN: VIDEO + BLUE TILE */}
                   <div className="flex flex-col gap-6 lg:col-span-3">
                       {/* VIDEO */}
                       <div className="w-full aspect-[1.5/1.1]">
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

                       {/* RECREATION (Blue) - Hidden on mobile, shown in desktop left column */}
                       <div className="hidden lg:block">
                       <InnerBento 
                            title="RECREATION" 
                            gradient="bg-micron-eggplant-light" 
                            icon={<Mountain />} 
                            className="flex-1" 
                            padding="pt-6 pb-6 px-8"
                            delay={0.2}
                        >
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
                                <p>
                                    The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.
                                </p>
                            </div>
                        </InnerBento>
                       </div>
                   </div>
                   
                   {/* RIGHT COLUMN: NEW INTRO TILE + PURPLE + GREEN TILES */}
                   <div className="flex flex-col gap-6 h-full lg:col-span-2">
                        
                        {/* 1. NEW INTRO TILE (White) - UPDATED: FLOATING EFFECT (No border, strong shadow) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-full bg-white rounded-xl p-6 md:p-8 text-zinc-900 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden group flex flex-col justify-center flex-1"
                        >
                            <div className="text-zinc-600 text-lg font-medium leading-relaxed relative z-10">
                                <p>
                                    Boise has arrived. A city once known for potatoes and public land now supports a James Beard-nominated culinary scene, world-class wineries across the Snake River Valley, a thriving arts and entertainment culture, and the kind of civic energy that comes with a Division I University town.
                                </p>
                            </div>
                        </motion.div>

                        {/* 2. 3 ARCS CONVERGING (Purple) */}
                        <InnerBento 
                            title="3 ARCS CONVERGING" 
                            gradient="bg-micron-eggplant" 
                            icon={<Zap />} 
                            className="flex-1"
                            delay={0.4}
                        >
                             <div className="w-full h-px bg-white/20 mb-4" />
                             <div className="space-y-4 text-white/90 text-base md:text-lg mb-3 leading-relaxed">
                                <p>
                                    A city reaching cultural maturity. A semiconductor company deploying historic investment. A robotics company innovating autonomous systems.
                                </p>
                             </div>
                        </InnerBento>

                        {/* 3. RUNWAY (Green) */}
                        <InnerBento 
                            title="RUNWAY" 
                            gradient="bg-micron-green" 
                            icon={<Activity />} 
                            className="flex-1" 
                            padding="pt-6 pb-6 px-6"
                            delay={0.6}
                        >
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <p className="mb-2 text-base md:text-lg text-white/90 leading-relaxed">
                                Micron executives, employees, and their guests live alongside, interact, and engage with the technology before the world does.
                            </p>
                        </InnerBento>

                        {/* RECREATION (Blue) - Mobile only, appears after Runway */}
                        <div className="lg:hidden">
                        <InnerBento 
                            title="RECREATION" 
                            gradient="bg-micron-eggplant-light" 
                            icon={<Mountain />} 
                            className="flex-1" 
                            padding="pt-6 pb-6 px-8"
                            delay={0.2}
                        >
                            <div className="w-full h-px bg-white/20 mb-4" />
                            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed">
                                <p>
                                    The Boise River Greenbelt connects 25 miles of parkland through the city center. Bogus Basin is 45 minutes from downtown. Some of the best fly fishing, whitewater, and backcountry skiing in North America are all within reach.
                                </p>
                            </div>
                        </InnerBento>
                        </div>
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
                   
                   {/* UPDATED: Strictly enforced aspect-[1.5/1.1] to match BentoCard exactly */}
                   <div className="w-full aspect-[1.5/1.1]">
                        <ModalVideo 
                            src={VIDEO_COLLAB} 
                            className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200 group"
                        />
                   </div>

                   <div className="flex flex-col gap-4 h-full">
                        {/* MICRON CARD - Updated to variants for smooth entry and will-change-transform */}
                        <motion.div 
                            variants={{ 
                                hidden: { opacity: 0, x: 20 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
                                }
                            }}
                            className="bg-micron-eggplant rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 will-change-transform"
                        >
                            <div className="absolute top-4 right-4 opacity-30"><Cpu size={24} /></div>
                            <div>
                                <h3 className="text-3xl font-black uppercase mb-1">MICRON</h3>
                                {/* UPDATED: Increased font size to text-sm */}
                                <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Sanjay Mehrotra, CEO</p>
                                <div className="mb-2 pl-4 border-l-2 border-white/30">
                                    {/* UPDATED: Standardized to text-lg for mobile/desktop (18px) */}
                                    <p className="text-lg font-bold italic text-white/90 leading-relaxed tracking-tight">"Transform how the world uses information to enrich life for all."</p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium mt-4">
                                <p className="text-base font-medium text-white">Founded 1978.</p>
                            </div>
                        </motion.div>

                        {/* TESLA CARD - Updated variants + Increased Padding + Quote Padding */}
                        <motion.div 
                            variants={{ 
                                hidden: { opacity: 0, x: 20 },
                                visible: { 
                                    opacity: 1, 
                                    x: 0,
                                    transition: { duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] } 
                                }
                            }}
                            // UPDATED: Increased padding pl-10 md:pl-16
                            className="bg-black rounded-xl p-6 pl-10 md:pl-16 text-white relative overflow-hidden flex flex-col justify-between shadow-lg flex-1 group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 will-change-transform"
                        >
                            <div className="absolute top-4 right-4 opacity-30"><Bot size={24} /></div>
                            <div>
                                <h3 className="text-3xl font-black uppercase mb-1">TESLA</h3>
                                {/* UPDATED: Increased font size to text-sm */}
                                <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Elon Musk, CEO</p>
                                {/* UPDATED: Adjusted padding to pl-4 to match Micron card */}
                                <div className="mb-2 pl-4 border-l-2 border-white/30">
                                    {/* UPDATED: Standardized to text-lg for mobile/desktop (18px) */}
                                    <p className="text-lg font-bold italic text-white/90 leading-relaxed tracking-tight">
                                        "Accelerate the world's transition to sustainable energy. Build a world of amazing abundance."
                                    </p>
                                </div>
                            </div>
                            <div className="text-white/70 font-medium mt-4">
                                <p className="text-base font-medium text-white">Founded 2003.</p>
                            </div>
                        </motion.div>
                   </div>
               </div>
               
               {/* FUTURE SCALE - Updated variants + Increased Text Size */}
               <motion.div 
                    variants={{ 
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: { duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] } 
                        }
                    }}
                    className="bg-micron-eggplant-light rounded-xl p-6 text-zinc-900 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 will-change-transform"
               >
                    {/* UPDATED: Arrow moved to left side next to title (justify-start gap-4) and increased icon size */}
                    <div className="flex items-center justify-start gap-4 mb-4 pb-4 border-b border-micron-eggplant/20">
                        <h3 className="text-3xl font-black uppercase tracking-tight text-white">FUTURE SCALE</h3>
                        <TrendingUp className="text-white" size={32} />
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
                        {/* UPDATED: Standardized to text-lg for mobile/desktop (18px) and Updated Text content */}
                        <div className="md:col-span-8 flex flex-col gap-3 text-lg font-medium text-zinc-700 leading-relaxed justify-center">
                            <p>
                                In June 2025, Micron announced <strong className="text-micron-eggplant">$200 billion</strong> in U.S. semiconductor manufacturing — the largest memory infrastructure commitment in American history.
                            </p>
                            <p>
                                Tesla is scaling toward <strong className="text-micron-eggplant">one million Optimus units per year at Fremont, with consumer sales targeted by late 2026</strong>. Every unit is a mobile supercomputer requiring Micron silicon.
                            </p>
                            <p>
                                Musk and Mehrotra are building toward a <strong className="text-micron-eggplant">future where autonomous systems outnumber people</strong>. The pace of that deployment carries weight — and Micron House is where the implications are explored firsthand.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'PLACE',
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        maxWidth: 'max-w-7xl',
        paddingClassName: 'px-10 md:px-12 pt-0 pb-10 md:pb-12',
        content: (
        <div className="flex flex-col gap-4 h-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
               {/* UPDATED: Added wrapper with immediate animation trigger to prevent delay */}
               <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full aspect-[1.5/1.1]"
               >
                    <ModalVideo 
                        src={VIDEO_PLACE} 
                        className="w-full h-full shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200"
                    />
               </motion.div>
               
               {/* UPDATED: ENERGY - First (0.2) */}
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
                    delay={0.6} // Confluence is Third
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
                    delay={0.4} // Address is Second
               >
                   <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 mb-3 font-sans flex items-center gap-2">
                        <Globe size={18} strokeWidth={2.5} /> ADDRESS
                   </h3>
                   <div className="w-full h-px bg-white/30 mb-5" />
                   <div className="text-white/60 text-base md:text-lg font-medium leading-relaxed">
                       <p>Warm Springs Avenue is a tree-lined corridor on the <span className="font-bold text-white drop-shadow-sm">National Register of Historic Places</span> — where Boise's wealthiest families built homes heated by the city's most radical technology: hot water from the ground.</p>
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
    <section id="prototype" className="container mx-auto px-8 md:px-12 pt-0 pb-6 md:pb-12 text-zinc-900">
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end gap-6 mb-12"
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
                            Micron's $200 billion commitment. Tesla's robotics and autonomous vehicles entering residential life. Boise's emergence as a global tech hub. <strong className="font-bold">Three forces converging at an inflection point to deliver the first tangible glimpse of the autonomous era.</strong>
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
                delay={0}
                hoverEffect={true}
                arrowPosition="bottom-right"
                onClick={() => setModalData(getCardData(1))}
                onMouseEnter={() => setHoveredCard(1)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_PROTOTYPE} isHovering={hoveredCard === 1} />
                <div className="relative z-10 mt-auto pt-6">
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
                delay={0.3}
                hoverEffect={true}
                arrowPosition="bottom-right"
                onClick={() => setModalData(getCardData(3))}
                onMouseEnter={() => setHoveredCard(3)}
                onMouseLeave={() => setHoveredCard(null)}
            >
                <HoverVideoPlayer src={VIDEO_COLLAB} isHovering={hoveredCard === 3} />
                <div className="relative z-10 mt-auto pt-6">
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
                delay={0.1}
                duration={2.5}
                hoverEffect={true}
                arrowPosition="bottom-right"
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
                delay={0.4}
                duration={2.5}
                hoverEffect={true}
                arrowPosition="bottom-right"
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
                        GROUNDING THE TECHNOLOGY
                    </p>
                </div>
            </BentoCard>

        </div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
}
