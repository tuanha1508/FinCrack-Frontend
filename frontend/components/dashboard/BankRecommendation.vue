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
            <img :src="`/icons/${bank.icon}.svg`" class="h-5 w-5" alt="Bank icon" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <h4 class="font-medium text-foreground">{{ bank.name }}</h4>
              <UiBadge variant="outline" class="text-xs">{{ bank.digitalRating }}/5</UiBadge>
            </div>
            <p class="text-sm text-muted-foreground mb-2">{{ bank.description }}</p>
            <div class="flex flex-wrap gap-2">
              <UiBadge variant="secondary" v-for="feature in bank.features" :key="feature" class="text-xs">
                {{ feature }}
              </UiBadge>
            </div>
            <div class="mt-3 flex justify-between items-center">
              <UiBadge variant="default" class="text-xs">
                {{ bank.type }}
              </UiBadge>
              <a 
                :href="bank.website" 
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
import { useBankRecommendations, type Bank } from '@/composables/useBankRecommendations';

// Get bank recommendations from the composable
const { recommendedBanks } = useBankRecommendations();
</script> 