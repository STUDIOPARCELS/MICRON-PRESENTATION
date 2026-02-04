
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bottomSectionRef = useRef(null);
  
  // Track if the section is in view to handle auto-replay on scroll
  const isInView = useInView(containerRef, { amount: 0.2 });
  
  // Track if the bottom section is in view to override animation wait time
  // UPDATED: Lowered threshold to 0.1 to ensure map shows up earlier on mobile scroll
  const isBottomVisible = useInView(bottomSectionRef, { amount: 0.1, once: true });

  // --- CYCLING TEXT STATE ---
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const sentences = [
    {
        line1: ["WITHOUT", "MEMORY,"],
        line2: ["THERE'S", "NO", "MEANING."],
        highlights: ["MEMORY,", "MEANING."],
        highlightColorClass: "text-micron-eggplant", // Eggplant
        baseColorClass: "text-[#878d9f]", // GRAY
        // Interaction Colors (Hex)
        baseHex: "#878d9f",
        highlightHex: "#2c0f38",
        hoverHighlightHex: "#6a3d8a", // Lighter Eggplant/Purple
    },
    {
        line1: ["WITHOUT", "VISION,"],
        line2: ["THERE'S", "NO", "VELOCITY."],
        highlights: ["VISION,", "VELOCITY."],
        baseColorClass: "text-zinc-900",
        highlightColorClass: "text-[#878d9f]",
        baseHex: "#18181b",
        highlightHex: "#878d9f",
        // UPDATED: Hover color is now almost black (Zinc 800) instead of light gray
        hoverHighlightHex: "#27272a", 
    },
    {
        line1: ["WITHOUT", "PLACE,"],
        line2: ["THERE'S", "NO", "PERSPECTIVE."],
        highlights: ["PLACE,", "PERSPECTIVE."],
        highlightColorClass: "text-micron-green", // Green
        baseColorClass: "text-[#878d9f]", // GRAY
        baseHex: "#878d9f",
        highlightHex: "#008f25",
        hoverHighlightHex: "#004d14", // Dark Green
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
            interval = setInterval(() => {
                setCurrentSentenceIndex((prev) => {
                    if (prev === sentences.length - 1) {
                        clearInterval(interval);
                        setIsFinished(true); 
                        return prev;
                    }
                    return prev + 1;
                });
            }, 4500); 
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
        className="relative w-full bg-white text-zinc-900 pt-24 pb-8 flex flex-col justify-center min-h-screen"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-16">
        
        {/* MAIN CONTENT AREA: SPLIT SCREEN BENTO GRID */}
        {/* UPDATED: Changed mobile layout to flex-col with auto height to prevent video collapse */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:h-[70vh] w-full">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                // UPDATED: Reduced min-h-[350px] to min-h-[260px] to remove white space
                // UPDATED: Reduced padding p-6 to p-4 on mobile
                className="min-h-[260px] lg:h-full w-full flex flex-col order-1 group/text cursor-default relative bg-white rounded-3xl shadow-2xl border border-zinc-200 p-4 md:p-12 overflow-hidden"
            >
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-50" />

                 <div className="flex flex-col h-full w-full justify-end pb-2">
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
                                  transition: { staggerChildren: 0.4 } 
                              },
                              exit: { opacity: 0, transition: { duration: 0.3 } }
                          }}
                       >
                         {/* LINE 1 */}
                         <div className="flex flex-wrap gap-x-3 md:gap-x-4">
                              {sentences[currentSentenceIndex].line1.map((word, i) => {
                                  const currentSet = sentences[currentSentenceIndex];
                                  const isHighlight = currentSet.highlights.includes(word);
                                  const textColor = isHighlight ? currentSet.highlightHex : currentSet.baseHex;
                                  const hoverColor = isHighlight ? currentSet.hoverHighlightHex : currentSet.baseHex;

                                  return (
                                      <motion.span
                                          key={`l1-${i}`}
                                          variants={{
                                              hidden: { y: 20, opacity: 0 },
                                              visible: { 
                                                  y: 0, 
                                                  opacity: 1, 
                                                  transition: { duration: 0.6, ease: "easeOut" } 
                                              }
                                          }}
                                          style={{ color: textColor }} // Set base color via style for Motion interpolation
                                          whileHover={{ color: hoverColor, transition: { duration: 0.3 } }}
                                          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] cursor-default"
                                      >
                                          {word}
                                      </motion.span>
                                  );
                              })}
                         </div>

                         {/* LINE 2 */}
                         <div className="flex flex-wrap gap-x-3 md:gap-x-4">
                              {sentences[currentSentenceIndex].line2.map((word, i) => {
                                  const currentSet = sentences[currentSentenceIndex];
                                  const isHighlight = currentSet.highlights.includes(word);
                                  const textColor = isHighlight ? currentSet.highlightHex : currentSet.baseHex;
                                  const hoverColor = isHighlight ? currentSet.hoverHighlightHex : currentSet.baseHex;

                                  return (
                                      <motion.span
                                          key={`l2-${i}`}
                                          variants={{
                                              hidden: { y: 20, opacity: 0 },
                                              visible: { 
                                                  y: 0, 
                                                  opacity: 1, 
                                                  transition: { duration: 0.6, ease: "easeOut" } 
                                              }
                                          }}
                                          style={{ color: textColor }}
                                          whileHover={{ color: hoverColor, transition: { duration: 0.3 } }}
                                          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] cursor-default"
                                      >
                                          {word}
                                      </motion.span>
                                  );
                              })}
                         </div>

                       </motion.div>
                     </AnimatePresence>
                 </div>
            </div>

            {/* 2. VIDEO AREA */}
            <motion.div 
                // UPDATED: Video loads immediately with opacity fade-in
                initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                // UPDATED: Explicit height on mobile (h-[300px]) to ensure visibility below text
                className="h-[300px] md:h-[400px] lg:h-full w-full rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-zinc-800 order-2"
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
            // UPDATED: Container now triggers if text finishes OR if user scrolls to it
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
            <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2 z-10 relative bg-white">
                 
                 {/* Interactive Title Component */}
                 <div className="mb-8 md:mb-6">
                     <InteractiveParadigmTitle />
                 </div>
                
                {/* Address Block - Sequence: 3rd (After Map) */}
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

            {/* Map Side (Right) - Sequence: 2nd (After Title) */}
            <motion.div 
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: 2.2, duration: 1.0, ease: "easeOut" }
                    }
                }}
                className="relative w-full md:w-1/2 min-h-[300px] md:h-auto md:min-h-0 p-4 md:p-6 flex items-center justify-center bg-white"
            >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)] border border-zinc-200 relative bg-zinc-100 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)]">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        className="absolute inset-0 w-full h-full mix-blend-normal"
                        style={{
                            // Default: High Contrast Grayscale (White/Light Gray base)
                            filter: 'grayscale(100%) contrast(100%) brightness(100%)', 
                            transition: 'filter 500ms ease-in-out',
                            pointerEvents: 'none' // Disable scroll interaction and overlays
                        }}
                        onMouseEnter={(e) => {
                           // Hover: Darker "Negative" effect (but still grayscale)
                           e.currentTarget.style.filter = 'grayscale(100%) contrast(120%) brightness(70%)'; 
                        }}
                        onMouseLeave={(e) => {
                           e.currentTarget.style.filter = 'grayscale(100%) contrast(100%) brightness(100%)';
                        }}
                        title="Map"
                        loading="lazy"
                     />
                </div>
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

