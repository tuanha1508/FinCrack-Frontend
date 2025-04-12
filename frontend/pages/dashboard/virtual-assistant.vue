<template>
  <div>
    <!-- Page title and actions -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-foreground">Your Virtual Assistant</h1>
        <p class="text-muted-foreground">Get personalized financial advice and assistance</p>
      </div>
    </div>

    <!-- Main virtual assistant content -->
    <div class="grid grid-cols-1 gap-6">
      <!-- Assistant chat card -->
      <UiCard class="shadow-sm">
        <UiCardHeader>
          <UiCardTitle class="text-foreground">Financial Assistant</UiCardTitle>
          <UiCardDescription>Ask questions about your finances or get recommendations</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="h-[500px] flex flex-col">
            <!-- Chat messages container -->
            <div class="flex-1 overflow-y-auto mb-4 p-4 border rounded-md bg-muted/10">
              <div class="space-y-4">
                <!-- Assistant message -->
                <div class="flex items-start gap-3">
                  <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Icon name="lucide:bot" class="h-4 w-4" />
                  </div>
                  <div class="bg-muted p-3 max-w-[80%] overflow-hidden" style="border-radius: 24px; border-top-left-radius: 4px; word-break: break-all; overflow-wrap: break-word;">
                    <p class="text-sm break-words whitespace-pre-wrap">Hello! I'm your personal financial assistant. How can I help you today?</p>
                  </div>
                </div>
                
                <!-- Example user message -->
                <div v-if="messages.length > 0" v-for="(message, i) in messages" :key="i" class="flex items-start gap-3" :class="message.isUser ? 'justify-end' : ''">
                  <template v-if="!message.isUser">
                    <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Icon name="lucide:bot" class="h-4 w-4" />
                    </div>
                    <div class="bg-muted p-3 max-w-[80%] overflow-hidden" style="border-radius: 24px; border-top-left-radius: 4px; word-break: break-all; overflow-wrap: break-word;">
                      <p class="text-sm break-words whitespace-pre-wrap">{{ message.text }}</p>
                    </div>
                  </template>
                  <template v-else>
                    <div class="bg-primary p-3 max-w-[80%] overflow-hidden" style="border-radius: 24px; border-top-right-radius: 4px; word-break: break-all; overflow-wrap: break-word;">
                      <p class="text-sm text-primary-foreground break-words whitespace-pre-wrap">{{ message.text }}</p>
                    </div>
                    <div class="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <span class="text-xs font-medium">US</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            
            <!-- Quick actions inside chat interface -->
            <div class="mb-4">
              <h3 class="text-sm font-medium text-foreground mb-2">Quick Actions</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="(action, i) in quickActions" 
                  :key="i"
                  @click="askQuickQuestion(action.question)"
                  class="px-3 py-1.5 border rounded-full hover:bg-accent hover:border-accent transition-colors text-sm flex items-center gap-1.5"
                >
                  <Icon :name="action.icon" class="h-3.5 w-3.5 text-primary" />
                  <span>{{ action.text }}</span>
                </button>
              </div>
            </div>
            
            <!-- Chat input -->
            <div class="relative">
              <input
                v-model="userInput"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type your question here..."
                class="w-full p-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button 
                @click="sendMessage"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-sm flex items-center justify-center"
              >
                <Icon name="lucide:send" class="h-4 w-4" style="position: relative; left: -1px;" />
              </button>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  layout: 'dashboard'
})

interface Message {
  text: string
  isUser: boolean
}

const userInput = ref('')
const messages = ref<Message[]>([])

const quickActions = [
  {
    text: 'Improve savings',
    question: 'How can I improve my savings?',
    icon: 'lucide:piggy-bank'
  },
  {
    text: 'Spending patterns',
    question: 'What is my current spending pattern?',
    icon: 'lucide:bar-chart'
  },
  {
    text: 'Reduce expenses',
    question: 'How to reduce my monthly expenses?',
    icon: 'lucide:trending-down'
  },
  {
    text: 'Investment options',
    question: 'What investment options should I consider?',
    icon: 'lucide:line-chart'
  }
]

const sendMessage = () => {
  if (!userInput.value.trim()) return
  
  // Add user message
  messages.value.push({
    text: userInput.value,
    isUser: true
  })
  
  // Simulate assistant response (in a real app, this would call an API)
  setTimeout(() => {
    messages.value.push({
      text: `I understand you're asking about "${userInput.value}". In a real implementation, I would provide a helpful response based on your financial data.`,
      isUser: false
    })
  }, 1000)
  
  userInput.value = ''
}

const askQuickQuestion = (question: string) => {
  userInput.value = question
  sendMessage()
}
</script> 