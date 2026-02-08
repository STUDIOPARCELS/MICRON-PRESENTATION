
import React, { useState } from 'react';
import { BentoCard } from './BentoCard';
import { Modal } from './Modal';
import { ModalContent } from '../types';
import { motion } from 'framer-motion';
import { Wine, Car, BedDouble, Shield, Music, Mic, Armchair, Heart, Trophy, Snowflake, Utensils, Cpu, Users, Map, Fish, Stethoscope, ArrowRight } from 'lucide-react';

interface Experience {
  title: string;
  icon: React.ReactNode;
  description: string | React.ReactNode; 
  customGradient?: string; 
}

interface Department {
  id: string;
  title: string;
  value: string;
  detail: string;
  gradient: string;
  experiences: Experience[];
  modalHeaderColor: string; 
  modalIconColor: string;   
  modalTagColor: string;
  // New optional properties for modal sizing
  modalAspectRatio?: string;
  modalMaxWidth?: string;    
  tileAspectRatio?: string; // New: optional property to force aspect ratio on inner tiles
}

const departments: Department[] = [
  { 
    id: "travel", 
    title: "Travel & Entertainment", 
    value: "Board hosting, VIP visits", 
    detail: "A private retreat for Micron executives, employees, and guests—designed to host a spectrum of intimate social and professional experiences.", 
    gradient: "bg-micron-eggplant", 
    modalHeaderColor: "text-micron-eggplant",
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Game Days",
        icon: <Trophy />,
        description: "BSU football Saturday. Tailgate brunch catered by Kris Komori (KIN, Idaho's first James Beard winner). Gathering at the House before and after the game.",
        customGradient: "bg-micron-eggplant"
      },
      {
        title: "The Prelude",
        icon: <Music />,
        description: "Pre-event cocktails by Remi McManus (Bar, Please!) in the living room. Cybercab transfer to Albertsons Stadium suites for Post Malone or the 2026 concert series.",
        customGradient: "bg-micron-green"
      },
      {
        title: "Fly Fishing",
        icon: <Fish />,
        description: "Cybercab to Jackson Jet Center (15 min). Helicopter into the Sawtooth National Forest. Guided morning on a private stretch, riverside lunch paired with Snake River Valley wines.",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
  { 
    id: "events", 
    title: "Events & Meetings", 
    value: "Private dinners", 
    detail: "Consistent environment, curated experiences, cultural calendar integration.", 
    gradient: "bg-micron-green", 
    modalHeaderColor: "text-micron-green",
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-eggplant",
    experiences: [
      {
        title: "Snake River Tasting",
        icon: <Wine />,
        description: "Four winemakers from Sunnyslope: Ste. Chapelle, Telaya, Huston, Koenig. Pouring Parma Ridge Gewürztraminer (93 pts) and Huston Sparkling Grüner Veltliner (92 pts).",
        customGradient: "bg-micron-green"
      },
      {
        title: "Basque Supper",
        icon: <Utensils />,
        description: "Traditional Basque dinner by Dan Ansotegui (Ansots, 2026 Outstanding Hospitality nominee). Lamb, chorizos, pimientos. Celebrating Boise's heritage with eight guests.",
        customGradient: "bg-micron-eggplant"
      },
      {
        title: "Rocky Bar",
        icon: <Map />,
        description: "Cybercab to Jackson Jet Center (15 min). Helicopter to a ghost town in the Boise Mountains. Tour ruins of the old jail and cabins in a National Register district.",
        customGradient: "bg-micron-grey1"
      }
    ]
  },
  { 
    id: "exec", 
    title: "Executive Office", 
    value: "Confidential off-sites", 
    detail: "Strategy sessions, sensitive conversations, total discretion, no hotel staff.", 
    gradient: "bg-micron-grey1", 
    modalHeaderColor: "text-micron-grey1",
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-eggplant-light",
    // No aspect ratio constraints ensures it matches Travel & Entertainment style (natural grid)
    experiences: [
      {
        title: "Confidential Counsel",
        icon: <Shield />,
        description: "Fireside conversations with the Governor or key investors. Optimus and Cybercab manage all logistics for total discretion.",
        customGradient: "bg-micron-grey1"
      },
      {
        title: "Visiting Voices",
        icon: <Mic />,
        description: "Intimate fireside lectures with semiconductor leaders. Dinner prepared by Nathan Whitley (Terroir, 2026 James Beard semifinalist).",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
  { 
    id: "mobility", 
    title: "Global Mobility", 
    value: "Soft landings", 
    detail: "Real neighborhood experience, family accommodation, transition support before permanent housing.", 
    gradient: "bg-micron-eggplant-light", 
    modalHeaderColor: "text-micron-eggplant-light", 
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-grey1",
    modalMaxWidth: "max-w-md", // Keep compact width
    // No aspect ratio ensures height adapts to content (removing extra padding)
    experiences: [
      {
        title: "Soft Landings",
        icon: <BedDouble />,
        description: "Executives relocating from Munich, Seoul, or Tel Aviv. Two weeks in a real Boise neighborhood. An environment of fruit trees, geothermal heat, and a private hot tub.",
        customGradient: "bg-micron-eggplant-light"
      }
    ]
  }, 
  { 
    id: "talent", 
    title: "Talent Acquisition", 
    value: "Recruiting closes", 
    detail: "Differentiated candidate experience, memorable final impression, demonstrates company culture.", 
    gradient: "bg-micron-eggplant-light", 
    modalHeaderColor: "text-micron-eggplant-light", 
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-eggplant-light",
    experiences: [
      {
        title: "Chef's Table",
        icon: <Wine />,
        description: "Salvador Alamilla (Amano, 2025 James Beard Best Chef Mountain) prepares a multi-course dinner to impress a top candidate.",
        customGradient: "bg-micron-grey1"
      },
      {
        title: "The Closer",
        icon: <Shield />,
        description: "Final offer discussions by the living room fireplace. A neutral setting in the 1906 historic home, away from the boardroom.",
        customGradient: "bg-micron-eggplant-light"
      },
      {
        title: "Family Basecamp",
        icon: <Heart />,
        description: "While the candidate interviews at HQ (15m away), the family starts their \"Day in Boise\" with breakfast on the private terrace.",
        customGradient: "bg-micron-green"
      }
    ]
  }, 
  { 
    id: "foundation", 
    title: "Micron Foundation", 
    value: "Community events", 
    detail: "Hosting community leaders, nonprofit partners, civic engagement.", 
    gradient: "bg-micron-grey2", 
    modalHeaderColor: "text-micron-grey2", 
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-green",
    experiences: [
      {
        title: "Art + Appetite",
        icon: <Music />,
        description: "Boise Art Museum leads a private discussion on National Gallery of Art loans. Dinner by Alex Cardoza (Susina).",
        customGradient: "bg-micron-grey2"
      },
      {
        title: "Young Innovators",
        icon: <Cpu />,
        description: "STEM immersion featuring live Optimus and Cybercab demonstrations. Students engage directly with autonomous systems.",
        customGradient: "bg-micron-green"
      },
      {
        title: "Chip & Chair",
        icon: <Users />,
        description: "Micron engineers mentor Boise State CS students fireside. A cohort conversation on the semiconductor industry.",
        customGradient: "bg-micron-eggplant"
      }
    ]
  }, 
  { 
    id: "family", 
    title: "Family Support", 
    value: "St. Luke's lodging", 
    detail: "Less than 1 mile to medical center, home environment during difficult times, compassionate use.", 
    gradient: "bg-micron-eggplant", 
    modalHeaderColor: "text-micron-eggplant", 
    modalIconColor: "text-zinc-400", 
    modalTagColor: "border-micron-grey1",
    // No aspect ratio constraints matches Travel & Entertainment style
    experiences: [
      {
        title: "Medical Proximity",
        icon: <Stethoscope />, 
        description: "Located 0.8 miles from St. Luke's Boise Medical Center. Immediate access for families while retaining privacy.",
        customGradient: "bg-micron-eggplant"
      },
      {
        title: "Compassionate Stay",
        icon: <Heart />,
        description: "A private, fully equipped home for families facing long-term treatment scenarios. Dignity and comfort during crisis.",
        customGradient: "bg-micron-grey1"
      }
    ]
  }
];

export const SectionServing: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent | null>(null);

  const openModal = (dept: Department) => {
    // Determine grid columns dynamically based on number of items
    const gridCols = dept.experiences.length === 1 ? 'md:grid-cols-1' : dept.experiences.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

    setModalData({
      title: dept.title,
      subtitle: dept.value,
      category: 'showcase',
      theme: 'light',
      maxWidth: dept.modalMaxWidth || 'max-w-6xl',
      aspectRatio: dept.modalAspectRatio,
      headerClassName: dept.modalHeaderColor,
      content: (
        // REMOVED h-full from this wrapper to allow natural height sizing
        <div className="flex flex-col gap-8 pb-4">
             <div className={`border-l-4 ${dept.modalTagColor.replace('border-', 'border-')} pl-6 py-1`}>
                {/* UPDATED: Increased font size to text-lg md:text-xl to denote header section relative to tiles */}
                <p className="text-lg md:text-xl font-light text-zinc-600 leading-relaxed font-body">
                    {dept.detail}
                </p>
            </div>

            <div className={`grid grid-cols-1 ${gridCols} gap-6 flex-1`}>
                {dept.experiences.map((exp, i) => (
                    // UPDATED: Added floating/shadow classes and removed 'shadow-lg'
                    <div 
                        key={i} 
                        className={`${exp.customGradient || dept.gradient} text-white p-6 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 border border-white/10 ${dept.tileAspectRatio || ''} h-full justify-between`}
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {React.cloneElement(exp.icon as React.ReactElement<any>, { size: 24, className: "text-white/80" })}
                                <h4 className="text-xl font-bold uppercase tracking-tight">{exp.title}</h4>
                            </div>
                            <div className="h-px w-full bg-white/20 mb-4" />
                            {/* UPDATED: Verified font size is text-lg to match Wellness standard */}
                            <p className="text-white/80 font-medium leading-relaxed text-lg">
                                {exp.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )
    });
  };

  // Randomized staggered delay array for the 7 items
  const staggeredDelays = [0, 0.3, 0.1, 0.4, 0.2, 0.5, 0.15];

  return (
    <section id="serving" className="container mx-auto px-8 md:px-12 py-12 bg-white text-zinc-900">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 flex flex-col md:flex-row md:items-end gap-12 border-b border-zinc-100 pb-8"
        >
            <div className="flex-shrink-0">
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2 font-sans">04 / STAKEHOLDERS</span>
                <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-micron-eggplant leading-none font-sans">
                    SERVING MICRON
                </h2>
            </div>
            
            <div className="md:ml-auto max-w-2xl pb-1">
                 <div className="pl-6 border-l-4 border-micron-eggplant/20 hover:border-micron-eggplant transition-colors duration-500">
                    <p className="text-base font-light text-zinc-600 leading-snug font-body">
                       <span className="font-bold text-micron-eggplant block mb-2 text-2xl md:text-3xl uppercase tracking-tighter font-sans">
                           STRATEGIC ALIGNMENT
                       </span>
                       A new class of corporate asset. The first residence powered by Tesla Optimus and Cybercab, purpose-built to serve corporate executives, recruits, partners, and community — across every department that touches people.
                    </p>
                 </div>
            </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
            {departments.map((dept, i) => (
                <BentoCard
                    key={dept.id}
                    className={`
                        flex flex-col min-h-[160px] p-6 relative overflow-hidden group transition-all duration-300 ${dept.gradient}
                        w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]
                    `}
                    gradient={dept.gradient}
                    textColor="text-white"
                    borderColor="border-white/10"
                    delay={staggeredDelays[i] || 0}
                    hoverEffect={true}
                    onClick={() => openModal(dept)}
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <div>
                             <h3 className="text-2xl font-black uppercase tracking-tight leading-none text-white line-clamp-2 mb-1">{dept.title}</h3>
                             <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4">{dept.value}</p>
                             <div className="h-px w-full bg-white/30" />
                        </div>
                        
                        {/* UPDATED: Increased font size to text-lg to match Wellness modal tiles standard. Reduced mt from 4 to 3. */}
                        <p className="text-lg font-medium text-white/80 line-clamp-3 mt-3 leading-relaxed">
                            {dept.detail}
                        </p>
                    </div>
                </BentoCard>
            ))}
        </div>

        <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </section>
  );
};
