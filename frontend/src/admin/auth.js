export const AUTH_KEY = "careergridAuthToken";
export const USER_KEY = "careergridAuthUser";
export const LOGOUT_MESSAGE_KEY = "newWebsiteLogoutMessage";

export function isAdminLoggedIn() {
  return Boolean(sessionStorage.getItem(AUTH_KEY));
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api"}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || "Unable to sign in.");
  if (!["admin", "super-admin"].includes(payload.data?.user?.role)) throw new Error("This account does not have administrator access.");
  sessionStorage.setItem(AUTH_KEY, payload.data.token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(payload.data.user));
  return payload.data.user;
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.setItem(LOGOUT_MESSAGE_KEY, "You have been logged out successfully.");
}

export function consumeLogoutMessage() {
  const message = sessionStorage.getItem(LOGOUT_MESSAGE_KEY);
  if (message) sessionStorage.removeItem(LOGOUT_MESSAGE_KEY);
  return message;
}