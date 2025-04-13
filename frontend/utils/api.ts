/**
 * Common API utilities
 * 
 * This is a central export file for all API-related utilities.
 */

// No longer using external financial APIs
// Using local data instead

// Helper function to format date for API requests
export function formatDateForApi(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Common error handling for API responses
 */
export function handleApiError(error: any): { error: string } {
  console.error('API error:', error);
  return {
    error: error.message || 'An unknown error occurred'
  };
} 