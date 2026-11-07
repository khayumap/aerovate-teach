import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { connectDB } from './server/db.js';
import apiRouter from './server/routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json());

// Mount the MERN API router
app.use('/api', apiRouter);

async function start() {
  await connectDB();

  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite dev server in middleware mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Aerovate Class 5 Teaching Platform running on http://0.0.0.0:${PORT}`);
    console.log(`📱 Teacher Helpline: +91 7736419753`);
  });
}

start();
