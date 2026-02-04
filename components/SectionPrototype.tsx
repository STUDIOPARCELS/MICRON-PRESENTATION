
import React, { useState, useRef, useEffect } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Play, Zap, ShieldCheck, TrendingUp, Globe, Activity, Cpu, Bot, Building2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// --- VIDEO ASSETS ---
const VIDEO_TIMING = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cropped%20POTATO%20MICRON%20SEQUENCE.mp4";
const VIDEO_COLLAB = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/new%20aspect.mp4";
// Using Collab video as high-quality placeholder for others to maintain aspect ratio design integrity
const VIDEO_PLACEHOLDER = VIDEO_COLLAB; 

// Helper component for inner bento cards within the modal
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0, textColor = "text-white" }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-xl p-5 ${textColor} relative overflow-hidden group 
            shadow-sm
            border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
            ${className}
        `}
    >
        {/* Top Highlight for 3D Bevel */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col justify-between">
            {(title || icon) && (
                <>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-3 flex items-center gap-3 drop-shadow-md leading-none">
                        {icon && React.cloneElement(icon, { size: 20, strokeWidth: 2 })}
                        {title}
                    </h3>
                </>
            )}
            <div className={`text-sm leading-relaxed font-body font-medium flex-1 drop-shadow-sm ${textColor === 'text-zinc-900' ? 'text-zinc-600' : 'text-white/90'}`}>
                {children}
            </div>
        </div>
    </motion.div>
);

// REFACTORED VIDEO PLAYER: Full brightness, Loop on Hover, No darkening, REMOVED Play Button Overlay
const HoverVideoPlayer = ({ src, className = "" }: { src: string; className?: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.6 });

    useEffect(() => {
        // Mobile/Touch Strategy: Auto-play when in view
        const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;
        if (isTouch && videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(() => {});
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    const handleMouseEnter = () => {
        // Desktop Strategy: Play on hover
        const isHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
        if (isHover && videoRef.current) {
            videoRef.current.play().catch(() => {});
        }
    };

    const handleMouseLeave = () => {
        // Desktop Strategy: Pause and reset on leave
        const isHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
        if (isHover && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to start
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`w-full relative rounded-xl overflow-hidden mb-6 bg-black z-20 group/video ${className}`}
            style={{ aspectRatio: '16/10' }} // Standardized aspect ratio for grid
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video 
                ref={videoRef}
                src={src} 
                className="absolute inset-0 w-full h-full object-cover" 
                loop 
                muted 
                playsInline 
            />
            
            {/* REMOVED Play Button Overlay */}
        </div>
    );
};


const getCardData = (id: number): ModalContent => {
  // Common config: Light Theme for cleaner reading experience in modals
  const base = { category: 'showcase' as const, theme: 'light' as const, maxWidth: 'max-w-5xl' };

  switch(id) {
    case 1: return { 
        ...base, 
        title: 'PROTOTYPE', 
        subtitle: 'VISION',
        content: (
            <div className="flex flex-col gap-4">
                {/* FULL WIDTH VIDEO CONTAINER */}
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative border border-zinc-200">
                     <video src={VIDEO_PLACEHOLDER} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InnerBento 
                        title="THE AUTONOMOUS HUB" 
                        gradient="bg-micron-grey1" 
                        icon={<ShieldCheck className="text-white" />}
                    >
                        <p className="text-white/80">
                            A secure, autonomous property for executive hosting. Optimus and Cybercab units execute all logistics, delivering high-end culinary and wellness experiences with precision.
                        </p>
                    </InnerBento>

                    <InnerBento 
                        title="INFLECTION POINT" 
                        gradient="bg-zinc-100" 
                        textColor="text-zinc-900"
                        icon={<TrendingUp className="text-micron-eggplant" />}
                    >
                        <p className="text-zinc-600">
                            Autonomous systems are scaling from thousands to billions. Daily life transforms permanently. The leaders building that future meet here to confront the profound questions it demands.
                        </p>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 2: return { 
        ...base, 
        title: 'TIMING', 
        subtitle: "THIS MOMENT",
        content: (
            <div className="flex flex-col gap-4">
                {/* FULL WIDTH VIDEO CONTAINER - TIMING VIDEO */}
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative border border-zinc-200">
                     <video src={VIDEO_TIMING} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <InnerBento title="RUNWAY" gradient="bg-micron-green">
                        <p>The window to build, test, and refine the first autonomous corporate residence exists right now — before the technology scales to mass production.</p>
                    </InnerBento>

                    <InnerBento title="BOISE'S MOMENT" gradient="bg-micron-eggplant">
                        <p>A city once known for potatoes now supports a James Beard-nominated culinary scene, world-class wineries, and a thriving arts scene.</p>
                    </InnerBento>

                    <InnerBento title="CONVERGENCE" gradient="bg-micron-eggplant-light">
                        <div className="flex flex-col gap-2">
                             <div className="flex justify-between border-b border-white/20 pb-1">
                                <span>Investment</span>
                                <span className="font-bold">$200B</span>
                             </div>
                             <div className="flex justify-between border-b border-white/20 pb-1">
                                <span>Optimus</span>
                                <span className="font-bold">1M+ Units</span>
                             </div>
                             <div className="flex justify-between">
                                <span>Location</span>
                                <span className="font-bold">Warm Springs</span>
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
            <div className="flex flex-col gap-4">
                 {/* FULL WIDTH VIDEO CONTAINER - COLLAB VIDEO */}
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative border border-zinc-200">
                     <video src={VIDEO_COLLAB} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                </div>

                {/* INFO GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InnerBento 
                        title="MICRON" 
                        gradient="bg-micron-eggplant" 
                        icon={<Cpu />}
                    >
                         <p className="mb-2 text-white/90">"Transform how the world uses information to enrich life for all."</p>
                         <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Sanjay Mehrotra, CEO</p>
                    </InnerBento>

                    <InnerBento 
                        title="TESLA" 
                        gradient="bg-black" 
                        icon={<Bot />}
                    >
                         <p className="mb-2 text-white/90">"Accelerate the world's transition to sustainable energy" & "Build a world of amazing abundance."</p>
                         <p className="text-xs text-white/50 uppercase tracking-widest font-bold">Elon Musk, CEO</p>
                    </InnerBento>
                </div>
            </div>
        )
    };
    case 4: return { 
        ...base, 
        title: 'PLACE', 
        subtitle: 'GROUNDING THE TECHNOLOGY', 
        content: (
        <div className="flex flex-col gap-4">
           {/* FULL WIDTH VIDEO CONTAINER */}
           <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-lg relative border border-zinc-200">
                <video src={VIDEO_PLACEHOLDER} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                <div className="absolute bottom-6 left-6">
                    <span className="text-micron-green font-bold uppercase tracking-widest text-xs mb-1 block">Est. 1890</span>
                    <h4 className="text-white font-bold text-3xl uppercase tracking-tight drop-shadow-md">The Historic Bedrock</h4>
                </div>
           </div>

           {/* INFO GRID */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <InnerBento title="ADDRESS" gradient="bg-micron-green" icon={<Globe />}>
                   <p>Warm Springs Avenue is a tree-lined corridor on the National Register of Historic Places — where Boise's wealthiest families built estates.</p>
               </InnerBento>

               <InnerBento title="ENERGY" gradient="bg-micron-eggplant-light" icon={<Activity />}>
                   <p>In 1892, C.W. Moore piped 177°F geothermal water into his mansion — the first home in America heated by natural hot water.</p>
               </InnerBento>

               <InnerBento title="CONFLUENCE" gradient="bg-micron-grey1" icon={<Zap />}>
                   <p>Heat from an aquifer tapped in 1892. Data from a satellite constellation. The oldest residential energy system in the country meeting the newest.</p>
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
    <section id="prototype" className="container mx-auto px-4 md:px-12 py-8 md:py-12 bg-white text-zinc-900">
      
      {/* 
        SECTION CONTAINER BENTO BOX 
        Wraps the Header and the Grid in a "Floating" container 
      */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
        className="pointer-events-auto w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 ring-1 ring-zinc-50"
      >
        {/* Header - Aligned with other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8 md:border-b-0 md:pb-0"
        >
            {/* MOBILE BENTO: Title Container */}
            <div className="flex-shrink-0 bg-zinc-50 p-6 rounded-2xl border border-zinc-100 shadow-sm md:bg-transparent md:p-0 md:border-0 md:shadow-none md:rounded-none">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">01 / VISION</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">A NEW DAY</h2>
            </div>

            {/* MOBILE BENTO: Description Container */}
            <div className="md:ml-auto max-w-2xl pb-1 bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm md:bg-transparent md:p-0 md:border-0 md:shadow-none md:rounded-none">
                <div className="md:pl-6 md:border-l-4 md:border-micron-eggplant/20 md:hover:border-micron-eggplant md:transition-colors md:duration-500">
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
                            Creating the first autonomous corporate residence. Where Micron's semiconductor revolution, Tesla's autonomous ecosystem, and Boise's emergence as a global tech hub converge at an inflection point to deliver the first tangible glimpse of the autonomous era.
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Bento Grid - Added hideArrow={true} to all cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: PROTOTYPE (GREY #353942) */}
            <BentoCard 
                className="flex flex-col aspect-[3/4] p-6 relative overflow-hidden group" 
                gradient="bg-micron-grey1" 
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.1} 
                hoverEffect={true}
                hideArrow={true} // REMOVED ARROW
                onClick={() => setModalData(getCardData(1))}
            >
                {/* VIDEO INSERT: Floating Hover Player */}
                <HoverVideoPlayer src={VIDEO_PLACEHOLDER} />

                <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-green transition-colors duration-300 mb-4">
                        PROTOTYPE
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        A New Paradigm
                    </p>
                </div>
            </BentoCard>

            {/* Card 2: COLLABORATION (Blue) */}
            <BentoCard 
                className="flex flex-col aspect-[3/4] p-6 relative overflow-hidden group" 
                gradient="bg-micron-eggplant-light" 
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.2} 
                hoverEffect={true}
                hideArrow={true} // REMOVED ARROW
                onClick={() => setModalData(getCardData(3))}
            >
                {/* VIDEO INSERT: Floating Hover Player */}
                <HoverVideoPlayer src={VIDEO_COLLAB} />

                <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-micron-black transition-colors duration-300 mb-4">
                        COLLABORATION
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                        Shared Missions
                    </p>
                </div>
            </BentoCard>

            {/* Card 3: TIMING (EGGPLANT) */}
            <BentoCard 
                className="flex flex-col aspect-[3/4] p-6 relative overflow-hidden group" 
                gradient="bg-micron-eggplant"
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.3} 
                hoverEffect={true}
                hideArrow={true} // REMOVED ARROW
                onClick={() => setModalData(getCardData(2))}
            >
                {/* VIDEO INSERT: Floating Hover Player */}
                <HoverVideoPlayer src={VIDEO_TIMING} />

                <div className="relative z-10 mt-auto">
                    <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-tighter text-white group-hover:text-zinc-500 transition-colors duration-300 mb-4">
                        TIMING
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                        Boise's Moment
                    </p>
                </div>
            </BentoCard>

            {/* Card 4: PLACE (GREEN) */}
            <BentoCard 
                className="flex flex-col aspect-[3/4] p-6 relative overflow-hidden group" 
                gradient="bg-micron-green" 
                textColor="text-white" 
                borderColor="border-white/10"
                delay={0.4} 
                hoverEffect={true}
                hideArrow={true} // REMOVED ARROW
                onClick={() => setModalData(getCardData(4))}
            >
                {/* VIDEO INSERT: Floating Hover Player */}
                <HoverVideoPlayer src={VIDEO_PLACEHOLDER} />

                <div className="relative z-10 mt-auto">
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
