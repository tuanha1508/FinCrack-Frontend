<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Personal Service Recommendations</h1>
        <p class="text-muted-foreground">Get tailored financial service recommendations based on your personal profile</p>
      </div>
      <div class="flex items-center gap-2" v-if="showResults">
        <UiButton variant="outline" size="sm" class="gap-2" @click="resetForm">
          <Icon name="lucide:chevron-left" class="h-4 w-4" />
          Back to Form
        </UiButton>
        <UiButton variant="outline" size="sm" class="gap-2" @click="refreshRecommendations">
          <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          Refresh
        </UiButton>
      </div>
    </div>

    <!-- Form Section -->
    <div v-if="!showResults">
      <ServiceProfileForm @submit="handleFormSubmit" />
    </div>

    <!-- Results Section -->
    <div v-if="showResults">
      <!-- Profile Summary -->
      <UiCard class="mb-6">
        <UiCardHeader>
          <UiCardTitle>Your Profile Summary</UiCardTitle>
          <UiCardDescription>Recommendations are based on the following information</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Demographics -->
            <div>
              <h3 class="text-sm font-medium mb-2">Demographics</h3>
              <ul class="space-y-1 text-sm">
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Age:</span>
                  <span class="font-medium">{{ formData["Age"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Gender:</span>
                  <span class="font-medium">{{ formData["Gender"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Marital Status:</span>
                  <span class="font-medium">{{ formData["Marital Status"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Dependents:</span>
                  <span class="font-medium">{{ formData["Dependents"] }}</span>
                </li>
              </ul>
            </div>

            <!-- Financial -->
            <div>
              <h3 class="text-sm font-medium mb-2">Financial</h3>
              <ul class="space-y-1 text-sm">
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Income Level:</span>
                  <span class="font-medium">{{ formData["Income Level"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Occupation:</span>
                  <span class="font-medium">{{ formData["Occupation"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Residential Status:</span>
                  <span class="font-medium">{{ formData["Residential Status"] }}</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-muted-foreground">Debt-to-Income:</span>
                  <span class="font-medium">{{ (formData["Debt-to-Income"] * 100).toFixed(0) }}%</span>
                </li>
              </ul>
            </div>

            <!-- Recent Inquiries -->
            <div>
              <h3 class="text-sm font-medium mb-2">Recent Loan Inquiries</h3>
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div v-for="(value, key) in recentInquiries" :key="key" class="flex items-center">
                  <Icon 
                    :name="value ? 'lucide:check' : 'lucide:x'" 
                    :class="value ? 'text-emerald-500' : 'text-gray-300'" 
                    class="h-4 w-4 mr-1"
                  />
                  <span class="truncate">{{ formatInquiryLabel(key) }}</span>
                </div>
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Match score explanation -->
      <div class="rounded-lg bg-muted/40 p-4 mb-6 flex items-center">
        <Icon name="lucide:info" class="h-5 w-5 text-primary mr-3 flex-shrink-0" />
        <p class="text-sm">Our matching algorithm considers your personal profile, financial situation, and recent activities to calculate a match score. Services with higher scores align better with your current needs.</p>
      </div>

      <!-- Service recommendations list -->
      <div class="space-y-6">
        <UiCard v-for="(service, index) in recommendedServices" :key="index" class="overflow-hidden">
          <div class="sm:flex">
            <!-- Service info section -->
            <div class="flex-1 p-5">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
                    <Icon :name="service.icon" class="h-6 w-6" />
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-foreground">{{ service.name }}</h2>
                    <p class="text-sm text-muted-foreground">{{ service.provider }}</p>
                  </div>
                </div>
                <UiBadge variant="outline" class="text-lg px-3 py-1 h-auto font-bold">
                  {{ service.matchScore }}%
                </UiBadge>
              </div>

              <p class="text-sm text-muted-foreground mb-4">{{ service.description }}</p>

              <!-- Features and categories -->
              <div class="mb-4">
                <h3 class="text-sm font-medium mb-2">Key Features</h3>
                <div class="flex flex-wrap gap-2">
                  <UiBadge variant="secondary" v-for="feature in service.features" :key="feature" class="text-xs">
                    {{ feature }}
                  </UiBadge>
                </div>
              </div>

              <div class="mb-4">
                <h3 class="text-sm font-medium mb-2">Service Categories</h3>
                <div class="flex flex-wrap gap-2">
                  <UiBadge variant="outline" v-for="category in service.categories" :key="category" class="text-xs">
                    {{ category }}
                  </UiBadge>
                </div>
              </div>

              <!-- Match reasons -->
              <div class="mb-4">
                <h3 class="text-sm font-medium mb-2">Why We Recommend This</h3>
                <ul class="space-y-1">
                  <li v-for="(reason, i) in service.reasons" :key="i" class="flex items-start gap-2 text-sm">
                    <Icon name="lucide:check-circle" class="h-4 w-4 text-emerald-500 mt-0.5" />
                    <span>{{ reason }}</span>
                  </li>
                </ul>
              </div>

              <!-- Service highlights -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p class="text-xs text-muted-foreground">Digital Experience</p>
                  <div class="flex items-center mt-1">
                    <div class="flex">
                      <Icon v-for="i in 5" :key="i" :name="i <= service.digitalRating ? 'lucide:star' : 'lucide:star-off'" 
                        class="h-4 w-4" :class="i <= service.digitalRating ? 'text-amber-500' : 'text-gray-300'" />
                    </div>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Supported Platforms</p>
                  <p class="font-medium">{{ service.platforms }}</p>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Price</p>
                  <div class="flex items-center mt-1">
                    <div>
                      <span class="font-medium">{{ service.price }}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="text-xs text-muted-foreground">Customer Satisfaction</p>
                  <p class="font-medium">{{ service.customerSatisfaction }}%</p>
                </div>
              </div>
            </div>
          </div>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, definePageMeta } from '#imports';
import ServiceProfileForm from '@/components/dashboard/ServiceProfileForm.vue';

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard'
});

// Define the service recommendation interface
interface ServiceRecommendation {
  name: string;
  provider: string;
  icon: string;
  matchScore: number;
  description: string;
  features: string[];
  categories: string[];
  digitalRating: number;
  platforms: string;
  price: string;
  customerSatisfaction: number;
  reasons: string[];
}

// Define the form data output interface to match ServiceProfileForm output
interface FormDataOutput {
  "Age": number;
  "Gender": string;
  "Marital Status": string;
  "Income Level": string;
  "Occupation": string;
  "Residential Status": string;
  "Dependents": number;
  "last_3months_personal_loan_inq": boolean;
  "last_3months_auto_loan_inq": boolean;
  "last_3months_mortgages_inq": boolean;
  "last_3months_home_equity_loan_inq": boolean;
  "last_3months_student_loan_inq": boolean;
  "last_3months_business_loan_inq": boolean;
  "last_3months_credit_card_inq": boolean;
  "last_6months_personal_loan_inq": boolean;
  "last_6months_auto_loan_inq": boolean;
  "last_6months_mortgages_inq": boolean;
  "last_6months_home_equity_loan_inq": boolean;
  "last_6months_student_loan_inq": boolean;
  "last_6months_business_loan_inq": boolean;
  "last_6months_credit_card_inq": boolean;
}

// Define the form data interface
interface FormDataType {
  "Age": number;
  "Gender": string;
  "Marital Status": string;
  "Income Level": string;
  "Occupation": string;
  "Residential Status": string;
  "Dependents": number;
  "Debt-to-Income": number;
  "last_3months_personal_loan_inq": boolean;
  "last_3months_auto_loan_inq": boolean;
  "last_3months_mortgages_inq": boolean;
  "last_3months_home_equity_loan_inq": boolean;
  "last_3months_student_loan_inq": boolean;
  "last_3months_business_loan_inq": boolean;
  "last_3months_credit_card_inq": boolean;
  "last_6months_personal_loan_inq": boolean;
  "last_6months_auto_loan_inq": boolean;
  "last_6months_mortgages_inq": boolean;
  "last_6months_home_equity_loan_inq": boolean;
  "last_6months_student_loan_inq": boolean;
  "last_6months_business_loan_inq": boolean;
  "last_6months_credit_card_inq": boolean;
  [key: string]: any; // Allow string indexing for dynamic access
}

const showResults = ref(false);
const formData = ref<FormDataType>({} as FormDataType);

// Computed property to extract recent inquiries from form data
const recentInquiries = computed(() => {
  const inquiries: Record<string, boolean> = {};
  
  for (const [key, value] of Object.entries(formData.value)) {
    if (key.includes('_loan_inq') || key.includes('_credit_card_inq')) {
      inquiries[key] = value as boolean;
    }
  }
  
  return inquiries;
});

// Format inquiry label
const formatInquiryLabel = (key: string): string => {
  let label = key
    .replace('last_3months_', '3m: ')
    .replace('last_6months_', '6m: ')
    .replace('_loan_inq', '')
    .replace('_credit_card_inq', 'Credit Card')
    .replace(/_/g, ' ');
  
  // Capitalize first letter of each word
  return label
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Handle form submission
const handleFormSubmit = (data: FormDataOutput) => {
  // Add the missing Debt-to-Income property with a default value
  const enhancedData: FormDataType = {
    ...data,
    "Debt-to-Income": 0.3 // Default value, can be adjusted based on requirements
  };
  
  formData.value = enhancedData;
  console.log('Submitted form data:', enhancedData);
  
  // In a real app, this would call an API to get recommendations
  // For now, we'll populate sample data when form is submitted
  populateMockRecommendations();
  showResults.value = true;
  window.scrollTo(0, 0);
};

// Reset form to go back to input
const resetForm = () => {
  showResults.value = false;
  recommendedServices.value = [];
  window.scrollTo(0, 0);
};

// Refresh recommendations
const refreshRecommendations = () => {
  console.log('Refreshing personal service recommendations...');
  // In a real app, this would resubmit the form data to the API
  // and get fresh recommendations
  populateMockRecommendations();
};

// Function to populate mock data
const populateMockRecommendations = () => {
  recommendedServices.value = [
    {
      name: 'Auto Loan Optimizer',
      provider: 'EcoFinance',
      icon: 'lucide:car',
      matchScore: 92,
      description: 'A specialized auto loan service offering competitive rates and flexible payment options for those looking for a new vehicle.',
      features: ['Competitive Rates', 'Fast Approval', 'No Early Repayment Fees', 'Long Term Options'],
      categories: ['Auto Loans', 'Vehicle Financing', 'Personal Loans'],
      digitalRating: 4,
      platforms: 'Web, iOS, Android',
      price: 'No upfront fees',
      customerSatisfaction: 91,
      reasons: [
        'Matches your recent auto loan inquiries',
        'Suitable for your income level and debt-to-income ratio',
        'Provides digital application process with minimal paperwork',
        'Offers special rates for your occupation category'
      ]
    },
    {
      name: 'Home Equity Pro',
      provider: 'PropertyFinance',
      icon: 'lucide:home',
      matchScore: 87,
      description: 'Access the equity in your home with flexible borrowing options, competitive rates, and personalized repayment plans.',
      features: ['Low Interest Rates', 'Flexible Terms', 'Tax Benefits', 'Quick Approval'],
      categories: ['Home Equity', 'Property Loans', 'Refinancing'],
      digitalRating: 4,
      platforms: 'Web, iOS',
      price: 'Variable by equity amount',
      customerSatisfaction: 88,
      reasons: [
        'Aligns with your recent home equity loan inquiries',
        'Offers flexible options suited for your financial situation',
        'Provides competitive rates based on your profile',
        'Digital application process for convenience'
      ]
    },
    {
      name: 'Business Growth Fund',
      provider: 'EnterpriseCapital',
      icon: 'lucide:briefcase',
      matchScore: 84,
      description: 'Tailored business financing solutions to help entrepreneurs and small businesses access capital for growth and operations.',
      features: ['Flexible Funding', 'Industry-Specific Solutions', 'Advisory Services', 'Scalable Options'],
      categories: ['Business Loans', 'Commercial Financing', 'Startup Funding'],
      digitalRating: 5,
      platforms: 'Web, iOS, Android',
      price: 'Competitive rates from 3.5%',
      customerSatisfaction: 89,
      reasons: [
        'Matches your business loan inquiry history',
        'Designed for professionals in your occupation category',
        'Offers digital-first application process',
        'Provides advisory services tailored to your business needs'
      ]
    },
    {
      name: 'Debt Consolidation Plus',
      provider: 'FinancialFreedom',
      icon: 'lucide:wallet',
      matchScore: 76,
      description: 'Simplify your finances by consolidating multiple debts into a single, manageable payment with lower overall interest rates.',
      features: ['Lower Interest Rates', 'Single Monthly Payment', 'Personalized Plan', 'Debt Counseling'],
      categories: ['Debt Consolidation', 'Personal Loans', 'Credit Management'],
      digitalRating: 4,
      platforms: 'Web, iOS, Android',
      price: 'No upfront fees',
      customerSatisfaction: 85,
      reasons: [
        'Help manage your current debt-to-income ratio',
        'Simplifies multiple loan payments',
        'Offers financial counseling services',
        'Flexible repayment terms based on your income level'
      ]
    }
  ];
};

// Initialize with empty array instead of prepopulated mock data
const recommendedServices = ref<ServiceRecommendation[]>([]);
</script>

<style scoped>
/* Custom styling for range inputs to show the current value */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 4px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4f46e5;
  cursor: pointer;
}
</style> 