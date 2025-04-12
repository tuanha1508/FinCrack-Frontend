<template>
  <UiCard class="overflow-hidden">
    <div class="sm:flex">
      <!-- Bank info section -->
      <div class="flex-1 p-5">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="h-12 w-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4">
              <Icon :name="bank.icon" class="h-6 w-6" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-foreground">{{ bank.name }}</h2>
              <p class="text-sm text-muted-foreground">{{ bank.type }}</p>
            </div>
          </div>
          <UiBadge variant="outline" class="text-lg px-3 py-1 h-auto font-bold">
            {{ bank.matchScore }}%
          </UiBadge>
        </div>

        <p class="text-sm text-muted-foreground mb-4">{{ bank.description }}</p>

        <!-- Features and services -->
        <div class="mb-4">
          <h3 class="text-sm font-medium mb-2">Key Features</h3>
          <div class="flex flex-wrap gap-2">
            <UiBadge variant="secondary" v-for="feature in bank.features" :key="feature" class="text-xs">
              {{ feature }}
            </UiBadge>
          </div>
        </div>

        <div class="mb-4">
          <h3 class="text-sm font-medium mb-2">Available Services</h3>
          <div class="flex flex-wrap gap-2">
            <UiBadge variant="outline" v-for="service in bank.services" :key="service" class="text-xs">
              {{ service }}
            </UiBadge>
          </div>
        </div>

        <!-- Bank highlights -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p class="text-xs text-muted-foreground">Digital Experience</p>
            <div class="flex items-center mt-1">
              <div class="flex">
                <Icon v-for="i in 5" :key="i" :name="i <= bank.digitalRating ? 'lucide:star' : 'lucide:star-off'" 
                  class="h-4 w-4" :class="i <= bank.digitalRating ? 'text-amber-500' : 'text-gray-300'" />
              </div>
            </div>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Branches</p>
            <p class="font-medium">{{ bank.branchCount }}</p>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Fee Level</p>
            <div class="flex items-center mt-1">
              <div>
                <span class="font-medium">{{ bank.feeLevel }}</span>
              </div>
            </div>
          </div>
          <div>
            <p class="text-xs text-muted-foreground">Sustainability Rating</p>
            <div class="flex">
              <Icon v-for="i in 5" :key="i" :name="i <= bank.sustainabilityRating ? 'lucide:leaf' : 'lucide:leaf-off'" 
                class="h-4 w-4" :class="i <= bank.sustainabilityRating ? 'text-green-500' : 'text-gray-300'" />
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex items-center justify-between mt-6">
          <div class="flex items-center gap-3">
            <UiButton size="sm" variant="default" class="gap-2" as-child>
              <a :href="bank.website" target="_blank">
                Visit Website
                <Icon name="lucide:external-link" class="h-4 w-4" />
              </a>
            </UiButton>
            <UiButton size="sm" variant="outline" class="gap-2">
              <Icon name="lucide:info" class="h-4 w-4" />
              View Details
            </UiButton>
          </div>
          <UiButton size="sm" variant="ghost" class="gap-2">
            <Icon name="lucide:bookmark" class="h-4 w-4" />
            Save
          </UiButton>
        </div>
      </div>

      <!-- Match breakdown section -->
      <div class="w-full sm:w-80 border-t sm:border-t-0 sm:border-l bg-muted/10 p-5">
        <h3 class="text-sm font-medium mb-3">Match Breakdown</h3>
        
        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>Digital Banking</span>
              <span>{{ bank.matchBreakdown.digitalBanking }}%</span>
            </div>
            <UiProgress :value="bank.matchBreakdown.digitalBanking" class="h-1.5" />
          </div>
          
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>Service Offerings</span>
              <span>{{ bank.matchBreakdown.serviceOfferings }}%</span>
            </div>
            <UiProgress :value="bank.matchBreakdown.serviceOfferings" class="h-1.5" />
          </div>
          
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>Fee Structure</span>
              <span>{{ bank.matchBreakdown.feeStructure }}%</span>
            </div>
            <UiProgress :value="bank.matchBreakdown.feeStructure" class="h-1.5" />
          </div>
          
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>Branch Network</span>
              <span>{{ bank.matchBreakdown.branchNetwork }}%</span>
            </div>
            <UiProgress :value="bank.matchBreakdown.branchNetwork" class="h-1.5" />
          </div>
          
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span>Customer Support</span>
              <span>{{ bank.matchBreakdown.customerSupport }}%</span>
            </div>
            <UiProgress :value="bank.matchBreakdown.customerSupport" class="h-1.5" />
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
          <h3 class="text-sm font-medium mb-2">Why This Bank?</h3>
          <ul class="text-xs space-y-2">
            <li v-for="(reason, idx) in bank.reasons" :key="idx" 
              class="flex items-start gap-2">
              <Icon name="lucide:check-circle" class="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{{ reason }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import { Bank } from '@/composables/useBankRecommendations';

defineProps<{
  bank: Bank;
}>();
</script> 