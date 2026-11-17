// Backend base URL. Empty = same origin (local dev proxy, or backend serving the built site).
export const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
