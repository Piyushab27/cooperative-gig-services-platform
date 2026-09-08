const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminDashboard.tsx', 'utf8');

if (!content.includes('SocietyManagement')) {
  content = content.replace(
    "import { WageRulesConfigurator } from './WageRulesConfigurator';",
    "import { WageRulesConfigurator } from './WageRulesConfigurator';\nimport { SocietyManagement } from './SocietyManagement';"
  );
}

content = content.replace(
  "const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'forecast' | 'wagerules'>('overview');",
  "const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'forecast' | 'wagerules' | 'societies'>('overview');"
);

const targetStr = `          <span>Wage & Welfare Policy</span>
        </button>
        <button
          onClick={() => setActiveTab('disputes' as any)}`;

const replacementStr = `          <span>Wage & Welfare Policy</span>
        </button>
        <button
          onClick={() => setActiveTab('societies')}
          className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 \${
            activeTab === 'societies'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }\`}
        >
          <Building2 className="w-4 h-4" />
          <span>Manage Societies</span>
        </button>
        <button
          onClick={() => setActiveTab('disputes' as any)}`;

content = content.replace(targetStr, replacementStr);

content = content.replace(
  "{activeTab === 'wagerules' && <WageRulesConfigurator />}",
  "{activeTab === 'wagerules' && <WageRulesConfigurator />}\n      {activeTab === 'societies' && <SocietyManagement />}"
);

fs.writeFileSync('src/components/admin/AdminDashboard.tsx', content);
console.log('AdminDashboard patched.');
