
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BentoCard } from './BentoCard';

interface SectionIntroProps {
  onAnimationComplete?: () => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // --- TIMING CONFIGURATION ---
  
  // 1. HERO finishes roughly at 1.0s. 
  // 2. GREEN CARD appears after Hero.
  const GREEN_CARD_DELAY = 1.1; 
  
  // 3. TEXT Animation starts after Green Card is mostly visible
  const TEXT_START_BASE = GREEN_CARD_DELAY + 0.5; 

  // CHANGED: Slowed down animation as requested
  const WORD_DELAY = 0.3; // Slower word reveal
  const SENTENCE_GAP = 0.6; // Double the word delay

  // Text Data Structure
  const sentences = [
    { 
      words: ["Without", "memory,", "there's", "no", "meaning."], 
      align: "text-left items-start",
      highlightPrimary: "memory,",
      highlightSecondary: "meaning."
    },
    { 
      words: ["Without", "vision,", "there's", "no", "velocity."], 
      align: "text-center items-center justify-center",
      highlightPrimary: "vision,",
      highlightSecondary: "velocity."
    },
    { 
      words: ["Without", "place,", "there's", "no", "perspective."], 
      align: "text-right items-end justify-end",
      highlightPrimary: "place,",
      highlightSecondary: "perspective."
    }
  ];

  // Calculate total duration of the green box text animation to coordinate the next section
  let currentWordDelayTracker = 0;
  const wordAnimations = sentences.map((sentence) => {
    const wordDelays = sentence.words.map((_, idx) => {
        const delay = currentWordDelayTracker;
        currentWordDelayTracker += WORD_DELAY;
        return delay;
    });
    // Add gap after sentence
    currentWordDelayTracker += SENTENCE_GAP; 
    return wordDelays;
  });

  // 4. PARADIGM SHIFTS starts after all text + pause
  const PARADIGM_START_DELAY = TEXT_START_BASE + currentWordDelayTracker + 0.5; // +0.5s pause
  const ADDRESS_START_TIME = PARADIGM_START_DELAY + 1.5; // Allow time for Paradigm to finish
  const MAP_START_TIME = ADDRESS_START_TIME + 1.0;

  // Split Paradigm text
  const paradigmLine1 = ["THE", "PARADIGM"];
  const paradigmLine2 = ["SHIFTS."];
  const paradigmWords = [...paradigmLine1, ...paradigmLine2];
  // Animate Paradigm word by word
  const paradigmWordDelays = paradigmWords.map((_, i) => PARADIGM_START_DELAY + (i * 0.2));

  const addressLine1 = "Micron House";
  const addressLine2 = "1020 East Warm Springs Ave";
  const addressLine3 = "Boise, Idaho 83712";

