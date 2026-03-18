// Base URL for all API calls.
// In production (Vercel), set VITE_API_URL to your Railway backend URL.
// In development, it falls back to /api (proxied by Vite to localhost:3000).
export const API_BASE = import.meta.env.VITE_API_URL || '/api';
