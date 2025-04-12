import { ref, computed } from 'vue';

// Define the form data type
interface BankFormData {
  digitalInterfaceRank: number | null;
  numberOfBranches: number | null;
  greenInitiativesRank: number | null;
  feeLevelRank: number | null;
  internationalSupportRank: number | null;
  interestRateRangeRank: number | null;
  customerServiceQualityRank: number | null;
  capitalAdequacyRank: number | null;
  autoLoans: boolean;
  creditCards: boolean;
  globalBanking: boolean;
  investments: boolean;
  loans: boolean;
  mortgages: boolean;
  savingsAccounts: boolean;
  globalCustomers: boolean;
  professionals: boolean;
  smes: boolean;
  seniors: boolean;
  students: boolean;
  techSavvy: boolean;
  [key: string]: number | null | boolean; // Index signature
}

export function useBankForm() {
  // Form data
  const formData = ref<BankFormData>({
    // Ranking fields (0-5)
    digitalInterfaceRank: null,
    numberOfBranches: null,
    greenInitiativesRank: null,
    feeLevelRank: null,
    internationalSupportRank: null, 
    interestRateRangeRank: null,
    customerServiceQualityRank: null,
    capitalAdequacyRank: null,
    
    // Boolean fields
    autoLoans: false,
    creditCards: false,
    globalBanking: false,
    investments: false,
    loans: false,
    mortgages: false,
    savingsAccounts: false,
    globalCustomers: false,
    professionals: false,
    smes: false,
    seniors: false,
    students: false,
    techSavvy: false
  });

  // Show/hide form vs results
  const showResults = ref(false);

  // Computed values for preferences (just for display in results)
  const servicePreferences = computed(() => {
    return {
      autoLoans: formData.value.autoLoans,
      creditCards: formData.value.creditCards,
      globalBanking: formData.value.globalBanking,
      investments: formData.value.investments,
      loans: formData.value.loans,
      mortgages: formData.value.mortgages,
      savingsAccounts: formData.value.savingsAccounts
    };
  });

  const customerTypePreferences = computed(() => {
    return {
      globalCustomers: formData.value.globalCustomers,
      professionals: formData.value.professionals,
      smes: formData.value.smes,
      seniors: formData.value.seniors,
      students: formData.value.students,
      techSavvy: formData.value.techSavvy
    };
  });

  // Helper to format keys to display labels
  const formatLabel = (key: string): string => {
    // Split camelCase and capitalize each word
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Submit form
  const submitForm = () => {
    // Check if all ranking fields have values
    const requiredRankFields = [
      'digitalInterfaceRank',
      'numberOfBranches',
      'greenInitiativesRank',
      'feeLevelRank',
      'internationalSupportRank',
      'interestRateRangeRank',
      'customerServiceQualityRank',
      'capitalAdequacyRank'
    ] as const;
    
    const missingFields = requiredRankFields.filter(field => 
      formData.value[field] === null || formData.value[field] === undefined
    );
    
    if (missingFields.length > 0) {
      alert('Please fill in all rank fields before submitting.');
      return;
    }

    // Convert boolean values to 0 or 1 for API submission
    const apiData = {
      ...formData.value,
      autoLoans: formData.value.autoLoans ? 1 : 0,
      creditCards: formData.value.creditCards ? 1 : 0,
      globalBanking: formData.value.globalBanking ? 1 : 0,
      investments: formData.value.investments ? 1 : 0,
      loans: formData.value.loans ? 1 : 0,
      mortgages: formData.value.mortgages ? 1 : 0,
      savingsAccounts: formData.value.savingsAccounts ? 1 : 0,
      globalCustomers: formData.value.globalCustomers ? 1 : 0,
      professionals: formData.value.professionals ? 1 : 0,
      smes: formData.value.smes ? 1 : 0,
      seniors: formData.value.seniors ? 1 : 0,
      students: formData.value.students ? 1 : 0,
      techSavvy: formData.value.techSavvy ? 1 : 0
    };

    console.log('Submitting bank preferences:', apiData);
    
    // In a real app, we would call an API here to get recommendations
    // based on user preferences. For now, we'll just show pre-configured results
    showResults.value = true;
    
    // In a real app, you would perform something like:
    // const response = await fetch('/api/bank-recommendations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(apiData),
    // });
    // const data = await response.json();
    // recommendedBanks.value = data.recommendations;
  };

  // Reset form to go back to input
  const resetForm = () => {
    showResults.value = false;
    window.scrollTo(0, 0);
  };

  // Generate options for dropdowns
  const rankOptions = Array.from({ length: 6 }, (_, i) => ({ 
    label: i.toString(), 
    value: i 
  }));

  const branchOptions = Array.from({ length: 51 }, (_, i) => ({ 
    label: (i * 100).toString(), 
    value: i * 100 
  }));

  return {
    formData,
    showResults,
    servicePreferences,
    customerTypePreferences,
    formatLabel,
    submitForm,
    resetForm,
    rankOptions,
    branchOptions
  };
} 