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

  // More comprehensive and personalized responses based on user queries
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi') || lowerCaseMessage === 'hey') {
    responseMessage = 'Hello! I\'m your personal financial assistant. I can help you with savings advice, investment recommendations, spending analysis, debt management, and budgeting. How can I assist you today?';
    suggestions = ['Help me save money', 'Analyze my spending', 'Investment advice'];
  }
  else if (lowerCaseMessage.includes('saving') || lowerCaseMessage.includes('save')) {
    responseMessage = 'To improve your savings, consider the 50/30/20 rule: 50% of income for needs, 30% for wants, and 20% for savings. Based on your spending patterns, you could save an additional $350 per month by reducing subscription services and dining out expenses. Would you like me to help you create a savings plan?';
    suggestions = ['Set up automatic transfers to savings', 'Review my subscriptions', 'Create a savings goal'];
  } 
  else if (lowerCaseMessage.includes('invest') || lowerCaseMessage.includes('investment')) {
    responseMessage = 'Based on your financial profile, I recommend a diversified portfolio with 60% in index funds, 30% in bonds, and 10% in high-growth stocks. This aligns with your moderate risk tolerance and long-term goals. Your current investments are showing a 7.2% annual return, which is slightly above market average. Would you like specific fund recommendations?';
    suggestions = ['Learn about index funds', 'Review retirement accounts', 'Explain risk tolerance'];
  }
  else if (lowerCaseMessage.includes('spend') || lowerCaseMessage.includes('spending')) {
    responseMessage = 'Your spending pattern shows that 35% goes to housing, 20% to transportation, 15% to food, and 30% to discretionary spending. Your food expenses increased by 12% compared to last month, with most of the increase coming from restaurant dining. I\'ve identified potential savings of $215 this month in the entertainment category. Would you like to see a detailed breakdown?';
    suggestions = ['Analyze grocery expenses', 'Show spending by category', 'Compare to last month'];
  }
  else if (lowerCaseMessage.includes('debt') || lowerCaseMessage.includes('loan')) {
    responseMessage = 'To manage your debt effectively, prioritize high-interest loans first. Your credit card debt at 18% APR should be paid off before focusing on your student loan at 5.5% APR. With your current payment plan, you\'ll be debt-free in approximately 3.5 years. I can suggest a more aggressive payment strategy that could reduce this to 2.8 years. Would that interest you?';
    suggestions = ['Debt consolidation options', 'Create payment plan', 'Effect of extra payments'];
  }
  else if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('plan')) {
    responseMessage = 'I can help you create a personalized budget. Based on your income of $5,800/month, I recommend allocating $1,740 to housing, $870 to transportation, $870 to food, and $1,160 to savings. This leaves $1,160 for discretionary spending. You\'re currently exceeding your entertainment budget by 15%, but are under budget in other categories. Would you like to adjust any category allocations?';
    suggestions = ['Download budget template', 'Set financial goals', 'Track expenses automatically'];
  }
  else if (lowerCaseMessage.includes('credit score') || lowerCaseMessage.includes('credit report')) {
    responseMessage = 'Your current credit score is 742, which is considered "Good". This is an 8-point improvement from last month. The main factors affecting your score are your payment history (excellent), credit utilization (good at 28%), credit age (fair at 5.2 years), and credit mix (good). Paying down your credit card balance by $500 could potentially increase your score by 10-15 points. Would you like tips on improving your score further?';
    suggestions = ['Improve credit score', 'Understand credit factors', 'Credit monitoring options'];
  }
  else if (lowerCaseMessage.includes('retirement') || lowerCaseMessage.includes('401k') || lowerCaseMessage.includes('ira')) {
    responseMessage = 'Your retirement accounts are on track for your goal of retiring at age 65 with $1.2M. You\'re currently contributing 8% of your income, with a 3% employer match. Increasing your contribution to 10% could allow you to retire 2 years earlier or increase your retirement income by $850/month. Your asset allocation is appropriately diversified for your age and risk tolerance. Would you like to run a detailed retirement scenario?';
    suggestions = ['Increase contributions', 'Retirement calculator', 'Asset allocation advice'];
  }
  else if (lowerCaseMessage.includes('insurance') || lowerCaseMessage.includes('coverage')) {
    responseMessage = 'I\'ve analyzed your insurance coverage. Your health insurance has a $1,500 deductible and $4,500 out-of-pocket maximum. Your life insurance coverage is $500,000, which may be insufficient based on your family needs and mortgage balance. I recommend increasing coverage to $750,000. Your auto and home insurance deductibles are optimized for your financial situation. Would you like me to suggest specific insurance providers?';
    suggestions = ['Life insurance calculator', 'Compare health plans', 'Review all coverage'];
  }
  else if (lowerCaseMessage.includes('tax') || lowerCaseMessage.includes('taxes')) {
    responseMessage = 'Based on your current income and deductions, your projected tax liability this year is $14,280. You could potentially reduce this by $1,850 through additional retirement contributions and harvesting investment losses. Your current withholding will result in a tax refund of approximately $950. Would you prefer to adjust your withholding to increase your monthly take-home pay instead of receiving a refund?';
    suggestions = ['Tax reduction strategies', 'Adjust withholding', 'Plan charitable donations'];
  }
  else if (lowerCaseMessage.includes('mortgage') || lowerCaseMessage.includes('refinance')) {
    responseMessage = 'Your current mortgage rate is 4.25% with 23 years remaining. With today\'s rates around 3.75%, refinancing could save you approximately $215 per month or $59,340 over the life of the loan. Break-even on closing costs would occur after 18 months. Given your plan to stay in the home long-term, refinancing appears beneficial. Would you like to see specific lender recommendations?';
    suggestions = ['Refinance calculator', 'Compare lenders', 'Home equity options'];
  }
  else if (lowerCaseMessage.includes('goal') || lowerCaseMessage.includes('financial goal')) {
    responseMessage = 'Your financial goals include: 1) Building an emergency fund ($12,000 target, currently at 45%), 2) Saving for a home down payment ($60,000 target, currently at 28%), and 3) College fund for your children ($120,000 target, currently at 15%). Based on your current savings rate, you\'ll reach your emergency fund goal in 7 months. Would you like to create a new goal or adjust the priority of existing ones?';
    suggestions = ['Create new goal', 'Adjust goal timeline', 'Goal progress details'];
  }
  else {
    responseMessage = `I understand you're asking about "${userMessage}". Let me analyze your financial data to provide a personalized response. Based on your recent transactions and financial goals, I recommend focusing on building your emergency fund before making any major financial decisions. Currently, you have $5,200 saved, which covers about 1.8 months of expenses. The recommended amount is 3-6 months of expenses. Can I help you create a plan to reach this target?`;
    suggestions = ['Tell me more about emergency funds', 'Show my spending patterns', 'Help with budgeting'];
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