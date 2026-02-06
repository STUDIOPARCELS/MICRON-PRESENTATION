
import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../types';
import { ArrowUpRight } from 'lucide-react';

// Extended props to support mouse events
export const BentoCard: React.FC<CardProps & { 
  textColor?: string; 
  borderColor?: string; 
  arrowPosition?: 'top-right' | 'bottom-right'; 
  hideArrow?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}> = ({ 
  className = "", 
  children, 
  delay = 0, 
  onClick,
  hoverEffect = true,
  gradient = "bg-zinc-900",
  textColor = "text-white",
  borderColor = "border-white/10",
  arrowPosition = "top-right",
  hideArrow = false,
  onMouseEnter,
  onMouseLeave,
  // UPDATED: Changed duration to 1.5s for slower population as requested
  initial = { opacity: 0, y: 50 },
  whileInView = { opacity: 1, y: 0 },
  viewport = { once: false, amount: 0.1, margin: "0px 0px -50px 0px" },
  duration = 1.5 
}) => {
  const arrowColor = textColor.includes('black') || textColor.includes('zinc-900') ? 'text-zinc-900' : 'text-white';

  const arrowPosClass = arrowPosition === 'bottom-right' 
    ? 'bottom-4 right-4 md:bottom-6 md:right-6' 
    : 'top-4 right-4 md:top-6 md:right-6';

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport} 
      transition={{ 
        duration: duration,
        ease: [0.22, 1, 0.36, 1], 
        delay: delay 
      }}
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      // UPDATED: Removed 'transition-all' and replaced with specific transitions to avoid fighting Framer Motion
      className={`
        relative overflow-hidden rounded-xl 
        ${gradient} ${textColor}
        border ${borderColor}
        /* ENHANCED SHADOW FOR FLOATING LOOK */
        shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] 
        p-6 md:p-8
        flex flex-col
        transition-colors transition-shadow duration-300 ease-out
        group
        ${hoverEffect && onClick ? 'cursor-pointer hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)]' : ''}
        ${hoverEffect && !onClick ? 'hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.35)]' : ''}
        ${className}
      `}
    >
      {textColor === 'text-white' && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100" />
      )}
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
      
      {onClick && hoverEffect && !hideArrow && (
        <div className={`absolute ${arrowPosClass} z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
             <ArrowUpRight className={`${arrowColor} opacity-70`} size={20} />
        </div>
      )}
    </motion.div>
  );
};
