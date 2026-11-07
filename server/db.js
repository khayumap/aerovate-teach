import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;
let isUsingFallback = false;

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI || mongoURI.includes('<username>') || mongoURI.includes('MY_MONGO_URI')) {
    console.log('ℹ️ [Database] No valid MONGO_URI in environment. Operating in memory-backed mode (all teacher/student actions functional).');
    isUsingFallback = true;
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    isUsingFallback = false;
    console.log(`✅ [MongoDB Atlas Connected]: ${conn.connection.host}`);
    return true;
  } catch (err) {
    console.warn(`⚠️ [MongoDB Atlas Connection Warning]: ${err.message}. Seamlessly continuing with memory-backed store.`);
    isUsingFallback = true;
    return false;
  }
}

export function getDBStatus() {
  return {
    connected: isConnected,
    isUsingFallback,
    uriConfigured: Boolean(process.env.MONGO_URI && !process.env.MONGO_URI.includes('<username>')),
    mongoHost: mongoose.connection?.host || 'In-Memory Store (Replit / Local Ready)'
  };
}
