import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();

export const configureSession = () => {
  return session({
    resave: false,
    saveUninitialized: true,
    secret:
      process.env.SESSION_SECRET ?? Math.random().toString(36).substring(2, 15),
  });
};
