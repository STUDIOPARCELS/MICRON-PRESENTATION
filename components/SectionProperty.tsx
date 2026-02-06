
import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape, Thermometer, ShieldCheck, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { BentoCard } from './BentoCard'; // Imported BentoCard
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

  // Helper for Modal Cards
  const ModalCard = ({ title, description, colorClass, icon, image }: any) => (
      <div className={`${colorClass} rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col h-full relative overflow-hidden group border border-white/10`}>
          {image && (
               <>
                  <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
               </>
          )}
          <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                  {icon && React.cloneElement(icon, { size: 24, className: "text-white/90" })}
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none drop-shadow-md">{title}</h3>
              </div>
               <p className="text-sm md:text-base font-medium leading-relaxed text-white/90 drop-shadow-sm">
                  {description}
              </p>
          </div>
      </div>
  );

  const openInfoModal = (type: 'wellness' | 'autonomous' | 'history') => {
      if (type === 'wellness') {
        setModalData({
            title: "WELLNESS & NATURE",
            subtitle: "RESTORATIVE INFRASTRUCTURE",
            category: 'showcase',
            theme: 'light',
            modalLayout: 'default',
            maxWidth: 'max-w-7xl',
            content: (
                <div className="flex flex-col gap-8">
                    <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed">
                        Powered by a 177°F direct-use aquifer. Geothermal water flows through the home's radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ModalCard 
                            title="CONTRAST THERAPY" 
                            colorClass="bg-micron-eggplant-light"
                            icon={<Waves />} 
                            description="Alternating thermal exposure drives circulation to flush systemic inflammation and accelerate deep tissue recovery. The rapid temperature shift triggers a proven 250% increase in dopamine, delivering sustained alertness, mental clarity, and elevated mood."
                        />
                         <ModalCard 
                            title="WHOLE BODY VIBRATION" 
                            colorClass="bg-micron-grey1"
                            icon={<Activity />} 
                            description="Invented in 1960 by Vladimir Nazarov for the Soviet Space Program to combat zero-gravity bone loss. By engaging 90% of muscle fibers (vs. 40% in standard training), it rapidly builds bone density, counteracts neuropathy, and stimulates neuro-repair for improved mental health."
                        />
                         <ModalCard 
                            title="ORGANIC GARDEN" 
                            colorClass="bg-micron-green"
                            icon={<Sprout />} 
                            description="2025 research on the 'Soil-Plant-Gut Axis' confirms fresh-harvested produce delivers essential soil-based probiotics missing from sterilized commercial food. Homegrown crops retain up to 50% more nutrient density than store-bought options, directly fueling the gut microbiome and immune system."
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
                         <ModalCard 
                            title="CYBERCAB" 
                            colorClass="bg-black"
                            icon={<Car />} 
                            image="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            description="Tesla's first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously."
                        />
                         <ModalCard 
                            title="OPTIMUS" 
                            colorClass="bg-micron-eggplant-light"
                            icon={<Bot />} 
                            image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop"
                            description="Tesla's Gen 3 humanoid — 5'8\", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus manages property maintenance, perimeter monitoring, and routine service tasks within defined geofenced zones across the residence."
                        />
                    </div>
                </div>
            )
        });
      } else if (type === 'history') {
         setModalData({
            title: "HISTORIC LEGACY",
            subtitle: "1890 - PRESENT",
            category: 'showcase',
            theme: 'light',
            maxWidth: 'max-w-6xl',
            content: (
                 <div className="flex flex-col gap-6">
                    {/* UPDATED: Split grid with square image and stacked text tiles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                        {/* Tile 1: Square Image */}
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-lg border border-black/10 group">
                             <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/old%20warm%20springs.webp" 
                                alt="Old Warm Springs" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             />
                             {/* REMOVED Gradient Overlay for brightness */}
                        </div>

                        {/* Right Column: Stacked Text Tiles */}
                        <div className="flex flex-col gap-6 h-full">
                             {/* Tile 2: Origins */}
                             <div className="bg-micron-eggplant rounded-2xl p-6 md:p-8 text-white shadow-lg border border-white/10 flex flex-col justify-center flex-1">
                                <div className="flex items-center gap-3 mb-4">
                                    <History className="text-white/80" size={24} />
                                    <h4 className="text-xl font-black uppercase tracking-tight text-white/90">Origins</h4>
                                </div>
                                 <p className="font-medium leading-relaxed text-white/80">
                                    In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water. By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.
                                 </p>
                             </div>

                             {/* Tile 3: Continuity */}
                             <div className="bg-micron-grey1 rounded-2xl p-6 md:p-8 text-white shadow-lg border border-white/10 flex flex-col justify-center flex-1">
                                 <div className="flex items-center gap-3 mb-4">
                                    <TreeDeciduous className="text-white/80" size={24} />
                                    <h4 className="text-xl font-black uppercase tracking-tight text-white/90">Continuity</h4>
                                 </div>
                                 <p className="font-medium leading-relaxed text-white/80">
                                    Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America. The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.
                                 </p>
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
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} // UPDATED: once: true to freeze
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
        viewport={{ once: true, amount: 0.2 }} // UPDATED: once: true to freeze
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

  // UPDATED: Using BentoCard for consistency and "Bento" look
  const SpecCard = ({ title, icon, items, onGallery, className, gradient = "bg-zinc-900", delay = 0 }: any) => (
      <BentoCard 
        gradient={gradient}
        delay={delay}
        onClick={onGallery}
        hoverEffect={true}
        // Force viewport once true to prevent re-animation on modal open/close (layout shifts)
        viewport={{ once: true, amount: 0.1 }} 
        textColor="text-white"
        borderColor="border-white/10"
        className={`flex flex-col h-full ${className}`}
        hideArrow={true} // We use custom arrow placement
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

  // UPDATED: Using BentoCard for consistency
  const InfoCard = ({ title, subtitle, icon, text, className, gradient, image, onClick, delay = 0 }: any) => (
      <BentoCard 
        gradient={gradient}
        delay={delay}
        onClick={onClick}
        hoverEffect={true}
        // Force viewport once true to prevent re-animation on modal open/close
        viewport={{ once: true, amount: 0.1 }}
        textColor="text-white"
        borderColor="border-white/10"
        className={`flex flex-col h-full min-h-[240px] relative ${className}`}
        hideArrow={true}
      >
          {/* OPTIONAL BACKGROUND IMAGE */}
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

  return (
    <section id="property" className="container mx-auto px-8 md:px-12 py-4 md:py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            // UPDATED: Set viewport.once to true to prevent entire section from re-animating/shifting when modal opens/closes
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.0 }}
        >
            {/* 1. HEADER */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end gap-4 md:gap-12 border-b border-zinc-100 pb-8">
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
                        // UPDATED: Changed from bg-micron-grey2 to bg-micron-grey1 to match screenshot Dark Gray
                        gradient="bg-micron-grey1" 
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
