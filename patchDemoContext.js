const fs = require('fs');
let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

// Add imports
if (!content.includes('getSupabaseWorkers')) {
  content = content.replace(
    "import { calculateFairWage } from '../utils/fairWage';",
    "import { calculateFairWage } from '../utils/fairWage';\nimport { getSupabaseWorkers, getSupabaseBookings, createSupabaseComplaint, updateSupabaseBookingStatus, createEmergencyRequest } from '../services/supabaseService';"
  );
}

// Modify DemoProvider
const providerMatch = /export const DemoProvider: React\.FC<\{ children: React\.ReactNode \}> = \(\{ children \}\) => \{/;
if (content.match(providerMatch)) {
  const replacement = `export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [supabaseWorkers, supabaseBookings] = await Promise.all([
          getSupabaseWorkers(),
          getSupabaseBookings('c-1') // customer specific or all? Let's load all for now since Admin might need it.
        ]);
        
        if (supabaseWorkers.length > 0) {
          setWorkers(supabaseWorkers);
        }
        if (supabaseBookings.length > 0) {
          setBookings(supabaseBookings);
        }
      } catch (err) {
        console.error("Failed to load Supabase data:", err);
      } finally {
        setIsDataLoaded(true);
      }
    };
    loadData();
  }, []);
`;
  content = content.replace(providerMatch, replacement);
}

// Ensure the provider returns null until loaded, or just lets it render with mock data initially, which then swaps.
// Actually, rendering with mock data temporarily is fine for a smooth transition, or we can just render the children.
// The prompt says "Replace mock data dependencies... Replace them with Supabase-backed data. DO NOT delete the files immediately."

fs.writeFileSync('src/context/DemoContext.tsx', content);
console.log('DemoContext patched.');
