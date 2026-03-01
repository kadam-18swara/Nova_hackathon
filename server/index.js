import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to load .env file
try {
  const envPath = join(__dirname, '.env');
  console.log('Looking for .env at:', envPath);
  const envContent = readFileSync(envPath, 'utf8');
  console.log('.env file found, length:', envContent.length);
  
  // Parse manually
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
} catch (error) {
  console.error('Error loading .env:', error.message);
}

console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('API Key length:', process.env.OPENAI_API_KEY?.length || 0);

import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});