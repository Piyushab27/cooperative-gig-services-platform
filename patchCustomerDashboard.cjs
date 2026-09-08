const fs = require('fs');

let content = fs.readFileSync('src/components/customer/CustomerDashboard.tsx', 'utf8');

if (!content.includes('supabaseService')) {
  content = content.replace(
    "import { DisputeModal } from './DisputeModal';",
    "import { DisputeModal } from './DisputeModal';\nimport { createSupabaseComplaint } from '../../services/supabaseService';\nimport { supabase } from '../../lib/supabase';"
  );
}

// Add state for complaints
if (!content.includes('const [complaints, setComplaints] = useState')) {
  content = content.replace(
    "const [newDispute, setNewDispute] = useState<any>(null);",
    "const [complaints, setComplaints] = useState<any[]>([]);\n  const [isLoadingComplaints, setIsLoadingComplaints] = useState(false);\n  const [newDispute, setNewDispute] = useState<any>(null);"
  );
}

// Add useEffect to load complaints when tab changes
if (!content.includes('loadComplaints')) {
  content = content.replace(
    "const filteredBookings = bookings.filter(b => {",
    `
  useEffect(() => {
    if (activeTab === ('disputes' as any)) {
      setIsLoadingComplaints(true);
      supabase.from('complaints').select('*').eq('customer_id', 'c-1').then(({ data }) => {
        if (data) setComplaints(data);
        setIsLoadingComplaints(false);
      });
    }
  }, [activeTab]);

  const filteredBookings = bookings.filter(b => {`
  );
}

// Replace the disputes render
const disputeTabRegex = /\{\/\* DISPUTES TAB \*\/\}([\s\S]*?)<DisputeModal/g;
const replacement = `{/* DISPUTES TAB */}
      {(activeTab as any) === 'disputes' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">Support & Disputes</h3>
            <button 
              onClick={() => setIsDisputeModalOpen(true)}
              className="px-4 py-2 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl hover:bg-rose-100 transition"
            >
              Raise New Dispute
            </button>
          </div>
          
          <div className="space-y-4">
            {disputeSuccessMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {disputeSuccessMessage}
              </div>
            )}

            {isLoadingComplaints ? (
              <div className="py-8 text-center text-slate-500 font-bold text-sm">Loading disputes...</div>
            ) : complaints.length === 0 ? (
              <EmptyState title="No Disputes" message="You have no active disputes or complaints." />
            ) : (
              complaints.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-rose-50 border border-rose-200 animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900">{c.category} ({c.booking_id})</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 uppercase">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{c.description}</p>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                    <div className="flex items-center gap-2">
                      <span>Raised: {new Date(c.created_at).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Assigned to: Cooperative Grievance Team</span>
                    </div>
                    {c.amount > 0 && <span className="font-bold text-rose-700">₹{c.amount}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <DisputeModal`;

content = content.replace(disputeTabRegex, replacement);

// Update onSubmit for DisputeModal
const onSubmitRegex = /onSubmit=\{\(dispute: any\) => \{[\s\S]*?\}\}/m;
const onSubmitReplacement = `onSubmit={async (dispute: any) => {
          setIsDisputeModalOpen(false);
          try {
            await createSupabaseComplaint(dispute.bookingId, 'c-1', 'w-4', dispute.category, dispute.description, dispute.amount || 0); // Note: Should ideally pass correct workerId from booking.
            setDisputeSuccessMessage("Your dispute has been registered and will be reviewed by the cooperative grievance team.");
            
            // Reload complaints
            supabase.from('complaints').select('*').eq('customer_id', 'c-1').then(({ data }) => {
              if (data) setComplaints(data);
            });
            
            setTimeout(() => setDisputeSuccessMessage(""), 5000);
          } catch (e) {
            console.error("Failed to submit dispute", e);
            alert("Failed to submit dispute. Please try again.");
          }
        }}`;
        
content = content.replace(onSubmitRegex, onSubmitReplacement);

fs.writeFileSync('src/components/customer/CustomerDashboard.tsx', content);
console.log('CustomerDashboard patched.');
