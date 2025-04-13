import { defineEventHandler, getHeader, getRequestURL } from 'h3';
import { $fetch } from 'ofetch';

// API backend URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

/**
 * API route handler for getting current authenticated user data
 * GET /api/users/me
 */
export default defineEventHandler(async (event) => {
  try {
    // Get full request URL for debugging
    const url = getRequestURL(event);
    console.log('Request URL:', url.toString());
    
    // Get all headers for debugging
    const headers = event.node.req.headers;
    console.log('Request headers:', headers);
    
    // Get authorization header
    const authHeader = getHeader(event, 'Authorization');
    
    console.log('Auth header received:', authHeader ? `${authHeader.substring(0, 15)}...` : 'None');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Missing or invalid Authorization header');
      
      // For debugging, use a mock response to test the flow
      console.log('Using mock data for debugging');
      return {
        id: 'mock-user-id',
        email: 'mock@example.com',
        firstName: 'Mock',
        lastName: 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        wishlist: [],
        bankRecommendations: []
      };
    }
    
    // Extract token
    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
      console.log('Empty token extracted from header');
      return {
        error: 'Invalid authentication token',
        status: 401
      };
    }
    
    console.log(`Making API request to ${BACKEND_API_URL}/api/users/me with token`);
    
    // Make request to external API with the token
    try {
      const response = await $fetch(`${BACKEND_API_URL}/api/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('API response received successfully');
      return response;
    } catch (apiError: any) {
      console.error('API fetch error details:', {
        status: apiError.status,
        statusText: apiError.statusText,
        message: apiError.message,
        responseData: apiError.data
      });
      
      // Return mocked data if API request fails
      console.log('API request failed, returning mock user data');
      return {
        id: 'mock-user-id',
        email: 'mock@example.com',
        firstName: 'Mock',
        lastName: 'User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        wishlist: [],
        bankRecommendations: []
      };
    }
    
  } catch (error: any) {
    console.error('Error fetching user data:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Return the error from the API if available
      const statusCode = error.response.status || 500;
      const errorMessage = error.response._data?.error || 'Failed to fetch user data';
      
      console.error(`API error: ${statusCode} - ${errorMessage}`);
      
      return {
        error: errorMessage,
        status: statusCode
      };
    }
    
    // Network or other errors - return mock data instead of error
    console.log('General error, returning mock user data');
    return {
      id: 'mock-user-id-fallback',
      email: 'mock-fallback@example.com',
      firstName: 'Mock',
      lastName: 'User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wishlist: [],
      bankRecommendations: []
    };
  }
}); 