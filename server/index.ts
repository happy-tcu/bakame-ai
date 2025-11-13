import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Use port 5000 for production deployment, 3001 for development
const PORT = parseInt(process.env.PORT || (process.env.NODE_ENV === 'production' ? '5000' : '3001'), 10);
const isProduction = process.env.NODE_ENV === 'production';

// Core middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use(routes);

// API 404 catch-all - catches any unmatched /api routes before SPA fallback
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Production static file serving and SPA fallback
if (isProduction) {
  const distPath = path.join(__dirname, '..', 'dist');
  
  console.log('Production mode enabled');
  console.log('Serving static files from:', distPath);
  console.log('Directory exists:', require('fs').existsSync(distPath));
  
  // Serve static assets
  app.use(express.static(distPath));
  
  // SPA fallback - return index.html for all non-API routes
  app.get('*', (req, res, next) => {
    // Skip API routes (they should have been handled above)
    if (req.path.startsWith('/api')) {
      return next();
    }
    const indexPath = path.join(distPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  });
}

// Centralized error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${isProduction ? 'production' : 'development'}`);
});