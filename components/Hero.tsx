import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useAnimation, Variants } from 'framer-motion';

// Defined outside to prevent re-creation on render
const sentences = [
    {
        words: ["WITHOUT", "VISION,", "THERE'S", "NO", "VELOCITY."],
        color: "text-[#878d9f]",
        highlightColor: "text-[#5d6270]",
        hoverColor: "hover:text-black", 
        highlights: ["VISION,", "VELOCITY."],
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        layout: "default"
    },
    {
        words: ["WITHOUT", "MEMORY,", "THERE'S", "NO", "MEANING."],
        color: "text-[#878d9f]",
        highlightColor: "text-micron-eggplant",
        hoverColor: "hover:text-micron-eggplant/60", 
        highlights: ["MEMORY,", "MEANING."],
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-7xl",
        layout: "default"
    },
    {
        words: ["WITHOUT", "PLACE,", "THERE'S", "NO", "PERSPECTIVE."], 
        color: "text-[#878d9f]",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        textSize: "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]",
        layout: "default",
        lines: [["WITHOUT", "PLACE,"], ["THERE'S", "NO"], ["PERSPECTIVE."]],
    },
];

const InteractiveParadigmTitle: React.FC = () => {
    const paradigmLine1 = ["THE"];
    const paradigmLine2 = ["PARADIGM"];
    const paradigmLine3 = ["SHIFTS."];

    // Colors
    const cGreen = "#008f25";
    const cDarkGreen = "#14532d"; 
    const cEggplant = "#2c0f38"; 
    const cWhite = "#ffffff";

    // "THE PARADIGM" — Eggplant base, slowly cycles eggplant→dark green→green→eggplant
    const standardVariant: Variants = {
        hidden: { y: 20, opacity: 0, color: cEggplant },
        visible: (i: number) => ({
            y: 0, opacity: 1, color: cEggplant,
            transition: { 
                y: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                opacity: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
            }
        }),
        hover: {
            color: [cEggplant, cDarkGreen, cGreen, cDarkGreen, cEggplant],
            transition: { duration: 8.0, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity }
        }
    };

    // "SHIFTS." — Starts eggplant, settles on white. Hover: white→green→dark green→green→white
    const shiftsVariant: Variants = {
        hidden: { y: 20, opacity: 0, color: cEggplant },
        visible: (i: number) => ({
            y: 0, opacity: 1, 
            color: [cEggplant, cDarkGreen, cWhite],
            transition: { 
                y: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                opacity: { duration: 1.6, ease: "easeOut", delay: 0.3 + (i * 0.15) },
                color: { duration: 6.0, ease: "easeInOut", delay: 1.5, times: [0, 0.5, 1] }
            }
        }),
        hover: {
            color: [cWhite, cGreen, cDarkGreen, cGreen, cWhite],
            transition: { duration: 8.0, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity }
        }
    };

    return (
        <div className="flex flex-col items-start cursor-default">
            {/* Line 1 & 2 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={`l1-${i}`}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
                        viewport={{ once: true }} 
                        variants={standardVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
                    >
                        {word}
                    </motion.span>
                ))}
                
                {paradigmLine2.map((word, i) => (
                    <motion.span
                        key={`l2-${i}`}
                        custom={i + paradigmLine1.length}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
                        viewport={{ once: true }} 
                        variants={standardVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
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
                        custom={i + paradigmLine1.length + paradigmLine2.length}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover" // Independent interaction
                        viewport={{ once: true }} 
                        variants={shiftsVariant}
                        className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] inline-block cursor-pointer"
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
  
  // UPDATED: Lowered threshold to 0.1 to ensure it triggers more reliably on desktop
  const isInView = useInView(containerRef, { amount: 0.1 });

  // Start as null for blank state
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [key, setKey] = useState(0); 
  const [layoutShift, setLayoutShift] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  
  // New States for Quote Animation Control
  const [hasScrolled, setHasScrolled] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);

  // Timer Ref to manage cleanup
  const sequenceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Icon Controls
  const iconControls = useAnimation();

  // Scroll Listener
  useEffect(() => {
    const onScroll = () => {
        if (window.scrollY > 50) { // Slight threshold to avoid jitter
            setHasScrolled(true);
        }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track if video has actually started playing
  const videoStarted = useRef(false);

  // Unified Start Sequence Function
  // Resets everything, starts video immediately, waits for video to play before starting text
  const startSequence = () => {
    // 1. Clear any pending timers
    if (sequenceTimer.current) clearTimeout(sequenceTimer.current);

    // 2. Reset Text & Icon State
    setCurrentSentenceIndex(null);
    setLayoutShift(false);
    setLogoVisible(false);
    iconControls.set({ x: 200, rotate: -360, opacity: 0 });

    // 3. Restart Video Immediately (No Delay)
    videoStarted.current = false;
    if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((e) => {
            console.log("Video play error:", e);
            // If autoplay blocked, start timers anyway
            startSentenceTimers();
        });
    }
  };

  // Start sentence timers - called when video actually plays or as fallback
  const startSentenceTimers = () => {
    if (videoStarted.current) return; // Prevent double-start
    videoStarted.current = true;

    // 4. Sentence timeline (real time at 0.45x playback)
    sentenceTimers.current.forEach(t => clearTimeout(t));
    sentenceTimers.current = [];
    
    // Sentence 1 at 3s (rockets)
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(0), 4000));
    // Sentence 1 out at 14s
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(null), 19000));
    // Sentence 2 at 22s (Micron)
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(1), 23000));
    // Sentence 2 out at 32s
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(null), 35000));
    // Sentence 3 at 37s (Capitol → House)
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(2), 38000));
    // Sentence 3 out at 50s — fades to white
    sentenceTimers.current.push(setTimeout(() => setCurrentSentenceIndex(null), 61000));
    // Logo rolls in at 63s (1s after fade to white at 62s)
    sentenceTimers.current.push(setTimeout(() => {
        setLogoVisible(true);
        iconControls.start({
            x: 0, rotate: 0, opacity: 1,
            transition: { type: "spring", stiffness: 15, damping: 18, duration: 5.1, bounce: 0 }
        });
        setTimeout(() => setLayoutShift(true), 1000);
    }, 63000));
    // Blue bento box at 68s
    sentenceTimers.current.push(setTimeout(() => setVideoCompleted(true), 68000));
  };

  // Handle Video End — freeze on last frame
  const handleVideoEnd = () => {
      // videoCompleted already set at 32.5s mark
      // Video naturally pauses on last frame since loop={false}
  };
  
  // SYNC ALL ANIMATIONS TO VIDEO TIME
  // Video is 34.8s at 1x, plays at 0.6x = ~58s real time
  // Scene map (real time at 0.6x):
  //   0-13s:  Space → Starbase → Rockets  
  //   13-23s: Mountains → Micron facility
  //   23-30s: Capitol → transition
  //   30-40s: Warm Springs Ave → House approach  
  //   40-57s: House close-up
  //
  // Animation timeline (real time):
  //   5s:  Sentence 1 starts (rockets)
  //   22s: Sentence 1 fades out
  //   24s: Sentence 2 starts (Micron)
  //   38s: Sentence 2 fades out  
  //   40s: Sentence 3 starts (Capitol→House)
  //   50s: Logo slides in
  //   52s: Blue bento appears
  const sentenceTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  
  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const time = e.currentTarget.currentTime;
      // Logo handled by timer now
      // Blue bento at video time 31s  
      if (time >= 31 && !videoCompleted) {
          setVideoCompleted(true);
      }
  };

  // Handle Scroll Visibility (Scroll back up triggers replay)
  // This also handles the initial mount because isInView becomes true on load
  useEffect(() => {
      if (isInView) {
          startSequence();
          // Fallback: if video doesn't trigger videoCompleted (e.g. autoplay blocked),
          // show the blue bento box after 45 seconds anyway
          const fallback = setTimeout(() => {
              if (!videoCompleted) setVideoCompleted(true);
          }, 35000);
          return () => clearTimeout(fallback);
      } else {
          // Clean up if we scroll away
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
          sentenceTimers.current.forEach(t => clearTimeout(t));
          setCurrentSentenceIndex(null);
          setLayoutShift(false);
          setLogoVisible(false);
          setVideoCompleted(false);
          iconControls.set({ x: 200, rotate: -360, opacity: 0 });
      }

      return () => {
          if (sequenceTimer.current) clearTimeout(sequenceTimer.current);
      };
  }, [isInView]);
  
  // Sentence cycling is now fully driven by setTimeout in startSequence
  // Clean up all timers on unmount or view change
  useEffect(() => {
    return () => {
        sentenceTimers.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // Video Speed — 0.45x for slower cinematic feel
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.45;
    }
    // Force play on first touch for mobile browsers
    const forcePlay = () => {
        if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
        }
        document.removeEventListener('touchstart', forcePlay);
        document.removeEventListener('click', forcePlay);
    };
    document.addEventListener('touchstart', forcePlay, { once: true });
    document.addEventListener('click', forcePlay, { once: true });
    return () => {
        document.removeEventListener('touchstart', forcePlay);
        document.removeEventListener('click', forcePlay);
    };
  }, []);

  const renderWord = (word: string, i: number, currentSet: any) => {
      const isHighlight = currentSet.highlights.includes(word);
      const colorClass = isHighlight ? currentSet.highlightColor : currentSet.color;
      const hoverClass = isHighlight ? currentSet.hoverColor : "";
      const sizeClass = currentSet.wordSizeOverrides?.[word] || currentSet.textSize;
      
      let layoutClass = "";
      if (currentSet.layout === "vertical_all") {
          layoutClass = "w-full basis-full mb-1";
      } else if (currentSet.layout === "mixed" && currentSet.layoutOverrides && currentSet.layoutOverrides[i]) {
          layoutClass = currentSet.layoutOverrides[i];
      }

      const fontWeight = currentSet.wordWeightOverrides?.[word] || "font-black";

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { opacity: 0, y: 8 },
                   visible: { 
                       opacity: 1, y: 0,
                       transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] } 
                   },
                   exit: {
                       opacity: 0, y: -4,
                       transition: { duration: 0.5, ease: "easeIn" }
                   }
               }}
               className={`${sizeClass} ${layoutClass} ${fontWeight} uppercase tracking-tighter leading-[0.9] cursor-default transition-colors duration-300 ${colorClass} ${hoverClass}`}
           >
               {word}
           </motion.span>
      );
  }

  // UPDATED: Single Paragraph Quote with hyphen and lowercase 'd'
  const quoteText = "A convergence of historic stewardship and autonomous future. The first corporate residence - designed for the era of artificial intelligence.";
  const quoteWords = quoteText.split(" ");

  // Shared container variants for the word-by-word animation
  // RESTORED: To previous version (slower stagger, no blur)
  const quoteContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            // RESTORED: 0.6s stagger
            staggerChildren: 0.6, 
            delayChildren: 0.2 
        } 
    }
  };

  const quoteWordVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 10,
        // RESTORED: No blur
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        // RESTORED: No blur, 0.8s duration
        transition: { 
            duration: 0.8, 
            ease: "easeOut" 
        } 
    }
  };

  // Quote shows only after the hero video sequence finishes
  const shouldShowQuote = videoCompleted;

  return (
    <section 
        ref={containerRef}
        // UPDATED: pt-24 on mobile (was pt-32) to reduce padding by ~20%. md:pt-24 remains.
        className="relative w-full bg-white text-zinc-900 pt-20 md:pt-40 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4 xl:gap-16">
        
        {/* TOP SECTION */}
        {/* UPDATED: Changed grid layout to [55fr_45fr] for desktop to make video wider */}
        <div className="flex flex-col xl:grid xl:grid-cols-[55fr_45fr] gap-4 h-auto xl:h-[500px] w-full">
            
            {/* 1. TEXT ANIMATION AREA (White Bento) */}
            {/* UPDATED: Changed order to order-2 (Bottom on Mobile, Right on Desktop) */}
            <motion.div 
                layout
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className={`
                    /* Text bento matches video height */
                    min-h-[180px] p-6 justify-end pb-8
                    xl:min-h-[300px] xl:h-full xl:justify-end xl:p-12
                    w-full flex flex-col items-start order-2 bg-white rounded-3xl 
                    shadow-[0_20px_60px_-10px_rgba(0,0,0,0.3)] border border-zinc-200 relative overflow-hidden group
                `}
            >
                 {/* Logo Animation - UPDATED: Hidden on Mobile */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    className="flex absolute inset-0 items-center justify-center z-20 pointer-events-none"
                 >
                    <motion.img 
                        whileHover={{ rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        // UPDATED: Logo reduced 20%
                        className="h-[160px] w-[160px] md:h-[200px] md:w-[200px] xl:h-[320px] xl:w-[320px] object-contain cursor-pointer"
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
                                      transition: { staggerChildren: 1.0 } 
                                  },
                                  exit: { 
                                      opacity: 1, 
                                      transition: { staggerChildren: 0.15, staggerDirection: -1, duration: 1.5 } 
                                  }
                              }}
                           >
                             {(() => {
                                 const currentSet = sentences[currentSentenceIndex];
                                 if (currentSet.lines) {
                                     // Forced line layout: render each line as a block
                                     let wordIndex = 0;
                                     return currentSet.lines.map((line: string[], lineIdx: number) => (
                                         <div key={`line-${lineIdx}`} className="w-full flex flex-wrap gap-x-4 md:gap-x-6">
                                             {line.map((word: string) => {
                                                 const el = renderWord(word, wordIndex, currentSet);
                                                 wordIndex++;
                                                 return el;
                                             })}
                                         </div>
                                     ));
                                 }
                                 return currentSet.words.map((word: string, i: number) => renderWord(word, i, currentSet));
                             })()}
                           </motion.div>
                       )}
                     </AnimatePresence>
                 </motion.div>
            </motion.div>

            {/* 2. VIDEO AREA */}
            {/* UPDATED: Changed order to order-1 (Top on Mobile, Left on Desktop) */}
            {/* UPDATED: REMOVED DELAY so video plays instantly */}
            {/* UPDATED: Changed mobile height from aspect-[1.4/1] to aspect-[1.4/1] (Taller by ~10%) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="aspect-[1.4/1] h-auto xl:aspect-auto xl:h-full w-full rounded-3xl overflow-hidden relative shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-500 bg-black order-1 group"
            >
                <video 
                    ref={videoRef}
                    autoPlay 
                    loop={false} 
                    muted 
                    playsInline
                    preload="auto"
                    onLoadedData={() => {
                        if (videoRef.current) {
                            videoRef.current.play().catch(() => {});
                        }
                    }}
                    onPlaying={() => startSentenceTimers()}
                    onEnded={handleVideoEnd}
                    onTimeUpdate={handleVideoTimeUpdate}
                    className="absolute inset-0 w-full h-full object-cover opacity-100"
                >
                     <source src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/MH_VIDEOS/micron-house-hero-compressed.mp4" type="video/mp4" />
                </video>
            </motion.div>

        </div>

        {/* BOTTOM SECTION: PARADIGM & QUOTE */}
        {/* Appears on scroll like all other sections */}
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row md:items-stretch min-h-[400px] md:min-h-[360px] p-8 md:p-8 gap-4 md:gap-8 group"
        >
            {/* LEFT: Title + Address Block (Flex-1) */}
            {/* UPDATED: Increased gap to gap-10 on mobile to double the pattern */}
            <div className="flex-shrink-0 flex flex-col justify-between items-start z-10 relative h-full md:w-auto gap-10 md:gap-12">
                 <div className="relative z-10 w-full">
                    <InteractiveParadigmTitle />
                 </div>
                 
                 {/* ADDRESS BLOCK */}
                 {/* UPDATED: Added h-fit to prevent line stretching, removed mt logic due to gap-10 */}
                 <div className="flex flex-col gap-0 border-l-4 border-micron-eggplant pl-3 relative z-10 mt-auto md:mt-auto h-fit">
                        <h3 className="text-white font-bold text-lg uppercase tracking-wider leading-tight">Micron House</h3>
                        <p className="text-micron-eggplant font-semibold text-sm md:text-base uppercase tracking-widest leading-tight whitespace-nowrap overflow-hidden text-ellipsis">1020 East Warm Springs Ave</p>
                        <p className="text-micron-eggplant/80 text-xs md:text-sm uppercase tracking-widest leading-tight">Boise, Idaho 83712</p>
                 </div>

                 {/* MOBILE QUOTE - IN FLOW */}
                 {/* UPDATED: Now uses word-by-word staggered animation on scroll */}
                 {/* UPDATED: Changed text to text-white (Bright White) and font-thin for reduced heaviness */}
                 <div className="md:hidden w-full flex-grow pt-4 pb-12 flex items-center justify-center relative z-20">
                      <motion.div
                         initial="hidden"
                         animate={shouldShowQuote ? "visible" : "hidden"} // UPDATED: Gated by scroll or video
                         variants={quoteContainerVariants}
                         className="font-micron text-xl text-center text-white font-extralight leading-relaxed -rotate-3 pb-4 will-change-transform" // Added pb-4 and will-change to fix clipping
                      >
                         {/* Joined into one paragraph block */}
                         <p className="inline">
                             {quoteWords.map((word, i) => (
                                <motion.span
                                    key={i}
                                    variants={quoteWordVariants}
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
                {/* UPDATED: Changed text to text-white (Bright White) and font-thin for reduced heaviness */}
                <motion.div
                        initial="hidden"
                        animate={shouldShowQuote ? "visible" : "hidden"} // UPDATED: Gated by scroll or video
                        variants={quoteContainerVariants}
                        className="font-micron text-xl md:text-2xl text-white font-extralight leading-relaxed text-left -rotate-6 max-w-lg w-full -translate-x-4 pb-4 will-change-transform" // Added pb-4 and will-change to fix clipping
                >
                     {/* Joined into one paragraph block */}
                     <p className="inline">
                        {quoteWords.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={quoteWordVariants}
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