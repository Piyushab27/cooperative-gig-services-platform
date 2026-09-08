const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerRequests.tsx', 'utf8');

const rejectRegex = /const handleReject = \([\s\S]*?\};\n/g;
const newReject = `
  const [isUpdating, setIsUpdating] = useState(false);

  const handleReject = async (id: string) => {
    try {
      setIsUpdating(true);
      await updateBookingStatus(id, 'cancelled');
    } catch (error) {
      alert("Unable to reject booking. Please try again.");
    } finally {
      setIsUpdating(false);
      setRejectingId(null);
    }
  };
`;
content = content.replace(rejectRegex, newReject);

// disable reject confirm button
content = content.replace(
  "onClick={() => handleReject(booking.id)} className=\"px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition\"",
  "onClick={() => handleReject(booking.id)} disabled={isUpdating} className=\"px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition disabled:opacity-50\""
);

fs.writeFileSync('src/components/worker/WorkerRequests.tsx', content);
