/**
 * Hardcoded bank recommendations data
 * 
 * This file provides mock data for bank recommendations to be used when the API is unavailable.
 * The data structure follows the Bank interface defined in useBankRecommendations.ts
 */

import { Bank, MatchBreakdown } from '@/composables/useBankRecommendations';

/**
 * Map bank names to their icon identifiers
 * This mirrors the map in useBankRecommendations.ts
 */
const BANK_ICON_MAP: Record<string, string> = {
  'Chase': 'chase',
  'Bank of America': 'bank-of-america',
  'Wells Fargo': 'wells-fargo',
  'Capital One': 'capital-one',
  'Citibank': 'citibank',
  'TD Bank': 'td-bank',
  'US Bank': 'us-bank',
  'PNC Bank': 'pnc-bank'
};

/**
 * Get icon identifier for a bank name
 * This mirrors the function in useBankRecommendations.ts
 */
const getBankIconId = (bankName: string): string => {
  // Check if we have a predefined icon for this bank
  const normalizedName = bankName.trim();
  if (normalizedName in BANK_ICON_MAP) {
    return BANK_ICON_MAP[normalizedName];
  }
  // Fallback to the dynamic conversion for other banks
  return bankName.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Hardcoded bank recommendations
 * Each bank follows the Bank interface structure
 */
export const MOCK_BANK_RECOMMENDATIONS: Bank[] = [
  {
    name: 'Chase',
    type: 'Commercial',
    icon: getBankIconId('Chase'),
    matchScore: 95,
    description: 'Chase offers a wide range of financial services with strong digital capabilities and extensive branch network across the United States.',
    website: 'https://www.chase.com',
    features: ['Mobile Banking', '24/7 Customer Service', 'Fraud Protection', 'Zelle Integration'],
    services: ['Checking', 'Savings', 'Credit Cards', 'Mortgages', 'Business Banking'],
    digitalRating: 5,
    branchCount: '4,700+',
    feeLevel: 'Medium',
    sustainabilityRating: 3,
    matchBreakdown: {
      digitalBanking: 98,
      serviceOfferings: 95,
      feeStructure: 80,
      branchNetwork: 96,
      customerSupport: 92
    },
    reasons: [
      'Top-rated mobile banking experience',
      'Extensive ATM and branch network',
      'Comprehensive financial services ecosystem'
    ]
  },
  {
    name: 'Bank of America',
    type: 'Commercial',
    icon: getBankIconId('Bank of America'),
    matchScore: 92,
    description: 'Bank of America provides a comprehensive suite of banking services with competitive digital tools and nationwide coverage.',
    website: 'https://www.bankofamerica.com',
    features: ['Erica Virtual Assistant', 'Cashback Rewards', 'Financial Education Tools'],
    services: ['Checking', 'Savings', 'Investments', 'Auto Loans', 'Home Loans'],
    digitalRating: 4,
    branchCount: '4,300+',
    feeLevel: 'Medium-High',
    sustainabilityRating: 4,
    matchBreakdown: {
      digitalBanking: 90,
      serviceOfferings: 95,
      feeStructure: 75,
      branchNetwork: 95,
      customerSupport: 88
    },
    reasons: [
      'AI-powered financial assistant',
      'Strong environmental commitment',
      'Preferred Rewards program with tiered benefits'
    ]
  },
  {
    name: 'Capital One',
    type: 'Commercial',
    icon: getBankIconId('Capital One'),
    matchScore: 89,
    description: 'Capital One delivers innovative digital banking solutions with no-fee accounts and user-friendly tools for financial management.',
    website: 'https://www.capitalone.com',
    features: ['No-Fee Accounts', 'High-Yield Savings', 'CreditWise Tools'],
    services: ['Checking', 'Savings', 'Credit Cards', 'Auto Financing', 'Business Banking'],
    digitalRating: 5,
    branchCount: '750+',
    feeLevel: 'Low',
    sustainabilityRating: 3,
    matchBreakdown: {
      digitalBanking: 96,
      serviceOfferings: 88,
      feeStructure: 95,
      branchNetwork: 75,
      customerSupport: 90
    },
    reasons: [
      'Fee-free banking products',
      'Excellent digital experience',
      'Innovative credit monitoring tools'
    ]
  },
  {
    name: 'Wells Fargo',
    type: 'Commercial',
    icon: getBankIconId('Wells Fargo'),
    matchScore: 87,
    description: 'Wells Fargo offers extensive banking products and services with a focus on small business solutions and mortgage lending.',
    website: 'https://www.wellsfargo.com',
    features: ['Control Tower', 'Budgeting Tools', 'Small Business Resources'],
    services: ['Checking', 'Savings', 'Mortgages', 'Small Business', 'Commercial Banking'],
    digitalRating: 4,
    branchCount: '5,200+',
    feeLevel: 'Medium',
    sustainabilityRating: 3,
    matchBreakdown: {
      digitalBanking: 85,
      serviceOfferings: 92,
      feeStructure: 78,
      branchNetwork: 98,
      customerSupport: 83
    },
    reasons: [
      'Largest branch network in the US',
      'Comprehensive small business solutions',
      'Strong mortgage lending expertise'
    ]
  },
  {
    name: 'Ally Bank',
    type: 'Online',
    icon: getBankIconId('Ally Bank'),
    matchScore: 85,
    description: 'Ally Bank is a leading online bank offering high-yield accounts with no monthly maintenance fees and 24/7 customer service.',
    website: 'https://www.ally.com',
    features: ['High-Yield Savings', 'No Monthly Fees', '24/7 Customer Support'],
    services: ['Checking', 'Savings', 'CDs', 'Auto Loans', 'Home Loans'],
    digitalRating: 5,
    branchCount: '0 (Online Only)',
    feeLevel: 'Very Low',
    sustainabilityRating: 3,
    matchBreakdown: {
      digitalBanking: 95,
      serviceOfferings: 85,
      feeStructure: 98,
      branchNetwork: 0,
      customerSupport: 93
    },
    reasons: [
      'Consistently high APY on savings',
      'No-fee banking structure',
      'Top-rated mobile banking experience'
    ]
  },
  {
    name: 'TD Bank',
    type: 'Commercial',
    icon: getBankIconId('TD Bank'),
    matchScore: 82,
    description: 'TD Bank focuses on convenience with extended hours, weekend service, and a strong presence in the Eastern US.',
    website: 'https://www.td.com',
    features: ['Extended Hours', 'Weekend Banking', 'Instant Account Opening'],
    services: ['Checking', 'Savings', 'Credit Cards', 'Personal Loans', 'Mortgages'],
    digitalRating: 3,
    branchCount: '1,100+',
    feeLevel: 'Medium',
    sustainabilityRating: 4,
    matchBreakdown: {
      digitalBanking: 80,
      serviceOfferings: 85,
      feeStructure: 78,
      branchNetwork: 85,
      customerSupport: 90
    },
    reasons: [
      'Extended hours including Sundays',
      'Strong East Coast presence',
      'Rapid in-person account setup'
    ]
  }
];

/**
 * Get mock bank recommendations based on preferences
 * This is a simplified version of the actual recommendation algorithm
 * 
 * @param preferences Any user preferences to filter against (not implemented)
 * @returns Array of bank recommendations
 */
export function getMockBankRecommendations(preferences?: any): Bank[] {
  // In a real implementation, we would filter or sort based on preferences
  // For now, simply return all mock data
  return MOCK_BANK_RECOMMENDATIONS;
}

/**
 * Get a single bank recommendation by name
 * 
 * @param bankName Name of the bank to retrieve
 * @returns Bank object or undefined if not found
 */
export function getMockBankByName(bankName: string): Bank | undefined {
  return MOCK_BANK_RECOMMENDATIONS.find(bank => 
    bank.name.toLowerCase() === bankName.toLowerCase()
  );
} 