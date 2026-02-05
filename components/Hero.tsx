
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion';

// Defined outside to prevent re-creation on render
const sentences = [
    {
        // Sentence 1
        words: ["WITHOUT", "MEMORY,", "THERE'S", "NO", "MEANING."],
        color: "text-zinc-400",
        highlightColor: "text-micron-eggplant",
        hoverColor: "hover:text-micron-eggplant-light", 
        highlights: ["MEMORY,", "MEANING."],
        textSize: "text-6xl sm:text-7xl md:text-7xl lg:text-8xl",
        layout: "default"
    },
    {
        // Sentence 2
        words: ["WITHOUT", "VISION,", "THERE'S", "NO", "VELOCITY."],
        color: "text-zinc-400",
        highlightColor: "text-zinc-700",
        hoverColor: "hover:text-black", 
        highlights: ["VISION,", "VELOCITY."],
        textSize: "text-6xl sm:text-7xl md:text-7xl lg:text-8xl",
        layout: "default"
    },
    {
        // Sentence 3
        // UPDATED: Split "THERE'S NO" to handle spacing, increased font size by ~15%
        words: ["WITHOUT", "PLACE,", "THERE'S", "NO", "PERSPECTIVE."], 
        color: "text-zinc-400",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        // Font size increased from 5.5rem to 6.5rem (~15%)
        textSize: "text-6xl sm:text-7xl md:text-7xl lg:text-[6.5rem]",
        layout: "vertical_complex" // New flag for custom spacing logic
    }
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE", "PARADIGM"];
    const paradigmLine2 = ["SHIFTS."];

    return (
        <div className="flex flex-col items-start cursor-default">
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-3 md:gap-x-5">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ 
                            y: 0, 
                            opacity: 1, 
                            color: '#2c0f38' // Settles on Eggplant
                        }}
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                            color: '#008f25', // Micron Green on Hover
                            transition: { duration: 0.2 }
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: 0.5 + (i * 0.8), // Very slow stagger
                            duration: 2.0, 
                            ease: "easeOut"
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            {/* Line 2 */}
            <div className="flex flex-wrap gap-x-3 md:gap-x-5">
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ 
                            y: 0, 
                            opacity: 1,
                            color: '#008f25' // Settles on Green
                        }}
                        whileHover={{
                            scale: 1.05,
                            y: -4,
                            color: '#2c0f38', // Micron Eggplant on Hover
                            transition: { duration: 0.2 }
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: 0.5 + ((paradigmLine1.length + i) * 0.8), // Very slow stagger
                            duration: 2.0, 
                            ease: "easeOut"
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block"
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
  
  const isInView = useInView(containerRef, { amount: 0.2 });

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [key, setKey] = useState(0); 

  // Icon Controls
  const iconControls = useAnimation();
  
  // Effect to cycle through sentences - SPEED INCREASED
  useEffect(() => {
    // Reduced from 12000 to 8000 for faster cycling
    const cycleDuration = 8000; 

    const interval = setInterval(() => {
        setCurrentSentenceIndex((prev) => {
            if (prev < sentences.length - 1) {
                return prev + 1;
            } else {
                clearInterval(interval);
                return prev;
            }
        });
    }, cycleDuration);

    return () => clearInterval(interval);
  }, []);

  // Effect for Icon Roll-In Logic
  useEffect(() => {
      if (currentSentenceIndex === 2) {
          // Trigger ONLY after the last word "PERSPECTIVE" is done.
          // 4 lines * 0.1s stagger (faster now) + buffer = ~2.0s delay
          const totalDelay = 2.0; 

          iconControls.start({
              x: 0,
              rotate: 0, // End rotation
              opacity: 1,
              transition: { 
                  delay: totalDelay,
                  type: "spring",
                  stiffness: 30, // Lower stiffness for slower movement
                  damping: 20,   // Higher damping for less bounce, more drag
                  duration: 3.0, // Very slow motion
                  bounce: 0
              }
          });
      } else {
          // Reset position: Off to the right, rotated
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
      }
  }, [currentSentenceIndex, iconControls]);

  // Video Speed Control
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const handleReplay = () => {
      setKey(prev => prev + 1);
      if (currentSentenceIndex === 2) {
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
          const totalDelay = 2.0;
          iconControls.start({
              x: 0,
              rotate: 0,
              opacity: 1,
              transition: { 
                  delay: totalDelay,
                  duration: 3.0,
                  type: "spring",
                  stiffness: 30,
                  damping: 20
              }
          });
      }
  };

  const renderWord = (word: string, i: number, currentSet: any) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      
      // Layout Logic
      let layoutClass = "";
      
      // Default vertical stack for sentences 1 & 2 if needed (currently they use default)
      // Special logic for Sentence 3 "vertical_complex"
      if (currentSet.layout === "vertical_complex") {
          if (word === "THERE'S") {
              // Add large right margin to create 10% space gap between THERE'S and NO
              layoutClass = "inline-block mr-12 md:mr-24"; 
          } else if (word === "NO") {
              // Sits on same line as THERE'S
              layoutClass = "inline-block";
          } else {
              // WITHOUT, PLACE, PERSPECTIVE - Full width lines
              layoutClass = "w-full basis-full mb-1 block"; 
          }
      } else if (currentSet.layout === "vertical_all") {
          layoutClass = "w-full basis-full mb-1";
      }

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { y: 30, opacity: 0 },
                   visible: { 
                       y: 0, 
                       opacity: 1, 
                       transition: { duration: 0.8, ease: "easeOut" } // Increased speed (1.5 -> 0.8)
                   },
                   exit: {
                       y: -30,
                       opacity: 0,
                       transition: { duration: 0.5, ease: "easeIn" }
                   }
               }}
               className={`${currentSet.textSize} ${layoutClass} font-black uppercase tracking-tighter leading-[0.9] cursor-default transition-colors duration-300 ${colorClass} ${hoverClass}`}
           >
               {word}
           </motion.span>
      );
  }

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-white text-zinc-900 pt-48 pb-32 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-auto md:h-[400px] w-full">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                onMouseEnter={handleReplay}
                className="h-[400px] md:h-full w-full flex flex-col justify-end items-start order-1 bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 border border-zinc-100 p-6 md:p-12 relative overflow-hidden group"
            >
                 {/* Logo Top Right - Rolling in from Right - PADDING DOUBLED */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    // Updated padding: top-12 right-12 md:top-16 md:right-16 (Doubled from 6/8)
                    className="absolute top-12 right-12 md:top-16 md:right-16 z-20"
                 >
                    <img 
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        className="h-20 w-20 md:h-32 md:w-32 object-contain"
                    />
                 </motion.div>
                 
                 <div className="w-full relative z-10 mt-12 md:mt-0">
                     <AnimatePresence mode="wait">
                       <motion.div 
                          key={`${currentSentenceIndex}-${key}`}
                          className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 w-full max-w-5xl"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                              hidden: { opacity: 1 },
                              visible: { 
                                  opacity: 1,
                                  transition: { staggerChildren: 0.1 } // Faster Stagger (0.8 -> 0.1)
                              },
                              exit: { 
                                  opacity: 1, 
                                  transition: { staggerChildren: 0.05, staggerDirection: -1 } 
                              }
                          }}
                       >
                         {sentences[currentSentenceIndex].words.map((wordOrGroup, i) => {
                             const currentSet = sentences[currentSentenceIndex];
                             return renderWord(wordOrGroup as string, i, currentSet);
                         })}
                       </motion.div>
                     </AnimatePresence>
                 </div>
            </div>

            {/* 2. VIDEO AREA */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="h-[300px] md:h-full w-full rounded-3xl overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 bg-black border border-zinc-800 order-2 group"
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                >
                     <source src="https://assets.mixkit.co/videos/preview/mixkit-rotating-earth-from-space-1616-large.mp4" type="video/mp4" />
                </video>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & MAP */}
        <motion.div 
            ref={bottomSectionRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[320px] mt-4 group hover:-translate-y-1 transition-transform duration-700"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-white/40 z-20" />

            {/* Text Side (Left) */}
            <div className="p-8 md:p-10 flex flex-col justify-center md:w-1/2 z-10 relative">
                 <InteractiveParadigmTitle />
                
                {/* Address Block - Updated Colors */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 1.0 }}
                    className="flex gap-6 border-l-[4px] border-micron-eggplant pl-6 mt-6"
                >
                     <div className="flex flex-col justify-center">
                        <p className="text-xs md:text-sm font-black uppercase tracking-widest mb-1 text-white opacity-90">
                            Micron House
                        </p>
                        <p className="font-bold text-sm md:text-base uppercase tracking-wide leading-tight text-micron-eggplant">
                            1020 East Warm Springs Ave
                        </p>
                        <p className="font-bold text-sm md:text-base uppercase tracking-wide leading-tight opacity-80 text-micron-eggplant">
                            Boise, Idaho 83712
                        </p>
                     </div>
                </motion.div>
            </div>

            {/* Map Side (Right) */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:h-auto md:min-h-0 p-3 flex items-center justify-center">
                <div 
                    className="w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-lg relative bg-white transform transition-all duration-500 hover:scale-[1.02]"
                >
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        className="absolute inset-0 w-full h-full mix-blend-multiply opacity-80 hover:opacity-100 transition-opacity duration-500 grayscale"
                        style={{ border: 0 }}
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
