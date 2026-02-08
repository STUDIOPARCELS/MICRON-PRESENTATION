
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation, Variants } from 'framer-motion';
import { MapPin } from 'lucide-react';

// Defined outside to prevent re-creation on render
const sentences = [
    {
        // Sentence 1
        words: ["WITHOUT", "VISION,", "THERE'S", "NO", "VELOCITY."],
        color: "text-zinc-400",
        highlightColor: "text-zinc-700",
        hoverColor: "hover:text-black", 
        highlights: ["VISION,", "VELOCITY."],
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "default"
    },
    {
        // Sentence 2
        words: ["WITHOUT", "MEMORY,", "THERE'S", "NO", "MEANING."],
        color: "text-zinc-400",
        highlightColor: "text-micron-eggplant",
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY,", "MEANING."],
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
        // UPDATED: Changed layout to mixed to support manual line breaking
        layout: "mixed",
        layoutOverrides: {
            0: "md:w-full md:basis-full", // WITHOUT (Inline mobile, Stacked desktop)
            1: "md:w-full md:basis-full"  // PLACE, (Inline mobile, Stacked desktop)
            // THERE'S (starts Line 3 automatically on desktop, flows on mobile)
        }
    },
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE"];
    const paradigmLine2 = ["PARADIGM"];
    const paradigmLine3 = ["SHIFTS."];

    // Colors
    const cLightGreen = "#008f25"; 
    const cDarkGreen = "#14532d"; 
    const cPurple = "#2c0f38"; 

    // Animation Variants
    // Transitions from Light Green -> Dark Green -> Purple -> Final Color
    const getVariant = (finalColor: string): Variants => ({
        hidden: { y: 20, opacity: 0, color: cLightGreen },
        visible: (customDelay: number) => ({
            y: 0, 
            opacity: 1,
            color: [cLightGreen, cDarkGreen, cPurple, finalColor],
            transition: { 
                y: { duration: 1.5, ease: "easeOut", delay: customDelay },
                opacity: { duration: 1.5, ease: "easeOut", delay: customDelay },
                color: { 
                    duration: 2.5, 
                    ease: "easeInOut", 
                    times: [0, 0.33, 0.66, 1],
                    delay: customDelay 
                }
            }
        })
    });

    return (
        <div className="flex flex-col items-start cursor-default">
            {/* Line 1 & 2 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        custom={0.5} // Delay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }} // Plays once
                        variants={getVariant(cPurple)}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
                
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={`l2-${i}`}
                        custom={0.7} // Delay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }} // Plays once
                        variants={getVariant(cPurple)}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
            {/* Line 3 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                {paradigmLine3.map((word, i) => (
                    <motion.span
                        key={`l3-${i}`}
                        custom={0.9} // Delay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }} // Plays once
                        variants={getVariant(cLightGreen)} // Ends in Green
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
  
  // UPDATED: Lowered threshold to 0.1 to ensure it triggers more reliably on desktop
  const isInView = useInView(containerRef, { amount: 0.1 });

  // Start as null for blank state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0); 
  const [layoutShift, setLayoutShift] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);

  // Timer Ref to manage cleanup
  const sequenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Icon Controls
  const iconControls = useAnimation();

  // Unified Start Sequence Function
  // Resets everything, starts video immediately, waits 3.0s (UPDATED), starts text
  const startSequence = () => {
    // 1. Clear any pending timers
    if (sequenceTimer.current) clearTimeout(sequenceTimer.current);

    // 2. Reset Text & Icon State
    setCurrentSentenceIndex(null);
    setLayoutShift(false);
    setLogoVisible(false);
    iconControls.set({ x: 200, rotate: -360, opacity: 0 });

    // 3. Restart Video Immediately (No Delay)
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => console.log("Video play error:", e));
    }

    // 4. Schedule Text Start (3.0s delay as requested)
    sequenceTimer.current = setTimeout(() => {
        setCurrentSentenceIndex(0);
    }, 3000);
  };

  // Handle Video Loop (End of video triggers replay)
  const handleVideoLoop = () => {
      startSequence();
  };
  
  // SYNC LOGO TO VIDEO TIME
  // Trigger exactly at 30.0s mark as requested
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const time = e.currentTarget.currentTime;
      // UPDATED: Changed from 4.0 to 30.0
      if (time >= 30.0 && !logoVisible) {
          setLogoVisible(true);
          
          // Trigger Logo Animation
          iconControls.start({
              x: 0,
              rotate: 0, // End rotation
              opacity: 1,
              transition: { 
                  type: "spring",
                  stiffness: 30, 
                  damping: 20,   
                  duration: 3.0, 
                  bounce: 0
              }
          });

          // Trigger Layout Shift (Bento Expand) shortly after logo starts moving
          setTimeout(() => {
              setLayoutShift(true);
          }, 800);
      }
  };

  // Handle Scroll Visibility (Scroll back up triggers replay)
  // This also handles the initial mount because isInView becomes true on load
  useEffect(() => {
      if (isInView) {
          startSequence();
      } else {
          // Clean up if we scroll away
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
          setCurrentSentenceIndex(null);
          setLayoutShift(false);
          setLogoVisible(false);
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
      }

      return () => {
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
      };
  }, [isInView]); // Removed other dependencies to rely purely on visibility toggle
  
  // Effect to cycle through sentences (Once started)
  useEffect(() => {
    // If not started, or at end, stop automatic cycling
    if (currentSentenceIndex === null) return;
    if (currentSentenceIndex >= sentences.length - 1) return;

    // Cycle duration to allow slower word population (8000ms = 33% slower than 6000)
    const baseDuration = 8000;
    
    // UPDATED: Logic for durations
    let cycleDuration = baseDuration;
    
    if (currentSentenceIndex === 0) {
        // UPDATED: Doubled the pause (approx 18s total) as requested
        cycleDuration = baseDuration * 2.25; 
    } else if (currentSentenceIndex === 1) {
        // UPDATED: Reduced multiplier from 2.0 to 1.5. 
        // 16s was likely too long and perceived as "not running". 12s is still a long pause but safer.
        cycleDuration = baseDuration * 1.5; 
    }

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
                       // UPDATED: Slower entry duration (0.9s was 0.7s) to slow down by ~25%
                       transition: { duration: 0.9, ease: "easeOut" } 
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
        // UPDATED: pt-24 on mobile (was pt-32) to reduce padding by ~20%. md:pt-24 remains.
        className="relative w-full bg-white text-zinc-900 pt-24 md:pt-24 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4">
        
        {/* TOP SECTION */}
        {/* UPDATED: Changed grid layout to [55fr_45fr] for desktop to make video wider */}
        <div className="flex flex-col lg:grid lg:grid-cols-[55fr_45fr] gap-4 h-auto md:h-[450px] w-full">
            
            {/* 1. TEXT ANIMATION AREA (White Bento) */}
            {/* UPDATED: Changed order to order-2 (Bottom on Mobile, Right on Desktop) */}
            <motion.div 
                layout
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    /* UPDATED: Mobile Logic 
                       - Reduced padding from p-3 to p-1.5 (Another 50% reduction).
                       - Reduced min-height from 220px to 180px to remove excess whitespace.
                       
                       Desktop Logic (md:):
                       - Retains original behavior but relies on layoutShift for desktop expansion if needed, 
                         though simplified to standard layout.
                    */
                    min-h-[180px] p-1.5 justify-center
                    md:min-h-[300px] md:h-full md:justify-end md:px-12 md:pt-12 md:pb-12
                    w-full flex flex-col items-start order-2 bg-white rounded-3xl 
                    shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-zinc-200 relative overflow-hidden group
                `}
            >
                 {/* Logo Animation - UPDATED: Hidden on Mobile */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    className="hidden md:block absolute md:top-14 md:right-20 md:left-auto md:mx-0 z-20"
                 >
                    <motion.img 
                        whileHover={{ rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        // UPDATED: Desktop Size increased 10% (h-40 w-40 = 160px)
                        className="md:h-40 md:w-40 object-contain cursor-pointer"
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
                                      // UPDATED: Slower stagger (0.7s was 0.55s) to slow down by ~25%
                                      transition: { staggerChildren: 0.7 } 
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
            {/* UPDATED: Changed order to order-1 (Top on Mobile, Left on Desktop) */}
            {/* UPDATED: REMOVED DELAY so video plays instantly */}
            {/* UPDATED: Changed mobile height from aspect-[1.55/1] to aspect-[1.4/1] (Taller by ~10%) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }} // Fast fade-in, no delay
                className="aspect-[1.4/1] h-auto md:aspect-auto md:h-full w-full rounded-3xl overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 bg-black order-1 group"
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    // UPDATED: Removed loop to allow onEnded trigger for sync
                    loop={false} 
                    muted 
                    playsInline 
                    onEnded={handleVideoLoop}
                    onTimeUpdate={handleVideoTimeUpdate}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                >
                     <source src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MICRON%20HOUSE_NEW.mp4" type="video/mp4" />
                </video>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        {/* UPDATED: Changed to whileInView for scroll activation on desktop */}
        <motion.div 
            ref={bottomSectionRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
                 {/* UPDATED: Reverted to standard viewport triggering for guaranteed visibility */}
                 <div className="md:hidden w-full flex-grow pt-4 pb-12 flex items-center justify-center relative z-20">
                      <motion.div
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.1 }}
                         variants={{
                             // UPDATED: Added opacity: 1 to ensure visibility when triggered
                             visible: { 
                                opacity: 1, 
                                transition: { staggerChildren: 0.40, delayChildren: 0.1 } 
                             }, 
                             hidden: { opacity: 0 }
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
                                        // UPDATED: Slower fade duration 1.0s (was 0.5s)
                                        visible: { opacity: 1, transition: { duration: 1.0, ease: "easeInOut" } }
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
                        // UPDATED: Aggressive viewport settings to ensure scroll trigger. 
                        // margin-bottom of -250px forces element to be well within view before triggering.
                        viewport={{ once: true, amount: 0.5, margin: "0px 0px -250px 0px" }}
                        variants={{
                            // UPDATED: Reduced delayChildren slightly since we rely on scroll trigger
                            visible: { transition: { staggerChildren: 0.40, delayChildren: 0.2 } },
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
                                // UPDATED: Slower fade duration 1.0s (was 0.5s)
                                visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
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
}
