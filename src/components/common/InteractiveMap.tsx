import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

interface InteractiveMapProps {
  customerLocationName?: string;
  workerName?: string;
  workerPhoto?: string;
  workerCategory?: string;
  distanceKm?: number;
  etaMinutes?: number;
  statusText?: string;
  heightClass?: string;
  isRadarMode?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  customerLocationName = 'Banjara Hills, Hyderabad',
  workerName = 'Ravi Kumar',
  workerPhoto = 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80',
  workerCategory = 'Electrician',
  distanceKm = 2.1,
  etaMinutes = 8,
  statusText = 'Worker is on the way (En Route)',
  heightClass = 'h-72',
  isRadarMode = false,
}) => {
  // Simulate slight moving animation for worker pin
  const [workerPosOffset, setWorkerPosOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkerPosOffset(prev => ({
        x: (prev.x + 1) % 20,
        y: (prev.y + 1) % 20,
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full ${heightClass} bg-slate-900 rounded-2xl overflow-hidden shadow-inner border border-slate-700 select-none group`}>
      {/* Canvas Map Graphics Mockup */}
      <svg className="absolute inset-0 w-full h-full opacity-40 stroke-slate-700" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Mock Road Network */}
        <path d="M 0 100 Q 150 120 300 80 T 600 150 T 900 100" fill="none" stroke="#334155" strokeWidth="12" />
        <path d="M 120 0 Q 140 180 280 300 T 500 400" fill="none" stroke="#334155" strokeWidth="8" />
        <path d="M 400 0 C 350 200 200 250 100 400" fill="none" stroke="#1e293b" strokeWidth="16" />

        {/* Dynamic Route Line from Worker to Customer */}
        <path
          d="M 140 90 C 220 120 280 180 340 220"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeDasharray="6 6"
          className="animate-pulse"
        />
      </svg>

      {/* Radar Search Ripple Effect if Radar Mode */}
      {isRadarMode && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-emerald-500/40 bg-emerald-500/10 animate-ping" />
          <div className="w-32 h-32 rounded-full border border-emerald-400/60 bg-emerald-500/20 animate-ping delay-300" />
        </div>
      )}

      {/* Customer Location Pin */}
      <div className="absolute top-[65%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-emerald-500/30 animate-ping absolute inset-0" />
          <div className="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white relative">
            <MapPin className="w-5 h-5 fill-white text-emerald-600" />
          </div>
        </div>
        <div className="bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow border border-slate-700 mt-1 whitespace-nowrap">
          📍 You ({customerLocationName})
        </div>
      </div>

      {/* Worker Location Pin (Animated En Route) */}
      <div
        style={{
          top: `calc(28% + ${workerPosOffset.y * 0.5}px)`,
          left: `calc(32% + ${workerPosOffset.x * 0.5}px)`,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-1000 ease-in-out"
      >
        <div className="relative group/worker flex flex-col items-center">
          <div className="bg-slate-900 text-white p-1 rounded-full border-2 border-emerald-400 shadow-xl relative">
            <img src={workerPhoto} alt={workerName} className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>
          <div className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow mt-1 whitespace-nowrap flex items-center gap-1">
            <Navigation className="w-3 h-3 animate-bounce" />
            {workerName} ({workerCategory})
          </div>
        </div>
      </div>

      {/* Map Control Overlay Badges */}
      <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-700/80 shadow-md flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{statusText}</span>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-700 shadow-md flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span>Distance: <strong className="text-white">{distanceKm} km</strong></span>
          <span className="text-slate-600">|</span>
          <span>ETA: <strong className="text-emerald-400">{etaMinutes} mins</strong></span>
        </div>
      </div>

      {/* Map watermark branding */}
      <div className="absolute top-3 right-3 text-[10px] font-bold text-slate-500 tracking-wider uppercase pointer-events-none">
        Sahakaar Geo-Dispatch v1.0
      </div>
    </div>
  );
};
