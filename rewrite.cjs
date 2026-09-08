const fs = require('fs');

let seed = fs.readFileSync('seed.sql', 'utf8');

// Update Workers INSERT
seed = seed.replace(
  'is_available, base_price', 
  'is_available, is_emergency_ready, base_price'
);

// Map is_emergency_ready values
seed = seed.replace(/(true, 350, 'verified')/g, 'true, true, 350, \'verified\''); // w-1, w-2, w-4, w-10
seed = seed.replace(/(true, 400, 'verified')/g, 'true, false, 400, \'verified\''); // w-5, w-7, w-9, w-12
seed = seed.replace(/(true, 450, 'verified')/g, 'true, true, 450, \'verified\''); // w-6
seed = seed.replace(/(true, 500, 'verified')/g, 'true, false, 500, \'verified\''); // w-8
seed = seed.replace(/(true, 300, 'verified')/g, 'true, false, 300, \'verified\''); // w-11
seed = seed.replace(/(false, 300, 'verified')/g, 'false, false, 300, \'verified\''); // w-3

// Update Bookings INSERT
seed = seed.replace(
  'service_category, service_title', 
  'service_id, service_category, service_title'
);
seed = seed.replace(
  'photo_url, is_emergency, status', 
  'photo_url, address, lat, lng, is_emergency, status'
);

const customerAddress = "'Flat 402, Green Valley Apartments, Road No. 12, Banjara Hills, Hyderabad', 17.385, 78.4867";
// BK-2026-9041
seed = seed.replace(
  "'w-1', 'electrician', 'Main Switchboard Repair",
  "'w-1', 'electrician', 'electrician', 'Main Switchboard Repair"
);
seed = seed.replace(
  "NULL, false, 'accepted'",
  `NULL, ${customerAddress}, false, 'accepted'`
);
// BK-2026-8812
seed = seed.replace(
  "'w-4', 'plumber', 'Bathroom Tap Leakage Repair",
  "'w-4', 'plumber', 'plumber', 'Bathroom Tap Leakage Repair"
);
seed = seed.replace(
  "NULL, false, 'completed'",
  `NULL, ${customerAddress}, false, 'completed'`
);

fs.writeFileSync('seed.sql', seed);
console.log('Done rewriting seed.sql');
