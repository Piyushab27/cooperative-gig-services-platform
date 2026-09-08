import React from 'react';
import { Sparkles, TrendingUp, AlertCircle, MapPin, Zap, Snowflake, Wrench, Sparkle } from 'lucide-react';

export const AIDemandForecast: React.FC = () => {
  const forecasts = [
    { trade: '⚡ Electricians', level: 'HIGH', percentage: '+24%', colorBg: 'bg-emerald-100', colorText: 'text-emerald-800' },
    { trade: '❄ AC Technicians', level: 'VERY HIGH', percentage: '+32%', colorBg: 'bg-sky-100', colorText: 'text-sky-800' },
    { trade: '🔧 Plumbers', level: 'HIGH', percentage: '+18%', colorBg: 'bg-blue-100', colorText: 'text-blue-800' },
    { trade: '🧹 Cleaners & Helpers', level: 'MEDIUM', percentage: '+8%', colorBg: 'bg-purple-100', colorText: 'text-purple-800' },
    { trade: '🎨 Painters', level: 'LOW', percentage: '-4%', colorBg: 'bg-slate-100', colorText: 'text-slate-700' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Predictive Analytics</span>
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">
            Tomorrow's AI Service Demand Forecast
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
          Updated 10 mins ago • Hyderabad Region
        </span>
      </div>

      {/* Demand Level Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {forecasts.map(f => (
          <div key={f.trade} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
            <span className="font-extrabold text-xs text-slate-800 block">{f.trade}</span>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${f.colorBg} ${f.colorText}`}>
              {f.level}
            </span>
            <span className="text-xs font-bold text-emerald-600 block mt-1">{f.percentage} Demand</span>
          </div>
        ))}
      </div>

      {/* Key AI Insights Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        
        <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 flex flex-col justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0 shadow">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-sky-900 block">AI Heatmap Insight #1</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium mt-0.5">
                "AC technician demand is predicted to increase by <strong className="text-sky-900 font-bold">32% tomorrow</strong> in Hyderabad due to expected 38°C temperature spike."
              </p>
            </div>
          </div>
          <button className="w-full mt-2 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition shadow-sm">
            Send Alert to AC Technicians
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex flex-col justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xs text-blue-900 block">AI Peak Hour Insight #2</span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium mt-0.5">
                "Central Hyderabad (Banjara Hills & Gachibowli) has highest expected plumbing demand between <strong className="text-blue-900 font-bold">6 PM and 9 PM</strong>."
              </p>
            </div>
          </div>
          <button className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition shadow-sm">
            Activate Peak Pricing (+15%)
          </button>
        </div>

      </div>

    </div>
  );
};
