
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Defined outside to prevent re-creation on render
const sentences = [
    {
        // Sentence 1
        words: ["WITHOUT", "MEMORY,", "THERE'S", "NO", "MEANING."],
        color: "text-zinc-400",
        highlightColor: "text-micron-eggplant",
        // UPDATED: More transparent/lighter eggplant as requested
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY,", "MEANING."],
        // UPDATED: Reduced mobile size from text-6xl to text-4xl
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "default"
    },
    {
        // Sentence 2
        words: ["WITHOUT", "VISION,", "THERE'S", "NO", "VELOCITY."],
        color: "text-zinc-400",
        highlightColor: "text-zinc-700",
        hoverColor: "hover:text-black", 
        highlights: ["VISION,", "VELOCITY."],
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "default"
    },
    {
        // Sentence 3
        words: ["WITHOUT", "PLACE,", "THERE'S NO", "PERSPECTIVE."], 
        color: "text-zinc-400",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "default"
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
                            // UPDATED: Settles on WHITE
                            color: '#ffffff' 
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

  // Start as null for blank state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0); 

  // Icon Controls
  const iconControls = useAnimation();

  // Start the sequence after mount
  useEffect(() => {
    // Increased delay to 500ms to ensure white bento is visible first
    const startTimer = setTimeout(() => {
        setCurrentSentenceIndex(0);
    }, 500);
    return () => clearTimeout(startTimer);
  }, []);
  
  // Effect to cycle through sentences
  useEffect(() => {
    // If not started, or at end, stop automatic cycling
    if (currentSentenceIndex === null) return;
    if (currentSentenceIndex >= sentences.length - 1) return;

    // UPDATED: Reduced cycle duration for faster speed (9000 -> 4500)
    const cycleDuration = 4500; 

    const timer = setTimeout(() => {
        setCurrentSentenceIndex((prev) => {
            if (prev === null) return 0;
            if (prev < sentences.length - 1) {
                return prev + 1;
            } else {
                return prev;
            }
        });
    }, cycleDuration);

    return () => clearTimeout(timer);
  }, [currentSentenceIndex]);

  // Effect for Icon Roll-In Logic
  useEffect(() => {
      if (currentSentenceIndex === 2) {
          // Trigger ONLY after the last word "PERSPECTIVE" is done.
          // Stagger 0.15 * 4 words = 0.6s offset + 0.8s duration ~ 1.4s finish.
          const totalDelay = 1.5; 

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
      // Explicitly reset to 0 so the loop restarts from the beginning
      setCurrentSentenceIndex(0);
      
      // Reset Icon manually for replay
      iconControls.set({ x: 200, rotate: -360, opacity: 0 });
  };

  const renderWord = (word: string, i: number, currentSet: any) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      
      let layoutClass = "";
      if (currentSet.layout === "vertical_all") {
          layoutClass = "w-full basis-full mb-1";
      }
      // Explicitly force "THERE'S NO" to break onto a new line by taking full width
      if (word === "THERE'S NO") {
          layoutClass = "w-full basis-full";
      }

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { y: 30, opacity: 0 },
                   visible: { 
                       y: 0, 
                       opacity: 1, 
                       // UPDATED: Faster duration (1.5 -> 0.8) for snappier reveal
                       transition: { duration: 0.8, ease: "easeOut" } 
                   },
                   exit: {
                       y: -30,
                       opacity: 0,
                       transition: { duration: 0.3, ease: "easeIn" }
                   }
               }}
               className={`${currentSet.textSize} ${layoutClass} font-black uppercase tracking-tighter leading-[0.9] cursor-default transition-colors duration-300 ${colorClass} ${hoverClass}`}
           >
               {word}
           </motion.span>
      );
  }

  // Quote words for animation
  const quoteWords = [
      "“A", "convergence", "of", "historic", "stewardship", "and", "autonomous", "future.", 
      "The", "first", "corporate", "residence", "designed", "for", "the", "era", "of", "artificial", "intelligence.”"
  ];

  return (
    <section 
        ref={containerRef}
        // REDUCED PADDING: pt-48 pb-16
        className="relative w-full bg-white text-zinc-900 pt-32 md:pt-48 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-auto md:h-[400px] w-full">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                // FLOATING 3D EFFECT
                // UPDATED MOBILE HEIGHT: min-h-[300px] instead of h-[400px] to reduce extra space
                className="min-h-[300px] md:h-full w-full flex flex-col justify-end items-start order-1 bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] hover:shadow-[0_50px_100px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500 px-6 py-6 md:p-12 relative overflow-hidden group"
            >
                 {/* Logo Animation */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    // UPDATED MOBILE POSITION: Center Horizontal, Top 6
                    className="absolute top-6 left-0 right-0 mx-auto w-fit md:top-16 md:right-20 md:left-auto md:mx-0 z-20"
                 >
                    <img 
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        // UPDATED SIZE: h-24/w-24 and md:h-40/w-40 (+20% larger)
                        className="h-24 w-24 md:h-40 md:w-40 object-contain"
                    />
                 </motion.div>
                 
                 <div className="w-full relative z-10 mt-20 md:mt-0">
                     <AnimatePresence mode="wait">
                       {currentSentenceIndex !== null && (
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
                                      // UPDATED: Much faster stagger (0.4 -> 0.15) for faster sentence flow
                                      transition: { staggerChildren: 0.15 } 
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
                       )}
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
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                >
                     <source src="https://assets.mixkit.co/videos/preview/mixkit-rotating-earth-from-space-1616-large.mp4" type="video/mp4" />
                </video>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        <motion.div 
            ref={bottomSectionRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[320px] mt-4 group hover:-translate-y-1 transition-transform duration-700"
        >
            <div className="absolute inset-x-0 top-0 h-px bg-white/40 z-20" />

            {/* Left Side: Title + Address Block */}
            <div className="p-8 md:p-10 flex flex-col justify-center md:w-1/2 z-10 relative border-b md:border-b-0 md:border-r border-white/10">
                 <InteractiveParadigmTitle />
                
                 {/* ADDRESS BLOCK UPDATE */}
                 <div className="mt-8 flex flex-col gap-1">
                    {/* Micron House Green */}
                    <h3 className="text-micron-green font-bold text-2xl uppercase tracking-tighter">Micron House</h3>
                    {/* Address Larger Font and Higher Opacity */}
                    <div className="flex items-center gap-2 text-white text-lg font-medium uppercase tracking-widest">
                        <MapPin size={18} />
                        <span>1020 E Warm Springs Ave</span>
                    </div>
                    <p className="text-white text-lg uppercase tracking-widest pl-7">Boise, Idaho 83712</p>
                 </div>
            </div>

            {/* Right Side: Quote (Moved here, Small Script Font) */}
            <div className="relative w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-white/5 backdrop-blur-sm">
                 <div className="max-w-md">
                    <p className="flex flex-wrap gap-x-2 text-xl md:text-2xl text-white font-micron leading-relaxed text-center md:text-left">
                        {quoteWords.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, filter: 'blur(5px)' }}
                                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: 0.2 + (i * 0.05), // Faster stagger for quote
                                    ease: "easeOut" 
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </p>
                 </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};
