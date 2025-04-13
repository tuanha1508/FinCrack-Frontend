<template>
  <div class="min-h-screen" :class="isDark ? 'bg-black' : 'bg-white'">
    <!-- Hero section with large brand name -->
    <section class="container mx-auto px-4 h-screen flex flex-col items-center justify-center relative">
      <!-- Simplified masked animation text with video background -->
      <div class="relative flex items-center justify-center w-full max-w-6xl mx-auto overflow-hidden h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px]">
        <!-- SVG text mask with responsive viewBox -->
        <svg class="absolute inset-0 w-full h-full z-10 svg-responsive" 
             preserveAspectRatio="xMidYMid meet" 
             aria-hidden="true">
          <defs>
            <mask id="titleMask">
              <rect width="100%" height="100%" fill="black" />
              <!-- Characters separated for animation -->
              <text
                class="font-gugi font-black text-rendering-geometricPrecision svg-title-text"
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="white"
                font-weight="900"
                font-family="'Gugi', sans-serif"
                letter-spacing="-0.02em">
                <tspan class="title-char" style="animation-delay: 0ms;">F</tspan>
                <tspan class="title-char" style="animation-delay: 250ms;">i</tspan>
                <tspan class="title-char" style="animation-delay: 500ms;">n</tspan>
                <tspan class="title-char" style="animation-delay: 750ms;">C</tspan>
                <tspan class="title-char" style="animation-delay: 1000ms;">r</tspan>
                <tspan class="title-char" style="animation-delay: 1250ms;">a</tspan>
                <tspan class="title-char" style="animation-delay: 1500ms;">c</tspan>
                <tspan class="title-char" style="animation-delay: 1750ms;">k</tspan>
              </text>
            </mask>
          </defs>
        </svg>
        
        <!-- Video masked by SVG text -->
        <div class="absolute inset-0 w-full h-full z-5 flex items-center justify-center mask-container">
          <video autoplay loop muted playsinline class="w-full h-full object-cover" :key="videoSource">
            <source :src="videoSource" type="video/mp4">
          </video>
        </div>
      </div>
      
      <div class="flex flex-row gap-6">
        <router-link to="/sign-in" 
                     :class="[
                       isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800',
                       'px-8 h-8 font-medium rounded-full transition-colors flex items-center justify-center button-try animate-btn',
                       { 'animate': animationsTriggered }
                     ]">
          Try here
        </router-link>
        <router-link to="/about" 
                     class="group px-6 h-8 font-medium flex items-center button-see animate-btn-delay"
                     :class="[
                       isDark ? 'text-white' : 'text-black',
                       { 'animate': animationsTriggered }
                     ]">
          <div class="relative inline-block">
            See what we have now
            <span class="absolute h-0.5 w-0 left-0 bottom-0 group-hover:w-full transition-all duration-300 ease-in-out rounded-full"
                  :class="isDark ? 'bg-white' : 'bg-black'"></span>
          </div>
          <span class="ml-2 arrow-icon">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import { computed, onMounted, ref } from 'vue';

// Get theme state
const { isDark } = useTheme();

// Ref to control animation triggering
const animationsTriggered = ref(false);

// Computed property for video source based on theme
const videoSource = computed(() => 
  isDark.value ? '/videos/stock.mp4' : '/videos/stock2.mp4'
);

// Reset animation on page load
onMounted(() => {
  // Animate title characters
  const chars = document.querySelectorAll('.title-char');
  chars.forEach(char => {
    char.classList.remove('animated');
    // Slight delay to ensure class removal is registered before adding
    setTimeout(() => {
      char.classList.add('animated');
    }, 50); 
  });

  // Trigger button animations after a short delay
  setTimeout(() => {
    animationsTriggered.value = true;
  }, 100); // Adjust delay if needed
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gugi&display=swap');
.font-gugi {
  font-family: 'Gugi', sans-serif;
}

.text-rendering-geometricPrecision {
  text-rendering: geometricPrecision;
}

/* Character animation */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.title-char {
  opacity: 0;
  animation-name: fadeIn;
  animation-duration: 250ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
}

.title-char.animated {
  animation-play-state: running;
}

/* Button base state - initially hidden */
.button-try, .button-see {
  opacity: 0;
  transform: translateY(20px);
  /* Optional: Add a fallback transition */
  /* transition: opacity 0.3s ease, transform 0.3s ease; */
}

/* Animation definition */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Remove original .button-try/.button-see styles that were changed before */
.button-try {
  position: relative;
  overflow: hidden;
}

/* Pulse animation on hover - keep if desired */
/* .button-try:hover { */
/*   animation: pulse 1s infinite ease-in-out; */
/* } */

.button-see {
  /* Base styles moved to common rule above */
}

.arrow-icon {
  display: inline-block;
  transition: transform 0.3s ease;
}

.button-see:hover .arrow-icon {
  transform: translateX(5px);
}

/* Apply animation ONLY when .animate class is added */
.animate-btn.animate {
  /* Remove transition as animation handles it */
  /* transition: none; */
  animation: fadeInUp 0.5s ease-out 1.5s forwards; /* name duration timing-function delay fill-mode */
}

.animate-btn-delay.animate {
  /* Remove transition as animation handles it */
  /* transition: none; */
  animation: fadeInUp 0.5s ease-out 1.7s forwards; /* name duration timing-function delay fill-mode */
}

/* Responsive font sizing for SVG title text */
.svg-title-text {
  font-size: 80px; /* Default size for mobile */
}

/* Small devices (landscape phones) */
@media (min-width: 576px) {
  .svg-title-text {
    font-size: 120px;
  }
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  .svg-title-text {
    font-size: 180px;
  }
}

/* Large devices (desktops) */
@media (min-width: 992px) {
  .svg-title-text {
    font-size: 200px;
  }
}

/* Extra large devices */
@media (min-width: 1400px) {
  .svg-title-text {
    font-size: 300px;
  }
}

@media (min-width: 1500px) {
  .svg-title-text {
    font-size: 250px;
  }
}

/* XXL devices (wide screens) */
@media (min-width: 1900px) {
  .svg-title-text {
    font-size: 200px;
  }
}

/* Ultra wide screens */
@media (min-width: 2400px) {
  .svg-title-text {
    font-size: 200px;
  }
}

/* Apply responsive viewBox based on screen size using media queries */
.svg-responsive {
  /* Mobile viewBox (default) */
  viewBox: 0 0 400 100;
}

/* Small devices (landscape phones) */
@media (min-width: 576px) {
  .svg-responsive {
    viewBox: 0 0 450 100;
  }
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  .svg-responsive {
    viewBox: 0 0 500 100;
  }
}

/* Large devices (desktops) */
@media (min-width: 992px) {
  .svg-responsive {
    viewBox: 0 0 600 100;
  }
}

/* Extra large devices */
@media (min-width: 1200px) {
  .svg-responsive {
    viewBox: 0 0 700 100;
  }
}

/* XXL devices (wide screens) */
@media (min-width: 1900px) {
  .svg-responsive {
    viewBox: 0 0 900 120;
  }
}

/* Ultra wide screens */
@media (min-width: 2400px) {
  .svg-responsive {
    viewBox: 0 0 1500 150;
  }
}

/* Mask container styling */
.mask-container {
  -webkit-mask-image: url(#titleMask);
  mask-image: url(#titleMask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
</style>