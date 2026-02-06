
import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape, Thermometer, ShieldCheck, History } from 'lucide-react';
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
            subtitle: "NATURE'S ENERGY",
            category: 'showcase',
            theme: 'light',
            modalLayout: 'default',
            content: (
                <div className="flex flex-col gap-6">
                    <p className="text-xl font-light text-zinc-600 leading-relaxed">
                        The property is connected to the Boise Warm Springs Water District, the oldest geothermal heating district in North America (est. 1890).
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-micron-green/10 p-5 rounded-xl border border-micron-green/20">
                            <div className="flex items-center gap-2 mb-2 text-micron-green">
                                <Thermometer size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">Thermal Source</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Natural 177°F water pumped directly from the aquifer to heat the home and spa amenities.</p>
                        </div>
                        <div className="bg-micron-green/10 p-5 rounded-xl border border-micron-green/20">
                             <div className="flex items-center gap-2 mb-2 text-micron-green">
                                <Leaf size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">Living Grounds</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Mature ecosystem featuring producing peach, plum, and cherry trees alongside a historic Concord grapevine.</p>
                        </div>
                    </div>
                </div>
            )
        });
      } else if (type === 'autonomous') {
        setModalData({
            title: "AUTONOMOUS SERVICE",
            subtitle: "INTELLIGENT INFRASTRUCTURE",
            category: 'showcase',
            theme: 'light', 
            content: (
                 <div className="flex flex-col gap-6">
                    <p className="text-xl font-light text-zinc-600 leading-relaxed">
                        A functional proving ground where abstract technology becomes a seamless, daily reality. The residence is mapped for high-precision autonomous navigation.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-micron-eggplant-light/10 p-5 rounded-xl border border-micron-eggplant-light/20">
                            <div className="flex items-center gap-2 mb-2 text-micron-eggplant-light">
                                <Car size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">Cybercab Logistics</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Dedicated drop-off and charging integration for autonomous transport of guests and supplies.</p>
                        </div>
                        <div className="bg-micron-eggplant-light/10 p-5 rounded-xl border border-micron-eggplant-light/20">
                             <div className="flex items-center gap-2 mb-2 text-micron-eggplant-light">
                                <Bot size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">Optimus Integration</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Service layers operated by humanoid robotics, from security monitoring to housekeeping support.</p>
                        </div>
                    </div>
                </div>
            )
        });
      } else if (type === 'history') {
         setModalData({
            title: "HISTORIC REGISTER",
            subtitle: "WARM SPRINGS AVENUE",
            category: 'showcase',
            theme: 'light',
            content: (
                 <div className="flex flex-col gap-6">
                    <p className="text-xl font-light text-zinc-600 leading-relaxed">
                        Located on Boise's most prestigious historic corridor, anchored by the homes of the city's founders.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-micron-eggplant/10 p-5 rounded-xl border border-micron-eggplant/20">
                            <div className="flex items-center gap-2 mb-2 text-micron-eggplant">
                                <History size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">C.W. Moore House</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Neighboring the 1891 mansion of Christopher W. Moore, a founder of the First National Bank of Idaho.</p>
                        </div>
                        <div className="bg-micron-eggplant/10 p-5 rounded-xl border border-micron-eggplant/20">
                             <div className="flex items-center gap-2 mb-2 text-micron-eggplant">
                                <ShieldCheck size={20} />
                                <h4 className="font-bold uppercase tracking-wider text-sm">Preservation</h4>
                            </div>
                            <p className="text-zinc-700 text-sm">Maintained in accordance with National Register standards, preserving the architectural legacy of the Western frontier.</p>
                        </div>
                    </div>
                </div>
            )
        });
      }
  };

  const StatCard = ({ children, delay = 0, className }: any) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        // UPDATED: Added whileHover for micro-interaction
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
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        // UPDATED: Added whileHover for micro-interaction
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
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        // UPDATED: Removed transition-all from className to prevent jagged movement
        className={`rounded-2xl p-5 md:p-6 flex flex-col h-full cursor-pointer group ${gradient} text-white border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] transition-shadow duration-300 ${className}`}
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
          
          {/* UPDATED: Replaced button with bottom-right aligned text and arrow matching InfoCard style */}
          <div className="mt-auto flex justify-end items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">
                  GALLERY
              </span>
              <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight size={20} />
              </div>
          </div>
      </motion.div>
  );

  const InfoCard = ({ title, subtitle, icon, text, className, gradient, onClick, delay = 0 }: any) => (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -5, scale: 1.01 }}
        onClick={onClick}
        // UPDATED: Reduced padding (p-5 md:p-6) and min-height (min-h-[240px]) to reduce size by ~20%
        className={`${gradient} backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] transition-shadow duration-300 h-full min-h-[240px] cursor-pointer group text-white relative flex flex-col ${className}`}
      >
          <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                   <div className={`text-white/70 group-hover:text-white group-hover:scale-110 transition-transform duration-300`}>{icon}</div>
                   <h4 className="text-base md:text-lg font-black uppercase tracking-tight text-white/70 group-hover:text-white transition-colors leading-tight">{title}</h4>
               </div>
          </div>
          
          <div className="h-px w-full bg-white/20 mb-6 group-hover:bg-white/40 transition-colors" />

          {/* UPDATED: Reduced bottom margin (mb-4) to tighten spacing */}
          <p className="text-sm md:text-base text-white font-medium leading-relaxed mb-4 flex-1">
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
      </motion.div>
  );

  return (
    <section id="property" className="container mx-auto px-8 md:px-12 py-4 md:py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.0 }}
        >
            {/* 1. HEADER */}
            <div className="mb-5 md:mb-10 flex flex-col md:flex-row gap-4 md:gap-12 border-b border-zinc-100 pb-5 md:pb-10">
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
                {/* UPDATED: Removed CSS transforms to prevent conflict with Framer Motion */}
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
                      {/* UPDATED: Removed CSS transforms */}
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
                        gradient="bg-micron-green" 
                        delay={0.1}
                        text="Geothermal spa utilizing the district's 177°F source. The home is heated through geothermal radiant heat as well as the hot tub. The grounds feature mature producing fruit trees and a Concord grapevine."
                        onClick={() => openInfoModal('wellness')}
                    />
                    <InfoCard 
                        title="AUTONOMOUS SERVICE"
                        subtitle="INTELLIGENCE"
                        icon={<Cpu size={24} />}
                        gradient="bg-micron-eggplant-light" 
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
