<template>
  <div
    data-slot="progress"
    class="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
  >
    <div
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - (value || 0)}%)` }"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value?: number
}>()
</script> 