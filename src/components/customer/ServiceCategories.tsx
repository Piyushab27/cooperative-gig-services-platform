import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { ServiceCategory } from '../../types';
import {
  Zap,
  Wrench,
  Hammer,
  Palette,
  Sparkles,
  Heart,
  Car,
  Snowflake,
  Trees,
  Settings
} from 'lucide-react';

interface CategoryDef {
  id: ServiceCategory;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  colorBg: string;
  colorText: string;
  badge?: string;
}

const CATEGORIES: CategoryDef[] = [
  { id: 'electrician', label: 'Electrician', sublabel: 'Wiring, Fans, Breakers', icon: Zap, colorBg: 'bg-amber-100', colorText: 'text-amber-700', badge: 'High Demand' },
  { id: 'plumber', label: 'Plumber', sublabel: 'Leaks, Taps, Tanks', icon: Wrench, colorBg: 'bg-blue-100', colorText: 'text-blue-700' },
  { id: 'ac_technician', label: 'AC Technician', sublabel: 'Servicing & Gas Refill', icon: Snowflake, colorBg: 'bg-sky-100', colorText: 'text-sky-700', badge: 'Popular' },
  { id: 'cleaner', label: 'Cleaner & Helper', sublabel: 'Deep Sanitation & Care', icon: Sparkles, colorBg: 'bg-emerald-100', colorText: 'text-emerald-700' },
  { id: 'carpenter', label: 'Carpenter', sublabel: 'Doors, Furniture, Fitting', icon: Hammer, colorBg: 'bg-orange-100', colorText: 'text-orange-700' },
  { id: 'painter', label: 'Painter', sublabel: 'Wall Paint & Damp Proof', icon: Palette, colorBg: 'bg-purple-100', colorText: 'text-purple-700' },
  { id: 'caregiver', label: 'Caregiver', sublabel: 'Elderly & Patient Assistance', icon: Heart, colorBg: 'bg-rose-100', colorText: 'text-rose-700' },
  { id: 'driver', label: 'Driver', sublabel: 'City & Outstation Chauffeur', icon: Car, colorBg: 'bg-indigo-100', colorText: 'text-indigo-700' },
  { id: 'appliance_repair', label: 'Appliance Repair', sublabel: 'Fridge, Washing Machine', icon: Settings, colorBg: 'bg-teal-100', colorText: 'text-teal-700' },
  { id: 'gardener', label: 'Gardener', sublabel: 'Terrace & Lawn Care', icon: Trees, colorBg: 'bg-green-100', colorText: 'text-green-700' },
];

export const ServiceCategories: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useDemo();

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
              Explore Services
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Cooperative Skilled Trades
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Select a service category to activate AI Smart Worker Matching
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {CATEGORIES.map(cat => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-200 relative group flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-xl ring-2 ring-emerald-500/30 transform -translate-y-1'
                    : 'bg-white border-slate-200/80 hover:border-emerald-300 hover:shadow-md'
                }`}
              >
                {cat.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    {cat.badge}
                  </span>
                )}

                <div className={`w-11 h-11 rounded-xl ${cat.colorBg} ${cat.colorText} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>

                <div>
                  <h3 className={`font-bold text-sm leading-tight ${isSelected ? 'text-emerald-900' : 'text-slate-900'}`}>
                    {cat.label}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                    {cat.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
