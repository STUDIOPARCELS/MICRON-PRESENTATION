
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { Wine, Car, BedDouble, Shield, Music, Mic, Armchair, Heart, Trophy, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';

const useCases = [
  // ROW 1
  { 
    id: 1, 
    title: "CHEF'S TABLE", 
    text: "A James Beard-recognized chef prepares dinner in the 1906 kitchen. Snake River Valley wines selected by the owner's sommelier network. Six guests.", 
    icon: <Wine />, 
    gradient: "bg-micron-grey1", 
  }, 
  { 
    id: 2, 
    title: "AUTONOMOUS ARRIVALS", 
    text: "Board member lands at BOI. Cybercab waiting at the curb. Autonomous drive through downtown Boise. Optimus opens the front door.", 
    icon: <Car />, 
    gradient: "bg-micron-green", 
  },
  { 
    id: 3, 
    title: "ALPINE DAYS", 
    text: "Heli-ski Idaho backcountry. Return to the house for geothermal hot tub, dry sauna, contrast therapy. Recovery meal prepared by a local chef.", 
    icon: <Snowflake />, 
    gradient: "bg-micron-eggplant", 
  },
  { 
    id: 4, 
    title: "SOFT LANDINGS", 
    text: "Executive relocating from Munich, Seoul, or Tel Aviv. Family arrives before permanent housing is ready. Two weeks in a real Boise neighborhood.", 
    icon: <BedDouble />, 
    gradient: "bg-micron-grey2", 
  },
  { 
    id: 5, 
    title: "CONFIDENTIAL COUNSEL", 
    text: "Governor and executives. Investors and founders. Board members and advisors. Fireside conversation. Same neighbors for 25 years.", 
    icon: <Shield />, 
    gradient: "bg-micron-black", 
  },

  // ROW 2
  { 
    id: 6, 
    title: "PRE-PERFORMANCES", 
    text: "Cocktails before the Boise Philharmonic. Drinks before Ballet Idaho. Gathering before Treefort. The house as staging point for arts calendar.", 
    icon: <Music />, 
    gradient: "bg-micron-grey3", 
  },
  { 
    id: 7, 
    title: "VISITING VOICES", 
    text: "The Boise Art Museum curator discusses a current exhibition. A James Beard chef demonstrates technique. Intimate lectures in the living room.", 
    icon: <Mic />, 
    gradient: "bg-micron-eggplant", 
  },
  { 
    id: 8, 
    title: "STAYCATIONS", 
    text: "Total restoration without leaving the property. Optimus handles the housekeeping. Cybercab is your private driver. Redefined by robotics.", 
    icon: <Armchair />, 
    gradient: "bg-micron-eggplant-light", 
  },
  { 
    id: 9, 
    title: "COMPASSIONATE STAYS", 
    text: "Family with a child receiving treatment at St. Luke's Medical Center, less than one mile away. A home. Kitchen access. Quiet evenings.", 
    icon: <Heart />, 
    gradient: "bg-micron-grey4", 
  },
  { 
    id: 10, 
    title: "GAME DAYS", 
    text: "BSU football Saturday. Tailgate brunch at the house. Biscuits from a celebrated local diner. Walk to the stadium. Return for evening gathering.", 
    icon: <Trophy />, 
    gradient: "bg-micron-green", 
  },
];

export const SectionUseCases: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openModal = (uc: typeof useCases[0]) => {
    setModalData({
      title: uc.title,
      label: "Experience",
      subtitle: "Intimacy and Privacy",
      category: 'showcase',
      // UPDATED: text-xl (20px)
      content: <p className="text-xl leading-relaxed text-zinc-300 font-body">{uc.text}</p>,
      tags: ['Exclusive', 'Private', 'Turnkey']
    });
  };

  return (
    <section id="use-cases" className="container mx-auto px-4 md:px-12 py-8 md:py-10 bg-white text-zinc-900">
      
      {/* FLOATING BENTO WRAPPER ADDED */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.0 }}
        className="w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-zinc-100 ring-1 ring-zinc-50"
      >
          {/* Header */}
          <div 
             className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-200 pb-8"
          >
            <div className="flex-shrink-0">
               <span className="block text-lg font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">03 / USE CASE</span>
               <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-zinc-400 leading-none font-sans">EXPERIENCES</h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant-light/20 hover:border-micron-eggplant-light transition-colors duration-500">
                    {/* UPDATED: text-lg */}
                    <p className="text-lg font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant-light block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           CURATED MOMENTS.
                       </span>
                       The residence adapts fluidly to the specific demands of the occasion. From private dining to executive off-sites, the property configures itself to support the intent of the guest.
                    </p>
                 </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 md:hidden">
              {/* UPDATED: text-lg */}
              <span className="text-lg text-zinc-400 uppercase tracking-wide">Swipe to explore →</span>
          </div>

          <div className="
            flex overflow-x-auto pb-6 -mx-4 px-4 gap-6 snap-x snap-mandatory 
            md:grid md:grid-cols-5 md:gap-6 md:pb-0 md:mx-0 md:px-0 md:overflow-visible
            scrollbar-hide
          ">
            {useCases.map((uc, i) => (
              <BentoCard 
                key={uc.id} 
                className="
                    min-w-[280px] md:min-w-0 snap-center
                    flex flex-col justify-between min-h-[340px] group border-none
                "
                gradient={uc.gradient} 
                textColor={uc.gradient === 'bg-micron-grey4' ? 'text-zinc-900' : 'text-white'}
                borderColor="border-transparent"
                delay={i * 0.05}
                onClick={() => openModal(uc)}
              >
                <div className="mb-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                           {React.cloneElement(uc.icon as React.ReactElement<any>, { 
                               size: 18, 
                               strokeWidth: 1.5, 
                               className: uc.gradient === 'bg-micron-grey4' ? 'text-zinc-900' : 'text-white' 
                            })}
                        </div>
                    </div>
                    
                    <h3 className={`font-bold text-xl mb-3 leading-tight uppercase tracking-tight ${uc.gradient === 'bg-micron-grey4' ? 'text-zinc-900' : 'text-white'}`}>
                      {uc.title}
                    </h3>
                </div>
                
                {/* UPDATED: text-lg */}
                <p className={`text-lg font-bold leading-relaxed font-sans tracking-wide ${uc.gradient === 'bg-micron-grey4' ? 'text-zinc-600' : 'text-white/80'}`}>
                  {uc.text}
                </p>

              </BentoCard>
            ))}
          </div>
      </motion.div>

      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};