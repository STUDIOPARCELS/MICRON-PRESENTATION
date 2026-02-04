
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
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
      <button onClick={onClose} className="absolute top-4 right-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors backdrop-blur-md border border-white/10">
        <X size={24} />
      </button>

      <div className={`${imageSectionClasses} bg-zinc-900 relative p-4 flex items-center justify-center`}>
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
           <img src={imageSrc} alt="Visual Context" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-1000 hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className={`${textSectionClasses} p-6 md:p-10 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-zinc-950 to-zinc-900`}>
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

  // Default to max-w-4xl for tighter layout if no maxWidth provided
  const maxWidthClass = data.maxWidth || (isLight ? 'max-w-6xl' : 'max-w-7xl');

  // RESPONSIVE FIX:
  // On Mobile: Use `h-auto` and `w-full` so content stacks naturally without forced aspect ratios.
  // On Desktop (md+): Apply the specific `aspectRatio` (e.g. 6/4 or Square) if provided.
  const aspectRatioClass = data.aspectRatio 
    ? `md:${data.aspectRatio} w-full h-auto md:h-full` 
    : 'w-full max-h-[85vh] md:max-h-[95vh]';
  
  const flexClass = data.aspectRatio ? 'flex flex-col' : 'flex flex-col';

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
        ${isLight 
            ? `bg-zinc-50 border-white ring-1 ring-zinc-200 ${maxWidthClass}` 
            : `bg-zinc-900 border-white/10 ring-1 ring-white/5 ${maxWidthClass}`
        }
      `}
    >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />

        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-50">
            <button
                onClick={onClose}
                className={`
                    rounded-full p-1.5 transition-all duration-300 border
                    hover:scale-110 active:scale-95
                    ${isLight 
                        ? 'bg-white/90 backdrop-blur text-zinc-900 border-zinc-200 shadow-sm hover:shadow-md' 
                        : 'bg-zinc-800/90 backdrop-blur text-white border-white/10 hover:bg-zinc-700'
                    }
                `}
            >
                <X size={20} />
            </button>
        </div>

      <div className={`
          relative z-10 px-5 py-4 md:px-6 md:py-5 flex-shrink-0
          ${isLight ? 'bg-gradient-to-b from-white to-zinc-50' : 'bg-gradient-to-b from-zinc-800 to-zinc-900'}
          pr-12 
      `}>
         <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
            {data.subtitle && (
            <div className={`flex items-center gap-2 mb-1`}>
                <span className={`hidden md:block h-px w-6 ${isLight ? 'bg-zinc-300' : 'bg-zinc-600'}`}></span>
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {data.subtitle}
                </span>
            </div>
            )}
            <h2 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none ${isLight ? 'text-zinc-900' : 'text-white drop-shadow-lg'}`}>
            {data.title}
            </h2>
         </motion.div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 min-h-0">
        <motion.div 
            initial="hidden" animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            className="p-5 md:p-6 h-full"
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
      <div className={`p-5 flex justify-between items-start flex-shrink-0 ${headerClasses}`}>
        <div className="pr-6">
          <h2 className={`text-2xl font-bold uppercase tracking-tight mb-1 ${titleColor}`}>
            {data.title}
          </h2>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${subtitleColor}`}>
            {data.subtitle}
          </p>
        </div>
        <button onClick={onClose} className={`rounded-full p-2 transition-colors ${closeBtnClasses}`}>
          <X size={20} />
        </button>
      </div>
      
      <div className={`p-6 md:p-8 overflow-y-auto custom-scrollbar min-h-0 ${contentContainerClasses}`}>
        {data.content}
      </div>
    </motion.div>
  );
};

// Category D: Gallery
const GalleryModalContent: React.FC<{ data: ModalContent; onClose: () => void }> = ({ data, onClose }) => {
    const images = data.galleryImages || [];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="pointer-events-auto relative w-full max-w-6xl h-[85vh] overflow-hidden rounded-2xl bg-zinc-950/95 backdrop-blur-xl shadow-2xl border border-white/10 flex flex-col"
        >
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-black/50 flex-shrink-0">
                <div>
                    <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white">{data.title}</h2>
                    <p className="text-zinc-400 text-xs">{images.length} Photos</p>
                </div>
                <button onClick={onClose} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors border border-white/10">
                    <X size={20} />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {images.map((img, i) => (
                        <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-900 border border-white/5 cursor-pointer">
                            <img src={img} alt={`Gallery ${i}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
