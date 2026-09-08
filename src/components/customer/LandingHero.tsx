import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Search, MapPin, AlertTriangle, Zap, Wrench, Snowflake, Settings } from 'lucide-react';

interface LandingHeroProps {
  onOpenEmergency: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenEmergency }) => {
  const { t, searchQuery, setSearchQuery, location } = useDemo();
  const [selectedEmergencies, setSelectedEmergencies] = useState<string[]>([]);

  const emergencies = [
    { id: 'electrical', label: 'Electrical', icon: Zap },
    { id: 'plumbing', label: 'Plumbing', icon: Wrench },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'appliance', label: 'Appliance', icon: Settings },
    { id: 'other', label: 'Other', icon: AlertTriangle },
  ];

  const toggleEmergency = (id: string) => {
    setSelectedEmergencies(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-6 pb-2">
      <div className="w-[92%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Bar + Location Box */}
        <div className="mb-6">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
            
            {/* Location Pill */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl text-slate-700 font-bold text-xs shrink-0 w-full sm:w-auto">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>📍 {location}</span>
            </div>

            {/* Input Search */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search services or workers"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none"
              />
            </div>
            {/* AI Search CTA button removed */}
          </div>
        </div>

        {/* 🚨 Emergency Dispatch Callout Banner */}
        <div className="bg-red-50/50 border border-red-200 p-4 sm:p-5 rounded-2xl shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600 animate-pulse" />
            <h3 className="text-red-700 font-extrabold text-sm uppercase tracking-wider">
              Emergency Dispatch
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {emergencies.map(em => {
              const isSelected = selectedEmergencies.includes(em.id);
              const Icon = em.icon;
              return (
                <button
                  key={em.id}
                  onClick={() => toggleEmergency(em.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isSelected 
                      ? 'bg-red-600 text-white border-red-600 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{em.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-white/60 rounded-xl border border-red-100">
            <div>
              <p className="text-xs font-bold text-slate-800">NEED HELP NOW?</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedEmergencies.length > 0 
                  ? `Selected emergencies: ${selectedEmergencies.map(id => emergencies.find(e => e.id === id)?.label).join(', ')}`
                  : 'Select an emergency type above to dispatch.'}
              </p>
            </div>
            <button 
              onClick={() => {
                if (selectedEmergencies.length > 0) onOpenEmergency();
              }}
              disabled={selectedEmergencies.length === 0}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                selectedEmergencies.length > 0 
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-md cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>DISPATCH NOW</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

