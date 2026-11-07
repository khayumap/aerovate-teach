import React, { useState } from 'react';
import { Sparkles, Eye, Info } from 'lucide-react';
import { Language } from '../types';

interface Specimen {
  id: string;
  name: string;
  nameMl: string;
  family: 'Igneous' | 'Sedimentary' | 'Metamorphic' | 'Mineral';
  formation: string;
  formationMl: string;
  keyFeature: string;
  keyFeatureMl: string;
  realWorldUse: string;
  realWorldUseMl: string;
  monumentExample?: string;
  monumentExampleMl?: string;
  colorBg: string;
  icon: string;
}

const SPECIMENS: Specimen[] = [
  {
    id: 'granite',
    name: 'Granite',
    nameMl: 'ഗ്രാനൈറ്റ്',
    family: 'Igneous',
    formation: 'Slow underground cooling of magma beneath Earth’s crust over centuries.',
    formationMl: 'ഭൂമിക്കടിയിലെ മാഗ്മ പതുക്കെ തണുത്തുറഞ്ഞുണ്ടാകുന്നു.',
    keyFeature: 'Coarse grained, large visible crystals, extremely hard.',
    keyFeatureMl: 'തരികളുള്ള കാഠിന്യമേറിയ ഘടന.',
    realWorldUse: 'Polished kitchen countertops, temple steps, floor slabs.',
    realWorldUseMl: 'അടുക്കള സ്ലാബുകൾ, ക്ഷേത്ര പടവുകൾ, തറകൾ.',
    colorBg: 'from-slate-200 to-stone-300',
    icon: '🪨'
  },
  {
    id: 'pumice',
    name: 'Pumice',
    nameMl: 'പ്യൂമിസ് കല്ല്',
    family: 'Igneous',
    formation: 'Boiling lava froths up with gas and freezes instantly in mid-air.',
    formationMl: 'ലാവ അതിവേഗം തണുക്കുമ്പോൾ വായുകുമിളകൾ കുടുങ്ങി ഉണ്ടാകുന്നു.',
    keyFeature: 'Porous like a dry sponge, so lightweight that it FLOATS on water!',
    keyFeatureMl: 'ദ്വാരങ്ങളുള്ള സ്പോഞ്ച് പോലെ, വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കും!',
    realWorldUse: 'Foot body scrubbers, cosmetics exfoliation, lightweight blocks.',
    realWorldUseMl: 'ശരീരം ഉരച്ചു കഴുകുന്ന സ്ക്രബ്ബർ, ക്രീമുകൾ.',
    colorBg: 'from-stone-100 to-amber-100',
    icon: '🧼'
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    nameMl: 'ഒബ്സീഡിയൻ',
    family: 'Igneous',
    formation: 'Super-rapid cooling of high-silica lava without crystal formation.',
    formationMl: 'പരലുകൾ ഉണ്ടാകാൻ സമയം കിട്ടാതെ ലാവ തണുത്തുണ്ടാകുന്ന അഗ്നിപർവ്വത ഗ്ലാസ്.',
    keyFeature: 'Glossy jet-black natural volcanic glass with razor-sharp edges.',
    keyFeatureMl: 'കറുത്ത തിളക്കമുള്ള പ്രകൃതിദത്ത ഗ്ലാസ്, മൂർച്ചയേറിയ അരികുകൾ.',
    realWorldUse: 'Precision eye surgery scalpels, ancient arrowheads, gemstones.',
    realWorldUseMl: 'ശസ്ത്രക്രിയാ കത്തികൾ, അമ്പടയാളങ്ങൾ, ആഭരണങ്ങൾ.',
    colorBg: 'from-slate-900 to-zinc-800 text-white',
    icon: '🗡️'
  },
  {
    id: 'basalt',
    name: 'Basalt',
    nameMl: 'ബസാൾട്ട്',
    family: 'Igneous',
    formation: 'Rapid cooling of lava flows on the Earth’s surface or ocean floor.',
    formationMl: 'കടലിന്റെ അടിത്തട്ടിലും കരയിലും ലാവ തണുത്തുണ്ടാകുന്ന പാറ.',
    keyFeature: 'Heavy, dark gray-black, fine-grained, rich in iron & magnesium.',
    keyFeatureMl: 'കറുത്ത നിറം, ഇരുമ്പ് അടങ്ങിയ കട്ടിയുള്ള ഘടന.',
    realWorldUse: 'Crushed gravel (metal) for asphalt highway road paving.',
    realWorldUseMl: 'റോഡ് ടാറിംഗിനുള്ള മെറ്റൽ, കെട്ടിട അടിത്തറ.',
    colorBg: 'from-zinc-700 to-slate-800 text-white',
    icon: '🛣️'
  },
  {
    id: 'sandstone',
    name: 'Sandstone',
    nameMl: 'മണൽക്കല്ല്',
    family: 'Sedimentary',
    formation: 'Fine grains of quartz sand cemented by mineral deposits under pressure.',
    formationMl: 'മണൽത്തരികൾ ദശലക്ഷക്കണക്കിന് വർഷം കൊണ്ട് ഉറഞ്ഞുണ്ടാകുന്നു.',
    keyFeature: 'Rough abrasive sandpaper touch; yellow, red, brown shades.',
    keyFeatureMl: 'തരിതരിപ്പുള്ള പ്രതലം, ചുവപ്പ് അല്ലെങ്കിൽ മഞ്ഞ നിറം.',
    realWorldUse: 'Historic architectural monuments.',
    realWorldUseMl: 'ചരിത്ര സ്മാരകങ്ങൾ, കെട്ടിടങ്ങൾ.',
    monumentExample: 'The historic Red Fort (Lal Qila) in Delhi, India!',
    monumentExampleMl: 'ഡൽഹിയിലെ ചരിത്രപ്രസിദ്ധമായ ചെങ്കോട്ട (Red Fort)!',
    colorBg: 'from-red-100 to-amber-200',
    icon: '🏰'
  },
  {
    id: 'limestone',
    name: 'Limestone',
    nameMl: 'ചുണ്ണാമ്പുകല്ല്',
    family: 'Sedimentary',
    formation: 'Skeletons and shells of tiny prehistoric sea organisms (calcite).',
    formationMl: 'കടൽ ജീവികളുടെ തോടുകളിൽ നിന്ന് രൂപം കൊള്ളുന്നു.',
    keyFeature: 'Soft, light-colored, effervesces with drops of mild acid.',
    keyFeatureMl: 'കാൽസ്യം അടങ്ങിയ ഇളം നിറമുള്ള പാറ.',
    realWorldUse: 'Essential raw ingredient for making cement and blackboard chalk.',
    realWorldUseMl: 'സിമന്റ് നിർമ്മാണം, സ്കൂൾ ചോക്ക്.',
    colorBg: 'from-yellow-100 to-stone-200',
    icon: '🏭'
  },
  {
    id: 'shale',
    name: 'Shale',
    nameMl: 'ഷെയ്ൽ',
    family: 'Sedimentary',
    formation: 'Compressed river mud and silt deposits hardened in calm waters.',
    formationMl: 'കളിമണ്ണും ചെളിയും ഉറഞ്ഞുണ്ടാകുന്നു.',
    keyFeature: 'Smooth, splits neatly into thin horizontal plates.',
    keyFeatureMl: 'മൃദുവായ പ്രതലം, പരന്ന പാളികളാക്കാം.',
    realWorldUse: 'Moulded into roofing tiles, construction bricks, pottery.',
    realWorldUseMl: 'മേൽക്കൂര ടൈലുകൾ, ഇഷ്ടികകൾ.',
    colorBg: 'from-slate-200 to-blue-200',
    icon: '🧱'
  },
  {
    id: 'marble',
    name: 'Marble',
    nameMl: 'മാർബിൾ (വെണ്ണക്കല്ല്)',
    family: 'Metamorphic',
    formation: 'Sedimentary limestone subjected to immense underground metamorphic heat.',
    formationMl: 'ചുണ്ണാമ്പുകല്ല് കൊടും ചൂടും മർദ്ദവും കൊണ്ട് രൂപമാറ്റം പ്രാപിക്കുന്നു.',
    keyFeature: 'Dense recrystallized calcite that polishes to an exquisite mirror sheen.',
    keyFeatureMl: 'കണ്ണാടി പോലെ മിനുസപ്പെടുത്താൻ കഴിയുന്ന വെണ്ണക്കല്ല്.',
    realWorldUse: 'Royal palace floors, temple carvings, artistic statues.',
    realWorldUseMl: 'കൊട്ടാരങ്ങൾ, ക്ഷേത്ര ശിൽപ്പങ്ങൾ, മാർബിൾ തറ.',
    monumentExample: 'The world wonder Taj Mahal in Agra is built of Makrana Marble!',
    monumentExampleMl: 'ആഗ്രയിലെ ലോകാത്ഭുതമായ താജ്മഹൽ വെളുത്ത മാർബിളിലാണ് തീർത്തിരിക്കുന്നത്!',
    colorBg: 'from-slate-50 to-emerald-50 border-slate-300',
    icon: '🕌'
  },
  {
    id: 'slate',
    name: 'Slate',
    nameMl: 'സ്ലേറ്റ്',
    family: 'Metamorphic',
    formation: 'Metamorphic compression of soft shale rock under tectonic stress.',
    formationMl: 'ഷെയ്ൽ പാറയ്ക്ക് രൂപമാറ്റം സംഭവിച്ചുണ്ടാകുന്നു.',
    keyFeature: 'Foliated fine-grain stone that splits into perfectly flat thin leaves.',
    keyFeatureMl: 'നേർത്ത പരന്ന പാളികളായി എളുപ്പം വേർപെടുത്താം.',
    realWorldUse: 'Classroom writing slates, blackboards, water-resistant roof shingles.',
    realWorldUseMl: 'കുട്ടികളുടെ എഴുത്തുപലകകൾ, ബ്ലാക്ക്ബോർഡ്, മേൽക്കൂര.',
    colorBg: 'from-slate-800 to-zinc-900 text-white',
    icon: '📝'
  },
  {
    id: 'quartzite',
    name: 'Quartzite',
    nameMl: 'ക്വാർട്സൈറ്റ്',
    family: 'Metamorphic',
    formation: 'Sandstone fused with quartz grains under tectonic heat & pressure.',
    formationMl: 'മണൽക്കല്ല് ഉരുകി പരസ്പരം ഒട്ടിപ്പിടിച്ചുണ്ടാകുന്നു.',
    keyFeature: 'Non-porous, glassy, harder than steel knife blade, weather-proof.',
    keyFeatureMl: 'സ്റ്റീലിനേക്കാൾ കടുപ്പമുള്ള കാഠിന്യമേറിയ ശില.',
    realWorldUse: 'Glass production, ceramic insulators, high-durability countertops.',
    realWorldUseMl: 'ഗ്ലാസ്, സിറാമിക്സ്, റെയിൽവേ ട്രാക്ക്.',
    colorBg: 'from-amber-100 to-orange-200',
    icon: '🔬'
  }
];

