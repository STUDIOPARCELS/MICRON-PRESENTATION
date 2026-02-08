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
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY,", "MEANING."],
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
        words: ["WITHOUT", "PLACE,", "THERE'S", "NO", "PERSPECTIVE."], 
        color: "text-zinc-400",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "mixed",
        layoutOverrides: [
            "w-auto mr-2 md:mr-4",                                     // WITHOUT
            "flex-grow text-left md:w-auto md:flex-grow-0 md:mr-4",    // PLACE,
            "w-auto mr-2 md:mr-4",                                     // THERE'S
            "flex-grow text-left md:w-auto md:flex-grow-0 md:mr-4",    // NO
            "w-full md:w-auto"                                         // PERSPECTIVE.
        ]
    },
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE"];
    const paradigmLine2 = ["PARADIGM"];
    const paradigmLine3 = ["SHIFTS."];

    const cycleAnimation = {
        color: ["#008f25", "#064e16", "#2c0f38", "#ffffff"],
        transition: { 
            duration: 2.0, 
            ease: "easeInOut" as const,
            times: [0, 0.33, 0.66, 1] 
        }
    };

    return (
        <div className="flex flex-col items-start cursor-default">
            {/* Line 1 & 2 - UPDATED: Ensure they stay together if possible */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#008f25' }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        whileHover={cycleAnimation}
                        style={{ transition: "color 1.5s ease-out" }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block text-micron-green"
                    >
                        {word}
                    </motion.span>
                ))}
                
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.7, duration: 1.5 }}
                        whileHover={cycleAnimation}
                        style={{ transition: "color 1.5s ease-out" }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block text-micron-eggplant"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            {/* Line 3 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine3.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#2c0f38' }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.9, duration: 1.5 }}
                        whileHover={cycleAnimation}
                        style={{ transition: "color 1.5s ease-out" }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block text-micron-eggplant"
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
  const [layoutShift, setLayoutShift] = useState(false);

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

    // Cycle duration to allow slower word population (6000ms)
    const cycleDuration = 6000; 

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
      // Trigger on the THIRD sentence (index 2)
      if (currentSentenceIndex === 2) {
          const totalDelay = 2.2; 

          iconControls.start({
              x: 0,
              rotate: 0, // End rotation
              opacity: 1,
              transition: { 
                  delay: totalDelay,
                  type: "spring",
                  stiffness: 30, 
                  damping: 20,   
                  duration: 3.0, 
                  bounce: 0
              }
          });

          // Layout Shift Timer - trigger just before logo arrives
          const shiftTimer = setTimeout(() => {
              setLayoutShift(true);
          }, 1800);

          return () => {
              clearTimeout(shiftTimer);
          };

      } else if (currentSentenceIndex === 0) {
          // Only manual reset triggers this now (since scroll reset is removed)
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
          setLayoutShift(false);
      }
  }, [currentSentenceIndex, iconControls]);

  // Video Speed Control
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const renderWord = (word: string, i: number, currentSet: any) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      
      let layoutClass = "";
      if (currentSet.layout === "vertical_all") {
          layoutClass = "w-full basis-full mb-1";
      } else if (currentSet.layout === "mixed" && currentSet.layoutOverrides && currentSet.layoutOverrides[i]) {
          layoutClass = currentSet.layoutOverrides[i];
      }

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { y: 30, opacity: 0 },
                   visible: { 
                       y: 0, 
                       opacity: 1, 
                       transition: { duration: 0.5, ease: "easeOut" } 
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

  // UPDATED: Single Paragraph Quote with hyphen and lowercase 'd'
  const quoteText = "A convergence of historic stewardship and autonomous future. The first corporate residence - designed for the era of artificial intelligence.";
  const quoteWords = quoteText.split(" ");

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-white text-zinc-900 pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4">
        
        {/* TOP SECTION */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-auto md:h-[450px] w-full">
            
            {/* 1. TEXT ANIMATION AREA (White Bento) */}
            <motion.div 
                layout
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    ${layoutShift ? 'min-h-[160px] px-6 pt-2 pb-12 justify-end' : 'min-h-[200px] p-6 justify-center'}
                    md:min-h-[300px] md:h-full md:justify-end md:px-12 md:pt-12 md:pb-12
                    w-full flex flex-col items-start order-1 bg-white rounded-3xl 
                    shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-zinc-200 relative overflow-hidden group
                `}
            >
                 {/* Logo Animation */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    // UPDATED: Mobile positioning right-6 (was right-4) to nudge left
                    className="absolute bottom-10 right-6 w-fit md:top-12 md:right-20 md:bottom-auto md:left-auto md:mx-0 z-20"
                 >
                    <motion.img 
                        whileHover={{ rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        className="h-24 w-24 md:h-40 md:w-40 object-contain cursor-pointer"
                    />
                 </motion.div>
                 
                 <motion.div 
                    layout
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                    className={`w-full relative z-10 mt-0 md:mt-0`}
                 >
                     <AnimatePresence mode="wait">
                       {currentSentenceIndex !== null && (
                           <motion.div 
                              key={`${currentSentenceIndex}-${key}`}
                              className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-4 w-full max-w-5xl"
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={{
                                  hidden: { opacity: 1 },
                                  visible: { 
                                      opacity: 1,
                                      transition: { staggerChildren: 0.4 } 
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
                 </motion.div>
            </motion.div>

            {/* 2. VIDEO AREA */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-[300px] md:h-full w-full rounded-3xl overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 bg-black order-2 group"
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                >
                     <source src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MICRON%20HOUSE_NEW.mp4" type="video/mp4" />
                </video>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        <motion.div 
            ref={bottomSectionRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row md:items-stretch min-h-[400px] md:min-h-[360px] mt-4 p-8 md:p-8 gap-4 md:gap-8 group"
        >
            {/* LEFT: Title + Address Block (Flex-1) */}
            {/* UPDATED: Increased gap to gap-10 on mobile to double the pattern */}
            <div className="flex-shrink-0 flex flex-col justify-between items-start z-10 relative h-full md:w-auto gap-10 md:gap-12">
                 <div className="relative z-10 w-full">
                    <InteractiveParadigmTitle />
                 </div>
                 
                 {/* ADDRESS BLOCK */}
                 {/* UPDATED: Added h-fit to prevent line stretching, removed mt logic due to gap-10 */}
                 <div className="flex flex-col gap-1 border-l-4 border-micron-eggplant pl-4 relative z-10 mt-auto md:mt-auto h-fit">
                        <h3 className="text-white font-bold text-xl uppercase tracking-wider">Micron House</h3>
                        <p className="text-micron-eggplant font-bold text-sm md:text-lg uppercase tracking-widest whitespace-nowrap">1020 East Warm Springs Ave</p>
                        <p className="text-micron-eggplant/80 text-sm md:text-lg uppercase tracking-widest">Boise, Idaho 83712</p>
                 </div>

                 {/* MOBILE QUOTE - IN FLOW */}
                 {/* UPDATED: Use whileInView for scroll-based triggering */}
                 <div className="md:hidden w-full flex-grow pt-4 pb-12 flex items-center justify-center relative z-20">
                      <motion.div
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.3 }}
                         variants={{
                             visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }, 
                             hidden: {}
                         }}
                         className="font-micron text-2xl text-center text-white leading-relaxed -rotate-3"
                      >
                         {/* Joined into one paragraph block */}
                         <p className="inline">
                             {quoteWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
                                    }}
                                    className="mr-1.5 inline-block"
                                >
                                    {word}
                                </motion.span>
                             ))}
                         </p>
                      </motion.div>
                 </div>
            </div>

            {/* CENTER: DESKTOP QUOTE CONTAINER (Flex-Grow) */}
            <div className="hidden md:flex flex-grow items-center justify-center relative px-4 z-10">
                <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
                            hidden: {}
                        }}
                        className="font-micron text-2xl md:text-3xl text-white leading-relaxed text-left -rotate-6 max-w-lg w-full -translate-x-4"
                >
                     {/* Joined into one paragraph block */}
                     <p className="inline">
                        {quoteWords.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 5 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            className="mr-2 inline-block"
                        >
                            {word}
                        </motion.span>
                        ))}
                    </p>
                </motion.div>
            </div>

            {/* RIGHT: Map Card (Fixed Width) */}
            <div className="w-full md:w-[300px] lg:w-[360px] aspect-[4/3] md:aspect-auto md:h-auto bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white/20 z-10 mt-auto md:mt-0 flex-shrink-0">
                 <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(100%)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Micron House Map"
                    className="absolute inset-0 w-full h-full opacity-90"
                />
            </div>
        </motion.div>

      </div>
    </section>
  );
};