import * as dotenv from 'dotenv';
import express from 'express';

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

const app = express();

app.get('/', (req, res) => {
  res.send('werwrwerw World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at ${HOST}:${PORT}`);
});
