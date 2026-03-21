// Base URL for all API calls.
// In dev, VITE_API_URL can point at a hosted backend, but we still use the Vite proxy (/api)
// when the UI is opened on localhost or a private LAN IP (e.g. http://192.168.x.x:5173/).
// Otherwise fetch would hit the remote API from an unauthorized browser origin → "Failed to fetch".
const envApiBase = import.meta.env.VITE_API_URL as string | undefined;

function isPrivateLanHost(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  const parts = hostname.split('.');
  if (parts.length !== 4) return false;
  const n = parts.map((p) => Number(p));
  if (n.some((x) => !Number.isInteger(x) || x < 0 || x > 255)) return false;
  const [a, b] = n;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  return false;
}

function shouldUseViteDevProxy(): boolean {
  if (typeof window === 'undefined') return import.meta.env.DEV;
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') return true;
  if (import.meta.env.DEV && isPrivateLanHost(h)) return true;
  return false;
}

export const API_BASE = shouldUseViteDevProxy()
  ? '/api'
  : envApiBase || '/api';
