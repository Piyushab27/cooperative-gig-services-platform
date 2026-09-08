const fs = require('fs');
let content = fs.readFileSync('src/components/customer/CustomerDashboard.tsx', 'utf8');

content = content.replace(
  "await createSupabaseComplaint(dispute.bookingId, 'c-1', 'w-4'",
  "const booking = bookings.find(b => b.id === dispute.bookingId);\n            const workerId = booking?.workerId || 'w-1';\n            await createSupabaseComplaint(dispute.bookingId, 'c-1', workerId"
);

fs.writeFileSync('src/components/customer/CustomerDashboard.tsx', content);
