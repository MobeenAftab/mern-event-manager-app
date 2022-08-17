import * as dotenv from 'dotenv';
import express from 'express';
import { connectToMongodb } from './config/mongodb';
import morganMiddleware from './config/morganLogger';
import errorHandler from './middleware/errorHandler';
import indexRouter from './routes';

const result = dotenv.config();
const PROD_ENV = process.env.NODE_ENV === 'production';

if (!PROD_ENV) {
  const dotenvConfig = dotenv.config();

  // Check if env variables have imported correctly
  if (dotenvConfig.error) {
    throw new Error(JSON.stringify(dotenvConfig.error));
  }
}

const PORT = PROD_ENV ? process.env?.PORT : 3000;
const HOST = PROD_ENV ? process.env?.HOST : 'http://localhost';

connectToMongodb();
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(morganMiddleware);
app.use(`/${process.env.API_VERSION}`, indexRouter);

// Error handler should be the last middleware in use
app.use(errorHandler);

app.listen(PORT, () => {
  return console.log(`Express is listening at ${HOST}:${PORT}`);
});
