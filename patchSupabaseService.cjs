const fs = require('fs');

let content = fs.readFileSync('src/services/supabaseService.ts', 'utf8');

const newFunctions = `
export const getWorkerProfile = async (workerId: string) => {
  const { data, error } = await supabase
    .from('workers')
    .select(\`
      *,
      cooperatives ( name ),
      worker_skills ( skill ),
      worker_languages ( language ),
      worker_certifications ( certification, issue_date, expiry_date ),
      welfare ( status, fund_balance, last_contribution_date ),
      insurance ( coverage_details, status, policy_number )
    \`)
    .eq('id', workerId)
    .single();
  if (error) throw error;
  return data;
};

export const getWorkerBookings = async (workerId: string): Promise<Booking[]> => {
  const { data, error } = await supabase
    .from('bookings')
    .select(\`
      *,
      workers ( name, photo, cooperatives ( name ), rating ),
      customers ( name, phone, address, lat, lng )
    \`)
    .eq('worker_id', workerId);
  if (error) throw error;
  
  return data.map((b: any) => ({
    id: b.id,
    serviceCategory: b.service_category as ServiceCategory,
    serviceTitle: b.service_title,
    workerId: b.worker_id,
    workerName: b.workers?.name,
    workerPhoto: b.workers?.photo,
    workerCooperative: b.workers?.cooperatives?.name || 'Cooperative',
    workerRating: Number(b.workers?.rating || 0),
    customerName: b.customers?.name,
    customerPhone: b.customers?.phone,
    customerAddress: b.address || b.customers?.address,
    customerLat: Number(b.lat || b.customers?.lat),
    customerLng: Number(b.lng || b.customers?.lng),
    scheduledDate: b.scheduled_date,
    scheduledTime: b.scheduled_time,
    problemDescription: b.problem_description,
    photoUrl: b.photo_url,
    isEmergency: b.is_emergency,
    status: b.status,
    estimatedPrice: Number(b.estimated_price),
    finalPrice: b.final_price ? Number(b.final_price) : undefined,
    wageBreakdown: {
      totalPaid: Number(b.wage_total_paid),
      workerEarnings: Number(b.wage_worker_earnings),
      cooperativeContribution: Number(b.wage_cooperative_contribution),
      welfareContribution: Number(b.wage_welfare_contribution),
      workerPercentage: 85,
      cooperativePercentage: 10,
      welfarePercentage: 5,
    },
    createdAt: b.created_at,
    completedAt: b.completed_at,
    rating: b.rating ? Number(b.rating) : undefined,
    reviewComment: b.review_comment
  }));
};

export const getWorkerEmergencyRequests = async (workerId: string) => {
  // Mock logic to simulate assigned requests for this worker based on skills/availability
  const { data, error } = await supabase
    .from('emergency_requests')
    .select(\`
      *,
      customers ( name, phone, address, lat, lng )
    \`)
    .eq('status', 'active');
  if (error) throw error;
  return data; // Further filtering can be applied in the UI
};

export const updateWorkerAvailability = async (workerId: string, isAvailable: boolean) => {
  const { error } = await supabase.from('workers').update({ is_available: isAvailable }).eq('id', workerId);
  if (error) throw error;
};

export const updateWorkerEmergencyReady = async (workerId: string, isReady: boolean) => {
  const { error } = await supabase.from('workers').update({ is_emergency_ready: isReady }).eq('id', workerId);
  if (error) throw error;
};

export const acceptBooking = async (bookingId: string) => {
  return updateBookingStatus(bookingId, 'accepted');
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', bookingId);
  if (error) throw error;
  
  // Create history entry
  const { error: histErr } = await supabase.from('booking_status_history').insert([{
    booking_id: bookingId,
    status: status
  }]);
  if (histErr) throw histErr;
};

export const getWorkerEarnings = async (workerId: string) => {
  const { data, error } = await supabase.from('invoices').select('*').eq('worker_id', workerId);
  if (error) throw error;
  return data;
};

export const getWorkerWelfare = async (workerId: string) => {
  const { data, error } = await supabase.from('welfare').select('*').eq('worker_id', workerId).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getWorkerInsurance = async (workerId: string) => {
  const { data, error } = await supabase.from('insurance').select('*').eq('worker_id', workerId).single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getWorkerCertifications = async (workerId: string) => {
  const { data, error } = await supabase.from('worker_certifications').select('*').eq('worker_id', workerId);
  if (error) throw error;
  return data;
};
`;

content = content.replace(
  "export const updateSupabaseBookingStatus = async (bookingId: string, newStatus: string) => {",
  "export const updateSupabaseBookingStatus = async (bookingId: string, newStatus: string) => {\n  await updateBookingStatus(bookingId, newStatus);\n};\n/*"
);
content = content.replace(
  "  if (error) throw error;\n};",
  "  if (error) throw error;\n};\n*/"
);

content += newFunctions;

fs.writeFileSync('src/services/supabaseService.ts', content);
