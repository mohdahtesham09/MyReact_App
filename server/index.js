import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import chatRouter from './routes/chat.js';
import authRouter from './routes/auth.js';
import projectsRouter from './routes/projects.js';
import uploadRouter from './routes/upload.js';
import configRouter from './routes/config.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadsPath = path.join(__dirname, '../public/uploads');
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/config', configRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Mohd Ahtesham Portfolio Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if dist folder exists (for production deployment)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api') || req.url.startsWith('/uploads')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      // In dev mode, let Vite handle client routing
      res.status(404).send('API route not found. Run Vite dev server for frontend.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Portfolio Backend running on http://localhost:${PORT}`);
  console.log(`💬 AI Chat Endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`🔐 Admin Auth Endpoint: http://localhost:${PORT}/api/auth/login`);
  console.log(`====================================================`);
});
