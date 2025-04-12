import { ref } from 'vue'

export function usePricing() {
  const isAnnual = ref(true)
  
  const togglePricingPeriod = (annual: boolean) => {
    isAnnual.value = annual
  }
  
  return {
    isAnnual,
    togglePricingPeriod
  }
} 