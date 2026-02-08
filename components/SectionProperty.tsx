import React, { useState } from 'react';
import { MapPin, Plane, Building2, Leaf, GraduationCap, Stethoscope, Home, ArrowUp, ArrowUpRight, Cpu, TreeDeciduous, Zap, Waves, Activity, Sprout, Clock, Car, Bot, Grape, Thermometer, ShieldCheck, History, Landmark, Timer } from 'lucide-react';
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

        {/* UPDATED: Increased text size from text-sm md:text-base to text-base md:text-lg */}
        <p className="text-base md:text-lg text-white/90 font-medium leading-relaxed mb-4 flex-1 drop-shadow-sm">
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

const ModalCard = ({ title, description, colorClass, icon, image, textColor="text-white" }: any) => (
  <div className={`${colorClass} rounded-2xl p-6 ${textColor} shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group border border-white/10`}>
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

              <div className="text-white/80 font-light leading-relaxed text-lg space-y-4">
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
              folder: "MAIN FLOOR", 
              files: [
                  "1.JPEG",
                  "IMG_0701.JPEG",
                  "IMG_0705.JPEG",
                  "IMG_0709 copy.jpg",
                  "IMG_0710.JPEG",
                  "IMG_0735.JPEG",
                  "IMG_0736.JPEG",
                  "IMG_0737.JPEG",
                  "IMG_0738.JPEG",
                  "IMG_0754.JPEG",
                  "IMG_0761.JPEG",
                  "IMG_0762.JPEG",
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
                  "br3_0.jpg",
                  "br2.3.JPEG",
                  "br1.6.JPEG",
                  "BR2_8.jpg",
                  "BR2.7.JPEG",
                  "BR1.7.jpg",
                  "stairs.jpg",
                  "MABA.JPEG",
                  "3rd BA_2.JPEG"
              ]
          },
          grounds: {
              folder: "GROUNDS", 
              files: [
                  "GARDEN.2.jpg",
                  "IMG_0304.JPEG",
                  "back_yard_1.JPEG",
                  "exterior.3.jpg",
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
                                    <p>The rapid temperature shift triggers a proven <strong className="text-white font-bold drop-shadow-md">250% increase in dopamine</strong>, delivering sustained alertness, mental clarity, and elevated mood.</p>
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
                                    <p>By engaging 90% of muscle fibers (vs. 40% in standard training), it <strong className="text-white font-bold drop-shadow-md">rapidly builds bone density</strong>, counteracts neuropathy, and stimulates neuro-repair for improved mental health.</p>
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
                                    <p>Homegrown crops <strong className="text-white font-bold drop-shadow-md">retain up to 50% more nutrient density</strong> than store-bought options, directly fueling the gut microbiome and immune system.</p>
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
            modalLayout: 'default',
            maxWidth: 'max-w-7xl',
            headerClassName: "text-zinc-900",
            content: (
                <div className="flex flex-col gap-8 pb-4">
                     <div className="border-l-4 border-zinc-900 pl-6 py-1">
                         <p className="text-base md:text-lg font-light text-zinc-600 leading-relaxed font-body">
                            Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality.
                         </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <div className="bg-black rounded-2xl p-6 text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group border border-white/10">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Car size={24} className="text-white" />
                                        <h3 className="text-xl font-bold uppercase tracking-tight">CYBERCAB</h3>
                                    </div>
                                    <div className="h-px w-full bg-white/20 mb-4" />
                                    <div className="text-white/90 font-medium leading-relaxed text-lg space-y-4">
                                        <p>Tesla's first fully autonomous vehicle — a two-passenger cabin with butterfly doors, inductive charging, and a 20.5-inch display. Cybercab manages all airport transfers, downtown shuttles, and guest logistics autonomously.</p>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                                     <img src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/cybercab%20photpo.WEBP" alt="Cybercab" className="w-full h-full object-cover" onError={(e) => {
                                        // Fallback if image doesn't exist yet
                                        e.currentTarget.style.display = 'none';
                                     }}/>
                                     {/* Fallback gradient if image fails */}
                                     <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" style={{ display: 'none' }}></div> 
                                </div>
                            </div>
                        </div>

                         <div className="bg-micron-eggplant-light rounded-2xl p-6 text-white shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden group border border-white/10">
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Bot size={24} className="text-white" />
                                        <h3 className="text-xl font-bold uppercase tracking-tight">OPTIMUS</h3>
                                    </div>
                                    <div className="h-px w-full bg-white/20 mb-4" />
                                    <div className="text-white/90 font-medium leading-relaxed text-lg space-y-4">
                                        <p>Tesla's Gen 3 humanoid — 5'8", 125 lbs, with 22 degrees of freedom in each hand and vision-based autonomy. Optimus manages property maintenance, perimeter monitoring, and routine service tasks within defined geofenced zones across the residence.</p>
                                    </div>
                                </div>
                                <div className="mt-6 rounded-xl overflow-hidden aspect-[16/9] border border-white/10">
                                     <img src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/tesla-optimus-gen-3-delay.png" alt="Optimus" className="w-full h-full object-cover object-top" />
                                </div>
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
            modalLayout: 'default',
            maxWidth: 'max-w-6xl',
            headerClassName: "text-zinc-900",
            content: (
                <div className="flex flex-col md:flex-row gap-6 h-full pb-4 items-stretch">
                     {/* LEFT: IMAGE */}
                     <div className="w-full md:w-1/2 min-h-[400px] md:min-h-0">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-2xl border border-zinc-200">
                             <img 
                                src="https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/old%20warm%20springs%20(1).webp" 
                                alt="Historic Carriage" 
                                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                onError={(e) => {
                                    // Fallback to one of the gallery images if specific one fails
                                    e.currentTarget.src = buildUrl("GROUNDS", "exterior_4.JPG");
                                }}
                             />
                             <div className="absolute inset-0 bg-zinc-900/10 pointer-events-none" />
                        </div>
                     </div>

                     {/* RIGHT: TEXT TILES */}
                     <div className="w-full md:w-1/2 bg-micron-eggplant rounded-2xl p-8 md:p-10 text-white flex flex-col justify-center gap-8 shadow-2xl border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-micron-eggplant-light blur-[100px] opacity-20 pointer-events-none rounded-full" />
                        
                        <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-3 text-white">
                                <History size={28} />
                                <h3 className="text-2xl font-black uppercase tracking-tight">ORIGINS</h3>
                             </div>
                             <div className="w-12 h-1 bg-micron-eggplant-light mb-4" />
                             <p className="text-white/90 text-lg leading-relaxed font-medium">
                                In 1890, Christopher W. Moore, founder of the First National Bank of Idaho, drilled two wells near the base of Table Rock. He struck 170-degree water.
                             </p>
                             <p className="text-white/90 text-lg leading-relaxed font-medium mt-4">
                                By 1892, he had piped it to his mansion on Warm Springs Avenue—marking the first use of geothermal water for home heating in the United States.
                             </p>
                        </div>

                        <div className="w-full h-px bg-white/20 relative z-10" />

                        <div className="relative z-10">
                             <div className="flex items-center gap-3 mb-3 text-white">
                                <TreeDeciduous size={28} />
                                <h3 className="text-2xl font-black uppercase tracking-tight">CONTINUITY</h3>
                             </div>
                             <div className="w-12 h-1 bg-micron-green mb-4" />
                             <p className="text-white/90 text-lg leading-relaxed font-medium">
                                Today, the Boise Warm Springs Water District remains the oldest continuously operating geothermal district in North America.
                             </p>
                             <p className="text-white/90 text-lg leading-relaxed font-medium mt-4">
                                The Micron House sits on this historic line, utilizing the same clean, ancient energy source that Moore tapped over 130 years ago. It is a National Register of Historic Places corridor defined by energy innovation.
                             </p>
                        </div>
                     </div>
                </div>
            )
          });
      }
  };

  const locations = [
    { label: "MICRON HQ", time: "15 min", color: "bg-micron-green", icon: <Building2 size={20} /> },
    { label: "AIRPORT", time: "10 min", color: "bg-micron-eggplant", icon: <Plane size={20} /> },
    { label: "DOWNTOWN", time: "3 min", color: "bg-micron-eggplant-light", icon: <Building2 size={20} /> },
    { label: "ST. LUKE'S", time: "2 min", color: "bg-zinc-800", icon: <Stethoscope size={20} /> },
    { label: "CAPITOL", time: "5 min", color: "bg-zinc-600", icon: <Landmark size={20} /> },
    { label: "BOISE STATE", time: "4 min", color: "bg-micron-eggplant-light", icon: <GraduationCap size={20} /> },
    { label: "RIVER", time: "1 min", color: "bg-micron-green", icon: <Leaf size={20} /> },
  ];

  return (
    <section id="property" className="container mx-auto px-8 md:px-12 py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            // UPDATED: Reduced padding from mb-12 to mb-6 to tighten section
            className="mb-6 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">02 / ASSET</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                    PROPERTY
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                    <div className="text-lg font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           HISTORIC CONTEXT
                       </span>
                       <p className="mb-4">
                           A modest home drawing on North America's oldest continuously operating geothermal district (est. 1890). This site taps into the nation's largest historic direct-use aquifer.
                       </p>
                       <p className="font-bold text-micron-eggplant">
                           A profound convergence of harnessed earth energy and energy from the stars.
                       </p>
                    </div>
                 </div>
            </div>
        </motion.div>

        {/* NEW STATS ROW - UPDATED: Reduced bottom padding (mb-6), Added Floating Effects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             {/* 1906 */}
             <div className="bg-micron-eggplant text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter">1906</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Year Built</span>
             </div>
             {/* 3,374 */}
             <div className="bg-micron-grey1 text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter">3,374</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Square Feet</span>
             </div>
             {/* 3/4 */}
             <div className="bg-micron-green text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter">3/4</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Bed / Bath</span>
             </div>
             {/* 1892 */}
             <div className="bg-micron-eggplant-light text-white rounded-xl p-6 flex flex-col items-center justify-center shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 border border-white/10">
                 <span className="text-4xl md:text-5xl font-black tracking-tighter">1892</span>
                 <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">Geothermal Rights</span>
             </div>
        </div>

        {/* Location Details Header - UPDATED: Reduced padding (mb-4) */}
        <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} className="text-zinc-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 font-sans">LOCATION DETAILS</span>
        </div>

        {/* RESTORED: Location Pills - UPDATED: Reduced padding (mb-6) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
            {locations.map((loc, i) => (
                <LocationPill 
                    key={i}
                    label={loc.label}
                    time={loc.time}
                    color={loc.color}
                    icon={loc.icon}
                    delay={i * 0.1}
                />
            ))}
        </div>

        {/* RESTORED: Sub-header - UPDATED: Reduced padding (mb-4) */}
        <div className="flex items-center gap-2 mb-4">
            <Home size={16} className="text-zinc-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 font-sans">RESIDENCE SPECIFICATIONS</span>
        </div>

        {/* BENTO GRID 1: Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)] mb-8">
            <SpecCard 
                title="MAIN LEVEL" 
                icon={<Home />} 
                items={["Foyer Entry", "Living, Dining, & Fully Equipped Kitchen", "Office w/ Ensuite Bath", "French Door Access to Deck", "Antiques & Art throughout"]}
                onGallery={() => openLevelGallery('main')}
                gradient="bg-micron-grey1"
                delay={0}
            />

            <SpecCard 
                title="UPPER LEVEL" 
                icon={<ArrowUp />} 
                items={["3 Bedrooms", "2 Private En-Suite Baths", "1 Bedroom Served by Hall Bath", "Laundry Facilities"]}
                onGallery={() => openLevelGallery('upper')}
                gradient="bg-micron-eggplant"
                delay={0.1}
            />

            <SpecCard 
                title="GROUNDS" 
                icon={<TreeDeciduous />} 
                items={["Mature Fruit Trees (Peach, Plum, Cherry)", "Concord Grapevine", "Fully Fenced Yard & ~200 sq ft Deck", "Attached Carport via Private Alley"]}
                onGallery={() => openLevelGallery('grounds')}
                gradient="bg-micron-green"
                delay={0.2}
            />
        </div>

        {/* NEW FEATURES HEADER */}
        <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-zinc-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 font-sans">FEATURES</span>
        </div>

        {/* BENTO GRID 2: Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
            <InfoCard 
                title="GEOTHERMAL & WELLNESS" 
                subtitle="NATURE" 
                icon={<Activity />} 
                text="Powered by a 177°F direct-use aquifer. Geothermal water flows through the home's radiators and feeds the outdoor soaking tub. The grounds feature mature fruit trees and a Concord grapevine."
                onClick={() => openInfoModal('wellness')}
                gradient="bg-micron-eggplant-light"
                delay={0.3}
            />

            <InfoCard 
                title="AUTONOMOUS SECURITY & SERVICE" 
                subtitle="INTELLIGENCE" 
                icon={<Cpu />} 
                text="Autonomous service via Cybercab and Optimus. A functional proving ground where abstract technology becomes a seamless, daily reality."
                onClick={() => openInfoModal('autonomous')}
                gradient="bg-zinc-800"
                delay={0.4}
            />

            <InfoCard 
                title="NATIONAL REGISTER OF HISTORIC PLACES" 
                subtitle="LEGACY" 
                icon={<History />} 
                text="Anchored by the C.W. Moore House (1891) and the neighboring George Whitfield Russell House. A corridor defined by the legacy of Western pioneers and energy ingenuity."
                onClick={() => openInfoModal('history')}
                gradient="bg-micron-eggplant"
                delay={0.5}
            />

        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};