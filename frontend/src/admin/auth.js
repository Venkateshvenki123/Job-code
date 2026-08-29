export const AUTH_KEY = "newWebsiteAdminAuth";
export const LOGOUT_MESSAGE_KEY = "newWebsiteLogoutMessage";

export function isAdminLoggedIn() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function loginAdmin() {
  sessionStorage.setItem(AUTH_KEY, "true");
}

export function logoutAdmin() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.setItem(LOGOUT_MESSAGE_KEY, "You have been logged out successfully.");
}

export function consumeLogoutMessage() {
  const message = sessionStorage.getItem(LOGOUT_MESSAGE_KEY);
  if (message) sessionStorage.removeItem(LOGOUT_MESSAGE_KEY);
  return message;
}