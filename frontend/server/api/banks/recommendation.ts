/**
 * Bank Recommendations API Endpoint
 * 
 * This endpoint receives banking preference data and returns recommended
 * banks that match the user's criteria.
 */

import { defineEventHandler, readBody } from 'h3';
import { $fetch } from 'ofetch';

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
    
    // Make a real HTTP request to the external API endpoint
    const response = await $fetch('http://localhost:3000/api/banks/recommendation', {
      method: 'POST',
      body: requestData,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response from external API:', response);
    
    // Return the response from the external API
    return response;
    
  } catch (error) {
    console.error('Error in bank-recommendations endpoint:', error);
    
    const errorResponse = {
      success: false,
      error: 'Failed to process bank recommendation request'
    };
    
    console.log('Sending error response:', errorResponse);
    
    return errorResponse;
  }
}); 