const fs = require('fs');
let content = fs.readFileSync('src/components/worker/WorkerProfileEditor.tsx', 'utf8');

const lines = content.split('\n');
let start = lines.findIndex(l => l.includes('const handleSave = () => {'));
let end = lines.findIndex((l, i) => i > start && l.includes('  };'));

if (start !== -1 && end !== -1) {
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
  lines.splice(start, end - start + 1, newSave);
  fs.writeFileSync('src/components/worker/WorkerProfileEditor.tsx', lines.join('\n'));
}
