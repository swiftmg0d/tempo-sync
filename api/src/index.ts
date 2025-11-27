import bodyParser from 'body-parser';
import { httpServerHandler } from 'cloudflare:node';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';

import routes from '@/features/v1';

import { RouteNotFoundError } from './errors';
import { errorHandler } from './middleware/error-handler.middleware';

const app: Express = express();

app.set('trust proxy', true);

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/v1/api', routes);

app.get('/health', (_req, res) => {
	res.json({ message: 'TempoSyncApi running on Cloudflare Workers!' });
});

app.get(['/*x', '/'], () => {
	throw new RouteNotFoundError('The route does not exist or has been deleted!', 404);
});

app.use(errorHandler);

app.listen(3000);
export default httpServerHandler({ port: 3000 });
