const fs = require('fs');
let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

// Replace createBooking
const createBookingRegex = /const createBooking = \([^\)]*\): Booking => \{[\s\S]*?return newBooking;\n  \};/g;

const newCreateBooking = `const createBooking = async (details: any): Promise<Booking> => {
    const price = details.estimatedPrice || details.worker?.basePrice || 450;
    const breakdown = calculateFairWage(price, wageConfig.workerPct, wageConfig.coopPct, wageConfig.welfarePct);

    const newBooking = {
      id: \`BK-2026-\${Math.floor(1000 + Math.random() * 9000)}\`,
      serviceCategory: details.category,
      serviceTitle: \`\${details.worker?.categoryLabel || details.category} Service\`,
      workerId: details.worker?.id || 'w-1',
      workerName: details.worker?.name || 'Worker',
      workerPhoto: details.worker?.photo,
      workerCooperative: details.worker?.cooperativeName || 'Cooperative',
      workerRating: details.worker?.rating || 0,
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
      status: 'requested' as BookingStatus,
      estimatedPrice: price,
      wageBreakdown: breakdown,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI
    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);

    try {
      const { createSupabaseBooking } = await import('../services/supabaseService');
      await createSupabaseBooking(newBooking);
    } catch (err) {
      console.error("Failed to create booking in Supabase", err);
      // Revert optimistic if necessary
    }

    return newBooking;
  };`;

content = content.replace(createBookingRegex, newCreateBooking);

const updateBookingRegex = /const updateBookingStatus = \(bookingId: string, status: BookingStatus\) => \{[\s\S]*?setNotifications\(prev => \[newNotif, ...prev\]\);\n  \};/g;

const newUpdateBooking = `const updateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    // Optimistic UI
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

    try {
      const { updateBookingStatus: updateSupabaseStatus } = await import('../services/supabaseService');
      await updateSupabaseStatus(bookingId, status);
    } catch (err) {
      console.error("Failed to update status in Supabase", err);
      throw err; // So UI can catch it
    }
  };`;

content = content.replace(updateBookingRegex, newUpdateBooking);

// We need to change the interface of createBooking and updateBookingStatus in DemoContextType
content = content.replace(
  "createBooking: (details: {",
  "createBooking: (details: {"
);
content = content.replace(
  "    estimatedPrice?: number;\n  }) => Booking;",
  "    estimatedPrice?: number;\n  }) => Promise<Booking>;"
);

content = content.replace(
  "updateBookingStatus: (bookingId: string, status: BookingStatus) => void;",
  "updateBookingStatus: (bookingId: string, status: BookingStatus) => Promise<void>;"
);

content = content.replace(
  "toggleAvailability: (workerId: string) => void;",
  "toggleAvailability: (workerId: string) => Promise<void>;"
);

const toggleAvailRegex = /const toggleAvailability = \(workerId: string\) => \{[\s\S]*?\};/;
const newToggleAvail = `const toggleAvailability = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;
    const newStatus = !worker.isAvailable;
    
    // Optimistic
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: newStatus } : w));
    
    try {
      const { updateWorkerAvailability } = await import('../services/supabaseService');
      await updateWorkerAvailability(workerId, newStatus);
    } catch (err) {
      console.error("Failed to update availability", err);
      // revert
      setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isAvailable: !newStatus } : w));
      throw err;
    }
  };`;
content = content.replace(toggleAvailRegex, newToggleAvail);

fs.writeFileSync('src/context/DemoContext.tsx', content);
