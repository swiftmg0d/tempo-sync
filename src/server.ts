import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import routes from '@/features/v1/index';

import { RouteNotFoundError } from './errors';
import { errorHandler } from './middleware/error-handler.middleware';
import { configureSession } from './middleware/session.middleware';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(configureSession());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/api', routes);

app.get(['/*x', '/'], () => {
  throw new RouteNotFoundError(
    'The route does not exist or has been deleted!',
    404,
  );
});

app.use(errorHandler);

export default app;
