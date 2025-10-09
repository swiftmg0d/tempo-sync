import express, { type Express } from 'express';

const app: Express = express();

app.get('/', (req, res) => {
  res.send('Initial route...');
});

export default app;
