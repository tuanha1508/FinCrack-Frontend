<template>
  <nav class="space-y-1" :class="[expanded ? 'px-2' : 'px-0']">
    <!-- Navigation links -->
    <div v-for="item in navigationItems" :key="item.path" class="flex justify-center">
      <NuxtLink 
        :to="item.path"
        :class="[
          'flex items-center text-sm rounded-md transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          isActive(item.path)
            ? 'bg-accent text-accent-foreground' 
            : 'text-foreground',
          expanded ? 'px-3 py-2 justify-start w-full' : 'w-8 h-8 flex items-center justify-center mx-auto'
        ]"
      >
        <div :class="expanded ? '' : 'flex justify-center items-center'">
          <Icon :name="item.icon" class="h-4 w-4" />
        </div>
        <span 
          :class="[
            'transition-all duration-300',
            expanded ? 'ml-3 opacity-100' : 'opacity-0 w-0 overflow-hidden'
          ]"
        >
          {{ item.title }}
        </span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()

// More precise active state detection
const isActive = (path: string) => {
  // Exact match for dashboard root
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  // For other routes, use startsWith to handle nested routes
  return route.path.startsWith(path)
}

const navigationItems = [
  {
    title: 'Overview',
    icon: 'lucide:layout-dashboard',
    path: '/dashboard'
  },
  {
    title: 'Watchlist',
    icon: 'lucide:star',
    path: '/dashboard/wishlist'
  },
  {
    title: 'Your Virtual Assistant',
    icon: 'lucide:bot',
    path: '/dashboard/virtual-assistant'
  },
  {
    title: 'Bank Recommendations',
    icon: 'lucide:landmark',
    path: '/dashboard/bank-recommendations'
  },
  {
    title: 'Personal Services',
    icon: 'lucide:user',
    path: '/dashboard/service-recommendations'
  },
  {
    title: 'Settings',
    icon: 'lucide:settings',
    path: '/dashboard/settings'
  }
]
</script> 