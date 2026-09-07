import React from 'react';
import { WorkerWithScore } from '../../types';
import { VerifiedBadge } from '../common/VerifiedBadge';
import { Sparkles, Star, MapPin, Award, Clock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WorkerCardProps {
  worker: WorkerWithScore;
  onSelectProfile: (worker: WorkerWithScore) => void;
  onBookNow: (worker: WorkerWithScore) => void;
  isBestMatch?: boolean;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onSelectProfile,
  onBookNow,
  isBestMatch = false,
}) => {
  const matchPct = worker.aiMatch.totalScore;

  return (
    <div
      className={`bg-white rounded-3xl p-5 transition-all duration-300 border relative flex flex-col justify-between group ${
        isBestMatch
          ? 'border-emerald-500 shadow-2xl ring-2 ring-emerald-500/30'
          : 'border-slate-200 hover:border-emerald-300 hover:shadow-xl'
      }`}
    >
      {/* Top Banner for Best AI Match */}
      {isBestMatch && (
        <div className="absolute -top-3 left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>BEST AI MATCH</span>
        </div>
      )}

      <div>
        {/* Worker Header: Photo + AI Score Badge */}
        <div className="flex items-start justify-between gap-3 mb-3 pt-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={worker.photo}
                alt={worker.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/40 shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-base text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                {worker.name}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                {worker.categoryLabel}
              </p>
              <div className="mt-1">
                <VerifiedBadge cooperativeName={worker.cooperativeName} size="sm" />
              </div>
            </div>
          </div>

          {/* AI Match Score Circular Badge */}
          <div className="flex flex-col items-end shrink-0">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-extrabold px-2.5 py-1 rounded-xl shadow-md text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{matchPct}% Match</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold mt-0.5">AI Smart Match</span>
          </div>
        </div>

        {/* Worker Metrics Strip */}
        <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2.5 rounded-2xl text-center my-3 border border-slate-100 text-xs">
          <div>
            <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{worker.rating}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">{worker.jobsCompleted} jobs</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>{worker.distanceKm} km</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Distance</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 font-extrabold text-slate-900">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>{worker.experienceYears} yrs</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Experience</div>
          </div>
        </div>

        {/* AI Rationale Summary Box */}
        <div className="bg-emerald-50/60 p-2.5 rounded-2xl border border-emerald-100/80 mb-3 text-[11px]">
          <div className="flex items-center gap-1 text-emerald-900 font-extrabold mb-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Why AI Recommended:</span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium line-clamp-2">
            "{worker.aiMatch.reasons[0] || 'Top skill match & low workload'}. {worker.aiMatch.reasons[1] || ''}"
          </p>
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {worker.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg"
            >
              ⚡ {skill}
            </span>
          ))}
          {worker.skills.length > 3 && (
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-lg">
              +{worker.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Footer: Price & CTAs */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div>
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Est. Base Fare</span>
          <span className="text-base font-extrabold text-slate-900">₹{worker.basePrice} <span className="text-xs font-normal text-slate-500">onwards</span></span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectProfile(worker)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
          >
            Profile
          </button>

          <button
            onClick={() => onBookNow(worker)}
            className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-md shadow-emerald-600/20 flex items-center gap-1"
          >
            <span>Book</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
