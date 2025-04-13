import { ref } from 'vue';
import { BankRecommendationRequest, formatBankRequestData } from '@/utils/bankApi';
import { getMockBankRecommendations } from '@/data/bankRecommendationsData';

export interface MatchBreakdown {
  digitalBanking: number;
  serviceOfferings: number;
  feeStructure: number;
  branchNetwork: number;
  customerSupport: number;
}

export interface Bank {
  name: string;
  type: string;
  icon: string;
  matchScore: number;
  description: string;
  website: string;
  features: string[];
  services: string[];
  digitalRating: number;
  branchCount: string;
  feeLevel: string;
  sustainabilityRating: number;
  matchBreakdown: MatchBreakdown;
  reasons: string[];
}

// Map bank names to their icon identifiers
const BANK_ICON_MAP: Record<string, string> = {
  'Chase': 'chase',
  'Bank of America': 'bank-of-america',
  'Wells Fargo': 'wells-fargo',
  'Capital One': 'capital-one',
  'Citibank': 'citibank'
};

// Get icon identifier for a bank name
const getBankIconId = (bankName: string): string => {
  // Check if we have a predefined icon for this bank
  const normalizedName = bankName.trim();
  if (normalizedName in BANK_ICON_MAP) {
    return BANK_ICON_MAP[normalizedName];
  }
  // Fallback to the dynamic conversion for other banks
  return bankName.toLowerCase().replace(/\s+/g, '-');
};

export function useBankRecommendations() {
  // Recommended banks data - directly initialize with mock data
  const recommendedBanks = ref<Bank[]>([]); 
  const isLoading = ref(false); // Keep isLoading for potential initial setup or delays

  // Simplified fetchRecommendations function - now just sets mock data
  const fetchRecommendations = async (requestData: BankRecommendationRequest) => {
    isLoading.value = true; // Simulate a brief loading state if desired
    console.log('Using mock bank recommendations for request:', requestData);
    
    // Directly assign mock data
    // Use a timeout to simulate a small delay, mimicking an API call
    await new Promise(resolve => setTimeout(resolve, 150)); // Optional: Small delay
    recommendedBanks.value = getMockBankRecommendations(); 

    console.log('Updated recommendedBanks with mock data');
    isLoading.value = false;
  };

  // Refresh recommendations function remains the same logically but will now always use mock data
  const refreshRecommendations = async (formData: any) => {
    console.log('Refreshing bank recommendations with mock data...');
    const requestData = formatBankRequestData(formData);
    await fetchRecommendations(requestData);
  };

  return {
    recommendedBanks,
    isLoading, // Return isLoading
    refreshRecommendations,
    fetchRecommendations
  };
} 