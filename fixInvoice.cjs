const fs = require('fs');

let service = fs.readFileSync('src/services/supabaseService.ts', 'utf8');
service += `
export const getSupabaseInvoice = async (bookingId: string) => {
  const { data, error } = await supabase.from('invoices').select('*').eq('booking_id', bookingId).single();
  if (error && error.code !== 'PGRST116') console.error(error);
  return data;
};
`;
fs.writeFileSync('src/services/supabaseService.ts', service);

let bill = fs.readFileSync('src/components/customer/TransparentBillModal.tsx', 'utf8');

bill = bill.replace(
  "import { useDemo } from '../../context/DemoContext';",
  "import { useDemo } from '../../context/DemoContext';\nimport { getSupabaseInvoice } from '../../services/supabaseService';\nimport { useEffect } from 'react';"
);

bill = bill.replace(
  "const booking = bookings.find(b => b.id === bookingId) || bookings[0];",
  `const booking = bookings.find(b => b.id === bookingId) || bookings[0];
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (isOpen && booking) {
      getSupabaseInvoice(booking.id).then(res => setInvoice(res));
    }
  }, [isOpen, booking?.id]);`
);

bill = bill.replace(
  "const baseFare = 350;\n  const materialsCost = 100;\n  const travelCost = 50;\n  const totalAmount = booking.finalPrice || baseFare + materialsCost + travelCost;",
  `const baseFare = invoice?.service_fee || booking.estimatedPrice || 350;
  const materialsCost = invoice?.materials_fee || 0;
  const travelCost = invoice?.travel_fee || 0;
  const totalAmount = invoice?.total || booking.finalPrice || baseFare + materialsCost + travelCost;`
);

// We need to modify "Proceed to Payment" logic. 
// "For completed/past bookings: View Invoice must remain VIEW-ONLY... Do NOT show: Proceed to Payment for already completed/paid historical invoices."
bill = bill.replace(
  /{booking\.status !== 'completed' && \([\s\S]*?\}\)}/m,
  `{(booking.status !== 'completed' && invoice?.status !== 'paid') && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-3xl">
              <button
                onClick={onClose}
                className="px-6 py-3 font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Close
              </button>
              <button
                onClick={() => onProceedToPayment(totalAmount)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center gap-2 shadow-sm"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}`
);

fs.writeFileSync('src/components/customer/TransparentBillModal.tsx', bill);
console.log('Bill patched.');
