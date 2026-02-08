import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape, Thermometer, ShieldCheck, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { BentoCard } from './BentoCard'; 
import { ModalContent, GalleryItem } from '../types';

// --- CONFIGURATION ---
const BUCKET_BASE_URL = "https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE";

// Helper to build URL based on folder presence
const buildUrl = (folder: string, filename: string) => {
    // UPDATED: Encode folder and filename to handle spaces (e.g., "MAIN FLOOR" -> "MAIN%20FLOOR")
    const encodedFolder = folder ? encodeURIComponent(folder) : '';
    const encodedFile = encodeURIComponent(filename);
    // If folder is empty, return path from root, otherwise add folder slash
    const path = encodedFolder ? `${encodedFolder}/${encodedFile}` : encodedFile;
    return `${BUCKET_BASE_URL}/${path}`;
};

// --- HELPER COMPONENTS ---

const StatCard = ({ children, delay = 0, className }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.6)" }}
    className={`${className} shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]`}
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
    whileHover={{ y: -5, scale: 1.02, boxShadow: "0 35px 60px -12px rgba(0, 0, 0, 0.6)" }}
    className={`${color} rounded-xl p-3 flex flex-col justify-between items-start text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] cursor-default h-[80px] border border-white/10`}
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

const ModalCard = ({ title, description, colorClass, icon, image }: any) => (
  <div className={`${colorClass} rounded-2xl p-6 text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group border border-white/10`}>
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
      
      const galleryConfig = {
          main: {
              // UPDATED: Using MAIN FLOOR images
              folder: "MAIN FLOOR", 
              files: [
                  "IMG_0701.JPEG",
                  "IMG_0705.JPEG",
                  "IMG_0709 copy.jpg",
                  "IMG_0710.JPEG",
                  "IMG_0735.JPEG",
                  "IMG_0736.JPEG",
                  "IMG_0737.JPEG",
                  "IMG_0738.JPEG",
                  "IMG_0761.JPEG",
                  "LIVING.0.jpg",
                  "dining.2.JPEG",
                  "dining.6.JPEG",
                  "entry.0.JPEG",
                  "entry.1.JPEG",
                  "kitchen.1.jpg",
                  "living.3.JPEG",
                  "living.4.JPEG",
                  "living.5.JPEG",
                  "living.9.JPEG",
                  "office.1.JPEG",
                  "office.3.JPEG"
              ]
          },
          upper: {
              folder: "UPPER FLOOR", 
              files: [
                  "3rd BA_2.JPEG",
                  "BR1.7.jpg",
                  "BR2.7.JPEG",
                  "BR2_8.jpg",
                  "IMG_0728.JPEG",
                  "MABA.JPEG",
                  "br1.6.JPEG",
                  "br2.3.JPEG",
                  "br3_0.jpg",
                  "dusting.jpeg",
                  "dusting2.png",
                  "stairs.jpg"
              ]
          },
          grounds: {
              folder: "GROUNDS", 
              files: [
                  "GARDEN.2.jpg",
                  "IMG_0304.JPEG",
                  "back_yard_1.JPEG",
                  "exterior.3.jpg",
                  "exterior.4.JPEG",
                  "exterior.4.jpg",
                  "exterior_3.JPG",
                  "exterior_4.JPG",
                  "fall.jpg",
                  "front.winter.png",
                  "garden.10.JPEG",
                  "night.jpg"
              ]
          }
      };

      const config = galleryConfig[level];
      
      if (level === 'main') title = "MAIN LEVEL";
      if (level === 'upper') title = "UPPER LEVEL";
      if (level === 'grounds') title = "EXTERIOR";

      const images: GalleryItem[] = config.files.map(filename => ({
          url: buildUrl(config.folder, filename),
          // Removing manual aspect class to rely on grid layout
          className: "aspect-[4/3]",
          objectFit: 'contain'
      }));

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
                            colorClass="bg-micron-green"
                            icon={<Activity />} 
                            description={
                                <>
                                    <p>Harmonic vibration plates stimulate lymphatic drainage and neuromuscular activation.</p>
                                    <p>Used by elite athletes for rapid recovery and bone density retention. A passive workout for the cellular system.</p>
                                </>
                            }
                        />
                         <ModalCard 
                            title="LIVING SYSTEMS" 
                            colorClass="bg-micron-eggplant"
                            icon={<Sprout />} 
                            description={
                                <>
                                    <p>The property is an active botanical ecosystem. Mature fruit trees, geothermal heating, and organic soil management.</p>
                                    <p>Nature is not a backdrop; it is a participating member of the household health stack.</p>
                                </>
                            }
                        />
                    </div>
                </div>
            )
        });
      } else if (type === 'autonomous') {
          setModalData({
            title: "INTELLIGENT INFRASTRUCTURE",
            subtitle: "THE INVISIBLE LAYER",
            category: 'showcase',
            theme: 'light',
            modalLayout: 'default',
            maxWidth: 'max-w-7xl',
            headerClassName: "text-micron-eggplant",
            content: (
                <div className="flex flex-col gap-8 pb-4">
                     <div className="border-l-4 border-micron-eggplant pl-6 py-1">
                         <p className="text-base md:text-lg font-light text-zinc-600 leading-relaxed font-body">
                            The residence is retrofitted with a private, secure sensor layer. This infrastructure enables Optimus and Cybercab to navigate the property with millimeter precision while maintaining total privacy for guests.
                         </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <ModalCard 
                            title="SENSOR FUSION" 
                            colorClass="bg-micron-eggplant"
                            icon={<Cpu />} 
                            description={
                                <>
                                    <p>Lidar, radar, and optical sensors map the environment in real-time. This data remains local, processed on-site by Micron memory stacks.</p>
                                </>
                            }
                        />
                         <ModalCard 
                            title="SECURE PERIMETER" 
                            colorClass="bg-micron-grey1"
                            icon={<ShieldCheck />} 
                            description={
                                <>
                                    <p>Autonomous security protocols monitor the grounds 24/7. Physical and digital security are integrated into a single dashboard.</p>
                                </>
                            }
                        />
                    </div>
                </div>
            )
          });
      } else if (type === 'history') {
          setModalData({
            title: "HISTORIC PROVENANCE",
            subtitle: "1906 - PRESENT",
            category: 'showcase',
            theme: 'light',
            modalLayout: 'default',
            maxWidth: 'max-w-7xl',
            headerClassName: "text-zinc-800",
            content: (
                <div className="flex flex-col gap-8 pb-4">
                     <div className="border-l-4 border-zinc-800 pl-6 py-1">
                         <p className="text-base md:text-lg font-light text-zinc-600 leading-relaxed font-body">
                            Built in 1906 on Warm Springs Avenue, this home was among the first in the nation to utilize geothermal heating. It stands as a testament to Boise's legacy of innovation.
                         </p>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <ModalCard 
                            title="WARM SPRINGS" 
                            colorClass="bg-zinc-800"
                            icon={<Thermometer />} 
                            description={
                                <>
                                    <p>The district is named for the natural hot springs that flow beneath it. A resource utilized for over a century for clean, sustainable heat.</p>
                                </>
                            }
                        />
                         <ModalCard 
                            title="PRESERVATION" 
                            colorClass="bg-zinc-600"
                            icon={<History />} 
                            description={
                                <>
                                    <p>Meticulously restored to preserve its architectural integrity while accommodating modern living standards. A bridge between the past and the future.</p>
                                </>
                            }
                        />
                    </div>
                </div>
            )
          });
      }
  };

  return (
    <section id="property" className="container mx-auto px-8 md:px-12 py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / PROPERTY</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                    THE RESIDENCE
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           SANCTUARY & SYSTEM
                       </span>
                       A 1906 geothermal estate on Warm Springs Avenue. Meticulously restored. Retrofitted with autonomous infrastructure. A private sanctuary that serves as the operational hub for the Micron House program.
                    </p>
                 </div>
            </div>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
            
            {/* 1. Main Floor Gallery */}
            <SpecCard 
                title="MAIN LEVEL" 
                icon={<Home />} 
                items={["Formal Entry & Living", "Chef's Kitchen", "Dining Room (Seats 8)", "Executive Office"]}
                onGallery={() => openLevelGallery('main')}
                gradient="bg-micron-grey1"
                delay={0}
            />

            {/* 2. Upper Floor Gallery */}
            <SpecCard 
                title="UPPER LEVEL" 
                icon={<ArrowUp />} 
                items={["Primary Suite", "Guest Suite 1", "Guest Suite 2", "3 Full Baths"]}
                onGallery={() => openLevelGallery('upper')}
                gradient="bg-micron-eggplant"
                delay={0.1}
            />

            {/* 3. Grounds Gallery */}
            <SpecCard 
                title="GROUNDS" 
                icon={<TreeDeciduous />} 
                items={["Private Terrace", "Geothermal Spa", "Fruit Orchard", "Secure Perimeter"]}
                onGallery={() => openLevelGallery('grounds')}
                gradient="bg-micron-green"
                delay={0.2}
            />

            {/* 4. Wellness Info */}
            <InfoCard 
                title="WELLNESS" 
                subtitle="RESTORATIVE" 
                icon={<Activity />} 
                text="Geothermal hydrotherapy, contrast circuits, and organic systems designed for executive recovery."
                onClick={() => openInfoModal('wellness')}
                gradient="bg-micron-eggplant-light"
                delay={0.3}
            />

            {/* 5. Autonomous Info */}
            <InfoCard 
                title="AUTONOMOUS" 
                subtitle="INFRASTRUCTURE" 
                icon={<Cpu />} 
                text="A hidden layer of sensors and compute enabling Optimus and Cybercab to operate with precision."
                onClick={() => openInfoModal('autonomous')}
                gradient="bg-zinc-800"
                delay={0.4}
            />

            {/* 6. History Info */}
            <InfoCard 
                title="HISTORY" 
                subtitle="PROVENANCE" 
                icon={<History />} 
                text="Built 1906. One of the first geothermal homes in America. A legacy of innovation on Warm Springs Avenue."
                onClick={() => openInfoModal('history')}
                gradient="bg-zinc-600"
                delay={0.5}
            />

        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};