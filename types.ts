
import React from 'react';

export type ModalCategory = 'cinematic' | 'showcase' | 'reference' | 'gallery';
export type ModalLayout = 'default' | 'reverse' | 'vertical-text-top' | 'vertical-image-top';

export interface ModalContent {
  title: string;
  subtitle?: string;
  label?: string;
  content: React.ReactNode;
  category: ModalCategory;
  tags?: string[]; // Added for showcase grid
  image?: string; // Specific image for the modal
  modalLayout?: ModalLayout; // Layout configuration
  galleryImages?: string[]; // For gallery modal
  theme?: 'light' | 'dark'; // Added for modal theming (white backgrounds)
  headerClassName?: string; // Optional override for header text color
  maxWidth?: string; // Added for dynamic modal width control
  aspectRatio?: string; // Added for forcing specific modal shapes (e.g., 'aspect-square', 'aspect-[6/4]')
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
  gradient?: string; // Explicit gradient control
  // Animation Overrides
  initial?: any;
  whileInView?: any;
  viewport?: any;
  duration?: number;
}

export interface SectionProps {
  id: string;
}
