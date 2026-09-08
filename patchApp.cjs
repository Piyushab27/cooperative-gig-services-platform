const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('SuperAdminDashboard')) {
  content = content.replace(
    "import { AdminDashboard } from './components/admin/AdminDashboard';",
    "import { AdminDashboard } from './components/admin/AdminDashboard';\nimport { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';"
  );
}

if (!content.includes("{demoRole === 'super_admin'")) {
  content = content.replace(
    "{demoRole === 'federation_admin' && <AdminDashboard />}",
    "{demoRole === 'federation_admin' && <AdminDashboard />}\n        {demoRole === 'super_admin' && <SuperAdminDashboard />}"
  );
}

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx patched for SuperAdmin.');
