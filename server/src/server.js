import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase, isDbConnected } from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    serverTime: new Date().toISOString(),
    mysql: isDbConnected() ? 'connected' : 'disconnected',
    database: process.env.DB_NAME || 'college_erp',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Student Endpoints
app.use('/api/students', studentRoutes);

// Serve Frontend in Production
const distPath = path.resolve(__dirname, '../../dist');
app.use(express.static(distPath));

// For client-side routing, send index.html for non-API GET requests
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: `Endpoint ${req.originalUrl} not found.` });
  }
  res.sendFile(path.resolve(distPath, 'index.html'));
});

// Start Server & Initialize Database
async function startServer() {
  console.log('----------------------------------------------------');
  console.log('   COLLEGE ERP SYSTEM - NODE.JS & MYSQL BACKEND     ');
  console.log('----------------------------------------------------');
  
  // Initialize MySQL Connection & Auto-Migrate/Seed
  const dbInit = await initializeDatabase();
  if (dbInit.success) {
    console.log(' [DB Status] MySQL Connected & Schema Verified');
  } else {
    console.warn(` [DB Status] MySQL Warning: ${dbInit.error}`);
    console.warn(' [DB Status] The API is running with default mock data fallback.');
  }

  app.listen(PORT, () => {
    console.log(` [API Server] Running at: http://localhost:${PORT}`);
    console.log(` [API Server] Health check: http://localhost:${PORT}/api/health`);
    console.log(` [API Server] Students API: http://localhost:${PORT}/api/students`);
    console.log('----------------------------------------------------');
  });
}

startServer();
