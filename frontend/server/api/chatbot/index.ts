/**
 * Chatbot API Endpoint
 * 
 * This endpoint receives user messages and returns AI-generated
 * responses for the virtual assistant feature.
 */

import { defineEventHandler, readBody } from 'h3';

// Define interface for the request body
interface ChatRequest {
  message: string;
  userId?: string;
  sessionId?: string;
}

// Define interface for the response
interface ChatResponse {
  message: string;
  timestamp: string;
  suggestions?: string[];
}

/**
 * Generate a response based on the user's input
 * In a production environment, this would connect to a real AI service
 */
function generateResponse(userMessage: string): ChatResponse {
  // Simple keyword-based responses for financial questions
  const lowerCaseMessage = userMessage.toLowerCase();
  let responseMessage = '';
  let suggestions: string[] = [];

  if (lowerCaseMessage.includes('saving') || lowerCaseMessage.includes('save')) {
    responseMessage = 'To improve your savings, consider the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20% for savings. Based on your spending patterns, you could save an additional $350 per month by reducing subscription services.';
    suggestions = ['Set up automatic transfers to savings', 'Review your subscriptions', 'Create a budget'];
  } 
  else if (lowerCaseMessage.includes('invest') || lowerCaseMessage.includes('investment')) {
    responseMessage = 'Based on your financial profile, I recommend a diversified portfolio with 60% in index funds, 30% in bonds, and 10% in high-growth stocks. This aligns with your moderate risk tolerance and long-term goals.';
    suggestions = ['Learn about index funds', 'Review retirement accounts', 'Schedule a consultation'];
  }
  else if (lowerCaseMessage.includes('spend') || lowerCaseMessage.includes('spending')) {
    responseMessage = 'Your spending pattern shows that 35% goes to housing, 20% to transportation, 15% to food, and 30% to discretionary spending. Your food expenses increased by 12% compared to last month.';
    suggestions = ['Analyze grocery expenses', 'Find transportation alternatives', 'Create a monthly budget'];
  }
  else if (lowerCaseMessage.includes('debt') || lowerCaseMessage.includes('loan')) {
    responseMessage = 'To manage your debt effectively, prioritize high-interest loans first. Your credit card debt at 18% APR should be paid off before focusing on your student loan at 5.5% APR.';
    suggestions = ['Debt consolidation options', 'Refinancing opportunities', 'Payment plan strategies'];
  }
  else if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('plan')) {
    responseMessage = 'I can help you create a personalized budget. Based on your income of $5,800/month, I recommend allocating $1,740 to housing, $870 to transportation, $870 to food, and $1,160 to savings.';
    suggestions = ['Download budget template', 'Set financial goals', 'Track expenses automatically'];
  }
  else {
    responseMessage = `I understand you're asking about "${userMessage}". Let me analyze your financial data to provide a personalized response. Based on your recent transactions and financial goals, I recommend focusing on building your emergency fund before making any major financial decisions.`;
    suggestions = ['Tell me more about savings', 'Show my spending patterns', 'Help with budgeting'];
  }

  return {
    message: responseMessage,
    timestamp: new Date().toISOString(),
    suggestions
  };
}

export default defineEventHandler(async (event) => {
  try {
    // Read the request body
    const requestData = await readBody<ChatRequest>(event);
    
    // Generate response based on user message
    const response = generateResponse(requestData.message);
    
    // Simulate processing delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return response;
    
  } catch (error) {
    console.error('Error in chatbot endpoint:', error);
    
    return {
      message: 'Sorry, I encountered an error while processing your request. Please try again.',
      timestamp: new Date().toISOString()
    };
  }
}); 