
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
                <div className="flex flex-col gap-8 pb-4">
                    {/* Intro */}
                    <div className="border-l-4 border-micron-green pl-6 py-1">
                        <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-body">
                            Geothermal spa utilizing the district's 177°F source. The home is heated through geothermal radiant heat as well as the hot tub. The grounds feature mature producing fruit trees and a Concord grapevine.
                        </p>
                    </div>

                    {/* Three Cards - UPDATED: Consistent height, lighter grey, square alignment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                        {/* Card 1: Blue */}
                        <div className="
                            bg-micron-eggplant-light/90 text-white 
                            p-8 rounded-3xl shadow-lg 
                            flex flex-col gap-6 
                            h-full aspect-auto md:aspect-square justify-between
                            group hover:-translate-y-2 hover:shadow-2xl hover:bg-micron-eggplant-light transition-all duration-300
                            border border-white/10 hover:border-white/30
                        ">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <Waves size={36} className="text-white/80 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-4 text-white/90">CONTRAST THERAPY</h3>
                                <div className="w-16 h-1 bg-white/30 group-hover:bg-white transition-colors mb-4 rounded-full" />
                            </div>
                            
                            <div className="space-y-4 text-sm md:text-base font-medium leading-relaxed text-white/70 group-hover:text-white/80 transition-colors">
                                <p>Alternating thermal exposure drives circulation to flush systemic inflammation and <strong className="text-white">accelerate deep tissue recovery</strong>.</p>
                                <p>The rapid temperature shift triggers a proven <strong className="text-white">250% increase in dopamine</strong>, delivering sustained alertness, mental clarity, and elevated mood.</p>
                            </div>
                        </div>

                        {/* Card 2: Lighter Grey (Updated from grey1 to grey2) */}
                        <div className="
                            bg-micron-grey2 text-white 
                            p-8 rounded-3xl shadow-lg 
                            flex flex-col gap-6 
                            h-full aspect-auto md:aspect-square justify-between
                            group hover:-translate-y-2 hover:shadow-2xl hover:bg-zinc-500 transition-all duration-300
                            border border-white/10 hover:border-white/30
                        ">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <Activity size={36} className="text-white/80 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-4 text-white/90">WHOLE BODY VIBRATION</h3>
                                <div className="w-16 h-1 bg-white/30 group-hover:bg-white transition-colors mb-4 rounded-full" />
                            </div>

                            <div className="space-y-4 text-sm md:text-base font-medium leading-relaxed text-white/70 group-hover:text-white/80 transition-colors">
                                <p>Invented in 1960 by Vladimir Nazarov for the <strong className="text-white">Soviet Space Program</strong> to combat zero-gravity bone loss.</p>
                                <p>By engaging <strong className="text-white">90% of muscle fibers</strong> (vs 40% in standard training), it rapidly builds bone density and stimulates neuro-repair.</p>
                            </div>
                        </div>

                        {/* Card 3: Green (Unchanged color) */}
                        <div className="
                            bg-micron-green text-white 
                            p-8 rounded-3xl shadow-lg 
                            flex flex-col gap-6 
                            h-full aspect-auto md:aspect-square justify-between
                            group hover:-translate-y-2 hover:shadow-2xl hover:bg-green-700 transition-all duration-300
                            border border-white/10 hover:border-white/30
                        ">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <Sprout size={36} className="text-white/80 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-4 text-white/90">ORGANIC GARDEN</h3>
                                <div className="w-16 h-1 bg-white/30 group-hover:bg-white transition-colors mb-4 rounded-full" />
                            </div>
                            
                            <div className="space-y-4 text-sm md:text-base font-medium leading-relaxed text-white/70 group-hover:text-white/80 transition-colors">
                                <p>2025 research on the <strong className="text-white">"Soil-Plant-Gut Axis"</strong> confirms fresh-harvested produce delivers essential soil-based probiotics.</p>
                                <p>Homegrown crops retain up to <strong className="text-white">50% of nutrient density</strong> than store-bought options, directly fueling the gut microbiome.</p>
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
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white/90">C.W. MOORE & THE DISTRICT</h3>
                            </div>
                            <div className="h-px w-full bg-white/20 mb-6"></div>
                            <div className="space-y-6 text-base md:text-lg leading-relaxed font-medium text-white/70">
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
                            {/* UPDATED: New Image URL and removed text overlay */}
                            <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/philip.starck1982_horse-drawn_carriage_arriving_at_English_coun_fe12721f-0e1e-4a80-a919-9d7bbea63aea%20copy.png" 
                                alt="Historic Warm Springs" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            )
        });
      } else if (type === 'autonomous') {
        setModalData({
            title: "AUTONOMOUS SERVICE",
            subtitle: "INTELLIGENCE",
            category: 'showcase',
            theme: 'light',
            maxWidth: 'max-w-7xl',
            content: (
                <div className="flex flex-col gap-8">
                    <div className="border-l-4 border-micron-black pl-6 py-1">
                        {/* UPDATED: Text content updated, font size reduced to text-base md:text-lg */}
                        <p className="text-base md:text-lg font-light text-zinc-600 leading-relaxed font-body">
                            Service and security via Cybercab, Optimus, and Starlink. A functional proving ground where abstract technology becomes a seamless, daily reality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* CYBERCAB CARD - UPDATED: Decreased Min-Height to 450px (approx 30% reduction from 650) */}
                        <div className="bg-micron-black text-white rounded-2xl p-8 shadow-xl flex flex-col min-h-[450px]">
                            <div className="flex items-center gap-3 mb-6">
                                <Car size={24} className="text-white" />
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white/90">CYBERCAB</h3>
                            </div>
                            <div className="h-px w-full bg-white/20 mb-6"></div>
                            <p className="text-white/70 text-base mb-8 leading-relaxed">
                                Tesla's first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously.
                            </p>
                            {/* UPDATED: Changed to aspect-video (landscape) and removed flex-1/min-h to prevent cutoff */}
                            <div className="mt-auto rounded-xl overflow-hidden w-full aspect-video relative">
                                <img 
                                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cybercab%20photpo.WEBP" 
                                    alt="Tesla Cybercab" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* OPTIMUS CARD - UPDATED: Changed bg to bg-micron-grey1 (Dark Gray) */}
                        <div className="bg-micron-grey1 text-white rounded-2xl p-8 shadow-xl flex flex-col min-h-[450px]">
                            <div className="flex items-center gap-3 mb-6">
                                <Bot size={24} className="text-white" />
                                <h3 className="text-3xl font-black uppercase tracking-tight text-white/90">OPTIMUS</h3>
                            </div>
                            <div className="h-px w-full bg-white/20 mb-6"></div>
                            <p className="text-white/70 text-base mb-8 leading-relaxed">
                                Tesla's Gen 3 humanoid — 5'8", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus manages property maintenance, perimeter monitoring, and routine service tasks within defined geofenced zones across the residence.
                            </p>
                            {/* UPDATED: Changed to aspect-video (landscape) and removed flex-1/min-h to prevent cutoff */}
                            <div className="mt-auto rounded-xl overflow-hidden w-full aspect-video relative">
                                <img 
                                    src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/tesla-optimus-gen-3-delay.png" 
                                    alt="Tesla Optimus Robot" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
      }
  };

  const StatCard = ({ children, delay = 0, className }: any) => (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={className}
      >
          {children}
      </motion.div>
  );

  const LocationPill = ({ label, time, color, icon, delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`${color} rounded-xl p-3 flex flex-col justify-between items-start text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform cursor-default h-[80px] border border-white/10`}
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
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className={`rounded-2xl p-5 md:p-6 flex flex-col h-full cursor-pointer group ${gradient} text-white border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] transition-all ${className}`}
        onClick={onGallery}
      >
          <div className="flex items-center gap-3 mb-4">
              <div className={`text-white/70 group-hover:text-white transition-colors duration-300`}>
                  {React.cloneElement(icon, { size: 24 })}
              </div>
              <h4 className={`text-2xl font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors`}>{title}</h4>
          </div>
          <ul className="space-y-3 mb-6 flex-1">
              {items.map((item: string, i: number) => (
                  <li key={i} className={`flex items-start gap-3 text-sm md:text-base font-medium leading-snug text-white`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-white opacity-50`} />
                      {item}
                  </li>
              ))}
          </ul>
          
          <button 
            // UPDATED: Reduced padding (py-1.5), font size (text-[9px]), and icon size for 50% smaller visual footprint
            className={`w-full py-1.5 border rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group-hover:border-white/60 group-hover:text-white group-hover:bg-white/10 border-white/20 text-white/70 hover:bg-white/5`}
          >
              View Gallery
              {/* UPDATED: Reduced icon size to 12 */}
              <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
      </motion.div>
  );

  const InfoCard = ({ title, subtitle, icon, text, className, gradient, onClick, delay = 0 }: any) => (
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        whileHover={{ y: -5, scale: 1.01 }}
        onClick={onClick}
        className={`${gradient} backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] transition-all h-full cursor-pointer group text-white relative ${className}`}
      >
          <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                   <div className={`text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300`}>{icon}</div>
                   {/* UPDATED: Reduced font size to text-base md:text-lg to fit long titles like National Register */}
                   <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors leading-tight">{title}</h4>
               </div>
          </div>
          <p className="text-sm md:text-base text-white font-medium leading-relaxed mb-8">
             {text}
          </p>
          
          <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                  {subtitle}
              </span>
              <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={20} />
              </div>
          </div>
      </motion.div>
  );

  return (
    // UPDATED: Padding increased to px-8 on mobile, py-4 on mobile to close gap to Prototype
    <section id="property" className="container mx-auto px-8 md:px-12 py-4 md:py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5 }}
        >
            {/* 1. HEADER - UPDATED: Reduced spacing on mobile (gap-4, mb-5, pb-5) */}
            <div className="mb-5 md:mb-10 flex flex-col md:flex-row gap-4 md:gap-12 border-b border-zinc-100 pb-5 md:pb-10">
                 <div className="flex-shrink-0">
                     <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
                     <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                         PROPERTY
                     </h2>
                 </div>
                 {/* UPDATED: Reduced pl-6 to pl-4 on mobile for tightness */}
                 <div className="md:ml-auto max-w-2xl pl-4 md:pl-6 border-l-4 border-micron-eggplant-light/20">
                     <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-micron-eggplant-light mb-2 font-sans block">HISTORIC CONTEXT</h3>
                     <p className="text-base font-light text-zinc-600 leading-snug font-body">
                         {/* UPDATED: "stars" lowercase */}
                         A modest home within North America's oldest continuously operating geothermal district (est. 1890), tapping the nation's largest historic direct-use aquifer. <span className="font-bold text-zinc-900">Where the legacy of energy innovation converges with energy from the stars.</span>
                     </p>
                 </div>
            </div>

            {/* 2. STATS GRID - UPDATED: 2 Columns on Mobile, P-4 Padding, Responsive Text Size, Animated */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <StatCard delay={0} className="bg-micron-eggplant rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform md:h-40 border border-white/10">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">1906</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Year Built</span>
                </StatCard>
                <StatCard delay={0.1} className="bg-micron-grey1 rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform md:h-40 border border-white/10">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3,374</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Square Feet</span>
                </StatCard>
                <StatCard delay={0.2} className="bg-micron-green rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform md:h-40 border border-white/10">
                    <span className="text-3xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3 / 4</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Bed / Bath</span>
                </StatCard>
                <StatCard delay={0.3} className="bg-micron-eggplant-light rounded-xl p-4 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform md:h-40 border border-white/10">
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
                      <LocationPill delay={0.05} label="Airport" time="10 min" color="bg-micron-eggplant" icon={<Plane size={16}/>} />
                      <LocationPill delay={0.1} label="Downtown" time="3 min" color="bg-micron-eggplant-light" icon={<Building2 size={16}/>} />
                      <LocationPill delay={0.15} label="St. Luke's" time="2 min" color="bg-micron-grey1" icon={<Stethoscope size={16}/>} />
                      <LocationPill delay={0.2} label="Capitol" time="5 min" color="bg-micron-grey2" icon={<Building2 size={16}/>} />
                      {/* UPDATED: Changed from bg-black to bg-micron-eggplant-light */}
                      <LocationPill delay={0.25} label="Boise State" time="4 min" color="bg-micron-eggplant-light" icon={<GraduationCap size={16}/>} />
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
                        delay={0.15}
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
                        delay={0.3}
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
                        gradient="bg-micron-green" 
                        delay={0}
                        text="Geothermal spa utilizing the district's 177°F source. The home is heated through geothermal radiant heat as well as the hot tub. The grounds feature mature producing fruit trees and a Concord grapevine."
                        onClick={() => openInfoModal('wellness')}
                    />
                    <InfoCard 
                        title="AUTONOMOUS SERVICE"
                        subtitle="INTELLIGENCE"
                        icon={<Cpu size={24} />}
                        // UPDATED: Restored to original Light Blue/Eggplant Light
                        gradient="bg-micron-eggplant-light" 
                        delay={0.15}
                        text="Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality."
                        onClick={() => openInfoModal('autonomous')}
                    />
                    <InfoCard 
                        title="NATIONAL REGISTER OF HISTORIC PLACES"
                        subtitle="LEGACY"
                        icon={<TreeDeciduous size={24} />}
                        gradient="bg-micron-eggplant"
                        delay={0.3}
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
