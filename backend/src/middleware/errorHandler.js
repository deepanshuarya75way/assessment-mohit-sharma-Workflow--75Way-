import environment from '../config/environment.js';

// Catches unhandled errors from routes and returns a consistent JSON response
export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[error] ${req.method} ${req.originalUrl} — ${message}`);

  if (!environment.isProduction) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(environment.isProduction ? {} : { stack: err.stack }),
  });
}
