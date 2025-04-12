import { ref, reactive } from 'vue';

interface ServiceFormData {
  rankings: {
    digitalInterface: number;
    customerService: number;
    fees: number;
    sustainability: number;
    branches: number;
    international: number;
    rates: number;
  };
  serviceTypes: {
    banking: boolean;
    investing: boolean;
    insurance: boolean;
    mortgage: boolean;
    retirement: boolean;
    creditCards: boolean;
    loans: boolean;
    business: boolean;
  };
  customerTypes: {
    individual: boolean;
    family: boolean;
    student: boolean;
    senior: boolean;
    business: boolean;
    international: boolean;
  };
  preferredBranch: string;
}

export const useServiceForm = () => {
  const showResults = ref(false);
  
  const formData = reactive<ServiceFormData>({
    rankings: {
      digitalInterface: 3,
      customerService: 3,
      fees: 3,
      sustainability: 2,
      branches: 2,
      international: 1,
      rates: 3
    },
    serviceTypes: {
      banking: false,
      investing: false,
      insurance: false,
      mortgage: false,
      retirement: false,
      creditCards: false,
      loans: false,
      business: false
    },
    customerTypes: {
      individual: false,
      family: false,
      student: false,
      senior: false,
      business: false,
      international: false
    },
    preferredBranch: ''
  });
  
  const rankingOptions = [
    { value: 0, label: 'Not important' },
    { value: 1, label: 'Slightly important' },
    { value: 2, label: 'Moderately important' },
    { value: 3, label: 'Important' },
    { value: 4, label: 'Very important' },
    { value: 5, label: 'Critical' }
  ];
  
  const branchOptions = [
    { value: '', label: 'No preference' },
    { value: 'london', label: 'London' },
    { value: 'manchester', label: 'Manchester' },
    { value: 'birmingham', label: 'Birmingham' },
    { value: 'edinburgh', label: 'Edinburgh' },
    { value: 'glasgow', label: 'Glasgow' },
    { value: 'cardiff', label: 'Cardiff' },
    { value: 'belfast', label: 'Belfast' }
  ];
  
  function submitForm() {
    // In a real app, you might send this data to an API
    // For now, we'll just show the results
    showResults.value = true;
  }
  
  function resetForm() {
    showResults.value = false;
    
    // Reset form values to defaults
    Object.keys(formData.rankings).forEach(key => {
      formData.rankings[key as keyof typeof formData.rankings] = 3;
    });
    
    Object.keys(formData.serviceTypes).forEach(key => {
      formData.serviceTypes[key as keyof typeof formData.serviceTypes] = false;
    });
    
    Object.keys(formData.customerTypes).forEach(key => {
      formData.customerTypes[key as keyof typeof formData.customerTypes] = false;
    });
    
    formData.preferredBranch = '';
  }
  
  function formatLabel(key: string): string {
    const labels: Record<string, string> = {
      digitalInterface: 'Digital Banking Experience',
      customerService: 'Customer Service',
      fees: 'Low Fees',
      sustainability: 'Environmental Sustainability',
      branches: 'Branch Network',
      international: 'International Services',
      rates: 'Competitive Rates',
      
      banking: 'Everyday Banking',
      investing: 'Investment Services',
      insurance: 'Insurance Products',
      mortgage: 'Mortgage Options',
      retirement: 'Retirement Planning',
      creditCards: 'Credit Cards',
      loans: 'Personal Loans',
      business: 'Business Services',
      
      individual: 'Individual Account Holder',
      family: 'Family',
      student: 'Student',
      senior: 'Senior Citizen',
      internationalClient: 'International Client'
    };
    
    return labels[key] || key;
  }
  
  return {
    formData,
    showResults,
    submitForm,
    resetForm,
    formatLabel,
    rankingOptions,
    branchOptions
  };
}; 