/**
 * Dynamically resolves the backend base URL from environment variables (.env) or window.location.
 * NO HARDCODED LOCALHOST FALLBACKS.
 */
export const getBackendBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL || "";
  if (envUrl) {
    // Strip trailing slash and /api/v1 if present
    return envUrl.replace(/\/api\/v1\/?$/, "").replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location) {
    // Dynamically derive host from current browser hostname & port
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : "";
    return `${protocol}//${hostname}${port}`;
  }
  return "";
};

/**
 * Formats relative file paths (/uploads/Paper.pdf) into full valid URLs using .env host configuration.
 */
export const formatFileUrl = (url) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const backendBase = getBackendBaseUrl();
  return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
};
