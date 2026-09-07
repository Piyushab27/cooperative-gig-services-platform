import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Search, MapPin, AlertTriangle, ShieldCheck, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';

interface LandingHeroProps {
  onOpenEmergency: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onOpenEmergency }) => {
  const { t, searchQuery, setSearchQuery, location } = useDemo();

  return (
    <div className="relative bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Badge */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md text-xs font-semibold">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Cooperative-Owned • 100% Fair Wages • Verified Skilled Workers</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Search Bar + Location Box */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-white p-2 rounded-2xl shadow-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-2">
            
            {/* Location Pill */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold text-xs shrink-0 w-full sm:w-auto">
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
                placeholder={t('searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-transparent text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none"
              />
            </div>

            {/* AI Search CTA button */}
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>AI Search</span>
            </button>
          </div>
        </div>

        {/* 🚨 Emergency Dispatch Callout Banner */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div
            onClick={onOpenEmergency}
            className="bg-gradient-to-r from-red-950 via-rose-900 to-red-950 hover:from-red-900 hover:to-rose-900 border border-red-500/60 p-4 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 group flex items-center justify-between gap-4 transform hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-extrabold shadow-lg shadow-red-600/50 group-hover:scale-105 transition">
                <AlertTriangle className="w-7 h-7 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-extrabold text-sm tracking-wider uppercase">
                    {t('emergencyCta')}
                  </span>
                  <span className="bg-red-500/30 text-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-400/30 animate-pulse">
                    8 Min Radar Dispatch
                  </span>
                </div>
                <p className="text-slate-200 text-xs font-medium mt-0.5">
                  Electrical, Plumbing, or AC failure? Instant match nearest worker now.
                </p>
              </div>
            </div>

            <button className="hidden sm:flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition shrink-0">
              <span>DISPATCH NOW</span>
            </button>
          </div>
        </div>

        {/* Platform Key Stats Banner */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-emerald-400">2,846+</div>
            <div className="text-xs text-slate-400 mt-0.5">Verified Workers</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-emerald-400">12,480+</div>
            <div className="text-xs text-slate-400 mt-0.5">Jobs Completed</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-emerald-400">4.9 ★</div>
            <div className="text-xs text-slate-400 mt-0.5">Avg Rating</div>
          </div>
          <div className="bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-emerald-400">₹48.6L+</div>
            <div className="text-xs text-slate-400 mt-0.5">Fair Worker Payouts</div>
          </div>
        </div>

      </div>
    </div>
  );
};
