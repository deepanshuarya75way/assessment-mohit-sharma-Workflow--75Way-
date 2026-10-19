import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import corsOptions from './config/cors.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import copilotRoutes from './routes/copilot.routes.js';
import policyRoutes from './routes/policy.routes.js';

export async function createApp() {
  const app = express();

  // Core middleware
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(requestLogger);

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // GraphQL
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer));

  // REST API routes
  app.use('/api', copilotRoutes);

  //pincone rag policies
  app.use('/api/policies', policyRoutes);

  // Error handler (must be registered last)
  app.use(errorHandler);

  return app;
}
