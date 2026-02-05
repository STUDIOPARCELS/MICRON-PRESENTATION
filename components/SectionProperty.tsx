
import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ModalContent } from '../types';

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openLevelGallery = (level: 'main' | 'upper' | 'grounds') => {
      let title = "";
      let images: string[] = [];

      if (level === 'main') {
          title = "MAIN LEVEL GALLERY";
          images = [
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop"
          ];
      } else if (level === 'upper') {
          title = "UPPER LEVEL GALLERY";
          images = [
              "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2074&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop"
          ];
      } else {
          title = "GROUNDS GALLERY";
          images = [
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop"
          ];
      }

      setModalData({
        title: title,
        category: 'gallery',
        galleryImages: images,
        content: null,
      });
  };

  const openInfoModal = (type: 'wellness' | 'autonomous' | 'history') => {
      if (type === 'wellness') {
        setModalData({
            title: "GEOTHERMAL & WELLNESS",
            subtitle: "NATURE",
            category: 'showcase',
            theme: 'light',
            maxWidth: 'max-w-7xl',
            content: (
                <div className="flex flex-col gap-8">
                    {/* Intro */}
                    <div className="border-l-4 border-micron-green pl-6 py-1">
                        <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-body">
                            Geothermal spa utilizing the district's 177°F source. The home is heated through geothermal radiant heat as well as the hot tub. The grounds feature mature producing fruit trees and a Concord grapevine.
                        </p>
                    </div>

                    {/* Three Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Blue */}
                        <div className="bg-micron-eggplant-light/90 text-white p-8 rounded-2xl shadow-lg flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <Waves size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight leading-none">CONTRAST THERAPY</h3>
                            <div className="space-y-4 text-sm font-medium leading-relaxed opacity-90">
                                <p>Alternating thermal exposure drives circulation to flush systemic inflammation and accelerate deep tissue recovery.</p>
                                <p>The rapid temperature shift triggers a proven 250% increase in dopamine, delivering sustained alertness, mental clarity, and elevated mood.</p>
                            </div>
                        </div>

                        {/* Card 2: Gray/Dark */}
                        <div className="bg-micron-grey1 text-white p-8 rounded-2xl shadow-lg flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight leading-none">WHOLE BODY VIBRATION</h3>
                            <div className="space-y-4 text-sm font-medium leading-relaxed opacity-90">
                                <p>Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat zero-gravity bone loss.</p>
                                <p>By engaging 90% of muscle fibers (vs 40% in standard training), it rapidly builds bone density, counteracts neuropathy, and stimulates neuro-repair for improved mental health.</p>
                            </div>
                        </div>

                        {/* Card 3: Green */}
                        <div className="bg-micron-green text-white p-8 rounded-2xl shadow-lg flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <Sprout size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight leading-none">ORGANIC GARDEN</h3>
                            <div className="space-y-4 text-sm font-medium leading-relaxed opacity-90">
                                <p>2025 research on the "Soil-Plant-Gut Axis" confirms fresh-harvested produce delivers essential soil-based probiotics missing from sterilized commercial food.</p>
                                <p>Homegrown crops retain up to 50% more nutrient density than store-bought options, directly fueling the gut microbiome and immune system.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
      } else if (type === 'history') {
        setModalData({
            title: "NATIONAL REGISTER OF HISTORIC PLACES",
            subtitle: "LEGACY",
            category: 'showcase',
            theme: 'light',
            maxWidth: 'max-w-7xl',
            content: (
                <div className="flex flex-col gap-8">
                     <div className="border-l-4 border-micron-eggplant pl-6 py-1">
                        <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-body">
                            Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Purple Content Box */}
                        <div className="bg-micron-eggplant text-white rounded-2xl p-8 md:p-12 shadow-xl flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-6">
                                <Clock size={24} className="text-white/70" />
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">C.W. MOORE & THE DISTRICT</h3>
                            </div>
                            <div className="h-px w-full bg-white/20 mb-6"></div>
                            <div className="space-y-6 text-base md:text-lg leading-relaxed font-medium text-white/90">
                                <p>
                                    In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water. By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.
                                </p>
                                <p>
                                    Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America. The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.
                                </p>
                            </div>
                        </div>

                        {/* Image/Visual Box */}
                        <div className="bg-micron-grey1 rounded-2xl overflow-hidden relative shadow-xl min-h-[400px]">
                            <img 
                                src="https://images.unsplash.com/photo-1572953109213-3be62398eb95?q=80&w=2070&auto=format&fit=crop" 
                                alt="Historic Warm Springs" 
                                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <h4 className="text-2xl font-black uppercase tracking-tight mb-1">EST. 1890</h4>
                                <p className