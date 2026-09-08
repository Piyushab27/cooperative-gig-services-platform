const fs = require('fs');
let content = fs.readFileSync('src/services/supabaseService.ts', 'utf8');

content = content.replace(
  "isAvailable: w.is_available,",
  "isAvailable: w.is_available,\n    isEmergencyReady: w.is_emergency_ready,"
);

fs.writeFileSync('src/services/supabaseService.ts', content);
