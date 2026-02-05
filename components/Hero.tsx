
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
        // UPDATED: Restructured for line breaks: WITHOUT, PLACE, THERE'S, NO PERSPECTIVE
        words: ["WITHOUT", "PLACE,", "THERE'S", ["NO", "PERSPECTIVE."]], 
        color: "text-zinc-400",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        // UPDATED: Increased font size by 10% (lg:text-7xl -> lg:text-[5.5rem])
        textSize: "text-6xl sm:text-7xl md:text-7xl lg:text-[5.5rem]",
        layout: "vertical" // Custom flag to trigger vertical stacking
    }
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE", "PARADIGM"];
    const paradigmLine2 = ["SHIFTS."];

    return (
        <div 
            className="flex flex-col items-start cursor-default"
        >
            <div className="flex flex-wrap gap-x-3 md:gap-x-5">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ 
                            y: 0, 
                            opacity: 1, 
                            // UPDATED: Color animation (Purple -> Green -> Purple)
                            color: ['#2c0f38', '#008f25', '#2c0f38']
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: 0.2 + (i * 0.15), 
                            // UPDATED: Slower duration and lingering
                            duration: 4.0, 
                            ease: "easeInOut",
                            times: [0, 0.4, 1] // Linger in middle
                        }}
                        whileHover={{ 
                            scale: 1.05, 
                            color: '#ffffff', 
                            transition: { duration: 0.2 } 
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block transition-colors"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            <div className="flex flex-wrap gap-x-3 md:gap-x-5">
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ 
                            y: 0, 
                            opacity: 1,
                            // UPDATED: Color animation
                            color: ['#2c0f38', '#008f25', '#2c0f38']
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                            delay: 0.5 + (i * 0.15), 
                            duration: 4.0, 
                            ease: "easeInOut",
                            times: [0, 0.4, 1]
                        }}
                        whileHover={{ 
                            scale: 1.05, 
                            color: '#ffffff', 
                            transition: { duration: 0.2 } 
                        }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block transition-colors"
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
  const [key, setKey] = useState(0); // Key to force re-render/replay

  // Icon Controls
  const iconControls = useAnimation();
  
  // Effect to cycle through sentences
  useEffect(() => {
    // 50% Slower cycle duration (was 7000)
    const cycleDuration = 10500; 

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
          // Calculate when the word "PERSPECTIVE" (last group) finishes
          // Stagger is 0.6s. 
          // Words: WITHOUT(0), PLACE(1), THERE'S(2), NO PERSPECTIVE(3). 
          // Total delay roughly 3 * 0.6 = 1.8s + duration 1.2s = ~3.0s
          
          const totalDelay = (3 * 0.6) + 0.5; // Trigger slightly after start of last word

          iconControls.start({
              x: 0,
              rotate: 0,
              opacity: 1,
              transition: { 
                  delay: totalDelay,
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  duration: 1.5 
              }
          });
      } else {
          // Reset if we were cycling (though current logic stops at end)
          // For now, keep it hidden until the grand finale
          iconControls.set({ x: '100vw', rotate: 180, opacity: 0 });
      }
  }, [currentSentenceIndex, iconControls]);

  // Video Speed Control
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.6;
    }
  }, []);

  // Replay animation on hover
  const handleReplay = () => {
      setKey(prev => prev + 1);
      // If it's the last sentence, re-trigger icon too
      if (currentSentenceIndex === 2) {
          iconControls.set({ x: '100vw', rotate: 180, opacity: 0 });
          const totalDelay = (3 * 0.6) + 0.5;
          iconControls.start({
              x: 0,
              rotate: 0,
              opacity: 1,
              transition: { 
                  delay: totalDelay,
                  type: "spring",
                  stiffness: 60,
                  damping: 12,
                  duration: 1.5 
              }
          });
      }
  };

  const renderWord = (word: string, i: number, currentSet: any, isGrouped = false) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      
      // Special handling for Sentence 3 Line breaks
      // "WITHOUT" -> block
      // "PLACE," -> block
      // "THERE'S" -> block
      // Grouped ["NO", "PERSPECTIVE."] -> flex row
      let layoutClass = "";
      if (currentSet.layout === "vertical" && !isGrouped) {
          layoutClass = "w-full basis-full mb-1"; // Force new line
      }

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
                   visible: { 
                       y: 0, 
                       opacity: 1, 
                       filter: "blur(0px)",
                       transition: { duration: 1.2, ease: "easeOut" } 
                   },
                   exit: {
                       y: -30,
                       opacity: 0,
                       filter: "blur(10px)",
                       transition: { duration: 0.6, ease: "easeIn" }
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
                onMouseEnter={handleReplay} // Replay trigger
                className="h-[400px] md:h-full w-full flex flex-col justify-end items-start order-1 bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 border border-zinc-100 p-6 md:p-12 relative overflow-hidden group"
            >
                 {/* Logo Top Right - Controlled by Animation */}
                 <motion.div 
                    initial={{ x: '100vw', rotate: 180, opacity: 0 }}
                    animate={iconControls}
                    // UPDATED: Moved over (right-8 -> right-12)
                    className="absolute top-6 right-6 md:top-8 md:right-12 z-20"
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
                          key={`${currentSentenceIndex}-${key}`} // Updates on sentence change OR replay
                          className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 w-full max-w-5xl"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                              hidden: { opacity: 1 },
                              visible: { 
                                  opacity: 1,
                                  transition: { staggerChildren: 0.6 } 
                              },
                              exit: { 
                                  opacity: 1, 
                                  transition: { staggerChildren: 0.3, staggerDirection: -1 } 
                              }
                          }}
                       >
                         {sentences[currentSentenceIndex].words.map((wordOrGroup, i) => {
                             const currentSet = sentences[currentSentenceIndex];
                             
                             if (Array.isArray(wordOrGroup)) {
                                 return (
                                     <div key={i} className="flex flex-nowrap gap-x-4 md:gap-x-6 w-full basis-full">
                                         {wordOrGroup.map((w, j) => renderWord(w, j, currentSet, true))}
                                     </div>
                                 );
                             } else {
                                 return renderWord(wordOrGroup, i, currentSet);
                             }
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
            // UPDATED: bg-micron-eggplant-light (solid blue)
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[320px] mt-4 group hover:-translate-y-1 transition-transform duration-700"
        >
            {/* Top Light Highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-white/40 z-20" />

            {/* Text Side (Left) */}
            <div className="p-8 md:p-10 flex flex-col justify-center md:w-1/2 z-10 relative">
                 <InteractiveParadigmTitle />
                
                {/* Address Block */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1.0 }}
                    className="flex gap-6 border-l-[4px] border-micron-eggplant pl-6 mt-6"
                >
                     <div className="flex flex-col justify-center text-micron-eggplant">
                        <p className="text-xs md:text-sm font-black uppercase tracking-widest mb-1 opacity-80 text-micron-eggplant">
                            Micron House
                        </p>
                        <p className="font-bold text-sm md:text-base uppercase tracking-wide leading-tight">
                            1020 East Warm Springs Ave
                        </p>
                        <p className="font-bold text-sm md:text-base uppercase tracking-wide leading-tight opacity-70">
                            Boise, Idaho 83712
                        </p>
                     </div>
                </motion.div>
            </div>

            {/* Map Side (Right) */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:h-auto md:min-h-0 p-3 flex items-center justify-center">
                {/* UPDATED: Map Container resized to ~75% (25% reduced) via padding/margins */}
                <div 
                    className="w-[85%] h-[85%] rounded-2xl overflow-hidden shadow-lg relative bg-white transform transition-all duration-500 hover:scale-[1.02]"
                >
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        // UPDATED: Added grayscale filter
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
