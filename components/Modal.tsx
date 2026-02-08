
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ModalContent } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalContent | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle Body Scroll Lock to prevent layout shift
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      const nav = document.querySelector('nav');
      if (nav) {
          nav.style.paddingRight = `${scrollbarWidth}px`;
      }

    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
      
      const nav = document.querySelector('nav');
      if (nav) {
          nav.style.paddingRight = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
      
      const nav = document.querySelector('nav');
      if (nav) {
          nav.style.paddingRight = '';
      }
    };
  }, [isOpen]);

  if (!mounted || !data) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-zinc-950/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none overflow-hidden">
             {(() => {
                switch (data.category) {
                  case 'cinematic':
                    return <CinematicModalContent data={data} onClose={onClose} />;
                  case 'showcase':
                    return <ShowcaseModalContent data={data} onClose={onClose} />;
                  case 'gallery':
                    return <GalleryModalContent data={data} onClose={onClose} />;
                  case 'reference':
                  default:
                    return <ReferenceModalContent data={data} onClose={onClose} />;
                }
             })()}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Category A: Cinematic Story
const CinematicModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  const layout = data.modalLayout || 'default';
  
  let containerClasses = ""; 
  let textSectionClasses = "flex-1 min-h-[50%]";
  let imageSectionClasses = "flex-1 min-h-[30%] md:min-h-0 block"; 

  switch (layout) {
    case 'reverse': 
      containerClasses = "flex flex-col md:flex-row"; 
      break;
    case 'vertical-text-top': 
      containerClasses = "flex flex-col md:flex-col-reverse"; 
      textSectionClasses = "h-1/2 w-full"; 
      imageSectionClasses = "h-1/2 w-full block"; 
      break;
    case 'vertical-image-top': 
      containerClasses = "flex flex-col md:flex-col"; 
      textSectionClasses = "h-1/2 w-full"; 
      imageSectionClasses = "h-1/2 w-full block"; 
      break;
    default:
      containerClasses = "flex flex-col md:flex-row-reverse";
      break;
  }

  const imageSrc = data.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`pointer-events-auto relative h-full max-h-[85vh] md:max-h-[95vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-zinc-950 shadow-2xl border border-white/10 ring-1 ring-white/5 ${containerClasses}`}
    >
      <button onClick={onClose} className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors backdrop-blur-md border border-white/20 shadow-lg cursor-pointer">
        <X size={24} />
      </button>

      <div className={`${imageSectionClasses} bg-zinc-900 relative p-4 flex items-center justify-center`}>
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
           <img src={imageSrc} alt="Visual Context" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className={`${textSectionClasses} p-6 md:p-10 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-zinc-950 to-zinc-900 overscroll-contain`}>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {data.label && (
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant-light">
              {data.label}
            </motion.div>
          )}
          <motion.h2 variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-5xl text-white mb-6 md:mb-8 leading-none font-bold uppercase tracking-tight">
            {data.title}
          </motion.h2>
          <div className="space-y-6 text-base md:text-lg text-zinc-400 font-light leading-relaxed">
             <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
               {data.content}
             </motion.div>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
};

// Category B: Showcase Use-Cases
const ShowcaseModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  const isLight = data.theme === 'light';
  const maxWidthClass = data.maxWidth || (isLight ? 'max-w-6xl' : 'max-w-7xl');
  const aspectRatioClass = data.aspectRatio 
    ? `md:${data.aspectRatio} w-full h-auto md:h-full` 
    : 'w-full max-h-[85vh] md:max-h-[95vh]';
  const flexClass = data.aspectRatio ? 'flex flex-col' : 'flex flex-col';
  let backgroundClass = '';
  if (data.customBackground) {
    backgroundClass = data.customBackground;
  } else if (isLight) {
    backgroundClass = 'bg-gradient-to-b from-white to-zinc-50 border-white ring-1 ring-zinc-200';
  } else {
    backgroundClass = 'bg-zinc-900 border-white/10 ring-1 ring-white/5';
  }
  const paddingClass = data.paddingClassName || "px-10 md:px-12 pb-10 md:pb-12 pt-0";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ type: "spring", damping: 30, stiffness: 350 }}
      className={`
        pointer-events-auto relative overflow-hidden rounded-[1.5rem] 
        shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] 
        border ${flexClass}
        ${aspectRatioClass}
        ${maxWidthClass}
        ${backgroundClass}
      `}
    >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-3 right-3 md:top-5 md:right-5 z-[100]">
            <button
                onClick={onClose}
                className={`
                    rounded-full p-2 md:p-2.5 transition-all duration-300 border shadow-lg
                    hover:scale-110 active:scale-95 cursor-pointer
                    ${data.customBackground 
                      ? 'bg-black/40 text-white border-white/20 hover:bg-black/60'
                      : isLight 
                        ? 'bg-white/80 backdrop-blur-md text-zinc-900 border-zinc-200 hover:bg-zinc-50 hover:shadow-xl' 
                        : 'bg-zinc-800/80 backdrop-blur-md text-white border-white/10 hover:bg-zinc-700'
                    }
                `}
            >
                <X size={24} />
            </button>
        </div>
      <div className={`
          relative z-10 
          px-10 py-5 md:px-12 md:py-6
          flex-shrink-0
          flex flex-col justify-center
          min-h-[80px] md:min-h-[100px]
          ${data.customBackground ? '' : (isLight ? 'bg-gradient-to-b from-white to-zinc-50' : 'bg-gradient-to-b from-zinc-800 to-zinc-900')}
      `}>
         <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
            <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none pr-8 ${isLight && !data.customBackground ? 'text-zinc-900' : 'text-white drop-shadow-lg'}`}>
            {data.title}
            </h2>
            {data.subtitle && (
            <div className={`flex items-center gap-2 mt-2`}>
                <span className={`hidden md:block h-px w-6 ${isLight && !data.customBackground ? 'bg-zinc-300' : 'bg-white/50'}`}></span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLight && !data.customBackground ? 'text-zinc-400' : 'text-white/70'}`}>
                    {data.subtitle}
                </span>
            </div>
            )}
         </motion.div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 min-h-0 overscroll-contain">
        <motion.div 
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            className={`h-full ${paddingClass}`}
        >
            {data.content}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Category C: Reference
const ReferenceModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
  const isLight = data.theme === 'light';
  const containerClasses = isLight ? "bg-white shadow-2xl border border-zinc-200" : "bg-zinc-950/95 backdrop-blur-xl shadow-2xl border border-white/10";
  const headerClasses = isLight ? "bg-zinc-50 border-b border-zinc-200" : "bg-black/50 border-b border-white/10";
  const titleColor = data.headerClassName || (isLight ? "text-zinc-900" : "text-white");
  const subtitleColor = isLight ? "text-zinc-500" : "text-zinc-500";
  const closeBtnClasses = isLight ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900" : "bg-white/5 text-zinc-400 hover:text-white";
  const contentContainerClasses = isLight ? "text-zinc-700" : "text-zinc-300";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`pointer-events-auto relative w-full max-w-5xl h-auto max-h-[85vh] md:max-h-[95vh] flex flex-col overflow-hidden rounded-2xl md:rounded-3xl ${containerClasses}`}
    >
      <div className={`p-6 md:p-8 flex justify-between items-center flex-shrink-0 ${headerClasses}`}>
        <div className="pr-6">
          <h2 className={`text-2xl font-bold uppercase tracking-tight mb-1 ${titleColor}`}>
            {data.title}
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${subtitleColor}`}>
            {data.subtitle}
          </p>
        </div>
        <button onClick={onClose} className={`rounded-full p-2 transition-colors cursor-pointer ${closeBtnClasses}`}>
          <X size={20} />
        </button>
      </div>
      <div className={`p-6 md:p-8 overflow-y-auto custom-scrollbar min-h-0 ${contentContainerClasses} overscroll-contain`}>
        {data.content}
      </div>
    </motion.div>
  );
};

// Category D: Gallery (UPDATED: PERFECT GRID LAYOUT)
const GalleryModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
    const [items, setItems] = useState(data.galleryImages || []);
    const count = items.length;

    useEffect(() => {
        setItems(data.galleryImages || []);
    }, [data.galleryImages]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full h-full max-w-[95vw] max-h-[92vh] rounded-[2rem] bg-white shadow-2xl flex flex-col overflow-hidden"
        >
            {/* Header */}
            <div className="flex justify-between items-center p-8 md:p-10 pb-4 flex-shrink-0 z-20 bg-white">
                <div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 leading-none">{data.title}</h2>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">{count} Photos</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="rounded-full bg-zinc-100 p-4 text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                    <X size={28} />
                </button>
            </div>
            
            {/* Gallery Container - Grid Layout */}
            <div className="flex-1 w-full h-full overflow-y-auto custom-scrollbar relative z-10 px-8 md:px-10 pb-12 overscroll-contain">
                 {/* CSS Grid for Perfect Layout with Mixed Aspect Ratios */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                    {items.map((img, i) => {
                        return (
                            <div 
                                key={`${img.url}-${i}`}
                                // UPDATED: Floating shadow effect added
                                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-zinc-100 flex items-center justify-center p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300"
                            >
                                <img 
                                    src={img.url} 
                                    alt="Gallery Item" 
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-contain drop-shadow-sm" 
                                />
                            </div>
                        );
                    })}
                 </div>
            </div>
        </motion.div>
    );
};
