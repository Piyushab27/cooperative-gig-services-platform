const fs = require('fs');
let content = fs.readFileSync('src/services/supabaseService.ts', 'utf8');

const newFunctions = `
export const createSupabaseBooking = async (booking: any) => {
  const { data, error } = await supabase.from('bookings').insert([{
    id: booking.id,
    customer_id: 'c-1',
    worker_id: booking.workerId,
    service_category: booking.serviceCategory,
    service_title: booking.serviceTitle,
    address: booking.customerAddress,
    lat: booking.customerLat,
    lng: booking.customerLng,
    scheduled_date: booking.scheduledDate,
    scheduled_time: booking.scheduledTime,
    problem_description: booking.problemDescription,
    photo_url: booking.photoUrl,
    is_emergency: booking.isEmergency,
    status: 'requested',
    estimated_price: booking.estimatedPrice,
    wage_total_paid: booking.estimatedPrice,
    wage_worker_earnings: booking.wageBreakdown.workerEarnings,
    wage_cooperative_contribution: booking.wageBreakdown.cooperativeContribution,
    wage_welfare_contribution: booking.wageBreakdown.welfareContribution,
    created_at: new Date().toISOString()
  }]).select().single();
  
  if (error) throw error;
  
  await supabase.from('booking_status_history').insert([{
    booking_id: booking.id,
    status: 'requested'
  }]);

  return data;
};
`;

if (!content.includes('createSupabaseBooking')) {
  content += newFunctions;
  fs.writeFileSync('src/services/supabaseService.ts', content);
}
