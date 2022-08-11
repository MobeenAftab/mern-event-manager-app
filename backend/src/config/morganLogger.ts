import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

// create a rotating write stream
var accessLogStream = createStream(process.env.LOG_FILE || 'server.log', {
  size: process.env.LOG_SIZE || '10M',
  interval: process.env.LOG_INTERVAL || '1d',
  compress: 'gzip',
  path: path.join(__dirname, '..', 'logs'),
});

const morganMiddleware = morgan(process.env.LOG_FORMAT || 'combined', {
  stream: accessLogStream,
  skip,
});
export default morganMiddleware;
