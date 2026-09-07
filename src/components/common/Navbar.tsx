import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Language, Role } from '../../types';
import {
  Handshake,
  MapPin,
  Globe,
  Bell,
  User,
  HardHat,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    t,
    location,
    setLocation,
    notifications,
    markNotificationRead
  } = useDemo();

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const locations = [
    'Hyderabad (Banjara Hills)',
    'Hyderabad (Gachibowli)',
    'Hyderabad (Secunderabad)',
    'Warangal Central',
    'Vijayawada City',
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Sahakaar Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-600/30">
              <Handshake className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Sahakaar<span className="text-emerald-600">.</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Co-op
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Cooperative Service Marketplace
              </p>
            </div>
          </div>

          {/* Location Selector (Customer view) */}
          {role === 'customer' && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-semibold text-slate-700 transition border border-slate-200/60"
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{location}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showLocationMenu && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Service Location
                  </div>
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 hover:text-emerald-700 ${
                        location === loc ? 'font-bold text-emerald-600 bg-emerald-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{loc}</span>
                      {location === loc && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Center Role Toggle Pills */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200/80">
            <button
              onClick={() => setRole('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'customer'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t('customerRole')}</span>
            </button>

            <button
              onClick={() => setRole('worker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'worker'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>{t('workerRole')}</span>
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === 'admin'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('adminRole')}</span>
            </button>
          </div>

          {/* Right Actions: Language + Notifications + Avatar */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition border border-slate-200/60"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span className="uppercase font-bold text-slate-800">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Language / భాష
                  </div>
                  <button
                    onClick={() => { setLanguage('en'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'en' ? 'font-bold text-emerald-600' : 'text-slate-700'
                    }`}
                  >
                    <span>English</span>
                    {language === 'en' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'te' ? 'font-bold text-emerald-600' : 'text-slate-700'
                    }`}
                  >
                    <span>తెలుగు (Telugu)</span>
                    {language === 'te' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setShowLangMenu(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 ${
                      language === 'hi' ? 'font-bold text-emerald-600' : 'text-slate-700'
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {language === 'hi' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-800">Notifications</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 text-xs hover:bg-slate-50 transition cursor-pointer ${
                          !n.read ? 'bg-emerald-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="pl-2 border-l border-slate-200 flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-emerald-100 border-2 border-emerald-500/40 overflow-hidden shrink-0 flex items-center justify-center">
                {role === 'customer' ? (
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                    alt="Priya Sharma"
                    className="w-full h-full object-cover"
                  />
                ) : role === 'worker' ? (
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80"
                    alt="Ravi Kumar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                )}
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {role === 'customer' ? 'Priya Sharma' : role === 'worker' ? 'Ravi Kumar' : 'Federation Admin'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium capitalize">
                  {role === 'customer' ? 'Customer' : role === 'worker' ? 'Verified Member' : 'Cooperative Federation'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
