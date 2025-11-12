import session from 'express-session';

import { SESSION_SECRET } from '@/config/env';

export const configureSession = () => {
  return session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET ?? Math.random().toString(36).substring(2, 15),
  });
};
