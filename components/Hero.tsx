
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Track if the section is in view to handle auto-replay on scroll
  const isInView = useInView(containerRef, { amount: 0.2 });

  // --- CYCLING TEXT STATE ---
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const sentences = [
    {
        line1: ["WITHOUT", "MEMORY,"],
        line2: ["THERE'S", "NO", "MEANING."],
        highlights: ["MEMORY,", "MEANING."],
        highlightColor: "text-micron-eggplant", // Eggplant
        baseColor: "text-[#878d9f]" // GRAY
    },
    {
        line1: ["WITHOUT", "VISION,"],
        line2: ["THERE'S", "NO", "VELOCITY."],
        highlights: ["VISION,", "VELOCITY."],
        highlightColor: "text-[#878d9f]", // Light Gray
        baseColor: "text-zinc-900" // BLACK
    },
    {
        line1: ["WITHOUT", "PLACE,"],
        line2: ["THERE'S", "NO", "PERSPECTIVE."],
        highlights: ["PLACE,", "PERSPECTIVE."],
        highlightColor: "text-micron-green", // Green
        baseColor: "text-[#878d9f]" // GRAY
    }
  ];

  // 1. Slow Video Down by 50%
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.5;
    }
  }, []);

  // 2. Animation Logic: 
  // - Starts when isInView is true.
  // - Resets when isInView becomes false (user scrolls away).
  // - Does NOT restart on hover or automatic loop.
  useEffect(() => {
    let interval: any;

    if (isInView) {
        // If we haven't finished the sequence yet, start the timer
        if (!isFinished) {
            interval = setInterval(() => {
                setCurrentSentenceIndex((prev) => {
                    if (prev === sentences.length - 1) {
                        clearInterval(interval);
                        setIsFinished(true); // Stop at the last index
                        return prev;
                    }
                    return prev + 1;
                });
            }, 9000); 
        }
    } else {
        // When scrolled out of view, RESET the animation state
        // so it plays again when the user scrolls back up.
        setIsFinished(false);
        setCurrentSentenceIndex(0);
    }

    return () => clearInterval(interval);
  }, [isInView, isFinished]);

  // Helper to determine if a word should be colored
  const getWordClass = (word: string, currentSentence: typeof sentences[0]) => {
      if (currentSentence.highlights.includes(word)) {
          return currentSentence.highlightColor;
      }
      return currentSentence.baseColor;
  };

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-white text-zinc-900 pt-24 pb-8 flex flex-col justify-center min-h-screen"
    >
      {/* INCREASED GAP: gap-2 -> gap-16 (Doubled padding/spacing as requested) */}
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-16">
        
        {/* MAIN CONTENT AREA: SPLIT SCREEN BENTO GRID */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:h-[70vh] min-h-[500px]">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                className="h-[40%] lg:h-full w-full flex flex-col order-1 group/text cursor-default relative bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-zinc-100 p-6 md:p-12 overflow-hidden"
            >
                 {/* Top Bevel */}
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-50" />

                 {/* ALIGNMENT: Always justify-end (Bottom Aligned) */}
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
                                  // STAGGER: 0.8s per word (Very slow word by word)
                                  transition: { staggerChildren: 0.8 } 
                              },
                              exit: { opacity: 0, transition: { duration: 0.5 } }
                          }}
                       >
                         {/* LINE 1 */}
                         <div className="flex flex-wrap gap-x-3 md:gap-x-4">
                              {sentences[currentSentenceIndex].line1.map((word, i) => (
                                  <motion.span
                                      key={`l1-${i}`}
                                      variants={{
                                          hidden: { y: 20, opacity: 0 },
                                          visible: { 
                                              y: 0, 
                                              opacity: 1, 
                                              // SMOOTH SLOW TRANSITION
                                              transition: { duration: 1.0, ease: "easeOut" } 
                                          }
                                      }}
                                      className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] ${getWordClass(word, sentences[currentSentenceIndex])}`}
                                  >
                                      {word}
                                  </motion.span>
                              ))}
                         </div>

                         {/* LINE 2 */}
                         <div className="flex flex-wrap gap-x-3 md:gap-x-4">
                              {sentences[currentSentenceIndex].line2.map((word, i) => (
                                  <motion.span
                                      key={`l2-${i}`}
                                      variants={{
                                          hidden: { y: 20, opacity: 0 },
                                          visible: { 
                                              y: 0, 
                                              opacity: 1, 
                                              // SMOOTH SLOW TRANSITION
                                              transition: { duration: 1.0, ease: "easeOut" } 
                                          }
                                      }}
                                      className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] ${getWordClass(word, sentences[currentSentenceIndex])}`}
                                  >
                                      {word}
                                  </motion.span>
                              ))}
                         </div>

                       </motion.div>
                     </AnimatePresence>
                 </div>
            </div>

            {/* 2. VIDEO AREA */}
            <div className="h-[60%] lg:h-full w-full rounded-3xl overflow-hidden relative shadow-2xl bg-black border border-zinc-800 order-2">
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
            </div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & MAP */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                
                <div className="flex gap-6 border-l-[4px] border-zinc-200 pl-6 transition-colors duration-500 group-hover:border-micron-green">
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
                </div>
            </div>

            {/* Map Side (Right) */}
            {/* UPDATED: Map transitions very slowly to Green/Black on hover */}
            <div className="relative w-full md:w-1/2 min-h-[250px] md:h-auto md:min-h-0 bg-zinc-50 p-4 md:p-6">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-zinc-200 relative bg-zinc-900">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        className="absolute inset-0 w-full h-full mix-blend-normal"
                        style={{
                            // Start state: Grayscale
                            filter: 'grayscale(100%) sepia(0%) hue-rotate(0deg) saturate(100%) contrast(100%) invert(0%)',
                            transition: 'filter 5000ms ease-in-out'
                        }}
                        // On hover: Green/Black Matrix style
                        // sepia(100%) + hue-rotate(90deg) -> Green
                        // saturate(300%) -> Intense Green
                        // contrast(120%) -> Deep Blacks
                        onMouseEnter={(e) => {
                           e.currentTarget.style.filter = 'grayscale(0%) sepia(100%) hue-rotate(90deg) saturate(300%) contrast(120%) invert(0%)';
                        }}
                        onMouseLeave={(e) => {
                           e.currentTarget.style.filter = 'grayscale(100%) sepia(0%) hue-rotate(0deg) saturate(100%) contrast(100%) invert(0%)';
                        }}
                        title="Map"
                        loading="lazy"
                     />
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

// Sub-component for Independent Word Coloring with Complex State
const InteractiveParadigmTitle: React.FC = () => {
    return (
        <div className="flex flex-col items-start select-none">
            {/* Line 1 */}
            <div className="flex gap-x-2 md:gap-x-4 mb-2">
                {["THE", "PARADIGM"].map((word, i) => (
                    <InteractiveWord key={i} word={word} />
                ))}
            </div>
            {/* Line 2 */}
            <div className="flex gap-x-2 md:gap-x-4">
                {["SHIFTS."].map((word, i) => (
                    <InteractiveWord key={i} word={word} />
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
                    ? ["#2c0f38", "#008f25", "#0f5916", "#1a0921"] // Sequence
                    : "#2c0f38", // Reset
            }}
            transition={{ 
                duration: isChanged ? 3.0 : 0.5,
                times: isChanged ? [0, 0.3, 0.7, 1] : [1], 
                ease: "easeInOut"
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] cursor-pointer"
        >
            {word}
        </motion.span>
    );
};
