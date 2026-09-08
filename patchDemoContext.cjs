const fs = require('fs');
let content = fs.readFileSync('src/context/DemoContext.tsx', 'utf8');

if (!content.includes('getSupabaseWorkers')) {
  content = content.replace(
    "import { calculateFairWage } from '../utils/fairWage';",
    "import { calculateFairWage } from '../utils/fairWage';\nimport { getSupabaseWorkers, getSupabaseBookings, createSupabaseComplaint, updateSupabaseBookingStatus, createEmergencyRequest } from '../services/supabaseService';"
  );
}

const providerMatch = /export const DemoProvider: React\.FC<\{ children: React\.ReactNode \}> = \(\{ children \}\) => \{/;
if (content.match(providerMatch)) {
  const replacement = `export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const supabaseWorkers = await getSupabaseWorkers();
        const supabaseBookings = await getSupabaseBookings();
        
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

fs.writeFileSync('src/context/DemoContext.tsx', content);
console.log('DemoContext patched.');
