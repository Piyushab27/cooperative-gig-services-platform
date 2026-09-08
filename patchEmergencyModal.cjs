const fs = require('fs');
let content = fs.readFileSync('src/components/customer/EmergencyModal.tsx', 'utf8');

if (!content.includes('supabaseService')) {
  content = content.replace(
    "import { AlertTriangle, X, Zap, Wrench, Snowflake, Lock, Settings, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';",
    "import { AlertTriangle, X, Zap, Wrench, Snowflake, Lock, Settings, Navigation, ShieldCheck, CheckCircle2 } from 'lucide-react';\nimport { createEmergencyRequest } from '../../services/supabaseService';"
  );
}

const handleStartRegex = /const handleStartSearch = \(\) => \{[\s\S]*?setIsSearching\(false\);\n    \}, 2500\);\n  \};/m;

const replacement = `const handleStartSearch = async () => {
    if (selectedTypes.length === 0) return;
    setIsSearching(true);
    setFoundWorkers([]);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {}
      );
    }

    try {
      const matchCategories = selectedTypes.map(typeId => emergencyTypes.find(t => t.id === typeId)?.category).filter(Boolean) as string[];
      
      await createEmergencyRequest('c-1', matchCategories);
      
      const matched = workers.filter(w => 
        w.isAvailable === true && 
        w.verificationStatus === 'verified' &&
        (w as any).isEmergencyReady !== false && 
        matchCategories.includes(w.category)
      );
      
      setFoundWorkers(matched.slice(0, 2));
    } catch (e) {
      console.error("Emergency dispatch error", e);
    } finally {
      setIsSearching(false);
    }
  };`;

content = content.replace(handleStartRegex, replacement);

fs.writeFileSync('src/components/customer/EmergencyModal.tsx', content);
console.log('EmergencyModal patched.');
