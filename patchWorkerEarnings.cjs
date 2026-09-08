const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerEarnings.tsx', 'utf8');

const importRegex = /const { wageConfig } = useDemo\(\);/g;
const newImport = `
  const { wageConfig, bookings, activeWorkerId } = useDemo();

  const workerBookings = bookings.filter(b => b.workerId === activeWorkerId);
  const completedBookings = workerBookings.filter(b => b.status === 'completed');
  const pendingBookings = workerBookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled');

  const totalEarnings = completedBookings.reduce((sum, b) => sum + (b.wageBreakdown?.workerEarnings || 0), 0);
  const pendingEarnings = pendingBookings.reduce((sum, b) => sum + (b.wageBreakdown?.workerEarnings || 0), 0);
  const coopContrib = completedBookings.reduce((sum, b) => sum + (b.wageBreakdown?.cooperativeContribution || 0), 0);
  const welfareContrib = completedBookings.reduce((sum, b) => sum + (b.wageBreakdown?.welfareContribution || 0), 0);
`;

content = content.replace(importRegex, newImport);

// Replace Today's payout logic
content = content.replace(
  /<span className="text-2xl font-extrabold text-emerald-700 mt-1 block">₹1,250<\/span>/,
  `<span className="text-2xl font-extrabold text-emerald-700 mt-1 block">₹{totalEarnings.toFixed(0)}</span>`
);
content = content.replace(
  /<ArrowUpRight className="w-3 h-3" \/> 3 Jobs Completed Today/,
  `<ArrowUpRight className="w-3 h-3" /> {completedBookings.length} Jobs Completed`
);

// Replace This week
content = content.replace(
  /<span className="text-2xl font-extrabold text-slate-900 mt-1 block">₹7,840<\/span>/,
  `<span className="text-2xl font-extrabold text-slate-900 mt-1 block">₹{pendingEarnings.toFixed(0)}</span>`
);
content = content.replace(
  /<span className="text-\[11px\] font-bold text-slate-400 uppercase tracking-wider block">This Week<\/span>/,
  `<span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Pending Earnings</span>`
);
content = content.replace(
  /<span className="text-\[10px\] text-slate-500 font-semibold mt-1 block">18 Jobs Completed<\/span>/,
  `<span className="text-[10px] text-slate-500 font-semibold mt-1 block">{pendingBookings.length} Pending Jobs</span>`
);

// Replace This month
content = content.replace(
  /<span className="text-2xl font-extrabold text-slate-900 mt-1 block">₹28,450<\/span>/,
  `<span className="text-2xl font-extrabold text-slate-900 mt-1 block">₹{coopContrib.toFixed(0)}</span>`
);
content = content.replace(
  /<span className="text-\[11px\] font-bold text-slate-400 uppercase tracking-wider block">This Month<\/span>/,
  `<span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Co-op Contribution</span>`
);
content = content.replace(
  /<span className="text-\[10px\] text-slate-500 font-semibold mt-1 block">86 Total Jobs<\/span>/,
  `<span className="text-[10px] text-slate-500 font-semibold mt-1 block">For cooperative growth</span>`
);

// Replace Welfare Balance
content = content.replace(
  /<span className="text-2xl font-extrabold text-amber-600 mt-1 block">₹18,450<\/span>/,
  `<span className="text-2xl font-extrabold text-amber-600 mt-1 block">₹{welfareContrib.toFixed(0)}</span>`
);
content = content.replace(
  /<span className="text-\[11px\] font-bold text-slate-400 uppercase tracking-wider block">Welfare Balance<\/span>/,
  `<span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Welfare Contribution</span>`
);


fs.writeFileSync('src/components/worker/WorkerEarnings.tsx', content);
