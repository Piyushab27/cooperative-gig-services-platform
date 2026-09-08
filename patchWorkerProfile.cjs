const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerProfileEditor.tsx', 'utf8');

const saveRegex = /const handleSave = \(\) => \{[\s\S]*?\setIsSaved\(false\), 3000\);\n  \};/g;
const newSave = `
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      await updateWorkerProfile(activeWorkerId, {
        name: formData.name,
        categoryLabel: formData.categoryLabel,
        languages: formData.languages.split(',').map((l: string) => l.trim()),
        basePrice: Number(formData.basePrice),
        bio: formData.about,
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };
`;
content = content.replace(saveRegex, newSave);

content = content.replace(
  "onClick={handleSave}",
  "onClick={handleSave} disabled={isUpdating}"
);
content = content.replace(
  "className=\"px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md\"",
  "className=\"px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md disabled:opacity-50\""
);

fs.writeFileSync('src/components/worker/WorkerProfileEditor.tsx', content);
