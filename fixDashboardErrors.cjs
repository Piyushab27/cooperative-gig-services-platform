const fs = require('fs');
let content = fs.readFileSync('src/components/customer/CustomerDashboard.tsx', 'utf8');

content = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);

content = content.replace(
  `message="You have no active disputes or complaints."`,
  `subtitle="You have no active disputes or complaints."`
);

fs.writeFileSync('src/components/customer/CustomerDashboard.tsx', content);
