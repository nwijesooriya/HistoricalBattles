import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes';
import regionRoutes from './routes/regionRoutes';
import eraRoutes from './routes/eraRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// ─── Middleware ───
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static files (uploads) ───
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API Routes ───
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/regions', regionRoutes);
app.use('/api/v1/eras', eraRoutes);

// ─── Health check ───
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'Historical Atlas API is running' });
});

// ─── Global error handler (must be last) ───
app.use(errorHandler);

export default app;
