
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE", "PARADIGM"];
    const paradigmLine2 = ["SHIFTS."];

    return (
        <div 
            className="flex flex-col items-start cursor-default"
        >
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#008f25' }}
                        animate={{ 
                            y: 0, 
                            opacity: 1, 
                            color: '#008f25' 
                        }}
                        transition={{ 
                            delay: 0.5 + (i * 0.15), 
                            duration: 0.8, 
                            ease: "easeOut" 
                        }}
                        whileHover={{ 
                            scale: 1.05, 
                            color: '#2c0f38', 
                            transition: { duration: 0.2 } 
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block transition-colors duration-300"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#008f25' }}
                        animate={{ 
                            y: 0, 
                            opacity: 1,
                            color: '#008f25'
                        }}
                        transition={{ 
                            delay: 0.8 + (i * 0.15), 
                            duration: 0.8, 
                            ease: "easeOut" 
                        }}
                        whileHover={{ 
                            scale: 1.05,
                            color: '#2c0f38',
                            transition: { duration: 0.2 } 
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block transition-colors duration-300"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bottomSectionRef = useRef(null);
  
  // Track if the section is in view to handle auto-replay on scroll
  const isInView = useInView(containerRef, { amount: 0.2 });
  
  // Track if the bottom section is in view to override animation wait time
  const isBottomVisible = useInView(bottomSectionRef, { amount: 0, once: true });

  // --- CYCLING TEXT STATE ---
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  // UPDATED ORDER: Memory -> Vision -> Place
  // UPDATED STRUCTURE: Support variable lines per sentence
  const sentences = [
    {
        lines: [
            ["WITHOUT", "MEMORY,"],
            ["THERE'S", "NO", "MEANING."]
        ],
        highlights: ["MEMORY,", "MEANING."],
        highlightColorClass: "text-micron-eggplant", 
        baseColorClass: "text-[#878d9f]", 
        baseHex: "#878d9f",
        highlightHex: "#2c0f38",
        hoverHighlightHex: "#6a3d8a", 
    },
    {
        lines: [
            ["WITHOUT", "VISION,"],
            ["THERE'S", "NO", "VELOCITY."]
        ],
        highlights: ["VISION,", "VELOCITY."],
        baseColorClass: "text-[#878d9f]", 
        highlightColorClass: "text-zinc-700",
        baseHex: "#878d9f", 
        highlightHex: "#3f3f46", 
        hoverHighlightHex: "#27272a", 
    },
    {
        lines: [
            ["WITHOUT"],
            ["PLACE,"],
            ["THERE'S", "NO"],
            ["PERSPECTIVE."]
        ],
        highlights: ["PLACE,", "PERSPECTIVE."],
        highlightColorClass: "text-micron-green",
        baseColorClass: "text-[#878d9f]",
        baseHex: "#878d9f",
        highlightHex: "#008f25",
        hoverHighlightHex: "#004d14",
    }
  ];

  // 1. Slow Video Down by 50%
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // 2. Animation Logic
  useEffect(() => {
    let interval: any;

    if (isInView) {
        if (!isFinished) {
            // UPDATED: Decreased interval from 6800ms to 4000ms (~40% reduction in pause)
            interval = setInterval(() => {
                setCurrentSentenceIndex((prev) => {
                    if (prev === sentences.length - 1) {
                        clearInterval(interval);
                        setIsFinished(true); 
                        return prev;
                    }
                    return prev + 1;
                });
            }, 4000); 
        }
    } else {
        setIsFinished(false);
        setCurrentSentenceIndex(0);
    }

    return () => clearInterval(interval);
  }, [isInView, isFinished]);

  return (
    <section 
        ref={containerRef}
        // UPDATED: Reduced pb-4 to pb-1 to decrease gap
        className="relative w-full bg-white text-zinc-900 pt-20 pb-1 flex flex-col justify-center md:min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-3 md:gap-3">
        
        {/* MAIN CONTENT AREA: SPLIT SCREEN BENTO GRID */}
        {/* CHANGED: Reduced height from 450px to 380px to remove padding/whitespace at top */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 h-auto md:h-[380px] w-full">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                className="min-h-[180px] lg:h-full w-full flex flex-col order-1 group/text cursor-default relative bg-white rounded-3xl shadow-2xl border border-zinc-200 p-3 md:p-5 overflow-hidden"
            >
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-50" />

                 {/* 
                    LOGO ANIMATION:
                    - Only animates in when isFinished is true (which implies we are on the final slide "Place").
                    - Delay is set to 3.0s to ensure "Perspective" text has populated first.
                    - Hover: Rotate 15deg and back to 0 (ping-pong) to "shift back".
                    - UPDATED: Moved logo to top-4 right-4 md:top-6 md:right-6 to prevent cutoff.
                 */}
                 <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex flex-row items-center gap-3">
                    <motion.img 
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron House Logo"
                        className="h-24 w-24 md:h-44 md:w-44 object-contain"
                        initial={{ opacity: 0, x: 100, rotate: 180 }}
                        // Only animate when the cycle is finished (last slide is active)
                        animate={isFinished ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: 100, rotate: 180 }}
                        // "Shift back once it rotate" -> Rotate to 15 then back to 0
                        whileHover={{ rotate: [0, 15, 0], scale: 1.05, transition: { duration: 0.6 } }}
                        transition={{ delay: 3.0, duration: 1.5, ease: "easeOut" }}
                    />
                 </div>
                 
                 {/* Bottom Alignment */}
                 <div className="flex flex-col h-full w-full justify-end pt-2 md:pt-0 pb-2">
                     <AnimatePresence mode="wait">
                       <motion.div 
                          key={currentSentenceIndex} 
                          className="flex flex-col gap-y-0 md:gap-y-0 items-start w-full"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                              hidden: { opacity: 1 },
                              visible: { 
                                  opacity: 1,
                                  transition: { staggerChildren: 0.5 } // Stagger lines
                              },
                              exit: { 
                                  opacity: 1, 
                                  transition: { staggerChildren: 0.1, staggerDirection: 1 } 
                              }
                          }}
                       >
                         {/* DYNAMIC LINE RENDERING */}
                         {sentences[currentSentenceIndex].lines.map((line, lineIndex) => (
                             <motion.div 
                                key={lineIndex} 
                                className="flex flex-wrap gap-x-2 md:gap-x-4"
                                variants={{
                                    hidden: { opacity: 1 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.12 } // Stagger words inside line
                                    },
                                    exit: { opacity: 0 }
                                }}
                             >
                                  {line.map((word, wordIndex) => {
                                      const currentSet = sentences[currentSentenceIndex];
                                      const isHighlight = currentSet.highlights.includes(word);
                                      const textColor = isHighlight ? currentSet.highlightHex : currentSet.baseHex;
                                      const hoverColor = isHighlight ? currentSet.hoverHighlightHex : currentSet.baseHex;

                                      return (
                                          <motion.span
                                              key={`${lineIndex}-${wordIndex}`}
                                              variants={{
                                                  hidden: { y: 20, opacity: 0 },
                                                  visible: { 
                                                      y: 0, 
                                                      opacity: 1, 
                                                      transition: { duration: 0.8, ease: "easeOut" } 
                                                  },
                                                  exit: {
                                                      y: -20,
                                                      opacity: 0,
                                                      transition: { duration: 0.3, ease: "easeIn" }
                                                  }
                                              }}
                                              style={{ color: textColor }} 
                                              whileHover={{ color: hoverColor, transition: { duration: 0.1 } }}
                                              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] cursor-default"
                                          >
                                              {word}
                                          </motion.span>
                                      );
                                  })}
                             </motion.div>
                         ))}

                       </motion.div>
                     </AnimatePresence>
                 </div>
            </div>

            {/* 2. VIDEO AREA */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="h-[220px] md:h-full lg:h-full w-full rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-zinc-800 order-2"
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                    poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                >
                     <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & MAP */}
        <motion.div 
            ref={bottomSectionRef}
            initial="hidden"
            animate={(isFinished || isBottomVisible) ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
                visible: { 
                    opacity: 1, 
                    y: 0, 
                    filter: "blur(0px)",
                    transition: { duration: 1.5, ease: "easeOut" } 
                }
            }}
            className="w-full bg-white rounded-3xl shadow-[0_40px_80px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/5 relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[300px] mt-0 group"
        >
            {/* Top Light Highlight for 3D effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100 z-20" />

            {/* Text Side (Left) */}
            <div className="p-4 md:p-6 flex flex-col justify-center md:w-1/2 z-10 relative bg-white">
                 
                 {/* Interactive Title Component */}
                 <div className="mb-4 md:mb-4">
                     <InteractiveParadigmTitle />
                 </div>
                
                {/* Address Block */}
                <motion.div 
                    variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: 3.5, duration: 1.0, ease: "easeOut" }
                        }
                    }}
                    className="flex gap-6 border-l-[4px] border-zinc-200 pl-6 transition-colors duration-500 group-hover:border-micron-green"
                >
                     <div className="flex flex-col justify-center">
                        <p className="text-xs md:text-sm font-black uppercase tracking-widest text-micron-green mb-1">
                            Micron House
                        </p>
                        <p className="font-bold text-zinc-900 text-sm md:text-base uppercase tracking-wide leading-tight">
                            1020 East Warm Springs Ave
                        </p>
                        <p className="font-bold text-zinc-400 text-sm md:text-base uppercase tracking-wide leading-tight">
                            Boise, Idaho 83712
                        </p>
                     </div>
                </motion.div>
            </div>

            {/* Map Side (Right) */}
            <motion.div 
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 2.2, duration: 1.0, ease: "easeOut" }
                    }
                }}
                className="relative w-full md:w-1/2 min-h-[300px] md:h-auto md:min-h-0 p-2 md:p-3 flex items-center justify-center bg-white"
            >
                <div 
                    className="w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] relative bg-zinc-100 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] group/map"
                >
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        className="absolute inset-0 w-full h-full mix-blend-normal grayscale opacity-60 transition-all duration-700 hover:opacity-100 hover:contrast-110"
                        style={{
                            pointerEvents: 'none'
                        }}
                        title="Map"
                        loading="eager"
                     />
                </div>
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
    