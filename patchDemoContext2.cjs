const fs = require('fs');
let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

content = content.replace(
  "toggleAvailability: (workerId: string) => Promise<void>;",
  "toggleAvailability: (workerId: string) => Promise<void>;\n  toggleEmergencyReady: (workerId: string) => Promise<void>;"
);

const toggleAvailRegex = /const toggleAvailability = async \(workerId: string\) => \{[\s\S]*?\};\n/g;
const match = content.match(toggleAvailRegex);
if(match) {
  const newFunc = `
  const toggleEmergencyReady = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;
    const newStatus = !worker.isEmergencyReady;
    
    // Optimistic
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isEmergencyReady: newStatus } : w));
    
    try {
      const { updateWorkerEmergencyReady } = await import('../services/supabaseService');
      await updateWorkerEmergencyReady(workerId, newStatus);
    } catch (err) {
      console.error("Failed to update emergency readiness", err);
      // revert
      setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, isEmergencyReady: !newStatus } : w));
      throw err;
    }
  };
`;
  content = content.replace(match[0], match[0] + newFunc);
}

content = content.replace(
  "toggleAvailability,\n        approveWorker",
  "toggleAvailability,\n        toggleEmergencyReady,\n        approveWorker"
);

fs.writeFileSync('src/context/DemoContext.tsx', content);
