import dotenv from 'dotenv';

dotenv.config({});

export const {
  CLIENT_ID,
  CLIENT_SECRET,
  DATABASE_URL,
  GEMINI_API_KEY,
  KEY,
  NODE_ENV,
  PORT,
  REDIRECT_URI,
  REDIRECT_URI_STRAVA,
  SCOPE,
  SESSION_SECRET,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_SCOPE,
  X_API_KEY,
} = process.env;
