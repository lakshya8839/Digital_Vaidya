/**
 * API utility to handle API calls with proper base URL
 * In development, uses Vite proxy
 * In production, uses VITE_API_URL environment variable
 */

const getApiBaseUrl = () => {
  // In production, use the environment variable
  if (import.meta.env.PROD && import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In development, use relative path (Vite proxy handles it)
  return '';
};

export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export default apiRequest;

