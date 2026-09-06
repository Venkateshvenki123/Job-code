const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem("careergridAuthToken");
  const headers = { ...(options.body ? { "Content-Type": "application/json" } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers };
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(payload.error?.message || `API request failed (${response.status}).`, response.status, payload.error?.code);
  }
  return payload.data ?? payload;
}

export async function apiHealth() {
  const response = await fetch(`${API_URL}/health`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(payload.error?.message || payload.data?.database?.status || "CareerGrid API is unavailable.", response.status, payload.error?.code);
  return payload.data;
}

export { API_URL };
