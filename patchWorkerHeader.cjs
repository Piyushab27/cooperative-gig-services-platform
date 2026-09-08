const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerHeader.tsx', 'utf8');

// Use DemoContext toggleEmergencyReady instead of local state
content = content.replace("const [emergencyOn, setEmergencyOn] = useState(true);", "");

// Replace the demo extraction to include toggleEmergencyReady
content = content.replace(
  "const { workers, activeWorkerId, toggleAvailability } = useDemo();",
  "const { workers, activeWorkerId, toggleAvailability, toggleEmergencyReady } = useDemo();"
);

// Replace emergencyOn with worker.isEmergencyReady
content = content.replace(/emergencyOn \?/g, "worker.isEmergencyReady ?");
content = content.replace(/emergencyOn/g, "worker.isEmergencyReady");

// Replace onClick handler
content = content.replace(
  "onClick={() => setEmergencyOn(!worker.isEmergencyReady)}",
  "onClick={() => toggleEmergencyReady(worker.id)}"
);

fs.writeFileSync('src/components/worker/WorkerHeader.tsx', content);
