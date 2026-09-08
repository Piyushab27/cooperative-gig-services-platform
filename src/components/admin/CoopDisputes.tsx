import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { AlertTriangle, MessageSquare, ArrowRight } from 'lucide-react';

export const CoopDisputes: React.FC = () => {
  const { bookings } = useDemo();
  // Mock disputes based on bookings
  const mockDisputes = bookings.slice(0, 1).map(b => ({
    id: `DSP-${b.id.split('-')[2]}`,
    bookingId: b.id,
    customerName: b.customerName,
    workerName: b.workerName,
    category: 'Overcharging',
    description: 'Worker asked for ₹200 extra for unused materials.',
    status: 'UNDER REVIEW',
    priority: 'Medium',
    raisedAgo: '2 days ago'
  }));

  return (
    <div className="space-y-6">
      
      {mockDisputes.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <h3 className="text-lg font-extrabold text-slate-900">No Active Complaints</h3>
        </div>
      ) : (
        <div className="space-y-4">
          {mockDisputes.map(dispute => (
            <div key={dispute.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 md:items-center justify-between">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    DISPUTE #{dispute.bookingId}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Raised {dispute.raisedAgo}</span>
                </div>
                
                <h4 className="font-extrabold text-slate-900 text-lg">{dispute.category}</h4>
                <p className="text-sm text-slate-600 mt-1 max-w-lg">{dispute.description}</p>
                
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>Customer: <strong className="text-slate-700">{dispute.customerName}</strong></span>
                  <span>Worker: <strong className="text-slate-700">{dispute.workerName}</strong></span>
                </div>
              </div>

              <div className="flex flex-col gap-2 min-w-[200px]">
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-slate-400 uppercase">Status</span>
                  <span className="text-orange-600 uppercase">{dispute.status}</span>
                </div>
                
                <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> View Case
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
