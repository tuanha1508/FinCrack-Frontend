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

export function useBankRecommendations() {
  // Recommended banks data
  const recommendedBanks = ref<Bank[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Fetch recommendations from the API
  const fetchRecommendations = async (requestData: BankRecommendationRequest) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const data = await fetchBankRecommendations(requestData);
      
      if (data.success && data.recommendations) {
        recommendedBanks.value = data.recommendations;
      } else {
        throw new Error(data.error || 'Failed to fetch recommendations');
      }
    } catch (err) {
      console.error('Error fetching bank recommendations:', err);
      error.value = err instanceof Error ? err.message : 'An unknown error occurred';
      // Provide fallback data in case of error
      recommendedBanks.value = getDefaultBanks();
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

  // Get default banks (fallback data)
  const getDefaultBanks = (): Bank[] => {
    return [
      {
        name: 'GreenBank Plus',
        type: 'Digital Bank',
        icon: 'lucide:building-bank',
        matchScore: 92,
        description: 'A digital-first bank with a strong focus on environmental initiatives and competitive rates for professionals.',
        website: 'https://example.com/greenbank',
        features: ['Mobile Banking', '24/7 Support', 'Sustainable Investments', 'High-Interest Savings'],
        services: ['Savings Accounts', 'Credit Cards', 'Personal Loans', 'Investment Services'],
        digitalRating: 5,
        branchCount: '150+ locations',
        feeLevel: 'Low',
        sustainabilityRating: 5,
        matchBreakdown: {
          digitalBanking: 98,
          serviceOfferings: 90,
          feeStructure: 85,
          branchNetwork: 75,
          customerSupport: 95
        },
        reasons: [
          'Excellent digital interface matching your high preference',
          'Strong focus on green initiatives aligns with your values',
          'Low fee structure matches your preferences',
          'Offers all the banking services you selected'
        ]
      },
      {
        name: 'TechFi Banking',
        type: 'Online Bank',
        icon: 'lucide:smartphone',
        matchScore: 87,
        description: 'A technology-focused online bank offering innovative financial products with competitive rates and minimal fees.',
        website: 'https://example.com/techfi',
        features: ['AI Financial Assistant', 'Integrated Budgeting', 'Instant Transfers', 'Virtual Cards'],
        services: ['Checking Accounts', 'Savings Accounts', 'Credit Cards', 'Investment Solutions'],
        digitalRating: 5,
        branchCount: '0 (Online Only)',
        feeLevel: 'Very Low',
        sustainabilityRating: 3,
        matchBreakdown: {
          digitalBanking: 100,
          serviceOfferings: 85,
          feeStructure: 95,
          branchNetwork: 20,
          customerSupport: 90
        },
        reasons: [
          'Industry-leading digital interface (perfect for tech-savvy users)',
          'Very low fee structure aligns with your preferences',
          'Strong focus on innovative financial tools',
          'Excellent option for professionals looking for integrated services'
        ]
      },
      {
        name: 'National Trust Bank',
        type: 'Traditional Bank',
        icon: 'lucide:landmark',
        matchScore: 79,
        description: 'A well-established traditional bank with a large branch network and comprehensive services for all customer types.',
        website: 'https://example.com/nationaltrust',
        features: ['Extensive Branch Network', 'Financial Advisors', 'Business Services', 'Wealth Management'],
        services: ['Checking & Savings', 'Investment Services', 'Personal Loans', 'Credit Cards'],
        digitalRating: 3,
        branchCount: '3,200+ locations',
        feeLevel: 'Medium',
        sustainabilityRating: 2,
        matchBreakdown: {
          digitalBanking: 60,
          serviceOfferings: 90,
          feeStructure: 70,
          branchNetwork: 95,
          customerSupport: 85
        },
        reasons: [
          'Large branch network closely matches your preference',
          'Comprehensive service offerings cover all your needs',
          'Strong customer service focus matches your high ranking',
          'Well-established financial stability for peace of mind'
        ]
      }
    ];
  };

  // Initialize with default data
  recommendedBanks.value = getDefaultBanks();

  return {
    recommendedBanks,
    isLoading,
    error,
    refreshRecommendations,
    fetchRecommendations
  };
} 