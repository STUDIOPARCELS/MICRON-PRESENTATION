
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { MapPin, Plane, Building2, Trees, GraduationCap, Stethoscope, Utensils, Sprout, BedDouble, Images, ArrowUpRight, Home, Zap, Leaf, Map, Car, Thermometer, Waves, Activity, Bot, History, Droplets, DoorOpen, ArrowUp, Flower2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ModalContent } from '../types';

// Helper component for inner bento cards (reused here to keep component self-contained)
const InnerBento = ({ title, children, gradient, icon, className = "", delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`
            ${gradient} rounded-2xl p-6 md:p-8 text-white relative overflow-hidden group 
            shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] 
            border-t border-l border-white/20 border-b border-white/10 border-r border-white/5
            ${className}
        `}
    >
        {/* Top Highlight for 3D Bevel */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

        <div className="relative z-10 h-full flex flex-col">
            {(title || icon) && (
                <>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 flex items-center gap-3 drop-shadow-md">
                        {icon && React.cloneElement(icon, { size: 24, strokeWidth: 1.5 })}
                        {title}
                    </h3>
                    {/* SEPARATOR LINE */}
                    <div className="h-px w-full bg-white/20 mb-4"></div>
                </>
            )}
            <div className="text-white/80 text-sm md:text-base leading-relaxed font-body font-medium space-y-4 flex-1 drop-shadow-sm">
                {children}
            </div>
        </div>
    </motion.div>
);

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openLevelGallery = (level: 'main' | 'upper' | 'grounds') => {
      let title = "";
      let images: string[] = [];

      if (level === 'main') {
          title = "MAIN LEVEL GALLERY";
          images = [
              "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop", // Entry/Foyer
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop", // Living
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", // Kitchen
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop", // Dining
              "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop"  // Office
          ];
      } else if (level === 'upper') {
          title = "UPPER LEVEL GALLERY";
          images = [
              "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=2074&auto=format&fit=crop", // Bedroom
              "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop", // Bath
              "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2070&auto=format&fit=crop", // Bedroom 2
              "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop"  // Retreat
          ];
      } else {
          title = "GROUNDS GALLERY";
          images = [
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop", // Exterior
              "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?q=80&w=1974&auto=format&fit=crop", // Garden
              "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=2070&auto=format&fit=crop", // Patio
              "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop"  // Landscaping
          ];
      }

      setModalData({
        title: title,
        category: 'gallery',
        galleryImages: images,
        content: null,
      });
  };

  const getModalContent = (type: string) => {
    const base = { category: 'showcase' as const, theme: 'light' as const };
    
    switch (type) {
        case 'wellness':
            return {
                ...base,
                title: "WELLNESS & NATURE",
                subtitle: "RESTORATIVE INFRASTRUCTURE",
                maxWidth: "max-w-7xl", 
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed border-l-4 border-micron-green pl-6 py-1">
                            Powered by a 177°F direct-use aquifer. Geothermal water flows through the home’s radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                            <InnerBento 
                                title="CONTRAST THERAPY" 
                                gradient="bg-micron-eggplant-light" 
                                icon={<Waves />}
                                delay={0.1}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        Alternating thermal exposure drives circulation to <span className="font-bold text-white">flush systemic inflammation</span> and accelerate deep tissue recovery.
                                    </p>
                                    <p>
                                        The rapid temperature shift triggers a proven <span className="font-bold text-white">250% increase in dopamine</span>, delivering sustained alertness, mental clarity, and elevated mood.
                                    </p>
                                </div>
                            </InnerBento>
                            
                            <InnerBento 
                                title="WHOLE BODY VIBRATION" 
                                gradient="bg-micron-grey1" 
                                icon={<Activity />}
                                delay={0.2}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat <span className="font-bold text-white">zero-gravity bone loss</span>.
                                    </p>
                                    <p>
                                        By engaging 90% of muscle fibers (vs. 40% in standard training), it rapidly builds bone density, counteracts neuropathy, and stimulates <span className="font-bold text-white">neuro-repair for improved mental health</span>.
                                    </p>
                                </div>
                            </InnerBento>

                            <InnerBento 
                                title="ORGANIC GARDEN" 
                                gradient="bg-micron-green" 
                                icon={<Sprout />}
                                delay={0.3}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full gap-4">
                                    <p>
                                        2025 research on the "<span className="font-bold text-white">Soil-Plant-Gut Axis</span>" confirms fresh-harvested produce delivers <span className="font-bold text-white">essential soil-based probiotics</span> missing from sterilized commercial food.
                                    </p>
                                    <p>
                                        Homegrown crops retain up to 50% more nutrient density than store-bought options, <span className="font-bold text-white">directly fueling the gut</span> microbiome and immune system.
                                    </p>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        case 'autonomous':
            return {
                ...base,
                title: "AUTONOMOUS SERVICE",
                subtitle: "LIVING LAB",
                maxWidth: "max-w-7xl", 
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed border-l-4 border-micron-grey1 pl-6 py-1">
                            Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                            <InnerBento 
                                title="CYBERCAB" 
                                gradient="bg-micron-black" 
                                icon={<Car className="scale-x-[-1]" />}
                                delay={0.1}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full justify-between gap-6">
                                    <p>
                                        <span className="font-bold text-white">Tesla's first fully autonomous vehicle</span> — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab <span className="font-bold text-white">manages all airport transfers, downtown shuttles, and guest logistics autonomously</span>.
                                    </p>
                                    <div className="aspect-square w-full rounded-xl overflow-hidden relative shadow-lg border border-white/10 mt-auto">
                                        <img src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" alt="Cybercab" />
                                    </div>
                                </div>
                            </InnerBento>
                            
                            <InnerBento 
                                title="OPTIMUS" 
                                gradient="bg-micron-eggplant-light" 
                                icon={<Bot />}
                                delay={0.2}
                                className="flex flex-col h-full"
                            >
                                <div className="flex flex-col h-full justify-between gap-6">
                                    <p>
                                        <span className="font-bold text-white">Tesla's Gen 3 humanoid</span> — 5'8", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus <span className="font-bold text-white">manages property maintenance, perimeter monitoring, and routine service tasks</span> within defined geofenced zones across the residence.
                                    </p>
                                    <div className="aspect-square w-full rounded-xl overflow-hidden relative shadow-lg border border-white/10 mt-auto">
                                        <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700" alt="Optimus" />
                                    </div>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        case 'historic':
            return {
                ...base,
                title: "HISTORIC LEGACY",
                subtitle: "1890 - PRESENT",
                maxWidth: "max-w-7xl", 
                content: (
                    <div className="flex flex-col gap-6 h-full">
                        <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed border-l-4 border-micron-eggplant pl-6 py-1">
                            Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                        </p>

                        <div className="grid grid-cols-1 gap-6 flex-1">
                            <InnerBento 
                                title="C.W. MOORE & THE DISTRICT" 
                                gradient="bg-micron-eggplant" 
                                icon={<History />}
                                delay={0.1}
                                className="h-full"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                                    <div className="flex flex-col justify-center gap-6">
                                        <p>In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water. By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.</p>
                                        
                                        <p>Today, the Boise Warm Springs Water District remains the <span className="font-bold text-white">oldest continuously operating geothermal district in North America</span>. The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a <span className="font-bold text-white">National Register of Historic Places</span> corridor defined by energy innovation.</p>
                                    </div>
                                    <div className="w-full h-full min-h-[300px] md:min-h-0 bg-white/10 rounded-xl overflow-hidden relative border border-white/20">
                                        <img src="https://images.unsplash.com/photo-1565692093863-79282363b829?q=80&w=2070&auto=format&fit=crop" alt="Historic Boise" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-micron-eggplant/80 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <span className="text-sm font-bold uppercase tracking-widest text-white block mb-1">Est. 1890</span>
                                            <span className="text-white/80 text-xs">Warm Springs Avenue</span>
                                        </div>
                                    </div>
                                </div>
                            </InnerBento>
                        </div>
                    </div>
                )
            };
        default: return null;
    }
  };

  return (
    // REDUCED PADDING: py-16 -> py-10
    <section id="property" className="container mx-auto px-4 md:px-12 py-8 md:py-12 bg-zinc-50 text-zinc-900">
       
       {/* 
        SECTION CONTAINER BENTO BOX 
       */}
       <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false, amount: 0.1 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 ring-1 ring-zinc-50"
       >

          <div className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8 md:border-b-0 md:pb-0">
            <div className="flex-shrink-0">
               <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
               <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">PROPERTY</h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                    <div className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           HISTORIC CONTEXT
                       </span>
                       <p className="mb-0">
                            A modest home within North America's oldest continuously operating geothermal district (est. 1890), tapping the nation's largest historic direct-use aquifer. <span className="text-micron-eggplant font-semibold">Where earth's heat meets light from the stars.</span>
                       </p>
                    </div>
                 </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            
            {/* METRIC ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 <BentoCard gradient="bg-micron-eggplant" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.1}>
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-2">1906</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Year Built</p>
                 </BentoCard>
                 <BentoCard gradient="bg-micron-grey1" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.2}>
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-2">3,374</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Square Feet</p>
                 </BentoCard>
                 <BentoCard gradient="bg-micron-green" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.3}>
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-2">3 / 4</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Bed / Bath</p>
                 </BentoCard>
                 <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[120px] flex flex-col items-center justify-center text-center" delay={0.4}>
                     <h3 className="text-3xl md:text-5xl font-black text-white mb-2">1892</h3>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Geothermal Rights</p>
                 </BentoCard>
            </div>

            <div className="mt-6">
                 <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-micron-eggplant" size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Location Details</h3>
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
                     <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.1}>
                        <div className="flex justify-between items-start">
                            <MapPin size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">15<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Micron HQ</span>
                     </BentoCard>

                     <BentoCard gradient="bg-micron-eggplant" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.15}>
                        <div className="flex justify-between items-start">
                            <Plane size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">10<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Airport</span>
                     </BentoCard>

                     <BentoCard gradient="bg-micron-eggplant-light" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.2}>
                        <div className="flex justify-between items-start">
                            <Building2 size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">3<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Downtown</span>
                     </BentoCard>

                     <BentoCard gradient="bg-zinc-800" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.25}>
                        <div className="flex justify-between items-start">
                            <Stethoscope size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">2<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">St. Luke's</span>
                     </BentoCard>

                     <BentoCard gradient="bg-micron-grey2" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.3}>
                        <div className="flex justify-between items-start">
                            <Building2 size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">5<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Capitol</span>
                     </BentoCard>

                     <BentoCard gradient="bg-micron-black" className="min-h-[100px] flex flex-col justify-between p-4" hoverEffect={true} delay={0.35}>
                        <div className="flex justify-between items-start">
                            <GraduationCap size={16} className="text-white"/>
                            <span className="text-xl md:text-2xl font-bold text-white">4<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">Boise State</span>
                     </BentoCard>

                     <BentoCard gradient="bg-micron-green" className="min-h-[100px] flex flex-col justify-between p-4 relative overflow-hidden" hoverEffect={true} delay={0.4}>
                         <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-xl -mr-4 -mt-4 rounded-full pointer-events-none"></div>
                         <div className="flex justify-between items-start relative z-10">
                             <Trees size={16} className="text-white"/>
                             <span className="text-xl md:text-2xl font-bold text-white">1<span className="text-[10px] font-normal align-top ml-0.5">min</span></span>
                         </div>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 relative z-10">River</span>
                     </BentoCard>
                 </div>
            </div>

            {/* RESTORED: RESIDENCE SPECIFICATIONS */}
            <div className="mt-8">
                 <div className="flex items-center gap-2 mb-3">
                    <Home className="text-micron-eggplant" size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Residence Specifications</h3>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Level */}
                    {/* REDUCED PADDING: p-6 -> p-4 (Half) to maximize space */}
                    <BentoCard 
                        gradient="bg-white" 
                        borderColor="border-zinc-200" 
                        textColor="text-zinc-900" 
                        className="min-h-[200px] shadow-sm hover:shadow-xl group !p-4" 
                        onClick={() => openLevelGallery('main')}
                        hoverEffect={true}
                        delay={0.1}
                        hideArrow={true}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <DoorOpen className="text-micron-green" />
                            <h4 className="text-lg font-bold uppercase tracking-tight text-zinc-900">Main Level</h4>
                        </div>
                        {/* TIGHTER SPACING: space-y-2 -> space-y-1.5 */}
                        <ul className="space-y-1.5 text-sm font-medium text-zinc-600 font-body">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0"/>
                                <span>Foyer Entry</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0"/>
                                <span>Living / Dining w/ Fireplaces</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0"/>
                                <span>Office on Ground Deck</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0"/>
                                <span>Guest Down / Access to Deck</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-green mt-1.5 shrink-0"/>
                                <span>Antique Fir Throughout</span>
                            </li>
                        </ul>
                        {/* UPDATED: Closer to corner (bottom-2 right-2) */}
                        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2 opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-micron-green">View Gallery</span>
                            <ArrowUpRight className="text-micron-green" size={16} />
                        </div>
                    </BentoCard>

                    {/* Upper Level */}
                    <BentoCard 
                        gradient="bg-white" 
                        borderColor="border-zinc-200" 
                        textColor="text-zinc-900" 
                        className="min-h-[200px] shadow-sm hover:shadow-xl group !p-4" 
                        onClick={() => openLevelGallery('upper')}
                        hoverEffect={true}
                        delay={0.2}
                        hideArrow={true}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <ArrowUp className="text-micron-eggplant-light" />
                            <h4 className="text-lg font-bold uppercase tracking-tight text-zinc-900">Upper Level</h4>
                        </div>
                        <ul className="space-y-1.5 text-sm font-medium text-zinc-600 font-body">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant-light mt-1.5 shrink-0"/>
                                <span>3 Bedrooms</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant-light mt-1.5 shrink-0"/>
                                <span>2 Baths (En Suite Primary)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant-light mt-1.5 shrink-0"/>
                                <span>Playroom / Executive Retreat</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant-light mt-1.5 shrink-0"/>
                                <span>Laundry Facilities</span>
                            </li>
                        </ul>
                        {/* UPDATED: Closer to corner (bottom-2 right-2) */}
                        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2 opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-micron-eggplant-light">View Gallery</span>
                            <ArrowUpRight className="text-micron-eggplant-light" size={16} />
                        </div>
                    </BentoCard>

                    {/* Grounds */}
                    <BentoCard 
                        gradient="bg-white" 
                        borderColor="border-zinc-200" 
                        textColor="text-zinc-900" 
                        className="min-h-[200px] shadow-sm hover:shadow-xl group !p-4" 
                        onClick={() => openLevelGallery('grounds')}
                        hoverEffect={true}
                        delay={0.3}
                        hideArrow={true}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Flower2 className="text-micron-eggplant" />
                            <h4 className="text-lg font-bold uppercase tracking-tight text-zinc-900">Grounds</h4>
                        </div>
                        <ul className="space-y-1.5 text-sm font-medium text-zinc-600 font-body">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant mt-1.5 shrink-0"/>
                                <span>Historic East End / Warm Springs</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant mt-1.5 shrink-0"/>
                                <span>Covered Carport</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant mt-1.5 shrink-0"/>
                                <span>Auto Court for +10 Cars / Events</span>
                            </li>
                             <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-micron-eggplant mt-1.5 shrink-0"/>
                                <span>Geothermal Jacuzzi on Private Way</span>
                            </li>
                        </ul>
                        {/* UPDATED: Closer to corner (bottom-2 right-2) */}
                        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-2 opacity-100 transition-opacity">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-micron-eggplant">View Gallery</span>
                            <ArrowUpRight className="text-micron-eggplant" size={16} />
                        </div>
                    </BentoCard>
                 </div>
            </div>

            <div className="mt-8">
                 <div className="flex items-center gap-2 mb-3">
                    <Zap className="text-micron-eggplant" size={20} />
                    <h3 className="font-bold uppercase tracking-widest text-sm text-micron-eggplant">Technology, Wellness & Legacy</h3>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <BentoCard 
                        gradient="bg-micron-green" 
                        textColor="text-white" 
                        borderColor="border-white/10" 
                        className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all" 
                        delay={0.1}
                        onClick={() => setModalData(getModalContent('wellness'))}
                        hoverEffect={true}
                        arrowPosition="bottom-right"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Leaf className="text-white" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Nature</span>
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Wellness</h4>
                        <div className="h-px w-full bg-white/20 my-3"></div>
                        <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                            Powered by a 177°F direct-use aquifer. Geothermal water flows through the home’s radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                        </p>
                    </BentoCard>

                    <BentoCard 
                        gradient="bg-micron-grey1" 
                        textColor="text-white" 
                        borderColor="border-white/10" 
                        className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all" 
                        delay={0.2}
                        onClick={() => setModalData(getModalContent('autonomous'))}
                        hoverEffect={true}
                        arrowPosition="bottom-right"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Car className="text-white scale-x-[-1]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Intelligence</span>
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">Autonomous Service</h4>
                        <div className="h-px w-full bg-white/20 my-3"></div>
                        <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                            Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                        </p>
                    </BentoCard>

                    <BentoCard 
                        gradient="bg-micron-eggplant" 
                        textColor="text-white" 
                        borderColor="border-white/10" 
                        className="min-h-[220px] group cursor-pointer hover:shadow-2xl transition-all"
                        delay={0.3}
                        onClick={() => setModalData(getModalContent('historic'))}
                        hoverEffect={true}
                        arrowPosition="bottom-right"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <Map className="text-white" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Legacy</span>
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-tight mb-2">National Register of Historic Places</h4>
                        <div className="h-px w-full bg-white/20 my-3"></div>
                        <p className="text-base text-white/70 font-medium leading-relaxed font-body">
                            Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity.
                        </p>
                    </BentoCard>
                 </div>
            </div>

          </div>
       </motion.div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
