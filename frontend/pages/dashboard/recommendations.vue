<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Recommendations</h1>
        <p class="text-muted-foreground">Personalized financial products and services based on your profile</p>
      </div>
      <div class="flex items-center gap-2">
        <UiButton variant="outline" size="sm" class="gap-2">
          <Icon name="lucide:refresh-cw" class="h-4 w-4" />
          Refresh
        </UiButton>
        <UiButton variant="outline" size="sm" class="gap-2">
          <Icon name="lucide:sliders" class="h-4 w-4" />
          Customize
        </UiButton>
      </div>
    </div>

    <!-- Settings notice -->
    <UiAlert variant="default" class="mb-6">
      <Icon name="lucide:info" class="h-4 w-4" />
      <UiAlertTitle>Personalize your recommendations</UiAlertTitle>
      <UiAlertDescription>Complete your financial profile in settings to get more accurate recommendations.</UiAlertDescription>
      <UiButton variant="outline" size="sm" class="ml-auto">
        <NuxtLink to="/dashboard/settings">Update Profile</NuxtLink>
      </UiButton>
    </UiAlert>

    <!-- Main recommendations content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Bank recommendations -->
      <BankRecommendation />
      
      <!-- Service recommendations -->
      <ServiceRecommendation />
    </div>

    <!-- Additional recommendations (financial products) -->
    <UiCard class="shadow-sm mb-6">
      <UiCardHeader>
        <UiCardTitle class="text-foreground">Financial Products</UiCardTitle>
        <UiCardDescription>Investment and insurance products that match your profile</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Product 1 -->
          <div class="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
            <div class="flex items-center mb-3">
              <div class="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Icon name="lucide:briefcase" class="h-4 w-4" />
              </div>
              <h4 class="font-medium text-foreground">Index Fund Portfolio</h4>
            </div>
            <p class="text-sm text-muted-foreground mb-3">Low-cost diversified investment portfolio with automatic rebalancing</p>
            <div class="flex justify-between items-center">
              <UiBadge variant="secondary" class="text-xs">5-7% Expected Return</UiBadge>
              <a href="#" class="text-xs text-primary flex items-center hover:underline">
                Details
                <Icon name="lucide:chevron-right" class="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
          
          <!-- Product 2 -->
          <div class="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
            <div class="flex items-center mb-3">
              <div class="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Icon name="lucide:shield" class="h-4 w-4" />
              </div>
              <h4 class="font-medium text-foreground">Term Life Insurance</h4>
            </div>
            <p class="text-sm text-muted-foreground mb-3">Affordable coverage to protect your family's financial security</p>
            <div class="flex justify-between items-center">
              <UiBadge variant="secondary" class="text-xs">$250k-$1M Coverage</UiBadge>
              <a href="#" class="text-xs text-primary flex items-center hover:underline">
                Details
                <Icon name="lucide:chevron-right" class="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
          
          <!-- Product 3 -->
          <div class="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors">
            <div class="flex items-center mb-3">
              <div class="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3">
                <Icon name="lucide:home" class="h-4 w-4" />
              </div>
              <h4 class="font-medium text-foreground">Mortgage Refinance</h4>
            </div>
            <p class="text-sm text-muted-foreground mb-3">Lower your monthly payments with current competitive rates</p>
            <div class="flex justify-between items-center">
              <UiBadge variant="secondary" class="text-xs">4.5% APR</UiBadge>
              <a href="#" class="text-xs text-primary flex items-center hover:underline">
                Details
                <Icon name="lucide:chevron-right" class="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import BankRecommendation from '@/components/dashboard/BankRecommendation.vue'
import ServiceRecommendation from '@/components/dashboard/ServiceRecommendation.vue'

// Set the dashboard layout
definePageMeta({
  layout: 'dashboard'
})
</script> 