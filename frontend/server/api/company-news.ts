import { defineEventHandler, getQuery, sendRedirect } from 'h3'

/**
 * Redirect handler for company-news
 * 
 * This endpoint redirects all requests to the stock-news endpoint for compatibility
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Build the query string from all parameters
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&')
  
  // Redirect to stock-news endpoint with the same query parameters
  return sendRedirect(event, `/api/stock-news${queryString ? `?${queryString}` : ''}`, 302)
}) 