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
          FinCrack
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
            <button 
              @click="userMenuOpen = !userMenuOpen" 
              class="h-8 w-8 rounded-full bg-accent text-foreground flex items-center justify-center"
            >
              <span class="text-xs font-medium">{{ userInitials }}</span>
            </button>
            
            <!-- User menu dropdown -->
            <div 
              v-if="userMenuOpen" 
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-card border z-50"
              @click.outside="userMenuOpen = false"
            >
              <div class="px-4 py-2 border-b">
                <div class="text-sm font-medium text-foreground">{{ user?.name }}</div>
                <div class="text-xs text-muted-foreground">{{ user?.email }}</div>
              </div>
              <button 
                @click="handleLogout" 
                class="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2 text-foreground"
              >
                <Icon name="lucide:log-out" class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
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
import { ref, computed, onMounted } from 'vue';
import { navigateTo } from '#imports';
import { useTheme } from '@/composables/useTheme';
import { useAuth } from '@/composables/useAuth';

// Theme and sidebar state
const { mode: colorMode, toggleDarkMode } = useTheme();
const sidebarExpanded = ref(true);
const userMenuOpen = ref(false);

// Auth state
const { user, isAuthenticated, logout } = useAuth();

// Computed properties
const userInitials = computed(() => {
  if (!user.value?.name) return 'U';
  
  // Get initials from name
  const nameParts = user.value.name.split(' ');
  if (nameParts.length >= 2) {
    return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
  }
  return nameParts[0].charAt(0).toUpperCase();
});

// Methods
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value;
};

const toggleColorMode = () => {
  toggleDarkMode();
};

const expandSidebar = () => {
  sidebarExpanded.value = true;
};

const collapseSidebar = () => {
  sidebarExpanded.value = false;
};

const handleLogout = async () => {
  await logout();
};

// Check auth on mount
onMounted(() => {
  if (!isAuthenticated.value) {
    navigateTo('/sign-in');
  }
});
</script> 