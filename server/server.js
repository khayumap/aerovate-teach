import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// Serve static frontend build if present (for production / Replit deployment)
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Aerovate Teacher Platform Server</title></head>
        <body style="font-family:sans-serif;padding:40px;background:#f8fafc;color:#1e293b;">
          <h1>🚀 Aerovate Class 5 Kerala Teacher Platform Backend</h1>
          <p>The Express.js API server is running on port ${PORT}.</p>
          <p>To run the interactive React frontend in dev mode, run <code>npm run dev</code> or build with <code>npm run build</code>.</p>
          <p>Teacher Contact: <strong>+91 7736419753</strong></p>
        </body>
        </html>
      `);
    }
  });
});

// Boot server & connect to MongoDB
async function startServer() {
  await connectDB();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Aerovate Server] Running on http://0.0.0.0:${PORT}`);
    console.log(`📚 Teacher Contact: +91 7736419753`);
  });
}

startServer();

export default app;
