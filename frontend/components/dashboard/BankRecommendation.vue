<template>
  <UiCard class="shadow-sm">
    <UiCardHeader>
      <UiCardTitle class="text-foreground">Recommended Banks</UiCardTitle>
      <UiCardDescription>Banks that might be a good fit for your financial profile</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="space-y-4">
        <!-- Bank recommendations list -->
        <div v-for="(bank, index) in recommendedBanks" :key="index" class="flex items-start p-3 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
          <div class="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
            <Icon :name="bank.icon" class="h-5 w-5" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-foreground">{{ bank.name }}</h4>
              <UiBadge variant="outline" class="text-xs">{{ bank.rating }}/5</UiBadge>
            </div>
            <p class="text-sm text-muted-foreground mb-2">{{ bank.description }}</p>
            <div class="flex flex-wrap gap-2">
              <UiBadge variant="secondary" v-for="feature in bank.features" :key="feature" class="text-xs">
                {{ feature }}
              </UiBadge>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <UiBadge variant="default" class="text-xs">
                {{ bank.accountType }}
              </UiBadge>
              <a 
                :href="bank.url" 
                target="_blank"
                class="text-xs text-primary flex items-center hover:underline"
              >
                Learn more
                <Icon name="lucide:external-link" class="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
        
        <!-- View all button -->
        <div class="flex justify-center mt-2">
          <UiButton variant="outline" size="sm" class="gap-2">
            <Icon name="lucide:list" class="h-4 w-4" />
            View All Recommendations
          </UiButton>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define bank interface
interface Bank {
  name: string;
  icon: string;
  description: string;
  features: string[];
  rating: number;
  accountType: string;
  url: string;
}

// Sample data - in a real application, this would come from an API
const recommendedBanks = ref<Bank[]>([
  {
    name: 'Digital First Bank',
    icon: 'lucide:landmark',
    description: 'High-yield savings with no fees and excellent mobile experience',
    features: ['No Fees', 'High APY', 'Mobile Banking'],
    rating: 4.8,
    accountType: 'Savings',
    url: '#'
  },
  {
    name: 'Investment Capital',
    icon: 'lucide:building',
    description: 'Premium checking with investment integration and cash back',
    features: ['Cash Back', 'Investment Tools', 'Premium Service'],
    rating: 4.5,
    accountType: 'Checking',
    url: '#'
  },
  {
    name: 'Future Planning Credit Union',
    icon: 'lucide:wallet',
    description: 'Low-rate loans and excellent customer service for all your needs',
    features: ['Low Rates', 'Credit Builder', 'Financial Planning'],
    rating: 4.6,
    accountType: 'Loans',
    url: '#'
  }
]);
</script> 