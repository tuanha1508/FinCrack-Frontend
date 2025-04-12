<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Bank Feature Rankings</UiCardTitle>
      <UiCardDescription>Rank how important each feature is to you on a scale of 0-5 (0: Not important, 5: Very important).</UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Digital Interface Rank -->
        <div class="space-y-2">
          <label for="digitalInterfaceRank" class="text-sm font-medium">Digital Interface Rank</label>
          <UiSelect v-model="formData.digitalInterfaceRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Number of Branches -->
        <div class="space-y-2">
          <label for="numberOfBranches" class="text-sm font-medium">Number of Branches</label>
          <input
            id="numberOfBranches"
            v-model.number="formData.numberOfBranches"
            type="number"
            min="0"
            max="5000"
            step="1"
            class="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
            placeholder="Enter the exact number of branches"
          />
          <p class="text-xs text-muted-foreground">Enter the exact number of branches (0-5000)</p>
        </div>

        <!-- Green Initiatives Rank -->
        <div class="space-y-2">
          <label for="greenInitiativesRank" class="text-sm font-medium">Green Initiatives Rank</label>
          <UiSelect v-model="formData.greenInitiativesRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Fee Level Rank -->
        <div class="space-y-2">
          <label for="feeLevelRank" class="text-sm font-medium">Fee Level Rank</label>
          <UiSelect v-model="formData.feeLevelRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- International Support Rank -->
        <div class="space-y-2">
          <label for="internationalSupportRank" class="text-sm font-medium">International Support Rank</label>
          <UiSelect v-model="formData.internationalSupportRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Interest Rate Range Rank -->
        <div class="space-y-2">
          <label for="interestRateRangeRank" class="text-sm font-medium">Interest Rate Range Rank</label>
          <UiSelect v-model="formData.interestRateRangeRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Customer Service Quality Rank -->
        <div class="space-y-2">
          <label for="customerServiceQualityRank" class="text-sm font-medium">Customer Service Quality Rank</label>
          <UiSelect v-model="formData.customerServiceQualityRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>

        <!-- Capital Adequacy Rank -->
        <div class="space-y-2">
          <label for="capitalAdequacyRank" class="text-sm font-medium">Capital Adequacy Rank</label>
          <UiSelect v-model="formData.capitalAdequacyRank">
            <UiSelectTrigger class="w-full">
              <UiSelectValue placeholder="Select importance (0-5)" />
            </UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="option in rankOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </UiSelectItem>
            </UiSelectContent>
          </UiSelect>
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
    internationalSupportRank: number;
    interestRateRangeRank: number;
    customerServiceQualityRank: number;
    capitalAdequacyRank: number;
  };
  rankOptions: { label: string; value: number }[];
  branchOptions: { label: string; value: number }[];
}>();
</script>

<style scoped>
/* Remove spinner buttons from number input */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style> 