
import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight } from 'lucide-react';
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

  const LocationPill = ({ label, time, color, icon }: any) => (
    <div className={`${color} rounded-xl p-3 flex flex-col justify-between items-start text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform cursor-default h-[80px] border border-white/10`}>
        <div className="opacity-80">{icon}</div>
        <div className="w-full">
            <div className="flex justify-between items-end w-full">
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{label}</span>
                <span className="text-sm font-black leading-none">{time}</span>
            </div>
        </div>
    </div>
  );

  const SpecCard = ({ title, icon, items, onGallery }: any) => (
      <div className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.2)] transition-shadow flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
              {icon}
              <h4 className="text-xl font-black uppercase tracking-tight text-zinc-900">{title}</h4>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
              {items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 font-medium leading-snug">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 mt-1.5 shrink-0" />
                      {item}
                  </li>
              ))}
          </ul>
          <button 
            onClick={onGallery}
            className="w-full py-3 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-colors flex items-center justify-center gap-2 group"
          >
              View Gallery
              <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
      </div>
  );

  return (
    <section id="property" className="container mx-auto px-4 md:px-12 py-8 md:py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.0 }}
        >
            {/* 1. HEADER */}
            <div className="mb-10 flex flex-col md:flex-row gap-8 md:gap-12 border-b border-zinc-100 pb-10">
                 <div className="flex-shrink-0">
                     <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
                     <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                         PROPERTY
                     </h2>
                 </div>
                 <div className="md:ml-auto max-w-2xl pl-6 border-l-4 border-micron-eggplant-light/20">
                     <h3 className="text-2xl font-bold uppercase tracking-tighter text-micron-eggplant-light mb-2 font-sans">HISTORIC CONTEXT</h3>
                     <p className="text-base font-light text-zinc-600 leading-snug font-body">
                         A modest home within North America's oldest continuously operating geothermal district (est. 1890), tapping the nation's largest historic direct-use aquifer. <span className="font-bold text-zinc-900">Where geothermal legacy meets autonomous future.</span>
                     </p>
                 </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="bg-micron-eggplant rounded-xl p-6 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform aspect-[2/1] md:aspect-auto md:h-40 border border-white/10">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-1 font-sans">1906</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Year Built</span>
                </div>
                <div className="bg-micron-grey1 rounded-xl p-6 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform aspect-[2/1] md:aspect-auto md:h-40 border border-white/10">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3,374</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Square Feet</span>
                </div>
                <div className="bg-micron-green rounded-xl p-6 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform aspect-[2/1] md:aspect-auto md:h-40 border border-white/10">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-1 font-sans">3 / 4</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Bed / Bath</span>
                </div>
                <div className="bg-micron-eggplant-light rounded-xl p-6 md:p-8 text-white text-center flex flex-col justify-center items-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-transform aspect-[2/1] md:aspect-auto md:h-40 border border-white/10">
                    <span className="text-4xl md:text-5xl font-black tracking-tighter mb-1 font-sans">1892</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 font-sans">Geothermal Rights</span>
                </div>
            </div>

            {/* 3. LOCATION */}
            <div className="mb-12">
                 <div className="flex items-center gap-2 mb-4">
                      <MapPin className="text-micron-eggplant" size={16} />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant font-sans">LOCATION DETAILS</h3>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      <LocationPill label="Micron HQ" time="15 min" color="bg-micron-green" icon={<Building2 size={16}/>} />
                      <LocationPill label="Airport" time="10 min" color="bg-micron-eggplant" icon={<Plane size={16}/>} />
                      <LocationPill label="Downtown" time="3 min" color="bg-micron-eggplant-light" icon={<Building2 size={16}/>} />
                      <LocationPill label="St. Luke's" time="2 min" color="bg-micron-grey1" icon={<Stethoscope size={16}/>} />
                      <LocationPill label="Capitol" time="5 min" color="bg-micron-grey2" icon={<Building2 size={16}/>} />
                      <LocationPill label="Boise State" time="4 min" color="bg-black" icon={<GraduationCap size={16}/>} />
                      <LocationPill label="River" time="1 min" color="bg-micron-green" icon={<Leaf size={16}/>} />
                 </div>
            </div>

            {/* 4. SPECIFICATIONS */}
            <div>
                 <div className="flex items-center gap-2 mb-4">
                      <Home className="text-micron-eggplant" size={16} />
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-micron-eggplant font-sans">RESIDENCE SPECIFICATIONS</h3>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <SpecCard 
                        title="MAIN LEVEL" 
                        icon={<Home className="text-micron-green" size={24}/>} 
                        items={[
                            "Foyer Entry",
                            "Living / Dining w/ Fireplaces",
                            "Office on Ground Deck",
                            "Guest Down / Access to Deck",
                            "Antique Fir Throughout"
                        ]} 
                        onGallery={() => openLevelGallery('main')} 
                      />
                      <SpecCard 
                        title="UPPER LEVEL" 
                        icon={<ArrowUp className="text-micron-eggplant-light" size={24}/>} 
                        items={[
                            "3 Bedrooms",
                            "2 Baths (En Suite Primary)",
                            "Playroom / Executive Retreat",
                            "Laundry Facilities"
                        ]} 
                        onGallery={() => openLevelGallery('upper')} 
                      />
                      <SpecCard 
                        title="GROUNDS" 
                        icon={<Leaf className="text-micron-eggplant" size={24}/>} 
                        items={[
                            "Historic East End / Warm Springs",
                            "Covered Carport",
                            "Auto Court for +10 Cars / Events",
                            "Geothermal Jacuzzi on Private Way"
                        ]} 
                        onGallery={() => openLevelGallery('grounds')} 
                      />
                 </div>
            </div>

        </motion.div>
        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
