/**
 * High-Performance In-Memory Response Caching Middleware for Express & MongoDB
 * Caches GET requests for fast responses, and auto-purges cache on mutation requests (POST/PUT/PATCH/DELETE).
 */

const cacheStore = new Map();

export const cacheMiddleware = (durationSeconds = 30) => {
  return (req, res, next) => {
    // Purge cache automatically when admin/user performs POST, PUT, PATCH, or DELETE
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
      cacheStore.clear();
      return next();
    }

    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    // Build unique cache key per user role & URL
    const userRole = req.user ? req.user.role : "public";
    const cacheKey = `${userRole}:${req.originalUrl || req.url}`;
    const cachedEntry = cacheStore.get(cacheKey);

    if (cachedEntry && Date.now() < cachedEntry.expiry) {
      res.setHeader("X-Cache-Status", "HIT");
      res.setHeader("Cache-Control", `public, max-age=${durationSeconds}`);
      return res.status(200).json(cachedEntry.body);
    }

    // Override res.json to capture response body
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(cacheKey, {
          body,
          expiry: Date.now() + durationSeconds * 1000,
        });
      }
      res.setHeader("X-Cache-Status", "MISS");
      return originalJson(body);
    };

    next();
  };
};

/**
 * Manually flush cache when needed
 */
export const purgeCache = () => {
  cacheStore.clear();
};
