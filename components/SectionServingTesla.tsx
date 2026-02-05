
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Scan, Cpu, MessageSquare, ShieldCheck, Users, Eye, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const teslaCards = [
  // CARD 1: REAL-WORLD INFERENCE
  { 
    id: 2, 
    title: "REAL-WORLD INFERENCE", 
    subtitle: "A Living Laboratory",
    content: "The Convergence Zone. 1020 E Warm Springs is the neutral ground where the digital code of AI meets the legal code of the nation.",
    icon: <Scan />,
    gradient: "bg-micron-black hover:bg-micron-eggplant-light transition-colors duration-500", 
    border: "border-white/10",
    subtitleColor: "text-micron-green", 
    descriptionColor: "text-zinc-400 group-hover:text-white transition-colors duration-300"
  },
  // CARD 2: THE TECTONIC SHIFT
  {
    id: 1,
    title: "THE TECTONIC SHIFT",
    subtitle: "Anthropology of the Future",
    content: "Moving beyond laws and sidewalks into the anthropology of the future. How humanity adapts to the 'Crisis of Shared Reality' in the age of ubiquitous robotics.",
    icon: <Cpu />,
    gradient: "bg-micron-grey1 hover:bg-zinc-200 transition-colors duration-500", 
    border: "border-white/10",
    subtitleColor: "text-micron-eggplant-light", 
    descriptionColor: "text-zinc-300 group-hover:text-zinc-800 transition-colors duration-300" 
  },
];

export const SectionServingTesla: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const getModalContent = (id: number) => {
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
                className="bg-zinc-50 rounded-[2rem] p-8 md:p-10 border border-zinc-200 shadow-inner flex flex-col justify-center h-full"
            >
                <div className="mb-8 border-b border-zinc-200 pb-4">
                    <h3 className="text-micron-eggplant font-bold uppercase tracking-widest text-sm">
                        Societal Reaction: Two Questions
                    </h3>
                </div>
                
                <div className="space-y-10">
                    <div className="group">
                        <div className="flex items-center gap-4 mb-3">
                             <div className="w-8 h-8 rounded-full bg-micron-eggplant text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">1</div>
                             <span className="text-zinc-900 font-black text-xl uppercase tracking-wide">Visual Rights</span>
                        </div>
                        <p className="text-zinc-600 text-lg font-medium pl-12 border-l-2 border-zinc-200 group-hover:border-micron-eggplant transition-colors">
                            Should robots be required to look obviously non-human to prevent manipulation?
                        </p>
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-4 mb-3">
                             <div className="w-8 h-8 rounded-full bg-micron-green text-white flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform">2</div>
                             <span className="text-zinc-900 font-black text-xl uppercase tracking-wide">Liability</span>
                        </div>
                        <p className="text-zinc-600 text-lg font-medium pl-12 border-l-2 border-zinc-200 group-hover:border-micron-green transition-colors">
                            Who is responsible when a robot causes psychological distress by mere presence?
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
  };

  return (
    // UPDATED: bg-white instead of bg-zinc-50
    <section id="serving-tesla" className="container mx-auto px-4 md:px-12 py-12 bg-white text-zinc-900">
          {/* REMOVED: Outer white wrapper */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8">
            <div className="flex-shrink-0">
               <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">05 / PARTNERSHIP</span>
               <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-900 leading-none">LIVING LAB</h2>
            </div>

            {/* Added Description */}
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-zinc-900/20 hover:border-zinc-900 transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-zinc-900 block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           AUTONOMOUS FUTURE
                       </span>
                       A living laboratory where the future of robotics meets the reality of daily life. Optimus and Cybercab aren't just tested here—they are the operating system of the home.
                    </p>
                 </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {teslaCards.map((card, i) => (
              <BentoCard 
                key={card.id} 
                className={`
                    flex flex-col justify-between min-h-[400px] relative group overflow-hidden
                `}
                gradient={card.gradient} 
                borderColor={card.border}
                textColor="text-white"
                delay={i * 0.1}
                onClick={() => setModalData({
                    title: card.title,
                    subtitle: card.subtitle,
                    category: 'showcase',
                    tags: ['Tesla', 'Anthropology', 'Future'],
                    theme: 'light',
                    content: getModalContent(card.id)
                })}
              >
                <div className="absolute top-8 right-8 z-20 opacity-100 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                   {/* Custom arrow if needed, BentoCard handles default */}
                </div>

                <div className="relative z-10 mt-auto p-2">
                   <h3 className={`text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-3 font-sans transition-colors duration-300 ${card.id === 1 ? 'text-white group-hover:text-zinc-900' : 'text-white'}`}>
                       {card.title}
                   </h3>
                   
                   <p className={`text-sm md:text-base font-bold uppercase tracking-widest mb-4 font-sans ${card.subtitleColor}`}>
                      {card.subtitle}
                   </p>

                   <p className={`text-base md:text-lg leading-relaxed font-body font-medium max-w-md ${card.descriptionColor}`}>
                      {card.content}
                   </p>
                </div>
              </BentoCard>
            ))}
          </div>
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
