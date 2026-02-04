
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { BentoCard } from './BentoCard';
import { Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // --- CYCLING TEXT STATE ---
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  
  const sentences = [
    { 
        words: ["WITHOUT", "MEMORY,", "THERE'S", "NO", "MEANING."],
        highlights: ["MEMORY,", "MEANING."]
    },
    { 
        words: ["WITHOUT", "VISION,", "THERE'S", "NO", "VELOCITY."],
        highlights: ["VISION,", "VELOCITY."]
    },
    { 
        words: ["WITHOUT", "PLACE,", "THERE'S", "NO", "PERSPECTIVE."],
        highlights: ["PLACE,", "PERSPECTIVE."]
    }
  ];

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setCurrentSentenceIndex((prev) => (prev + 1) % sentences.length);
    }, 6000); // Slow cycle to allow reading
    return () => clearInterval(interval);
  }, [isInView]);

  // --- STATIC TEXT CONFIG ---
  const paradigmLine1 = ["THE", "PARADIGM"];
  const paradigmLine2 = ["SHIFTS."];
  const paradigmWords = [...paradigmLine1, ...paradigmLine2];
  
  // Reverted to the smooth staggered delay
  const paradigmWordDelays = paradigmWords.map((_, i) => 0.2 + (i * 0.15));

  const addressLine1 = "Micron House";
  const addressLine2 = "1020 East Warm Springs Ave";
  const addressLine3 = "Boise, Idaho 83712";

  return (
    <section 
        ref={containerRef}
        className="relative w-full bg-white text-zinc-900 pt-28 pb-12 md:pt-32 md:pb-20 flex flex-col justify-center"
    >
      <div className="container mx-auto px-4 md:px-12 flex flex-col gap-8">
        
        {/* --- ROW 1: CYCLING TEXT & VIDEO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[450px]">
            
            {/* LEFT: Cycling Text Animation */}
            <div className="flex flex-col justify-center items-start relative min-h-[300px] lg:min-h-full pl-2">
                <AnimatePresence mode="wait">
                    <motion.div 
                        key={currentSentenceIndex}
                        className="w-full flex flex-wrap content-center gap-x-4 gap-y-2"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: { staggerChildren: 0.5 } // Slow stagger for one-by-one reveal
                            },
                            exit: { 
                                opacity: 0,
                                transition: { duration: 0.5 }
                            }
                        }}
                    >
                        {sentences[currentSentenceIndex].words.map((word, i) => {
                            const isHighlight = sentences[currentSentenceIndex].highlights.includes(word);
                            return (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, filter: "blur(10px)" },
                                        visible: { opacity: 1, filter: "blur(0px)" },
                                        exit: { opacity: 0, filter: "blur(10px)" }
                                    }}
                                    transition={{ duration: 1.0, ease: "easeOut" }} // Slow fade in
                                    whileHover={isHighlight ? { scale: 1.05, y: -2, color: '#008f25', transition: { duration: 0.2 } } : {}}
                                    className={`
                                        text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tighter leading-[0.9] cursor-default
                                        ${isHighlight ? 'text-zinc-900' : 'text-zinc-200'}
                                    `}
                                >
                                    {word}
                                </motion.span>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT: Video Bento Card */}
            <BentoCard
                gradient="bg-black"
                className="w-full h-full min-h-[350px] lg:min-h-[500px] overflow-hidden !p-0 shadow-2xl relative group"
                textColor="text-white"
                borderColor="border-white/10"
                delay={0.2}
                hoverEffect={true}
            >
                 <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                    poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                     <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500">
                        <Play className="text-white fill-white ml-1.5 opacity-80" size={32} />
                     </div>
                     <h3 className="mt-6 text-lg font-bold text-white uppercase tracking-[0.3em] opacity-80">Cosmic Zoo</h3>
                </div>
            </BentoCard>

        </div>


        {/* --- ROW 2: PARADIGM (Left) & MAP (Right) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-0">
            
            {/* Left: Text and Address */}
            <div className="flex flex-col justify-center py-2 pl-2">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85] mb-8 cursor-default flex flex-col items-start">
                    {/* Line 1 */}
                    <div className="flex flex-wrap gap-x-4">
                        {paradigmLine1.map((word, i) => (
                            <motion.span
                                key={`l1-${i}`}
                                initial={{ opacity: 0, y: 15 }} 
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                whileHover={{ scale: 1.05, y: -2, color: '#008f25', transition: { duration: 0.2 } }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: paradigmWordDelays[i] }}
                                className="inline-block"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                    {/* Line 2 */}
                    <div className="flex flex-wrap gap-x-4">
                        {paradigmLine2.map((word, i) => (
                            <motion.span
                                key={`l2-${i}`}
                                initial={{ opacity: 0, y: 15 }} 
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                whileHover={{ scale: 1.05, y: -2, color: '#008f25', transition: { duration: 0.2 } }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: paradigmWordDelays[paradigmLine1.length + i] }}
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
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex gap-5 border-l-4 border-micron-green pl-6"
                >
                    <div className="flex flex-col justify-center">
                        <h3 className="text-micron-green font-bold text-lg md:text-xl tracking-[0.2em] uppercase mb-1 flex flex-wrap gap-x-2">
                             {addressLine1.split(" ").map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 + (i * 0.05) }}
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
                                    transition={{ duration: 0.5, delay: 1.0 + (i * 0.05) }}
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
                                    transition={{ duration: 0.5, delay: 1.1 + (i * 0.05) }}
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
                    delay: 0.4
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
                         <div className="absolute inset-0 pointer-events-none border border-black/5" />
                     </div>
                </BentoCard>
            </motion.div>

        </div>
      </div>
    </section>
  );
};
