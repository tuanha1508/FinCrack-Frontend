<template>
  <div class="h-screen flex overflow-hidden bg-background">
    <!-- Sidebar -->
    <div 
      @mouseenter="expandSidebar"
      @mouseleave="collapseSidebar"
      :class="[
        'h-full transition-all duration-300 bg-card',
        sidebarExpanded ? 'w-64' : 'w-20'
      ]"
    >
      <div class="p-4 flex items-center justify-between">
        <h1 
          :class="[
            'font-gugi text-foreground transition-opacity duration-300',
            sidebarExpanded ? 'opacity-100' : 'opacity-0'
          ]"
        >
          FinHack
        </h1>
      </div>
      
      <div class="mt-4">
        <SidebarNavigation :expanded="sidebarExpanded" />
      </div>
    </div>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- Header -->
      <header class="h-16 px-6 border-b flex items-center justify-between bg-card">
        <div class="flex items-center gap-2">
          <h2 class="text-lg font-medium text-foreground">Dashboard</h2>
        </div>
        <div class="flex items-center space-x-4">
          <button 
            @click="toggleColorMode"
            class="p-2 rounded-md hover:bg-accent text-foreground"
          >
            <Icon 
              :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
              class="w-5 h-5" 
            />
          </button>
          <div class="relative">
            <button class="h-8 w-8 rounded-full bg-accent text-foreground flex items-center justify-center">
              <span class="text-xs font-medium">US</span>
            </button>
          </div>
        </div>
      </header>
      
      <!-- Page content -->
      <main class="flex-1 overflow-auto p-6 bg-background">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { mode: colorMode, toggleDarkMode } = useTheme()
const sidebarExpanded = ref(true)

const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
}

const toggleColorMode = () => {
  toggleDarkMode()
}

const expandSidebar = () => {
  sidebarExpanded.value = true
}

const collapseSidebar = () => {
  sidebarExpanded.value = false
}
</script> 