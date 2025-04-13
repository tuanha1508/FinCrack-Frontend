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
            <div class="flex-1 overflow-y-auto mb-4 p-4 border rounded-md bg-muted/10" ref="messagesContainer">
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
                
                <!-- Dynamic messages -->
                <div v-if="messages.length > 0" v-for="(message, i) in messages" :key="i" class="flex items-start gap-3" :class="message.isUser ? 'justify-end' : ''">
                  <template v-if="!message.isUser">
                    <div class="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <Icon name="lucide:bot" class="h-4 w-4" />
                    </div>
                    <div class="bg-muted p-3 max-w-[80%] overflow-hidden" style="border-radius: 24px; border-top-left-radius: 4px; word-break: break-all; overflow-wrap: break-word;">
                      <p class="text-sm break-words whitespace-pre-wrap">{{ message.text }}</p>
                      <!-- Suggestions if available -->
                      <div v-if="message.suggestions && message.suggestions.length > 0" class="mt-3 flex flex-wrap gap-2">
                        <button 
                          v-for="(suggestion, si) in message.suggestions" 
                          :key="si"
                          @click="askQuickQuestion(suggestion)"
                          class="px-2 py-1 text-xs border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        >
                          {{ suggestion }}
                        </button>
                      </div>
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
            <div class="relative flex items-center">
              <input
                v-model="userInput"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type your question here..."
                class="w-full p-3 pr-12 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                :disabled="isLoading"
              />
              <button 
                @click="sendMessage"
                class="absolute right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground ring-2 ring-primary/20 shadow-sm flex items-center justify-center"
                :disabled="isLoading"
              >
                <Icon v-if="!isLoading" name="lucide:send" class="h-4 w-4" />
                <Icon v-else name="lucide:loader-2" class="h-4 w-4 animate-spin" />
              </button>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { definePageMeta } from '#imports'
import { sendChatMessage } from '@/services/chatbot'

definePageMeta({
  layout: 'dashboard'
})

interface Message {
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

const userInput = ref('')
const messages = ref<Message[]>([])
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Generate a session ID for this chat session
const sessionId = ref(`session-${Date.now()}`)

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

// Scroll to bottom of messages container when new messages are added
watch(messages, () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}, { deep: true })

// Send message to chatbot API
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  // Add user message
  messages.value.push({
    text: userInput.value,
    isUser: true
  })
  
  const userMessage = userInput.value
  userInput.value = ''
  isLoading.value = true
  
  try {
    // Call the chatbot service
    const response = await sendChatMessage(userMessage, undefined, sessionId.value)
    
    // Add assistant response
    messages.value.push({
      text: response.message,
      isUser: false,
      suggestions: response.suggestions
    })
  } catch (error) {
    console.error('Error calling chatbot API:', error)
    
    // Add error message
    messages.value.push({
      text: 'Sorry, I encountered an error while processing your request. Please try again.',
      isUser: false
    })
  } finally {
    isLoading.value = false
  }
}

const askQuickQuestion = (question: string) => {
  userInput.value = question
  sendMessage()
}
</script> 