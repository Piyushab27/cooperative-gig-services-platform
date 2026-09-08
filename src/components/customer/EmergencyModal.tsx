import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Worker } from '../../types';
import { InteractiveMap } from '../common/InteractiveMap';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { AlertTriangle, X, Zap, Wrench, Snowflake, Lock, Settings, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmEmergency: (worker: Worker) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onConfirmEmergency,
}) => {
  const { workers } = useDemo();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [foundWorker, setFoundWorker] = useState<Worker | null>(null);

  if (!isOpen) return null;

  const emergencyTypes = [
    { id: 'electrical', label: '⚡ Electrical Emergency', category: 'electrician', icon: Zap },
    { id: 'plumbing', label: '🔧 Plumbing Leak Emergency', category: 'plumber', icon: Wrench },
    { id: 'ac', label: '❄ AC Cooling Failure', category: 'ac_technician', icon: Snowflake },
    { id: 'appliance', label: '🔩 Appliance Breakdown', category: 'appliance_repair', icon: Settings },
    { id: 'other', label: '🔒 Other Urgent Issue', category: 'carpenter', icon: Lock },
  ];

  const handleToggle = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleStartSearch = () => {
    if (selectedTypes.length === 0) return;
    setIsSearching(true);
    setFoundWorker(null);

    setTimeout(() => {
      // Pick best matching available worker for the first selected emergency
      const firstSelected = selectedTypes[0];
      const matchedCategory = emergencyTypes.find(t => t.id === firstSelected)?.category || 'electrician';
      const worker = workers.find(w => w.category === matchedCategory && w.isAvailable) || workers[0];
      setFoundWorker(worker);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      <div className="bg-slate-900 border border-red-500/40 text-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          aria-label="Close emergency modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/50 flex items-center justify-center text-red-500 font-bold shrink-0 shadow-lg shadow-red-950">
            <AlertTriangle className="w-7 h-7 animate-bounce" aria-hidden="true" />
          </div>
          <div>
            <span className="text-red-400 font-extrabold text-xs uppercase tracking-widest bg-red-950/80 border border-red-500/30 px-2.5 py-0.5 rounded-full">
              🚨 Priority Dispatch
            </span>
            <h3 id="emergency-modal-title" className="text-xl font-extrabold text-white mt-1">
              Emergency Service Needed
            </h3>
          </div>
        </div>

        {!foundWorker && !isSearching && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Select one or multiple emergency issues. We will dispatch the nearest verified cooperative worker within 8–10 minutes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {emergencyTypes.map(t => {
                const Icon = t.icon;
                const isSel = selectedTypes.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => handleToggle(t.id)}
                    className={`p-3.5 rounded-2xl text-left border flex items-center gap-3 transition-all ${
                      isSel
                        ? 'bg-red-950/60 border-red-500 text-white font-bold ring-2 ring-red-500/30 shadow-lg'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSel ? 'border-red-500 bg-red-500 text-white' : 'border-slate-500'}`}>
                      {isSel && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <Icon className={`w-5 h-5 ${isSel ? 'text-red-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-400 font-medium mb-3">
                {selectedTypes.length > 0 ? (
                  <span className="text-white">
                    Selected: <span className="font-bold text-red-400">{selectedTypes.length} emergencies</span>
                    <br />
                    • {selectedTypes.map(id => emergencyTypes.find(t => t.id === id)?.label.replace(/.* /, '')).join(', ')}
                  </span>
                ) : (
                  'Select at least one emergency type.'
                )}
              </p>
              <button
                onClick={handleStartSearch}
                disabled={selectedTypes.length === 0}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition flex items-center justify-center gap-2 ${
                  selectedTypes.length > 0 
                    ? 'bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-900/50 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>DISPATCH NOW</span>
              </button>
            </div>
          </div>
        )}

        {/* Searching Animated State */}
        {isSearching && (
          <div className="py-8 text-center space-y-6">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-red-500/30 animate-ping" />
              <div className="absolute inset-2 rounded-full border-4 border-red-500/60 animate-ping delay-200" />
              <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-xl shadow-red-600/50">
                <AlertTriangle className="w-10 h-10 animate-bounce" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white">Searching nearby radar...</h4>
              <p className="text-xs text-slate-400 mt-1">Connecting to Hyderabad Labour Cooperative Network</p>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 max-w-sm mx-auto space-y-2 text-xs text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> <span>Skill match verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> <span>Worker available right now</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> <span>Identity & Cooperative membership verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> <span>Within 2.5 km service radius</span>
              </div>
            </div>
          </div>
        )}

        {/* Worker Found Confirmation */}
        {foundWorker && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-emerald-950/80 border border-emerald-500/60 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  ✓ Perfect Emergency Match Found
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">Worker Ready for Instant Dispatch</h4>
              </div>
              <span className="bg-emerald-500 text-white font-extrabold text-xs px-3 py-1 rounded-full animate-pulse">
                ETA: 8 Mins
              </span>
            </div>

            {/* Worker Details Card */}
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700 flex items-center gap-4">
              <img
                src={foundWorker.photo}
                alt={foundWorker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shrink-0"
              />
              <div className="flex-1">
                <h5 className="font-extrabold text-base text-white">{foundWorker.name}</h5>
                <div className="mt-1">
                  <VerifiedBadge cooperativeName={foundWorker.cooperativeName} size="sm" />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
                  <span>⭐ {foundWorker.rating} ({foundWorker.jobsCompleted} jobs)</span>
                  <span>•</span>
                  <span>📍 {foundWorker.distanceKm} km away</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-bold">🟢 Available</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Preview */}
            <InteractiveMap
              customerLocationName="Banjara Hills"
              workerName={foundWorker.name}
              workerPhoto={foundWorker.photo}
              workerCategory={foundWorker.categoryLabel}
              distanceKm={foundWorker.distanceKm}
              etaMinutes={8}
              statusText="Nearest Emergency Dispatch"
              heightClass="h-44"
              isRadarMode={true}
            />

            <button
              onClick={() => onConfirmEmergency(foundWorker)}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-xl shadow-emerald-900/50 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>CONFIRM & DISPATCH EMERGENCY WORKER</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
