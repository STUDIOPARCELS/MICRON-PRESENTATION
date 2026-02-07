import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape, Thermometer, ShieldCheck, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { BentoCard } from './BentoCard'; // Imported BentoCard
import { ModalContent, GalleryItem } from '../types';

// --- HELPER COMPONENTS (MOVED OUTSIDE) ---

const StatCard = ({ children, delay = 0, className }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)" }}
    className={className}
  >
      {children}
  </motion.div>
);

const LocationPill = ({ label, time, color, icon, delay = 0 }: any) => (
<motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)" }}
    className={`${color} rounded-xl p-3 flex flex-col justify-between items-start text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] cursor-default h-[80px] border border-white/10`}
>
    <div className="opacity-80">{icon}</div>
    <div className="w-full">
        <div className="flex justify-between items-end w-full">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
            <span className="text-sm font-black leading-none">{time}</span>
        </div>
    </div>
</motion.div>
);

const SpecCard = ({ title, icon, items, onGallery, className, gradient = "bg-zinc-900", delay = 0 }: any) => (
  <BentoCard 
    gradient={gradient}
    delay={delay}
    onClick={onGallery}
    hoverEffect={true}
    hoverY={-5}
    viewport={{ once: true, amount: 0.1 }} 
    textColor="text-white"
    borderColor="border-white/10"
    className={`flex flex-col h-full ${className}`}
    hideArrow={true}
  >
      <div className="flex items-center gap-3 mb-4">
          <div className={`text-white/70 group-hover:text-white transition-colors duration-300`}>
              {React.cloneElement(icon, { size: 24 })}
          </div>
          <h4 className={`text-2xl font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors`}>{title}</h4>
      </div>
      
      <div className="w-full h-px bg-white/20 mb-4" />

      <ul className="space-y-3 mb-2 flex-1">
          {items.map((item: string, i: number) => (
              <li key={i} className={`flex items-start gap-3 text-sm md:text-base font-medium leading-snug text-white`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white opacity-50`} />
                  {item}
              </li>
          ))}
      </ul>
      
      <div className="mt-auto flex justify-end items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
              GALLERY
          </span>
          <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={20} />
          </div>
      </div>
  </BentoCard>
);

const InfoCard = ({ title, subtitle, icon, text, className, gradient, image, onClick, delay = 0 }: any) => (
  <BentoCard 
    gradient={gradient}
    delay={delay}
    onClick={onClick}
    hoverEffect={true}
    hoverY={-5}
    viewport={{ once: true, amount: 0.1 }}
    textColor="text-white"
    borderColor="border-white/10"
    className={`flex flex-col h-full min-h-[240px] relative ${className}`}
    hideArrow={true}
  >
      {image && (
         <div className="absolute inset-0 w-full h-full z-0">
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-300" />
         </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-3">
                 <div className={`text-white/70 group-hover:text-white group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
                 <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors leading-tight">{title}</h4>
             </div>
        </div>
        
        <div className="h-px w-full bg-white/20 mb-6 group-hover:bg-white/40 transition-colors" />

        <p className="text-sm md:text-base text-white/90 font-medium leading-relaxed mb-4 flex-1 drop-shadow-sm">
           {text}
        </p>
        
        <div className="mt-auto flex justify-end items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                {subtitle}
            </span>
            <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={20} />
            </div>
        </div>
      </div>
  </BentoCard>
);

// Helper for Modal Cards content
const ModalCard = ({ title, description, colorClass, icon, image }: any) => (
  <div className={`${colorClass} rounded-2xl p-6 text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group border border-white/10`}>
      {image && (
           <>
              <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
           </>
      )}
      <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
              <div className="flex items-center gap-3 mb-4">
                  {icon && React.cloneElement(icon, { size: 24, className: "text-white/80" })}
                  <h3 className="text-xl font-bold uppercase tracking-tight">{title}</h3>
              </div>
              
              <div className="h-px w-full bg-white/20 mb-4" />

              <div className="text-white/60 font-medium leading-relaxed text-lg space-y-4">
                  {description}
              </div>
          </div>
      </div>
  </div>
);

export const SectionProperty: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openLevelGallery = (level: 'main' | 'upper' | 'grounds') => {
      let title = "";
      let images: GalleryItem[] = [];

      if (level === 'main') {
          title = "MAIN LEVEL GALLERY";
          // MAP: Auto-Sized Masonry Layout
          // SWAPPED: Now contains Dining, Entry, and Living/Stairs images
          images = [
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/dining.1.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/dining.6.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/entry.0.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/entry.3.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/dusting2.png" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/dusting.jpeg" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/stairs.jpg" }
          ];
      } else if (level === 'upper') {
          title = "UPPER LEVEL GALLERY";
          // MAP: Auto-Sized Masonry Layout
          // SWAPPED: Now contains Bedroom images
          images = [
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/br1.3.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/br2.4.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/br1.5.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/br2.6.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/br2.5.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/BR2.8.jpg" }
          ];
      } else {
          title = "EXTERIOR GALLERY"; 
          // MAP: Auto-Sized Masonry Layout
          images = [
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/exterior_4.JPG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/exterior.3.jpg" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/exterior.4.JPEG" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/exterior.4.jpg" },
              { url: "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/fall.jpg" }
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
      // ... (Rest of the function remains unchanged)
      if (type === 'wellness') {
        setModalData({
            title: "WELLNESS & NATURE",
            subtitle: "RESTORATIVE INFRASTRUCTURE",
            category: 'showcase',
            theme: 'light',
            modalLayout: 'default',
            maxWidth: 'max-w-7xl',
            headerClassName: "text-micron-eggplant-light",
            content: (
                <div className="flex flex-col gap-8 pb-4">
                    <div className="border-l-4 border-micron-eggplant-light pl-6 py-1">
                         <p className="text-base md:text-lg font-light text-zinc-600 leading-relaxed font-body">
                            Powered by a 177°F direct-use aquifer. Geothermal water flows through the home's radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                         </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
                        <ModalCard 
                            title="CONTRAST THERAPY" 
                            colorClass="bg-micron-eggplant-light"
                            icon={<Waves />} 
                            description={
                                <>
                                    <p>Alternating thermal exposure drives circulation to flush systemic inflammation and accelerate deep tissue recovery.</p>
                                    <p>The rapid temperature shift triggers a proven <span className="text-white font-bold">250% increase in dopamine</span>, delivering sustained alertness, mental clarity, and elevated mood.</p>
                                </>
                            }
                        />
                         <ModalCard 
                            title="WHOLE BODY VIBRATION" 
                            colorClass="bg-micron-grey1"
                            icon={<Activity />} 
                            description={
                                <>
                                    <p>Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat zero-gravity bone loss.</p>
                                    <p>By engaging 90% of muscle fibers (vs. 40% in standard training), it <span className="text-white font-bold">rapidly builds bone density</span>, counteracts neuropathy, and stimulates neuro-repair for improved mental health.</p>
                                </>
                            }
                        />
                         <ModalCard 
                            title="ORGANIC GARDEN" 
                            colorClass="bg-micron-green"
                            icon={<Sprout />} 
                            description={
                                <>
                                    <p>2025 research on the 'Soil-Plant-Gut Axis' confirms fresh-harvested produce delivers essential soil-based probiotics missing from sterilized commercial food.</p>
                                    <p>Homegrown crops <span className="text-white font-bold">retain up to 50% more nutrient density</span> than store-bought options, directly fueling the gut microbiome and immune system.</p>
                                </>
                            }
                        />
                    </div>
                </div>
            )
        });
      } else if (type === 'autonomous') {
        setModalData({
            title: "AUTONOMOUS SERVICE",
            subtitle: "LIVING LAB",
            category: 'showcase',
            theme: 'light', 
            maxWidth: 'max-w-6xl',
            content: (
                 <div className="flex flex-col gap-8">
                    <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed">
                        Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* CYBERCAB CARD */}
                        <div className="bg-black rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col gap-6 border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Car size={24} className="text-white/90" />
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">CYBERCAB</h3>
                                </div>
                                <div className="h-px w-full bg-white/20 mb-4" />
                                <p className="text-white/80 font-medium leading-relaxed text-lg">
                                    Tesla's first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously.
                                </p>
                            </div>
                            <div className="relative w-full h-48 md:h-64 mt-auto flex items-end justify-center">
                                <img 
                                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cybercab%20photpo.WEBP" 
                                    alt="Cybercab" 
                                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
                                />
                            </div>
                        </div>

                         {/* OPTIMUS CARD */}
                        <div className="bg-micron-eggplant-light rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col gap-6 border border-white/10 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Bot size={24} className="text-white/90" />
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">OPTIMUS</h3>
                                </div>
                                <div className="h-px w-full bg-white/20 mb-4" />
                                <p className="text-white/80 font-medium leading-relaxed text-lg">
                                    Tesla's Gen 3 humanoid — 5'8", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus manages property maintenance, perimeter monitoring, and routine service tasks within defined geofenced zones across the residence.
                                </p>
                            </div>
                            <div className="relative w-full h-48 md:h-64 mt-auto flex items-end justify-center">
                                <img 
                                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/tesla-optimus-gen-3-delay.png" 
                                    alt="Optimus" 
                                    className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
      } else if (type === 'history') {
         setModalData({
            title: "HISTORIC LEGACY",
            category: 'showcase',
            theme: 'light',
            maxWidth: 'max-w-6xl',
            content: (
                 <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch">
                        <div className="relative min-h-[400px] md:h-full w-full rounded-2xl overflow-hidden shadow-lg border border-black/10 group">
                             <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/old%20warm%20springs.webp" 
                                alt="Old Warm Springs" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                        </div>

                        <div className="bg-micron-eggplant rounded-2xl p-6 md:p-10 text-white shadow-lg border border-white/10 flex flex-col justify-center h-full">
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <History className="text-white/80" size={28} />
                                    <h4 className="text-2xl font-black uppercase tracking-tight text-white">Origins</h4>
                                </div>
                                <div className="font-medium leading-relaxed text-white/80 space-y-4 text-lg">
                                    <p>
                                        In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water.
                                    </p>
                                    <p>
                                        By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/20 mb-8" />

                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <TreeDeciduous className="text-white/80" size={28} />
                                    <h4 className="text-2xl font-black uppercase tracking-tight text-white">Continuity</h4>
                                </div>
                                <div className="font-medium leading-relaxed text-white/80 space-y-4 text-lg">
                                    <p>
                                        Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America.
                                    </p>
                                    <p>
                                        The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
      }
  };

  return (
    <section id="property" className="container mx-auto px-8 md:px-12 py-4 md:py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.0 }}
        >
            {/* 1. HEADER */}
            <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end gap-4 md:gap-12 border-b border-zinc-100 pb-4 md:pb-8">
                 <div className="flex-shrink-0">
                     <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
                     <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                         PROPERTY
                     </h2>
                 </div>
                 <div className="md:ml-auto max-w-2xl pl-4 md:pl-6 border-l-4 border-micron-eggplant-light/20">
                     <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-micron-eggplant-light mb-2 font-sans block">HISTORIC CONTEXT</h3>
                     <p className="text-base font-light text-zinc-600 leading-snug font-body">
                         A modest home within North America's oldest continuously operating geothermal district (est. 1890), tapping the nation's largest historic direct-use aquifer. <span className="font-bold text-zinc-900">Where the legacy of energy innovation converges with energy from the stars.</span>
                     </p>
                 </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatCard delay={0} className="bg-micron-eggplant rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] md:h-40 border border-white/10 cursor-pointer">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">1906</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Year Built</span>
                </StatCard>
                <StatCard delay={0.2} className="bg-micron-grey1 rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] md:h-40 border border-white/10 cursor-pointer">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3,374</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Square Feet</span>
                </StatCard>
                <StatCard delay={0.1} className="bg-micron-green rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] md:h-40 border border-white/10 cursor-pointer">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3 / 4</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Bed / Bath</span>
                </StatCard>
                <StatCard delay={0.3} className="bg-micron-eggplant-light rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] md:h-40 border border-white/10 cursor-pointer">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">1892</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Geothermal Rights</span>
                </StatCard>
            </div>

            {/* 3. LOCATION */}
            <div className="mb-12">
                 <div className="flex items-center gap-2 mb-4">
                      <MapPin className="text-micron-eggplant" size={16} />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant font-sans">LOCATION DETAILS</h3>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      <LocationPill delay={0} label="Micron HQ" time="15 min" color="bg-micron-green" icon={<Building2 size={16}/>} />
                      <LocationPill delay={0.4} label="Airport" time="10 min" color="bg-micron-eggplant" icon={<Plane size={16}/>} />
                      <LocationPill delay={0.1} label="Downtown" time="3 min" color="bg-micron-eggplant-light" icon={<Building2 size={16}/>} />
                      <LocationPill delay={0.5} label="St. Luke's" time="2 min" color="bg-micron-grey1" icon={<Stethoscope size={16}/>} />
                      <LocationPill delay={0.2} label="Capitol" time="5 min" color="bg-micron-grey2" icon={<Building2 size={16}/>} />
                      <LocationPill delay={0.6} label="Boise State" time="4 min" color="bg-micron-eggplant-light" icon={<GraduationCap size={16}/>} />
                      <LocationPill delay={0.3} label="River" time="1 min" color="bg-micron-green" icon={<Leaf size={16}/>} />
                 </div>
            </div>

            {/* 4. SPECIFICATIONS */}
            <div className="mb-12">
                 <div className="flex items-center gap-2 mb-4">
                      <Home className="text-micron-eggplant" size={16} />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant font-sans">RESIDENCE SPECIFICATIONS</h3>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <SpecCard 
                        title="MAIN LEVEL" 
                        icon={<Home />} 
                        gradient="bg-micron-grey2" 
                        delay={0}
                        items={[
                            "Foyer Entry",
                            "Living, Dining, & Fully Equipped Kitchen",
                            "Office w/ Ensuite Bath",
                            "French Door Access to Deck",
                            "Antiques & Art throughout"
                        ]} 
                        onGallery={() => openLevelGallery('main')} 
                      />
                      <SpecCard 
                        title="UPPER LEVEL" 
                        icon={<ArrowUp />} 
                        gradient="bg-micron-eggplant" 
                        delay={0.2}
                        items={[
                            "3 Bedrooms",
                            "2 Private En-Suite Baths",
                            "1 Bedroom Served by Hall Bath",
                            "Laundry Facilities"
                        ]} 
                        onGallery={() => openLevelGallery('upper')} 
                      />
                      <SpecCard 
                        title="GROUNDS" 
                        icon={<Grape />} 
                        gradient="bg-micron-green" 
                        delay={0.4}
                        items={[
                            "Mature Fruit Trees (Peach, Plum, Cherry)",
                            "Concord Grapevine",
                            "Fully Fenced Yard & ~200 sq ft Deck",
                            "Attached Carport via Private Alley"
                        ]} 
                        onGallery={() => openLevelGallery('grounds')} 
                      />
                 </div>
            </div>
            
            {/* 5. TECHNOLOGY, WELLNESS & HISTORY */}
            <div>
                 <div className="flex items-center gap-2 mb-4">
                      <Zap size={16} className="text-micron-eggplant" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant font-sans">TECHNOLOGY, WELLNESS & HISTORY</h3>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <InfoCard 
                        title="GEOTHERMAL & WELLNESS"
                        subtitle="NATURE"
                        icon={<Leaf size={24} />}
                        gradient="bg-micron-eggplant-light" 
                        delay={0.1}
                        text="Powered by a 177°F direct-use aquifer. Geothermal water flows through the home's radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine."
                        onClick={() => openInfoModal('wellness')}
                    />
                    <InfoCard 
                        title="AUTONOMOUS SECURITY & SERVICE"
                        subtitle="INTELLIGENCE"
                        icon={<Cpu size={24} />}
                        gradient="bg-micron-grey1" 
                        delay={0.3}
                        text="Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality."
                        onClick={() => openInfoModal('autonomous')}
                    />
                    <InfoCard 
                        title="NATIONAL REGISTER OF HISTORIC PLACES"
                        subtitle="LEGACY"
                        icon={<TreeDeciduous size={24} />}
                        gradient="bg-micron-eggplant"
                        delay={0.5}
                        text="Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity."
                        onClick={() => openInfoModal('history')}
                    />
                 </div>
            </div>

        </motion.div>
        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
}