import { env } from './config/env';
import { connectDB } from './config/db';
import app from './app';

const start = async (): Promise<void> => {
  // Connect to MongoDB first
  await connectDB();

  // Start Express server
  app.listen(env.PORT, () => {
    console.log(`🚀 Historical Atlas API running on port ${env.PORT}`);
    console.log(`   Environment: ${env.NODE_ENV}`);
    console.log(`   Health check: http://localhost:${env.PORT}/api/v1/health`);
  });
};

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
