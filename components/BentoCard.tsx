
import React from 'react';
import { motion } from 'framer-motion';
import { CardProps } from '../types';
import { ArrowUpRight } from 'lucide-react';

export const BentoCard: React.FC<CardProps & { textColor?: string; borderColor?: string; arrowPosition?: 'top-right' | 'bottom-right'; hideArrow?: boolean }> = ({ 
  className = "", 
  children, 
  delay = 0, 
  onClick,
  hoverEffect = true,
  // Default to a dark zinc if not provided
  gradient = "bg-zinc-900",
  // New props for theming
  textColor = "text-white",
  // CHANGED: Global override to ensure no black borders, only subtle white/alpha
  borderColor = "border-white/10",
  arrowPosition = "top-right",
  hideArrow = false
}) => {
  // Determine arrow color based on text color prop
  const arrowColor = textColor.includes('black') || textColor.includes('zinc-900') ? 'text-zinc-900' : 'text-white';

  const arrowPosClass = arrowPosition === 'bottom-right' 
    ? 'bottom-4 right-4 md:bottom-6 md:right-6' 
    : 'top-4 right-4 md:top-6 md:right-6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }} 
      transition={{ 
        duration: 1.0,
        ease: [0.25, 0.4, 0.25, 1],
        delay: delay
      }}
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl 
        ${gradient} ${textColor}
        border ${borderColor}
        shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
        p-6 md:p-8
        flex flex-col
        transition-all duration-300 ease-out
        group
        ${hoverEffect && onClick ? 'cursor-pointer hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.6)]' : ''}
        ${hoverEffect && !onClick ? 'hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.4)]' : ''}
        ${className}
      `}
    >
      {/* Subtle top light source for 3D bevel effect (Only visible on dark cards) */}
      {textColor === 'text-white' && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-100" />
      )}
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
      
      {/* Hover Arrow */}
      {onClick && hoverEffect && !hideArrow && (
        <div className={`absolute ${arrowPosClass} z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
             <ArrowUpRight className={`${arrowColor} opacity-70`} size={20} />
        </div>
      )}
    </motion.div>
  );
};
