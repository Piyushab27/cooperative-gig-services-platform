const fs = require('fs');

let service = fs.readFileSync('src/services/supabaseService.ts', 'utf8');
service += `
export const getSupabaseServices = async () => {
  const { data, error } = await supabase.from('services').select('*');
  if (error) throw error;
  return data;
};
`;
fs.writeFileSync('src/services/supabaseService.ts', service);

let categories = fs.readFileSync('src/components/customer/ServiceCategories.tsx', 'utf8');

// Replace standard render with effect
categories = categories.replace(
  "export const ServiceCategories: React.FC = () => {",
  `import { useEffect, useState } from 'react';
import { getSupabaseServices } from '../../services/supabaseService';

export const ServiceCategories: React.FC = () => {
  const [activeServices, setActiveServices] = useState<any[]>([]);

  useEffect(() => {
    getSupabaseServices().then(res => {
      setActiveServices(res);
    });
  }, []);`
);

categories = categories.replace(
  "CATEGORIES.map(category =>",
  `CATEGORIES.filter(cat => activeServices.some(s => s.id === cat.id)).map(category =>`
);

fs.writeFileSync('src/components/customer/ServiceCategories.tsx', categories);
console.log("Services patched.");
