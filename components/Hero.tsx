
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // --- CYCLING TEXT STATE ---
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  // State to control alignment: starts at top ('start'), slides to bottom ('end')
  const [alignment, setAlignment] = useState<'start' | 'end'>('start');
  
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

  // 2. Animation Logic: Play once, then stop.
  useEffect(() => {
    if (isFinished) {
        // After finishing the last sentence, start slide down almost immediately (500ms)
        const timer = setTimeout(() => {
            setAlignment('end');
        }, 500); 
        return () => clearTimeout(timer);
    }

    // Interval increased to 8000ms for even slower pacing
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prev) => {
        if (prev === sentences.length - 1) {
            clearInterval(interval);
            setIsFinished(true); // Stop at the last index
            return prev;
        }
        return prev + 1;
      });
    }, 8000); 

    return () => clearInterval(interval);
  }, [isFinished]);

  // Restart animation on hover if finished
  const handleReplay = () => {
     if (isFinished) {
         setAlignment('start'); // Reset to top immediately
         setCurrentSentenceIndex(0);
         setIsFinished(false);
     }
  };

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
        className="relative w-full bg-white text-zinc-900 pt-20 pb-8 md:pt-28 md:pb-20 flex flex-col justify-center min-h-[90vh]"
    >
      <div className="container mx-auto px-4 md:px-12 h-full flex flex-col gap-6 md:gap-8">
        
        {/* MAIN CONTENT AREA: SPLIT SCREEN */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 h-[75vh] lg:h-[60vh] min-h-[600px] lg:min-h-[500px]">
            
            {/* 1. TEXT ANIMATION AREA */}
            <div 
                className="h-[40%] lg:h-full w-full flex flex-col order-1 group/text cursor-default pb-2 lg:pb-0 relative pl-8 md:pl-12"
                onMouseEnter={handleReplay}
            >
                 {/* Layout container that handles the slide from top (start) to bottom (end) */}
                 <motion.div 
                    className={`flex flex-col h-full w-full ${alignment === 'start' ? 'justify-start pt-4 lg:pt-8' : 'justify-end'}`}
                    layout
                    // CHANGED: Duration increased to 10s
                    transition={{ duration: 10.0, ease: [0.25, 0.1, 0.25, 1] }} 
                 >
                     <AnimatePresence mode="wait">
                       <motion.div 
                          key={currentSentenceIndex} 
                          // Apply layout='position' to inner content to smooth the flow
                          layout="position"
                          className="flex flex-col gap-y-1 md:gap-y-2 items-start w-full"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={{
                              hidden: { opacity: 1 },
                              visible: { 
                                  opacity: 1,
                                  // Even slower stagger for readability
                                  transition: { staggerChildren: 0.8 } 
                              },
                              exit: { opacity: 0, transition: { duration: 0.5 } }
                          }}
                       >
                         {/* LINE 1 */}
                         <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                              {sentences[currentSentenceIndex].line1.map((word, i) => (
                                  <motion.span
                                      key={`l1-${i}`}
                                      variants={{
                                          hidden: { x: -20, opacity: 0 },
                                          visible: { 
                                              x: 0, 
                                              opacity: 1, 
                                              transition: { duration: 1.5, ease: "easeOut" } 
                                          }
                                      }}
                                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] ${getWordClass(word, sentences[currentSentenceIndex])}`}
                                  >
                                      {word}
                                  </motion.span>
                              ))}
                         </div>

                         {/* LINE 2 */}
                         <div className="flex flex-wrap gap-x-2 md:gap-x-4">
                              {sentences[currentSentenceIndex].line2.map((word, i) => (
                                  <motion.span
                                      key={`l2-${i}`}
                                      variants={{
                                          hidden: { x: -20, opacity: 0 },
                                          visible: { 
                                              x: 0, 
                                              opacity: 1, 
                                              transition: { duration: 1.5, ease: "easeOut" } 
                                          }
                                      }}
                                      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] ${getWordClass(word, sentences[currentSentenceIndex])}`}
                                  >
                                      {word}
                                  </motion.span>
                              ))}
                         </div>

                       </motion.div>
                     </AnimatePresence>
                 </motion.div>
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
        {/* CHANGED: Now a fully styled Bento Box with 3D shadow and hover lift */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-zinc-100 relative overflow-hidden flex flex-col md:flex-row h-auto md:h-[400px] mt-4 group hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500"
        >
            {/* Top Light Highlight for 3D effect */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100 z-20" />

            {/* Text Side (Left) */}
            <div className="p-8 md:p-12 flex flex-col justify-center md:w-1/2 z-10 relative bg-white">
                 
                 {/* Interactive Title Component */}
                 <div className="mb-8 md:mb-10">
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
            {/* CHANGED: Not full bleed anymore. Added padding and contained border radius. */}
            <div className="relative md:w-1/2 min-h-[300px] md:min-h-0 bg-zinc-50 p-4 md:p-6">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-zinc-200 relative">
                     <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                        className="absolute inset-0 w-full h-full grayscale opacity-60 hover:opacity-100 transition-opacity duration-700 mix-blend-multiply"
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
// CHANGED: Logic updated to independent interaction with slow color evolution.
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

// Individual Interactive Word Component
const InteractiveWord: React.FC<{ word: string }> = ({ word }) => {
    // State: false = Original (Eggplant), true = Changed (Dark Sequence)
    const [isChanged, setIsChanged] = useState(false);

    // Toggle state on interaction
    const handleInteraction = () => {
        setIsChanged(prev => !prev);
    };

    return (
        <motion.span
            onMouseEnter={handleInteraction}
            animate={{
                // Color Transition Logic:
                // If !isChanged: Stay Eggplant (#2c0f38).
                // If isChanged: Transition Green -> Dark Green -> Dark Eggplant.
                color: isChanged 
                    ? ["#2c0f38", "#008f25", "#0f5916", "#1a0921"] // Sequence
                    : "#2c0f38", // Reset
            }}
            transition={{ 
                duration: isChanged ? 3.0 : 0.5, // Slow transition forward, fast reset
                times: isChanged ? [0, 0.3, 0.7, 1] : [1], // Keyframe timing
                ease: "easeInOut"
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] cursor-pointer"
        >
            {word}
        </motion.span>
    );
};
