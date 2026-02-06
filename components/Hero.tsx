
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
        // Sentence 3 - UPDATED: Grouped "THERE'S NO" and set layout to vertical_all for specific line breaking
        words: ["WITHOUT", "PLACE,", "THERE'S NO", "PERSPECTIVE."], 
        color: "text-zinc-400",
        highlightColor: "text-micron-green",
        hoverColor: "hover:text-green-900", 
        highlights: ["PLACE,", "PERSPECTIVE."],
        textSize: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl",
        layout: "vertical_all"
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
            {/* Line 1 & 2 */}
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 items-baseline">
                {paradigmLine1.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: 20, opacity: 0, color: '#008f25' }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        // UPDATED: Hover animation cycle with slow return
                        whileHover={cycleAnimation}
                        style={{ transition: "color 1.5s ease-out" }} // Slow return transition
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

  // Icon Controls
  const iconControls = useAnimation();

  // Scroll Listener to Restart Animation
  useEffect(() => {
      const handleScroll = () => {
          // If we scroll back to top (within 50px), restart the animation sequence
          if (window.scrollY < 50) {
              // Only trigger reset if we aren't already at start or running the first loop
              if (currentSentenceIndex !== 0 && currentSentenceIndex !== null) {
                   setKey(prev => prev + 1);
                   setCurrentSentenceIndex(0);
                   iconControls.set({ x: 200, rotate: -360, opacity: 0 });
              }
          }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSentenceIndex, iconControls]);


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

    // UPDATED: Increased cycle duration to allow slower word population (6000ms)
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
      // UPDATED: Trigger on the THIRD sentence (index 2) as requested ("WITHOUT PLACE...")
      if (currentSentenceIndex === 2) {
          // Delay to start AFTER the last sentence is populated
          // Sentence has 4 items. Stagger is 0.4s. 
          // Last word starts at 1.2s. Duration 0.5s. Ends at 1.7s.
          // Setting delay to 2.2s ensures it rolls in cleanly after text is done.
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
      } else if (currentSentenceIndex === 0) {
          // Only reset when we loop back to the start (or manually reset)
          // This keeps the icon visible during sentence 3
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

      return (
           <motion.span
               key={`${word}-${i}`}
               variants={{
                   hidden: { y: 30, opacity: 0 },
                   visible: { 
                       y: 0, 
                       opacity: 1, 
                       // UPDATED: Faster duration (0.5s) combined with slower stagger for distinct word pop
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

  return (
    <section 
        ref={containerRef}
        // UPDATED: Significantly reduced padding (pt-24 -> pt-20, md:pt-32 -> md:pt-24) to remove extra whitespace
        className="relative w-full bg-white text-zinc-900 pt-20 md:pt-24 pb-12 md:pb-16 flex flex-col justify-end"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-4">
        
        {/* TOP SECTION */}
        {/* UPDATED: Reduced height to md:h-[450px] to crop empty top space */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 h-auto md:h-[450px] w-full">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                // FLOATING 3D EFFECT
                className="min-h-[300px] md:h-full w-full flex flex-col justify-end items-start order-1 bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] px-6 pt-6 pb-12 md:px-12 md:pt-12 md:pb-12 relative overflow-hidden group"
            >
                 {/* Logo Animation */}
                 <motion.div 
                    initial={{ x: 200, rotate: -360, opacity: 0 }}
                    animate={iconControls}
                    // UPDATED: Adjusted position to top-12 for better fit in reduced height
                    className="absolute top-2 left-0 right-0 mx-auto w-fit md:top-12 md:right-20 md:left-auto md:mx-0 z-20"
                 >
                    {/* UPDATED: Added micro-interaction rotation on hover */}
                    <motion.img 
                        whileHover={{ rotate: 6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/micron-overlap-no-border.png"
                        alt="Micron Logo"
                        // UPDATED SIZE: Increased mobile size by 50% (h-24 -> h-36, w-24 -> w-36)
                        className="h-36 w-36 md:h-40 md:w-40 object-contain cursor-pointer"
                    />
                 </motion.div>
                 
                 {/* UPDATED MOBILE: Increased margin top to mt-36 to push text further down on mobile */}
                 <div className="w-full relative z-10 mt-36 md:mt-0">
                     <AnimatePresence mode="wait">
                       {currentSentenceIndex !== null && (
                           <motion.div 
                              key={`${currentSentenceIndex}-${key}`}
                              // UPDATED: Increased gap-y to gap-y-4 for better padding below text sentences
                              className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-4 w-full max-w-5xl"
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={{
                                  hidden: { opacity: 1 },
                                  visible: { 
                                      opacity: 1,
                                      // UPDATED: Slower stagger (0.4s) so words populate one at a time
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
                 </div>
            </div>

            {/* 2. VIDEO AREA */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* BOTTOM SECTION: PARADIGM & QUOTE - UPDATED */}
        <motion.div 
            ref={bottomSectionRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            // UPDATED: Single background color bg-micron-eggplant-light
            className="w-full bg-micron-eggplant-light rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/20 relative overflow-hidden flex flex-col md:flex-row min-h-[300px] mt-4 p-8 md:p-12 items-center gap-8 group"
        >
            {/* Left Side: Title + Address Block */}
            <div className="flex-1 flex flex-col gap-6 items-start z-10 relative">
                 <InteractiveParadigmTitle />
                 
                 {/* ADDRESS BLOCK */}
                 <div className="flex flex-col gap-1 border-l-4 border-micron-eggplant pl-4">
                        <h3 className="text-white font-bold text-xl uppercase tracking-wider">Micron House</h3>
                        {/* UPDATED: Reduced font size on mobile (text-sm) so it stays on one line */}
                        <p className="text-micron-eggplant font-bold text-sm md:text-lg uppercase tracking-widest whitespace-nowrap">1020 East Warm Springs Ave</p>
                        {/* UPDATED: Reduced font size on mobile (text-sm) to match line above and fit better */}
                        <p className="text-micron-eggplant/80 text-sm md:text-lg uppercase tracking-widest">Boise, Idaho 83712</p>
                 </div>
            </div>

            {/* Right Side: Map Card */}
            <div className="w-full md:w-[450px] aspect-[4/3] md:aspect-auto md:h-64 bg-zinc-100 rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white/20">
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
