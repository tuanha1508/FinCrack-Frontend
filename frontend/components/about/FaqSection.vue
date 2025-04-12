<template>
  <section class="py-16 px-4" :class="isDark ? 'bg-black' : 'bg-white'">
    <div class="container mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl font-bold mb-6" :class="isDark ? 'text-white' : 'text-black'">Frequently Asked Questions</h2>
        <p class="text-lg" :class="isDark ? 'text-white' : 'text-gray-700'">
          Get answers to common questions about our platform, features, and services.
        </p>
      </div>
      
      <div class="max-w-3xl mx-auto space-y-4">
        <!-- FAQ Item 1 -->
        <div class="rounded-xl overflow-hidden" :class="isDark ? 'border border-white' : 'border border-gray-300'">
          <button 
            class="w-full px-6 py-4 flex justify-between items-center text-left transition-colors"
            :class="isDark ? 'bg-black text-white hover:bg-white/10' : 'bg-white text-black hover:bg-gray-100'"
            @click="toggleFaq(0)"
          >
            <span class="text-lg font-medium">How secure is my financial data?</span>
            <svg 
              class="w-5 h-5 transform transition-transform" 
              :class="{'rotate-180': openFaq === 0}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            class="px-6 py-4"
            :class="isDark ? 'bg-black/50 text-white' : 'bg-gray-50 text-black'"
            v-show="openFaq === 0"
          >
            <p>
              Your data security is our top priority. We use bank-level encryption (256-bit SSL) for all data transfers, and we never store your financial credentials. Our platform undergoes regular security audits and complies with all industry regulations for financial data handling.
            </p>
          </div>
        </div>
        
        <!-- FAQ Item 2 -->
        <div class="rounded-xl overflow-hidden" :class="isDark ? 'border border-white' : 'border border-gray-300'">
          <button 
            class="w-full px-6 py-4 flex justify-between items-center text-left transition-colors"
            :class="isDark ? 'bg-black text-white hover:bg-white/10' : 'bg-white text-black hover:bg-gray-100'"
            @click="toggleFaq(1)"
          >
            <span class="text-lg font-medium">How do I connect my investment accounts?</span>
            <svg 
              class="w-5 h-5 transform transition-transform" 
              :class="{'rotate-180': openFaq === 1}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            class="px-6 py-4"
            :class="isDark ? 'bg-black/50 text-white' : 'bg-gray-50 text-black'"
            v-show="openFaq === 1"
          >
            <p>
              You can connect your investment accounts through our secure API integrations with major brokerages and financial institutions. Simply navigate to the "Accounts" section, click "Add Account," and follow the guided process to securely link your accounts.
            </p>
          </div>
        </div>
        
        <!-- FAQ Item 3 -->
        <div class="rounded-xl overflow-hidden" :class="isDark ? 'border border-white' : 'border border-gray-300'">
          <button 
            class="w-full px-6 py-4 flex justify-between items-center text-left transition-colors"
            :class="isDark ? 'bg-black text-white hover:bg-white/10' : 'bg-white text-black hover:bg-gray-100'"
            @click="toggleFaq(2)"
          >
            <span class="text-lg font-medium">What types of investments can I track?</span>
            <svg 
              class="w-5 h-5 transform transition-transform" 
              :class="{'rotate-180': openFaq === 2}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div 
            class="px-6 py-4"
            :class="isDark ? 'bg-black/50 text-white' : 'bg-gray-50 text-black'"
            v-show="openFaq === 2"
          >
            <p>
              Our platform supports a wide range of investment types including stocks, bonds, ETFs, mutual funds, cryptocurrencies, options, futures, and alternative investments. You can organize your investments into custom portfolios and track their performance individually or as a whole.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Contact prompt -->
      <div class="mt-12 text-center">
        <p class="mb-4" :class="isDark ? 'text-white' : 'text-black'">Still have questions?</p>
        <button :class="isDark ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'" 
                class="font-medium px-6 py-2 rounded-md transition-colors">Contact Us</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '@/composables/useTheme';

// Get theme state
const { isDark } = useTheme();

const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index;
};
</script> 