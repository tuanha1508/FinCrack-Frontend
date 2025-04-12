<template>
  <div class="min-h-screen bg-black">
    <!-- Logo/branding header -->
    <div class="absolute top-0 left-0 w-full p-6">
      <div class="container flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span class="text-black text-lg font-bold">F</span>
          </div>
          <span class="font-bold text-lg text-white">FinHack</span>
        </div>
        
        <div class="flex items-center space-x-4">
          <a href="/" class="text-sm text-gray-400 hover:text-white">
            Home
          </a>
          <a href="/about" class="text-sm text-gray-400 hover:text-white">
            About
          </a>
        </div>
      </div>
    </div>
    
    <!-- Main content -->
    <main>
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="absolute bottom-0 left-0 w-full p-6">
      <div class="container text-center text-sm text-gray-400">
        &copy; {{ new Date().getFullYear() }} FinHack. All rights reserved.
      </div>
    </footer>
  </div>
</template> 