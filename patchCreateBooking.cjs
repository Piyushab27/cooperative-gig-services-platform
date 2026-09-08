const fs = require('fs');

let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

const createBookingRegex = /const createBooking = \(details: \{[\s\S]*?\}\): Booking => \{[\s\S]*?setBookings\(prev => \[newBooking, \.\.\.prev\]\);\n\n    return newBooking;\n  \};/m;

const replacement = `const createBooking = (details: {
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
    const price = details.estimatedPrice || details.worker.basePrice || 450;
    const breakdown = calculateFairWage(price, wageConfig.workerPct, wageConfig.coopPct, wageConfig.welfarePct);
    
    const newId = \`BK-2026-\${Math.floor(1000 + Math.random() * 9000)}\`;

    const newBooking: Booking = {
      id: newId,
      serviceCategory: details.category,
      serviceTitle: \`\${details.worker.categoryLabel} Service\`,
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

    // Optimistic update
    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newId);

    // Async push to Supabase
    import('../services/supabaseService').then(({ supabase }) => {
      supabase.from('bookings').insert([{
        id: newId,
        customer_id: 'c-1',
        worker_id: details.worker.id,
        service_id: details.category,
        service_category: details.category,
        service_title: newBooking.serviceTitle,
        scheduled_date: details.scheduledDate,
        scheduled_time: details.scheduledTime,
        problem_description: details.problem,
        address: newBooking.customerAddress,
        lat: newBooking.customerLat,
        lng: newBooking.customerLng,
        is_emergency: newBooking.isEmergency,
        status: 'requested',
        estimated_price: price,
        wage_total_paid: breakdown.totalPaid,
        wage_worker_earnings: breakdown.workerEarnings,
        wage_cooperative_contribution: breakdown.cooperativeContribution,
        wage_welfare_contribution: breakdown.welfareContribution,
      }]).then(() => {
        // Create initial invoice
        supabase.from('invoices').insert([{
          id: \`INV-\${newId}\`,
          booking_id: newId,
          customer_id: 'c-1',
          worker_id: details.worker.id,
          service_fee: price,
          total: breakdown.totalPaid,
          worker_share: breakdown.workerEarnings,
          cooperative_share: breakdown.cooperativeContribution,
          welfare_share: breakdown.welfareContribution,
          status: 'pending'
        }]).then(() => {
          import('../services/supabaseService').then(({ getSupabaseBookings }) => {
            getSupabaseBookings('c-1').then(res => setBookings(res));
          });
        });
      });
    });

    return newBooking;
  };`;

content = content.replace(createBookingRegex, replacement);
fs.writeFileSync('src/context/DemoContext.tsx', content);
console.log('Patched createBooking.');
