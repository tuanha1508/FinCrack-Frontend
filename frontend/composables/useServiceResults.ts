import { ref } from 'vue';

export interface ServiceRecommendation {
  name: string;
  description: string;
  serviceTypes: string[];
  customerTypes: string[];
  ratings: {
    digitalInterface: number;
    branches: number;
    sustainability: number;
    fees: number;
    international: number;
    rates: number;
    customerService: number;
  };
  features: string[];
  match: number;
}

export function useServiceResults() {
  // Mock data for recommended services
  const recommendedServices = ref<ServiceRecommendation[]>([
    {
      name: "Premium Wealth Management",
      description: "Comprehensive wealth management service for high net worth individuals with personalized investment strategies.",
      serviceTypes: [
        "Investment Services", 
        "Wealth Management", 
        "Financial Advisory"
      ],
      customerTypes: [
        "High Net Worth", 
        "Professionals"
      ],
      ratings: {
        digitalInterface: 4.5,
        branches: 3.0,
        sustainability: 4.0,
        fees: 3.0,
        international: 4.5,
        rates: 4.0,
        customerService: 5.0
      },
      features: [
        "Dedicated financial advisor",
        "Advanced portfolio analytics",
        "Tax optimization strategies",
        "Estate planning consultation"
      ],
      match: 92
    },
    {
      name: "Modern Retirement Solutions",
      description: "Specialized retirement planning services with tax-efficient strategies and long-term growth options.",
      serviceTypes: [
        "Retirement Planning", 
        "Investment Services", 
        "Tax Preparation"
      ],
      customerTypes: [
        "Individuals", 
        "Professionals", 
        "Seniors"
      ],
      ratings: {
        digitalInterface: 4.0,
        branches: 4.0,
        sustainability: 3.5,
        fees: 4.0,
        international: 2.5,
        rates: 4.5,
        customerService: 4.0
      },
      features: [
        "Retirement income calculators",
        "Tax-advantaged investment options",
        "Social Security optimization",
        "Required minimum distribution planning"
      ],
      match: 85
    },
    {
      name: "Integrated Home Financing",
      description: "Comprehensive mortgage services including pre-approval, refinancing, and home equity solutions.",
      serviceTypes: [
        "Mortgage Services", 
        "Loan Services", 
        "Financial Advisory"
      ],
      customerTypes: [
        "Individuals", 
        "Professionals"
      ],
      ratings: {
        digitalInterface: 4.5,
        branches: 3.5,
        sustainability: 3.0,
        fees: 4.0,
        international: 2.0,
        rates: 4.0,
        customerService: 4.0
      },
      features: [
        "Digital mortgage application",
        "Competitive interest rates",
        "First-time homebuyer programs",
        "Quick closing options"
      ],
      match: 78
    },
    {
      name: "Essential Tax Services",
      description: "Professional tax preparation and planning services for individuals and small businesses.",
      serviceTypes: [
        "Tax Preparation", 
        "Financial Advisory"
      ],
      customerTypes: [
        "Individuals", 
        "Professionals", 
        "Small Businesses"
      ],
      ratings: {
        digitalInterface: 3.5,
        branches: 4.0,
        sustainability: 3.0,
        fees: 4.5,
        international: 2.0,
        rates: 3.5,
        customerService: 4.0
      },
      features: [
        "Year-round tax support",
        "Electronic filing",
        "Tax-saving strategies",
        "Audit representation"
      ],
      match: 73
    }
  ]);

  // Filter service recommendations based on minimum match percentage
  const filterServicesByMatch = (minMatch: number): ServiceRecommendation[] => {
    return recommendedServices.value.filter(service => service.match >= minMatch);
  };

  // Get top N service recommendations
  const getTopServices = (count: number): ServiceRecommendation[] => {
    return [...recommendedServices.value]
      .sort((a, b) => b.match - a.match)
      .slice(0, count);
  };

  return {
    recommendedServices,
    filterServicesByMatch,
    getTopServices
  };
} 