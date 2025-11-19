import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config({}));

export const {
  CLIENT_ID,
  CLIENT_SECRET,
  DATABASE_URL,
  GEMINI_API_KEY,
  KEY,
  NODE_ENV,
  PORT,
  REDIRECT_URL,
  REDIRECT_URL_STRAVA,
  SCOPE,
  SESSION_SECRET,
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_SCOPE,
  VERIFY_TOKEN,
  WEBHOOK_CALLBACK_URL,
  X_API_KEY,
} = process.env;
