/**
 * Bank Recommendations API Endpoint
 * 
 * This endpoint receives banking preference data and returns recommended
 * banks that match the user's criteria.
 */

import { defineEventHandler, readBody } from 'h3';

// Define interface for the request body
interface BankRecommendationRequest {
  // Ranking fields (scale of 0-5)
  "Digital Interface Rank": number;
  "Number of Branches": number;
  "Green Initiatives Rank": number;
  "Fee Level Rank": number;
  "International Support Rank": number;
  "Interest Rate Range Rank": number;
  "Customer Service Quality Rank": number;
  "Capital Adequacy Rank": number;
  
  // Banking services (0 or 1)
  "Auto Loans": number;
  "Credit Cards": number;
  "Global Banking": number;
  "Investments": number;
  "Loans": number;
  "Mortgages": number;
  "Savings Accounts": number;
  
  // Customer types (0 or 1)
  "Global Customers": number;
  "Professionals": number;
  "SMEs": number;
  "Seniors": number;
  "Students": number;
  "Tech-Savvy": number;
}

// Define interface for match breakdown
interface MatchBreakdown {
  digitalBanking: number;
  serviceOfferings: number;
  feeStructure: number;
  branchNetwork: number;
  customerSupport: number;
}

// Define interface for bank recommendation
interface BankRecommendation {
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

export default defineEventHandler(async (event) => {
  try {
    // Read the request body
    const requestData = await readBody<BankRecommendationRequest>(event);
    
    console.log('Bank recommendation request received:', requestData);
    
    // Calculate match scores for each bank based on the request data
    // This is where your recommendation algorithm would go
    // For now, we'll return mock data with scores adjusted based on the input
    
    // Example of how to adjust scores based on input preferences
    const digitalImportance = requestData["Digital Interface Rank"] / 5;
    const branchImportance = requestData["Number of Branches"] > 2000 ? 0.8 : 0.4;
    const greenImportance = requestData["Green Initiatives Rank"] / 5;
    const feeImportance = requestData["Fee Level Rank"] / 5;
    
    // Mock bank recommendations with scores adjusted based on inputs
    const recommendations: BankRecommendation[] = [
      {
        name: 'GreenBank Plus',
        type: 'Digital Bank',
        icon: 'lucide:building-bank',
        matchScore: Math.round(80 + 15 * digitalImportance + 10 * greenImportance - 5 * branchImportance),
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
          serviceOfferings: Math.round(85 + (requestData["Credit Cards"] + requestData["Investments"] + requestData["Loans"] + requestData["Mortgages"]) * 5),
          feeStructure: 85,
          branchNetwork: 75,
          customerSupport: 90
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
        matchScore: Math.round(75 + 20 * digitalImportance + 5 * feeImportance - 10 * branchImportance),
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
          serviceOfferings: Math.round(80 + (requestData["Credit Cards"] + requestData["Investments"]) * 8),
          feeStructure: 95,
          branchNetwork: 20,
          customerSupport: 85
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
        matchScore: Math.round(70 + 5 * digitalImportance + 20 * branchImportance),
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
          serviceOfferings: Math.round(90 + (requestData["Auto Loans"] + requestData["Credit Cards"] + requestData["Loans"] + requestData["Mortgages"]) * 3),
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
    
    // Sort recommendations by match score (highest first)
    recommendations.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return the recommendations
    return {
      success: true,
      recommendations
    };
    
  } catch (error) {
    console.error('Error in bank-recommendations endpoint:', error);
    
    return {
      success: false,
      error: 'Failed to process bank recommendation request'
    };
  }
}); 