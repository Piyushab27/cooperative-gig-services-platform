const fs = require('fs');
let content = fs.readFileSync('src/components/customer/BookingTracker.tsx', 'utf8');

content = content.replace(
  /title="Simulate status progression for demo"[\s\S]*?>[\s\S]*?<span>Next Step →<\/span>/m,
  `>
              <span>Next Step</span>`
);

fs.writeFileSync('src/components/customer/BookingTracker.tsx', content);
