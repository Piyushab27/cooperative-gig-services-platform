import { supabase } from '../lib/supabase';
import { Worker, Booking, ServiceCategory, FairWageBreakdown } from '../types';

export const getSupabaseWorkers = async (): Promise<Worker[]> => {
  const { data: workersData, error } = await supabase
    .from('workers')
    .select(`
      *,
      cooperatives ( name ),
      worker_skills ( skill ),
      worker_languages ( language ),
      worker_certifications ( certification ),
      welfare ( status, fund_balance ),
      insurance ( coverage_details, status )
    `);

  if (error) {
    console.error('Error fetching workers:', error);
    return [];
  }

  return workersData.map((w: any) => ({
    id: w.id,
    name: w.name,
    photo: w.photo,
    category: w.category as ServiceCategory,
    categoryLabel: w.category_label,
    rating: Number(w.rating),
    jobsCompleted: w.jobs_completed,
    experienceYears: w.experience_years,
    distanceKm: Number(w.distance_km),
    isAvailable: w.is_available,
    isEmergencyReady: w.is_emergency_ready,
    basePrice: Number(w.base_price),
    cooperativeName: w.cooperatives?.name || 'Unknown Cooperative',
    cooperativeId: w.cooperative_id,
    verificationStatus: w.verification_status,
    verificationBadge: w.verification_badge,
    skills: w.worker_skills?.map((s: any) => s.skill) || [],
    languages: w.worker_languages?.map((l: any) => l.language) || [],
    certifications: w.worker_certifications?.map((c: any) => c.certification) || [],
    bio: w.bio,
    lat: Number(w.lat),
    lng: Number(w.lng),
    currentWorkload: w.current_workload,
    reviews: [], // Would fetch from worker_reviews if needed
    welfareStatus: w.welfare?.[0]?.status || 'pending',
    welfareFundBalance: Number(w.welfare?.[0]?.fund_balance || 0),
    insuranceCoverage: w.insurance?.[0]?.coverage_details || '',
  }));
};

export const getSupabaseBookings = async (customerId?: string): Promise<Booking[]> => {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      workers ( name, photo, cooperatives ( name ), rating ),
      customers ( name, phone, address, lat, lng )
    `);
    
  if (customerId) {
    query = query.eq('customer_id', customerId);
  }

  const { data: bookingsData, error } = await query;

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  return bookingsData.map((b: any) => {
    const total = Number(b.wage_total_paid);
    const wageBreakdown: FairWageBreakdown = {
      totalPaid: total,
      workerEarnings: Number(b.wage_worker_earnings),
      cooperativeContribution: Number(b.wage_cooperative_contribution),
      welfareContribution: Number(b.wage_welfare_contribution),
      workerPercentage: 85,
      cooperativePercentage: 10,
      welfarePercentage: 5,
    };

    return {
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
      wageBreakdown,
      createdAt: b.created_at,
      completedAt: b.completed_at,
      rating: b.rating ? Number(b.rating) : undefined,
      reviewComment: b.review_comment
    };
  });
};

export const createEmergencyRequest = async (customerId: string, services: string[]) => {
  const { data: req, error: reqErr } = await supabase
    .from('emergency_requests')
    .insert([{ customer_id: customerId, status: 'active' }])
    .select()
    .single();

  if (reqErr) throw reqErr;

  const requestServices = services.map(s => ({
    emergency_request_id: req.id,
    service_id: s
  }));

  const { error: srvErr } = await supabase
    .from('emergency_request_services')
    .insert(requestServices);

  if (srvErr) throw srvErr;
  return req;
};

export const createSupabaseComplaint = async (
  bookingId: string, 
  customerId: string, 
  workerId: string, 
  category: string, 
  description: string,
  amount: number
) => {
  const { data, error } = await supabase
    .from('complaints')
    .insert([{
      id: `DSP-${Math.floor(Math.random() * 10000)}`,
      booking_id: bookingId,
      customer_id: customerId,
      worker_id: workerId,
      category,
      description,
      amount,
      status: 'UNDER REVIEW'
    }]);

  if (error) {
    console.error('Error creating complaint:', error);
    throw error;
  }
  return data;
};

export const updateSupabaseBookingStatus = async (bookingId: string, newStatus: string) => {
  const { error } = await supabase
    .from('bookings')
    .update({ status: newStatus })
    .eq('id', bookingId);

  if (error) throw error;
};

export const getSupabaseServices = async () => {
  const { data, error } = await supabase.from('services').select('*');
  if (error) throw error;
  return data;
};

export const getSupabaseInvoice = async (bookingId: string) => {
  const { data, error } = await supabase.from('invoices').select('*').eq('booking_id', bookingId).single();
  if (error && error.code !== 'PGRST116') console.error(error);
  return data;
};
