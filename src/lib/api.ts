// Requests go to this same origin's /api/* routes, which next.config.ts
// rewrites server-side to the real backend (see BACKEND_URL env var).
// This keeps the backend's actual URL out of the browser entirely.
export const API_BASE_URL = '';
