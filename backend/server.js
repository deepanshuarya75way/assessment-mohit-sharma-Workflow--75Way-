import { createApp } from './src/app.js';
import { connectDatabase } from './src/config/database.js';
import environment from './src/config/environment.js';

async function startServer() {
  await connectDatabase();

  const app = await createApp();

  app.listen(environment.port, () => {
    console.log(`\nServer running at http://localhost:${environment.port}`);
    console.log(`GraphQL endpoint: http://localhost:${environment.port}/graphql`);
    console.log(`Health check: http://localhost:${environment.port}/health\n`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
