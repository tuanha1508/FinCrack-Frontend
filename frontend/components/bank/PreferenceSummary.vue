<template>
  <UiCard class="mb-6">
    <UiCardHeader class="pb-2">
      <UiCardTitle class="text-base">Your Preferences Summary</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <h3 class="text-sm font-medium mb-2">Ranking Preferences</h3>
          <ul class="text-sm space-y-1">
            <li class="flex justify-between">
              <span class="text-muted-foreground">Digital Interface:</span>
              <span class="font-medium">{{ formData.digitalInterfaceRank }}/5</span>
            </li>
            <li class="flex justify-between">
              <span class="text-muted-foreground">Number of Branches:</span>
              <span class="font-medium">{{ formData.numberOfBranches }}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-muted-foreground">Green Initiatives:</span>
              <span class="font-medium">{{ formData.greenInitiativesRank }}/5</span>
            </li>
            <li class="flex justify-between">
              <span class="text-muted-foreground">Fee Level:</span>
              <span class="font-medium">{{ formData.feeLevelRank }}/5</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Service Preferences</h3>
          <ul class="text-sm space-y-1">
            <li v-for="(value, key) in servicePreferences" :key="key"
              class="flex items-center gap-2"
              v-show="value">
              <Icon name="lucide:check" class="h-3 w-3 text-green-500" />
              <span>{{ formatLabel(key) }}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Customer Profile</h3>
          <ul class="text-sm space-y-1">
            <li v-for="(value, key) in customerTypePreferences" :key="key"
              class="flex items-center gap-2"
              v-show="value">
              <Icon name="lucide:check" class="h-3 w-3 text-green-500" />
              <span>{{ formatLabel(key) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
defineProps<{
  formData: {
    digitalInterfaceRank: number;
    numberOfBranches: number;
    greenInitiativesRank: number;
    feeLevelRank: number;
  };
  servicePreferences: Record<string, boolean>;
  customerTypePreferences: Record<string, boolean>;
  formatLabel: (key: string) => string;
}>();
</script> 