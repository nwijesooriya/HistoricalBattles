import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes';
import regionRoutes from './routes/regionRoutes';
import eraRoutes from './routes/eraRoutes';
import kingdomRoutes from './routes/kingdomRoutes';
import warRoutes from './routes/warRoutes';
import battleRoutes from './routes/battleRoutes';
import commanderRoutes from './routes/commanderRoutes';
import weaponRoutes from './routes/weaponRoutes';
import sourceRoutes from './routes/sourceRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// ─── Middleware ───
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable caching for API responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// ─── Static files (uploads) ───
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── API Routes ───
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/regions', regionRoutes);
app.use('/api/v1/eras', eraRoutes);
app.use('/api/v1/kingdoms', kingdomRoutes);
app.use('/api/v1/wars', warRoutes);
app.use('/api/v1/battles', battleRoutes);
app.use('/api/v1/commanders', commanderRoutes);
app.use('/api/v1/weapons', weaponRoutes);
app.use('/api/v1/sources', sourceRoutes);

// ─── Health check ───
app.get('/api/v1/health', (_req, res) => {
  res.json({ success: true, message: 'Historical Atlas API is running' });
});

// ─── Global error handler (must be last) ───
app.use(errorHandler);

export default app;
