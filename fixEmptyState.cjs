const fs = require('fs');
let content = fs.readFileSync('src/components/customer/CustomerDashboard.tsx', 'utf8');

content = content.replace(
  `subtitle="You have no active disputes or complaints." />`,
  `description="You have no active disputes or complaints." icon={ShieldCheck} />`
);

fs.writeFileSync('src/components/customer/CustomerDashboard.tsx', content);
