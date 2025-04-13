import { ref } from 'vue';
import { fetchBankRecommendations, formatBankRequestData, BankRecommendationRequest } from '@/utils/bankApi';

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
  // Recommended banks data
  const recommendedBanks = ref<Bank[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch recommendations from the API
  const fetchRecommendations = async (requestData: BankRecommendationRequest) => {
    isLoading.value = true;
    error.value = null;
    
    console.log('Fetching bank recommendations with data:', requestData);
    
    try {
      const data = await fetchBankRecommendations(requestData);
      
      console.log('Received API response:', data);
      
      if (data.success && data.recommendations) {
        console.log('Found successful response with recommendations');
        // Ensure each bank has the correct icon
        recommendedBanks.value = data.recommendations.map((bank: Bank) => ({
          ...bank,
          icon: getBankIconId(bank.name)
        }));
        console.log('Updated recommendedBanks with data');
      } else if (data.recommended_bank) {
        // Handle the alternative API response format
        console.log('Found alternative API response format with recommended_bank');
        const bankName = data.recommended_bank;
        
        const bank: Bank = {
          name: bankName,
          type: "Commercial",
          icon: getBankIconId(bankName),
          matchScore: 95,
          description: data.description || "",
          website: data.website || "",
          features: [],
          services: [],
          digitalRating: 4,
          branchCount: "3,500+",
          feeLevel: "Medium",
          sustainabilityRating: 3,
          matchBreakdown: {
            digitalBanking: 90,
            serviceOfferings: 95,
            feeStructure: 85,
            branchNetwork: 100,
            customerSupport: 90
          },
          reasons: [
            "Strong digital banking services",
            "Extensive branch network",
            "Comprehensive financial products"
          ]
        };
        recommendedBanks.value = [bank];
        console.log('Updated recommendedBanks with formatted data');
      } else {
        console.error('API response missing success or recommendations:', data);
        throw new Error(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Error fetching bank recommendations:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      recommendedBanks.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Refresh recommendations with form data
  const refreshRecommendations = async (formData: any) => {
    console.log('Refreshing bank recommendations...');
    const requestData = formatBankRequestData(formData);
    await fetchRecommendations(requestData);
  };

  return {
    recommendedBanks,
    isLoading,
    error,
    refreshRecommendations,
    fetchRecommendations
  };
} 