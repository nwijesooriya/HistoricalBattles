import { env } from './config/env';
import { connectDB } from './config/db';
import app from './app';

const start = async (): Promise<void> => {
  // Connect to MongoDB first
  await connectDB();

  // Start Express server
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Historical Atlas API running on port ${env.PORT}`);
    console.log(`   Environment: ${env.NODE_ENV}`);
    console.log(`   Health check: http://localhost:${env.PORT}/api/v1/health`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${env.PORT} is already in use. Another Historical Atlas server instance is likely running.`);
      console.warn('   Reuse the existing instance or stop it before starting a new dev server.');
      return;
    }

    throw error;
  });
};

start().catch((err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});
