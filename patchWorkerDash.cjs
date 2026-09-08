const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerDashboard.tsx', 'utf8');

const oldAccept = /const handleAcceptJob = \([\s\S]*?\};\n/g;
const newAccept = `
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAcceptJob = async (bookingId: string) => {
    try {
      setIsUpdating(true);
      await updateBookingStatus(bookingId, 'accepted');
      setActiveBookingId(bookingId);
    } catch (error) {
      alert("Unable to accept booking. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };
`;
content = content.replace(oldAccept, newAccept);

const oldAdvance = /const handleAdvanceJobStatus = \([\s\S]*?\};\n/g;
const newAdvance = `
  const handleAdvanceJobStatus = async () => {
    if (!activeJob) return;
    const flow: Record<string, any> = {
      accepted: 'on_the_way',
      on_the_way: 'arrived',
      arrived: 'in_progress',
      in_progress: 'completed',
    };
    const next = flow[activeJob.status];
    if (next) {
      try {
        setIsUpdating(true);
        await updateBookingStatus(activeJob.id, next);
      } catch (error) {
        alert("Unable to update booking status. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    }
  };
`;
content = content.replace(oldAdvance, newAdvance);

// Add disabled={isUpdating} to buttons
content = content.replace(
  "onClick={handleAdvanceJobStatus}",
  "onClick={handleAdvanceJobStatus}\n                    disabled={isUpdating}"
);
content = content.replace(
  "className=\"px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 flex items-center justify-between min-w-[200px] transition\"",
  "className=\"px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-950 flex items-center justify-between min-w-[200px] transition disabled:opacity-50 disabled:cursor-wait\""
);

fs.writeFileSync('src/components/worker/WorkerDashboard.tsx', content);
