// Allowed origins for CORS. Update these for production.
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
};

export default corsOptions;
