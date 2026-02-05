
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Scan, Cpu, MessageSquare, ShieldCheck, Users, Eye, Info, Activity, Feather, FileSignature, Palette, User } from 'lucide-react';
import { motion } from 'framer-motion';

const teslaCards = [
  // CARD 1: REAL-WORLD INFERENCE
  // Updated Color: Dark Gray (#353942) -> bg-micron-grey1
  { 
    id: 2, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "A Living Laboratory",
    content: "Where the people building the systems sit down with the people governing them. The conversations that happen here shape how this technology enters the world.",
    icon: null,
    gradient: "bg-micron-grey1", 
    border: "border-white/10",
    subtitleColor: "text-micron-green", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-eggplant-light"
  },
  // CARD 2: THE TECTONIC SHIFT
  // Updated Color: Mid Gray (#5d6270) -> bg-micron-grey2
  {
    id: 1,
    title: "A TECTONIC SHIFT", 
    subtitle: "Anthropology of the Future",
    content: "Moving beyond laws and sidewalks into the anthropology of the future. How humanity adapts to the 'Crisis of Shared Reality' in the age of ubiquitous robotics.",
    icon: null,
    gradient: "bg-micron-grey2",
    border: "border-white/10",
    subtitleColor: "text-micron-eggplant-light", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-zinc-100"
  },
  // CARD 3: GENESIS (NEW)
  // Updated Color: Deep Aubergine (#2c0f38) -> bg-micron-eggplant
  {
    id: 3,
    title: "GENESIS", 
    subtitle: "Origin & Intent",
    content: "The strategy, design, and stewardship behind the Micron House concept. Aligning a historic asset with the future Micron and Tesla are leading.",
    icon: null,
    gradient: "bg-micron-eggplant",
    border: "border-white/10",
    subtitleColor: "text-micron-eggplant-light", 
    descriptionColor: "text-zinc-300 group-hover:text-white transition-colors duration-300",
    titleHoverColor: "group-hover:text-micron-green"
  },
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const getModalContent = (id: number) => {
    // CONTENT FOR "GENESIS" (ID 3)
    if (id === 3) {
        return (
            <div className="flex flex-col gap-6">
                 {/* INTRO */}
                 <div className="border-l-4 border-micron-eggplant pl-6 py-1 mb-4">
                    <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-body">
                        A proposal to partner a historic asset with the autonomous future.
                    </p>
                </div>

                {/* THREE TILES GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    
                    {/* TILE 1: STEWARDSHIP & VISION */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-micron-grey1 text-white rounded-2xl p-6 shadow-xl flex flex-col h-full border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-full">
                                <User size={20} className="text-white" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-white/90">STEWARDSHIP & VISION</h3>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="text-xl font-bold text-white mb-1">Lisa Wood</h4>
                            <p className="text-xs uppercase tracking-widest text-micron-eggplant-light mb-1">Sun Valley since '92 | Warm Springs since 2000</p>
                            <p className="text-xs text-white/60 italic">Three decades in tech. Retired 2023. Artist, athlete, researcher.</p>
                        </div>

                        <div className="h-px w-full bg-white/20 mb-4"></div>

                        <div className="space-y-4 text-sm leading-relaxed text-white/80 font-medium flex-grow">
                            <p>
                                This Boise property has been a second home for 25 years — barely used. I love what Micron and Tesla are building. I also respect what it demands of us.
                            </p>
                            <p>
                                After 25 years of light use, I recognized this property has a highest and best use that goes beyond a personal residence.
                            </p>
                            <p>
                                I created the <span className="text-white font-bold">Micron House concept</span> — the strategy, the design, the branding — to propose a partnership. This project aligns a historic asset with the future Micron and Tesla are leading, offering a secure, innovative foothold for the autonomous era.
                            </p>
                        </div>
                    </motion.div>

                    {/* TILE 2: ICON CONCEPT & DESIGN */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-white text-zinc-900 rounded-2xl p-6 shadow-xl flex flex-col h-full border border-zinc-200"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-zinc-100 rounded-full">
                                <Palette size={20} className="text-zinc-900" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-zinc-900">ICON CONCEPT & DESIGN</h3>
                        </div>

                        <p className="text-sm font-medium text-zinc-600 mb-6 leading-relaxed">
                            I designed this emblem to represent the convergence at play in this house. A visual map of the autonomous home.
                        </p>

                        <div className="space-y-3 flex-grow">
                             {/* Earth & Sky */}
                             <div className="flex items-start gap-3">
                                 <div className="w-4 h-4 rounded-full bg-gradient-to-br from-micron-green to-micron-eggplant-light shrink-0 mt-1 shadow-sm ring-1 ring-zinc-200"></div>
                                 <div className="text-sm">
                                     <span className="font-bold text-zinc-900 uppercase text-xs tracking-wider block mb-0.5">Earth & Sky (Green / Blue)</span>
                                     <span className="text-zinc-500 leading-snug">The foundation. Geothermal energy, water, natural resources.</span>
                                 </div>
                             </div>

                             {/* Memory */}
                             <div className="flex items-start gap-3">
                                 <div className="w-4 h-4 rounded-full bg-micron-eggplant shrink-0 mt-1 shadow-sm ring-1 ring-zinc-200"></div>
                                 <div className="text-sm">
                                     <span className="font-bold text-zinc-900 uppercase text-xs tracking-wider block mb-0.5">Memory (Eggplant)</span>
                                     <span className="text-zinc-500 leading-snug">The intelligence. Micron. Silicon memory and processing power.</span>
                                 </div>
                             </div>

                             {/* Velocity */}
                             <div className="flex items-start gap-3">
                                 <div className="w-4 h-4 rounded-full bg-micron-grey1 shrink-0 mt-1 shadow-sm ring-1 ring-zinc-200"></div>
                                 <div className="text-sm">
                                     <span className="font-bold text-zinc-900 uppercase text-xs tracking-wider block mb-0.5">Velocity (Dark Gray)</span>
                                     <span className="text-zinc-500 leading-snug">The autonomy. Tesla. SpaceX. The service and security layer — Cybercab, Optimus.</span>
                                 </div>
                             </div>

                             {/* Diamond */}
                             <div className="flex items-start gap-3">
                                 <div className="w-4 h-4 rotate-45 border-2 border-zinc-900 bg-white shrink-0 mt-1 shadow-sm"></div>
                                 <div className="text-sm">
                                     <span className="font-bold text-zinc-900 uppercase text-xs tracking-wider block mb-0.5">Diamond Center</span>
                                     <span className="text-zinc-500 leading-snug">Convergence under pressure.</span>
                                 </div>
                             </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-zinc-100 text-xs text-zinc-400 italic">
                            "As autonomous residences emerge, this emblem captures the foundational elements and where it all started."
                        </div>
                    </motion.div>

                    {/* TILE 3: PROPOSAL */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-micron-eggplant text-white rounded-2xl p-6 shadow-xl flex flex-col h-full border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-white/10 rounded-full">
                                <FileSignature size={20} className="text-white" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-white/90">PROPOSAL</h3>
                        </div>

                        <div className="flex-grow flex flex-col justify-center">
                            <h4 className="text-2xl font-black uppercase tracking-tight text-micron-green mb-4">A Strategic Agreement</h4>
                            
                            <p className="text-base text-white/80 font-medium leading-relaxed mb-4">
                                The objective of this presentation is to formalize a long-term agreement.
                            </p>
                            
                            <p className="text-base text-white/80 font-medium leading-relaxed">
                                Micron and Tesla stakeholders utilize this residence as a <span className="text-white font-bold border-b border-micron-eggplant-light/50">premier corporate amenity</span> and entertainment hub.
                            </p>
                            
                            <div className="mt-6 bg-white/5 rounded-lg p-4 border border-white/10">
                                <p className="text-sm text-micron-eggplant-light font-bold leading-relaxed">
                                    "The security and service layers enabled by your technology turn a second home into a strategic asset."
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        )
    }

    // CONTENT FOR "REAL-WORLD INFERENCE" (ID 2)
    if (id === 2) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                {/* LEFT COLUMN: Main Concept */}
                <div className="flex flex-col gap-6">
                    {/* Primary Statement Card */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl relative overflow-hidden"
                    >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-micron-green/5 rounded-bl-full -mr-8 -mt-8"></div>
                         
                         <span className="relative z-10 text-micron-green font-bold uppercase tracking-widest text-xs mb-4 block">
                            The Feedback Loop
                         </span>
                         <h3 className="relative z-10 text-3xl font-black uppercase tracking-tight text-zinc-900 mb-6 leading-none">
                            Executive Feedback
                         </h3>
                         <p className="relative z-10 text-lg text-zinc-600 leading-relaxed font-body font-medium">
                            Micron House offers valuable feedback for the executives that created the technology. As the first residential prototype, it closes the loop between abstract code and lived reality.
                         </p>
                    </motion.div>

                    {/* Quote Card */}
                    <motion.div 
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        className="bg-micron-eggplant rounded-3xl p-8 border-t border-l border-white/20 border-b border-white/10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] text-white"
                    >
                        <MessageSquare className="mb-4 opacity-50" size={24} />
                        <p className="text-xl font-bold italic leading-relaxed">
                            "This is where real-world inference happens—not just for the robot's neural net, but for the society that will host it."
                        </p>
                    </motion.div>
                </div>

                {/* RIGHT COLUMN: The Roundtable - Designed as 'Data Cards' */}
                <motion.div 
                    variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                    className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-200 shadow-inner flex flex-col gap-4"
                >
                     <div className="mb-2">
                        <h4 className="text-micron-green font-bold uppercase text-xs tracking-[0.2em]">The Roundtable Coalition</h4>
                        <p className="text-zinc-500 text-sm mt-1">Solving density, surveillance, and civil rights.</p>
                     </div>

                     {/* List Items as Cards - 3D Effect Added */}
                     <div className="bg-white rounded-xl p-6 border-b-4 border-zinc-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck className="text-zinc-400" size={20} />
                            <span className="text-zinc-900 font-black text-lg uppercase tracking-wide">Government</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">City Councils, Transportation Departments, and Public Health Officials.</p>
                     </div>

                     <div className="bg-white rounded-xl p-6 border-b-4 border-zinc-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="text-zinc-400" size={20} />
                            <span className="text-zinc-900 font-black text-lg uppercase tracking-wide">Design & Society</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">Urban Planners, Architects, Sociologists, and Anthropologists.</p>
                     </div>

                     <div className="bg-white rounded-xl p-6 border-b-4 border-zinc-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-2">
                            <Users className="text-zinc-400" size={20} />
                            <span className="text-zinc-900 font-black text-lg uppercase tracking-wide">Rights & Ethics</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium">Civil Liberties Organizations (ACLU), Disability Rights Advocates, and Ethicists.</p>
                     </div>
                </motion.div>
            </div>
        );
    }
    
    // CONTENT FOR "THE TECTONIC SHIFT" (ID 1)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* LEFT COLUMN: Thesis Cards */}
            <div className="flex flex-col gap-6">
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                     <h3 className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-4 ml-2 flex items-center gap-3">
                        The Zoom Out
                        <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 hover:opacity-100 transition-opacity cursor-help">
                            <path d="M9 2C5 2 2 8 2 14C2 19.5 5 22 9 22C13 22 16 19.5 16 14C16 8 13 2 9 2Z" fill="#7db0d3"/>
                            <circle cx="6" cy="10" r="1.5" fill="#353942"/>
                            <circle cx="12" cy="8" r="1.2" fill="#353942"/>
                            <circle cx="9" cy="14" r="1.8" fill="#353942"/>
                            <circle cx="5" cy="16" r="1" fill="#353942"/>
                            <circle cx="13" cy="15" r="1.3" fill="#353942"/>
                            <circle cx="8" cy="7" r="1" fill="#353942"/>
                        </svg>
                     </h3>
                </motion.div>

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl border-b-4 border-zinc-300 group hover:border-micron-green/30 transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-micron-green font-bold uppercase text-xs tracking-[0.2em]">The Thesis</h4>
                        <Info size={20} className="text-zinc-300" />
                    </div>
                    <h5 className="text-3xl font-black text-zinc-900 mb-4 uppercase leading-none">Crisis of<br/>"Shared Reality"</h5>
                    <p className="text-zinc-600 font-medium leading-relaxed">
                        For 200,000 years, a bipedal figure meant a mind. That certainty is vanishing. We risk a conceptual disruption regarding personhood and moral agency.
                    </p>
                </motion.div>

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-zinc-900 rounded-3xl p-8 border border-zinc-700 shadow-xl border-b-4 border-zinc-950 group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-micron-eggplant-light font-bold uppercase text-xs tracking-[0.2em]">The Psychology</h4>
                        <Eye size={20} className="text-zinc-600" />
                    </div>
                    <h5 className="text-3xl font-black text-white mb-4 uppercase leading-none">Uncanny<br/>Stress</h5>
                    <p className="text-zinc-400 font-medium leading-relaxed">
                        Flooding the "Face Network" with synthetic entities causes "Social Inflammation." At what density does human psychological comfort break down?
                    </p>
                </motion.div>
            </div>

            {/* RIGHT COLUMN: The Open Questions */}
            <motion.div 
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
                className="bg-zinc-50 rounded-[2rem] p-8 md:p-10 border border-zinc-200 shadow-inner flex flex-col justify-center gap-6"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Info size={24} className="text-zinc-400" />
                    <h4 className="text-micron-eggplant-light font-bold uppercase text-sm tracking-[0.2em]">Open Questions</h4>
                </div>
                
                <ul className="space-y-6">
                    <li className="flex flex-col gap-2">
                        <span className="text-zinc-900 font-bold uppercase text-xs tracking-widest">Empathy</span>
                        <p className="text-zinc-600 font-medium leading-relaxed">
                            Does the presence of humanoid robots in domestic spaces alter human empathy?
                        </p>
                    </li>
                    <div className="h-px w-full bg-zinc-200" />
                    <li className="flex flex-col gap-2">
                        <span className="text-zinc-900 font-bold uppercase text-xs tracking-widest">Privacy</span>
                        <p className="text-zinc-600 font-medium leading-relaxed">
                             What is the legal definition of "home" when it is monitored by sensors for autonomous navigation?
                        </p>
                    </li>
                    <div className="h-px w-full bg-zinc-200" />
                    <li className="flex flex-col gap-2">
                        <span className="text-zinc-900 font-bold uppercase text-xs tracking-widest">Etiquette</span>
                        <p className="text-zinc-600 font-medium leading-relaxed">
                            How do we encode "politeness" and "personal space" into autonomous movement protocols?
                        </p>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
  };

  return (
    <section id="serving-tesla" className="container mx-auto px-4 md:px-12 py-12 bg-white text-zinc-900">
        
        {/* Header */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">05 / LIVING LAB</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant-light leading-none font-sans">
                    LIVING LAB
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           BEYOND SILICON
                       </span>
                       Where Micron's memory powers the inference, and the residence itself tests the integration. A living laboratory for the societal impact of embodied AI.
                    </p>
                 </div>
            </div>
        </motion.div>

        {/* Cards - UPDATED to 3 columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teslaCards.map((card, i) => (
                <BentoCard
                    key={card.id}
                    // UPDATED: Adjusted Aspect Ratio to be Square-ish (aspect-square)
                    className={`flex flex-col min-h-[400px] aspect-square p-8 relative overflow-hidden group shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_45px_80px_-10px_rgba(0,0,0,0.4)] ${card.gradient} ${card.border} transition-colors duration-500`}
                    gradient={card.gradient}
                    textColor="text-white"
                    borderColor="border-white/10"
                    delay={i * 0.1}
                    hoverEffect={true}
                    onClick={() => setModalData({
                        title: card.title,
                        subtitle: card.subtitle,
                        category: 'showcase',
                        theme: 'light',
                        // UPDATED: Increased max width for the Genesis modal
                        maxWidth: card.id === 3 ? 'max-w-[1400px]' : 'max-w-7xl',
                        content: getModalContent(card.id)
                    })}
                >
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            {card.icon && (
                                <div className={`mb-6 p-3 rounded-full bg-white/10 w-fit backdrop-blur-md border border-white/10 ${card.descriptionColor}`}>
                                    {React.cloneElement(card.icon as React.ReactElement<any>, { size: 28 })}
                                </div>
                            )}
                            {/* Title size adjusted for square layout */}
                            <h3 className={`text-3xl font-black uppercase tracking-tight mb-2 leading-[0.9] text-white drop-shadow-lg transition-colors duration-300 ${card.titleHoverColor}`}>
                                {card.title}
                            </h3>
                            <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${card.subtitleColor}`}>
                                {card.subtitle}
                            </p>
                        </div>
                        
                        <div className="mt-auto">
                            <div className="h-px w-full bg-white/20 mb-4" />
                            <p className={`text-base font-medium leading-relaxed ${card.descriptionColor}`}>
                                {card.content}
                            </p>
                        </div>
                    </div>
                </BentoCard>
            ))}
        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
