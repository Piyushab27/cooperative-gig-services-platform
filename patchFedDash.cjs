const fs = require('fs');

let content = fs.readFileSync('src/components/admin/FederationDashboard.tsx', 'utf8');

// Add import
if (!content.includes('SocietyManagement')) {
  content = content.replace(
    "import { WageRulesConfigurator } from './WageRulesConfigurator';",
    "import { WageRulesConfigurator } from './WageRulesConfigurator';\nimport { SocietyManagement } from './SocietyManagement';"
  );
}

// Update state
content = content.replace(
  "const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'forecast' | 'wagerules'>('overview');",
  "const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'forecast' | 'wagerules' | 'societies'>('overview');"
);

// Add Tab Button
const navTabsRegex = /{([^}]*?)<span>Wage & Welfare Policy<\/span>\n\s*<\/button>/m;
const match = content.match(navTabsRegex);
if (match) {
  content = content.replace(
    match[0],
    match[0] + `\n\n        <button
          onClick={() => setActiveTab('societies')}
          className={\`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 \${
            activeTab === 'societies'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }\`}
        >
          <Building2 className="w-4 h-4" />
          <span>Manage Societies</span>
        </button>`
  );
} else {
    console.log("Could not find Wage & Welfare Policy tab to insert after");
}

// Add Tab Content
content = content.replace(
  "{activeTab === 'wagerules' && <WageRulesConfigurator />}",
  "{activeTab === 'wagerules' && <WageRulesConfigurator />}\n      {activeTab === 'societies' && <SocietyManagement />}"
);

fs.writeFileSync('src/components/admin/FederationDashboard.tsx', content);
console.log('FederationDashboard patched.');
