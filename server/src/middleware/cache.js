const cache = new Map();

/**
 * Simple in-memory cache middleware
 * @param {number} duration - Cache duration in seconds
 */
const cacheMiddleware = (duration) => (req, res, next) => {
    // Only cache GET requests
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl || req.url;
  const cachedResponse = cache.get(key);

  if (cachedResponse && cachedResponse.expires > Date.now()) {
    return res.json(cachedResponse.data);
  }

  // Intercept res.json
  const originalJson = res.json;
  res.json = (body) => {
    cache.set(key, {
      data: body,
      expires: Date.now() + duration * 1000
    });
    return originalJson.call(res, body);
  };

  next();
};

/**
 * Clear cache by pattern or key
 */
const clearCache = (key) => {
  if (key) {
    cache.delete(key);
  } else {
    cache.clear();
  }
};

module.exports = { cacheMiddleware, clearCache };
