import { defineEventHandler, readBody } from 'h3';
import { $fetch } from 'ofetch';

// API backend URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3000';

/**
 * API route handler for user authentication (login)
 * POST /api/auth/login
 */
export default defineEventHandler(async (event) => {
  try {
    // Read request body
    const { email, password } = await readBody(event);
    
    // Validate request data
    if (!email || !password) {
      return {
        error: 'Email and password are required',
        status: 400
      };
    }
    
    // Make request to external auth API
    const response = await $fetch(`${BACKEND_API_URL}/api/auth/login`, {
      method: 'POST',
      body: { email, password },
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Return the response from the backend API
    return response;
    
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Handle different types of errors
    if (error.response) {
      // Return the error from the API if available
      return {
        error: error.response._data?.error || 'Authentication failed',
        status: error.response.status || 401
      };
    }
    
    // Network or other errors
    return {
      error: error.message || 'An error occurred during authentication',
      status: 500
    };
  }
}); 