// Sub-component for Independent Word Coloring with Complex State
const InteractiveParadigmTitle: React.FC = () => {
    // Sequence 1: Words appear staggered
    const wordDelayStart = 0.5; // Start after container starts appearing
    const wordStagger = 0.3;

    return (
        <div className="flex flex-col items-start select-none">
            {/* Line 1 */}
            <div className="flex gap-x-2 md:gap-x-4 mb-2">
                {["THE", "PARADIGM"].map((word, i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { 
                                opacity: 1, 
                                y: 0,
                                transition: { 
                                    delay: wordDelayStart + (i * wordStagger),
                                    duration: 0.8,
                                    ease: "easeOut"
                                }
                            }
                        }}
                    >
                        <InteractiveWord word={word} />
                    </motion.div>
                ))}
            </div>
            {/* Line 2 */}
            <div className="flex gap-x-2 md:gap-x-4">
                {["SHIFTS."].map((word, i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { 
                                opacity: 1, 
                                y: 0,
                                transition: { 
                                    // Offset by previous line length (2 words)
                                    delay: wordDelayStart + ((2 + i) * wordStagger),
                                    duration: 0.8,
                                    ease: "easeOut"
                                }
                            }
                        }}
                    >
                        <InteractiveWord word={word} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const InteractiveWord: React.FC<{ word: string }> = ({ word }) => {
    const [isChanged, setIsChanged] = useState(false);

    const handleInteraction = () => {
        setIsChanged(prev => !prev);
    };

    return (
        <motion.span
            onMouseEnter={handleInteraction}
            animate={{
                color: isChanged 
                    ? ["#2c0f38", "#008f25", "#0f5916", "#1a0921"] 
                    : "#2c0f38", 
            }}
            transition={{ 
                duration: isChanged ? 3.0 : 0.5,
                times: isChanged ? [0, 0.3, 0.7, 1] : [1], 
                ease: "easeInOut"
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] cursor-pointer inline-block"
        >
            {word}
        </motion.span>
    );
};
