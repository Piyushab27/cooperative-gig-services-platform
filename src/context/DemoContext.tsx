import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  Role,
  Language,
  ServiceCategory,
  Worker,
  Booking,
  BookingStatus,
  ChatMessage,
  NotificationItem
} from '../types';
import { MOCK_WORKERS } from '../data/mockWorkers';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { TRANSLATIONS } from '../data/translations';
import { calculateFairWage } from '../utils/fairWage';

interface WageConfig {
  workerPct: number;
  coopPct: number;
  welfarePct: number;
}

interface FilterOptions {
  maxDistance: number;
  minRating: number;
}

interface DemoContextType {
  role: Role;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  location: string;
  setLocation: (loc: string) => void;
  workers: Worker[];
  bookings: Booking[];
  activeBookingId: string | null;
  setActiveBookingId: (id: string | null) => void;
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;
  selectedCategory: ServiceCategory | null;
  setSelectedCategory: (cat: ServiceCategory | null) => void;
  selectedCategories: ServiceCategory[];
  setSelectedCategories: (cats: ServiceCategory[]) => void;
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: (mode: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isEmergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  messages: Record<string, ChatMessage[]>;
  sendMessage: (bookingId: string, text: string, sender: 'customer' | 'worker') => void;
  markMessagesRead: (bookingId: string, userId: string) => void;
  wageConfig: WageConfig;
  setWageConfig: (config: WageConfig) => void;
  // Booking mutations
  createBooking: (details: {
    category: ServiceCategory;
    worker: Worker;
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    problem: string;
    photoUrl?: string;
    isEmergency?: boolean;
    estimatedPrice?: number;
  }) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  submitRating: (bookingId: string, rating: number, comment: string, tags: string[]) => void;
  updateWorkerProfile: (workerId: string, updates: Partial<Worker>) => void;
  toggleAvailability: (workerId: string) => void;
  approveWorker: (workerId: string) => void;
  rejectWorker: (workerId: string) => void;
  // Demo Launcher
  triggerDemoJourney: (role: Role) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'BK-2026-9041': [
    {
      id: 'm-1',
      bookingId: 'BK-2026-9041',
      sender: 'worker',
      senderName: 'Ravi Kumar',
      text: 'Namaste Priya ji! I have accepted your electrical repair booking.',
      timestamp: '04:35 PM',
    },
    {
      id: 'm-2',
      bookingId: 'BK-2026-9041',
      sender: 'customer',
      senderName: 'Priya Sharma',
      text: 'Hello Ravi! Please call me when you reach the main entrance gate of Green Valley Apartments.',
      timestamp: '04:37 PM',
    },
    {
      id: 'm-3',
      bookingId: 'BK-2026-9041',
      sender: 'worker',
      senderName: 'Ravi Kumar',
      text: 'Sure! I am on the way on my electric scooter. ETA around 8 minutes.',
      timestamp: '04:38 PM',
    }
  ]
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Booking Accepted',
    message: 'Ravi Kumar (Verified Member, HLCS) has accepted your Electrician booking.',
    timestamp: '5 min ago',
    type: 'booking',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Worker On The Way',
    message: 'Ravi Kumar is navigating to Flat 402, Banjara Hills. ETA 8 mins.',
    timestamp: '12 min ago',
    type: 'booking',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Fair Wage Deposit',
    message: '₹425 direct wage + ₹25 Welfare Fund updated for Ravi Kumar.',
    timestamp: '1 hour ago',
    type: 'payment',
    read: true,
  }
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role: authRole, requireAuth } = useAuth();
  const [demoOverrideRole, setDemoOverrideRole] = useState<Role | null>(null);
  const role: Role = demoOverrideRole || authRole || 'customer';
  
  const [language, setLanguage] = useState<Language>('en');
  const [location, setLocation] = useState<string>('Hyderabad (Banjara Hills)');
  const [workers, setWorkers] = useState<Worker[]>(MOCK_WORKERS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [activeBookingId, setActiveBookingId] = useState<string | null>('BK-2026-9041');
  const [activeWorkerId, setActiveWorkerId] = useState<string>('w-1');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<ServiceCategory[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    maxDistance: 10,
    minRating: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [wageConfig, setWageConfig] = useState<WageConfig>({
    workerPct: 85,
    coopPct: 10,
    welfarePct: 5,
  });

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const sendMessage = (bookingId: string, text: string, sender: 'customer' | 'worker') => {
    const newMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      bookingId,
      sender,
      senderName: sender === 'customer' ? 'Priya Sharma' : 'Ravi Kumar',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [bookingId]: [...(prev[bookingId] || []), newMsg],
    }));
  };

  const createBooking = (details: {
    category: ServiceCategory;
    worker: Worker;
    scheduledDate: string;
    scheduledTime: string;
    address: string;
    problem: string;
    photoUrl?: string;
    isEmergency?: boolean;
    estimatedPrice?: number;
  }): Booking => {
    // This is a protected action, but it should have already been protected by the component calling it.
    const price = details.estimatedPrice || details.worker.basePrice || 450;
    const breakdown = calculateFairWage(price, wageConfig.workerPct, wageConfig.coopPct, wageConfig.welfarePct);

    const newBooking: Booking = {
      id: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceCategory: details.category,
      serviceTitle: `${details.worker.categoryLabel} Service`,
      workerId: details.worker.id,
      workerName: details.worker.name,
      workerPhoto: details.worker.photo,
      workerCooperative: details.worker.cooperativeName,
      workerRating: details.worker.rating,
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      customerAddress: details.address || 'Flat 402, Green Valley Apartments, Banjara Hills, Hyderabad',
      customerLat: 17.3850,
      customerLng: 78.4867,
      scheduledDate: details.scheduledDate,
      scheduledTime: details.scheduledTime,
      problemDescription: details.problem,
      photoUrl: details.photoUrl,
      isEmergency: details.isEmergency || false,
      status: 'requested',
      estimatedPrice: price,
      wageBreakdown: breakdown,
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);

    // Add notification
    const newNotif: NotificationItem = {
      id: 'n-' + Date.now(),
      title: 'Booking Confirmed!',
      message: `${details.worker.name} matched with ${newBooking.id}. Status: Accepted`,
      timestamp: 'Just now',
      type: 'booking',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const finalPrice = b.finalPrice || b.estimatedPrice;
        const updatedWage = calculateFairWage(finalPrice, wageConfig.workerPct, wageConfig.coopPct, wageConfig.welfarePct);
        return {
          ...b,
          status,
          finalPrice,
          wageBreakdown: updatedWage,
          completedAt: status === 'completed' ? new Date().toISOString() : b.completedAt,
        };
      }
      return b;
    }));

    // Update notification
    const notifMap: Record<BookingStatus, string> = {
      requested: 'Booking requested',
      accepted: 'Worker accepted job request',
      on_the_way: 'Worker is on the way (ETA 8 mins)',
      arrived: 'Worker has arrived at your location',
      in_progress: 'Service work in progress',
      completed: 'Service completed! Invoice generated.',
      cancelled: 'Booking cancelled',
    };

    const newNotif: NotificationItem = {
      id: 'n-' + Date.now(),
      title: `Status: ${status.replace('_', ' ').toUpperCase()}`,
      message: notifMap[status] || `Booking status updated to ${status}`,
      timestamp: 'Just now',
      type: status === 'completed' ? 'payment' : 'booking',
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const submitRating = (bookingId: string, rating: number, comment: string, tags: string[]) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          rating,
          reviewComment: comment,
        };
      }
      return b;
    }));

    // Also push review to worker
    const targetBooking = bookings.find(b => b.id === bookingId);
    if (targetBooking) {
      setWorkers(prev => prev.map(w => {
        if (w.id === targetBooking.workerId) {
          const newReview = {
            id: 'r-' + Date.now(),
            customerName: 'Priya Sharma',
            rating,
            date: 'Just now',
            comment,
            tags,
          };
          const totalRatingSum = w.rating * w.reviews.length + rating;
          const newCount = w.reviews.length + 1;
          const newAvg = Number((totalRatingSum / newCount).toFixed(1));
          return {
            ...w,
            rating: newAvg,
            jobsCompleted: w.jobsCompleted + 1,
            reviews: [newReview, ...w.reviews],
          };
        }
        return w;
      }));
    }
  };

  const approveWorker = (workerId: string) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, verificationStatus: 'verified' } : w));
  };

  const rejectWorker = (workerId: string) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, verificationStatus: 'pending' } : w));
  };

  const updateWorkerProfile = (workerId: string, updates: Partial<Worker>) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, ...updates } : w));
  };

  const toggleAvailability = (workerId: string) => {
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: !w.isAvailable } : w));
  };

  const markMessagesRead = (bookingId: string, userId: string) => {
    // Mock implementation
  };

  const triggerDemoJourney = (targetRole: Role) => {
    setDemoOverrideRole(targetRole);
    window.scrollTo(0, 0);
  };
  // const oldTriggerDemoJourney = (targetRole: Role) => {
    // console.log(`Demo Journey triggered for ${targetRole} - Action disabled due to Real Auth.`);
  // };

  return (
    <DemoContext.Provider
      value={{
        role,
        language,
        setLanguage,
        t,
        location,
        setLocation,
        workers,
        bookings,
        activeBookingId,
        setActiveBookingId,
        activeWorkerId,
        setActiveWorkerId,
        selectedCategory,
        setSelectedCategory,
        selectedCategories,
        setSelectedCategories,
        isMultiSelectMode,
        setIsMultiSelectMode,
        searchQuery,
        setSearchQuery,
        filterOptions,
        setFilterOptions,
        isLoading,
        setIsLoading,
        isEmergencyModalOpen,
        setEmergencyModalOpen,
        notifications,
        markNotificationRead,
        messages,
        sendMessage,
        markMessagesRead,
        wageConfig,
        setWageConfig,
        createBooking,
        updateBookingStatus,
        submitRating,
        updateWorkerProfile,
        toggleAvailability,
        approveWorker,
        rejectWorker,
        triggerDemoJourney,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
