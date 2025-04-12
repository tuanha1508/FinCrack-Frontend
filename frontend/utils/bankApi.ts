/**
 * Bank API utility functions
 */

// Define the bank recommendation request interface with the exact format required by the API
export interface BankRecommendationRequest {
  "Digital Interface Rank": number;
  "Number of Branches": number;
  "Green Initiatives Rank": number;
  "Fee Level Rank": number;
  "International Support Rank": number;
  "Interest Rate Range Rank": number;
  "Customer Service Quality Rank": number;
  "Capital Adequacy Rank": number;
  "Auto Loans": number;
  "Credit Cards": number;
  "Global Banking": number;
  "Investments": number;
  "Loans": number;
  "Mortgages": number;
  "Savings Accounts": number;
  "Global Customers": number;
  "Professionals": number;
  "SMEs": number;
  "Seniors": number;
  "Students": number;
  "Tech-Savvy": number;
}

/**
 * Sends a request to the bank recommendation API with the specified format
 * @param requestData Data in the format required by the bank recommendation API
 * @returns API response with bank recommendations
 */
export async function fetchBankRecommendations(requestData: BankRecommendationRequest) {
  try {
    const response = await fetch('/api/bank-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bank recommendations:', error);
    throw error;
  }
}

/**
 * Converts form data to the format required by the bank recommendation API
 * Safely handles nullable or undefined values in form data
 * 
 * @param formData Form data with camelCase property names and boolean values
 * @returns Data formatted according to the API requirements
 */
export function formatBankRequestData(formData: Record<string, any>): BankRecommendationRequest {
  // Ensure all numeric values have defaults if null/undefined
  const getNumericValue = (value: number | null | undefined): number => {
    return (value === null || value === undefined) ? 0 : value;
  };
  
  // Convert boolean to 0/1
  const getBooleanValue = (value: boolean | null | undefined): number => {
    return value ? 1 : 0;
  };
  
  return {
    "Digital Interface Rank": getNumericValue(formData.digitalInterfaceRank),
    "Number of Branches": getNumericValue(formData.numberOfBranches),
    "Green Initiatives Rank": getNumericValue(formData.greenInitiativesRank),
    "Fee Level Rank": getNumericValue(formData.feeLevelRank),
    "International Support Rank": getNumericValue(formData.internationalSupportRank),
    "Interest Rate Range Rank": getNumericValue(formData.interestRateRangeRank),
    "Customer Service Quality Rank": getNumericValue(formData.customerServiceQualityRank),
    "Capital Adequacy Rank": getNumericValue(formData.capitalAdequacyRank),
    "Auto Loans": getBooleanValue(formData.autoLoans),
    "Credit Cards": getBooleanValue(formData.creditCards),
    "Global Banking": getBooleanValue(formData.globalBanking),
    "Investments": getBooleanValue(formData.investments),
    "Loans": getBooleanValue(formData.loans),
    "Mortgages": getBooleanValue(formData.mortgages),
    "Savings Accounts": getBooleanValue(formData.savingsAccounts),
    "Global Customers": getBooleanValue(formData.globalCustomers),
    "Professionals": getBooleanValue(formData.professionals),
    "SMEs": getBooleanValue(formData.smes),
    "Seniors": getBooleanValue(formData.seniors),
    "Students": getBooleanValue(formData.students),
    "Tech-Savvy": getBooleanValue(formData.techSavvy)
  };
}

/**
 * Example function demonstrating how to use the exact input format provided 
 * in the user's request.
 * 
 * This shows how to create a request object with the exact format expected by
 * the API and send it directly.
 */
export async function exampleDirectApiCall() {
  // This is the exact format provided in the user's example
  const requestData: BankRecommendationRequest = {
    "Digital Interface Rank": 2,
    "Number of Branches": 3700,
    "Green Initiatives Rank": 1,
    "Fee Level Rank": 2,
    "International Support Rank": 3,
    "Interest Rate Range Rank": 2,
    "Customer Service Quality Rank": 3,
    "Capital Adequacy Rank": 3,
    "Auto Loans": 0,
    "Credit Cards": 1,
    "Global Banking": 0,
    "Investments": 1,
    "Loans": 1,
    "Mortgages": 1,
    "Savings Accounts": 0,
    "Global Customers": 0,
    "Professionals": 0,
    "SMEs": 1,
    "Seniors": 1,
    "Students": 1,
    "Tech-Savvy": 0
  };
  
  // Call the API with the structured data
  try {
    const result = await fetchBankRecommendations(requestData);
    console.log('Bank recommendations:', result);
    return result;
  } catch (error) {
    console.error('Error in example API call:', error);
    throw error;
  }
} 