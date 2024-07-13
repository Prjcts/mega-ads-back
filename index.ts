import express, { json } from 'express';
import { rateLimit } from 'express-rate-limit';
import 'express-async-errors';
import cors from 'cors';
import { handleError, ValidationError } from './utils/errors';
import { adRouter } from './router/ad.router';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  })
);

app.use(json());

app.use(
  rateLimit({
    windowMs: 5 * 1000 * 60,
    limit: 100,
  })
);

app.use('/ad', adRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log(' listening on http://localhost:3001');
});
