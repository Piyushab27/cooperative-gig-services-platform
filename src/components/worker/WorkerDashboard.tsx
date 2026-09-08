import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { WorkerHeader } from './WorkerHeader';
import { AIRecommendedJobs } from './AIRecommendedJobs';
import { WorkerEarnings } from './WorkerEarnings';
import { WorkerWelfare } from './WorkerWelfare';
import { WorkerProfileEditor } from './WorkerProfileEditor';
import { InteractiveMap } from '../common/InteractiveMap';
import {
  Briefcase,
  DollarSign,
  Heart,
  UserCheck,
  CheckCircle2,
  Navigation,
  Phone,
  MessageSquare,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const { bookings, updateBookingStatus, activeBookingId, setActiveBookingId } = useDemo();
  const [activeTab, setActiveTab] = useState<'jobs' | 'earnings' | 'welfare' | 'verification' | 'profile'>('jobs');

  const activeJob = bookings.find(b => b.id === activeBookingId && b.status !== 'completed');

  const handleAcceptJob = (bookingId: string) => {
    updateBookingStatus(bookingId, 'accepted');
    setActiveBookingId(bookingId);
  };

  const handleAdvanceJobStatus = () => {
    if (!activeJob) return;
    const flow: Record<string, any> = {
      accepted: 'on_the_way',
      on_the_way: 'arrived',
      arrived: 'in_progress',
      in_progress: 'completed',
    };
    const next = flow[activeJob.status];
    if (next) updateBookingStatus(activeJob.id, next);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Header Banner */}
      <WorkerHeader />

      {/* Active Job Progress Controller Bar if Job Active */}
      {activeJob && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-3xl shadow-xl border border-emerald-500/50 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in slide-in-from-top">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Active Job Assigned ({activeJob.id})
                </span>
                <span className="text-xs font-bold text-amber-300">
                  Status: {activeJob.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-white mt-1">{activeJob.serviceTitle}</h4>
              <p className="text-xs text-slate-200 mt-0.5">
                Customer: <strong className="text-white">{activeJob.customerName}</strong> ({activeJob.customerAddress})
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAdvanceJobStatus}
                className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 flex items-center gap-1.5 transition"
              >
                <span>ADVANCE JOB STEP ({activeJob.status === 'accepted' ? 'On The Way' : activeJob.status === 'on_the_way' ? 'Mark Arrived' : activeJob.status === 'arrived' ? 'Start Service' : 'Finish Job'})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <InteractiveMap
            customerLocationName="Banjara Hills, Hyderabad"
            workerName="You"
            workerPhoto="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&auto=format&fit=crop&q=80"
            workerCategory="Electrician"
            distanceKm={2.1}
            etaMinutes={activeJob.status === 'on_the_way' ? 8 : activeJob.status === 'arrived' ? 0 : 5}
            statusText={`Status: ${activeJob.status.replace('_', ' ').toUpperCase()}`}
            heightClass="h-48"
          />
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'jobs'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>AI Recommended Jobs</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('earnings')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'earnings'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Fair Wage Earnings</span>
        </button>

        <button
          onClick={() => setActiveTab('welfare')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'welfare'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Welfare & Insurance</span>
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
            activeTab === 'verification'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Co-op Verification</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'jobs' && <AIRecommendedJobs onAcceptJob={handleAcceptJob} />}
      {activeTab === 'profile' && <WorkerProfileEditor />}
      {activeTab === 'earnings' && <WorkerEarnings />}
      {activeTab === 'welfare' && <WorkerWelfare />}
      {activeTab === 'verification' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-lg text-slate-900">Cooperative Verification Checklist</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-emerald-900 block">Aadhaar / Govt Photo ID Verification</span>
                  <span className="text-slate-500">Verified by Hyderabad Federation Admin</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">VERIFIED</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-emerald-900 block">Skill Trade Certificate (ITI Electrical)</span>
                  <span className="text-slate-500">National Trade Certificate Valid</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">VERIFIED</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="font-bold text-emerald-900 block">Cooperative Membership Badge</span>
                  <span className="text-slate-500">Hyderabad Labour Cooperative Society (HLCS-2021-089)</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">ACTIVE</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
