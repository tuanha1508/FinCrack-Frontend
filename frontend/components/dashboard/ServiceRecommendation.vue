<template>
  <UiCard class="shadow-sm">
    <UiCardHeader>
      <UiCardTitle class="text-foreground">Recommended Services</UiCardTitle>
      <UiCardDescription>Financial services tailored to your needs</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="space-y-4">
        <!-- Service recommendations list -->
        <div v-for="(service, index) in recommendedServices" :key="index" class="rounded-lg border bg-card hover:bg-accent/10 transition-colors">
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <div class="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                  <Icon :name="service.icon" class="h-5 w-5" />
                </div>
                <h4 class="font-medium text-foreground">{{ service.name }}</h4>
              </div>
              <UiBadge variant="outline" class="text-xs">{{ service.matchScore }}% Match</UiBadge>
            </div>
            <p class="text-sm text-muted-foreground mb-3">{{ service.description }}</p>
            
            <!-- Service benefits -->
            <div class="space-y-2 mb-3">
              <div v-for="(benefit, i) in service.benefits" :key="i" class="flex items-center gap-2 text-sm">
                <Icon name="lucide:check-circle" class="h-4 w-4 text-emerald-500" />
                <span>{{ benefit }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center mt-4">
              <span class="text-xs text-muted-foreground">{{ service.provider }}</span>
              <UiButton size="sm" variant="default" class="gap-2">
                <Icon name="lucide:zap" class="h-4 w-4" />
                Get Started
              </UiButton>
            </div>
          </div>
        </div>
        
        <!-- View all button -->
        <div class="flex justify-center mt-2">
          <UiButton variant="outline" size="sm" class="gap-2">
            <Icon name="lucide:list" class="h-4 w-4" />
            View All Services
          </UiButton>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Define service interface
interface FinancialService {
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  matchScore: number;
  provider: string;
}

// Sample data - in a real application, this would come from an API
const recommendedServices = ref<FinancialService[]>([
  {
    name: 'Tax Optimization',
    icon: 'lucide:calculator',
    description: 'Advanced tax planning and optimization service for investors',
    benefits: [
      'Reduce capital gains tax exposure',
      'Optimize retirement account contributions',
      'Strategic tax-loss harvesting'
    ],
    matchScore: 94,
    provider: 'TaxPro Financial'
  },
  {
    name: 'Retirement Planning',
    icon: 'lucide:hourglass',
    description: 'Comprehensive retirement planning tailored to your goals',
    benefits: [
      'Personalized retirement timeline',
      'Income replacement strategies',
      'Social security optimization'
    ],
    matchScore: 88,
    provider: 'Future Secure Planning'
  },
  {
    name: 'Debt Consolidation',
    icon: 'lucide:credit-card',
    description: 'Simplify your finances by consolidating high-interest debt',
    benefits: [
      'Lower interest rates',
      'Single monthly payment',
      'Faster debt payoff timeline'
    ],
    matchScore: 76,
    provider: 'ClearPath Finance'
  }
]);
</script> 