  return (
    // Reduced bottom padding: pb-6 md:pb-12, px-4 mobile
    <section ref={containerRef} className="container mx-auto px-4 md:px-12 pt-0 pb-6 md:pb-12 bg-zinc-50 text-zinc-900">
      <div className="flex flex-col gap-4"> 
        
        {/* 1. Top Bento: Green, Animated Text */}
        <BentoCard 
            className="min-h-[280px] md:min-h-[340px] justify-center shadow-2xl relative overflow-hidden group flex flex-col"
            gradient="bg-micron-green"
            textColor="text-white"
            borderColor="border-white/20"
            hoverEffect={true}
            delay={GREEN_CARD_DELAY} 
        >
            {/* UPDATED: Increased gap-2 to gap-6 for mobile to ensure padding below each sentence */}
            <div className="w-full h-full mx-auto py-4 md:py-6 px-2 md:px-8 relative z-10 flex flex-col justify-center gap-6 md:gap-4">
                {sentences.map((sentence, sIdx) => (
                    <div key={sIdx} className={`flex flex-wrap w-full ${sentence.align}`}>
                        {sentence.words.map((word, wIdx) => {
                            // Determine styling based on specific keywords
                            const isPrimary = word === sentence.highlightPrimary;
                            const isSecondary = word === sentence.highlightSecondary;
                            
                            let className = "mr-2 md:mr-3 inline-block text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-light italic text-white/70";
                            if (isPrimary) {
                                className = "mr-2 md:mr-3 inline-block text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-black italic text-white hover:text-micron-eggplant transition-colors duration-300";
                            } else if (isSecondary) {
                                className = "mr-0 md:mr-0 inline-block text-2xl md:text-5xl lg:text-6xl leading-tight tracking-tight font-normal italic text-micron-eggplant hover:text-white transition-colors duration-300";
                            }

                            return (
                                <motion.span
                                    key={`${sIdx}-${wIdx}`}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                                    transition={{ 
                                        duration: 0.8, // Slower fade in
                                        ease: "easeOut",
                                        delay: TEXT_START_BASE + wordAnimations[sIdx][wIdx] 
                                    }}
                                    className={className}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </div>
                ))}
            </div>
        </BentoCard>

        {/* 2. Bottom Grid: Paradigm Text -> Address -> Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-0">
            
            {/* Left: Text and Address */}
            <div className="flex flex-col justify-center py-2 pl-2">
                {/* 
                    UPDATED HEADER: 
                    1. Text changed to "THE PARADIGM SHIFTS."
                    2. Forced Layout: Line 1 "THE PARADIGM", Line 2 "SHIFTS."
                */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.9] mb-8 cursor-default flex flex-col items-start">
                    {/* Line 1 */}
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6">
                        {paradigmLine1.map((word, i) => (
                            <motion.span
                                key={`l1-${i}`}
                                initial={{ opacity: 0, y: 15 }} 
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2, 
                                    color: '#008f25', // micron-green
                                    transition: { duration: 0.2 }
                                }}
                                transition={{ 
                                    duration: 1.2, 
                                    ease: [0.16, 1, 0.3, 1], 
                                    delay: paradigmWordDelays[i] 
                                }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                    {/* Line 2 */}
                    <div className="flex flex-wrap gap-x-4 md:gap-x-6">
                        {paradigmLine2.map((word, i) => (
                            <motion.span
                                key={`l2-${i}`}
                                initial={{ opacity: 0, y: 15 }} 
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    y: -2, 
                                    color: '#008f25', // micron-green
                                    transition: { duration: 0.2 }
                                }}
                                transition={{ 
                                    duration: 1.2, 
                                    ease: [0.16, 1, 0.3, 1], 
                                    delay: paradigmWordDelays[paradigmLine1.length + i] 
                                }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                </h2>
                
                {/* ADDRESS BLOCK */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: ADDRESS_START_TIME, duration: 0.8 }}
                    className="flex gap-5 border-l-4 border-micron-green pl-6"
                >
                    <div className="flex flex-col justify-center">
                        <h3 className="text-micron-green font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1 flex flex-wrap gap-x-2">
                             {addressLine1.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.1 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </h3>
                        <p className="text-zinc-900 font-bold text-base md:text-lg tracking-widest uppercase leading-snug flex flex-wrap gap-x-2">
                             {addressLine2.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.2 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </p>
                        <p className="text-zinc-400 text-sm md:text-base tracking-widest uppercase flex flex-wrap gap-x-2">
                             {addressLine3.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: ADDRESS_START_TIME + 0.3 + (i * 0.05) }}
                                >
                                    {word}
                                </motion.span>
                             ))}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Right: Map Bento Box */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                    duration: 1.0, 
                    delay: MAP_START_TIME
                }}
                className="h-full min-h-[300px]"
            >
                <BentoCard 
                    className="p-0 overflow-hidden relative group shadow-xl h-full"
                    gradient="bg-white"
                    borderColor="border-zinc-200"
                    hoverEffect={true}
                    delay={0}
                >
                     <div className="absolute inset-0 w-full h-full bg-zinc-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.234!2d-116.1898!3d43.6088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54aef8d1b0b3b8e7%3A0x0!2s1020%20E%20Warm%20Springs%20Ave%2C%20Boise%2C%20ID%2083712!5e0!3m2!1sen!2sus!4v1706000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'grayscale(100%) contrast(100%)' }}
                            allowFullScreen={false}
                            loading="lazy"
                            title="Map"
                            className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                        />
                     </div>
                </BentoCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};