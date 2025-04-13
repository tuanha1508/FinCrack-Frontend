import { defineEventHandler, readBody } from 'h3';
import { hash } from 'ohash';

/**
 * API route handler for user registration (signup)
 * POST /api/auth/signup
 */
export default defineEventHandler(async (event) => {
  try {
    // Read request body
    const { name, email, password } = await readBody(event);
    
    // Validate request data
    if (!name || !email || !password) {
      return {
        error: 'Missing required fields',
        status: 400
      };
    }
    
    if (password.length < 8) {
      return {
        error: 'Password must be at least 8 characters long',
        status: 400
      };
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        error: 'Invalid email format',
        status: 400
      };
    }
    
    // Forward request to the external backend API
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';
    
    try {
      console.log(`Forwarding signup request to: ${backendUrl}/auth/signup`);
      
      // Make a fetch request to the actual backend API
      const response = await fetch(`${backendUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      // Parse the response from the backend
      const data = await response.json();
      
      console.log('Backend response:', data);
      
      // If the backend returns an error
      if (!response.ok) {
        console.error('Backend returned error:', data);
        return {
          error: data.error || 'Registration failed',
          status: response.status
        };
      }
      
      // Return the successful response from the backend
      return data;
    } catch (fetchError) {
      console.error('Error connecting to backend:', fetchError);
      return {
        error: 'Could not connect to authentication service',
        status: 503
      };
    }
  } catch (error: any) {
    console.error('Signup error:', error);
    
    return {
      error: error.message || 'An error occurred during registration',
      status: 500
    };
  }
}); 