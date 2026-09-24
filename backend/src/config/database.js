import mongoose from 'mongoose';
import environment from './environment.js';
import { seedDatabase } from '../seeders/seed.js';

let isMongoConnected = false;

// Connect to MongoDB. Falls back to in-memory store if connection fails.
export async function connectDatabase() {
  try {
    await mongoose.connect(environment.mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });

    isMongoConnected = true;
    console.log('[db] MongoDB connected');

    await seedDatabase();
  } catch (err) {
    console.warn('[db] MongoDB connection failed — using in-memory fallback');
    console.warn('[db] Set MONGO_URI in .env for persistent storage');
  }
}

export function getMongoConnectionStatus() {
  return isMongoConnected;
}
