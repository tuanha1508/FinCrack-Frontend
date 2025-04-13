/**
 * Chatbot Service
 * 
 * Provides methods for interacting with the chatbot API
 */
import { API_ENDPOINTS } from '@/constants/api';

// Define interface for API request
export interface ChatRequest {
  message: string;
  userId?: string;
  sessionId?: string;
}

// Define interface for API response
export interface ChatResponse {
  message: string;
  timestamp: string;
  suggestions?: string[];
}

// Define interface for Virtual Assistant query
export interface VirtualAssistantRequest {
  query: string;
}

// Define interface for Virtual Assistant response
export interface VirtualAssistantResponse {
  response: string;
  isFinanceRelated: boolean;
}

/**
 * Send a message to the chatbot API and get a response
 * @param message User's message
 * @param userId Optional user ID for personalized responses
 * @param sessionId Optional session ID for context preservation
 * @returns Promise with the response from the chatbot
 */
export async function sendChatMessage(
  message: string,
  userId?: string,
  sessionId?: string
): Promise<ChatResponse> {
  try {
    const request: ChatRequest = {
      message,
      ...(userId && { userId }),
      ...(sessionId && { sessionId })
    };

    const response = await fetch(API_ENDPOINTS.CHATBOT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in chatbot service:', error);
    throw error;
  }
}

/**
 * Send a query to the Virtual Assistant API
 * @param query User's question for the virtual assistant
 * @param token JWT token for authentication
 * @returns Promise with the response containing answer and finance relevance flag
 */
export async function sendVirtualAssistantQuery(
  query: string,
  token: string
): Promise<VirtualAssistantResponse> {
  try {
    const response = await fetch(API_ENDPOINTS.VIRTUAL_ASSISTANT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending query to virtual assistant:', error);
    throw error;
  }
} 