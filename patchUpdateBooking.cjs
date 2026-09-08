const fs = require('fs');

let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

const updateRegex = /const updateBookingStatus = \(bookingId: string, status: BookingStatus\) => \{[\s\S]*?\}\);\n  \};/m;

const replacement = `const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    // Optimistic update
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

    // Async push to Supabase
    import('../services/supabaseService').then(({ updateSupabaseBookingStatus, getSupabaseBookings }) => {
      updateSupabaseBookingStatus(bookingId, status).then(() => {
        getSupabaseBookings('c-1').then(res => {
          if (res.length > 0) setBookings(res);
        });
      });
    });
  };`;

content = content.replace(updateRegex, replacement);
fs.writeFileSync('src/context/DemoContext.tsx', content);
console.log('Patched updateBookingStatus.');
