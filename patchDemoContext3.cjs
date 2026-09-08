const fs = require('fs');
let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

const updateProfileRegex = /const updateWorkerProfile = \(workerId: string, updates: Partial<Worker>\) => \{[\s\S]*?\};\n/g;
const newUpdateProfile = `
  const updateWorkerProfile = async (workerId: string, updates: Partial<Worker>) => {
    // Optimistic UI
    setWorkers(prev => prev.map(w => w.id === workerId ? { ...w, ...updates } : w));
    
    try {
      const { supabase } = await import('../lib/supabase');
      
      const payload: any = {};
      if (updates.name) payload.name = updates.name;
      if (updates.categoryLabel) payload.category_label = updates.categoryLabel;
      if (updates.basePrice) payload.base_price = updates.basePrice;
      if (updates.bio) payload.bio = updates.bio;

      if (Object.keys(payload).length > 0) {
        const { error } = await supabase.from('workers').update(payload).eq('id', workerId);
        if (error) throw error;
      }
      
      // Handle languages
      if (updates.languages) {
        await supabase.from('worker_languages').delete().eq('worker_id', workerId);
        if (updates.languages.length > 0) {
          await supabase.from('worker_languages').insert(
            updates.languages.map(l => ({ worker_id: workerId, language: l }))
          );
        }
      }
      
    } catch (err) {
      console.error("Failed to update profile", err);
      // Let UI handle failure if needed
    }
  };
`;
content = content.replace(updateProfileRegex, newUpdateProfile);

content = content.replace(
  "updateWorkerProfile: (workerId: string, updates: Partial<Worker>) => void;",
  "updateWorkerProfile: (workerId: string, updates: Partial<Worker>) => Promise<void>;"
);

fs.writeFileSync('src/context/DemoContext.tsx', content);