export const RockCardShowcase: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Igneous' | 'Sedimentary' | 'Metamorphic'>('All');
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(SPECIMENS[0]);

  const filtered = activeFilter === 'All'
    ? SPECIMENS
    : SPECIMENS.filter(s => s.family === activeFilter);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Eye className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'en' ? 'Interactive Rock & Mineral Specimen Gallery' : 'പാറകളുടെയും ധാതുക്കളുടെയും ഗാലറി'}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {lang === 'en'
              ? 'Click any specimen card below to inspect its geological formation, texture, and real-life Kerala uses!'
              : 'ഓരോ പാറയിലും തൊട്ട് അതിന്റെ രൂപീകരണവും സവിശേഷതകളും അറിയാം!'}
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {(['All', 'Igneous', 'Sedimentary', 'Metamorphic'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeFilter === f
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f === 'All' && (lang === 'en' ? 'All (10)' : 'എല്ലാം (10)')}
              {f === 'Igneous' && (lang === 'en' ? 'Igneous' : 'ആഗ്നേയം')}
              {f === 'Sedimentary' && (lang === 'en' ? 'Sedimentary' : 'അവസാദം')}
              {f === 'Metamorphic' && (lang === 'en' ? 'Metamorphic' : 'കായാന്തരിതം')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Specimen Grid Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map(specimen => {
            const isSelected = selectedSpecimen?.id === specimen.id;
            return (
              <button
                key={specimen.id}
                onClick={() => setSelectedSpecimen(specimen)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-md scale-[1.02]'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{specimen.icon}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {specimen.family}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 leading-tight">
                    {lang === 'en' ? specimen.name : specimen.nameMl}
                  </div>
                  <div className="text-[11px] text-blue-600 font-medium">
                    {lang === 'en' ? specimen.nameMl : specimen.name}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 mt-2 truncate">
                  {lang === 'en' ? specimen.keyFeature : specimen.keyFeatureMl}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Selected Specimen Detailed Microscope View */}
        <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
          {selectedSpecimen ? (
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">{selectedSpecimen.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">
                      {lang === 'en' ? selectedSpecimen.name : selectedSpecimen.nameMl}
                    </h4>
                    <span className="text-xs text-blue-700 font-semibold">
                      {selectedSpecimen.family} Rock Family · {lang === 'en' ? selectedSpecimen.nameMl : selectedSpecimen.name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                    {lang === 'en' ? 'How it is formed:' : 'രൂപീകരണം:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'en' ? selectedSpecimen.formation : selectedSpecimen.formationMl}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                    {lang === 'en' ? 'Texture & Key Superpower:' : 'പ്രത്യേകത:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'en' ? selectedSpecimen.keyFeature : selectedSpecimen.keyFeatureMl}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                    {lang === 'en' ? 'Everyday Uses in Kerala & India:' : 'ഉപയോഗങ്ങൾ:'}
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {lang === 'en' ? selectedSpecimen.realWorldUse : selectedSpecimen.realWorldUseMl}
                  </p>
                </div>

                {selectedSpecimen.monumentExample && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
                    <span className="font-bold block text-[11px] text-amber-800">
                      🏛️ {lang === 'en' ? 'Famous Monument Example:' : 'പ്രസിദ്ധമായ സ്മാരകം:'}
                    </span>
                    <span className="text-xs">
                      {lang === 'en' ? selectedSpecimen.monumentExample : selectedSpecimen.monumentExampleMl}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select any rock above to examine details.
            </div>
          )}

          <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Class 5 Science Textbook Syllabus</span>
            <span className="text-blue-600 font-semibold">Kerala State Board</span>
          </div>
        </div>
      </div>
    </div>
  );
};
