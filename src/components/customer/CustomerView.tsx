import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useAuth } from '../../context/AuthContext';
import { rankWorkersByAI } from '../../utils/aiMatcher';
import { WorkerWithScore } from '../../types';
import { LandingHero } from './LandingHero';
import { ServiceCategories } from './ServiceCategories';
import { WorkerCard } from './WorkerCard';
import { EmergencyModal } from './EmergencyModal';
import { WorkerProfileModal } from './WorkerProfileModal';
import { BookingWizard } from './BookingWizard';
import { AIMatchingScreen } from './AIMatchingScreen';
import { BookingTracker } from './BookingTracker';
import { TransparentBillModal } from './TransparentBillModal';
import { PaymentModal } from './PaymentModal';
import { RatingModal } from './RatingModal';
import { CustomerDashboard } from './CustomerDashboard';
import { Sparkles, SlidersHorizontal, User, ShieldCheck } from 'lucide-react';

export const CustomerView: React.FC = () => {
  const {
    workers,
    selectedCategory,
    searchQuery,
    createBooking,
    activeBookingId,
    setActiveBookingId
  } = useDemo();
  const { requireAuth } = useAuth();

  const [activeCustomerSubTab, setActiveCustomerSubTab] = useState<'browse' | 'tracker' | 'dashboard'>('browse');

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [selectedProfileWorker, setSelectedProfileWorker] = useState<WorkerWithScore | null>(null);
  const [bookingWizardWorker, setBookingWizardWorker] = useState<WorkerWithScore | null>(null);
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [matchingWorker, setMatchingWorker] = useState<WorkerWithScore | null>(null);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(500);

  // Compute AI Rankings
  const rankedWorkers = rankWorkersByAI(workers, selectedCategory, searchQuery);
  const bestWorker = rankedWorkers[0];

  const handleStartBooking = (worker: WorkerWithScore) => {
    requireAuth(() => {
      setBookingWizardWorker(worker);
      setIsBookingWizardOpen(true);
    });
  };

  const handleBookingConfirmed = (details: any) => {
    setIsBookingWizardOpen(false);
    // Show AI Matching animation
    setMatchingWorker(details.worker);
  };

  const handleConfirmAIMatch = () => {
    if (matchingWorker) {
      createBooking({
        category: selectedCategory,
        worker: matchingWorker,
        scheduledDate: 'Today',
        scheduledTime: '05:00 PM',
        address: 'Flat 402, Green Valley Apartments, Banjara Hills',
        problem: 'Main switchboard repair',
      });
      setMatchingWorker(null);
      setActiveCustomerSubTab('tracker');
    }
  };

  const handleConfirmEmergency = (worker: any) => {
    setIsEmergencyOpen(false);
    createBooking({
      category: selectedCategory,
      worker,
      scheduledDate: 'Right Now (Emergency)',
      scheduledTime: 'Immediate',
      address: 'Flat 402, Green Valley Apartments, Banjara Hills',
      problem: 'Emergency Electrical Failure',
      isEmergency: true,
    });
    setActiveCustomerSubTab('tracker');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Sub-Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCustomerSubTab('browse')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeCustomerSubTab === 'browse'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Browse Services & Workers
            </button>

            <button
              onClick={() => setActiveCustomerSubTab('tracker')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1 ${
                activeCustomerSubTab === 'tracker'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Track Live Booking</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveCustomerSubTab('dashboard')}
              className={`px-3 py-1.5 rounded-xl transition ${
                activeCustomerSubTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Customer Profile & Bookings
            </button>
          </div>

          <button
            onClick={() => requireAuth(() => setIsEmergencyOpen(true))}
            className="text-red-600 font-extrabold flex items-center gap-1 hover:underline text-[11px]"
          >
            <span>🚨 1-Tap Emergency</span>
          </button>
        </div>
      </div>

      {activeCustomerSubTab === 'browse' && (
        <div className="space-y-8">
          
          {/* Landing Hero */}
          <LandingHero onOpenEmergency={() => requireAuth(() => setIsEmergencyOpen(true))} />

          {/* Service Categories Grid */}
          <ServiceCategories />

          {/* AI Search & Worker Results Header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-3 py-0.5 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI SMART MATCH SEARCH</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Verified {selectedCategory.replace('_', ' ').toUpperCase()}S Near You
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Found {rankedWorkers.length} verified cooperative workers in Hyderabad
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Sorted by: <strong>AI Smart Match (Weighted)</strong></span>
              </div>
            </div>

            {/* Workers Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rankedWorkers.map((w, idx) => (
                <WorkerCard
                  key={w.id}
                  worker={w}
                  isBestMatch={idx === 0}
                  onSelectProfile={w => setSelectedProfileWorker(w)}
                  onBookNow={w => handleStartBooking(w)}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      {activeCustomerSubTab === 'tracker' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BookingTracker
            bookingId={activeBookingId || 'BK-2026-9041'}
            onOpenBill={() => setIsBillOpen(true)}
          />
        </div>
      )}

      {activeCustomerSubTab === 'dashboard' && (
        <CustomerDashboard
          onTrackBooking={id => {
            setActiveBookingId(id);
            setActiveCustomerSubTab('tracker');
          }}
          onViewBill={id => {
            setActiveBookingId(id);
            setIsBillOpen(true);
          }}
        />
      )}

      {/* MODAL DIALOGS */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onConfirmEmergency={handleConfirmEmergency}
      />

      <WorkerProfileModal
        worker={selectedProfileWorker}
        onClose={() => setSelectedProfileWorker(null)}
        onBookNow={w => {
          setSelectedProfileWorker(null);
          handleStartBooking(w);
        }}
      />

      <BookingWizard
        isOpen={isBookingWizardOpen}
        preSelectedWorker={bookingWizardWorker}
        onClose={() => setIsBookingWizardOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {matchingWorker && (
        <AIMatchingScreen
          matchedWorker={matchingWorker}
          onConfirmMatch={handleConfirmAIMatch}
        />
      )}

      <TransparentBillModal
        bookingId={activeBookingId || 'BK-2026-9041'}
        isOpen={isBillOpen}
        onClose={() => setIsBillOpen(false)}
        onProceedToPayment={amt => {
          setPaymentAmount(amt);
          setIsBillOpen(false);
          setIsPaymentOpen(true);
        }}
      />

      <PaymentModal
        bookingId={activeBookingId || 'BK-2026-9041'}
        amount={paymentAmount}
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        onPaymentSuccess={() => {
          setIsPaymentOpen(false);
          setIsRatingOpen(true);
        }}
      />

      <RatingModal
        bookingId={activeBookingId || 'BK-2026-9041'}
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
        onSubmitRating={() => {
          setIsRatingOpen(false);
          setActiveCustomerSubTab('dashboard');
        }}
      />

    </div>
  );
};
