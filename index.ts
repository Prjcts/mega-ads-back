import express, { json } from 'express';
import {rateLimit} from 'express-rate-limit'
import 'express-async-errors';
import cors from 'cors';
import { handleError, ValidationError } from './utils/errors';
import { AdRecord } from './records/ad.record';

const app = express();

app.use(
  cors({
    origin: 'https://localhost:3000',
  }),
);

app.use(json());

app.use(rateLimit({
  windowMs: 5 * 1000 * 60,
  limit: 100
}))

//Routes

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log(' listening on http://localhost:3001');
});
